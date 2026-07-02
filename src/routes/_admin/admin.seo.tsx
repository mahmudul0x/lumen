import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { Search, Globe, Twitter, FileCode } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/seo")({
  head: () => ({ meta: [{ title: "SEO প্যানেল — অ্যাডমিন" }] }),
  component: SEOPage,
});

const CHECKS = [
  { icon: Search, title: "Meta Title & Description", detail: "প্রতিটি রুটে হেড মেটাডেটা সেট আছে।", status: "OK" },
  { icon: FileCode, title: "JSON-LD Schema", detail: "Organization, Residence, FAQPage, BreadcrumbList।", status: "OK" },
  { icon: Globe, title: "Canonical & Robots", detail: "প্রতিটি পাবলিক রুটে canonical, admin-এ noindex।", status: "OK" },
  { icon: Twitter, title: "Open Graph / Twitter Card", detail: "সব প্রধান রুটে og:title, og:description, twitter:card।", status: "OK" },
];

function SEOPage() {
  return (
    <AdminPage title="SEO কন্ট্রোল প্যানেল" description="মেটা, স্কিমা, ক্যাননিকাল, সোশ্যাল কার্ড — লাইভ স্ট্যাটাস।">
      <div className="grid gap-4 md:grid-cols-2">
        {CHECKS.map((c) => (
          <AdminCard key={c.title}>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent"><c.icon className="h-4 w-4" /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display font-semibold text-primary">{c.title}</p>
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">{c.status}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <AdminCard>
        <p className="font-display font-semibold text-primary">গুরুত্বপূর্ণ ফাইল</p>
        <ul className="mt-3 space-y-1.5 text-sm">
          <li><a href="/sitemap.xml" className="text-accent hover:underline" target="_blank" rel="noreferrer">/sitemap.xml</a> — সব প্রকল্প ও পেজ ডাইনামিক</li>
          <li><a href="/robots.txt" className="text-accent hover:underline" target="_blank" rel="noreferrer">/robots.txt</a> — ক্রলার নিয়মাবলী</li>
          <li><a href="/manifest.webmanifest" className="text-accent hover:underline" target="_blank" rel="noreferrer">/manifest.webmanifest</a> — PWA কনফিগ</li>
        </ul>
      </AdminCard>
    </AdminPage>
  );
}
