import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, X } from "lucide-react";
import { bn, bnDate } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/payments")({
  component: PaymentsAdmin,
});

type Payment = {
  id: string; invoice_no: string; customer_name: string; customer_phone: string | null;
  project_slug: string | null; apartment: string | null; kind: string;
  amount: number; paid: number; status: string; due_date: string | null; created_at: string;
};

function PaymentsAdmin() {
  const [items, setItems] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("all");
  const [editing, setEditing] = useState<Partial<Payment> | null>(null);

  const load = () => supabase.from("payments").select("*").order("created_at", { ascending: false })
    .then(({ data }) => { setItems((data ?? []) as Payment[]); setLoading(false); });
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => status === "all" ? items : items.filter((i) => i.status === status), [items, status]);

  const stats = useMemo(() => ({
    total: items.reduce((s, i) => s + Number(i.amount), 0),
    paid: items.reduce((s, i) => s + Number(i.paid), 0),
    due: items.reduce((s, i) => s + Math.max(0, Number(i.amount) - Number(i.paid)), 0),
    overdue: items.filter((i) => i.status === "overdue").length,
  }), [items]);

  const save = async () => {
    if (!editing?.customer_name || !editing?.amount) return;
    const invoice = editing.invoice_no || `INV-${Date.now().toString().slice(-8)}`;
    const paid = Number(editing.paid || 0);
    const amount = Number(editing.amount || 0);
    const status = paid >= amount ? "paid" : paid > 0 ? "partial" : (editing.status || "pending");
    const payload: any = {
      invoice_no: invoice, customer_name: editing.customer_name, customer_phone: editing.customer_phone || null,
      project_slug: editing.project_slug || null, apartment: editing.apartment || null,
      kind: editing.kind || "installment", amount, paid, status, due_date: editing.due_date || null,
    };
    if (editing.id) await supabase.from("payments").update(payload).eq("id", editing.id);
    else await supabase.from("payments").insert(payload);
    setEditing(null); load();
  };

  const money = (n: number) => "৳ " + bn(Math.round(n).toLocaleString("en-IN"));

  return (
    <AdminPage
      title="পেমেন্ট"
      description={`মোট: ${money(stats.total)} • পরিশোধিত: ${money(stats.paid)} • বকেয়া: ${money(stats.due)}`}
      actions={<Button onClick={() => setEditing({ kind: "installment", status: "pending" })} variant="gold"><Plus className="mr-1.5 h-4 w-4" /> নতুন ইনভয়েস</Button>}
    >
      <div className="grid gap-3 md:grid-cols-4">
        {[
          { label: "মোট বিল", v: money(stats.total) },
          { label: "পরিশোধিত", v: money(stats.paid), c: "text-emerald-600" },
          { label: "বকেয়া", v: money(stats.due), c: "text-amber-600" },
          { label: "ওভারডিউ", v: bn(stats.overdue), c: "text-destructive" },
        ].map((s) => (
          <AdminCard key={s.label}>
            <p className="text-xs uppercase text-muted-foreground">{s.label}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${s.c ?? "text-primary"}`}>{s.v}</p>
          </AdminCard>
        ))}
      </div>

      <AdminCard>
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "partial", "paid", "overdue"].map((s) => (
            <button key={s} onClick={() => setStatus(s)} className={`rounded-full px-3 py-1.5 text-xs ${status === s ? "bg-primary text-white" : "bg-slate-100 text-slate-700"}`}>{s}</button>
          ))}
        </div>
      </AdminCard>

      {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        : filtered.length === 0 ? <EmptyState title="কোনো পেমেন্ট নেই" />
        : (
          <AdminCard className="!p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr><th className="p-3">ইনভয়েস</th><th className="p-3">গ্রাহক</th><th className="p-3">প্রকল্প</th><th className="p-3">বিল</th><th className="p-3">পরিশোধিত</th><th className="p-3">বকেয়া</th><th className="p-3">স্ট্যাটাস</th><th className="p-3"></th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((p) => (
                    <tr key={p.id}>
                      <td className="p-3 font-mono text-xs">{p.invoice_no}</td>
                      <td className="p-3">
                        <p className="font-medium">{p.customer_name}</p>
                        <p className="text-xs text-muted-foreground">{p.customer_phone || "—"}</p>
                      </td>
                      <td className="p-3 text-xs">{p.project_slug || "—"} {p.apartment && `• ${p.apartment}`}</td>
                      <td className="p-3">{money(Number(p.amount))}</td>
                      <td className="p-3 text-emerald-600">{money(Number(p.paid))}</td>
                      <td className="p-3 text-amber-600">{money(Math.max(0, Number(p.amount) - Number(p.paid)))}</td>
                      <td className="p-3"><span className={`rounded-lg px-2 py-0.5 text-[11px] ${p.status === "paid" ? "bg-emerald-500/10 text-emerald-600" : p.status === "overdue" ? "bg-red-500/10 text-red-600" : "bg-amber-500/10 text-amber-600"}`}>{p.status}</span></td>
                      <td className="p-3"><Button size="sm" variant="outline" onClick={() => setEditing(p)}>এডিট</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>
        )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-primary">{editing.id ? "পেমেন্ট এডিট" : "নতুন ইনভয়েস"}</h2>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input value={editing.customer_name ?? ""} onChange={(e) => setEditing({ ...editing, customer_name: e.target.value })} placeholder="গ্রাহকের নাম" className="h-10 rounded-xl border border-border px-3 text-sm" />
              <input value={editing.customer_phone ?? ""} onChange={(e) => setEditing({ ...editing, customer_phone: e.target.value })} placeholder="ফোন" className="h-10 rounded-xl border border-border px-3 text-sm" />
              <input value={editing.project_slug ?? ""} onChange={(e) => setEditing({ ...editing, project_slug: e.target.value })} placeholder="প্রকল্প স্লাগ" className="h-10 rounded-xl border border-border px-3 text-sm" />
              <input value={editing.apartment ?? ""} onChange={(e) => setEditing({ ...editing, apartment: e.target.value })} placeholder="ইউনিট" className="h-10 rounded-xl border border-border px-3 text-sm" />
              <select value={editing.kind ?? "installment"} onChange={(e) => setEditing({ ...editing, kind: e.target.value })} className="h-10 rounded-xl border border-border px-3 text-sm">
                <option value="booking">বুকিং মানি</option>
                <option value="installment">কিস্তি</option>
                <option value="due">বকেয়া</option>
              </select>
              <input type="date" value={editing.due_date ?? ""} onChange={(e) => setEditing({ ...editing, due_date: e.target.value })} className="h-10 rounded-xl border border-border px-3 text-sm" />
              <input type="number" value={editing.amount ?? ""} onChange={(e) => setEditing({ ...editing, amount: Number(e.target.value) })} placeholder="বিল (৳)" className="h-10 rounded-xl border border-border px-3 text-sm" />
              <input type="number" value={editing.paid ?? ""} onChange={(e) => setEditing({ ...editing, paid: Number(e.target.value) })} placeholder="পরিশোধিত (৳)" className="h-10 rounded-xl border border-border px-3 text-sm" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(null)}>বাতিল</Button>
              <Button variant="gold" onClick={save}>সংরক্ষণ</Button>
            </div>
            {editing.created_at && <p className="mt-3 text-xs text-muted-foreground">তৈরি: {bnDate(editing.created_at)}</p>}
          </div>
        </div>
      )}
    </AdminPage>
  );
}
