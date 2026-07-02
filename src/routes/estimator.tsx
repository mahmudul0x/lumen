import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { Button } from "@/components/ui/button";
import { projectCatalog, budgetRanges } from "@/lib/projects-data";
import { bdtBn, toBn } from "@/lib/leads";

export const Route = createFileRoute("/estimator")({
  head: () => ({
    meta: [
      { title: "লাইভ প্রাইস এস্টিমেটর — Lumen Builders Ltd." },
      { name: "description", content: "আপনার বাজেট অনুযায়ী উপযুক্ত প্রকল্প, ফ্ল্যাট সাইজ ও পেমেন্ট প্ল্যান খুঁজুন।" },
      { property: "og:title", content: "প্রাইস এস্টিমেটর — Lumen Builders" },
      { property: "og:url", content: "/estimator" },
    ],
    links: [{ rel: "canonical", href: "/estimator" }],
  }),
  component: EstimatorPage,
});

function EstimatorPage() {
  const [budget, setBudget] = useState<number>(0);

  const matches = useMemo(() => {
    if (!budget) return [];
    return projectCatalog.filter((p) => p.startingPrice * 100000 <= budget * 1.05);
  }, [budget]);

  const suggestedPlan = useMemo(() => {
    if (!budget) return null;
    const down = Math.round(budget * 0.25);
    const monthly = Math.round((budget - down) / (12 * 15));
    return { down, monthly };
  }, [budget]);

  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "প্রাইস এস্টিমেটর" }]}
        title="লাইভ প্রাইস এস্টিমেটর"
        description="আপনার বাজেট বসিয়ে দেখুন কোন প্রকল্প ও ইউনিট আপনার জন্য উপযুক্ত।"
      />
      <section className="container pb-24">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="rounded-[28px] border border-border/60 bg-card p-6 shadow-card md:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/15 text-secondary">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-primary">আপনার বাজেট</h2>
                <p className="text-xs text-muted-foreground">একটি রেঞ্জ নির্বাচন করুন</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {budgetRanges.map((b, i) => {
                const upper = [7500000, 10000000, 15000000, 20000000, 30000000][i];
                const active = budget === upper;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(upper)}
                    className={`rounded-2xl border px-4 py-4 text-sm font-semibold transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-card"
                        : "border-input bg-background hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {budget > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-2xl font-bold text-primary">আপনার জন্য সুপারিশকৃত</h3>
                <p className="text-sm text-muted-foreground">বাজেট ৳ {bdtBn(budget)} অনুযায়ী উপযুক্ত প্রকল্প</p>
              </div>
              {matches.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {matches.map((p) => (
                    <div key={p.slug} className="rounded-[24px] border border-border/60 bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                      <p className="text-xs uppercase tracking-widest text-secondary">প্রকল্প</p>
                      <p className="mt-1 font-display text-xl font-bold text-primary">{p.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {p.location}
                      </p>
                      <div className="mt-4 space-y-2 text-sm">
                        <p><span className="font-semibold">উপলব্ধ সাইজ:</span> {p.sizes.join(", ")}</p>
                        <p><span className="font-semibold">শুরু ৳</span> {bdtBn(p.startingPrice * 100000)}</p>
                      </div>
                      <Button asChild variant="gold" size="sm" className="mt-4 w-full">
                        <Link to="/book-visit" search={{ project: p.name } as never}>
                          সাইট ভিজিট <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  এই বাজেটের জন্য উপযুক্ত প্রকল্প পাওয়া যায়নি। আমাদের সেলস টিমের সাথে কথা বলুন।
                </p>
              )}

              {suggestedPlan && (
                <div className="rounded-[24px] border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6">
                  <h4 className="font-display text-lg font-bold text-accent">সুপারিশকৃত পেমেন্ট প্ল্যান</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-background p-4">
                      <p className="text-xs uppercase text-muted-foreground">ডাউন পেমেন্ট (২৫%)</p>
                      <p className="mt-1 font-display text-2xl font-bold text-primary">৳ {bdtBn(suggestedPlan.down)}</p>
                    </div>
                    <div className="rounded-2xl bg-background p-4">
                      <p className="text-xs uppercase text-muted-foreground">মাসিক EMI (১৫ বছর)</p>
                      <p className="mt-1 font-display text-2xl font-bold text-primary">৳ {bdtBn(suggestedPlan.monthly)}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    * প্রকৃত মূল্য ও কিস্তির পরিমাণ আপনার নির্বাচিত ইউনিট ও ব্যাংক নীতিমালার উপর নির্ভরশীল। মোট {toBn(15)} বছরের হিসাব দেখানো হয়েছে।
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}
