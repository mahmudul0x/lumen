import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { ComingSoon } from "@/components/ui/coming-soon";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Lumen Builders Ltd." },
      { name: "description", content: "Lumen Builders Ltd.-এর সেবার শর্তাবলী।" },
    ],
  }),
  component: () => (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "Terms" }]}
        title="Terms & Conditions"
        description="আমাদের সেবা ব্যবহারের শর্তাবলী।"
      />
      <ComingSoon label="Terms & Conditions" />
    </SiteShell>
  ),
});
