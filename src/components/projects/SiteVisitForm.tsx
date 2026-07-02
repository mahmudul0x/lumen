import { useState } from "react";
import { z } from "zod";
import { CalendarCheck, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "নাম কমপক্ষে ২ অক্ষর").max(80),
  phone: z.string().trim().regex(/^01[3-9]\d{8}$/, "সঠিক মোবাইল নম্বর দিন"),
  email: z.string().trim().email("সঠিক ইমেইল দিন").max(120).optional().or(z.literal("")),
  date: z.string().min(1, "তারিখ নির্বাচন করুন"),
  note: z.string().max(400).optional(),
});

export function SiteVisitForm({ projectName }: { projectName: string }) {
  const [values, setValues] = useState({ name: "", phone: "", email: "", date: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const map: Record<string, string> = {};
      r.error.issues.forEach((i) => { map[i.path[0] as string] = i.message; });
      setErrors(map);
      return;
    }
    setErrors({});
    setDone(true);
  }

  const waMsg = encodeURIComponent(`আসসালামু আলাইকুম, আমি ${projectName} প্রকল্পের জন্য সাইট ভিজিট বুক করতে চাই।`);
  const waUrl = `https://wa.me/${site.contact.phone.replace(/\D/g, "")}?text=${waMsg}`;

  if (done) {
    return (
      <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h3 className="mt-4 text-xl font-bold text-emerald-900">অনুরোধ গৃহীত হয়েছে</h3>
        <p className="mt-2 text-sm text-emerald-800">আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[22px] border border-border bg-surface p-6 shadow-soft md:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">সাইট ভিজিট</p>
      <h3 className="mt-2 text-2xl font-bold text-primary">{projectName} বুক করুন</h3>
      <p className="mt-2 text-sm text-muted-foreground">আপনার পছন্দমত তারিখে আমাদের এক্সিকিউটিভ আপনাকে সম্পূর্ণ প্রকল্প ঘুরিয়ে দেখাবেন।</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="নাম" error={errors.name}>
          <Input value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} maxLength={80} placeholder="আপনার পুরো নাম" />
        </Field>
        <Field label="মোবাইল" error={errors.phone}>
          <Input value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} maxLength={14} placeholder="01XXXXXXXXX" />
        </Field>
        <Field label="ইমেইল (ঐচ্ছিক)" error={errors.email}>
          <Input type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} maxLength={120} placeholder="you@example.com" />
        </Field>
        <Field label="পছন্দের তারিখ" error={errors.date}>
          <Input type="date" value={values.date} onChange={(e) => setValues({ ...values, date: e.target.value })} />
        </Field>
        <div className="md:col-span-2">
          <Field label="মন্তব্য (ঐচ্ছিক)" error={errors.note}>
            <Textarea rows={3} value={values.note} onChange={(e) => setValues({ ...values, note: e.target.value })} maxLength={400} placeholder="বিশেষ কোনো অনুরোধ থাকলে জানান" />
          </Field>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="gold" size="lg" className="flex-1">
          <CalendarCheck className="h-4 w-4" /> সাইট ভিজিট বুক করুন
        </Button>
        <Button asChild type="button" variant="outline" size="lg" className="flex-1 border-emerald-500 text-emerald-700 hover:bg-emerald-50">
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </Button>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
