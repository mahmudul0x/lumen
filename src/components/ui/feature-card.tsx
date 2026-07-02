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
      className="group rounded-[22px] border border-border bg-surface p-7 shadow-soft transition-shadow hover:shadow-card"
    >
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </motion.div>
  );
}
