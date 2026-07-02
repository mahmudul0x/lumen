import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/gallery")({
  component: GalleryAdmin,
});

const CATEGORIES = ["projects", "construction", "interior", "exterior", "office", "events", "handover"];

function GalleryAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(""); const [title, setTitle] = useState(""); const [cat, setCat] = useState(CATEGORIES[0]);

  const load = () => supabase.from("gallery_items").select("*").order("sort_order", { ascending: true }).then(({ data }) => { setItems(data ?? []); setLoading(false); });
  useEffect(() => { load(); }, []);

  const add = async () => { if (!url) return; await supabase.from("gallery_items").insert({ image_url: url, title, category: cat }); setUrl(""); setTitle(""); load(); };
  const remove = async (id: string) => { await supabase.from("gallery_items").delete().eq("id", id); load(); };

  return (
    <AdminPage title="গ্যালারি CMS" description={`মোট ছবি: ${items.length}`}>
      <AdminCard>
        <h2 className="font-display text-lg font-bold text-primary">নতুন ছবি যোগ করুন</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="ইমেজ URL" className="h-10 rounded-xl border border-border px-3 text-sm md:col-span-2" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="শিরোনাম" className="h-10 rounded-xl border border-border px-3 text-sm" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-10 rounded-xl border border-border px-3 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Button onClick={add} variant="gold" className="mt-3"><Plus className="mr-1.5 h-4 w-4" /> যোগ করুন</Button>
      </AdminCard>

      {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        : items.length === 0 ? <EmptyState title="কোনো ছবি নেই" />
        : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((i) => (
              <div key={i.id} className="group relative overflow-hidden rounded-2xl border border-border">
                <img src={i.image_url} alt={i.title || ""} className="aspect-square w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
                  <p className="truncate text-xs font-medium">{i.title || "—"}</p>
                  <p className="text-[10px] opacity-80">{i.category}</p>
                </div>
                <button onClick={() => remove(i.id)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-destructive text-white opacity-0 transition group-hover:opacity-100">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
    </AdminPage>
  );
}
