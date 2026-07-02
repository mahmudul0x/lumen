import { useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, CreditCard, Smartphone, Printer } from "lucide-react";
import { bn } from "@/lib/utils.bn";

const searchSchema = z.object({
  amount: z.coerce.number().optional(),
  project: z.string().optional(),
  ref: z.string().optional(),
});

export const Route = createFileRoute("/payment")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "পেমেন্ট — Lumen Builders" },
      { name: "description", content: "SSLCommerz, bKash, Nagad, Rocket, Visa, MasterCard, Amex সহ নিরাপদ পেমেন্ট।" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PaymentPage,
});

const METHODS = [
  { key: "sslcommerz", label: "SSLCommerz", desc: "Visa / MasterCard / Amex / সব ব্যাংক কার্ড", icon: CreditCard, tag: "সবচেয়ে জনপ্রিয়" },
  { key: "bkash", label: "bKash", desc: "মোবাইল ওয়ালেট", icon: Smartphone, tag: "ইনস্ট্যান্ট" },
  { key: "nagad", label: "Nagad", desc: "মোবাইল ওয়ালেট", icon: Smartphone },
  { key: "rocket", label: "Rocket (DBBL)", desc: "মোবাইল ওয়ালেট", icon: Smartphone },
  { key: "card", label: "Debit / Credit Card", desc: "Visa • MasterCard • American Express", icon: CreditCard },
  { key: "gpay", label: "Google Pay / Apple Pay", desc: "শীঘ্রই আসছে", icon: Smartphone },
];

function PaymentPage() {
  const { amount = 50000, project, ref } = useSearch({ from: "/payment" });
  const [step, setStep] = useState<"select" | "success">("select");
  const [selected, setSelected] = useState<string | null>(null);
  const txnId = `LMN-PAY-${Date.now().toString().slice(-8)}`;

  return (
    <SiteShell>
      <PageHeader
        title="নিরাপদ পেমেন্ট"
        description="১০০% এনক্রিপ্টেড • PCI-DSS সামঞ্জস্যপূর্ণ • সাথে সাথে রসিদ"
        breadcrumbs={[{ label: "পেমেন্ট" }]}
      />
      <section className="container-luxury py-16">
        {step === "select" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">পেমেন্ট মাধ্যম নির্বাচন করুন</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {METHODS.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setSelected(m.key)}
                    className={`group relative rounded-2xl border-2 bg-white p-5 text-left transition ${selected === m.key ? "border-primary shadow-md" : "border-border hover:border-primary/40"}`}
                  >
                    {m.tag && <span className="absolute right-3 top-3 rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold text-secondary">{m.tag}</span>}
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><m.icon className="h-5 w-5" /></div>
                    <p className="mt-3 font-display font-semibold text-primary">{m.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{m.desc}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl bg-accent/10 p-3 text-sm text-accent">
                <ShieldCheck className="h-4 w-4" /> আপনার তথ্য 256-bit SSL দ্বারা সুরক্ষিত।
              </div>
            </div>

            <aside className="rounded-3xl border border-border bg-white p-6 shadow-lg">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">পেমেন্ট সারাংশ</p>
              {project && <p className="mt-2 font-display text-lg font-semibold text-primary">{project}</p>}
              {ref && <p className="text-xs text-muted-foreground">রেফারেন্স: {ref}</p>}
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">পরিমাণ</span><span className="font-semibold">৳ {bn(amount.toLocaleString("en-US"))}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">প্রসেসিং ফি</span><span className="font-semibold">৳ {bn(0)}</span></div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-display font-semibold text-primary">সর্বমোট</span>
                <span className="font-display text-xl font-bold text-primary">৳ {bn(amount.toLocaleString("en-US"))}</span>
              </div>
              <Button
                variant="luxury"
                className="mt-5 w-full"
                disabled={!selected}
                onClick={() => setStep("success")}
              >
                {selected ? `${METHODS.find((m) => m.key === selected)!.label} দিয়ে পে করুন` : "মাধ্যম নির্বাচন করুন"}
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">"পে করুন" ক্লিক করলে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন।</p>
            </aside>
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-white p-8 text-center shadow-xl">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent/15 text-accent">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-primary">পেমেন্ট সফল হয়েছে</h2>
            <p className="mt-2 text-sm text-muted-foreground">আপনার পেমেন্ট গ্রহণ করা হয়েছে। রসিদটি ইমেইলে পাঠানো হবে।</p>
            <div className="mt-6 space-y-2 rounded-2xl bg-slate-50 p-4 text-left text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">ট্রানজেকশন ID</span><span className="font-mono font-semibold">{txnId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">পরিমাণ</span><span className="font-semibold">৳ {bn(amount.toLocaleString("en-US"))}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">মাধ্যম</span><span className="font-semibold">{METHODS.find((m) => m.key === selected)?.label}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">স্ট্যাটাস</span><span className="font-semibold text-accent">সফল</span></div>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> রসিদ প্রিন্ট</Button>
              <Button variant="luxury" onClick={() => (window.location.href = "/dashboard")}>ড্যাশবোর্ডে যান</Button>
            </div>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
