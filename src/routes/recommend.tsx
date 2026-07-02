import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects-data";
import { Sparkles, MapPin, BedDouble, Ruler, Wallet, Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { bnDigits } from "@/lib/utils.bn";
import { SocialShare } from "@/components/share/SocialShare";

export const Route = createFileRoute("/recommend")({
  head: () => ({
    meta: [
      { title: "স্মার্ট প্রপার্টি রেকমেন্ডেশন — Lumen Builders Ltd." },
      { name: "description", content: "AI-চালিত স্মার্ট রেকমেন্ডেশন — আপনার বাজেট, লোকেশন, ফ্যামিলি সাইজ ও বিনিয়োগ উদ্দেশ্য অনুযায়ী সেরা প্রকল্প খুঁজে পান।" },
    ],
    links: [{ rel: "canonical", href: "/recommend" }],
  }),
  component: RecommendPage,
});

type Prefs = {
  budgetLakh: number;
  location: string;
  minSize: number;
  bedrooms: number;
  purpose: "নিজে থাকা" | "বিনিয়োগ" | "ভাড়া";
  familySize: number;
  payment: "নগদ" | "কিস্তি" | "লোন";
};

const DEFAULTS: Prefs = {
  budgetLakh: 70,
  location: "যেকোনো",
  minSize: 1200,
  bedrooms: 3,
  purpose: "নিজে থাকা",
  familySize: 4,
  payment: "কিস্তি",
};

function recommend(prefs: Prefs) {
  return projects
    .map((p) => {
      const flats = p.floorPlans.filter((f) => f.available);
      const bestFlat = flats.find((f) => f.beds >= prefs.bedrooms && f.sizeNumeric >= prefs.minSize) ?? flats[0];
      let score = 40;
      const reasons: string[] = [];

      // Budget match
      const diff = prefs.budgetLakh - p.startingPriceLakh;
      if (diff >= 0) { score += 25; reasons.push(`বাজেটের মধ্যে (${bnDigits(p.startingPriceLakh)} লাখ থেকে শুরু)`); }
      else if (diff >= -15) { score += 10; reasons.push("প্রায় বাজেটের কাছাকাছি"); }
      else { score -= 15; }

      // Location
      if (prefs.location === "যেকোনো" || p.location.includes(prefs.location) || p.city.includes(prefs.location)) {
        score += 12; reasons.push(`লোকেশন: ${p.location}`);
      }

      // Bedrooms & size
      if (bestFlat && bestFlat.beds >= prefs.bedrooms) { score += 12; reasons.push(`${bnDigits(bestFlat.beds)} বেডরুম উপলব্ধ`); }
      if (bestFlat && bestFlat.sizeNumeric >= prefs.minSize) { score += 8; reasons.push(`${bestFlat.size} সাইজ`); }

      // Purpose
      if (prefs.purpose === "বিনিয়োগ" && p.status === "চলমান") { score += 8; reasons.push("চলমান প্রকল্প — বিনিয়োগের জন্য উত্তম"); }
      if (prefs.purpose === "নিজে থাকা" && p.status === "সম্পন্ন") { score += 8; reasons.push("সম্পন্ন — এখনই থাকতে পারবেন"); }

      // Family size
      if (prefs.familySize >= 5 && bestFlat && bestFlat.sizeNumeric >= 1600) { score += 6; reasons.push("বড় ফ্যামিলির উপযোগী"); }

      return { project: p, bestFlat, score: Math.max(0, Math.min(100, score)), reasons };
    })
    .sort((a, b) => b.score - a.score);
}

function RecommendPage() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [submitted, setSubmitted] = useState(false);
  const results = useMemo(() => (submitted ? recommend(prefs) : []), [prefs, submitted]);
  const locations = ["যেকোনো", "রংপুর", "আর. কে. রোড", "মেডিকেল", "শাপলা"];

  const update = <K extends keyof Prefs>(k: K, v: Prefs[K]) => setPrefs((p) => ({ ...p, [k]: v }));

  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "স্মার্ট রেকমেন্ডেশন" }]}
        title="স্মার্ট প্রপার্টি রেকমেন্ডেশন"
        description="আপনার প্রয়োজনীয়তা জানান — AI আপনাকে সবচেয়ে উপযুক্ত প্রকল্প ও ফ্ল্যাট সুপারিশ করবে।"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Form */}
          <div className="rounded-[24px] border border-border bg-card p-6 shadow-md md:sticky md:top-24 md:self-start">
            <h2 className="font-display text-lg font-semibold text-primary">আপনার পছন্দ</h2>
            <div className="mt-5 space-y-5">
              <Field icon={Wallet} label={`বাজেট: ${bnDigits(prefs.budgetLakh)} লাখ টাকা`}>
                <input type="range" min={30} max={300} step={5} value={prefs.budgetLakh}
                  onChange={(e) => update("budgetLakh", Number(e.target.value))}
                  className="w-full accent-primary" />
              </Field>

              <Field icon={MapPin} label="পছন্দের এলাকা">
                <select value={prefs.location} onChange={(e) => update("location", e.target.value)}
                  className="h-11 w-full rounded-[16px] border border-input bg-background px-3 text-sm outline-none focus:border-primary">
                  {locations.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>

              <Field icon={Ruler} label={`ন্যূনতম সাইজ: ${bnDigits(prefs.minSize)} sq.ft`}>
                <input type="range" min={800} max={3000} step={100} value={prefs.minSize}
                  onChange={(e) => update("minSize", Number(e.target.value))}
                  className="w-full accent-primary" />
              </Field>

              <Field icon={BedDouble} label="বেডরুম">
                <div className="flex gap-2">
                  {[2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => update("bedrooms", n)}
                      className={`h-10 flex-1 rounded-[14px] border text-sm font-medium transition ${
                        prefs.bedrooms === n ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"
                      }`}>{bnDigits(n)}</button>
                  ))}
                </div>
              </Field>

              <Field icon={Target} label="বিনিয়োগ উদ্দেশ্য">
                <div className="grid grid-cols-3 gap-2">
                  {(["নিজে থাকা", "বিনিয়োগ", "ভাড়া"] as const).map((p) => (
                    <button key={p} onClick={() => update("purpose", p)}
                      className={`h-10 rounded-[14px] border text-xs font-medium transition ${
                        prefs.purpose === p ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"
                      }`}>{p}</button>
                  ))}
                </div>
              </Field>

              <Field icon={Users} label={`ফ্যামিলি সাইজ: ${bnDigits(prefs.familySize)} জন`}>
                <input type="range" min={1} max={10} step={1} value={prefs.familySize}
                  onChange={(e) => update("familySize", Number(e.target.value))}
                  className="w-full accent-primary" />
              </Field>

              <Field icon={Wallet} label="পেমেন্ট">
                <div className="grid grid-cols-3 gap-2">
                  {(["নগদ", "কিস্তি", "লোন"] as const).map((p) => (
                    <button key={p} onClick={() => update("payment", p)}
                      className={`h-10 rounded-[14px] border text-xs font-medium transition ${
                        prefs.payment === p ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"
                      }`}>{p}</button>
                  ))}
                </div>
              </Field>

              <Button onClick={() => setSubmitted(true)} variant="gold" size="lg" className="w-full">
                <Sparkles className="mr-2 h-4 w-4" /> রেকমেন্ডেশন দেখুন
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {!submitted ? (
              <div className="grid h-full min-h-[360px] place-items-center rounded-[24px] border border-dashed border-border bg-muted/20 p-10 text-center">
                <div>
                  <Sparkles className="mx-auto h-12 w-12 text-secondary" />
                  <p className="mt-4 font-display text-xl font-semibold text-primary">আপনার প্রয়োজনীয়তা দিন</p>
                  <p className="mt-1 text-sm text-muted-foreground">বাম দিকে পছন্দ সেট করে "রেকমেন্ডেশন দেখুন" চাপুন।</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    <b className="text-foreground">{bnDigits(results.length)}টি</b> প্রকল্প মিলেছে · র‍্যাঙ্কিং AI অনুযায়ী
                  </p>
                  <SocialShare title="Lumen Builders — স্মার্ট রেকমেন্ডেশন" />
                </div>
                {results.map(({ project, bestFlat, score, reasons }) => (
                  <article key={project.slug} className="overflow-hidden rounded-[22px] border border-border bg-card shadow-sm transition hover:border-primary/40 hover:shadow-md">
                    <div className="grid gap-0 md:grid-cols-[240px_1fr]">
                      <div className="relative h-48 md:h-full">
                        <img src={project.image} alt={project.name} loading="lazy" decoding="async"
                          className="h-full w-full object-cover" />
                        <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                          ম্যাচ {bnDigits(score)}%
                        </div>
                      </div>
                      <div className="p-5 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-xl font-bold text-primary">{project.name}</h3>
                            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" /> {project.location}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
                            {project.status}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/80">
                          <span>শুরু: <b className="text-primary">৳{bnDigits(project.startingPriceLakh)} লাখ</b></span>
                          {bestFlat && <span>· {bnDigits(bestFlat.beds)} বেড</span>}
                          {bestFlat && <span>· {bestFlat.size}</span>}
                        </div>
                        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {reasons.slice(0, 4).map((r) => (
                            <li key={r} className="flex items-start gap-1.5 text-xs text-foreground/70">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" /> {r}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button asChild variant="gold" size="sm">
                            <Link to="/projects/$slug" params={{ slug: project.slug }}>
                              বিস্তারিত <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/book-visit">সাইট ভিজিট</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-medium text-foreground/80">
        <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      </label>
      {children}
    </div>
  );
}
