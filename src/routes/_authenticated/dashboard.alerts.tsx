import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BellRing, Rocket, TrendingDown, Home, HardHat, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/alerts")({
  head: () => ({ meta: [{ title: "প্রপার্টি অ্যালার্ট — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  component: AlertsPage,
});

const items = [
  { key: "new_launch" as const, icon: Rocket, title: "নতুন প্রকল্প লঞ্চ", desc: "প্রকল্প উদ্বোধন হলেই সাথে সাথে জানুন।" },
  { key: "price_drop" as const, icon: TrendingDown, title: "প্রাইস ড্রপ", desc: "মূল্য কমার সুযোগ মিস করবেন না।" },
  { key: "new_apartment" as const, icon: Home, title: "নতুন অ্যাপার্টমেন্ট", desc: "পছন্দের প্রকল্পে নতুন ইউনিট এলে জানুন।" },
  { key: "construction_update" as const, icon: HardHat, title: "নির্মাণ আপডেট", desc: "প্রকল্পের অগ্রগতির নিয়মিত আপডেট।" },
];

function AlertsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["alerts", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("property_alerts").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  const upsert = useMutation({
    mutationFn: async (patch: Record<string, boolean>) => {
      const payload = { user_id: user!.id, new_launch: data?.new_launch ?? true, price_drop: data?.price_drop ?? true, new_apartment: data?.new_apartment ?? true, construction_update: data?.construction_update ?? true, ...patch };
      const { error } = await supabase.from("property_alerts").upsert(payload, { onConflict: "user_id" });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["alerts"] }); toast.success("সেটিংস সংরক্ষিত"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "ত্রুটি"),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">প্রপার্টি অ্যালার্ট</h1>
        <p className="mt-2 text-muted-foreground">যা যা আপডেট পেতে চান তা বেছে নিন — ইমেইল ও SMS-এ পৌঁছে যাবে।</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it, i) => {
          const enabled = (data?.[it.key] as boolean | undefined) ?? true;
          return (
            <motion.label
              key={it.key}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex cursor-pointer items-start gap-4 rounded-[24px] border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors ${enabled ? "bg-gradient-to-br from-gold to-amber-500 text-white shadow-gold" : "bg-muted text-muted-foreground"}`}>
                <it.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-primary">{it.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => upsert.mutate({ [it.key]: e.target.checked })}
                className="mt-1 h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full bg-muted transition-colors checked:bg-gold"
              />
            </motion.label>
          );
        })}
      </div>

      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 text-center text-sm text-foreground/80">
        <BellRing className="mx-auto h-6 w-6 text-accent" />
        <p className="mt-2">আপনার প্রোফাইলে দেওয়া মোবাইল ও ইমেইলে অ্যালার্ট পাঠানো হবে।</p>
      </div>
    </div>
  );
}
