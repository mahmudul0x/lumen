import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Wallet, PiggyBank } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { Input } from "@/components/ui/input";
import { calcEMI, bdtBn, toBn } from "@/lib/leads";

export const Route = createFileRoute("/emi-calculator")({
  head: () => ({
    meta: [
      { title: "EMI ক্যালকুলেটর — Lumen Builders Ltd." },
      { name: "description", content: "আপনার ফ্ল্যাটের মাসিক EMI, মোট সুদ ও মোট পেমেন্ট হিসাব করুন।" },
      { property: "og:title", content: "EMI ক্যালকুলেটর" },
      { property: "og:url", content: "/emi-calculator" },
    ],
    links: [{ rel: "canonical", href: "/emi-calculator" }],
  }),
  component: EMIPage,
});

function EMIPage() {
  const [price, setPrice] = useState(6500000);
  const [down, setDown] = useState(1500000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(15);
  const [fee, setFee] = useState(1);

  const result = useMemo(
    () => calcEMI({ price, downPayment: down, interestRate: rate, years, processingFeePct: fee }),
    [price, down, rate, years, fee],
  );

  const NumberField = ({
    label, value, onChange, min, max, step, suffix,
  }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step: number; suffix?: string }) => (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {toBn(value)}{suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );

  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "EMI ক্যালকুলেটর" }]}
        title="EMI ক্যালকুলেটর"
        description="আপনার পছন্দের ফ্ল্যাটের মাসিক কিস্তি, মোট সুদ ও মোট পেমেন্ট এক ক্লিকেই জানুন।"
      />
      <section className="container pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6 rounded-[28px] border border-border/60 bg-card p-6 shadow-card md:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-primary">ইনপুট</h2>
                <p className="text-xs text-muted-foreground">মান পরিবর্তন করলেই ফলাফল স্বয়ংক্রিয়ভাবে আপডেট হবে</p>
              </div>
            </div>
            <div className="space-y-6">
              <NumberField label="ফ্ল্যাটের মূল্য (৳)" value={price} onChange={setPrice} min={2000000} max={50000000} step={100000} />
              <NumberField label="ডাউন পেমেন্ট (৳)" value={down} onChange={setDown} min={0} max={price} step={50000} />
              <NumberField label="সুদের হার" value={rate} onChange={setRate} min={5} max={16} step={0.25} suffix="%" />
              <NumberField label="মেয়াদ (বছর)" value={years} onChange={setYears} min={3} max={25} step={1} />
              <NumberField label="প্রসেসিং ফি" value={fee} onChange={setFee} min={0} max={5} step={0.1} suffix="%" />
            </div>
          </div>

          <motion.div
            key={`${result.monthly}-${result.totalPayment}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col justify-between overflow-hidden rounded-[28px] border border-secondary/40 bg-gradient-to-br from-primary via-primary to-accent p-8 text-primary-foreground shadow-float"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-secondary">মাসিক EMI</p>
              <p className="mt-2 font-display text-5xl font-bold md:text-6xl">
                ৳ {bdtBn(result.monthly)}
              </p>
              <p className="mt-2 text-sm text-primary-foreground/80">
                {toBn(years * 12)} মাসের জন্য
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatBox icon={<Wallet className="h-5 w-5" />} label="মূল অর্থ" value={`৳ ${bdtBn(result.principal)}`} />
              <StatBox icon={<TrendingUp className="h-5 w-5" />} label="মোট সুদ" value={`৳ ${bdtBn(result.totalInterest)}`} />
              <StatBox icon={<PiggyBank className="h-5 w-5" />} label="প্রসেসিং ফি" value={`৳ ${bdtBn(result.processingFee)}`} />
              <StatBox icon={<Calculator className="h-5 w-5" />} label="মোট পেমেন্ট" value={`৳ ${bdtBn(result.totalPayment)}`} highlight />
            </div>
            <p className="mt-6 text-center text-xs text-primary-foreground/70">
              * উপরের হিসাব প্রাথমিক ধারণার জন্য। প্রকৃত EMI ব্যাংকের নীতিমালা অনুযায়ী পরিবর্তনশীল।
            </p>
          </motion.div>
        </div>
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}

function StatBox({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 backdrop-blur ${highlight ? "border-secondary/60 bg-secondary/15" : "border-white/15 bg-white/5"}`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary-foreground/70">
        {icon} {label}
      </div>
      <p className="mt-2 text-lg font-bold">{value}</p>
    </div>
  );
}
