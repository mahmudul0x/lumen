import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { corporateImages, galleryItems, galleryCategories, type GalleryItem } from "@/lib/corporate-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "গ্যালারি — Lumen Builders Ltd." },
      { name: "description", content: "প্রকল্প, নির্মাণ, ইন্টেরিয়র, অফিস, ইভেন্ট ও হ্যান্ডওভারের প্রিমিয়াম গ্যালারি।" },
      { property: "og:title", content: "গ্যালারি — Lumen Builders" },
      { property: "og:description", content: "আমাদের প্রকল্পের ছবি ও ভিজ্যুয়াল গ্যালারি।" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState("সবগুলো");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () => active === "সবগুলো" ? galleryItems : galleryItems.filter((g) => g.category === active),
    [active],
  );

  const openImage = openIdx !== null ? filtered[openIdx] : null;

  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.interior}
        eyebrow="গ্যালারি"
        title="আমাদের কাজ, আমাদের গর্ব"
        description="প্রকল্প এক্সটেরিয়র, ইন্টেরিয়র, নির্মাণ, ইভেন্ট ও হ্যান্ডওভার — সব এক জায়গায়।"
        breadcrumbs={[{ label: "গ্যালারি" }]}
        height="md"
      />

      {/* Filters */}
      <section className="sticky top-20 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="container-luxury flex gap-2 overflow-x-auto py-4">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === c
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "border border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="container-luxury py-14">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <MasonryCell key={i} item={item} index={i} onOpen={() => setOpenIdx(i)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">এই ক্যাটাগরিতে কোনো ছবি পাওয়া যায়নি।</p>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {openImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
            onClick={() => setOpenIdx(null)}
          >
            <button
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={() => setOpenIdx(null)}
              aria-label="বন্ধ করুন"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setOpenIdx((idx) => idx === null ? null : (idx - 1 + filtered.length) % filtered.length); }}
              aria-label="পূর্ববর্তী"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setOpenIdx((idx) => idx === null ? null : (idx + 1) % filtered.length); }}
              aria-label="পরবর্তী"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.img
              key={openIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={openImage.src}
              alt={openImage.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-float"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-5 py-2 text-sm text-white backdrop-blur">
              {openImage.alt} · <span className="text-gold">{openImage.category}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteShell>
  );
}

function MasonryCell({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: () => void }) {
  const span =
    item.span === "large" ? "col-span-2 row-span-2" :
    item.span === "wide" ? "col-span-2" :
    item.span === "tall" ? "row-span-2" : "";
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className={`group relative overflow-hidden rounded-[20px] shadow-soft transition-shadow hover:shadow-card ${span}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="text-left text-white">
          <p className="text-sm font-semibold">{item.alt}</p>
          <p className="text-xs text-gold">{item.category}</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gold text-white shadow-gold">
          <ZoomIn className="h-4 w-4" />
        </div>
      </div>
    </motion.button>
  );
}
