import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Loader2, ScrollText } from "lucide-react";
import { bnDate } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/audit")({
  head: () => ({ meta: [{ title: "অডিট লগ — অ্যাডমিন" }] }),
  component: AuditPage,
});

function AuditPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(200);
      setRows(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <AdminPage title="অডিট ও অ্যাক্টিভিটি লগ" description="সিস্টেম-ব্যাপী গুরুত্বপূর্ণ অ্যাকশন ট্র্যাক করুন।">
      {loading ? (
        <div className="grid place-items-center py-24"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : rows.length === 0 ? (
        <EmptyState title="কোনো লগ নেই" hint="অ্যাডমিন অ্যাকশন হলে এখানে যুক্ত হবে।" />
      ) : (
        <AdminCard className="p-0">
          <ul className="divide-y divide-border">
            {rows.map((r) => (
              <li key={r.id} className="flex items-start gap-3 p-4 text-sm">
                <ScrollText className="mt-0.5 h-4 w-4 text-secondary" />
                <div className="flex-1">
                  <p className="font-medium text-primary">{r.action ?? "action"}</p>
                  <p className="text-xs text-muted-foreground">{r.entity_type ?? "—"} • {r.entity_id ?? "—"}</p>
                </div>
                <span className="text-xs text-muted-foreground">{bnDate(r.created_at)}</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      )}
    </AdminPage>
  );
}
