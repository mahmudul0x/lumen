import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { projects } from "@/lib/projects-data";
import { bn } from "@/lib/utils.bn";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/projects")({
  component: ProjectsAdmin,
});

function ProjectsAdmin() {
  const stats = useMemo(() => ({
    total: projects.length,
    ongoing: projects.filter((p) => p.status === "চলমান").length,
    done: projects.filter((p) => p.status === "সম্পন্ন").length,
    upcoming: projects.filter((p) => p.status === "আসছে").length,
  }), []);

  return (
    <AdminPage title="প্রকল্প ব্যবস্থাপনা" description="সব প্রকল্পের ওভারভিউ, স্ট্যাটাস ও অগ্রগতি">
      <div className="grid gap-3 md:grid-cols-4">
        {[
          { label: "মোট প্রকল্প", value: stats.total },
          { label: "চলমান", value: stats.ongoing },
          { label: "সম্পন্ন", value: stats.done },
          { label: "আসছে", value: stats.upcoming },
        ].map((s) => (
          <AdminCard key={s.label}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-primary">{bn(s.value)}</p>
          </AdminCard>
        ))}
      </div>

      <AdminCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-3">প্রকল্প</th>
                <th className="p-3">অবস্থান</th>
                <th className="p-3">স্ট্যাটাস</th>
                <th className="p-3">অগ্রগতি</th>
                <th className="p-3">হ্যান্ডওভার</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((p) => (
                <tr key={p.slug} className="hover:bg-slate-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-14 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{p.location}</td>
                  <td className="p-3"><span className="rounded-lg bg-primary/10 px-2 py-0.5 text-[11px] text-primary">{p.status}</span></td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full bg-emerald-500" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs">{bn(p.progress)}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-xs">{p.handover}</td>
                  <td className="p-3"><Link to="/projects/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">দেখুন <ExternalLink className="h-3 w-3" /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <AdminCard>
        <p className="text-sm text-muted-foreground">
          <strong className="text-primary">নোট:</strong> প্রকল্পের কন্টেন্ট বর্তমানে <code>src/lib/projects-data.ts</code> থেকে পরিচালিত হয়। সম্পূর্ণ CRUD এবং মিডিয়া আপলোডের জন্য Supabase Storage-এ প্রকল্প টেবিল মাইগ্রেশনের প্রয়োজন হবে।
        </p>
      </AdminCard>
    </AdminPage>
  );
}
