import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { ComingSoon } from "@/components/ui/coming-soon";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Lumen Builders Ltd." },
      { name: "description", content: "Lumen Builders Ltd.-এর গোপনীয়তা নীতি।" },
    ],
  }),
  component: () => (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "Privacy Policy" }]}
        title="গোপনীয়তা নীতি"
        description="আপনার তথ্যের সুরক্ষা ও গোপনীয়তা সম্পর্কে আমাদের প্রতিশ্রুতি।"
      />
      <ComingSoon label="Privacy Policy" />
    </SiteShell>
  ),
});
