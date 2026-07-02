import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Heart, ClipboardList, Bell, FileText, Calculator, GitCompareArrows,
  TrendingUp, Calendar, CheckCircle2, Phone, MessageCircle, ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { site } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "ড্যাশবোর্ড — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const [fav, book, notif, prof] = await Promise.all([
        supabase.from("favorites").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("notifications").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("read", false),
        supabase.from("profiles").select("full_name, phone, email, address, avatar_url").eq("id", user.id).maybeSingle(),
      ]);
      const profile = prof.data;
      const filled = profile ? [profile.full_name, profile.phone, profile.email, profile.address, profile.avatar_url].filter(Boolean).length : 0;
      const completion = Math.round((filled / 5) * 100);
      return {
        favorites: fav.count ?? 0,
        bookings: book.count ?? 0,
        unread: notif.count ?? 0,
        completion,
        profile,
      };
    },
    enabled: !!user,
  });

  const { data: recent } = useQuery({
    queryKey: ["dashboard-recent", user?.id],
    queryFn: async () => {
      const [bookings, notifs] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(3),
        supabase.from("notifications").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(4),
      ]);
      return { bookings: bookings.data ?? [], notifs: notifs.data ?? [] };
    },
    enabled: !!user,
  });

  const name = stats?.profile?.full_name || user?.user_metadata?.full_name || "গ্রাহক";

  return (
    <div className="space-y-6">
      {/* Welcome card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[26px] bg-gradient-to-br from-primary via-primary to-accent p-6 text-white shadow-card md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">স্বাগতম আবার</p>
            <h1 className="mt-2 truncate font-display text-3xl font-bold md:text-4xl">{name}</h1>
            <p className="mt-2 text-white/80">আপনার প্রিমিয়াম রিয়েল এস্টেট ড্যাশবোর্ড।</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs text-white/70">প্রোফাইল সম্পন্ন</p>
            <p className="mt-1 font-display text-3xl font-bold text-gold">{stats?.completion ?? 0}%</p>
            <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${stats?.completion ?? 0}%` }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Heart} label="পছন্দের প্রকল্প" value={stats?.favorites ?? 0} to="/dashboard/favorites" color="from-rose-500 to-pink-600" />
        <StatTile icon={ClipboardList} label="সক্রিয় বুকিং" value={stats?.bookings ?? 0} to="/dashboard/bookings" color="from-primary to-accent" />
        <StatTile icon={Bell} label="নতুন নোটিফিকেশন" value={stats?.unread ?? 0} to="/dashboard/notifications" color="from-gold to-amber-600" />
        <StatTile icon={FileText} label="ডকুমেন্টস" value="৬+" to="/dashboard/documents" color="from-emerald-500 to-accent" />
      </div>

      {/* Quick actions */}
      <div className="rounded-[26px] border border-border/60 bg-card p-6 shadow-soft">
        <h2 className="font-display text-xl font-bold text-primary">দ্রুত অ্যাকশন</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Calculator, label: "EMI ক্যালকুলেট", to: "/dashboard/emi-planner" },
            { icon: GitCompareArrows, label: "প্রকল্প তুলনা", to: "/dashboard/compare" },
            { icon: Calendar, label: "সাইট ভিজিট", to: "/book-visit" },
            { icon: CheckCircle2, label: "নতুন বুকিং", to: "/book-apartment" },
          ].map((a) => (
            <Link key={a.to} to={a.to} className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4 transition-all hover:border-gold hover:bg-gold/5 hover:shadow-soft">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold/20 to-primary/10 text-gold group-hover:from-gold group-hover:to-gold group-hover:text-white">
                <a.icon className="h-5 w-5" />
              </div>
              <span className="flex-1 text-sm font-semibold text-foreground">{a.label}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity + Contact sales */}
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[26px] border border-border/60 bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-primary">সাম্প্রতিক বুকিং</h2>
            <Link to="/dashboard/bookings" className="text-xs font-semibold text-gold hover:underline">সব দেখুন →</Link>
          </div>
          {(recent?.bookings.length ?? 0) === 0 ? (
            <EmptyBox icon={ClipboardList} text="এখনো কোনো বুকিং নেই" cta={{ label: "প্রথম বুকিং করুন", to: "/book-apartment" }} />
          ) : (
            <div className="space-y-3">
              {recent?.bookings.map((b) => (
                <div key={b.id} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><ClipboardList className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-primary">{b.project_name || b.kind}</p>
                    <p className="text-xs text-muted-foreground">Lead: {b.lead_id}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-[26px] border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-6">
            <TrendingUp className="h-8 w-8 text-gold" />
            <h3 className="mt-3 font-display text-lg font-bold text-primary">সেলস টিমের সাথে কথা বলুন</h3>
            <p className="mt-1 text-sm text-muted-foreground">যেকোনো প্রশ্নে আমরা সাথে আছি।</p>
            <div className="mt-4 space-y-2">
              <a href={`tel:${site.contact.phone}`} className="flex items-center gap-2 rounded-xl bg-primary p-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><Phone className="h-4 w-4" /> কল করুন</a>
              <a href={site.social.messenger} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-accent p-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90"><MessageCircle className="h-4 w-4" /> Messenger</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, label, value, to, color }: { icon: typeof Heart; label: string; value: string | number; to: string; color: string }) {
  return (
    <Link to={to} className="group overflow-hidden rounded-[24px] border border-border/60 bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
      <div className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-soft`}><Icon className="h-5 w-5" /></div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-primary">{value}</p>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-gold/15 text-gold",
    confirmed: "bg-accent/15 text-accent",
    visited: "bg-blue-500/15 text-blue-600",
    completed: "bg-emerald-500/15 text-emerald-600",
    cancelled: "bg-destructive/15 text-destructive",
  };
  const labels: Record<string, string> = { pending: "অপেক্ষমান", confirmed: "নিশ্চিত", visited: "ভিজিট সম্পন্ন", completed: "সম্পন্ন", cancelled: "বাতিল" };
  return <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${map[status] ?? "bg-muted text-muted-foreground"}`}>{labels[status] ?? status}</span>;
}

function EmptyBox({ icon: Icon, text, cta }: { icon: typeof Heart; text: string; cta: { label: string; to: string } }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-border py-10 text-center">
      <Icon className="mx-auto h-10 w-10 text-muted-foreground/60" />
      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
      <Link to={cta.to} className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">{cta.label}</Link>
    </div>
  );
}
