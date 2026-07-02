import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { ChevronDown, Search, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

type FAQ = { q: string; a: string; category: string };

const FAQS: FAQ[] = [
  { category: "প্রকল্প", q: "Lumen Builders কোন কোন এলাকায় প্রকল্প নির্মাণ করছে?", a: "আমরা মূলত রংপুর মহানগরের প্রাইম লোকেশনগুলোতে প্রিমিয়াম আবাসিক ও বাণিজ্যিক প্রকল্প নির্মাণ করছি। বিস্তারিত জানতে 'প্রকল্প' পেজ দেখুন।" },
  { category: "প্রকল্প", q: "প্রকল্পের নির্মাণকাজের অগ্রগতি কীভাবে জানব?", a: "প্রতিটি প্রকল্পের ডিটেইল পেজে রিয়েল-টাইম প্রগ্রেস বার ও কনস্ট্রাকশন টাইমলাইন রয়েছে। আপনার ড্যাশবোর্ডেও মাসিক আপডেট পাবেন।" },
  { category: "বুকিং ও কিস্তি", q: "একটি ফ্ল্যাট বুক করতে কী কী প্রয়োজন?", a: "জাতীয় পরিচয়পত্র (NID), ২ কপি পাসপোর্ট সাইজ ছবি, ঠিকানার প্রমাণ এবং বুকিং মানি জমা দিয়ে বুকিং সম্পন্ন করা যায়।" },
  { category: "বুকিং ও কিস্তি", q: "কিস্তিতে ফ্ল্যাট কেনার সুবিধা আছে কি?", a: "হ্যাঁ, আমরা ২৪ থেকে ৬০ মাসের নমনীয় কিস্তি সুবিধা দিই। EMI ক্যালকুলেটর ব্যবহার করে মাসিক কিস্তি জানতে পারবেন।" },
  { category: "বুকিং ও কিস্তি", q: "ব্যাংক লোনের ব্যবস্থা আছে?", a: "হ্যাঁ, আমাদের অংশীদার ব্যাংক ও আর্থিক প্রতিষ্ঠানগুলোর মাধ্যমে হোম লোনের ব্যবস্থা করে দেওয়া হয়।" },
  { category: "জমি শেয়ার", q: "জমি শেয়ার প্রকল্প কী?", a: "জমির মালিকরা তাদের জমিতে আমাদের সাথে যৌথভাবে বিল্ডিং নির্মাণ করেন। চুক্তি অনুযায়ী নির্দিষ্ট শতাংশ ফ্ল্যাট মালিক পান।" },
  { category: "জমি শেয়ার", q: "জমি শেয়ারের চুক্তি কীভাবে সম্পন্ন হয়?", a: "আইনজীবীর মাধ্যমে রেজিস্টার্ড চুক্তিপত্র, পাওয়ার অব অ্যাটর্নি এবং বিস্তারিত ভাগাভাগি চুক্তির মাধ্যমে সম্পন্ন হয়।" },
  { category: "আইনি নিরাপত্তা", q: "প্রকল্পগুলো কি রাজউক/সিটি কর্পোরেশন অনুমোদিত?", a: "আমাদের প্রতিটি প্রকল্প সংশ্লিষ্ট কর্তৃপক্ষ থেকে যথাযথ অনুমোদন নিয়ে নির্মাণ করা হয় — ISO সার্টিফায়েড কনস্ট্রাকশন স্ট্যান্ডার্ড অনুসরণ করে।" },
  { category: "আইনি নিরাপত্তা", q: "রেজিস্ট্রেশন ও নামজারি কে করে?", a: "সম্পূর্ণ রেজিস্ট্রেশন প্রক্রিয়া এবং নামজারি (মিউটেশন) আমাদের আইনি টিম গ্রাহকের পক্ষে সম্পন্ন করে দেয়।" },
  { category: "হ্যান্ডওভার", q: "ফ্ল্যাট হ্যান্ডওভারের সময় কী কী পাব?", a: "সম্পূর্ণ চাবি, ইউটিলিটি কানেকশন (গ্যাস, বিদ্যুৎ, পানি), পার্কিং স্লট, রেজিস্টার্ড দলিল ও ওয়্যারেন্টি সার্টিফিকেট।" },
  { category: "হ্যান্ডওভার", q: "হ্যান্ডওভারের পর সার্ভিস কি চলমান থাকে?", a: "হ্যাঁ, ১ বছরের ডিফেক্ট লাইয়াবিলিটি পিরিয়ড এবং ২৪/৭ কাস্টমার সাপোর্ট রয়েছে।" },
  { category: "নির্মাণ সামগ্রী", q: "কী মানের নির্মাণ সামগ্রী ব্যবহার করা হয়?", a: "শীর্ষ ব্র্যান্ডের সিমেন্ট (বসুন্ধরা/সেভেন রিংস), ৬০ গ্রেড রড, ফার্স্ট ক্লাস ব্রিক এবং আন্তর্জাতিক মানের ফিনিশিং ম্যাটেরিয়াল ব্যবহার করা হয়।" },
  { category: "যোগাযোগ", q: "সাইট ভিজিট বুক করতে কী করব?", a: "'সাইট ভিজিট বুক করুন' বাটনে ক্লিক করে অথবা +৮৮০ ১৭১১-৩৮১৪২২ নম্বরে কল করে সহজেই ভিজিট শিডিউল করতে পারবেন।" },
];

const CATEGORIES = ["সব", ...Array.from(new Set(FAQS.map((f) => f.category)))];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ) — Lumen Builders Ltd." },
      { name: "description", content: "Lumen Builders-এর প্রকল্প, বুকিং, কিস্তি, জমি শেয়ার, আইনি নিরাপত্তা ও হ্যান্ডওভার সম্পর্কিত প্রায়শই জিজ্ঞাসিত প্রশ্নের বিস্তারিত উত্তর।" },
      { property: "og:title", content: "FAQ — Lumen Builders Ltd." },
      { property: "og:description", content: "রিয়েল এস্টেট, বুকিং, কিস্তি ও আইনি প্রক্রিয়া সংক্রান্ত সব প্রশ্নের উত্তর।" },
      { property: "og:url", content: "/faq" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("সব");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = FAQS.filter((f) => {
    if (cat !== "সব" && f.category !== cat) return false;
    if (q && !(f.q + " " + f.a).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "FAQ" }]}
        title="প্রায়শই জিজ্ঞাসিত প্রশ্ন"
        description="বুকিং, কিস্তি, জমি শেয়ার, আইনি প্রক্রিয়া ও হ্যান্ডওভার সংক্রান্ত সব প্রশ্নের বিস্তারিত উত্তর এক জায়গায়।"
      />

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="rounded-[24px] border border-border bg-card p-4 shadow-sm md:p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="faq-search" className="sr-only">প্রশ্ন খুঁজুন</label>
            <input
              id="faq-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="প্রশ্ন খুঁজুন…"
              className="h-12 w-full rounded-[16px] border border-input bg-background pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  cat === c
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {filtered.length === 0 ? (
            <p className="rounded-[22px] border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              কোনো প্রশ্ন পাওয়া যায়নি। অন্য কিওয়ার্ড দিয়ে চেষ্টা করুন।
            </p>
          ) : (
            filtered.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className="overflow-hidden rounded-[22px] border border-border bg-card shadow-sm transition hover:border-primary/40"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:p-6"
                  >
                    <span className="hidden shrink-0 rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-medium text-secondary md:inline-block">
                      {f.category}
                    </span>
                    <span className="flex-1 font-display text-base font-semibold text-foreground md:text-lg">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    hidden={!isOpen}
                    className="border-t border-border bg-muted/30 px-5 py-4 text-sm leading-relaxed text-foreground/80 md:px-6 md:py-5 md:text-base"
                  >
                    {f.a}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-12 rounded-[24px] border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center md:p-10">
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            আপনার প্রশ্নের উত্তর পাননি?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            আমাদের কনসালট্যান্ট টিম আপনার সহায়তায় প্রস্তুত। এখনই যোগাযোগ করুন।
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="gold" size="lg">
              <a href="tel:+8801711381422"><Phone className="mr-2 h-4 w-4" /> এখনই কল করুন</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://wa.me/8801711381422" target="_blank" rel="noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
