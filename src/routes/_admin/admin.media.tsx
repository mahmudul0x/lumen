import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { Image, Video, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_admin/admin/media")({
  head: () => ({ meta: [{ title: "মিডিয়া লাইব্রেরি — অ্যাডমিন" }] }),
  component: MediaPage,
});

const CATEGORIES = [
  { icon: Image, title: "ছবি", desc: "প্রকল্প, ইন্টেরিয়র, ইভেন্ট", to: "/admin/gallery" },
  { icon: Video, title: "ভিডিও", desc: "ফ্লাই-থ্রু, টেস্টিমোনিয়াল, নির্মাণ আপডেট", to: "/admin/videos" },
  { icon: FileText, title: "ডকুমেন্ট / PDF", desc: "ব্রোশিওর, ফ্লোর প্ল্যান, ব্লগ অ্যাসেট", to: "/admin/blog" },
];

function MediaPage() {
  return (
    <AdminPage
      title="মিডিয়া লাইব্রেরি"
      description="সেন্ট্রাল মিডিয়া হাব — ছবি, ভিডিও ও ডকুমেন্ট এক জায়গায়।"
      actions={<Button variant="luxury"><Upload className="mr-2 h-4 w-4" /> বাল্ক আপলোড</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link to={c.to} key={c.title}>
            <AdminCard className="h-full transition hover:border-primary hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></div>
              <p className="mt-4 font-display text-lg font-semibold text-primary">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </AdminPage>
  );
}
