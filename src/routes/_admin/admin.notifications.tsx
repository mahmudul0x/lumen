import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Users } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/notifications")({
  component: NotifAdmin,
});

function NotifAdmin() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [kind, setKind] = useState("info");
  const [link, setLink] = useState("");
  const [audience, setAudience] = useState<"all" | "single">("all");
  const [targetEmail, setTargetEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const send = async () => {
    setSending(true); setMsg(null);
    let userIds: string[] = [];
    if (audience === "single") {
      const { data } = await supabase.from("profiles").select("id").eq("email", targetEmail.trim().toLowerCase()).maybeSingle();
      if (!data) { setMsg("ব্যবহারকারী পাওয়া যায়নি"); setSending(false); return; }
      userIds = [data.id];
    } else {
      const { data } = await supabase.from("profiles").select("id");
      userIds = (data ?? []).map((r) => r.id);
    }
    if (userIds.length === 0) { setMsg("কোনো প্রাপক নেই"); setSending(false); return; }
    const rows = userIds.map((uid) => ({ user_id: uid, title, body: body || null, kind, link: link || null }));
    const { error } = await supabase.from("notifications").insert(rows);
    setSending(false);
    if (error) setMsg("ত্রুটি: " + error.message);
    else { setMsg(`✓ ${userIds.length} জন প্রাপকের কাছে পাঠানো হয়েছে`); setTitle(""); setBody(""); setLink(""); }
  };

  const templates = [
    { k: "project", label: "প্রকল্প আপডেট", t: "নতুন প্রকল্প উদ্বোধন", b: "আমাদের নতুন প্রকল্প এখন লঞ্চ হয়েছে।" },
    { k: "payment", label: "পেমেন্ট রিমাইন্ডার", t: "কিস্তি পরিশোধের সময়", b: "অনুগ্রহ করে নির্ধারিত তারিখের মধ্যে কিস্তি পরিশোধ করুন।" },
    { k: "progress", label: "নির্মাণ অগ্রগতি", t: "নির্মাণকাজের অগ্রগতি", b: "আপনার প্রকল্পের নতুন অগ্রগতি প্রতিবেদন প্রকাশিত হয়েছে।" },
    { k: "offer", label: "বিশেষ অফার", t: "সীমিত সময়ের অফার", b: "এই মাসে বুকিংয়ে বিশেষ ছাড়।" },
  ];

  return (
    <AdminPage title="নোটিফিকেশন সেন্টার" description="সব গ্রাহক বা নির্দিষ্ট ব্যবহারকারীর কাছে নোটিফিকেশন পাঠান">
      <div className="grid gap-4 lg:grid-cols-3">
        <AdminCard className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-primary">নতুন নোটিফিকেশন</h2>
          <div className="mt-4 space-y-3">
            <div className="flex gap-2">
              <label className="flex flex-1 items-center gap-2 rounded-xl border border-border p-2 text-sm">
                <input type="radio" checked={audience === "all"} onChange={() => setAudience("all")} />
                <Users className="h-4 w-4" /> সব ব্যবহারকারী
              </label>
              <label className="flex flex-1 items-center gap-2 rounded-xl border border-border p-2 text-sm">
                <input type="radio" checked={audience === "single"} onChange={() => setAudience("single")} />
                নির্দিষ্ট ইমেইল
              </label>
            </div>
            {audience === "single" && (
              <input value={targetEmail} onChange={(e) => setTargetEmail(e.target.value)} placeholder="ইমেইল" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
            )}
            <select value={kind} onChange={(e) => setKind(e.target.value)} className="h-10 w-full rounded-xl border border-border px-3 text-sm">
              <option value="info">সাধারণ তথ্য</option>
              <option value="project">প্রকল্প</option>
              <option value="payment">পেমেন্ট</option>
              <option value="progress">অগ্রগতি</option>
              <option value="offer">অফার</option>
            </select>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="শিরোনাম" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="বার্তা" rows={4} className="w-full rounded-xl border border-border p-3 text-sm" />
            <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="লিঙ্ক (ঐচ্ছিক)" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
            <Button onClick={send} disabled={sending || !title} variant="gold" className="w-full">
              {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />} পাঠান
            </Button>
            {msg && <p className="text-sm text-primary">{msg}</p>}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-display text-lg font-bold text-primary">টেমপ্লেট</h2>
          <div className="mt-3 space-y-2">
            {templates.map((t) => (
              <button key={t.label} onClick={() => { setKind(t.k); setTitle(t.t); setBody(t.b); }} className="w-full rounded-xl border border-border p-3 text-left text-sm hover:border-primary hover:bg-primary/5">
                <p className="font-medium">{t.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.b}</p>
              </button>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
