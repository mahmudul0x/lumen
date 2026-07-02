import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, Loader2, X } from "lucide-react";
import { bnDate } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/blog")({
  component: BlogAdmin,
});

type Post = { id: string; title: string; slug: string; excerpt: string | null; content: string | null; category: string | null; status: string; cover_image: string | null; created_at: string };

function BlogAdmin() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);

  const load = () => supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).then(({ data }) => { setItems((data ?? []) as Post[]); setLoading(false); });
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.slug) return;
    const payload: any = {
      title: editing.title, slug: editing.slug, excerpt: editing.excerpt || null,
      content: editing.content || null, category: editing.category || null,
      cover_image: editing.cover_image || null, status: editing.status || "draft",
    };
    if (editing.id) await supabase.from("blog_posts").update(payload).eq("id", editing.id);
    else await supabase.from("blog_posts").insert(payload);
    setEditing(null); load();
  };
  const remove = async (id: string) => { if (!confirm("মুছে ফেলবেন?")) return; await supabase.from("blog_posts").delete().eq("id", id); load(); };

  return (
    <AdminPage
      title="ব্লগ CMS"
      description={`মোট পোস্ট: ${items.length}`}
      actions={<Button onClick={() => setEditing({ status: "draft" })} variant="gold"><Plus className="mr-1.5 h-4 w-4" /> নতুন পোস্ট</Button>}
    >
      {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        : items.length === 0 ? <EmptyState title="কোনো পোস্ট নেই" hint="উপরে 'নতুন পোস্ট' ক্লিক করে শুরু করুন" />
        : (
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((p) => (
              <AdminCard key={p.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-lg px-2 py-0.5 text-[11px] ${p.status === "published" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{p.status}</span>
                      {p.category && <span className="text-xs text-muted-foreground">{p.category}</span>}
                    </div>
                    <h3 className="mt-1 font-display text-base font-bold text-primary">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">/{p.slug} • {bnDate(p.created_at)}</p>
                    {p.excerpt && <p className="mt-2 line-clamp-2 text-sm text-foreground/70">{p.excerpt}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="outline" onClick={() => setEditing(p)}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(p.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </AdminCard>
            ))}
          </div>
        )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setEditing(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-primary">{editing.id ? "পোস্ট এডিট" : "নতুন পোস্ট"}</h2>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 space-y-3">
              <input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="শিরোনাম" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
              <input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="স্লাগ (URL)" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
              <input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="ক্যাটেগরি" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
              <input value={editing.cover_image ?? ""} onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })} placeholder="কভার ইমেজ URL" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
              <textarea value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} placeholder="সংক্ষিপ্ত বিবরণ" rows={2} className="w-full rounded-xl border border-border p-3 text-sm" />
              <textarea value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} placeholder="সম্পূর্ণ কন্টেন্ট (মার্কডাউন)" rows={8} className="w-full rounded-xl border border-border p-3 text-sm" />
              <select value={editing.status ?? "draft"} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="h-10 w-full rounded-xl border border-border px-3 text-sm">
                <option value="draft">ড্রাফট</option>
                <option value="published">প্রকাশিত</option>
                <option value="archived">আর্কাইভ</option>
              </select>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditing(null)}>বাতিল</Button>
                <Button variant="gold" onClick={save}>সংরক্ষণ</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminPage>
  );
}
