import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/announcements")({
  component: AnnouncementsAdmin,
});

function AnnouncementsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(""); const [link, setLink] = useState("");

  const load = () => supabase.from("announcements").select("*").order("created_at", { ascending: false }).then(({ data }) => { setItems(data ?? []); setLoading(false); });
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!msg.trim()) return;
    await supabase.from("announcements").insert({ message: msg, link: link || null, active: true });
    setMsg(""); setLink(""); load();
  };
  const toggle = async (id: string, active: boolean) => { await supabase.from("announcements").update({ active }).eq("id", id); setItems((p) => p.map((a) => a.id === id ? { ...a, active } : a)); };
  const remove = async (id: string) => { await supabase.from("announcements").delete().eq("id", id); setItems((p) => p.filter((a) => a.id !== id)); };

  return (
    <AdminPage title="ঘোষণা" description="সাইটের উপরে স্ক্রোলিং ঘোষণা পরিচালনা করুন">
      <AdminCard>
        <h2 className="font-display text-lg font-bold text-primary">নতুন ঘোষণা</h2>
        <div className="mt-3 space-y-2">
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="ঘোষণা মেসেজ" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
          <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="লিংক (ঐচ্ছিক)" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
          <Button onClick={create} variant="gold"><Plus className="mr-1.5 h-4 w-4" /> যোগ করুন</Button>
        </div>
      </AdminCard>

      {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        : items.length === 0 ? <EmptyState title="কোনো ঘোষণা নেই" />
        : (
          <div className="space-y-2">
            {items.map((a) => (
              <AdminCard key={a.id} className="!p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-medium">{a.message}</p>
                    {a.link && <a href={a.link} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">{a.link}</a>}
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={a.active} onChange={(e) => toggle(a.id, e.target.checked)} />
                    সক্রিয়
                  </label>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(a.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </AdminCard>
            ))}
          </div>
        )}
    </AdminPage>
  );
}
