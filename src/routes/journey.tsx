import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { CTABanner } from "@/components/ui/cta-banner";
import { corporateImages, milestones } from "@/lib/corporate-data";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "আমাদের যাত্রা — Lumen Builders Ltd." },
      { name: "description", content: "২০১০ থেকে বর্তমান — Lumen Builders Ltd.-এর অগ্রযাত্রার সম্পূর্ণ টাইমলাইন।" },
      { property: "og:title", content: "আমাদের যাত্রা — Lumen Builders" },
      { property: "og:description", content: "১৫ বছরের বিশ্বস্ত যাত্রা।" },
      { property: "og:url", content: "/journey" },
    ],
    links: [{ rel: "canonical", href: "/journey" }],
  }),
  component: JourneyPage,
});

function JourneyPage() {
  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.construction}
        eyebrow="আমাদের যাত্রা"
        title="প্রতিটি ইট বলে আমাদের গল্প"
        description="২০১০ সালের একটি ছোট স্বপ্ন থেকে উত্তরাঞ্চলের বিশ্বাসযোগ্য নাম হয়ে ওঠার পথ।"
        breadcrumbs={[{ label: "আমাদের যাত্রা" }]}
      />

      <section className="container-luxury py-20 md:py-28">
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2 md:-translate-x-1/2" aria-hidden />
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative mb-14 flex items-start gap-6 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="absolute left-6 top-6 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-gold shadow-gold ring-4 ring-background md:left-1/2">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
              <div className={`ml-16 flex-1 rounded-[24px] border border-border/60 bg-card p-6 shadow-card md:ml-0 md:p-8 ${i % 2 === 0 ? "md:mr-16" : "md:ml-16"}`}>
                <span className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-sm font-bold text-white">
                  {m.year}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-primary md:text-3xl">{m.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{m.description}</p>
              </div>
              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </section>

      <div className="pb-24">
        <CTABanner
          title="আমাদের যাত্রার পরবর্তী অধ্যায়ে আপনি হোন সঙ্গী"
          primary={{ label: "প্রকল্প দেখুন", to: "/projects" }}
          secondary={{ label: "যোগাযোগ", to: "/contact" }}
        />
      </div>
    </SiteShell>
  );
}
