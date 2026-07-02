import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { bn } from "@/lib/utils.bn";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/analytics")({
  component: Analytics,
});

const MONTHS = ["জান", "ফেব", "মার্চ", "এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে"];

function Analytics() {
  const [leads, setLeads] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [l, p, c] = await Promise.all([
        supabase.from("leads").select("id,kind,status,source,created_at,payload").order("created_at", { ascending: false }).limit(500),
        supabase.from("payments").select("amount,paid,status,created_at").limit(500),
        supabase.from("profiles").select("id,created_at").limit(500),
      ]);
      setLeads(l.data ?? []); setPayments(p.data ?? []); setCustomers(c.data ?? []);
      setLoading(false);
    })();
  }, []);

  const monthlyLeads = useMemo(() => {
    const arr = new Array(12).fill(0);
    leads.forEach((l) => { arr[new Date(l.created_at).getMonth()]++; });
    return arr;
  }, [leads]);
  const monthlyBookings = useMemo(() => {
    const arr = new Array(12).fill(0);
    leads.filter((l) => l.kind === "book_apartment").forEach((l) => { arr[new Date(l.created_at).getMonth()]++; });
    return arr;
  }, [leads]);
  const monthlyRevenue = useMemo(() => {
    const arr = new Array(12).fill(0);
    payments.forEach((p) => { arr[new Date(p.created_at).getMonth()] += Number(p.paid) || 0; });
    return arr;
  }, [payments]);

  const sources = useMemo(() => {
    const m = new Map<string, number>();
    leads.forEach((l) => {
      const src = (l.source || l.payload?.source || "Website");
      m.set(src, (m.get(src) ?? 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [leads]);

  const popular = useMemo(() => {
    const m = new Map<string, number>();
    leads.forEach((l) => {
      const proj = l.payload?.projectSlug || l.payload?.project;
      if (proj) m.set(proj, (m.get(proj) ?? 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [leads]);

  if (loading) return <div className="grid h-60 place-items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const totalRevenue = payments.reduce((s, p) => s + (Number(p.paid) || 0), 0);
  const maxL = Math.max(...monthlyLeads, 1);
  const maxB = Math.max(...monthlyBookings, 1);
  const maxR = Math.max(...monthlyRevenue, 1);
  const money = (n: number) => "৳ " + bn(Math.round(n).toLocaleString("en-IN"));

  return (
    <AdminPage title="এনালিটিক্স" description="ব্যবসার সম্পূর্ণ পরিসংখ্যান ও ট্রেন্ড">
      <div className="grid gap-3 md:grid-cols-4">
        {[
          { label: "মোট লিড", value: bn(leads.length) },
          { label: "মোট বুকিং", value: bn(leads.filter((l) => l.kind === "book_apartment").length) },
          { label: "গ্রাহক", value: bn(customers.length) },
          { label: "রেভিনিউ", value: money(totalRevenue) },
        ].map((s) => (
          <AdminCard key={s.label}>
            <p className="text-xs uppercase text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">{s.value}</p>
          </AdminCard>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <h3 className="font-display text-lg font-bold text-primary">মাসিক লিড</h3>
          <div className="mt-6 flex h-48 items-end gap-2">
            {monthlyLeads.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100">{bn(v)}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all" style={{ height: `${(v / maxL) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h3 className="font-display text-lg font-bold text-primary">মাসিক বুকিং</h3>
          <div className="mt-6 flex h-48 items-end gap-2">
            {monthlyBookings.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-amber-500 to-amber-400" style={{ height: `${(v / maxB) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard className="lg:col-span-2">
          <h3 className="font-display text-lg font-bold text-primary">মাসিক রেভিনিউ</h3>
          <div className="mt-6 flex h-56 items-end gap-2">
            {monthlyRevenue.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100">{money(v)}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400" style={{ height: `${(v / maxR) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h3 className="font-display text-lg font-bold text-primary">লিড উৎস</h3>
          <div className="mt-4 space-y-2">
            {sources.length === 0 ? <p className="text-sm text-muted-foreground">কোনো ডেটা নেই</p>
              : sources.map(([src, n]) => {
                const pct = Math.round((n / leads.length) * 100);
                return (
                  <div key={src}>
                    <div className="flex justify-between text-xs"><span>{src}</span><span className="font-medium">{bn(n)} ({bn(pct)}%)</span></div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
                  </div>
                );
              })}
          </div>
        </AdminCard>

        <AdminCard>
          <h3 className="font-display text-lg font-bold text-primary">জনপ্রিয় প্রকল্প</h3>
          <div className="mt-4 space-y-2">
            {popular.length === 0 ? <p className="text-sm text-muted-foreground">কোনো ডেটা নেই</p>
              : popular.map(([slug, n], i) => (
                <div key={slug} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-sm"><span className="mr-2 font-bold text-primary">#{bn(i + 1)}</span>{slug}</span>
                  <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs text-primary">{bn(n)} ইনকোয়ারি</span>
                </div>
              ))}
          </div>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
