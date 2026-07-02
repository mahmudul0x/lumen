import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import {
  PhoneCall, ClipboardList, Calendar, Building2, CreditCard, Star, TrendingUp, Mail,
} from "lucide-react";
import { bnDigits } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin")({
  component: AdminHome,
});

type Kpi = { label: string; value: number; icon: typeof PhoneCall; tint: string; hint?: string };

function AdminHome() {
  const [kpi, setKpi] = useState<Kpi[]>([]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [upcomingVisits, setUpcomingVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const [leadsAll, leadsToday, bookings, visitsQ, messages, reviews] = await Promise.all([
        supabase.from("leads").select("id,kind,status,created_at,customer_name,customer_phone,project_name", { count: "exact" }).order("created_at", { ascending: false }).limit(50),
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", today.toISOString()),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("kind", "book-apartment"),
        supabase.from("leads").select("*").eq("kind", "book-visit").gte("created_at", new Date(Date.now() - 30 * 86400000).toISOString()).order("created_at", { ascending: false }).limit(5),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("reviews").select("id", { count: "exact", head: true }).eq("approved", false),
      ]);

      setKpi([
        { label: "আজকের লিড", value: leadsToday.count ?? 0, icon: PhoneCall, tint: "bg-blue-500/10 text-blue-600" },
        { label: "নতুন বুকিং", value: bookings.count ?? 0, icon: ClipboardList, tint: "bg-emerald-500/10 text-emerald-600" },
        { label: "সাইট ভিজিট", value: visitsQ.data?.length ?? 0, icon: Calendar, tint: "bg-amber-500/10 text-amber-600" },
        { label: "মোট প্রকল্প", value: 5, icon: Building2, tint: "bg-purple-500/10 text-purple-600", hint: "চলমান + সম্পন্ন" },
        { label: "অপঠিত বার্তা", value: messages.count ?? 0, icon: Mail, tint: "bg-pink-500/10 text-pink-600" },
        { label: "অপেক্ষমাণ রিভিউ", value: reviews.count ?? 0, icon: Star, tint: "bg-yellow-500/10 text-yellow-600" },
      ]);
      setRecentLeads(leadsAll.data ?? []);
      setUpcomingVisits(visitsQ.data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <AdminPage title="ড্যাশবোর্ড" description="ব্যবসার সামগ্রিক পরিসংখ্যান ও কার্যক্রম">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {(loading ? Array.from({ length: 6 }).map((_, i) => ({ label: "—", value: 0, icon: TrendingUp, tint: "bg-slate-200", hint: "" } as Kpi)) : kpi).map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${k.tint}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{k.label}</p>
              <p className="mt-1 font-display text-2xl font-bold text-primary">{bnDigits(k.value)}</p>
              {k.hint && <p className="mt-0.5 text-[11px] text-muted-foreground">{k.hint}</p>}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-primary">সাম্প্রতিক লিড</h2>
            <Link to="/admin/leads" className="text-xs font-medium text-primary hover:underline">সব দেখুন →</Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="pb-2">নাম</th><th className="pb-2">ফোন</th><th className="pb-2">ধরন</th><th className="pb-2">স্ট্যাটাস</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentLeads.slice(0, 8).map((l) => (
                  <tr key={l.id}>
                    <td className="py-2 font-medium">{l.customer_name || "—"}</td>
                    <td className="py-2 text-muted-foreground">{l.customer_phone || "—"}</td>
                    <td className="py-2"><span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px]">{l.kind}</span></td>
                    <td className="py-2"><span className="rounded-lg bg-primary/10 px-2 py-0.5 text-[11px] text-primary">{l.status}</span></td>
                  </tr>
                ))}
                {recentLeads.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-muted-foreground">কোনো লিড নেই</td></tr>}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-primary">আসন্ন ভিজিট</h2>
            <Link to="/admin/site-visits" className="text-xs font-medium text-primary hover:underline">সব দেখুন →</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {upcomingVisits.map((v) => (
              <li key={v.id} className="rounded-xl border border-border p-3">
                <p className="font-medium">{v.customer_name}</p>
                <p className="text-xs text-muted-foreground">{v.project_name || "—"}</p>
                <p className="mt-1 text-xs text-primary">{new Date(v.created_at).toLocaleDateString("bn-BD")}</p>
              </li>
            ))}
            {upcomingVisits.length === 0 && <li className="text-sm text-muted-foreground">কোনো আসন্ন ভিজিট নেই</li>}
          </ul>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
