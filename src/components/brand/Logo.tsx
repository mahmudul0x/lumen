import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logoAsset from "@/assets/lumen-logo.png.asset.json";
import "@/i18n/config";

type Props = { variant?: "light" | "dark"; compact?: boolean };

export function Logo({ variant = "dark", compact = false }: Props) {
  const { t } = useTranslation("common");
  const isLight = variant === "light";
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex shrink-0 items-center gap-2 sm:gap-3"
      aria-label={t("nav.toHome")}
    >
      <span
        className="relative flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105"
        aria-hidden
      >
        <img
          src={logoAsset.url}
          alt={t("brand.fullName")}
          className="relative h-12 w-auto object-contain drop-shadow-[0_4px_12px_rgba(11,45,107,0.25)] sm:h-14 lg:h-16"
          width={128}
          height={128}
        />
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span
            className={`font-display text-[15px] font-bold tracking-tight sm:text-[17px] ${
              isLight ? "text-white" : "text-primary"
            }`}
          >
            {t("brand.name")}
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${
              isLight ? "text-white/85" : "text-foreground/70"
            }`}
          >
            {t("brand.tagline")}
          </span>
        </span>
      )}
    </Link>
  );
}
