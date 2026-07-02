import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectGalaxy from "@/assets/project-galaxy.jpg";
import projectJolchaya from "@/assets/project-jolchaya.jpg";
import projectSkyline from "@/assets/project-skyline.jpg";
import projectHorizon from "@/assets/project-horizon.jpg";
import projectEmerald from "@/assets/project-emerald.jpg";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  gold: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    image: projectGalaxy,
    eyebrow: "Lumen Galaxy — রংপুর",
    title: "আপনার স্বপ্নের আবাসন,",
    gold: "আমাদের অঙ্গীকার।",
    subtitle:
      "রংপুরের প্রাইম লোকেশনে আন্তর্জাতিক মানের প্রিমিয়াম অ্যাপার্টমেন্ট — নিরাপদ, স্বচ্ছ ও দীর্ঘমেয়াদী বিনিয়োগ।",
  },
  {
    image: projectJolchaya,
    eyebrow: "Lumen Jolchaya — শাপলা চত্বর",
    title: "শহরের হৃদয়ে,",
    gold: "প্রিমিয়াম জীবনযাত্রা।",
    subtitle:
      "প্রতিটি ইউনিটে আধুনিক ইন্টেরিয়র, প্রশস্ত ব্যালকনি ও প্রকৃতির সাথে যুক্ততা।",
  },
  {
    image: projectSkyline,
    eyebrow: "Lumen Skyline Heights",
    title: "উঁচু আকাশের নিচে,",
    gold: "নতুন দিগন্ত।",
    subtitle:
      "১৮-তলা লাইফস্টাইল টাওয়ার — সুইমিং পুল, স্কাই লাউঞ্জ ও কমিউনিটি সেন্টার সহ।",
  },
  {
    image: projectHorizon,
    eyebrow: "Lumen Horizon — সম্পন্ন প্রকল্প",
    title: "সময়মতো হস্তান্তর,",
    gold: "আজীবন বিশ্বাস।",
    subtitle:
      "চুক্তিমতো নির্মাণ, নির্ধারিত সময়ে চাবি হস্তান্তর — এটাই আমাদের প্রতিশ্রুতি।",
  },
  {
    image: projectEmerald,
    eyebrow: "Lumen Emerald Court",
    title: "বুটিক রেসিডেন্স,",
    gold: "নীরব বিলাসিতা।",
    subtitle:
      "সীমিত সংখ্যক পরিবারের জন্য তৈরি — গোপনীয়তা, সৌন্দর্য ও নিরাপত্তার নিখুঁত ভারসাম্য।",
  },
];

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    const id = setInterval(() => emblaApi.scrollNext(), 6500);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(id);
    };
  }, [emblaApi]);

  const active = slides[selected];

  return (
    <section className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-primary text-white">
      {/* Slides — image only, Ken Burns zoom */}
      <div ref={emblaRef} className="absolute inset-0 h-full w-full">
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div key={i} className="relative h-full w-full flex-[0_0_100%]">
              <motion.img
                key={`${i}-${selected === i}`}
                src={s.image}
                alt=""
                className="h-full w-full object-cover"
                initial={{ scale: 1.05 }}
                animate={selected === i ? { scale: 1.18 } : { scale: 1.05 }}
                transition={{ duration: 7.5, ease: "linear" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Luxury dark gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,45,107,0.45)_0%,rgba(11,45,107,0.55)_35%,rgba(0,0,0,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-[linear-gradient(90deg,rgba(0,0,0,0.65),transparent)]" />

      {/* Content */}
      <div className="container-luxury relative z-10 flex h-full flex-col justify-end pb-24 pt-40 md:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {active.eyebrow}
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              {active.title}
              <br />
              <span className="text-gold">{active.gold}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              {active.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl">
                <Link to="/projects/ongoing">
                  প্রকল্প দেখুন <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90">
                <Link to="/booking">বুকিং করুন</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-white/40 bg-white/5 text-white backdrop-blur hover:bg-white hover:text-primary"
              >
                <Link to="/brochure">
                  <Download className="h-4 w-4" /> ব্রোশিওর ডাউনলোড
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`স্লাইড ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  selected === i ? "w-14 bg-gold" : "w-8 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
            <span className="ml-4 text-xs font-medium tracking-widest text-white/70">
              {String(selected + 1).padStart(2, "0")}
              <span className="mx-1 text-white/40">/</span>
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={prev}
              aria-label="আগের স্লাইড"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur transition hover:border-gold hover:bg-gold hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="পরের স্লাইড"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur transition hover:border-gold hover:bg-gold hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
