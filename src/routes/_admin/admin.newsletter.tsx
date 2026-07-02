import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Loader2 } from "lucide-react";
import { bnDate } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/newsletter")({
  component: NewsletterAdmin,
});

function NewsletterAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).then(({ data }) => { setItems(data ?? []); setLoading(false); }); }, []);

  const remove = async (id: string) => { await supabase.from("newsletter_subscribers").delete().eq("id", id); setItems((p) => p.filter((x) => x.id !== id)); };
  const exportCsv = () => {
    const rows = [["email", "name", "source", "created_at"], ...items.map((i) => [i.email, i.name ?? "", i.source ?? "", i.created_at])];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "newsletter-subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminPage
      title="নিউজলেটার সাবস্ক্রাইবার"
      description={`মোট সাবস্ক্রাইবার: ${items.length}`}
      actions={<Button onClick={exportCsv} variant="outline" size="sm" disabled={!items.length}><Download className="mr-1.5 h-4 w-4" /> CSV এক্সপোর্ট</Button>}
    >
      <AdminCard className="!p-0 overflow-hidden">
        {loading ? <div className="grid h-40 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          : items.length === 0 ? <EmptyState title="কোনো সাবস্ক্রাইবার নেই" />
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr><th className="p-3">ইমেইল</th><th className="p-3">নাম</th><th className="p-3">উৎস</th><th className="p-3">তারিখ</th><th className="p-3"></th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="p-3 font-medium">{s.email}</td>
                      <td className="p-3 text-muted-foreground">{s.name || "—"}</td>
                      <td className="p-3 text-xs text-muted-foreground">{s.source || "website"}</td>
                      <td className="p-3 text-xs text-muted-foreground">{bnDate(s.created_at)}</td>
                      <td className="p-3">
                        <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(s.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
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
