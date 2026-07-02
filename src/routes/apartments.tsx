import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { ComingSoon } from "@/components/ui/coming-soon";

export const Route = createFileRoute("/apartments")({
  head: () => ({
    meta: [
      { title: "ফ্ল্যাট — Lumen Builders Ltd." },
      { name: "description", content: "রংপুরের প্রাইম লোকেশনে প্রিমিয়াম ফ্ল্যাট — Lumen Builders Ltd." },
      { property: "og:title", content: "প্রিমিয়াম ফ্ল্যাট — Lumen Builders" },
      { property: "og:description", content: "প্রাইম লোকেশনের প্রিমিয়াম অ্যাপার্টমেন্ট।" },
    ],
  }),
  component: () => (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "ফ্ল্যাট" }]}
        title="প্রিমিয়াম ফ্ল্যাট"
        description="আধুনিক ডিজাইন, প্রাইম লোকেশন — আপনার পরিবারের জন্য উপযুক্ত অ্যাপার্টমেন্ট।"
      />
      <ComingSoon label="ফ্ল্যাট তালিকা" />
    </SiteShell>
  ),
});
