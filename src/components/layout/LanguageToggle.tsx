import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation("common");
  const lang = (i18n.resolvedLanguage || i18n.language || "bn").startsWith("en") ? "en" : "bn";

  const set = (l: "bn" | "en") => {
    void i18n.changeLanguage(l);
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface/70 p-1 shadow-soft backdrop-blur ${className}`}
      role="group"
      aria-label={t("lang.switcherLabel")}
    >
      <button
        type="button"
        onClick={() => set("bn")}
        aria-pressed={lang === "bn"}
        className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide transition ${
          lang === "bn"
            ? "bg-primary text-primary-foreground shadow"
            : "text-foreground/70 hover:text-primary"
        }`}
      >
        {t("lang.bnShort")}
      </button>
      <button
        type="button"
        onClick={() => set("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide transition ${
          lang === "en"
            ? "bg-primary text-primary-foreground shadow"
            : "text-foreground/70 hover:text-primary"
        }`}
      >
        {t("lang.enShort")}
      </button>
      <span className="grid h-6 w-6 place-items-center text-muted-foreground" aria-hidden>
        <Languages className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}
