import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/settings")({
  component: SettingsAdmin,
});

type Group = { key: string; label: string; fields: { key: string; label: string; placeholder?: string; textarea?: boolean }[] };

const GROUPS: Group[] = [
  { key: "company", label: "কোম্পানি তথ্য", fields: [
    { key: "name", label: "কোম্পানির নাম" },
    { key: "tagline", label: "ট্যাগলাইন" },
    { key: "description", label: "সংক্ষিপ্ত পরিচিতি", textarea: true },
  ]},
  { key: "contact", label: "যোগাযোগ", fields: [
    { key: "phone", label: "প্রধান ফোন" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "email", label: "ইমেইল" },
    { key: "address", label: "অফিস ঠিকানা", textarea: true },
    { key: "hours", label: "ব্যবসায়িক সময়" },
  ]},
  { key: "social", label: "সোশ্যাল মিডিয়া", fields: [
    { key: "facebook", label: "Facebook URL" },
    { key: "youtube", label: "YouTube URL" },
    { key: "linkedin", label: "LinkedIn URL" },
    { key: "instagram", label: "Instagram URL" },
    { key: "messenger", label: "Messenger URL" },
  ]},
  { key: "brand", label: "ব্র্যান্ড", fields: [
    { key: "logo_url", label: "লোগো URL" },
    { key: "favicon_url", label: "ফেভিকন URL" },
  ]},
  { key: "map", label: "গুগল ম্যাপ", fields: [
    { key: "embed_url", label: "Map Embed URL" },
    { key: "lat", label: "Latitude" },
    { key: "lng", label: "Longitude" },
  ]},
  { key: "seo", label: "SEO ডিফল্ট", fields: [
    { key: "title", label: "ডিফল্ট মেটা টাইটেল" },
    { key: "description", label: "ডিফল্ট মেটা ডিসক্রিপশন", textarea: true },
    { key: "og_image", label: "Open Graph ইমেজ URL" },
  ]},
];

function SettingsAdmin() {
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      const map: Record<string, any> = {};
      (data ?? []).forEach((r) => { map[r.key] = r.value; });
      setValues(map); setLoading(false);
    });
  }, []);

  const saveGroup = async (groupKey: string) => {
    setSaving(groupKey);
    const value = values[groupKey] || {};
    await supabase.from("site_settings").upsert({ key: groupKey, value });
    setSaving(null); setSavedKey(groupKey);
    setTimeout(() => setSavedKey(null), 2000);
  };

  const setField = (group: string, field: string, val: string) => {
    setValues((v) => ({ ...v, [group]: { ...(v[group] || {}), [field]: val } }));
  };

  if (loading) return <div className="grid h-60 place-items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <AdminPage title="ওয়েবসাইট সেটিংস" description="কোম্পানি তথ্য, ব্র্যান্ডিং, যোগাযোগ ও SEO ডিফল্ট পরিচালনা করুন">
      <div className="grid gap-6 lg:grid-cols-2">
        {GROUPS.map((g) => {
          const v = values[g.key] || {};
          return (
            <AdminCard key={g.key}>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-primary">{g.label}</h2>
                {savedKey === g.key && <span className="text-xs text-emerald-600">সংরক্ষিত ✓</span>}
              </div>
              <div className="mt-4 space-y-3">
                {g.fields.map((f) => (
                  <div key={f.key}>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">{f.label}</label>
                    {f.textarea ? (
                      <textarea value={v[f.key] ?? ""} onChange={(e) => setField(g.key, f.key, e.target.value)} rows={3} className="w-full rounded-xl border border-border p-3 text-sm" />
                    ) : (
                      <input value={v[f.key] ?? ""} onChange={(e) => setField(g.key, f.key, e.target.value)} placeholder={f.placeholder} className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
                    )}
                  </div>
                ))}
              </div>
              <Button onClick={() => saveGroup(g.key)} disabled={saving === g.key} variant="gold" className="mt-4">
                {saving === g.key ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Save className="mr-1.5 h-4 w-4" />} সংরক্ষণ
              </Button>
            </AdminCard>
          );
        })}
      </div>
    </AdminPage>
  );
}
