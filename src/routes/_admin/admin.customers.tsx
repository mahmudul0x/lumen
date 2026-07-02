import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { bnDate } from "@/lib/utils.bn";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/customers")({
  component: CustomersAdmin,
});

function CustomersAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(300).then(({ data }) => {
      setItems(data ?? []); setLoading(false);
    });
  }, []);

  const filtered = items.filter((p) => !q || [p.full_name, p.email, p.phone].some((v) => v && String(v).toLowerCase().includes(q.toLowerCase())));

  return (
    <AdminPage title="গ্রাহক ম্যানেজমেন্ট" description={`রেজিস্টার্ড গ্রাহক: ${items.length}`}>
      <AdminCard className="!p-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="নাম, ফোন, ইমেইল..." className="h-10 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-primary md:max-w-md" />
      </AdminCard>
      <AdminCard className="!p-0 overflow-hidden">
        {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          : filtered.length === 0 ? <EmptyState title="কোনো গ্রাহক নেই" />
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr><th className="p-3">নাম</th><th className="p-3">ইমেইল</th><th className="p-3">ফোন</th><th className="p-3">ঠিকানা</th><th className="p-3">যোগদান</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3 font-medium">{p.full_name || "—"}</td>
                      <td className="p-3 text-muted-foreground">{p.email || "—"}</td>
                      <td className="p-3 text-muted-foreground">{p.phone || "—"}</td>
                      <td className="p-3 text-xs text-muted-foreground">{p.address || "—"}</td>
                      <td className="p-3 text-xs text-muted-foreground">{bnDate(p.created_at)}</td>
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
