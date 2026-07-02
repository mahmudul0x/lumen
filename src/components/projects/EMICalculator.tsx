import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

function toBn(n: number) {
  return n.toLocaleString("bn-BD", { maximumFractionDigits: 0 });
}

export function EMICalculator({ defaultPriceLakh = 125 }: { defaultPriceLakh?: number }) {
  const initial = Math.max(50, defaultPriceLakh);
  const [price, setPrice] = useState(initial * 100000); // BDT
  const [down, setDown] = useState(Math.round(initial * 100000 * 0.3));
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(15);

  const emi = useMemo(() => {
    const p = Math.max(0, price - down);
    const r = rate / 12 / 100;
    const n = years * 12;
    if (p <= 0 || r <= 0) return 0;
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [price, down, rate, years]);

  const total = emi * years * 12;
  const interest = total - (price - down);

  return (
    <div className="rounded-[22px] border border-border bg-surface p-6 shadow-soft md:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-gold/15 text-gold">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">EMI ক্যালকুলেটর</p>
          <h3 className="text-xl font-bold text-primary">মাসিক কিস্তি হিসাব করুন</h3>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
              অ্যাপার্টমেন্ট মূল্য <span className="text-primary">৳ {toBn(price)}</span>
            </label>
            <Slider className="mt-3" min={5000000} max={50000000} step={500000}
              value={[price]} onValueChange={(v) => { setPrice(v[0]); if (down > v[0] * 0.9) setDown(Math.round(v[0] * 0.3)); }} />
          </div>
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
              ডাউন পেমেন্ট <span className="text-primary">৳ {toBn(down)}</span>
            </label>
            <Slider className="mt-3" min={0} max={price} step={100000}
              value={[down]} onValueChange={(v) => setDown(v[0])} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">সুদের হার (%)</label>
              <Input type="number" min={4} max={18} step={0.25} value={rate}
                onChange={(e) => setRate(Math.max(4, Math.min(18, Number(e.target.value) || 0)))}
                className="mt-2" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">মেয়াদ (বছর)</label>
              <Input type="number" min={1} max={25} value={years}
                onChange={(e) => setYears(Math.max(1, Math.min(25, Number(e.target.value) || 0)))}
                className="mt-2" />
            </div>
          </div>
        </div>

        <div className="rounded-[18px] bg-gradient-to-br from-primary to-primary/85 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">মাসিক EMI</p>
          <p className="mt-2 text-4xl font-bold text-gold">৳ {toBn(emi)}</p>
          <div className="mt-6 space-y-3 border-t border-white/20 pt-5 text-sm">
            <div className="flex justify-between"><span className="text-white/70">লোন প্রিন্সিপাল</span><span className="font-semibold">৳ {toBn(price - down)}</span></div>
            <div className="flex justify-between"><span className="text-white/70">মোট সুদ</span><span className="font-semibold">৳ {toBn(interest)}</span></div>
            <div className="flex justify-between border-t border-white/20 pt-3"><span className="text-white/70">মোট পরিশোধ</span><span className="font-bold text-gold">৳ {toBn(total)}</span></div>
          </div>
          <p className="mt-5 text-xs text-white/60">* একটি ইন্ডিকেটিভ হিসাব। প্রকৃত EMI ব্যাংকের শর্তানুসারে পরিবর্তন হতে পারে।</p>
        </div>
      </div>
    </div>
  );
}
