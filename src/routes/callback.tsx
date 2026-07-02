import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, PhoneCall } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { FieldRow } from "@/components/leads/FieldRow";
import { SuccessCard } from "@/components/leads/SuccessCard";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { callbackSchema, submitLead, type CallbackInput } from "@/lib/leads";
import { timeSlots } from "@/lib/projects-data";

export const Route = createFileRoute("/callback")({
  head: () => ({
    meta: [
      { title: "কল ব্যাক অনুরোধ — Lumen Builders Ltd." },
      { name: "description", content: "আপনার পছন্দের সময়ে আমাদের সেলস টিম আপনাকে কল করবে।" },
      { property: "og:title", content: "কল ব্যাক — Lumen Builders" },
      { property: "og:url", content: "/callback" },
    ],
    links: [{ rel: "canonical", href: "/callback" }],
  }),
  component: CallbackPage,
});

function CallbackPage() {
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CallbackInput>({ resolver: zodResolver(callbackSchema) });

  const onSubmit = async (values: CallbackInput) => {
    setSubmitError(null);
    try {
      const lead = await submitLead({
        kind: "callback",
        data: values,
        source: "/callback",
      });
      setLeadId(lead.leadId);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "সাবমিট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "কল ব্যাক অনুরোধ" }]}
        title="আমরা আপনাকে কল করব"
        description="আপনার পছন্দের সময় জানান — আমাদের কনসালট্যান্ট নির্ধারিত সময়ে কল দেবেন।"
      />
      <section className="container pb-24">
        <div className="mx-auto max-w-xl">
          {leadId ? (
            <SuccessCard leadId={leadId} title="কল ব্যাক অনুরোধ গৃহীত!" description="নির্ধারিত সময়ে আমাদের প্রতিনিধি কল করবেন।" />
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 rounded-[28px] border border-border/60 bg-card p-6 shadow-card md:p-8"
              noValidate
            >
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-primary">কল ব্যাক অনুরোধ</h2>
                  <p className="text-xs text-muted-foreground">দ্রুত প্রতিক্রিয়া নিশ্চিত</p>
                </div>
              </div>

              <FieldRow label="নাম" htmlFor="cb-name" required error={errors.name?.message}>
                <Input id="cb-name" {...register("name")} />
              </FieldRow>
              <FieldRow label="মোবাইল নম্বর" htmlFor="cb-phone" required error={errors.phone?.message}>
                <Input id="cb-phone" inputMode="numeric" placeholder="01XXXXXXXXX" {...register("phone")} />
              </FieldRow>
              <FieldRow label="পছন্দের সময়" htmlFor="cb-time" required error={errors.time?.message}>
                <select
                  id="cb-time"
                  className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm"
                  {...register("time")}
                >
                  <option value="">-- সময় নির্বাচন --</option>
                  {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </FieldRow>

              {submitError && (
                <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                  {submitError}
                </div>
              )}

              <Button type="submit" variant="gold" size="xl" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> পাঠানো হচ্ছে...</> : "কল ব্যাক অনুরোধ পাঠান"}
              </Button>
            </motion.form>
          )}
        </div>
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}
