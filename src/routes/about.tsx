import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Shield, Sparkles, HardHat, Award, Users, TrendingUp, Heart,
  Target, Eye, Building2, MapPin, Ruler, Wallet, Clock,
  Cog, HeadphonesIcon, Quote,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { Button } from "@/components/ui/button";
import {
  corporateImages, coreValues, whyChooseUs, milestones, achievements,
  partners, certifications, awards,
} from "@/lib/corporate-data";
import { Handshake, BadgeCheck, Trophy } from "lucide-react";

const valueIcons = [Shield, Sparkles, HardHat, Award, Sparkles, Heart, Users];
const whyIcons = [HardHat, MapPin, Ruler, Wallet, Clock, Cog, HeadphonesIcon];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "আমাদের সম্পর্কে — Lumen Builders Ltd." },
      { name: "description", content: "বিশ্বাস, গুণগত মান এবং আধুনিক আবাসনের অঙ্গীকার — Lumen Builders Ltd.-এর যাত্রা, মিশন, ভিশন ও মূল্যবোধ।" },
      { property: "og:title", content: "আমাদের সম্পর্কে — Lumen Builders" },
      { property: "og:description", content: "রংপুরের বিশ্বস্ত রিয়েল এস্টেট প্রতিষ্ঠানের যাত্রা।" },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "আমাদের সম্পর্কে — Lumen Builders Ltd.",
        about: { "@type": "Organization", name: "Lumen Builders Ltd." },
      }),
    }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.hero}
        eyebrow="আমাদের সম্পর্কে"
        title="বিশ্বাস, গুণগত মান এবং আধুনিক আবাসনের অঙ্গীকার"
        description="Lumen Builders Ltd. — উত্তরাঞ্চলের বিশ্বস্ত নির্মাতা। ১৫+ বছরের অভিজ্ঞতা, ২০+ সম্পন্ন প্রকল্প এবং ১০০০+ সন্তুষ্ট পরিবার আমাদের যাত্রার সাক্ষী।"
        breadcrumbs={[{ label: "আমাদের সম্পর্কে" }]}
      >
        <Button asChild variant="gold" size="lg"><Link to="/projects">আমাদের প্রকল্প</Link></Button>
        <Button asChild variant="outline" size="lg" className="border-white/40 bg-transparent text-white hover:bg-white hover:text-primary">
          <Link to="/contact">যোগাযোগ করুন</Link>
        </Button>
      </LumenHero>

      {/* Chairman Message */}
      <section className="container-luxury py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[420px_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-gold/20 to-primary/10 blur-2xl" aria-hidden />
            <img
              src={corporateImages.chairman}
              alt="চেয়ারম্যান — Lumen Builders Ltd."
              className="relative aspect-[4/5] w-full rounded-[28px] object-cover shadow-float"
              loading="lazy"
              width={1024}
              height={1280}
            />
            <div className="relative mt-4 rounded-2xl border border-border/60 bg-card p-4 text-center shadow-soft">
              <p className="font-display text-lg font-bold text-primary">মো. আব্দুল্লাহ আল মামুন</p>
              <p className="text-sm text-muted-foreground">চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SectionHeader eyebrow="চেয়ারম্যানের বার্তা" title="আপনার বিশ্বাসই আমাদের ভিত্তি" />
            <Quote className="mt-6 h-10 w-10 text-gold/60" />
            <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-foreground/80">
              <p>প্রিয় সম্মানিত গ্রাহক ও শুভানুধ্যায়ী,</p>
              <p>
                Lumen Builders Ltd.-এর যাত্রা শুরু হয়েছিল একটি সরল অঙ্গীকার নিয়ে —
                <span className="font-semibold text-primary"> সততা, স্বচ্ছতা এবং প্রকৌশল উৎকর্ষ</span>।
                গত ১৫ বছরে আমরা রংপুরসহ উত্তরাঞ্চলে ২০+ প্রকল্প সম্পন্ন করেছি এবং
                ১০০০-এর বেশি পরিবারের কাছে তাদের স্বপ্নের ঘর পৌঁছে দিয়েছি।
              </p>
              <p>
                আমাদের লক্ষ্য কেবল ভবন নির্মাণ নয় — বরং প্রতিটি পরিবারের জন্য
                একটি নিরাপদ, আধুনিক এবং দীর্ঘস্থায়ী আবাসন তৈরি করা। আপনার প্রতিটি
                বিনিয়োগ আমাদের কাছে পবিত্র অঙ্গীকার।
              </p>
            </div>
            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="font-display text-3xl italic text-gold">— A. Al Mamun</p>
              <p className="mt-1 text-sm text-muted-foreground">চেয়ারম্যান, Lumen Builders Ltd.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-gradient-to-b from-muted/40 to-background py-20 md:py-28">
        <div className="container-luxury">
          <SectionHeader
            eyebrow="আমাদের গল্প"
            title="একটি স্বপ্ন থেকে উত্তরাঞ্চলের বিশ্বাস"
            align="center"
          />
          <div className="mx-auto mt-12 max-w-4xl space-y-6 text-center text-[17px] leading-relaxed text-foreground/75">
            <p>
              ২০১০ সালে রংপুর শহরের একটি ছোট অফিস থেকে যাত্রা শুরু করে Lumen Builders Ltd.
              আজ উত্তরাঞ্চলের অন্যতম বিশ্বস্ত রিয়েল এস্টেট প্রতিষ্ঠান।
            </p>
            <p>
              আমরা বিশ্বাস করি — একটি বাড়ি কেবল ইট-পাথরের কাঠামো নয়, বরং একটি পরিবারের
              জীবনের সবচেয়ে বড় বিনিয়োগ ও স্বপ্নের প্রতিফলন। তাই প্রতিটি প্রকল্পে আমরা
              বিশ্বমানের উপকরণ, অভিজ্ঞ প্রকৌশলী এবং আন্তর্জাতিক নকশার সংমিশ্রণ ঘটাই।
            </p>
            <p>
              আমাদের গ্রাহক-কেন্দ্রিক দর্শন — স্বচ্ছ পেমেন্ট, সময়মতো হ্যান্ডওভার এবং
              দীর্ঘমেয়াদী আফটার-সেলস সাপোর্ট — আমাদের ৯৫%+ গ্রাহক সন্তুষ্টি অর্জনে সাহায্য করেছে।
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-luxury py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <MissionVisionCard
            icon={Target}
            eyebrow="আমাদের মিশন"
            title="সততা ও প্রকৌশল উৎকর্ষে আধুনিক আবাসন"
            body="আধুনিক, নিরাপদ ও উচ্চমানের আবাসিক প্রকল্প প্রদান — যেখানে সততা, স্বচ্ছতা ও প্রকৌশল উৎকর্ষ প্রতিটি ইট-পাথরে প্রতিফলিত হয়।"
          />
          <MissionVisionCard
            icon={Eye}
            eyebrow="আমাদের ভিশন"
            title="উত্তরাঞ্চলের সবচেয়ে বিশ্বস্ত ডেভেলপার"
            body="উত্তর বাংলাদেশের সবচেয়ে বিশ্বস্ত এবং সম্মানিত রিয়েল এস্টেট প্রতিষ্ঠান হয়ে ওঠা — যেখানে প্রতিটি পরিবার নিরাপদে বিনিয়োগ করতে পারে।"
            accent
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container-luxury">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              আমাদের মূল্যবোধ
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              যা আমাদের ভিত্তি
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/20 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-luxury py-20 md:py-28">
        <SectionHeader
          eyebrow="কেন আমাদের বেছে নেবেন"
          title="Lumen Builders — প্রতিটি ধাপে পার্থক্য"
          description="বিশ্বাস, মান ও অঙ্গীকারের সমন্বয়ে তৈরি সাতটি স্তম্ভ।"
          align="center"
        />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group rounded-[26px] border border-border/60 bg-card p-7 shadow-soft transition-all hover:shadow-card"
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold/20 to-primary/10 text-gold transition-colors group-hover:from-gold group-hover:to-gold group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container-luxury">
          <SectionHeader
            eyebrow="আমাদের যাত্রা"
            title="১৫ বছরের অসাধারণ অভিযাত্রা"
            align="center"
          />
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2 md:-translate-x-1/2" aria-hidden />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative mb-10 flex items-start gap-6 md:mb-14 md:gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 top-3 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-gold shadow-gold ring-4 ring-background md:left-1/2" />
                <div className={`ml-12 flex-1 md:ml-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {m.year}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-primary md:text-2xl">{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{m.description}</p>
                </div>
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="container-luxury py-20 md:py-24">
        <SectionHeader
          eyebrow="আমাদের অর্জন"
          title="সংখ্যায় Lumen Builders"
          align="center"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {achievements.map((a) => <StatCard key={a.label} value={a.value} label={a.label} />)}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-muted/40 py-20 md:py-24">
        <div className="container-luxury">
          <SectionHeader
            eyebrow="বিশ্বস্ত পার্টনার"
            title="আমাদের সহযোগীবৃন্দ"
            description="ব্যাংক, কনসালট্যান্ট, সরবরাহকারী ও সরকারি সংস্থার সাথে দীর্ঘমেয়াদী অংশীদারিত্ব।"
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 rounded-[22px] border border-border/60 bg-card p-5 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 text-primary">
                  <Handshake className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display font-bold text-primary">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-luxury py-20 md:py-24">
        <SectionHeader
          eyebrow="সার্টিফিকেশন"
          title="আইনি বৈধতা ও গুণগত স্বীকৃতি"
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="rounded-[26px] border border-border/60 bg-card p-7 shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 text-accent">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-primary">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold">{c.year}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="bg-gradient-to-b from-muted/40 to-background py-20 md:py-24">
        <div className="container-luxury">
          <SectionHeader
            eyebrow="পুরস্কার ও সম্মাননা"
            title="আমাদের অর্জনসমূহ"
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {awards.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="flex gap-5 rounded-[26px] border border-gold/30 bg-card p-7 shadow-soft transition-shadow hover:shadow-gold"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold/60 text-white shadow-gold">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">{a.year}</span>
                  <h3 className="mt-2 font-display text-xl font-bold text-primary">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-24">
        <CTABanner
          title="আপনার স্বপ্নের ঠিকানা গড়তে আজই আমাদের সাথে যোগাযোগ করুন"
          description="সাইট ভিজিট বুক করুন, ব্রোশিওর ডাউনলোড করুন অথবা সরাসরি কল করুন।"
          primary={{ label: "সাইট ভিজিট বুক করুন", to: "/book-visit" }}
          secondary={{ label: "যোগাযোগ", to: "/contact" }}
        />
      </div>
    </SiteShell>
  );
}

function MissionVisionCard({
  icon: Icon, eyebrow, title, body, accent,
}: { icon: typeof Target; eyebrow: string; title: string; body: string; accent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`overflow-hidden rounded-[28px] border p-8 shadow-card md:p-10 ${
        accent
          ? "border-gold/40 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground"
          : "border-border/60 bg-card"
      }`}
    >
      <div className={`grid h-14 w-14 place-items-center rounded-2xl ${accent ? "bg-gold/20 text-gold" : "bg-primary/10 text-primary"}`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.2em] ${accent ? "text-gold" : "text-gold"}`}>{eyebrow}</p>
      <h3 className={`mt-2 font-display text-2xl font-bold md:text-3xl ${accent ? "text-white" : "text-primary"}`}>{title}</h3>
      <p className={`mt-4 text-[16px] leading-relaxed ${accent ? "text-white/85" : "text-muted-foreground"}`}>{body}</p>
    </motion.div>
  );
}

// Suppress unused imports warning for icon-fallback safety
void [Building2, TrendingUp];
