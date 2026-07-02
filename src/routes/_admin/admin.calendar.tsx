import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard, EmptyState } from "@/components/admin/AdminPage";
import { Calendar, ClipboardList, PhoneCall, Loader2 } from "lucide-react";
import { bn, bnDate } from "@/lib/utils.bn";

export const Route = createFileRoute("/_admin/admin/calendar")({
  head: () => ({ meta: [{ title: "ক্যালেন্ডার — অ্যাডমিন" }] }),
  component: CalendarPage,
});

type Item = { id: string; date: string; title: string; type: "site-visit" | "apartment-booking" | "callback"; meta?: string };

function CalendarPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("leads")
        .select("id,created_at,customer_name,customer_phone,project_name,kind,preferred_date")
        .in("kind", ["site-visit", "apartment-booking", "callback"])
        .order("created_at", { ascending: false })
        .limit(300);
      const rows: Item[] = (data ?? []).map((l: any) => ({
        id: l.id,
        date: l.preferred_date || l.created_at,
        title:
          l.kind === "site-visit" ? `${l.customer_name} — সাইট ভিজিট` :
          l.kind === "apartment-booking" ? `${l.customer_name} — বুকিং` :
          `${l.customer_name} — কলব্যাক`,
        type: l.kind,
        meta: l.project_name || l.customer_phone,
      }));
      rows.sort((a, b) => (a.date < b.date ? 1 : -1));
      setItems(rows);
      setLoading(false);
    })();
  }, []);

  const grouped = useMemo(() => {
    const g: Record<string, Item[]> = {};
    items.forEach((i) => {
      const key = new Date(i.date).toISOString().slice(0, 10);
      (g[key] ||= []).push(i);
    });
    return Object.entries(g);
  }, [items]);

  const icon = (t: Item["type"]) =>
    t === "site-visit" ? <Calendar className="h-4 w-4 text-secondary" /> :
    t === "apartment-booking" ? <ClipboardList className="h-4 w-4 text-accent" /> :
    <PhoneCall className="h-4 w-4 text-primary" />;

  return (
    <AdminPage title="ক্যালেন্ডার" description="সাইট ভিজিট, বুকিং, কলব্যাক ও ইভেন্ট এক জায়গায়।">
      {loading ? (
        <div className="grid place-items-center py-24"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : grouped.length === 0 ? (
        <EmptyState title="কোনো ইভেন্ট নেই" hint="নতুন সাইট ভিজিট বা বুকিং যুক্ত হলে এখানে দেখা যাবে।" />
      ) : (
        <div className="space-y-4">
          {grouped.map(([day, list]) => (
            <AdminCard key={day}>
              <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
                <p className="font-display text-sm font-semibold text-primary">{bnDate(day)}</p>
                <span className="text-xs text-muted-foreground">{bn(list.length)} টি ইভেন্ট</span>
              </div>
              <ul className="divide-y divide-border">
                {list.map((i) => (
                  <li key={i.id} className="flex items-center gap-3 py-2.5 text-sm">
                    {icon(i.type)}
                    <span className="flex-1 truncate">{i.title}</span>
                    {i.meta && <span className="text-xs text-muted-foreground">{i.meta}</span>}
                  </li>
                ))}
              </ul>
            </AdminCard>
          ))}
        </div>
      )}
    </AdminPage>
  );
}
