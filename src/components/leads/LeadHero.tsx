import type { ReactNode } from "react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-tower.jpg";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  compact?: boolean;
  backgroundImage?: string;
}

export function LeadHero({ eyebrow, title, description, children, compact, backgroundImage }: Props) {
  return (
    <section
      className={`relative isolate overflow-hidden ${
        compact ? "min-h-[46vh]" : "min-h-[60vh]"
      } flex items-end`}
    >
      <img
        src={backgroundImage ?? heroImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent" />
      <div className="container relative z-10 pb-16 pt-32 text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center rounded-full border border-secondary/50 bg-secondary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85 md:text-xl">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
