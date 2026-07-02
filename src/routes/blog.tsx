import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { corporateImages, blogPosts } from "@/lib/corporate-data";

const categories = ["সবগুলো", "বিনিয়োগ টিপস", "নির্মাণ আপডেট", "প্রপার্টি গাইড", "কোম্পানি ইভেন্ট", "প্রকল্প লঞ্চ"];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "সংবাদ ও ব্লগ — Lumen Builders Ltd." },
      { name: "description", content: "রিয়েল এস্টেট ট্রেন্ড, বিনিয়োগ টিপস, নির্মাণ আপডেট ও কোম্পানি ইভেন্টের সর্বশেষ খবর।" },
      { property: "og:title", content: "সংবাদ ও ব্লগ — Lumen Builders" },
      { property: "og:description", content: "রিয়েল এস্টেট, বিনিয়োগ ও নির্মাণ বিষয়ক প্রবন্ধ।" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [cat, setCat] = useState("সবগুলো");
  const filtered = useMemo(
    () => cat === "সবগুলো" ? blogPosts : blogPosts.filter((p) => p.category === cat),
    [cat],
  );
  const featured = blogPosts[0];
  const rest = filtered.filter((p) => p.slug !== featured.slug);

  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.interior}
        eyebrow="সংবাদ ও ব্লগ"
        title="ইনসাইট, আপডেট এবং গাইড"
        description="রিয়েল এস্টেট বাজার, বিনিয়োগ কৌশল ও প্রকল্প খবর — নিয়মিত আপডেট।"
        breadcrumbs={[{ label: "ব্লগ" }]}
        height="md"
      />

      {/* Featured */}
      {cat === "সবগুলো" && (
        <section className="container-luxury py-16">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid overflow-hidden rounded-[32px] border border-border/60 bg-card shadow-card md:grid-cols-2"
          >
            <div className="relative aspect-video md:aspect-auto">
              <img src={featured.image} alt={featured.title} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">ফিচার্ড</span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">{featured.category}</span>
              <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{featured.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90">
                পড়ুন <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.article>
        </section>
      )}

      {/* Filters */}
      <section className="container-luxury">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-luxury py-10 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">{p.category}</span>
                <h3 className="mt-2 line-clamp-2 font-display text-lg font-bold text-primary transition-colors group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {p.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {p.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {rest.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">এই ক্যাটাগরিতে কোনো পোস্ট নেই।</p>
        )}
      </section>
    </SiteShell>
  );
}
