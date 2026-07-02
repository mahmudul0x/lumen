import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, MessageCircle, CalendarCheck2 } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LeadHero } from "@/components/leads/LeadHero";
import { FieldRow } from "@/components/leads/FieldRow";
import { SuccessCard } from "@/components/leads/SuccessCard";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  siteVisitSchema,
  submitLead,
  whatsappHref,
  type SiteVisitInput,
} from "@/lib/leads";
import { projectCatalog, timeSlots } from "@/lib/projects-data";
import siteVisitBg from "@/assets/construction.jpg";

export const Route = createFileRoute("/book-visit")({
  head: () => ({
    meta: [
      { title: "সাইট ভিজিট বুকিং — Lumen Builders Ltd." },
      {
        name: "description",
        content:
          "Lumen Builders-এর যেকোনো প্রকল্পে সাইট ভিজিট বুক করুন। আমাদের সেলস টিম আপনাকে সাইটে ঘুরিয়ে দেখাবে।",
      },
      { property: "og:title", content: "সাইট ভিজিট বুকিং — Lumen Builders" },
      { property: "og:url", content: "/book-visit" },
    ],
    links: [{ rel: "canonical", href: "/book-visit" }],
  }),
  component: BookVisitPage,
});

function BookVisitPage() {
  const navigate = useNavigate();
  const searchProject =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("project") ?? ""
      : "";

  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SiteVisitInput>({
    resolver: zodResolver(siteVisitSchema),
    defaultValues: {
      project: searchProject,
      contactMethod: "phone",
    },
  });

  const onSubmit = async (values: SiteVisitInput) => {
    setSubmitError(null);
    try {
      const lead = await submitLead({
        kind: "site-visit",
        data: values,
        source: "/book-visit",
        projectName: values.project,
      });
      setLeadId(lead.leadId);
      // Also mirror to /thank-you for direct link handling
      void navigate({
        to: "/thank-you",
        search: { id: lead.leadId } as never,
        replace: false,
      }).catch(() => {});
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "সাবমিট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <SiteShell>
      <LeadHero
        eyebrow="সাইট ভিজিট"
        title="আপনার স্বপ্নের প্রকল্প সরাসরি ঘুরে দেখুন"
        description="আমাদের এক্সপার্ট সেলস কনসালট্যান্ট সাইটে সময় দিয়ে আপনাকে সম্পূর্ণ প্রকল্প ঘুরিয়ে দেখাবেন। সম্পূর্ণ ফ্রি ও কোনো বাধ্যবাধকতা ছাড়াই।"
        backgroundImage={siteVisitBg}
      />
      <section className="container -mt-16 pb-24">
        {leadId ? (
          <SuccessCard
            leadId={leadId}
            title="সাইট ভিজিট বুকিং নিশ্চিত!"
            description="নির্ধারিত তারিখ ও সময়ের ২৪ ঘণ্টা আগে আমাদের টিম আপনাকে কনফার্ম করবে।"
          />
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-4xl space-y-8 rounded-[28px] border border-border/60 bg-card p-6 shadow-card md:p-10"
            noValidate
          >
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
            <div>
              <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
                বুকিং ফর্ম
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                সব তথ্য সঠিকভাবে পূরণ করুন — সাধারণত ১ কর্মদিবসের মধ্যে যোগাযোগ করা হয়।
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FieldRow label="নাম" htmlFor="name" required error={errors.name?.message}>
                <Input id="name" placeholder="আপনার পূর্ণ নাম" {...register("name")} />
              </FieldRow>
              <FieldRow label="মোবাইল নম্বর" htmlFor="phone" required error={errors.phone?.message}>
                <Input id="phone" inputMode="numeric" placeholder="01XXXXXXXXX" {...register("phone")} />
              </FieldRow>
              <FieldRow label="ইমেইল" htmlFor="email" required error={errors.email?.message}>
                <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              </FieldRow>
              <FieldRow label="পছন্দের প্রকল্প" htmlFor="project" required error={errors.project?.message}>
                <select
                  id="project"
                  className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  {...register("project")}
                >
                  <option value="">-- নির্বাচন করুন --</option>
                  {projectCatalog.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name} — {p.location}
                    </option>
                  ))}
                </select>
              </FieldRow>
              <FieldRow label="পছন্দের তারিখ" htmlFor="date" required error={errors.date?.message}>
                <Input id="date" type="date" min={new Date().toISOString().slice(0, 10)} {...register("date")} />
              </FieldRow>
              <FieldRow label="পছন্দের সময়" htmlFor="time" required error={errors.time?.message}>
                <select
                  id="time"
                  className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  {...register("time")}
                >
                  <option value="">-- নির্বাচন করুন --</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </FieldRow>
              <FieldRow
                label="বর্তমান ঠিকানা"
                htmlFor="address"
                error={errors.address?.message}
                className="md:col-span-2"
              >
                <Input id="address" placeholder="শহর / এলাকা" {...register("address")} />
              </FieldRow>
              <FieldRow
                label="আপনার বার্তা"
                htmlFor="message"
                error={errors.message?.message}
                className="md:col-span-2"
              >
                <Textarea id="message" rows={4} placeholder="বিশেষ কিছু জানাতে চাইলে লিখুন..." {...register("message")} />
              </FieldRow>
            </div>

            <FieldRow label="পছন্দের যোগাযোগ মাধ্যম" required error={errors.contactMethod?.message}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: "phone", label: "ফোন" },
                  { v: "whatsapp", label: "WhatsApp" },
                  { v: "email", label: "ইমেইল" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-input bg-background px-4 py-3 text-sm font-semibold transition hover:border-primary/40 hover:bg-primary/5 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                  >
                    <input
                      type="radio"
                      value={opt.v}
                      {...register("contactMethod")}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </FieldRow>

            {submitError && (
              <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {submitError}
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="submit" size="xl" variant="gold" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <CalendarCheck2 className="mr-2 h-5 w-5" /> সাইট ভিজিট বুক করুন
                  </>
                )}
              </Button>
              <Button asChild type="button" size="xl" variant="outline">
                <a href={whatsappHref("আমি একটি সাইট ভিজিট বুক করতে চাই।")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp-এ যোগাযোগ
                </a>
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              আপনার তথ্য সম্পূর্ণ গোপনীয় ও শুধুমাত্র বুকিং প্রক্রিয়ায় ব্যবহৃত হবে।
            </p>
          </motion.form>
        )}
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}
