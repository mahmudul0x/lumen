import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectListing } from "@/components/projects/ProjectListing";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "সকল প্রকল্প — Lumen Builders Ltd." },
      { name: "description", content: "Lumen Builders Ltd.-এর সকল রিয়েল এস্টেট প্রকল্প এক জায়গায় — চলমান, সম্পন্ন ও আপকামিং লাক্সারি অ্যাপার্টমেন্ট।" },
      { property: "og:title", content: "সকল প্রকল্প — Lumen Builders Ltd." },
      { property: "og:description", content: "চলমান, সম্পন্ন ও আপকামিং প্রিমিয়াম প্রকল্প ব্রাউজ করুন।" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: () => (
    <SiteShell>
      <ProjectListing
        eyebrow="সকল প্রকল্প"
        title="আমাদের প্রিমিয়াম রিয়েল এস্টেট পোর্টফোলিও"
        description="রংপুরের বুকে লাক্সারি অ্যাপার্টমেন্ট, গার্ডেন রেসিডেন্স ও আইকনিক টাওয়ার — একটি জায়গায় সব প্রকল্প ব্রাউজ, তুলনা ও বুক করুন।"
      />
    </SiteShell>
  ),
});
