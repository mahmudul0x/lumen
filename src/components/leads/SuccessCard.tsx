import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { telHref, whatsappHref } from "@/lib/leads";

interface Props {
  leadId: string;
  title?: string;
  description?: string;
}

export function SuccessCard({ leadId, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-2xl overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-card"
    >
      <div className="bg-gradient-to-br from-primary via-primary to-accent px-8 py-10 text-primary-foreground">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur"
        >
          <CheckCircle2 className="h-11 w-11" strokeWidth={2.2} />
        </motion.div>
        <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
          {title ?? "আপনার অনুরোধ পেয়েছি!"}
        </h2>
        <p className="mt-2 text-center text-primary-foreground/85">
          {description ??
            "আমাদের সেলস টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।"}
        </p>
      </div>
      <div className="space-y-5 px-8 py-8">
        <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-5 py-4 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            আপনার লিড আইডি
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-primary">{leadId}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Button asChild variant="outline" size="lg">
            <Link to="/">হোমে ফিরুন</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/projects">প্রকল্প দেখুন</Link>
          </Button>
          <Button asChild variant="gold" size="lg">
            <a href={telHref}>সেলসে কল করুন</a>
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          তাৎক্ষণিক যোগাযোগের জন্য{" "}
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            WhatsApp
          </a>{" "}
          ব্যবহার করুন।
        </p>
      </div>
    </motion.div>
  );
}
