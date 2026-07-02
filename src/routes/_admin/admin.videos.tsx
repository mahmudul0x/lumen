import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2, Play } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/videos")({
  component: VideosAdmin,
});

function VideosAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(""); const [yt, setYt] = useState(""); const [cat, setCat] = useState("project");

  const load = () => supabase.from("videos").select("*").order("created_at", { ascending: false }).then(({ data }) => { setItems(data ?? []); setLoading(false); });
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title || !yt) return;
    const id = yt.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1] ?? yt;
    await supabase.from("videos").insert({ title, youtube_id: id, category: cat });
    setTitle(""); setYt(""); load();
  };
  const remove = async (id: string) => { await supabase.from("videos").delete().eq("id", id); load(); };
  const feature = async (id: string, featured: boolean) => { await supabase.from("videos").update({ featured }).eq("id", id); load(); };

  return (
    <AdminPage title="ভিডিও CMS" description={`মোট ভিডিও: ${items.length}`}>
      <AdminCard>
        <h2 className="font-display text-lg font-bold text-primary">নতুন ভিডিও</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="শিরোনাম" className="h-10 rounded-xl border border-border px-3 text-sm" />
          <input value={yt} onChange={(e) => setYt(e.target.value)} placeholder="YouTube URL বা ID" className="h-10 rounded-xl border border-border px-3 text-sm" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-10 rounded-xl border border-border px-3 text-sm">
            <option value="project">Project</option>
            <option value="corporate">Corporate</option>
            <option value="featured">Featured</option>
          </select>
        </div>
        <Button onClick={add} variant="gold" className="mt-3"><Plus className="mr-1.5 h-4 w-4" /> যোগ করুন</Button>
      </AdminCard>

      {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        : items.length === 0 ? <EmptyState title="কোনো ভিডিও নেই" />
        : (
          <div className="grid gap-3 md:grid-cols-3">
            {items.map((v) => (
              <AdminCard key={v.id} className="!p-3">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                  <img src={`https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`} alt={v.title} className="h-full w-full object-cover" />
                  <a href={`https://youtube.com/watch?v=${v.youtube_id}`} target="_blank" rel="noreferrer" className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition hover:opacity-100">
                    <Play className="h-10 w-10 text-white" />
                  </a>
                </div>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.category} {v.featured && "• ⭐"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="outline" onClick={() => feature(v.id, !v.featured)}>{v.featured ? "আন-ফিচার" : "ফিচার"}</Button>
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(v.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </AdminCard>
            ))}
          </div>
        )}
    </AdminPage>
  );
}
