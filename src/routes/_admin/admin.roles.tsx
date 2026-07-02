import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Shield, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/roles")({
  component: RolesAdmin,
});

const ROLES = [
  { value: "super_admin", label: "সুপার অ্যাডমিন", desc: "সব অনুমতি" },
  { value: "admin", label: "অ্যাডমিন", desc: "সব সাধারণ ম্যানেজমেন্ট" },
  { value: "sales_manager", label: "সেলস ম্যানেজার", desc: "লিড ও বুকিং তদারকি" },
  { value: "sales", label: "সেলস এক্সিকিউটিভ", desc: "লিড পরিচালনা" },
  { value: "content_manager", label: "কন্টেন্ট ম্যানেজার", desc: "ব্লগ, গ্যালারি, ভিডিও" },
  { value: "support", label: "কাস্টমার সাপোর্ট", desc: "গ্রাহক বার্তা" },
];

function RolesAdmin() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(""); const [role, setRole] = useState("admin");
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data: roles } = await supabase.from("user_roles").select("id,user_id,role,created_at");
    const ids = Array.from(new Set((roles ?? []).map((r) => r.user_id)));
    const { data: profs } = ids.length ? await supabase.from("profiles").select("id,full_name,email,phone").in("id", ids) : { data: [] as any[] };
    const map = new Map((profs ?? []).map((p) => [p.id, p]));
    setRows((roles ?? []).map((r) => ({ ...r, profile: map.get(r.user_id) })));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const grant = async () => {
    setMsg(null);
    const { data: profile } = await supabase.from("profiles").select("id").eq("email", email.trim().toLowerCase()).maybeSingle();
    if (!profile) { setMsg("এই ইমেইলে কোনো রেজিস্টার্ড ব্যবহারকারী পাওয়া যায়নি। প্রথমে ব্যবহারকারীকে /auth থেকে সাইনআপ করতে বলুন।"); return; }
    const { error } = await supabase.from("user_roles").insert({ user_id: profile.id, role: role as any });
    if (error) { setMsg("ত্রুটি: " + error.message); return; }
    setEmail(""); setMsg("রোল যোগ করা হয়েছে ✓"); load();
  };
  const revoke = async (id: string) => { await supabase.from("user_roles").delete().eq("id", id); load(); };

  return (
    <AdminPage title="রোল ও পারমিশন" description="স্টাফ সদস্যদের অ্যাডমিন অ্যাক্সেস পরিচালনা করুন">
      <div className="grid gap-4 lg:grid-cols-3">
        <AdminCard className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-primary">নতুন রোল যোগ করুন</h2>
          <p className="mt-1 text-xs text-muted-foreground">ব্যবহারকারীকে প্রথমে ইমেইল দিয়ে <a href="/auth" className="text-primary underline">/auth</a>-এ সাইনআপ করতে হবে।</p>
          <div className="mt-4 grid gap-2 md:grid-cols-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ইমেইল ঠিকানা" className="h-10 rounded-xl border border-border px-3 text-sm md:col-span-2" />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="h-10 rounded-xl border border-border px-3 text-sm">
              {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <Button onClick={grant} variant="gold" className="mt-3"><Plus className="mr-1.5 h-4 w-4" /> রোল দিন</Button>
          {msg && <p className="mt-3 text-sm text-primary">{msg}</p>}
        </AdminCard>
        <AdminCard>
          <h2 className="font-display text-lg font-bold text-primary">রোল বিবরণ</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {ROLES.map((r) => (
              <li key={r.value}><span className="font-medium">{r.label}</span> — <span className="text-muted-foreground">{r.desc}</span></li>
            ))}
          </ul>
        </AdminCard>
      </div>

      <AdminCard className="!p-0 overflow-hidden">
        <div className="border-b border-border p-4">
          <h2 className="font-display text-lg font-bold text-primary">বর্তমান স্টাফ</h2>
        </div>
        {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          : rows.length === 0 ? <EmptyState title="কোনো রোল অ্যাসাইনড নেই" />
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr><th className="p-3">ব্যবহারকারী</th><th className="p-3">ইমেইল</th><th className="p-3">রোল</th><th className="p-3"></th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td className="p-3 font-medium">{r.profile?.full_name || "—"}</td>
                      <td className="p-3 text-muted-foreground">{r.profile?.email || r.user_id}</td>
                      <td className="p-3"><span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-0.5 text-[11px] text-primary"><Shield className="h-3 w-3" /> {r.role}</span></td>
                      <td className="p-3"><Button size="sm" variant="outline" className="text-destructive" onClick={() => revoke(r.id)}><Trash2 className="h-3.5 w-3.5" /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </AdminCard>
    </AdminPage>
  );
}
