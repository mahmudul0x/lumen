import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, ArrowUpRight, Bed, Maximize, Calendar, Heart, CalendarCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { StatusBadge, ExtraBadge } from "@/components/projects/StatusBadge";
import type { ProjectDetail } from "@/lib/projects-data";

/** Legacy compact shape kept for callers that still pass a minimal object. */
export type Project = {
  slug: string;
  name: string;
  location: string;
  status: "চলমান" | "সম্পন্ন" | "আসছে";
  type: string;
  image: string;
};

type Props = { project: ProjectDetail | Project };

function isFull(p: ProjectDetail | Project): p is ProjectDetail {
  return "floorPlans" in p;
}

export function ProjectCard({ project }: Props) {
  const [fav, setFav] = useState(false);
  const full = isFull(project) ? project : null;

  const sizeRange = full
    ? `${Math.min(...full.floorPlans.map((f) => f.sizeNumeric))} - ${Math.max(...full.floorPlans.map((f) => f.sizeNumeric))} sq.ft`
    : null;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-surface shadow-soft transition-shadow hover:shadow-float focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2"
    >
      {/* Favorite button (outside link for click isolation) */}
      <button
        type="button"
        aria-label={fav ? "ফেভারিট থেকে সরান" : "ফেভারিটে যোগ করুন"}
        aria-pressed={fav}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFav((v) => !v); }}
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:scale-110"
      >
        <Heart className={`h-4 w-4 transition ${fav ? "fill-red-500 text-red-500" : "text-primary"}`} />
      </button>

      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        aria-label={`${project.name} — বিস্তারিত দেখুন`}
        className="flex flex-1 flex-col outline-none"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[22px] bg-surface-strong">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            <StatusBadge status={project.status} />
            {full?.badge && <ExtraBadge badge={full.badge} />}
          </div>
          {full && (
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                {full.type}
              </span>
              {full.status === "চলমান" && (
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur">
                  {full.progress}% সম্পন্ন
                </span>
              )}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{project.location}</span>
          </p>

          {full && (
            <>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Maximize className="h-3.5 w-3.5 text-gold" /> {sizeRange}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Bed className="h-3.5 w-3.5 text-gold" />
                  {Math.min(...full.floorPlans.map((f) => f.beds))}-
                  {Math.max(...full.floorPlans.map((f) => f.beds))} বেড
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gold" /> {full.handover}
                </span>
              </div>

              {full.status === "চলমান" && (
                <div className="mt-4">
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-strong">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-primary"
                      style={{ width: `${full.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  শুরু
                </p>
                <p className="mt-0.5 text-lg font-bold text-primary">{full.startingPrice}</p>
              </div>
            </>
          )}

          <div className="mt-5 flex items-center gap-2">
            <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-primary/90">
              বিস্তারিত <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      {/* Book visit — outside link */}
      <div className="border-t border-border p-4 pt-0">
        <Link
          to="/book-visit"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-[14px] border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold hover:text-primary"
        >
          <CalendarCheck className="h-4 w-4" /> সাইট ভিজিট বুক করুন
        </Link>
      </div>
    </motion.article>
  );
}
