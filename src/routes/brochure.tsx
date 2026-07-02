import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Download, FileText, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/ui/page-header";
import { FieldRow } from "@/components/leads/FieldRow";
import { StickyLeadBar } from "@/components/leads/StickyLeadBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { brochureSchema, submitLead, type BrochureInput } from "@/lib/leads";
import { projectCatalog, projects } from "@/lib/projects-data";
import heroImg from "@/assets/hero-tower.jpg";

export const Route = createFileRoute("/brochure")({
  head: () => ({
    meta: [
      { title: "ব্রোশিওর ডাউনলোড — Lumen Builders Ltd." },
      { name: "description", content: "আমাদের প্রকল্পের বিস্তারিত ব্রোশিওর ডাউনলোড করুন — ফ্লোর প্ল্যান, দাম ও অ্যামেনিটিসহ।" },
      { property: "og:title", content: "ব্রোশিওর ডাউনলোড — Lumen Builders" },
      { property: "og:url", content: "/brochure" },
    ],
    links: [{ rel: "canonical", href: "/brochure" }],
  }),
  component: BrochurePage,
});

function BrochurePage() {
  const searchProject =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("project") ?? ""
      : "";
  const [unlocked, setUnlocked] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BrochureInput>({
    resolver: zodResolver(brochureSchema),
    defaultValues: { purpose: "living", project: searchProject },
  });

  const chosenProject = watch("project");
  const chosenProjectData = projects.find((project) => project.name === chosenProject);

  const onSubmit = async (values: BrochureInput) => {
    setSubmitError(null);
    try {
      const lead = await submitLead({
        kind: "brochure",
        data: values,
        source: "/brochure",
        projectName: values.project,
      });
      setLeadId(lead.leadId);
      setUnlocked(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "সাবমিট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <SiteShell>
      <PageHeader
        breadcrumbs={[{ label: "ডাউনলোড", to: "/downloads" }, { label: "ব্রোশিওর" }]}
        title="প্রকল্পের ব্রোশিওর ডাউনলোড"
        description="প্রতিটি প্রকল্পের বিস্তারিত পিডিএফ ব্রোশিওরে থাকছে ফ্লোর প্ল্যান, ইউনিট সাইজ, মূল্য ও অ্যামেনিটির সম্পূর্ণ তালিকা।"
      />
      <section className="container pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-card">
            <div className="relative h-64 overflow-hidden md:h-80">
              <img src={chosenProjectData?.image ?? heroImg} alt={chosenProject || "প্রকল্প ব্রোশিওর"} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-primary-foreground">
                <p className="text-xs uppercase tracking-widest text-secondary">PROJECT BROCHURE</p>
                <p className="mt-1 font-display text-2xl font-bold">
                  {chosenProject || "সকল প্রকল্প"}
                </p>
              </div>
            </div>
            <div className="space-y-4 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <FileText className="h-10 w-10 text-secondary" />
                <div>
                  <p className="font-semibold text-foreground">সম্পূর্ণ পিডিএফ ব্রোশিওর</p>
                  <p className="text-xs text-muted-foreground">প্রায় ৪.২ MB · ২৪ পৃষ্ঠা</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["সম্পূর্ণ প্রকল্প ওভারভিউ", "ফ্লোর প্ল্যান ও ইউনিট সাইজ", "মূল্য ও পেমেন্ট প্ল্যান", "যোগাযোগের বিস্তারিত"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" /> {t}
                    </li>
                  ),
                )}
              </ul>
              {chosenProjectData && (
                <p className="rounded-2xl bg-primary/5 p-4 text-sm leading-relaxed text-muted-foreground">
                  {chosenProjectData.overview}
                </p>
              )}
              {unlocked ? (
                <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4">
                  <p className="text-sm font-semibold text-accent">
                    আনলকড — লিড আইডি: <span className="font-mono">{leadId}</span>
                  </p>
                  <Button
                    variant="gold"
                    size="lg"
                    className="mt-3 w-full"
                    onClick={() => window.print()}
                  >
                    <Download className="mr-2 h-5 w-5" /> ব্রোশিওর ডাউনলোড
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    * প্রকৃত পিডিএফ ফাইল সংযুক্ত করা হলে এই বাটন সরাসরি ডাউনলোড শুরু করবে।
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  ডাউনলোডের জন্য পাশের ফর্মটি পূরণ করুন।
                </p>
              )}
            </div>
          </div>

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
              <h2 className="font-display text-xl font-bold text-primary">তথ্য প্রদান করুন</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                সংক্ষিপ্ত এই ফর্মটি পূরণ করে ব্রোশিওর ডাউনলোড আনলক করুন।
              </p>
            </div>
            <FieldRow label="নাম" htmlFor="br-name" required error={errors.name?.message}>
              <Input id="br-name" {...register("name")} />
            </FieldRow>
            <FieldRow label="মোবাইল" htmlFor="br-phone" required error={errors.phone?.message}>
              <Input id="br-phone" inputMode="numeric" placeholder="01XXXXXXXXX" {...register("phone")} />
            </FieldRow>
            <FieldRow label="ইমেইল" htmlFor="br-email" required error={errors.email?.message}>
              <Input id="br-email" type="email" {...register("email")} />
            </FieldRow>
            <FieldRow label="প্রকল্প" htmlFor="br-project" required error={errors.project?.message}>
              <select
                id="br-project"
                className="flex h-11 w-full rounded-2xl border border-input bg-background px-3 text-sm"
                {...register("project")}
              >
                <option value="">-- নির্বাচন --</option>
                {projectCatalog.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
              </select>
            </FieldRow>
            <FieldRow label="উদ্দেশ্য" required error={errors.purpose?.message}>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: "living", label: "বসবাস" },
                  { v: "investment", label: "বিনিয়োগ" },
                  { v: "business", label: "ব্যবসা" },
                ].map((o) => (
                  <label
                    key={o.v}
                    className="flex cursor-pointer items-center justify-center rounded-2xl border border-input bg-background px-3 py-2.5 text-xs font-semibold hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                  >
                    <input type="radio" value={o.v} {...register("purpose")} className="sr-only" />
                    {o.label}
                  </label>
                ))}
              </div>
            </FieldRow>
            {submitError && (
              <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {submitError}
              </div>
            )}
            <Button type="submit" variant="gold" size="xl" className="w-full" disabled={isSubmitting || unlocked}>
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> যাচাই হচ্ছে...</>
              ) : unlocked ? (
                "আনলকড"
              ) : (
                <><Download className="mr-2 h-5 w-5" /> ব্রোশিওর আনলক করুন</>
              )}
            </Button>
          </motion.form>
        </div>
      </section>
      <StickyLeadBar projectName={chosenProject} />
    </SiteShell>
  );
}
