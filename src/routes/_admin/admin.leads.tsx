import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, Loader2 } from "lucide-react";
import { bnDate } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/leads")({
  component: LeadsAdmin,
});

const STATUSES = ["new", "contacted", "interested", "negotiation", "booked", "closed", "lost"];
const STATUS_LABEL: Record<string, string> = {
  new: "নতুন", contacted: "যোগাযোগ", interested: "আগ্রহী", negotiation: "আলোচনা",
  booked: "বুকড", closed: "সম্পন্ন", lost: "হারানো",
};

function LeadsAdmin() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kindFilter, setKindFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(500);
    setLeads(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = leads.filter((l) => {
    if (kindFilter !== "all" && l.kind !== kindFilter) return false;
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (q) {
      const s = q.toLowerCase();
      return [l.customer_name, l.customer_phone, l.customer_email, l.lead_id, l.project_name]
        .some((v) => v && String(v).toLowerCase().includes(s));
    }
    return true;
  });

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const kinds = Array.from(new Set(leads.map((l) => l.kind).filter(Boolean)));

  return (
    <AdminPage
      title="লিড CRM"
      description={`মোট ${leads.length} টি লিড • ${filtered.length} টি প্রদর্শিত`}
      actions={<Button onClick={load} variant="outline" size="sm"><RefreshCw className="mr-1.5 h-4 w-4" /> রিফ্রেশ</Button>}
    >
      <AdminCard className="!p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="নাম, ফোন, ইমেইল, লিড আইডি..." className="h-10 w-full rounded-xl border border-border pl-10 pr-3 text-sm outline-none focus:border-primary" />
          </div>
          <select value={kindFilter} onChange={(e) => setKindFilter(e.target.value)} className="h-10 rounded-xl border border-border px-3 text-sm">
            <option value="all">সব ধরন</option>
            {kinds.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 rounded-xl border border-border px-3 text-sm">
            <option value="all">সব স্ট্যাটাস</option>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s] ?? s}</option>)}
          </select>
        </div>
      </AdminCard>

      <AdminCard className="!p-0 overflow-hidden">
        {loading ? (
          <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <EmptyState title="কোনো লিড পাওয়া যায়নি" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">লিড আইডি</th>
                  <th className="p-3">গ্রাহক</th>
                  <th className="p-3">ফোন</th>
                  <th className="p-3">ধরন</th>
                  <th className="p-3">প্রকল্প</th>
                  <th className="p-3">তারিখ</th>
                  <th className="p-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-xs text-primary">{l.lead_id}</td>
                    <td className="p-3">
                      <p className="font-medium">{l.customer_name || "—"}</p>
                      <p className="text-xs text-muted-foreground">{l.customer_email || "—"}</p>
                    </td>
                    <td className="p-3 text-muted-foreground">{l.customer_phone || "—"}</td>
                    <td className="p-3"><span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px]">{l.kind}</span></td>
                    <td className="p-3 text-xs">{l.project_name || "—"}</td>
                    <td className="p-3 text-xs text-muted-foreground">{bnDate(l.created_at)}</td>
                    <td className="p-3">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l.id, e.target.value)}
                        className="rounded-lg border border-border bg-white px-2 py-1 text-xs font-medium"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s] ?? s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </AdminPage>
  );
}
