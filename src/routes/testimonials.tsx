import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { CTABanner } from "@/components/ui/cta-banner";
import { corporateImages, testimonials } from "@/lib/corporate-data";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "গ্রাহকদের মতামত — Lumen Builders Ltd." },
      { name: "description", content: "সন্তুষ্ট গ্রাহকদের প্রকৃত অভিজ্ঞতা — Lumen Builders-এ কেন হাজারো পরিবার আস্থা রেখেছে।" },
      { property: "og:title", content: "গ্রাহকদের মতামত — Lumen Builders" },
      { property: "og:description", content: "গ্রাহকদের অভিজ্ঞতা ও রিভিউ।" },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.handover}
        eyebrow="গ্রাহকদের মতামত"
        title="আমাদের সবচেয়ে বড় সম্পদ — সন্তুষ্ট গ্রাহক"
        description="১০০০+ পরিবারের বিশ্বাস, শত শত রিভিউ — আমাদের কাজের প্রকৃত প্রমাণ।"
        breadcrumbs={[{ label: "গ্রাহকদের মতামত" }]}
        height="md"
      />

      {/* Featured slider */}
      <section className="container-luxury py-20">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-card via-card to-muted/40 p-8 shadow-float md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-8 md:grid-cols-[180px_1fr] md:items-center"
            >
              <div className="relative mx-auto md:mx-0">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-gold/40 to-primary/20 blur-xl" aria-hidden />
                <img
                  src={t.image}
                  alt={t.name}
                  className="relative h-40 w-40 rounded-full border-4 border-gold object-cover shadow-gold"
                  loading="lazy"
                />
              </div>
              <div>
                <Quote className="h-10 w-10 text-gold/60" />
                <p className="mt-3 text-[17px] leading-relaxed text-foreground/85 md:text-lg">
                  "{t.review}"
                </p>
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <div className="mt-4">
                  <p className="font-display text-xl font-bold text-primary">{t.name}</p>
                  <p className="text-sm text-muted-foreground">গ্রাহক — {t.project}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
            <button
              onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background hover:border-primary hover:text-primary"
              aria-label="পূর্ববর্তী"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-2 bg-border"}`}
                  aria-label={`রিভিউ ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background hover:border-primary hover:text-primary"
              aria-label="পরবর্তী"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* All reviews grid */}
      <section className="bg-muted/40 py-20 md:py-24">
        <div className="container-luxury">
          <SectionHeader eyebrow="সব রিভিউ" title="আরও গ্রাহকদের কথা" align="center" />
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-[24px] border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} loading="lazy" className="h-14 w-14 rounded-full border-2 border-gold/40 object-cover" />
                  <div>
                    <p className="font-display font-bold text-primary">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.project}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => <Star key={s} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">"{t.review}"</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-24">
        <CTABanner
          title="আপনিও হোন আমাদের পরবর্তী সন্তুষ্ট গ্রাহক"
          primary={{ label: "সাইট ভিজিট বুক করুন", to: "/book-visit" }}
          secondary={{ label: "যোগাযোগ", to: "/contact" }}
        />
      </div>
    </SiteShell>
  );
}
