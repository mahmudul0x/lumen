import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, Download, FileSignature, Receipt, BookOpen, LayoutGrid, Calendar, FileCheck2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/documents")({
  head: () => ({ meta: [{ title: "ডকুমেন্টস — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  component: DocsPage,
});

const docs = [
  { icon: FileSignature, title: "বুকিং ফর্ম", desc: "আপনার বুকিং সংক্রান্ত অফিসিয়াল ফর্ম।", size: "৩৮০ KB", to: "/brochure" },
  { icon: Receipt, title: "মানি রিসিপ্ট", desc: "পেমেন্টের অফিসিয়াল প্রাপ্তি স্বীকারপত্র।", size: "২১০ KB", to: "/brochure" },
  { icon: BookOpen, title: "মাস্টার ব্রোশিওর", desc: "সকল চলমান প্রকল্পের বিস্তারিত।", size: "৮.৫ MB", to: "/brochure" },
  { icon: LayoutGrid, title: "প্রজেক্ট লেআউট", desc: "মাস্টার প্ল্যান ও লেআউট ম্যাপ।", size: "৪.২ MB", to: "/brochure" },
  { icon: Calendar, title: "পেমেন্ট শিডিউল", desc: "কিস্তির বিস্তারিত সময়সূচি।", size: "১৮০ KB", to: "/brochure" },
  { icon: FileCheck2, title: "এগ্রিমেন্ট কপি", desc: "বিক্রয় চুক্তির প্রামাণিক কপি।", size: "১.১ MB", to: "/brochure" },
];

function DocsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">ডকুমেন্ট সেন্টার</h1>
        <p className="mt-2 text-muted-foreground">সব প্রয়োজনীয় ডকুমেন্ট এক জায়গায় — যেকোনো সময় ডাউনলোড করুন।</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {docs.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="group flex items-center gap-5 rounded-[24px] border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-card">
              <d.icon className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-bold text-primary">{d.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{d.desc}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">PDF · {d.size}</p>
            </div>
            <Link to={d.to} className="grid h-11 w-11 place-items-center rounded-full bg-gold text-primary shadow-gold transition-transform hover:scale-110">
              <Download className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="rounded-[26px] border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-6 text-center">
        <FileText className="mx-auto h-10 w-10 text-gold" />
        <p className="mt-3 font-display text-lg font-bold text-primary">অন্যান্য ডকুমেন্ট প্রয়োজন?</p>
        <p className="mt-1 text-sm text-muted-foreground">আমাদের কাস্টমার সাপোর্টের সাথে যোগাযোগ করুন।</p>
        <Link to="/contact" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">যোগাযোগ করুন</Link>
      </div>
    </div>
  );
}
