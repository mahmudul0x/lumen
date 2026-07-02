import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Loader2, Mail } from "lucide-react";
import { bnDate } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/messages")({
  component: MessagesAdmin,
});

function MessagesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = () => supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(200).then(({ data }) => { setItems(data ?? []); setLoading(false); });
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => { await supabase.from("contact_messages").update({ status }).eq("id", id); setItems((p) => p.map((m) => m.id === id ? { ...m, status } : m)); };
  const remove = async (id: string) => { await supabase.from("contact_messages").delete().eq("id", id); setItems((p) => p.filter((m) => m.id !== id)); };

  return (
    <AdminPage title="যোগাযোগ বার্তা" description={`মোট বার্তা: ${items.length}`}>
      {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        : items.length === 0 ? <EmptyState title="কোনো বার্তা নেই" hint="ওয়েবসাইট থেকে গ্রাহকরা বার্তা পাঠালে এখানে দেখাবে" />
        : (
          <div className="space-y-3">
            {items.map((m) => (
              <AdminCard key={m.id} className="!p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{m.name}</p>
                      <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px]">{m.status}</span>
                      <span className="text-xs text-muted-foreground">{bnDate(m.created_at)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{m.email} • {m.phone}</p>
                    {m.subject && <p className="mt-1 text-sm font-medium">{m.subject}</p>}
                    <p className="mt-1 text-sm text-foreground/80">{m.message}</p>
                  </div>
                  <div className="flex gap-2">
                    {m.status !== "resolved" && (
                      <Button size="sm" variant="outline" onClick={() => setStatus(m.id, "resolved")}>
                        <Check className="mr-1 h-3.5 w-3.5" /> সম্পন্ন
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(m.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </AdminCard>
            ))}
          </div>
        )}
    </AdminPage>
  );
}
