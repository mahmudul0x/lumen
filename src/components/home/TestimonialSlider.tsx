import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initial: string;
};

const items: Testimonial[] = [
  {
    name: "প্রকৌশলী রফিকুল ইসলাম",
    role: "গ্রাহক — Lumen Galaxy",
    initial: "র",
    quote:
      "প্রতিটি ধাপে স্বচ্ছতা ও পেশাদারিত্ব দেখেছি। চুক্তির সময়ানুযায়ী চাবি হাতে পেয়েছি — এটাই আসল বিশ্বাস।",
  },
  {
    name: "ডাঃ সাবিহা সুলতানা",
    role: "গ্রাহক — Lumen Jolchaya",
    initial: "স",
    quote:
      "রংপুরে এত মানসম্পন্ন কনস্ট্রাকশন খুঁজে পাওয়া কঠিন। Lumen Builders আমাকে সেই আস্থা দিয়েছে।",
  },
  {
    name: "মোঃ শাহজাহান কবির",
    role: "বিনিয়োগকারী — Land Share",
    initial: "শ",
    quote:
      "জমি শেয়ার প্রকল্পে আমার বিনিয়োগ সম্পূর্ণ নিরাপদ ও লাভজনক প্রমাণিত হয়েছে। অসাধারণ টিম।",
  },
  {
    name: "নাসরিন আহমেদ",
    role: "গ্রাহক — Lumen Horizon",
    initial: "না",
    quote:
      "হ্যান্ডওভারের পরেও তারা যেভাবে সাপোর্ট দিচ্ছে, সত্যিই মুগ্ধ। পরিবারের সবাই খুশি।",
  },
];

export function TestimonialSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    const id = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(id);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((t, i) => (
            <div
              key={i}
              className="min-w-0 flex-[0_0_100%] px-2 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex h-full flex-col justify-between rounded-[22px] border border-border bg-surface p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-float"
              >
                <Quote className="absolute -top-4 right-6 h-10 w-10 rounded-full bg-gold p-2 text-primary shadow-soft" />
                <div>
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-lg font-bold text-white">
                    {t.initial}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          aria-label="আগের রিভিউ"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:border-gold hover:bg-gold hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                selected === i ? "w-8 bg-gold" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="পরের রিভিউ"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:border-gold hover:bg-gold hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
