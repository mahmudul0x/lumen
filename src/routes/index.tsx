import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  HandshakeIcon,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Award,
  Users,
  Wrench,
  HardHat,
  BedDouble,
  ChefHat,
  ArrowUpDown,
  Zap,
  Radio,
  Bell,
  Camera,
  Car,
  Droplets,
  TrendingUp,
  LineChart,
  Landmark,
  Wallet,
  PlayCircle,
  Phone,
  MessageCircle,
  CalendarCheck,
  Trophy,
  Home as HomeIcon,
  ArrowUpRight,
  Ruler,
  BadgeCheck,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { ProjectCard, type Project } from "@/components/ui/project-card";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CountUp } from "@/components/home/CountUp";
import { TestimonialSlider } from "@/components/home/TestimonialSlider";
import { site } from "@/lib/site";
import projectGalaxy from "@/assets/project-galaxy.jpg";
import projectJolchaya from "@/assets/project-jolchaya.jpg";
import projectHorizon from "@/assets/project-horizon.jpg";
import projectSkyline from "@/assets/project-skyline.jpg";
import projectEmerald from "@/assets/project-emerald.jpg";
import construction from "@/assets/construction.jpg";
import interior from "@/assets/interior.jpg";
import corporateHero from "@/assets/corporate-hero.jpg";
import handover from "@/assets/handover.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen Builders Ltd. — স্বপ্নের বাড়ি, নিজেই গড়ি" },
      {
        name: "description",
        content:
          "রংপুরের প্রিমিয়াম রিয়েল এস্টেট প্রতিষ্ঠান — লাক্সারি ফ্ল্যাট, চলমান ও সম্পন্ন প্রকল্প, জমি শেয়ার এবং দীর্ঘমেয়াদী বিনিয়োগে বিশ্বস্ত অংশীদার।",
      },
      { property: "og:title", content: "Lumen Builders Ltd. — We Build Trust, We Build Dreams" },
      { property: "og:description", content: "রংপুরের অন্যতম বিশ্বস্ত রিয়েল এস্টেট প্রতিষ্ঠান।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

// ────────────────────────────── data ──────────────────────────────

const trustItems = [
  { icon: Award, label: "১০+ বছরের অভিজ্ঞতা" },
  { icon: ShieldCheck, label: "বিশ্বস্ত নির্মাণ প্রতিষ্ঠান" },
  { icon: Wallet, label: "দীর্ঘমেয়াদী কিস্তি" },
  { icon: MapPin, label: "প্রিমিয়াম লোকেশন" },
];

const featured: (Project & { priceFrom: string; size: string })[] = [
  {
    slug: "lumen-galaxy",
    name: "Lumen Galaxy",
    location: "আর. কে. রোড, রংপুর",
    status: "চলমান",
    type: "লাক্সারি অ্যাপার্টমেন্ট",
    image: projectGalaxy,
    priceFrom: "৳ ৭৫ লক্ষ",
    size: "১৪৫০ – ১৮০০ স্কয়ার ফুট",
  },
  {
    slug: "lumen-jolchaya",
    name: "Lumen Jolchaya",
    location: "শাপলা চত্বর, রংপুর",
    status: "চলমান",
    type: "প্রিমিয়াম ফ্ল্যাট",
    image: projectJolchaya,
    priceFrom: "৳ ৬৮ লক্ষ",
    size: "১৩২০ – ১৬৫০ স্কয়ার ফুট",
  },
  {
    slug: "lumen-skyline-heights",
    name: "Lumen Skyline Heights",
    location: "কলেজ রোড, রংপুর",
    status: "চলমান",
    type: "লাইফস্টাইল টাওয়ার",
    image: projectSkyline,
    priceFrom: "৳ ৯২ লক্ষ",
    size: "১৬৫০ – ২১০০ স্কয়ার ফুট",
  },
];

const ongoing: (Project & { progress: number; completion: string })[] = [
  {
    slug: "lumen-galaxy",
    name: "Lumen Galaxy",
    location: "আর. কে. রোড, রংপুর",
    status: "চলমান",
    type: "লাক্সারি অ্যাপার্টমেন্ট",
    image: projectGalaxy,
    progress: 62,
    completion: "ডিসেম্বর ২০২৬",
  },
  {
    slug: "lumen-jolchaya",
    name: "Lumen Jolchaya",
    location: "শাপলা চত্বর, রংপুর",
    status: "চলমান",
    type: "প্রিমিয়াম ফ্ল্যাট",
    image: projectJolchaya,
    progress: 45,
    completion: "জুন ২০২৭",
  },
  {
    slug: "lumen-skyline-heights",
    name: "Skyline Heights",
    location: "কলেজ রোড, রংপুর",
    status: "চলমান",
    type: "লাইফস্টাইল টাওয়ার",
    image: projectSkyline,
    progress: 28,
    completion: "মার্চ ২০২৮",
  },
];

const completed: Project[] = [
  {
    slug: "lumen-horizon",
    name: "Lumen Horizon",
    location: "মেডিকেল রোড, রংপুর",
    status: "সম্পন্ন",
    type: "গার্ডেন রেসিডেন্স",
    image: projectHorizon,
  },
  {
    slug: "lumen-emerald-court",
    name: "Lumen Emerald Court",
    location: "ধাপ, রংপুর",
    status: "সম্পন্ন",
    type: "বুটিক রেসিডেন্স",
    image: projectEmerald,
  },
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "বিশ্বস্ত প্রতিষ্ঠান",
    description: "১০+ বছরের সুনামের সাথে হাজারো পরিবারের আস্থা।",
  },
  {
    icon: Sparkles,
    title: "আধুনিক নকশা",
    description: "আন্তর্জাতিক মানের স্থাপত্য ও প্রিমিয়াম ইন্টেরিয়র।",
  },
  {
    icon: Clock,
    title: "সময়মতো হস্তান্তর",
    description: "চুক্তি অনুযায়ী নির্ধারিত সময়ে চাবি হস্তান্তর।",
  },
  {
    icon: HardHat,
    title: "উন্নত নির্মাণ সামগ্রী",
    description: "আন্তর্জাতিক ব্র্যান্ডের যাচাইকৃত কনস্ট্রাকশন ম্যাটেরিয়াল।",
  },
  {
    icon: Wallet,
    title: "দীর্ঘমেয়াদী কিস্তি",
    description: "নমনীয় EMI পরিকল্পনা — সহজ শর্তে বুকিং।",
  },
  {
    icon: HandshakeIcon,
    title: "গ্রাহক সন্তুষ্টি",
    description: "হ্যান্ডওভারের পরেও নিয়মিত সাপোর্ট ও সেবা।",
  },
];

