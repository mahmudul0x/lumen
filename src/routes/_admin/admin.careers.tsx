import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/careers")({
  component: CareersAdmin,
});

function CareersAdmin() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({ title: "", department: "", location: "", job_type: "full-time", description: "", requirements: "" });

  const load = async () => {
    const [j, a] = await Promise.all([
      supabase.from("job_openings").select("*").order("created_at", { ascending: false }),
      supabase.from("job_applications").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    setJobs(j.data ?? []); setApps(a.data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!job.title) return;
    await supabase.from("job_openings").insert({ ...job, active: true });
    setJob({ title: "", department: "", location: "", job_type: "full-time", description: "", requirements: "" });
    load();
  };
  const toggle = async (id: string, active: boolean) => { await supabase.from("job_openings").update({ active }).eq("id", id); load(); };
  const removeJob = async (id: string) => { await supabase.from("job_openings").delete().eq("id", id); load(); };
  const setAppStatus = async (id: string, status: string) => { await supabase.from("job_applications").update({ status }).eq("id", id); load(); };

  return (
    <AdminPage title="ক্যারিয়ার" description={`${jobs.length} জব • ${apps.length} আবেদন`}>
      <AdminCard>
        <h2 className="font-display text-lg font-bold text-primary">নতুন জব পোস্ট</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <input value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} placeholder="পদের নাম" className="h-10 rounded-xl border border-border px-3 text-sm" />
          <input value={job.department} onChange={(e) => setJob({ ...job, department: e.target.value })} placeholder="ডিপার্টমেন্ট" className="h-10 rounded-xl border border-border px-3 text-sm" />
          <input value={job.location} onChange={(e) => setJob({ ...job, location: e.target.value })} placeholder="অবস্থান" className="h-10 rounded-xl border border-border px-3 text-sm" />
          <select value={job.job_type} onChange={(e) => setJob({ ...job, job_type: e.target.value })} className="h-10 rounded-xl border border-border px-3 text-sm">
            <option value="full-time">ফুল-টাইম</option>
            <option value="part-time">পার্ট-টাইম</option>
            <option value="contract">চুক্তিভিত্তিক</option>
          </select>
          <textarea value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} placeholder="বিবরণ" rows={2} className="rounded-xl border border-border p-3 text-sm md:col-span-2" />
          <textarea value={job.requirements} onChange={(e) => setJob({ ...job, requirements: e.target.value })} placeholder="যোগ্যতা" rows={2} className="rounded-xl border border-border p-3 text-sm md:col-span-2" />
        </div>
        <Button onClick={create} variant="gold" className="mt-3"><Plus className="mr-1.5 h-4 w-4" /> পোস্ট করুন</Button>
      </AdminCard>

      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-primary">চলমান জব</h2>
        {loading ? <Loader2 className="h-6 w-6 animate-spin text-primary" />
          : jobs.length === 0 ? <EmptyState title="কোনো জব পোস্ট নেই" />
          : (
            <div className="space-y-2">
              {jobs.map((j) => (
                <AdminCard key={j.id} className="!p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1">
                      <p className="font-medium">{j.title}</p>
                      <p className="text-xs text-muted-foreground">{j.department} • {j.location} • {j.job_type}</p>
                    </div>
                    <label className="text-sm"><input type="checkbox" checked={j.active} onChange={(e) => toggle(j.id, e.target.checked)} className="mr-1" /> সক্রিয়</label>
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => removeJob(j.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </AdminCard>
              ))}
            </div>
          )}
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-primary">সাম্প্রতিক আবেদন</h2>
        {apps.length === 0 ? <EmptyState title="কোনো আবেদন নেই" />
          : (
            <AdminCard className="!p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr><th className="p-3">নাম</th><th className="p-3">যোগাযোগ</th><th className="p-3">পদ</th><th className="p-3">অভিজ্ঞতা</th><th className="p-3">স্ট্যাটাস</th></tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {apps.map((a) => (
                      <tr key={a.id}>
                        <td className="p-3 font-medium">{a.applicant_name}</td>
                        <td className="p-3 text-xs text-muted-foreground">{a.email}<br />{a.phone}</td>
                        <td className="p-3 text-xs">{a.position || "—"}</td>
                        <td className="p-3 text-xs">{a.experience || "—"}</td>
                        <td className="p-3">
                          <select value={a.status} onChange={(e) => setAppStatus(a.id, e.target.value)} className="rounded-lg border border-border px-2 py-1 text-xs">
                            <option value="new">নতুন</option>
                            <option value="shortlisted">শর্টলিস্ট</option>
                            <option value="interview">ইন্টারভিউ</option>
                            <option value="hired">নিয়োগপ্রাপ্ত</option>
                            <option value="rejected">প্রত্যাখ্যাত</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AdminCard>
          )}
      </div>
    </AdminPage>
  );
}
