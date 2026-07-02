import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectListing } from "@/components/projects/ProjectListing";

export const Route = createFileRoute("/projects/completed")({
  head: () => ({
    meta: [
      { title: "সম্পন্ন প্রকল্প — Lumen Builders Ltd." },
      { name: "description", content: "সফলভাবে হ্যান্ডওভার করা Lumen Builders-এর সম্পন্ন প্রিমিয়াম রিয়েল এস্টেট প্রকল্পসমূহ।" },
      { property: "og:title", content: "সম্পন্ন প্রকল্প — Lumen Builders" },
      { property: "og:description", content: "সফল ও হ্যান্ডওভার সম্পন্ন প্রকল্পসমূহ।" },
      { property: "og:url", content: "/projects/completed" },
    ],
    links: [{ rel: "canonical", href: "/projects/completed" }],
  }),
  component: () => (
    <SiteShell>
      <ProjectListing
        eyebrow="সম্পন্ন প্রকল্প"
        title="সফলভাবে হ্যান্ডওভার সম্পন্ন প্রকল্প"
        description="আমাদের ট্র্যাক-রেকর্ড দেখুন — যেসব প্রকল্প ইতিমধ্যে হ্যান্ডওভার হয়ে সক্রিয় রেসিডেন্ট কমিউনিটিতে পরিণত হয়েছে।"
        restrictStatus="সম্পন্ন"
      />
    </SiteShell>
  ),
});
