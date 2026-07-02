import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Check, Star, Trash2, Loader2, X } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/reviews")({
  component: ReviewsAdmin,
});

function ReviewsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { supabase.from("reviews").select("*").order("created_at", { ascending: false }).then(({ data }) => { setItems(data ?? []); setLoading(false); }); }, []);

  const toggle = async (id: string, field: "approved" | "featured", value: boolean) => {
    const patch = field === "approved" ? { approved: value } : { featured: value };
    await supabase.from("reviews").update(patch).eq("id", id);
    setItems((p) => p.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };
  const remove = async (id: string) => { await supabase.from("reviews").delete().eq("id", id); setItems((p) => p.filter((r) => r.id !== id)); };

  return (
    <AdminPage title="গ্রাহক রিভিউ" description={`মোট: ${items.length} • অনুমোদিত: ${items.filter(r => r.approved).length}`}>
      {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        : items.length === 0 ? <EmptyState title="কোনো রিভিউ নেই" />
        : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((r) => (
              <AdminCard key={r.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{r.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{r.project_name || "—"}</p>
                    <div className="mt-1 flex text-gold">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {r.approved ? <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-600">অনুমোদিত</span> : <span className="rounded-lg bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-600">অপেক্ষমাণ</span>}
                    {r.featured && <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-[11px] text-primary">ফিচারড</span>}
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80">{r.message}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => toggle(r.id, "approved", !r.approved)}>
                    {r.approved ? <><X className="mr-1 h-3.5 w-3.5" /> অননুমোদিত</> : <><Check className="mr-1 h-3.5 w-3.5" /> অনুমোদন</>}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toggle(r.id, "featured", !r.featured)}>
                    <Star className="mr-1 h-3.5 w-3.5" /> {r.featured ? "আন-ফিচার" : "ফিচার"}
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(r.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </AdminCard>
            ))}
          </div>
        )}
    </AdminPage>
  );
}
