import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Award, Users, Heart, TrendingUp, GraduationCap, Upload, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { corporateImages, openings } from "@/lib/corporate-data";
import { toast } from "sonner";

const benefits = [
  { icon: Award, title: "প্রতিযোগিতামূলক বেতন", desc: "শিল্পের সেরা প্যাকেজ ও বার্ষিক পর্যালোচনা।" },
  { icon: GraduationCap, title: "শেখার সুযোগ", desc: "ট্রেনিং, সার্টিফিকেশন ও দক্ষতা উন্নয়ন।" },
  { icon: Heart, title: "স্বাস্থ্য সুবিধা", desc: "মেডিকেল বীমা ও পরিবার সহায়তা।" },
  { icon: TrendingUp, title: "ক্যারিয়ার বৃদ্ধি", desc: "স্পষ্ট প্রমোশন পাথ ও নেতৃত্বের সুযোগ।" },
  { icon: Users, title: "সহযোগিতামূলক টিম", desc: "সহায়ক ও পেশাদার কর্মপরিবেশ।" },
  { icon: Briefcase, title: "স্থিতিশীল প্রতিষ্ঠান", desc: "১৫+ বছরের প্রতিষ্ঠিত কোম্পানি।" },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "ক্যারিয়ার — Lumen Builders Ltd." },
      { name: "description", content: "Lumen Builders Ltd.-এ ক্যারিয়ার গড়ার সুযোগ, চলমান নিয়োগ, সুবিধা ও আবেদন প্রক্রিয়া।" },
      { property: "og:title", content: "ক্যারিয়ার — Lumen Builders" },
      { property: "og:description", content: "আমাদের টিমে যোগ দিন।" },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const scrollToApply = (jobId: string) => {
    setSelectedJob(jobId);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();

    if (name.length < 2) return toast.error("সঠিক নাম দিন");
    if (!/^01[3-9]\d{8}$/.test(phone)) return toast.error("সঠিক মোবাইল নম্বর দিন");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("সঠিক ইমেইল দিন");

    setSubmitted(true);
    toast.success("আপনার আবেদন গ্রহণ করা হয়েছে");
    e.currentTarget.reset();
    setFileName("");
  };

  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.teamMeeting}
        eyebrow="ক্যারিয়ার"
        title="আমাদের সাথে গড়ুন আপনার ভবিষ্যৎ"
        description="প্রিমিয়াম রিয়েল এস্টেট শিল্পে ক্যারিয়ার — যেখানে আপনার প্রতিভাই সবচেয়ে মূল্যবান।"
        breadcrumbs={[{ label: "ক্যারিয়ার" }]}
      >
        <Button asChild variant="gold" size="lg">
          <a href="#openings">চলমান নিয়োগ দেখুন</a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white hover:text-primary">
          <a href="#apply">আবেদন করুন</a>
        </Button>
      </LumenHero>

      {/* Why Join */}
      <section className="container-luxury py-20 md:py-28">
        <SectionHeader eyebrow="কেন যোগ দেবেন" title="আমাদের টিমের সুবিধা" align="center" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="rounded-[24px] border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold/20 to-accent/10 text-gold">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-primary">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="bg-muted/40 py-20 md:py-28">
        <div className="container-luxury">
          <SectionHeader eyebrow="চলমান নিয়োগ" title="বর্তমান পদসমূহ" align="center" />
          <div className="mx-auto mt-14 max-w-4xl space-y-4">
            {openings.map((j, i) => (
              <motion.div
                key={j.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid gap-4 rounded-[22px] border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-card md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-semibold text-accent">{j.department}</span>
                    <span className="rounded-full bg-gold/15 px-3 py-0.5 text-xs font-semibold text-gold">{j.experience}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-primary">{j.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {j.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {j.type}</span>
                  </div>
                </div>
                <Button variant="gold" onClick={() => scrollToApply(j.id)}>আবেদন করুন</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="container-luxury py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="আবেদন ফর্ম" title="আপনার তথ্য দিন" align="center" />
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 rounded-[28px] border border-accent/40 bg-accent/5 p-10 text-center shadow-card"
            >
              <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
              <h3 className="mt-4 font-display text-2xl font-bold text-primary">আপনার আবেদন সফলভাবে জমা হয়েছে</h3>
              <p className="mt-2 text-muted-foreground">আমাদের HR টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
              <Button variant="gold" className="mt-6" onClick={() => setSubmitted(false)}>আরেকটি আবেদন</Button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5 rounded-[28px] border border-border/60 bg-card p-6 shadow-card md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="পূর্ণ নাম *"><Input name="name" required placeholder="আপনার নাম" /></Field>
                <Field label="মোবাইল নম্বর *"><Input name="phone" required inputMode="numeric" placeholder="01XXXXXXXXX" /></Field>
                <Field label="ইমেইল"><Input name="email" type="email" placeholder="you@example.com" /></Field>
                <Field label="পদ *">
                  <select
                    name="position"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">পদ নির্বাচন করুন</option>
                    {openings.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
                    <option value="other">অন্যান্য</option>
                  </select>
                </Field>
                <Field label="অভিজ্ঞতা (বছর)"><Input name="experience" type="number" min={0} max={40} placeholder="যেমন: ৫" /></Field>
                <Field label="বর্তমান পদ"><Input name="current" placeholder="যেমন: প্রজেক্ট ইঞ্জিনিয়ার" /></Field>
              </div>
              <Field label="বার্তা / কভার লেটার">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="নিজেকে সংক্ষেপে পরিচয় দিন..."
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </Field>
              <Field label="রেজ্যুমে আপলোড (PDF, DOC, DOCX)">
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-5 py-4 transition hover:border-gold hover:bg-gold/5">
                  <span className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Upload className="h-5 w-5 text-gold" />
                    {fileName || "ফাইল বেছে নিন"}
                  </span>
                  <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">ব্রাউজ</span>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  />
                </label>
              </Field>
              <Button type="submit" variant="gold" size="lg" className="w-full">আবেদন জমা দিন</Button>
              <p className="text-center text-xs text-muted-foreground">
                * আপনার তথ্য কেবল নিয়োগ প্রক্রিয়ায় ব্যবহৃত হবে।
              </p>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}
