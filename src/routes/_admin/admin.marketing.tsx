import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { Facebook, Search, Mail, MessageSquare, Send, TrendingUp } from "lucide-react";
import { bn } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/marketing")({
  head: () => ({ meta: [{ title: "মার্কেটিং — অ্যাডমিন" }] }),
  component: MarketingPage,
});

const CHANNELS = [
  { icon: Facebook, label: "Facebook Ads", spend: 125000, leads: 214, cpl: 584, roas: 4.8 },
  { icon: Search, label: "Google Ads", spend: 96000, leads: 168, cpl: 571, roas: 5.2 },
  { icon: Mail, label: "Email Marketing", spend: 8000, leads: 92, cpl: 87, roas: 12.4 },
  { icon: MessageSquare, label: "SMS Campaign", spend: 15000, leads: 61, cpl: 246, roas: 6.1 },
  { icon: Send, label: "WhatsApp Campaign", spend: 6000, leads: 78, cpl: 77, roas: 9.8 },
];

function MarketingPage() {
  const totalSpend = CHANNELS.reduce((s, c) => s + c.spend, 0);
  const totalLeads = CHANNELS.reduce((s, c) => s + c.leads, 0);
  return (
    <AdminPage title="মার্কেটিং ড্যাশবোর্ড" description="ক্যাম্পেইন, কনভার্সন ও ROI — সমস্ত চ্যানেল এক দৃষ্টিতে।">
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminCard>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">মোট ব্যয়</p>
          <p className="mt-2 font-display text-2xl font-bold text-primary">৳ {bn(totalSpend.toLocaleString("en-US"))}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">মোট লিড</p>
          <p className="mt-2 font-display text-2xl font-bold text-primary">{bn(totalLeads)}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">গড় CPL</p>
          <p className="mt-2 font-display text-2xl font-bold text-primary">৳ {bn(Math.round(totalSpend / totalLeads))}</p>
        </AdminCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {CHANNELS.map((c) => (
          <AdminCard key={c.label}>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold text-primary">{c.label}</p>
                <p className="text-xs text-muted-foreground">গত ৩০ দিন</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
                <TrendingUp className="h-3 w-3" /> ROAS {bn(c.roas.toFixed(1))}x
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div><p className="text-[11px] text-muted-foreground">ব্যয়</p><p className="text-sm font-semibold">৳{bn(c.spend.toLocaleString("en-US"))}</p></div>
              <div><p className="text-[11px] text-muted-foreground">লিড</p><p className="text-sm font-semibold">{bn(c.leads)}</p></div>
              <div><p className="text-[11px] text-muted-foreground">CPL</p><p className="text-sm font-semibold">৳{bn(c.cpl)}</p></div>
            </div>
          </AdminCard>
        ))}
      </div>
    </AdminPage>
  );
}
