import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { projects } from "@/lib/projects-data";
import { bn } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/apartments")({
  component: ApartmentsAdmin,
});

function ApartmentsAdmin() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "available" | "sold">("all");

  const rows = useMemo(() => {
    return projects.flatMap((p) => p.floorPlans.map((f) => ({ project: p, plan: f })))
      .filter(({ project, plan }) => {
        if (q && !(`${project.name} ${plan.name}`.toLowerCase().includes(q.toLowerCase()))) return false;
        if (status === "available" && !plan.available) return false;
        if (status === "sold" && plan.available) return false;
        return true;
      });
  }, [q, status]);

  const totals = useMemo(() => ({
    total: rows.length,
    available: rows.filter((r) => r.plan.available).length,
    sold: rows.filter((r) => !r.plan.available).length,
  }), [rows]);

  return (
    <AdminPage title="অ্যাপার্টমেন্ট" description="সব প্রকল্পের ইউনিট, বেড/বাথ, দাম ও প্রাপ্যতা">
      <div className="grid gap-3 md:grid-cols-3">
        <AdminCard><p className="text-xs uppercase text-muted-foreground">মোট ইউনিট</p><p className="mt-1 font-display text-3xl font-bold text-primary">{bn(totals.total)}</p></AdminCard>
        <AdminCard><p className="text-xs uppercase text-muted-foreground">প্রাপ্য</p><p className="mt-1 font-display text-3xl font-bold text-emerald-600">{bn(totals.available)}</p></AdminCard>
        <AdminCard><p className="text-xs uppercase text-muted-foreground">বিক্রিত</p><p className="mt-1 font-display text-3xl font-bold text-slate-500">{bn(totals.sold)}</p></AdminCard>
      </div>

      <AdminCard>
        <div className="flex flex-wrap items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="প্রকল্প বা ইউনিট খুঁজুন" className="h-10 flex-1 rounded-xl border border-border px-3 text-sm min-w-[220px]" />
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="h-10 rounded-xl border border-border px-3 text-sm">
            <option value="all">সব</option>
            <option value="available">প্রাপ্য</option>
            <option value="sold">বিক্রিত</option>
          </select>
        </div>
      </AdminCard>

      <AdminCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="p-3">প্রকল্প</th><th className="p-3">ইউনিট</th><th className="p-3">আয়তন</th><th className="p-3">বেড/বাথ</th><th className="p-3">দাম</th><th className="p-3">অবস্থা</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map(({ project, plan }) => (
                <tr key={project.slug + plan.id}>
                  <td className="p-3 font-medium">{project.name}</td>
                  <td className="p-3">{plan.name}</td>
                  <td className="p-3">{plan.size}</td>
                  <td className="p-3">{bn(plan.beds)} বেড • {bn(plan.baths)} বাথ</td>
                  <td className="p-3">{plan.price}</td>
                  <td className="p-3">
                    {plan.available
                      ? <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-600">প্রাপ্য</span>
                      : <span className="rounded-lg bg-slate-500/10 px-2 py-0.5 text-[11px] text-slate-600">বিক্রিত</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </AdminPage>
  );
}
