import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { leadership } from "@/lib/corporate-data";
import { Linkedin } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/team")({
  component: TeamAdmin,
});

function TeamAdmin() {
  return (
    <AdminPage title="টিম" description="লিডারশিপ ও ম্যানেজমেন্ট টিমের ওভারভিউ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leadership.map((m) => (
          <AdminCard key={m.name} className="!p-0 overflow-hidden">
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
              {m.image && <img src={m.image} alt={m.name} className="h-full w-full object-cover" />}
            </div>
            <div className="p-5">
              <p className="font-display text-lg font-bold text-primary">{m.name}</p>
              <p className="text-sm text-secondary">{m.position}</p>
              {m.bio && <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">{m.bio}</p>}
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs">
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </a>
              )}
            </div>
          </AdminCard>
        ))}
      </div>
      <AdminCard>
        <p className="text-sm text-muted-foreground">
          <strong className="text-primary">নোট:</strong> টিম ডেটা <code>src/lib/corporate-data.ts</code>-এ সংরক্ষিত। CRUD ইন্টারফেস যোগ করতে <code>team_members</code> টেবিলের প্রয়োজন হবে।
        </p>
      </AdminCard>
    </AdminPage>
  );
}
