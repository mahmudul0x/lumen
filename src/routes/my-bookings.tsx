import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LogIn, Calendar, Building2, User, Download, Circle, CheckCircle2, Loader2,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  bdPhone, lookupLeadsByPhone, statusLabels, toBn, type Lead, type LeadStatus,
} from "@/lib/leads";

export const Route = createFileRoute("/my-bookings")({
  head: () => ({
    meta: [
      { title: "আমার বুকিং — Lumen Builders Ltd." },
      { name: "description", content: "আপনার সকল সাইট ভিজিট, বুকিং ও ইনকোয়্যারি এক জায়গায়।" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MyBookingsPage,
});

const timeline: LeadStatus[] = ["pending", "confirmed", "visited", "reserved", "completed"];

function MyBookingsPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    const parsed = bdPhone.safeParse(phone);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "সঠিক মোবাইল নম্বর দিন");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      setLeads(await lookupLeadsByPhone(parsed.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "আমার বুকিং" }]}
        title="আপনার বুকিং ড্যাশবোর্ড"
        description="আপনার মোবাইল নম্বর দিয়ে সকল বুকিং, সাইট ভিজিট ও ইনকোয়্যারির স্ট্যাটাস দেখুন।"
      />
      <section className="container pb-24">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="rounded-[28px] border border-border/60 bg-card p-6 shadow-card md:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <LogIn className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-primary">লগইন / লুকআপ</h2>
                <p className="text-xs text-muted-foreground">যে মোবাইল দিয়ে বুকিং করেছিলেন সেটি দিন</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input
                inputMode="numeric"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void lookup();
                }}
                className="flex-1"
              />
              <Button variant="gold" size="lg" onClick={() => void lookup()} disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> খোঁজা হচ্ছে...</> : "বুকিং দেখুন"}
              </Button>
            </div>
            {error && <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>}
          </div>

          {leads && leads.length === 0 && (
            <div className="rounded-[24px] border border-dashed border-border p-10 text-center">
              <p className="text-muted-foreground">এই নম্বরে কোনো বুকিং পাওয়া যায়নি।</p>
              <Button asChild variant="gold" size="lg" className="mt-4">
                <Link to="/book-visit">নতুন সাইট ভিজিট বুক করুন</Link>
              </Button>
            </div>
          )}

          {leads && leads.length > 0 && (
            <div className="space-y-4">
              {leads.map((lead, idx) => (
                <BookingRow key={lead.leadId} lead={lead} idx={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}

function BookingRow({ lead, idx }: { lead: Lead; idx: number }) {
  const status = statusLabels[lead.status];
  const kindLabel: Record<Lead["kind"], string> = {
    "site-visit": "সাইট ভিজিট",
    "apartment-booking": "ফ্ল্যাট বুকিং",
    callback: "কল ব্যাক",
    brochure: "ব্রোশিওর",
    contact: "যোগাযোগ",
  };
  const currentIdx = timeline.indexOf(lead.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.04 }}
      className="overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-soft"
    >
      <div className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.tone}`}>
              {status.bn}
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {kindLabel[lead.kind]}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{lead.leadId}</span>
          </div>
          <p className="mt-2 font-display text-lg font-bold text-primary">
            {lead.projectName ?? "সাধারণ ইনকোয়্যারি"}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(lead.createdAt).toLocaleDateString("bn-BD")}</span>
            {lead.agent && <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {lead.agent}</span>}
            <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> পেমেন্ট: {lead.paymentStatus === "paid" ? "পরিশোধিত" : lead.paymentStatus === "partial" ? "আংশিক" : "বাকি"}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const blob = new Blob(
              [JSON.stringify({ ...lead, generated: new Date().toISOString() }, null, 2)],
              { type: "application/json" },
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${lead.leadId}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download className="mr-1.5 h-4 w-4" /> রসিদ
        </Button>
      </div>

      <div className="border-t border-border/60 bg-muted/30 px-6 py-5">
        <div className="flex items-center justify-between gap-2">
          {timeline.map((step, i) => {
            const passed = i <= currentIdx;
            return (
              <div key={step} className="flex flex-1 items-center gap-2">
                <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${passed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {passed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                </div>
                <span className={`hidden text-xs font-semibold sm:inline ${passed ? "text-foreground" : "text-muted-foreground"}`}>
                  {statusLabels[step].bn}
                </span>
                {i < timeline.length - 1 && (
                  <div className={`hidden h-0.5 flex-1 sm:block ${i < currentIdx ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
          ধাপ {toBn(Math.max(currentIdx + 1, 1))} / {toBn(timeline.length)}
        </p>
      </div>
    </motion.div>
  );
}
