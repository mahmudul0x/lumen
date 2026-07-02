import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/dashboard/emi-planner")({
  head: () => ({ meta: [{ title: "EMI প্ল্যানার — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  component: EMIPlanner,
});

function toBn(n: number) {
  return n.toLocaleString("bn-BD", { maximumFractionDigits: 0 });
}

function EMIPlanner() {
  const [price, setPrice] = useState(9500000);
  const [down, setDown] = useState(2000000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(15);
  const [fee, setFee] = useState(50000);

  const { emi, total, interest, principal, schedule } = useMemo(() => {
    const p = Math.max(0, price - down);
    const r = rate / 100 / 12;
    const n = years * 12;
    const emiVal = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalVal = emiVal * n + fee;
    const interestVal = totalVal - p - fee;
    // Yearly schedule
    let bal = p;
    const yearly: { year: number; principal: number; interest: number; balance: number }[] = [];
    for (let y = 1; y <= years; y++) {
      let py = 0, iy = 0;
      for (let m = 0; m < 12; m++) {
        const i = bal * r;
        const pr = emiVal - i;
        bal -= pr; iy += i; py += pr;
      }
      yearly.push({ year: y, principal: py, interest: iy, balance: Math.max(0, bal) });
    }
    return { emi: emiVal, total: totalVal, interest: interestVal, principal: p, schedule: yearly };
  }, [price, down, rate, years, fee]);

  const principalPct = (principal / (principal + interest)) * 100;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">EMI প্ল্যানার</h1>
        <p className="mt-2 text-muted-foreground">উন্নত EMI ক্যালকুলেটর — সম্পূর্ণ পেমেন্ট শিডিউল সহ।</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
        {/* Inputs */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="rounded-[26px] border border-border/60 bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-primary"><Calculator className="h-4 w-4 text-gold" /> ইনপুট</h2>
          <div className="mt-4 space-y-5">
            <RangeField label="অ্যাপার্টমেন্ট মূল্য" value={price} min={2000000} max={50000000} step={100000} onChange={setPrice} suffix="টাকা" />
            <RangeField label="ডাউন পেমেন্ট" value={down} min={0} max={price} step={50000} onChange={setDown} suffix="টাকা" />
            <RangeField label="সুদের হার" value={rate} min={5} max={16} step={0.25} onChange={setRate} suffix="%" />
            <RangeField label="মেয়াদ" value={years} min={5} max={25} step={1} onChange={setYears} suffix="বছর" />
            <div>
              <label className="text-sm font-semibold">ব্যাংক প্রসেসিং ফি</label>
              <Input type="number" value={fee} min={0} onChange={(e) => setFee(Number(e.target.value) || 0)} className="mt-2" />
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="মাসিক EMI" value={`৳ ${toBn(Math.round(emi))}`} accent />
            <ResultCard label="মোট সুদ" value={`৳ ${toBn(Math.round(interest))}`} />
            <ResultCard label="মোট পেমেন্ট" value={`৳ ${toBn(Math.round(total))}`} />
          </motion.div>

          {/* Chart (donut) */}
          <div className="rounded-[26px] border border-border/60 bg-card p-6 shadow-soft">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-primary"><TrendingUp className="h-4 w-4 text-gold" /> মূলধন বনাম সুদ</h3>
            <div className="mt-5 flex flex-col items-center gap-6 md:flex-row">
              <div className="relative h-40 w-40 shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="16" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--gold))" strokeWidth="16" strokeDasharray={`${(principalPct / 100) * 251.3} 251.3`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <p className="font-display text-2xl font-bold text-primary">{principalPct.toFixed(0)}%</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">মূলধন</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-3 text-sm">
                <LegendRow color="bg-gold" label="মূলধন (লোন)" value={`৳ ${toBn(Math.round(principal))}`} />
                <LegendRow color="bg-muted" label="মোট সুদ" value={`৳ ${toBn(Math.round(interest))}`} />
                <LegendRow color="bg-primary" label="প্রসেসিং ফি" value={`৳ ${toBn(fee)}`} />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="rounded-[26px] border border-border/60 bg-card shadow-soft">
            <div className="border-b border-border p-5">
              <h3 className="font-display text-lg font-bold text-primary">বার্ষিক পেমেন্ট শিডিউল</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="p-3 text-left">বছর</th>
                    <th className="p-3 text-right">মূলধন পরিশোধ</th>
                    <th className="p-3 text-right">সুদ পরিশোধ</th>
                    <th className="p-3 text-right">অবশিষ্ট</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((s, i) => (
                    <tr key={s.year} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="p-3 font-semibold text-primary">{s.year}</td>
                      <td className="p-3 text-right">৳ {toBn(Math.round(s.principal))}</td>
                      <td className="p-3 text-right text-muted-foreground">৳ {toBn(Math.round(s.interest))}</td>
                      <td className="p-3 text-right font-semibold">৳ {toBn(Math.round(s.balance))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RangeField({ label, value, min, max, step, onChange, suffix }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; suffix: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold">{label}</label>
        <span className="text-sm font-bold text-primary">{value.toLocaleString("bn-BD")} <span className="text-xs text-muted-foreground">{suffix}</span></span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-gold" />
    </div>
  );
}
function ResultCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-[22px] border p-5 shadow-soft ${accent ? "border-gold bg-gradient-to-br from-gold/10 to-transparent" : "border-border/60 bg-card"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-primary md:text-3xl">{value}</p>
    </div>
  );
}
function LegendRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2"><span className={`h-3 w-3 rounded-full ${color}`} /><span>{label}</span></div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
