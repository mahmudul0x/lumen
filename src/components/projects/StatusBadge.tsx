import type { ProjectStatus, ProjectBadge } from "@/lib/projects-data";

const statusStyle: Record<ProjectStatus, string> = {
  "চলমান": "bg-gold text-primary",
  "সম্পন্ন": "bg-emerald-600 text-white",
  "আসছে": "bg-primary text-white",
};

const badgeStyle: Record<NonNullable<ProjectBadge>, string> = {
  "নতুন": "bg-emerald-500/95 text-white",
  "বুকিং চলছে": "bg-gold/95 text-primary",
  "সীমিত ইউনিট": "bg-orange-500/95 text-white",
  "Sold Out": "bg-red-600/95 text-white",
};

export function StatusBadge({ status, className = "" }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-sm ${statusStyle[status]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function ExtraBadge({ badge, className = "" }: { badge: ProjectBadge; className?: string }) {
  if (!badge) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm backdrop-blur ${badgeStyle[badge]} ${className}`}
    >
      {badge}
    </span>
  );
}
