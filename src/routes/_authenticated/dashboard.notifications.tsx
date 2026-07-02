import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bell, Check, Trash2, Loader2, Building2, Wallet, Wrench, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/notifications")({
  head: () => ({ meta: [{ title: "নোটিফিকেশন — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  component: NotifPage,
});

const iconFor: Record<string, typeof Bell> = { booking: Building2, payment: Wallet, construction: Wrench, promo: Sparkles, info: Bell };

function NotifPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("notifications").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  const markAllRead = useMutation({
    mutationFn: async () => { await supabase.from("notifications").update({ read: true }).eq("user_id", user!.id).eq("read", false); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }); qc.invalidateQueries({ queryKey: ["notif-unread"] }); toast.success("সব পড়া হিসেবে চিহ্নিত"); },
  });
  const del = useMutation({
    mutationFn: async (id: string) => { await supabase.from("notifications").delete().eq("id", id); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }); qc.invalidateQueries({ queryKey: ["notif-unread"] }); },
  });
  const toggleRead = useMutation({
    mutationFn: async (n: { id: string; read: boolean }) => { await supabase.from("notifications").update({ read: !n.read }).eq("id", n.id); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }); qc.invalidateQueries({ queryKey: ["notif-unread"] }); },
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">নোটিফিকেশন</h1>
          <p className="mt-2 text-muted-foreground">বুকিং, পেমেন্ট ও নতুন প্রকল্পের আপডেট।</p>
        </div>
        {data.some((n) => !n.read) && (
          <button onClick={() => markAllRead.mutate()} className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-muted">সব পড়া হিসেবে চিহ্নিত</button>
        )}
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      ) : data.length === 0 ? (
        <div className="rounded-[26px] border-2 border-dashed border-border bg-card py-16 text-center">
          <Bell className="mx-auto h-14 w-14 text-muted-foreground/50" />
          <p className="mt-4 font-display text-lg font-semibold text-primary">কোনো নোটিফিকেশন নেই</p>
          <p className="mt-1 text-sm text-muted-foreground">নতুন আপডেট এলে এখানে দেখতে পাবেন।</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((n, i) => {
            const Icon = iconFor[n.kind] || Bell;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                className={`flex items-start gap-4 rounded-2xl border p-4 shadow-soft transition-colors ${n.read ? "border-border/60 bg-card" : "border-gold/40 bg-gold/5"}`}
              >
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${n.read ? "bg-muted text-muted-foreground" : "bg-gradient-to-br from-gold to-amber-500 text-white shadow-gold"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className={`font-semibold ${n.read ? "text-foreground" : "text-primary"}`}>{n.title}</h3>
                    <span className="text-[11px] text-muted-foreground">{new Date(n.created_at).toLocaleString("bn-BD")}</span>
                  </div>
                  {n.body && <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => toggleRead.mutate({ id: n.id, read: n.read })} className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-primary" aria-label="পড়া">
                    <Check className="h-4 w-4" />
                  </button>
                  <button onClick={() => del.mutate(n.id)} className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="মুছুন">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
