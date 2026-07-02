import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, PenLine, FileText, Eraser } from "lucide-react";

export const Route = createFileRoute("/agreement")({
  head: () => ({
    meta: [
      { title: "ডিজিটাল চুক্তিপত্র — Lumen Builders" },
      { name: "description", content: "নিরাপদ ডিজিটাল চুক্তি — পড়ুন, স্বাক্ষর করুন, ডাউনলোড করুন।" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AgreementPage,
});

const CLAUSES = [
  { title: "১. পক্ষসমূহ", body: "এই চুক্তি Lumen Builders Ltd. ('বিক্রেতা') এবং নিম্নস্বাক্ষরকারী গ্রাহক ('ক্রেতা')-এর মধ্যে সম্পাদিত।" },
  { title: "২. প্রকল্প বিবরণ", body: "ক্রেতা কর্তৃক নির্বাচিত ইউনিট, ফ্লোর, আয়তন ও দাম উক্ত প্রকল্পের অফিসিয়াল ব্রোশিওর ও বুকিং ফর্মে বর্ণিত।" },
  { title: "৩. পেমেন্ট সময়সূচি", body: "বুকিং, ডাউন পেমেন্ট, নির্মাণ কিস্তি ও হ্যান্ডওভার পেমেন্টসমূহ পূর্ব-সম্মত সময়সূচি অনুযায়ী পরিশোধিত হবে।" },
  { title: "৪. হ্যান্ডওভার", body: "নির্ধারিত সময়ে ইউনিট হস্তান্তর করা হবে। বিলম্ব হলে যথাযথ যোগাযোগ ও ক্ষতিপূরণ ব্যবস্থা অনুসরণ করা হবে।" },
  { title: "৫. বাতিলকরণ ও রিফান্ড", body: "কোম্পানির রিফান্ড নীতিমালা অনুযায়ী প্রযোজ্য শর্তাবলী প্রযোজ্য হবে।" },
  { title: "৬. বিরোধ নিষ্পত্তি", body: "কোনো বিরোধ প্রথমে পারস্পরিক আলোচনায় নিষ্পত্তির চেষ্টা হবে; ব্যর্থ হলে বাংলাদেশের প্রচলিত আইন প্রযোজ্য।" },
];

function AgreementPage() {
  const [accepted, setAccepted] = useState(false);
  const [signed, setSigned] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  const start = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#0B2D6B"; ctx.lineWidth = 2; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(x, y); drawing.current = true;
  };
  const move = (x: number, y: number) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.lineTo(x, y); ctx?.stroke();
    setSigned(true);
  };
  const end = () => { drawing.current = false; };
  const clear = () => {
    const c = canvasRef.current; if (!c) return;
    c.getContext("2d")?.clearRect(0, 0, c.width, c.height);
    setSigned(false);
  };
  const pos = (e: React.MouseEvent | React.TouchEvent) => {
    const c = canvasRef.current!; const r = c.getBoundingClientRect();
    const t = "touches" in e ? e.touches[0] : e;
    return { x: (t.clientX - r.left) * (c.width / r.width), y: (t.clientY - r.top) * (c.height / r.height) };
  };

  const download = () => {
    const html = `<!doctype html><meta charset="utf-8"><title>Agreement</title><body style="font-family:sans-serif;padding:40px;max-width:720px;margin:auto"><h1>Lumen Builders — ডিজিটাল চুক্তিপত্র</h1>${CLAUSES.map((c) => `<h3>${c.title}</h3><p>${c.body}</p>`).join("")}<hr><p>স্বাক্ষরের তারিখ: ${new Date().toLocaleString("bn-BD")}</p></body>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "lumen-agreement.html"; a.click();
  };

  return (
    <SiteShell>
      <PageHeader
        title="ডিজিটাল চুক্তিপত্র"
        description="চুক্তিটি ভালোভাবে পড়ুন, শর্তাবলী গ্রহণ করুন এবং ডিজিটাল স্বাক্ষর করুন।"
        breadcrumbs={[{ label: "চুক্তিপত্র" }]}
      />
      <section className="container-luxury py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <article className="rounded-3xl border border-border bg-white p-8 shadow-md">
            <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
              <FileText className="h-6 w-6 text-secondary" />
              <div>
                <h2 className="font-display text-xl font-bold text-primary">অ্যাপার্টমেন্ট বুকিং চুক্তিপত্র</h2>
                <p className="text-xs text-muted-foreground">সংস্করণ ২০২৬ • Lumen Builders Ltd.</p>
              </div>
            </div>
            <div className="space-y-5 text-sm leading-7 text-foreground/80">
              {CLAUSES.map((c) => (
                <div key={c.title}>
                  <h3 className="font-display font-semibold text-primary">{c.title}</h3>
                  <p className="mt-1">{c.body}</p>
                </div>
              ))}
            </div>

            <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-slate-50 p-4">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
              <span className="text-sm">আমি উপরের সমস্ত শর্তাবলী পড়েছি ও সম্মত হয়েছি।</span>
            </label>
          </article>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-lg">
              <p className="flex items-center gap-2 font-display font-semibold text-primary"><PenLine className="h-4 w-4" /> ডিজিটাল স্বাক্ষর</p>
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                className="mt-3 h-40 w-full touch-none rounded-xl border border-dashed border-border bg-slate-50"
                onMouseDown={(e) => { const p = pos(e); start(p.x, p.y); }}
                onMouseMove={(e) => { const p = pos(e); move(p.x, p.y); }}
                onMouseUp={end} onMouseLeave={end}
                onTouchStart={(e) => { const p = pos(e); start(p.x, p.y); }}
                onTouchMove={(e) => { e.preventDefault(); const p = pos(e); move(p.x, p.y); }}
                onTouchEnd={end}
              />
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={clear}><Eraser className="mr-1.5 h-3.5 w-3.5" /> ক্লিয়ার</Button>
                {signed && <span className="inline-flex items-center gap-1 text-xs text-accent"><CheckCircle2 className="h-3.5 w-3.5" /> স্বাক্ষর গ্রহণ করা হয়েছে</span>}
              </div>
            </div>

            <Button variant="luxury" className="w-full" disabled={!accepted || !signed} onClick={download}>
              <Download className="mr-2 h-4 w-4" /> চুক্তি ডাউনলোড করুন
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">স্বাক্ষরিত চুক্তির একটি কপি আপনার ইমেইলে পাঠানো হবে।</p>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
