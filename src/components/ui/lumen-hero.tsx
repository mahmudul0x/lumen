import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

type Crumb = { label: string; to?: string };

type Props = {
  image: string;
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  height?: "md" | "lg";
  children?: ReactNode;
};

export function LumenHero({
  image, eyebrow, title, description, breadcrumbs, height = "lg", children,
}: Props) {
  return (
    <section className={`relative overflow-hidden bg-primary text-primary-foreground ${height === "lg" ? "min-h-[560px] md:min-h-[640px]" : "min-h-[420px]"}`}>
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary/60"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, oklch(0.78 0.15 85 / 0.35), transparent 45%), radial-gradient(circle at 85% 70%, oklch(0.5 0.12 155 / 0.3), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="container-luxury relative flex min-h-inherit flex-col justify-end py-16 md:py-24">
        {breadcrumbs && (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link to="/" className="hover:text-white">হোম</Link>
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronLeft className="h-3.5 w-3.5 rotate-180 text-white/40" />
                {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
