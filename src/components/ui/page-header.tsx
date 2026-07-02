import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

type Crumb = { label: string; to?: string };

type Props = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
};

export function PageHeader({ title, description, breadcrumbs, actions }: Props) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.78 0.15 85 / 0.35), transparent 45%), radial-gradient(circle at 80% 60%, oklch(0.5 0.12 155 / 0.25), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="container-luxury relative py-16 md:py-24">
        {breadcrumbs && (
          <nav className="mb-5 flex items-center gap-2 text-sm text-white/70">
            <Link to="/" className="hover:text-white">হোম</Link>
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronLeft className="h-3.5 w-3.5 rotate-180 text-white/40" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
