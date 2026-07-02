import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { projects } from "@/lib/projects-data";
import { bn } from "@/lib/utils.bn";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_admin/admin/inventory")({
  head: () => ({ meta: [{ title: "ইনভেন্টরি — অ্যাডমিন" }] }),
  component: InventoryPage,
});

const STATUSES = [
  { key: "available", label: "উপলব্ধ", cls: "bg-accent/15 text-accent border-accent/30" },
  { key: "reserved", label: "রিজার্ভড", cls: "bg-secondary/15 text-secondary border-secondary/30" },
  { key: "booked", label: "বুকড", cls: "bg-primary/10 text-primary border-primary/30" },
  { key: "sold", label: "বিক্রিত", cls: "bg-slate-200 text-slate-700 border-slate-300" },
  { key: "blocked", label: "ব্লকড", cls: "bg-destructive/10 text-destructive border-destructive/30" },
] as const;

function seedStatus(seed: number): typeof STATUSES[number] {
  const dist = [0, 0, 0, 0, 1, 1, 2, 2, 3, 4];
  return STATUSES[dist[seed % dist.length]];
}

function InventoryPage() {
  return (
    <AdminPage title="ইনভেন্টরি" description="প্রতিটি প্রকল্পের ইউনিটভিত্তিক লাইভ প্রাপ্যতা।">
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <span key={s.key} className={cn("rounded-full border px-3 py-1 text-xs font-medium", s.cls)}>{s.label}</span>
        ))}
      </div>

      <div className="space-y-6">
        {projects.map((p) => {
          const total = p.totalUnits ?? 40;
          const units = Array.from({ length: total }, (_, i) => ({ n: i + 1, s: seedStatus(i + p.slug.length) }));
          const counts = STATUSES.map((s) => ({ ...s, count: units.filter((u) => u.s.key === s.key).length }));
          return (
            <AdminCard key={p.slug}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.location} • মোট ইউনিট {bn(total)}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {counts.map((c) => (
                    <span key={c.key} className={cn("rounded-lg border px-2.5 py-1", c.cls)}>{c.label}: {bn(c.count)}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20">
                {units.map((u) => (
                  <div
                    key={u.n}
                    title={`ইউনিট ${bn(u.n)} — ${u.s.label}`}
                    className={cn("aspect-square rounded-md border text-[10px] font-medium leading-none grid place-items-center", u.s.cls)}
                  >
                    {bn(u.n)}
                  </div>
                ))}
              </div>
            </AdminCard>
          );
        })}
      </div>
    </AdminPage>
  );
}
