import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/** Consistent label + input + error slot. Bengali error text expected. */
export function FieldRow({ label, htmlFor, error, required, hint, className, children }: Props) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1 text-sm font-semibold text-foreground"
      >
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="animate-fade-in text-xs font-medium text-rose-600">{error}</p>
      )}
    </div>
  );
}