const amenities = [
  { icon: BedDouble, label: "৩ বেডরুম" },
  { icon: ChefHat, label: "মডার্ন কিচেন" },
  { icon: ArrowUpDown, label: "লিফট" },
  { icon: Zap, label: "জেনারেটর" },
  { icon: Radio, label: "সাব-স্টেশন" },
  { icon: Bell, label: "রিসেপশন" },
  { icon: Camera, label: "২৪/৭ সিকিউরিটি" },
  { icon: Car, label: "কার পার্কিং" },
  { icon: Droplets, label: "কার ওয়াশ" },
];

const investment = [
  { icon: MapPin, title: "প্রাইম লোকেশন", desc: "রংপুরের সবচেয়ে সম্ভাবনাময় এলাকায় প্রকল্প।" },
  {
    icon: TrendingUp,
    title: "ভবিষ্যৎ মূল্যবৃদ্ধি",
    desc: "প্রতি বছর গড়ে ১২-১৫% সম্পদ মূল্যায়ন।",
  },
  {
    icon: ShieldCheck,
    title: "নিরাপদ বিনিয়োগ",
    desc: "সম্পূর্ণ আইনি ডকুমেন্টেশন ও স্বচ্ছ চুক্তি।",
  },
  { icon: LineChart, title: "নমনীয় EMI", desc: "১২ মাস থেকে ৭২ মাস পর্যন্ত কিস্তি সুবিধা।" },
];

const blogs = [
  {
    title: "রিয়েল এস্টেটে বিনিয়োগ — নতুনদের জন্য সম্পূর্ণ গাইড",
    tag: "বিনিয়োগ",
    date: "১৫ জুন ২০২৬",
    image: corporateHero,
  },
  {
    title: "রংপুরে ফ্ল্যাট কেনার আগে যা যাচাই করবেন",
    tag: "গাইড",
    date: "০৮ জুন ২০২৬",
    image: interior,
  },
  {
    title: "জমি শেয়ার প্রকল্প কীভাবে কাজ করে?",
    tag: "প্রকল্প",
    date: "০১ জুন ২০২৬",
    image: handover,
  },
];

// ────────────────────────────── page ──────────────────────────────

