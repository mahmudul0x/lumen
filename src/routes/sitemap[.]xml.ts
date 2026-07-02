import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { projects } from "@/lib/projects-data";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/team", changefreq: "monthly", priority: "0.7" },
  { path: "/journey", changefreq: "monthly", priority: "0.6" },
  { path: "/achievements", changefreq: "monthly", priority: "0.7" },
  { path: "/media-center", changefreq: "monthly", priority: "0.6" },
  { path: "/testimonials", changefreq: "monthly", priority: "0.7" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/projects/ongoing", changefreq: "weekly", priority: "0.9" },
  { path: "/projects/completed", changefreq: "weekly", priority: "0.8" },
  { path: "/apartments", changefreq: "weekly", priority: "0.9" },
  { path: "/land-share", changefreq: "monthly", priority: "0.8" },
  { path: "/gallery", changefreq: "weekly", priority: "0.7" },
  { path: "/videos", changefreq: "monthly", priority: "0.6" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/careers", changefreq: "weekly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/booking", changefreq: "monthly", priority: "0.8" },
  { path: "/book-visit", changefreq: "monthly", priority: "0.8" },
  { path: "/book-apartment", changefreq: "monthly", priority: "0.8" },
  { path: "/callback", changefreq: "monthly", priority: "0.6" },
  { path: "/brochure", changefreq: "monthly", priority: "0.6" },
  { path: "/emi-calculator", changefreq: "monthly", priority: "0.7" },
  { path: "/estimator", changefreq: "monthly", priority: "0.6" },
  { path: "/downloads", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

const projectEntries: SitemapEntry[] = projects.map((p) => ({
  path: `/projects/${p.slug}`,
  changefreq: "weekly",
  priority: "0.85",
}));

const entries: SitemapEntry[] = [...staticEntries, ...projectEntries];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
