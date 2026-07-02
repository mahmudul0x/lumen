import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { User as UserIcon, Save, Loader2, Bell, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  head: () => ({ meta: [{ title: "আমার প্রোফাইল — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [pw, setPw] = useState("");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  const saveMut = useMutation({
    mutationFn: async (form: FormData) => {
      const payload = {
        full_name: String(form.get("full_name") || ""),
        phone: String(form.get("phone") || ""),
        email: String(form.get("email") || ""),
        address: String(form.get("address") || ""),
        avatar_url: String(form.get("avatar_url") || ""),
        notification_email: form.get("notification_email") === "on",
        notification_sms: form.get("notification_sms") === "on",
        notification_promo: form.get("notification_promo") === "on",
      };
      const { error } = await supabase.from("profiles").update(payload).eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["profile"] }); toast.success("প্রোফাইল আপডেট হয়েছে"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "ত্রুটি"),
  });

  const changePassword = async () => {
    if (pw.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর");
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return toast.error(error.message);
    toast.success("পাসওয়ার্ড পরিবর্তিত হয়েছে");
    setPw("");
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">আমার প্রোফাইল</h1>
        <p className="mt-2 text-muted-foreground">আপনার তথ্য ও পছন্দ ব্যবস্থাপনা করুন।</p>
      </header>

      <motion.form
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        onSubmit={(e) => { e.preventDefault(); saveMut.mutate(new FormData(e.currentTarget)); }}
        className="rounded-[26px] border border-border/60 bg-card p-6 shadow-soft md:p-8"
      >
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-card">
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="" className="h-full w-full rounded-full object-cover" /> : <UserIcon className="h-8 w-8" />}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-xl font-bold text-primary">{profile?.full_name || "নাম দিন"}</p>
            <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="পূর্ণ নাম *"><Input name="full_name" defaultValue={profile?.full_name ?? ""} required /></Field>
          <Field label="মোবাইল নম্বর *"><Input name="phone" defaultValue={profile?.phone ?? ""} required pattern="^01[3-9]\d{8}$" /></Field>
          <Field label="ইমেইল"><Input name="email" type="email" defaultValue={profile?.email ?? user?.email ?? ""} /></Field>
          <Field label="প্রোফাইল ছবি URL"><Input name="avatar_url" defaultValue={profile?.avatar_url ?? ""} placeholder="https://..." /></Field>
          <div className="md:col-span-2">
            <Field label="ঠিকানা"><textarea name="address" defaultValue={profile?.address ?? ""} rows={3} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" /></Field>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-primary"><Bell className="h-4 w-4 text-gold" /> নোটিফিকেশন পছন্দ</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <Toggle name="notification_email" label="ইমেইল" defaultChecked={profile?.notification_email ?? true} />
            <Toggle name="notification_sms" label="SMS" defaultChecked={profile?.notification_sms ?? true} />
            <Toggle name="notification_promo" label="প্রমোশনাল অফার" defaultChecked={profile?.notification_promo ?? true} />
          </div>
        </div>

        <Button type="submit" variant="gold" size="lg" className="mt-6 w-full md:w-auto" disabled={saveMut.isPending}>
          {saveMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          পরিবর্তন সংরক্ষণ করুন
        </Button>
      </motion.form>

      {/* Password change */}
      <div className="rounded-[26px] border border-border/60 bg-card p-6 shadow-soft md:p-8">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold text-primary"><Lock className="h-4 w-4 text-gold" /> পাসওয়ার্ড পরিবর্তন</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <Input type="password" placeholder="নতুন পাসওয়ার্ড (৬+ অক্ষর)" value={pw} onChange={(e) => setPw(e.target.value)} />
          <Button onClick={changePassword} variant="outline">পরিবর্তন করুন</Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-2"><span className="text-sm font-semibold text-foreground">{label}</span>{children}</label>;
}

function Toggle({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border/60 bg-muted/20 px-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-5 w-9 shrink-0 appearance-none rounded-full bg-muted transition-colors checked:bg-gold" />
    </label>
  );
}
