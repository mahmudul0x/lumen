import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Award as AwardIcon, ShieldCheck, Handshake } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { corporateImages, achievements, awards, certifications, partners } from "@/lib/corporate-data";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "আমাদের অর্জন — Lumen Builders Ltd." },
      { name: "description", content: "পুরস্কার, সার্টিফিকেশন, পরিসংখ্যান ও পার্টনার — Lumen Builders-এর অর্জনসমূহ।" },
      { property: "og:title", content: "আমাদের অর্জন — Lumen Builders" },
      { property: "og:description", content: "পুরস্কার, স্বীকৃতি ও পার্টনারশিপ।" },
      { property: "og:url", content: "/achievements" },
    ],
    links: [{ rel: "canonical", href: "/achievements" }],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.handover}
        eyebrow="আমাদের অর্জন"
        title="স্বীকৃতি, বিশ্বাস ও পার্টনারশিপ"
        description="১৫ বছরে আমরা যা অর্জন করেছি — সংখ্যা, পুরস্কার এবং বিশ্বস্ত পার্টনারদের মাধ্যমে।"
        breadcrumbs={[{ label: "আমাদের অর্জন" }]}
      />

      <section className="container-luxury py-20 md:py-24">
        <SectionHeader eyebrow="সংখ্যায় Lumen" title="আমাদের প্রভাব" align="center" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {achievements.map((a) => <StatCard key={a.label} value={a.value} label={a.label} />)}
        </div>
      </section>

      {/* Awards */}
      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container-luxury">
          <SectionHeader eyebrow="পুরস্কার" title="স্বীকৃতিসমূহ" align="center" />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            {awards.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="flex gap-5 rounded-[24px] border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-card md:p-7"
              >
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold to-secondary text-white shadow-gold">
                  <Trophy className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">{a.year}</span>
                  <h3 className="mt-1 font-display text-xl font-bold text-primary">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-luxury py-20 md:py-28">
        <SectionHeader eyebrow="সার্টিফিকেশন" title="আইনি বৈধতা ও গুণগত মান" align="center" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-[22px] border border-border/60 bg-card p-6 shadow-soft"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-primary">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold">{c.year}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container-luxury">
          <SectionHeader eyebrow="বিশ্বস্ত পার্টনার" title="যাদের সাথে আমরা কাজ করি" align="center" />
          <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Handshake className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-24">
        <CTABanner
          title="আপনিও হোন আমাদের বিশ্বাসের অংশ"
          primary={{ label: "সাইট ভিজিট বুক করুন", to: "/book-visit" }}
          secondary={{ label: "যোগাযোগ", to: "/contact" }}
        />
      </div>
    </SiteShell>
  );
}

void AwardIcon;
