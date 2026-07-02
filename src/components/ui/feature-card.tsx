import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type Props = { icon: LucideIcon; title: string; description: string };

export function FeatureCard({ icon: Icon, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group rounded-lg border border-border bg-surface p-4 shadow-soft transition-shadow hover:shadow-card sm:rounded-xl sm:p-7"
    >
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:mb-5 sm:h-12 sm:w-12 sm:rounded-2xl">
        <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
      </div>
      <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-lg">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
        {description}
      </p>
    </motion.div>
  );
}
