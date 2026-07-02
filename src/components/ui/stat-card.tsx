import { motion } from "framer-motion";

type Props = { value: string; label: string; suffix?: string };

export function StatCard({ value, label, suffix }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-border bg-surface p-6 shadow-soft"
    >
      <div className="flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-primary md:text-5xl">{value}</span>
        {suffix && <span className="text-lg font-semibold text-gold">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
    </motion.div>
  );
}
