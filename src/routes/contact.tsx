import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2, MapPin, Phone, Mail, Clock, MessageCircle, AlertCircle,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { FieldRow } from "@/components/leads/FieldRow";
import { SuccessCard } from "@/components/leads/SuccessCard";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  contactSchema, submitLead, telHref, whatsappHref, type ContactInput,
} from "@/lib/leads";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "যোগাযোগ — Lumen Builders Ltd." },
      { name: "description", content: "Lumen Builders Ltd.-এর সাথে যোগাযোগ করুন — অফিস, ফোন, ইমেইল ও লোকেশন।" },
      { property: "og:title", content: "যোগাযোগ — Lumen Builders" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: site.name,
        telephone: site.contact.phone,
        email: site.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
          addressLocality: "রংপুর",
          addressCountry: "BD",
        },
      }),
    }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactInput) => {
    setSubmitError(null);
    try {
      const lead = await submitLead({ kind: "contact", data: values, source: "/contact" });
      setLeadId(lead.leadId);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "সাবমিট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "যোগাযোগ" }]}
        title="যোগাযোগ করুন"
        description="আমাদের এক্সপার্ট পরামর্শদাতাদের সাথে সরাসরি কথা বলুন — আমরা প্রতিটি প্রশ্নের উত্তর দিতে প্রস্তুত।"
      />
      <section className="container pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {leadId ? (
            <SuccessCard leadId={leadId} title="বার্তা গৃহীত!" description="আমাদের টিম শীঘ্রই আপনাকে উত্তর দেবে।" />
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 rounded-[28px] border border-border/60 bg-card p-6 shadow-card md:p-8"
              noValidate
            >
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
              <div>
                <h2 className="font-display text-2xl font-bold text-primary">আমাদের লিখুন</h2>
                <p className="mt-1 text-sm text-muted-foreground">আমরা সাধারণত ১ কর্মদিবসের মধ্যে উত্তর দিই।</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <FieldRow label="নাম" htmlFor="c-name" required error={errors.name?.message}>
                  <Input id="c-name" {...register("name")} />
                </FieldRow>
                <FieldRow label="মোবাইল" htmlFor="c-phone" required error={errors.phone?.message}>
                  <Input id="c-phone" inputMode="numeric" placeholder="01XXXXXXXXX" {...register("phone")} />
                </FieldRow>
                <FieldRow label="ইমেইল" htmlFor="c-email" required error={errors.email?.message} className="md:col-span-2">
                  <Input id="c-email" type="email" {...register("email")} />
                </FieldRow>
                <FieldRow label="বিষয়" htmlFor="c-subject" required error={errors.subject?.message} className="md:col-span-2">
                  <Input id="c-subject" {...register("subject")} />
                </FieldRow>
                <FieldRow label="বার্তা" htmlFor="c-message" required error={errors.message?.message} className="md:col-span-2">
                  <Textarea id="c-message" rows={5} {...register("message")} />
                </FieldRow>
              </div>
              {submitError && (
                <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                  {submitError}
                </div>
              )}
              <Button type="submit" variant="gold" size="xl" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> পাঠানো হচ্ছে...</> : "বার্তা পাঠান"}
              </Button>
            </motion.form>
          )}

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-border/60 bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-primary">অফিস</h3>
              <div className="mt-4 space-y-3 text-sm">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span className="text-muted-foreground">
                    {site.contact.address.line1}<br />
                    {site.contact.address.line2}<br />
                    {site.contact.address.line3}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-secondary" />
                  <a href={telHref} className="font-semibold text-foreground hover:text-primary">
                    {site.contact.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-secondary" />
                  <a href={`mailto:${site.contact.email}`} className="font-semibold text-foreground hover:text-primary">
                    {site.contact.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-border/60 bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
                <Clock className="h-5 w-5" /> কর্মঘণ্টা
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>শনি – বৃহঃ</span> <span className="font-semibold text-foreground">সকাল ১০ — সন্ধ্যা ৭</span></li>
                <li className="flex justify-between"><span>শুক্রবার</span> <span className="text-rose-600">বন্ধ</span></li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-rose-200 bg-rose-50/60 p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-rose-700">
                <AlertCircle className="h-5 w-5" /> জরুরি যোগাযোগ
              </h3>
              <p className="mt-2 text-sm text-rose-700/80">
                জরুরি প্রয়োজনে সরাসরি WhatsApp করুন।
              </p>
              <Button asChild variant="gold" size="lg" className="mt-3 w-full">
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                </a>
              </Button>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-border/60 shadow-soft">
              <iframe
                title="Lumen Builders Office"
                src="https://www.google.com/maps?q=Rangpur%20Bangladesh&output=embed"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
      <StickyLeadBar />
    </SiteShell>
  );
}
