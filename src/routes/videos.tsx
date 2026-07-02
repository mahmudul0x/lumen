import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X, Clock } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { corporateImages, videos } from "@/lib/corporate-data";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "ভিডিও গ্যালারি — Lumen Builders Ltd." },
      { name: "description", content: "প্রকল্প ট্যুর, কোম্পানি পরিচিতি, নির্মাণ প্রক্রিয়া ও গ্রাহকদের অভিজ্ঞতার ভিডিও।" },
      { property: "og:title", content: "ভিডিও গ্যালারি — Lumen Builders" },
      { property: "og:description", content: "প্রিমিয়াম ভিডিও ট্যুর ও অভিজ্ঞতা।" },
      { property: "og:url", content: "/videos" },
    ],
    links: [{ rel: "canonical", href: "/videos" }],
  }),
  component: VideosPage,
});

function VideosPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const openVideo = openIdx !== null ? videos[openIdx] : null;

  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.hero}
        eyebrow="ভিডিও গ্যালারি"
        title="আমাদের কাজকে দেখুন"
        description="প্রকল্প ট্যুর, নির্মাণ প্রক্রিয়া ও সন্তুষ্ট গ্রাহকদের গল্প।"
        breadcrumbs={[{ label: "ভিডিও গ্যালারি" }]}
        height="md"
      />

      <section className="container-luxury py-20 md:py-24">
        <SectionHeader eyebrow="আমাদের ভিডিও" title="সব ভিডিও এক জায়গায়" align="center" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
          {videos.map((v, i) => (
            <motion.button
              key={v.title}
              onClick={() => setOpenIdx(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[24px] border border-border/60 bg-card text-left shadow-card transition-shadow hover:shadow-float"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={v.thumbnail} alt={v.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-gold text-white shadow-gold transition-transform group-hover:scale-110">
                    <Play className="ml-1 h-8 w-8 fill-current" />
                  </div>
                </div>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <Clock className="h-3 w-3" /> {v.duration}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {openVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
          >
            <button
              onClick={() => setOpenIdx(null)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="বন্ধ করুন"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-float"
            >
              {openVideo.youtubeId ? (
                <iframe
                  className="aspect-video w-full"
                  src={`https://www.youtube.com/embed/${openVideo.youtubeId}?autoplay=1`}
                  title={openVideo.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <div className="relative aspect-video">
                  <img src={openVideo.thumbnail} alt={openVideo.title} className="h-full w-full object-cover opacity-50" />
                  <div className="absolute inset-0 grid place-items-center text-white">
                    <div className="text-center">
                      <Play className="mx-auto h-14 w-14 text-gold" />
                      <p className="mt-4 font-display text-2xl font-bold">{openVideo.title}</p>
                      <p className="mt-2 text-white/70">ভিডিওটি শীঘ্রই আপলোড করা হবে</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteShell>
  );
}
