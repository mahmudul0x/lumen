import { createFileRoute, useSearch, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { X, Plus, Check, Minus, GitCompareArrows } from "lucide-react";
import { projects, getProject, type ProjectDetail } from "@/lib/projects-data";

export const Route = createFileRoute("/_authenticated/dashboard/compare")({
  head: () => ({ meta: [{ title: "প্রকল্প তুলনা — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    slugs: typeof s.slugs === "string" ? s.slugs : undefined,
  }),
  component: ComparePage,
});

const getInfo = (p: ProjectDetail, key: string) =>
  p.apartmentInfo.find((a) => a.label === key)?.value ?? "—";

function ComparePage() {
  const search = useSearch({ from: "/_authenticated/dashboard/compare" });
  const navigate = useNavigate();
  const slugs = (search.slugs?.split(",").filter(Boolean) ?? []).slice(0, 3);
  const selected = slugs.map(getProject).filter(Boolean) as ProjectDetail[];

  const update = (next: string[]) => navigate({ to: "/dashboard/compare", search: { slugs: next.join(",") || undefined } });
  const add = (slug: string) => selected.length < 3 && !slugs.includes(slug) && update([...slugs, slug]);
  const remove = (slug: string) => update(slugs.filter((s: string) => s !== slug));

  const rows: { label: string; key: (p: ProjectDetail) => string | number }[] = [
    { label: "শুরুর মূল্য", key: (p) => p.startingPrice },
    { label: "অবস্থান", key: (p) => p.location },
    { label: "সাইজ", key: (p) => getInfo(p, "সাইজ") },
    { label: "বেডরুম", key: (p) => getInfo(p, "বেডরুম") },
    { label: "বাথরুম", key: (p) => getInfo(p, "বাথরুম") },
    { label: "পার্কিং", key: (p) => getInfo(p, "পার্কিং") },
    { label: "হ্যান্ডওভার", key: (p) => p.handover },
    { label: "স্ট্যাটাস", key: (p) => p.status },
    { label: "অগ্রগতি", key: (p) => `${p.progress ?? 0}%` },
    { label: "মোট ইউনিট", key: (p) => `${p.totalUnits}টি` },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">প্রকল্প তুলনা</h1>
        <p className="mt-2 text-muted-foreground">৩টি পর্যন্ত প্রকল্প পাশাপাশি তুলনা করুন।</p>
      </header>

      {/* Picker */}
      <div className="rounded-[26px] border border-border/60 bg-card p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">প্রকল্প নির্বাচন করুন ({selected.length}/৩)</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {projects.map((p) => {
            const on = slugs.includes(p.slug);
            const full = selected.length >= 3 && !on;
            return (
              <button
                key={p.slug}
                onClick={() => (on ? remove(p.slug) : add(p.slug))}
                disabled={full}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                  on ? "border-gold bg-gold text-primary shadow-gold" : full ? "border-border bg-muted text-muted-foreground opacity-50" : "border-border bg-background hover:border-primary hover:bg-primary/5"
                }`}
              >
                {on ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />} {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="rounded-[26px] border-2 border-dashed border-border bg-card py-16 text-center">
          <GitCompareArrows className="mx-auto h-14 w-14 text-muted-foreground/50" />
          <p className="mt-4 font-display text-lg font-semibold text-primary">তুলনা শুরু করতে প্রকল্প নির্বাচন করুন</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto rounded-[26px] border border-border/60 bg-card shadow-card">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-border">
                <th className="w-40 p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">বৈশিষ্ট্য</th>
                {selected.map((p) => (
                  <th key={p!.slug} className="p-4 text-left">
                    <div className="flex items-start gap-3">
                      <img src={p!.image} alt={p!.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="truncate font-display text-base font-bold text-primary">{p!.name}</p>
                        <button onClick={() => remove(p!.slug)} className="mt-1 inline-flex items-center gap-1 text-xs text-destructive hover:underline"><X className="h-3 w-3" /> সরান</button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.label} className={idx % 2 === 0 ? "bg-muted/20" : ""}>
                  <td className="p-4 text-sm font-semibold text-foreground">{row.label}</td>
                  {selected.map((p) => (
                    <td key={p!.slug} className="p-4 text-sm text-foreground/80">{row.key(p!)}</td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td className="p-4 text-sm font-semibold text-foreground">অ্যামেনিটি</td>
                {selected.map((p) => (
                  <td key={p!.slug} className="p-4">
                    <ul className="space-y-1 text-xs">
                      {(p!.amenities ?? []).slice(0, 6).map((a) => (
                        <li key={a} className="flex items-center gap-1.5"><Check className="h-3 w-3 text-accent" /> {a}</li>
                      ))}
                      {(!p!.amenities || p!.amenities.length === 0) && <li className="flex items-center gap-1.5 text-muted-foreground"><Minus className="h-3 w-3" /> N/A</li>}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
