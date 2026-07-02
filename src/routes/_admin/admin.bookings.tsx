import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { bnDate } from "@/lib/utils.bn";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/bookings")({
  component: BookingsAdmin,
});

function BookingsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("leads").select("*").eq("kind", "book-apartment").order("created_at", { ascending: false }).limit(200).then(({ data }) => {
      setItems(data ?? []); setLoading(false);
    });
  }, []);
  return (
    <AdminPage title="বুকিং ম্যানেজমেন্ট" description={`মোট বুকিং ${items.length}`}>
      <AdminCard className="!p-0 overflow-hidden">
        {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          : items.length === 0 ? <EmptyState title="কোনো বুকিং নেই" />
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr><th className="p-3">বুকিং আইডি</th><th className="p-3">গ্রাহক</th><th className="p-3">ফোন</th><th className="p-3">প্রকল্প</th><th className="p-3">ইউনিট</th><th className="p-3">স্ট্যাটাস</th><th className="p-3">তারিখ</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-xs text-primary">{l.lead_id}</td>
                      <td className="p-3 font-medium">{l.customer_name}</td>
                      <td className="p-3 text-muted-foreground">{l.customer_phone}</td>
                      <td className="p-3 text-xs">{l.project_name || "—"}</td>
                      <td className="p-3 text-xs text-muted-foreground">{(l.payload as any)?.unit || "—"}</td>
                      <td className="p-3"><span className="rounded-lg bg-primary/10 px-2 py-0.5 text-[11px] text-primary">{l.status}</span></td>
                      <td className="p-3 text-xs text-muted-foreground">{bnDate(l.created_at)}</td>
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
