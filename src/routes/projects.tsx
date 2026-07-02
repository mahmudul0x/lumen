import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "প্রকল্প — Lumen Builders Ltd." },
      {
        name: "description",
        content:
          "Lumen Builders Ltd.-এর চলমান ও সম্পন্ন প্রিমিয়াম রিয়েল এস্টেট প্রকল্প সমূহ — রংপুরের বিলাসবহুল অ্যাপার্টমেন্ট, গার্ডেন রেসিডেন্স ও লাইফস্টাইল টাওয়ার।",
      },
      { property: "og:title", content: "প্রকল্প — Lumen Builders Ltd." },
      { property: "og:description", content: "চলমান ও সম্পন্ন প্রিমিয়াম প্রকল্প এক জায়গায়।" },
      { property: "og:url", content: "/projects" },
    ],
  }),
  component: () => <Outlet />,
});
