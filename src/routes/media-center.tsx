import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, Download, Newspaper, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { CTABanner } from "@/components/ui/cta-banner";
import { Button } from "@/components/ui/button";
import { corporateImages, mediaDownloads, pressReleases } from "@/lib/corporate-data";

export const Route = createFileRoute("/media-center")({
  head: () => ({
    meta: [
      { title: "মিডিয়া সেন্টার — Lumen Builders Ltd." },
      { name: "description", content: "কোম্পানি প্রোফাইল, ব্রোশিওর, প্রেস রিলিজ ও কর্পোরেট ডকুমেন্ট ডাউনলোড করুন।" },
      { property: "og:title", content: "মিডিয়া সেন্টার — Lumen Builders" },
      { property: "og:description", content: "প্রেস, ব্রোশিওর ও কর্পোরেট ডকুমেন্ট।" },
      { property: "og:url", content: "/media-center" },
    ],
    links: [{ rel: "canonical", href: "/media-center" }],
  }),
  component: MediaCenterPage,
});

function MediaCenterPage() {
  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.hero}
        eyebrow="মিডিয়া সেন্টার"
        title="প্রেস, ব্রোশিওর ও কর্পোরেট রিসোর্স"
        description="সাংবাদিক, বিনিয়োগকারী ও গ্রাহকদের জন্য প্রয়োজনীয় সকল ডকুমেন্ট এক জায়গায়।"
        breadcrumbs={[{ label: "মিডিয়া সেন্টার" }]}
        height="md"
      />

      {/* Downloads */}
      <section className="container-luxury py-20 md:py-24">
        <SectionHeader eyebrow="ডাউনলোড" title="কর্পোরেট ডকুমেন্ট" align="center" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
          {mediaDownloads.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-5 rounded-[24px] border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-card">
                <FileText className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-primary">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">{d.type} · {d.size}</p>
              </div>
              <Button asChild variant="gold" size="sm">
                <Link to="/brochure"><Download className="mr-1.5 h-4 w-4" /> ডাউনলোড</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Press Releases */}
      <section className="bg-muted/40 py-20 md:py-24">
        <div className="container-luxury">
          <SectionHeader eyebrow="প্রেস রিলিজ" title="সাম্প্রতিক ঘোষণা" align="center" />
          <div className="mx-auto mt-14 max-w-4xl space-y-3">
            {pressReleases.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                  <Newspaper className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold">{p.date}</p>
                  <p className="mt-0.5 font-semibold text-primary transition-colors group-hover:text-accent">{p.title}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-24">
        <CTABanner
          title="মিডিয়া অনুসন্ধানের জন্য যোগাযোগ করুন"
          description="সাংবাদিক ও মিডিয়া সহযোগীদের জন্য বিশেষ সমন্বয়কারী।"
          primary={{ label: "যোগাযোগ", to: "/contact" }}
          secondary={{ label: "কল করুন", to: "/callback" }}
        />
      </div>
    </SiteShell>
  );
}
