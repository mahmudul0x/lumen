import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { ComingSoon } from "@/components/ui/coming-soon";

export const Route = createFileRoute("/land-share")({
  head: () => ({
    meta: [
      { title: "জমি শেয়ার — Lumen Builders Ltd." },
      { name: "description", content: "নিরাপদ, স্বচ্ছ ও লাভজনক জমি শেয়ার বিনিয়োগ প্ল্যান।" },
      { property: "og:title", content: "জমি শেয়ার প্রকল্প — Lumen Builders" },
      { property: "og:description", content: "স্বচ্ছ ও লাভজনক জমি বিনিয়োগ।" },
    ],
  }),
  component: () => (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "জমি শেয়ার" }]}
        title="জমি শেয়ার প্রকল্প"
        description="একসাথে জমি কিনুন — নিরাপদ, স্বচ্ছ ও দীর্ঘমেয়াদী লাভজনক বিনিয়োগ।"
      />
      <ComingSoon label="জমি শেয়ার প্রকল্প" />
    </SiteShell>
  ),
});
