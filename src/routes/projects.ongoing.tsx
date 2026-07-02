import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectListing } from "@/components/projects/ProjectListing";

export const Route = createFileRoute("/projects/ongoing")({
  head: () => ({
    meta: [
      { title: "চলমান প্রকল্প — Lumen Builders Ltd." },
      { name: "description", content: "Lumen Builders-এর বর্তমানে নির্মাণাধীন প্রিমিয়াম লাক্সারি অ্যাপার্টমেন্ট প্রকল্প — বুকিং, ভিজিট ও EMI তথ্য।" },
      { property: "og:title", content: "চলমান প্রকল্প — Lumen Builders" },
      { property: "og:description", content: "চলমান প্রিমিয়াম রিয়েল এস্টেট প্রকল্পসমূহ।" },
      { property: "og:url", content: "/projects/ongoing" },
    ],
    links: [{ rel: "canonical", href: "/projects/ongoing" }],
  }),
  component: () => (
    <SiteShell>
      <ProjectListing
        eyebrow="চলমান প্রকল্প"
        title="বর্তমানে নির্মাণাধীন প্রকল্পসমূহ"
        description="আজই বুকিং দিয়ে সিকিউর করুন আপনার স্বপ্নের অ্যাপার্টমেন্ট — সীমিত ইউনিট, প্রিমিয়াম প্রাইসিং, নমনীয় EMI সুবিধা।"
        restrictStatus="চলমান"
      />
    </SiteShell>
  ),
});
