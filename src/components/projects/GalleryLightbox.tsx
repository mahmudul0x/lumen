import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from "lucide-react";

export function GalleryLightbox({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, images.length]);

  return (
    <>
      {/* Masonry grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setIdx(i); setOpen(true); }}
            className={`group relative overflow-hidden rounded-[24px] shadow-soft transition hover:shadow-float ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <img
              src={src}
              alt={`${alt} — ছবি ${i + 1}`}
              loading="lazy"
              className="h-full min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              <ZoomIn className="h-8 w-8 text-white" />
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-4" role="dialog" aria-modal="true">
          <button
            type="button" aria-label="বন্ধ করুন"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          ><X className="h-5 w-5" /></button>

          <button
            type="button" aria-label="পূর্ববর্তী"
            onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          ><ChevronLeft className="h-6 w-6" /></button>

          <button
            type="button" aria-label="পরবর্তী"
            onClick={() => setIdx((i) => (i + 1) % images.length)}
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          ><ChevronRight className="h-6 w-6" /></button>

          <div className="relative max-h-[85vh] max-w-6xl">
            <img src={images[idx]} alt={`${alt} — ছবি ${idx + 1}`} className="max-h-[85vh] max-w-full rounded-[16px] object-contain" />
          </div>

          <div className="absolute inset-x-0 bottom-4 mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full bg-white/10 px-5 py-2.5 text-sm text-white backdrop-blur">
            <span>{idx + 1} / {images.length}</span>
            <a href={images[idx]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gold">
              <Maximize2 className="h-4 w-4" /> ফুলস্ক্রিন
            </a>
          </div>
        </div>
      )}
    </>
  );
}
