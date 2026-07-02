import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Download, Printer, FileText, Loader2 } from "lucide-react";
import { bn } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/reports")({
  head: () => ({ meta: [{ title: "রিপোর্ট ও এক্সপোর্ট — অ্যাডমিন" }] }),
  component: ReportsPage,
});

const RANGES = [
  { key: "1d", label: "দৈনিক", days: 1 },
  { key: "7d", label: "সাপ্তাহিক", days: 7 },
  { key: "30d", label: "মাসিক", days: 30 },
  { key: "90d", label: "ত্রৈমাসিক", days: 90 },
  { key: "365d", label: "বার্ষিক", days: 365 },
] as const;

function toCSV(rows: any[]) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}

function download(name: string, content: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob(["\uFEFF" + content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

function ReportsPage() {
  const [range, setRange] = useState<typeof RANGES[number]["key"]>("30d");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ leads: any[]; payments: any[]; visits: any[] }>({ leads: [], payments: [], visits: [] });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const days = RANGES.find((r) => r.key === range)!.days;
      const from = new Date(Date.now() - days * 86400000).toISOString();
      const [{ data: leads }, { data: payments }] = await Promise.all([
        supabase.from("leads").select("*").gte("created_at", from).order("created_at", { ascending: false }),
        supabase.from("payments").select("*").gte("created_at", from).order("created_at", { ascending: false }),
      ]);
      const visits = (leads ?? []).filter((l: any) => l.type === "site_visit");
      setData({ leads: leads ?? [], payments: payments ?? [], visits });
      setLoading(false);
    })();
  }, [range]);

  const kpis = [
    { label: "লিড", value: data.leads.length },
    { label: "সাইট ভিজিট", value: data.visits.length },
    { label: "বুকিং", value: data.leads.filter((l: any) => l.type === "booking").length },
    { label: "পেমেন্ট", value: data.payments.length },
    { label: "মোট রাজস্ব (৳)", value: data.payments.reduce((s: number, p: any) => s + Number(p.amount || 0), 0) },
  ];

  return (
    <AdminPage
      title="রিপোর্ট ও এক্সপোর্ট"
      description="দৈনিক থেকে বার্ষিক — সব রিপোর্ট এক জায়গায়। CSV, Excel-সামঞ্জস্যপূর্ণ ও প্রিন্ট-রেডি।"
      actions={
        <>
          <Button onClick={() => window.print()} variant="outline"><Printer className="mr-2 h-4 w-4" /> প্রিন্ট</Button>
          <Button onClick={() => download(`leads-${range}.csv`, toCSV(data.leads))} variant="luxury"><Download className="mr-2 h-4 w-4" /> লিড CSV</Button>
        </>
      }
    >
      <div className="flex flex-wrap gap-2">
        {RANGES.map((r) => (
          <button
            key={r.key}
            onClick={() => setRange(r.key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${range === r.key ? "border-primary bg-primary text-white" : "border-border bg-white hover:border-primary/40"}`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid place-items-center py-24"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {kpis.map((k) => (
              <AdminCard key={k.label}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <p className="mt-2 font-display text-2xl font-bold text-primary">{bn(k.value)}</p>
              </AdminCard>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { title: "লিড রিপোর্ট", rows: data.leads, file: `leads-${range}.csv` },
              { title: "পেমেন্ট রিপোর্ট", rows: data.payments, file: `payments-${range}.csv` },
              { title: "সাইট ভিজিট", rows: data.visits, file: `site-visits-${range}.csv` },
            ].map((r) => (
              <AdminCard key={r.title}>
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-secondary" />
                  <div className="flex-1">
                    <p className="font-semibold text-primary">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{bn(r.rows.length)} টি রেকর্ড</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => download(r.file, toCSV(r.rows))}>
                    <Download className="mr-1.5 h-3.5 w-3.5" /> CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => download(r.file.replace(".csv", ".xls"), toCSV(r.rows), "application/vnd.ms-excel")}>
                    Excel
                  </Button>
                </div>
              </AdminCard>
            ))}
          </div>
        </>
      )}
    </AdminPage>
  );
}
