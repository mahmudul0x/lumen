import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ClipboardList, Calendar, User, CheckCircle2, Circle, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/dashboard/bookings")({
  head: () => ({ meta: [{ title: "আমার বুকিং — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  component: BookingsPage,
});

const TIMELINE = [
  { key: "pending", label: "অপেক্ষমান" },
  { key: "confirmed", label: "নিশ্চিত" },
  { key: "visited", label: "ভিজিট সম্পন্ন" },
  { key: "reserved", label: "সংরক্ষিত" },
  { key: "agreement", label: "চুক্তি স্বাক্ষর" },
  { key: "completed", label: "সম্পন্ন" },
];

function BookingsPage() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["my-bookings", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">আমার বুকিং</h1>
        <p className="mt-2 text-muted-foreground">আপনার সকল বুকিং, ভিজিট ও পেমেন্ট স্ট্যাটাস।</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      ) : (data?.length ?? 0) === 0 ? (
        <div className="rounded-[26px] border-2 border-dashed border-border bg-card py-16 text-center">
          <ClipboardList className="mx-auto h-14 w-14 text-muted-foreground/50" />
          <p className="mt-4 font-display text-lg font-semibold text-primary">এখনো কোনো বুকিং নেই</p>
          <p className="mt-1 text-sm text-muted-foreground">আপনার প্রোফাইলে দেওয়া মোবাইল/ইমেইলের সাথে বুকিং যুক্ত হবে।</p>
          <Link to="/book-apartment" className="mt-5 inline-flex rounded-full bg-gold px-5 py-2 text-sm font-semibold text-primary shadow-gold hover:bg-gold/90">নতুন বুকিং করুন</Link>
        </div>
      ) : (
        <div className="space-y-5">
          {data!.map((b, i) => {
            const stepIdx = Math.max(0, TIMELINE.findIndex((t) => t.key === b.status));
            return (
              <motion.article
                key={b.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="rounded-[26px] border border-border/60 bg-card p-6 shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">{b.kind}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-primary">{b.project_name || "প্রকল্প — Lumen"}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(b.created_at).toLocaleDateString("bn-BD")}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {b.agent}</span>
                      <span>Lead: <b className="text-primary">{b.lead_id}</b></span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${b.payment_status === "paid" ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"}`}>
                      পেমেন্ট: {b.payment_status === "paid" ? "সম্পন্ন" : "অপরিশোধিত"}
                    </span>
                    <button className="flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold hover:bg-muted"><Download className="h-3 w-3" /> রিসিপ্ট</button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-6 grid grid-cols-6 gap-2">
                  {TIMELINE.map((t, idx) => {
                    const done = idx <= stepIdx;
                    return (
                      <div key={t.key} className="flex flex-col items-center gap-2">
                        <div className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${done ? "bg-gold text-primary shadow-gold" : "bg-muted text-muted-foreground"}`}>
                          {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                        </div>
                        <span className={`text-center text-[10px] font-semibold leading-tight ${done ? "text-primary" : "text-muted-foreground"}`}>{t.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="relative -mt-11 mx-4 h-1 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold to-accent transition-all" style={{ width: `${(stepIdx / (TIMELINE.length - 1)) * 100}%` }} />
                </div>
                <div className="h-8" />
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
