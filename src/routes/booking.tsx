import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck2, Home, PhoneCall, FileDown, Calculator, Sparkles, LayoutDashboard, ArrowRight,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";

const services = [
  { to: "/book-visit", icon: CalendarCheck2, title: "সাইট ভিজিট বুকিং", desc: "প্রকল্প সরাসরি ঘুরে দেখুন — সম্পূর্ণ ফ্রি।" },
  { to: "/book-apartment", icon: Home, title: "ফ্ল্যাট বুকিং", desc: "আপনার পছন্দের ইউনিট আজই রিজার্ভ করুন।" },
  { to: "/callback", icon: PhoneCall, title: "কল ব্যাক অনুরোধ", desc: "আপনার পছন্দের সময়ে আমরা কল করব।" },
  { to: "/brochure", icon: FileDown, title: "ব্রোশিওর ডাউনলোড", desc: "প্রতিটি প্রকল্পের বিস্তারিত পিডিএফ।" },
  { to: "/emi-calculator", icon: Calculator, title: "EMI ক্যালকুলেটর", desc: "মাসিক কিস্তি নিমেষে হিসাব করুন।" },
  { to: "/estimator", icon: Sparkles, title: "প্রাইস এস্টিমেটর", desc: "বাজেট অনুযায়ী উপযুক্ত ইউনিট।" },
  { to: "/my-bookings", icon: LayoutDashboard, title: "আমার বুকিং", desc: "সব বুকিংয়ের স্ট্যাটাস এক জায়গায়।" },
] as const;

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "বুকিং হাব — Lumen Builders Ltd." },
      { name: "description", content: "সাইট ভিজিট, ফ্ল্যাট বুকিং, কল ব্যাক, ব্রোশিওর, EMI ও আরও অনেক কিছু।" },
      { property: "og:title", content: "বুকিং হাব — Lumen Builders" },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: BookingHub,
});

function BookingHub() {
  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "বুকিং" }]}
        title="বুকিং ও পরিষেবা"
        description="যেকোনো একটি বেছে নিন — প্রতিটি ধাপ সহজ, স্বচ্ছ ও দ্রুত।"
      />
      <section className="container pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group flex flex-col justify-between rounded-[24px] border border-border/60 bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
            >
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground shadow-gold">
                  <s.icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
              <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition group-hover:gap-2">
                শুরু করুন <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
          ))}
        </div>
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}
