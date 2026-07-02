import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SiteShell } from "@/components/layout/SiteShell";
import { SuccessCard } from "@/components/leads/SuccessCard";

const searchSchema = z.object({ id: z.string().optional() });

export const Route = createFileRoute("/thank-you")({
  validateSearch: (raw) => searchSchema.parse(raw),
  head: () => ({
    meta: [
      { title: "ধন্যবাদ — Lumen Builders Ltd." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { id } = Route.useSearch();
  return (
    <SiteShell>
      <div className="container py-24">
        <SuccessCard leadId={id ?? "—"} />
      </div>
    </SiteShell>
  );
}