function HomePage() {
  return (
    <SiteShell>
      {/* 3. HERO SLIDER */}
      <HeroSlider />

      {/* 4. TRUST STRIP — floating cards */}
      <section className="container-luxury relative z-20 mt-6 md:mt-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-2.5 rounded-[24px] border border-border bg-surface p-3 shadow-float sm:gap-3 md:grid-cols-4 md:rounded-[28px] md:p-6"
        >
          {trustItems.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className="group flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition hover:bg-primary-soft sm:flex-row sm:items-center sm:gap-4 sm:text-left sm:p-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white shadow-soft transition group-hover:from-gold group-hover:to-gold group-hover:text-primary sm:h-12 sm:w-12">
                  <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <span className="min-w-0 text-xs font-semibold leading-tight text-foreground sm:text-sm">
                  {t.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="container-luxury cv-auto py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:flex-wrap sm:justify-between">
          <SectionHeader
            eyebrow="ফিচার্ড প্রকল্প"
            title="আমাদের সিগনেচার প্রিমিয়াম প্রকল্পসমূহ"
            description="প্রতিটি প্রকল্প — অবস্থান, স্থাপত্য ও নির্মাণে অনন্য।"
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/projects/ongoing">
              সব প্রকল্প <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group overflow-hidden rounded-[22px] border border-border bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-float"
            >
              <Link to="/projects/$slug" params={{ slug: p.slug }} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary shadow-soft">
                    {p.status}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                      {p.type}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold leading-tight">{p.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                      <MapPin className="h-3.5 w-3.5" /> {p.location}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-border p-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      সাইজ
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <Ruler className="h-3.5 w-3.5 text-gold" /> {p.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      শুরু
                    </p>
                    <p className="mt-1 text-sm font-bold text-primary">{p.priceFrom}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border bg-primary-soft px-6 py-4">
                  <span className="text-sm font-semibold text-primary">বিস্তারিত দেখুন</span>
                  <ArrowUpRight className="h-4 w-4 text-primary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE */}
      <section className="bg-surface-strong cv-auto py-24">
        <div className="container-luxury">
          <SectionHeader
            eyebrow="কেন Lumen Builders"
            title="যে ৬টি কারণে আমরা রংপুরের শীর্ষে"
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:mt-14 lg:grid-cols-3">
            {whyChoose.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <FeatureCard {...f} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ONGOING PROJECTS */}
      <section className="container-luxury cv-auto py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:flex-wrap sm:justify-between">
          <SectionHeader eyebrow="নির্মাণাধীন" title="চলমান প্রকল্পসমূহ" />
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/projects/ongoing">
              সব দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ongoing.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-[22px] border border-border bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-float"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                />
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <HardHat className="h-3 w-3" /> {p.status}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                  {p.type}
                </p>
                <h3 className="mt-1 text-lg font-bold text-foreground">{p.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </p>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">নির্মাণ অগ্রগতি</span>
                    <span className="text-primary">{p.progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-emerald" /> সম্পন্ন হবে:{" "}
                  <span className="font-semibold text-foreground">{p.completion}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. COMPLETED PROJECTS */}
      <section className="bg-surface-strong cv-auto py-24">
        <div className="container-luxury">
          <SectionHeader eyebrow="সম্পন্ন" title="হ্যান্ডওভার সম্পন্ন প্রকল্পসমূহ" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-4">
            {[
              { ...completed[0], span: "lg:col-span-2 lg:row-span-2" },
              { ...completed[1], span: "lg:col-span-2" },
              {
                name: "হ্যান্ডওভার মুহূর্ত",
                location: "রংপুর",
                image: handover,
                span: "lg:col-span-1",
              },
              {
                name: "ইন্টেরিয়র ফিনিশিং",
                location: "সম্পন্ন",
                image: interior,
                span: "lg:col-span-1",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-[22px] shadow-card ${p.span}`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <BadgeCheck className="h-3 w-3" /> সম্পন্ন
                </span>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                    <MapPin className="h-3.5 w-3.5" /> {p.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. APARTMENT FEATURES */}
      <section className="container-luxury cv-auto py-24">
        <SectionHeader
          eyebrow="ফ্ল্যাট সুবিধাসমূহ"
          title="প্রতিটি ইউনিটে প্রিমিয়াম অ্যামেনিটিস"
          align="center"
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {amenities.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group flex flex-col items-center gap-4 rounded-[22px] border border-border bg-surface p-8 text-center shadow-soft transition hover:-translate-y-1 hover:border-gold hover:shadow-gold"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary transition group-hover:bg-gold group-hover:text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-semibold text-foreground">{a.label}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 10. CONSTRUCTION QUALITY */}
      <section className="relative cv-auto overflow-hidden bg-primary text-white">
        <img
          src={construction}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
        <div className="container-luxury relative z-10 grid gap-14 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> নির্মাণের মান
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
              প্রতিটি ইট, প্রতিটি স্তরে —<br />
              <span className="text-gold">আন্তর্জাতিক মানের নিশ্চয়তা।</span>
            </h2>
            <p className="mt-5 max-w-xl text-white/85">
              আধুনিক প্রকৌশল, যাচাইকৃত সামগ্রী ও সর্বোচ্চ নিরাপত্তা মান — Lumen Builders-এর প্রতিটি
              প্রকল্পে অটল প্রতিশ্রুতি।
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Wrench,
                  title: "কোয়ালিটি ম্যাটেরিয়াল",
                  desc: "আন্তর্জাতিক ব্র্যান্ডের সিমেন্ট, রড ও ফিনিশিং।",
                },
                {
                  icon: HardHat,
                  title: "প্রকৌশল দক্ষতা",
                  desc: "অভিজ্ঞ সিভিল ইঞ্জিনিয়ার ও স্থপতির তত্ত্বাবধান।",
                },
                {
                  icon: ShieldCheck,
                  title: "সেফটি স্ট্যান্ডার্ড",
                  desc: "ভূমিকম্প-প্রতিরোধী ডিজাইন ও ফায়ার সেফটি।",
                },
                {
                  icon: Sparkles,
                  title: "আধুনিক প্রযুক্তি",
                  desc: "BIM মডেলিং ও IoT-ভিত্তিক প্রজেক্ট ট্র্যাকিং।",
                },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold">{f.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/75">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[24px] border border-white/20 shadow-float">
              <img
                src={construction}
                alt="নির্মাণ কার্যক্রম"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/25 bg-white/10 p-5 shadow-float backdrop-blur-md md:block">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-gold" />
                <div>
                  <p className="text-2xl font-bold text-gold">ISO ৯০০১</p>
                  <p className="text-[11px] uppercase tracking-widest text-white/75">
                    সনদপ্রাপ্ত মান
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="container-luxury cv-auto py-24">
        <SectionHeader
          eyebrow="গ্রাহকদের মতামত"
          title="আমাদের বিশ্বস্ততা — আমাদের গ্রাহকদের ভাষায়"
          align="center"
        />
        <div className="mt-14">
          <TestimonialSlider />
        </div>
      </section>

      {/* 12. STATISTICS */}
      <section className="relative cv-auto overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/85 py-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src={teamMeeting}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container-luxury relative z-10 grid gap-8 md:grid-cols-4">
          {[
            { icon: Users, end: 10000, suffix: "+", label: "সন্তুষ্ট পরিবার" },
            { icon: Building2, end: 25, suffix: "+", label: "সফল প্রকল্প" },
            { icon: Award, end: 15, suffix: "+", label: "বছরের অভিজ্ঞতা" },
            { icon: HandshakeIcon, end: 99, suffix: "%", label: "গ্রাহক সন্তুষ্টি" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/20 text-gold backdrop-blur">
                  <Icon className="h-6 w-6" />
                </div>
                <CountUp
                  end={s.end}
                  suffix={s.suffix}
                  className="mt-5 block text-5xl font-bold text-gold md:text-6xl"
                />
                <p className="mt-2 text-sm uppercase tracking-widest text-white/80">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. INVESTMENT BENEFITS */}
      <section className="container-luxury cv-auto py-24">
        <SectionHeader
          eyebrow="বিনিয়োগ সুবিধা"
          title="কেন Lumen Builders-এ বিনিয়োগ করবেন?"
          description="দীর্ঘমেয়াদী নিরাপদ রিটার্ন — প্রতিটি সিদ্ধান্তে স্মার্ট ভবিষ্যত।"
          align="center"
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:mt-14 lg:grid-cols-4">
          {investment.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-lg border border-border bg-surface p-4 shadow-card transition hover:-translate-y-1 hover:shadow-float sm:rounded-xl sm:p-8"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition group-hover:bg-gold/20" />
                <Icon className="h-7 w-7 text-gold sm:h-10 sm:w-10" strokeWidth={1.5} />
                <h3 className="mt-3 text-sm font-bold leading-snug text-foreground sm:mt-6 sm:text-lg">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                  {f.desc}
                </p>
                <Landmark className="absolute bottom-3 right-3 h-4 w-4 text-primary/10 transition group-hover:text-primary/30 sm:bottom-4 sm:right-4 sm:h-6 sm:w-6" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 14. VIDEO SHOWCASE */}
      <section className="bg-surface-strong cv-auto py-24">
        <div className="container-luxury">
          <SectionHeader
            eyebrow="ভিডিও শোকেস"
            title="আমাদের প্রকল্পসমূহ দেখুন লাইভ"
            align="center"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              { image: projectGalaxy, title: "Lumen Galaxy — প্রকল্প পরিচিতি", duration: "০২:৩৪" },
              {
                image: construction,
                title: "নির্মাণ কার্যক্রম — Behind the Scenes",
                duration: "০৩:১৮",
              },
              { image: interior, title: "প্রিমিয়াম ইন্টেরিয়র ওয়াকথ্রু", duration: "০১:৫২" },
            ].map((v, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-video overflow-hidden rounded-[22px] shadow-card"
              >
                <img
                  src={v.image}
                  alt={v.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-gold/95 text-primary shadow-gold transition group-hover:scale-110">
                    <PlayCircle className="h-10 w-10" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-left text-white">
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold backdrop-blur">
                    {v.duration}
                  </span>
                  <h3 className="mt-2 text-base font-bold">{v.title}</h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 15. BLOG / NEWS */}
      <section className="container-luxury cv-auto py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:flex-wrap sm:justify-between">
          <SectionHeader eyebrow="ব্লগ ও সংবাদ" title="সর্বশেষ প্রকাশনা" />
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/blog">
              সব আর্টিকেল <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogs.map((b, i) => (
            <motion.article
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group overflow-hidden rounded-[22px] border border-border bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-float"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  {b.tag}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs text-muted-foreground">{b.date}</p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-foreground transition group-hover:text-primary">
                  {b.title}
                </h3>
                <Link
                  to="/blog"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  বিস্তারিত পড়ুন <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 16. BOOKING CTA */}
      <section className="container-luxury cv-auto pb-24">
        <div className="relative overflow-hidden rounded-[32px] border border-gold/30 bg-gradient-to-br from-primary via-primary to-primary/80 p-10 text-white shadow-float md:p-16">
          <img
            src={corporateHero}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> বুকিং চলছে
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
                আজই আপনার স্বপ্নের —<br />
                <span className="text-gold">ফ্ল্যাট বুক করুন।</span>
              </h2>
              <p className="mt-4 max-w-xl text-white/85">
                বিশেষজ্ঞ পরামর্শদাতারা আপনার জন্য সঠিক ইউনিট, বাজেট ও EMI প্ল্যান নির্ধারণে সাহায্য
                করবেন।
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild variant="gold" size="xl" className="justify-between">
                <a href={`tel:${site.contact.phone}`}>
                  <span className="flex items-center gap-3">
                    <Phone className="h-5 w-5" /> কল করুন
                  </span>
                  <span className="text-primary/70">{site.contact.phone}</span>
                </a>
              </Button>
              <Button
                asChild
                size="xl"
                className="justify-between bg-emerald text-white hover:bg-emerald/90"
              >
                <a href={`https://wa.me/8801711381422`} target="_blank" rel="noopener">
                  <span className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5" /> WhatsApp
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="xl"
                className="justify-between bg-white text-primary hover:bg-white/90"
              >
                <Link to="/book-visit">
                  <span className="flex items-center gap-3">
                    <CalendarCheck className="h-5 w-5" /> অফিস ভিজিট বুক করুন
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 17. GOOGLE MAP */}
      <section className="container-luxury pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          <div className="rounded-[24px] border border-border bg-surface p-8 shadow-card">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
              <MapPin className="h-3 w-3" /> আমাদের অফিস
            </span>
            <h3 className="mt-4 text-2xl font-bold text-foreground">Lumen Builders Ltd.</h3>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
              <p>{site.contact.address.line1}</p>
              <p>{site.contact.address.line2}</p>
              <p>{site.contact.address.line3}</p>
            </address>
            <div className="mt-6 space-y-3 border-t border-border pt-6">
              <a
                href={`tel:${site.contact.phone}`}
                className="flex items-center gap-3 text-sm font-semibold text-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4 text-gold" /> {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 break-all text-sm font-semibold text-foreground hover:text-primary"
              >
                <HomeIcon className="h-4 w-4 text-gold" /> {site.contact.email}
              </a>
            </div>
            <Button asChild variant="gold" className="mt-6 w-full">
              <Link to="/contact">
                যোগাযোগ পেজ দেখুন <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-border shadow-card">
            <iframe
              title="Lumen Builders Office Location"
              src="https://www.google.com/maps?q=Rangpur+Bangladesh&output=embed"
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
