import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText, Home, MapPinned } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { projects } from "@/lib/projects-data";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "ডাউনলোড — Lumen Builders Ltd." },
      { name: "description", content: "ব্রোশিওর, ফ্লোর প্ল্যান ও প্রকল্প ডকুমেন্ট ডাউনলোড করুন।" },
      { property: "og:title", content: "ডাউনলোড — Lumen Builders" },
      { property: "og:description", content: "ব্রোশিওর ও ডকুমেন্ট।" },
    ],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "ডাউনলোড" }]}
        title="ব্রোশিওর ও ডকুমেন্ট"
        description="প্রকল্পের বিস্তারিত ব্রোশিওর, ফ্লোর প্ল্যান ও বুকিং সহায়তা এক জায়গায়।"
      />
      <section className="container pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <article
                key={project.slug}
                className="overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <img src={project.image} alt={project.name} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <p className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <MapPinned className="h-3.5 w-3.5" /> {project.location}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-bold text-primary">{project.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.overview}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/projects/$slug" params={{ slug: project.slug }}>বিস্তারিত</Link>
                    </Button>
                    <Button asChild variant="gold" size="sm">
                      <Link to="/brochure" search={{ project: project.name } as never}>
                        <Download className="h-4 w-4" /> ব্রোশিওর
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="rounded-[28px] border border-secondary/30 bg-gradient-to-br from-secondary/15 to-transparent p-6 shadow-card">
              <FileText className="h-10 w-10 text-secondary" />
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">প্রিমিয়াম ব্রোশিওর আনলক করুন</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                নাম, ফোন ও উদ্দেশ্য দিলে সঙ্গে সঙ্গে ব্রোশিওর ডাউনলোড অপশন পাবেন এবং আমাদের সেলস টিম প্রয়োজনে গাইড করবে।
              </p>
              <Button asChild variant="gold" size="xl" className="mt-6 w-full">
                <Link to="/brochure"><Download className="h-5 w-5" /> ব্রোশিওর ডাউনলোড</Link>
              </Button>
            </div>
            <div className="rounded-[24px] border border-border/60 bg-card p-6 shadow-soft">
              <Home className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-lg font-bold text-primary">ফ্লোর প্ল্যান ও ইউনিট তথ্য</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                প্রতিটি প্রকল্পের ইউনিট সাইজ, বেডরুম, মূল্য ও পেমেন্ট প্ল্যান জানতে সাইট ভিজিট বুক করুন।
              </p>
              <Button asChild variant="outline" size="lg" className="mt-4 w-full">
                <Link to="/book-visit">সাইট ভিজিট বুক করুন</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}
