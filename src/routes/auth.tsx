import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Mail, Lock, User as UserIcon, Phone, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "লগইন / নিবন্ধন — Lumen Builders" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : "/dashboard",
    mode: s.mode === "register" ? "register" : "login",
  }),
  component: AuthPage,
});

const loginSchema = z.object({
  email: z.string().email({ message: "সঠিক ইমেইল দিন" }),
  password: z.string().min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর" }),
});
const registerSchema = loginSchema.extend({
  full_name: z.string().trim().min(2, { message: "নাম দিন" }).max(80),
  phone: z.string().regex(/^01[3-9]\d{8}$/, { message: "সঠিক মোবাইল দিন" }),
  confirm: z.string(),
  accept: z.literal(true, { errorMap: () => ({ message: "শর্তাবলী মেনে নিন" }) }),
}).refine((d) => d.password === d.confirm, { message: "পাসওয়ার্ড মিলছে না", path: ["confirm"] });

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(search.mode);
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: search.redirect || "/dashboard" });
  }, [loading, user, navigate, search.redirect]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    setBusy(true);
    try {
      if (mode === "login") {
        const p = loginSchema.safeParse(raw);
        if (!p.success) { toast.error(p.error.issues[0]?.message ?? "ইনপুট ভুল"); return; }
        const { error } = await supabase.auth.signInWithPassword({ email: p.data.email, password: p.data.password });
        if (error) throw error;
        toast.success("সফলভাবে লগইন হয়েছে");
      } else {
        const p = registerSchema.safeParse({ ...raw, accept: fd.get("accept") === "on" });
        if (!p.success) { toast.error(p.error.issues[0]?.message ?? "ইনপুট ভুল"); return; }
        const { error } = await supabase.auth.signUp({
          email: p.data.email,
          password: p.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: p.data.full_name, phone: p.data.phone },
          },
        });
        if (error) throw error;
        toast.success("নিবন্ধন সফল — স্বাগতম!");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ত্রুটি হয়েছে");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary via-primary to-accent">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/50 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left panel */}
          <div className="hidden text-white lg:block">
            <Link to="/" className="inline-flex"><Logo variant="light" /></Link>
            <h1 className="mt-10 font-display text-5xl font-bold leading-tight">
              আপনার স্বপ্নের বাড়ির<br />ডিজিটাল ঠিকানা
            </h1>
            <p className="mt-5 max-w-md text-white/80">
              বুকিং ট্র্যাক করুন, পছন্দের প্রকল্প সংরক্ষণ করুন, ডকুমেন্ট ডাউনলোড করুন এবং EMI পরিকল্পনা করুন — সব এক জায়গায়।
            </p>
            <ul className="mt-8 space-y-3 text-white/85">
              {["রিয়েল-টাইম বুকিং স্ট্যাটাস", "পছন্দের প্রকল্প ও তুলনা", "সম্পূর্ণ ডকুমেন্ট সেন্টার", "নিরাপদ ও এনক্রিপ্টেড"].map((t) => (
                <li key={t} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-gold/25 text-gold">✓</span>{t}</li>
              ))}
            </ul>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[28px] border border-white/25 bg-white/10 p-6 shadow-float backdrop-blur-2xl md:p-10"
          >
            <div className="mb-6 flex justify-center lg:hidden"><Link to="/"><Logo variant="light" /></Link></div>

            <div className="mb-6 grid grid-cols-2 rounded-2xl bg-white/10 p-1">
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    mode === m ? "bg-gold text-primary shadow-gold" : "text-white/80 hover:text-white"
                  }`}
                >
                  {m === "login" ? "লগইন" : "নিবন্ধন"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <>
                  <IconField icon={UserIcon}><Input name="full_name" placeholder="পূর্ণ নাম" required className="border-white/20 bg-white/10 pl-11 text-white placeholder:text-white/60" /></IconField>
                  <IconField icon={Phone}><Input name="phone" placeholder="মোবাইল নম্বর (01XXXXXXXXX)" inputMode="numeric" required className="border-white/20 bg-white/10 pl-11 text-white placeholder:text-white/60" /></IconField>
                </>
              )}
              <IconField icon={Mail}><Input name="email" type="email" placeholder="ইমেইল" required className="border-white/20 bg-white/10 pl-11 text-white placeholder:text-white/60" /></IconField>
              <IconField icon={Lock}>
                <Input name="password" type={showPw ? "text" : "password"} placeholder="পাসওয়ার্ড" required minLength={6} className="border-white/20 bg-white/10 pl-11 pr-11 text-white placeholder:text-white/60" />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </IconField>
              {mode === "register" && (
                <>
                  <IconField icon={Lock}><Input name="confirm" type="password" placeholder="পাসওয়ার্ড নিশ্চিত করুন" required className="border-white/20 bg-white/10 pl-11 text-white placeholder:text-white/60" /></IconField>
                  <label className="flex items-start gap-2 text-xs text-white/80">
                    <input type="checkbox" name="accept" required className="mt-0.5 h-4 w-4 rounded" />
                    <span>আমি <Link to="/terms" className="underline">শর্তাবলী</Link> ও <Link to="/privacy" className="underline">গোপনীয়তা নীতি</Link> মেনে নিচ্ছি</span>
                  </label>
                </>
              )}
              {mode === "login" && (
                <div className="flex items-center justify-between text-xs text-white/80">
                  <label className="flex items-center gap-2"><input type="checkbox" name="remember" defaultChecked className="h-4 w-4 rounded" /> মনে রাখুন</label>
                  <button type="button" onClick={async () => {
                    const email = (document.querySelector('input[name="email"]') as HTMLInputElement)?.value;
                    if (!email) return toast.error("প্রথমে ইমেইল লিখুন");
                    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth?mode=login` });
                    if (error) toast.error(error.message); else toast.success("পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে");
                  }} className="underline hover:text-gold">পাসওয়ার্ড ভুলে গেছেন?</button>
                </div>
              )}
              <Button type="submit" variant="gold" size="lg" className="w-full" disabled={busy}>
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Building2 className="mr-2 h-4 w-4" />}
                {mode === "login" ? "লগইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-white/70">
                <Link to="/" className="underline hover:text-gold">হোম পেজে ফিরুন</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function IconField({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
      {children}
    </div>
  );
}
