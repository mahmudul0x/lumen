import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { primaryNav } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import "@/i18n/config";

export function Navbar() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl shadow-soft"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-luxury flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("nav.menu")}>
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-foreground/85 hover:text-primary" }}
              className="rounded-full px-3.5 py-2 text-[15px] font-bold tracking-tight transition-colors"
            >
              {t(item.labelKey, { defaultValue: item.label })}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button asChild variant="gold" size="lg">
            <Link to="/booking">{t("cta.bookNow")}</Link>
          </Button>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("nav.menu")}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="container-luxury flex flex-col gap-1 py-4">
              {primaryNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="rounded-2xl px-4 py-3 text-[15px] font-bold text-foreground hover:bg-surface-strong"
                >
                  {t(item.labelKey, { defaultValue: item.label })}
                </Link>
              ))}

              <div className="mt-3 flex justify-center">
                <LanguageToggle />
              </div>
              <Button asChild variant="gold" size="lg" className="mt-3">
                <Link to="/booking" onClick={() => setOpen(false)}>
                  {t("cta.bookNow")}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
