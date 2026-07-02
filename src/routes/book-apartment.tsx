import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LeadHero } from "@/components/leads/LeadHero";
import { FieldRow } from "@/components/leads/FieldRow";
import { SuccessCard } from "@/components/leads/SuccessCard";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { bookingSchema, submitLead, type BookingInput } from "@/lib/leads";
import { budgetRanges, projectCatalog } from "@/lib/projects-data";
import apartmentBg from "@/assets/project-galaxy.jpg";

export const Route = createFileRoute("/book-apartment")({
  head: () => ({
    meta: [
      { title: "ফ্ল্যাট বুকিং — Lumen Builders Ltd." },
      { name: "description", content: "আপনার পছন্দের ফ্ল্যাট বুক করুন Lumen Builders-এর সাথে সহজ কিস্তিতে।" },
      { property: "og:title", content: "ফ্ল্যাট বুকিং — Lumen Builders" },
      { property: "og:url", content: "/book-apartment" },
    ],
    links: [{ rel: "canonical", href: "/book-apartment" }],
  }),
  component: BookApartmentPage,
});

function BookApartmentPage() {
  const navigate = useNavigate();
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { paymentMethod: "emi" },
  });

  const selectedProject = watch("project");
  const sizeOptions =
    projectCatalog.find((p) => p.name === selectedProject)?.sizes ??
    ["১২০০ sq ft", "১৫০০ sq ft", "১৮০০ sq ft", "২১০০ sq ft"];

  const onSubmit = async (values: BookingInput) => {
    setSubmitError(null);
    try {
      const lead = await submitLead({
        kind: "apartment-booking",
        data: values,
        source: "/book-apartment",
        projectName: values.project,
      });
      setLeadId(lead.leadId);
      void navigate({ to: "/thank-you", search: { id: lead.leadId } as never }).catch(() => {});
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "সাবমিট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <SiteShell>
      <LeadHero
        eyebrow="ফ্ল্যাট বুকিং"
        title="আপনার স্বপ্নের ফ্ল্যাট আজই রিজার্ভ করুন"
        description="একটি সহজ ফর্ম পূরণে আপনার পছন্দের ইউনিট আমাদের সিস্টেমে রিজার্ভ হয়ে যাবে। ৪৮ ঘণ্টার মধ্যে আমাদের রিলেশনশিপ ম্যানেজার আপনাকে অগ্রাধিকার ভিত্তিতে যোগাযোগ করবেন।"
        backgroundImage={apartmentBg}
      />
      <section className="container -mt-16 pb-24">
        {leadId ? (
          <SuccessCard leadId={leadId} title="বুকিং অনুরোধ গৃহীত!" />
        ) : (
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_320px]">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 rounded-[28px] border border-border/60 bg-card p-6 shadow-card md:p-10"
              noValidate
            >
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
              <div>
                <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
                  বুকিং তথ্য
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  সব ঘর সঠিকভাবে পূরণ করুন। প্রয়োজনে আমরা যাচাইয়ের জন্য কল করতে পারি।
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FieldRow label="পূর্ণ নাম" htmlFor="name" required error={errors.name?.message}>
                  <Input id="name" {...register("name")} />
                </FieldRow>
                <FieldRow label="মোবাইল" htmlFor="phone" required error={errors.phone?.message}>
                  <Input id="phone" inputMode="numeric" placeholder="01XXXXXXXXX" {...register("phone")} />
                </FieldRow>
                <FieldRow label="ইমেইল" htmlFor="email" required error={errors.email?.message}>
                  <Input id="email" type="email" {...register("email")} />
                </FieldRow>
                <FieldRow label="প্রকল্প" htmlFor="project" required error={errors.project?.message}>
                  <select
                    id="project"
                    className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm"
                    {...register("project")}
                  >
                    <option value="">-- নির্বাচন করুন --</option>
                    {projectCatalog.map((p) => (
                      <option key={p.slug} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </FieldRow>
                <FieldRow label="ফ্ল্যাট সাইজ" htmlFor="size" required error={errors.size?.message}>
                  <select
                    id="size"
                    className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm"
                    {...register("size")}
                  >
                    <option value="">-- সাইজ --</option>
                    {sizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FieldRow>
                <FieldRow label="বাজেট" htmlFor="budget" required error={errors.budget?.message}>
                  <select
                    id="budget"
                    className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm"
                    {...register("budget")}
                  >
                    <option value="">-- বাজেট --</option>
                    {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </FieldRow>
                <FieldRow label="পছন্দের ভিজিট তারিখ" htmlFor="date" required error={errors.date?.message}>
                  <Input id="date" type="date" min={new Date().toISOString().slice(0, 10)} {...register("date")} />
                </FieldRow>
                <FieldRow label="পেমেন্ট পদ্ধতি" required error={errors.paymentMethod?.message}>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { v: "emi", label: "EMI / কিস্তি" },
                      { v: "full", label: "সম্পূর্ণ পেমেন্ট" },
                    ].map((o) => (
                      <label
                        key={o.v}
                        className="flex cursor-pointer items-center justify-center rounded-2xl border border-input bg-background px-4 py-3 text-sm font-semibold hover:border-primary/40 hover:bg-primary/5 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                      >
                        <input type="radio" value={o.v} {...register("paymentMethod")} className="sr-only" />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </FieldRow>
                <FieldRow label="মন্তব্য" htmlFor="message" error={errors.message?.message} className="md:col-span-2">
                  <Textarea id="message" rows={4} {...register("message")} />
                </FieldRow>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-muted/40 p-4">
                <input type="checkbox" {...register("agreed")} className="mt-1 h-5 w-5 rounded" />
                <span className="text-sm text-muted-foreground">
                  আমি Lumen Builders-এর <span className="font-semibold text-foreground">শর্তাবলী ও গোপনীয়তা নীতি</span> পড়েছি এবং সম্মত আছি।
                </span>
              </label>
              {errors.agreed?.message && (
                <p className="-mt-4 text-xs text-rose-600">{errors.agreed.message}</p>
              )}

              {submitError && (
                <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                  {submitError}
                </div>
              )}

              <Button type="submit" size="xl" variant="gold" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> প্রক্রিয়া চলছে...</>
                ) : (
                  "বুকিং সাবমিট করুন"
                )}
              </Button>
            </motion.form>

            <aside className="space-y-4">
              <div className="rounded-[24px] border border-secondary/30 bg-gradient-to-br from-secondary/10 to-transparent p-6">
                <ShieldCheck className="h-8 w-8 text-secondary" />
                <h3 className="mt-3 font-display text-lg font-bold">নিরাপদ বুকিং</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  আপনার প্রদত্ত সব তথ্য এনক্রিপ্টেড এবং শুধুমাত্র বুকিং প্রক্রিয়ায় ব্যবহৃত হবে।
                </p>
              </div>
              <div className="rounded-[24px] border border-border bg-card p-6">
                <h3 className="font-display text-lg font-bold text-primary">আমাদের প্রতিশ্রুতি</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>✓ সময়মতো হস্তান্তর</li>
                  <li>✓ স্বচ্ছ মূল্য কাঠামো</li>
                  <li>✓ দীর্ঘমেয়াদি EMI সুবিধা</li>
                  <li>✓ ২৪/৭ কাস্টমার সাপোর্ট</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}
