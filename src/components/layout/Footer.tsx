import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin,
  MessageCircle, Clock, ShieldCheck, Award, Send, ArrowRight, ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { primaryNav, secondaryNav, site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "@/i18n/config";

const trustBadges = [
  { icon: ShieldCheck, key: "footer.trust.rajuk" },
  { icon: Award, key: "footer.trust.iso" },
  { icon: Clock, key: "footer.trust.experience" },
];

const quickActions = [
  { key: "cta.bookVisit", to: "/book-visit" },
  { key: "cta.downloadBrochure", to: "/brochure" },
  { key: "cta.emiCalculator", to: "/emi-calculator" },
  { key: "cta.requestCallback", to: "/callback" },
];

const socials = [
  { Icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { Icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { Icon: Youtube, href: site.social.youtube, label: "YouTube" },
  { Icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
];


export function Footer() {
  const { t, i18n } = useTranslation("common");
  const lang = (i18n.resolvedLanguage || i18n.language || "bn").startsWith("en") ? "en" : "bn";
  const [openCol, setOpenCol] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const prevOpenRef = useRef<string | null>(null);
  const isMountedRef = useRef(false);

  const colTitles: Record<string, string> = {
    explore: t("footer.columns.explore"),
    company: t("footer.columns.company"),
    contact: t("footer.columns.contact"),
  };

  // Announce panel expand/collapse to assistive tech (mobile accordion only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      prevOpenRef.current = openCol;
      return;
    }
    const isMobile = !window.matchMedia("(min-width: 768px)").matches;
    if (!isMobile) {
      prevOpenRef.current = openCol;
      return;
    }
    const prev = prevOpenRef.current;
    let msg = "";
    if (openCol && openCol !== prev) {
      msg = `${colTitles[openCol] ?? openCol} ${t("footer.sectionOpened")}`;
    } else if (!openCol && prev) {
      msg = `${colTitles[prev] ?? prev} ${t("footer.sectionClosed")}`;
    }
    prevOpenRef.current = openCol;
    if (!msg) return;
    setAnnouncement("");
    const to = window.setTimeout(() => setAnnouncement(msg), 30);
    return () => window.clearTimeout(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCol, i18n.language]);

  const addr = site.contact.address;
  const addrLines = lang === "en"
    ? [addr.line1En, addr.line2En, addr.line3En]
    : [addr.line1, addr.line2, addr.line3];

  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* Newsletter / CTA strip */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-luxury grid gap-8 py-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10 md:py-12">
          <div className="min-w-0 text-center md:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              {t("footer.newsletterEyebrow")}
            </p>
            <h3 className="mt-3 text-[22px] font-bold leading-snug md:text-3xl">
              {t("footer.newsletterTitle")}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/70 md:mx-0">
              {t("footer.newsletterDesc")}
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder={t("footer.emailPlaceholder")}
              className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
            />
            <Button type="submit" variant="gold" size="lg" className="w-full shrink-0 sm:w-auto">
              {t("cta.subscribe")} <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-luxury py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div className="min-w-0 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Logo variant="light" />
            </div>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/70 md:mx-0">
              {t("brand.taglineLong")}
            </p>
            <p className="mt-2 text-xs italic text-white/50">"{t("brand.sloganEn")}"</p>

            <div
              role="list"
              aria-label={t("footer.trustGroupLabel")}
              className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 md:flex md:flex-col md:gap-2.5"
            >
              {trustBadges.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  role="listitem"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium text-white/80 md:justify-start md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-xs md:text-white/70"
                >
                  <Icon className="h-4 w-4 shrink-0 text-gold" />
                  <span className="truncate">{t(key)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:bg-gold hover:text-gold-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <FooterCol id="explore" title={colTitles.explore} asList openId={openCol} onToggle={setOpenCol}>
            {primaryNav.slice(1, 7).map((n) => (
              <FooterLink key={n.to} to={n.to}>{t(n.labelKey, { defaultValue: n.label })}</FooterLink>
            ))}
          </FooterCol>

          {/* Company */}
          <FooterCol id="company" title={colTitles.company} asList openId={openCol} onToggle={setOpenCol}>
            {secondaryNav.map((n) => (
              <FooterLink key={n.to} to={n.to}>{t(n.labelKey, { defaultValue: n.label })}</FooterLink>
            ))}
          </FooterCol>

          {/* Contact + quick actions */}
          <FooterCol id="contact" title={colTitles.contact} openId={openCol} onToggle={setOpenCol}>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-white/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="min-w-0">
                  {addrLines[0]}<br />
                  {addrLines[1]}<br />
                  {addrLines[2]}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/75">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${site.contact.phone}`} className="min-w-0 truncate hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/75">
                <MessageCircle className="h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`https://wa.me/${site.contact.phone.replace(/\D/g, "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="min-w-0 truncate hover:text-white"
                >
                  {t("footer.whatsappChat")}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/75">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${site.contact.email}`} className="min-w-0 truncate hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/75">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{t("footer.hours")}</span>
              </li>
            </ul>

            <h5 className="mt-8 mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
              {t("footer.quickActionsTitle")}
            </h5>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {quickActions.map((a) => (
                <li key={a.to}>
                  <Link
                    to={a.to}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-white/80 transition-colors hover:border-gold hover:text-white"
                  >
                    <span className="truncate">{t(a.key)}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gold transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </FooterCol>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 grid grid-cols-1 items-center gap-4 border-t border-white/10 pt-6 text-xs text-white/55 md:grid-cols-[1fr_auto]">
          <p className="min-w-0">
            © {new Date().getFullYear()} {t("brand.fullName")}. {t("footer.copyright")}.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-white">{t("nav.privacy")}</Link>
            <Link to="/terms" className="hover:text-white">{t("nav.terms")}</Link>
            <Link to="/faq" className="hover:text-white">{t("nav.faq")}</Link>
            <a href={`https://${site.domain}`} className="hover:text-white">{site.domain}</a>
          </div>
        </div>
      </div>
    </footer>

  );
}

export function FooterCol({
  id,
  title,
  children,
  asList = false,
  openId,
  onToggle,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  asList?: boolean;
  openId: string | null;
  onToggle: (id: string | null) => void;
}) {
  const open = openId === id;
  const panelId = useId();
  const buttonId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPRM] = useState(false);

  // Track viewport (md breakpoint = 768px) + reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsDesktop(mqDesktop.matches);
      setPRM(mqReduced.matches);
    };
    sync();
    mqDesktop.addEventListener("change", sync);
    mqReduced.addEventListener("change", sync);
    return () => {
      mqDesktop.removeEventListener("change", sync);
      mqReduced.removeEventListener("change", sync);
    };
  }, []);

  // Keep height accurate when text wraps / fonts load / children change / viewport resizes.
  // Uses ResizeObserver when available, and always falls back to window resize + orientation +
  // font-load + rAF re-measurement for older browsers or edge cases.
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    let rafId = 0;
    const measure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setContentHeight(el.scrollHeight));
    };
    measure();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }

    // Always-on fallbacks (safe even alongside RO — measure is idempotent + rAF-throttled)
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    // Re-measure once webfonts finish loading (Hind Siliguri / Poppins can shift line-height)
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [children]);

  // Re-measure whenever this column opens (children might have changed while collapsed)
  useLayoutEffect(() => {
    if (!open) return;
    const el = contentRef.current;
    if (!el) return;
    setContentHeight(el.scrollHeight);
  }, [open]);


  const toggle = () => onToggle(open ? null : id);

  const focusSibling = (dir: "next" | "prev" | "first" | "last") => {
    const triggers = Array.from(
      document.querySelectorAll<HTMLButtonElement>('[data-footer-accordion-trigger="true"]'),
    );
    if (!triggers.length) return;
    const i = triggers.indexOf(btnRef.current!);
    let target: HTMLButtonElement | undefined;
    if (dir === "first") target = triggers[0];
    else if (dir === "last") target = triggers[triggers.length - 1];
    else if (dir === "next") target = triggers[(i + 1) % triggers.length];
    else target = triggers[(i - 1 + triggers.length) % triggers.length];
    target?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      onToggle(null);
      btnRef.current?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusSibling("next");
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusSibling("prev");
    } else if (e.key === "Home") {
      e.preventDefault();
      focusSibling("first");
    } else if (e.key === "End") {
      e.preventDefault();
      focusSibling("last");
    }
  };


  // Toggle `will-change` only while a transition is running, so the browser
  // promotes/removes the compositor layer instead of keeping it permanently.
  const panelRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Desktop: always open, no inline height. Mobile: animate to measured height.
  const panelStyle: React.CSSProperties = isDesktop
    ? { maxHeight: "none", opacity: 1 }
    : {
        maxHeight: open ? contentHeight : 0,
        opacity: open ? 1 : 0,
        transitionDuration: prefersReducedMotion ? "0ms" : undefined,
        willChange: isAnimating ? "max-height, opacity" : "auto",
        // Isolate layout/paint so height changes don't invalidate the whole footer
        contain: "layout paint",
      };

  return (
    <div className="min-w-0 border-b border-white/10 pb-3 md:border-0 md:pb-0">
      <h4 className="m-0">
        <button
          ref={btnRef}
          id={buttonId}
          type="button"
          onClick={toggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isDesktop ? true : open}
          aria-controls={panelId}
          data-footer-accordion-trigger="true"
          className={cn(
            "relative z-10 flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 -mx-2",
            "text-left text-sm font-semibold uppercase tracking-wider text-gold",
            // Persistent transparent outline so the focus transition has something to animate to
            "outline outline-2 outline-offset-4 outline-transparent",
            "transition-[outline-color,box-shadow,background-color] duration-150 motion-reduce:transition-none",
            // Strong, high-contrast focus indicator that survives panel transitions
            "focus-visible:outline-gold focus-visible:shadow-[0_0_0_4px_rgba(217,165,32,0.25)] focus-visible:bg-gold/5",
            // Fallback for browsers without :focus-visible
            "focus:outline-gold",
            "md:pointer-events-none md:py-0 md:mx-0 md:px-0 md:focus-visible:outline-none md:focus-visible:shadow-none md:focus-visible:bg-transparent",
          )}
        >
          <span>{title}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-4 w-4 text-gold transition-transform duration-300 motion-reduce:transition-none md:hidden",
              open && "rotate-180",
            )}
          />
        </button>

      </h4>
      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={panelStyle}
        onTransitionStart={(e) => {
          if (e.target === panelRef.current) setIsAnimating(true);
        }}
        onTransitionEnd={(e) => {
          if (e.target === panelRef.current) setIsAnimating(false);
        }}
        onTransitionCancel={(e) => {
          if (e.target === panelRef.current) setIsAnimating(false);
        }}
        className={cn(
          "overflow-hidden ease-[cubic-bezier(0.22,1,0.36,1)]",
          "transition-[max-height,opacity,margin] duration-[420ms] motion-reduce:transition-none",
          "transform-gpu backface-hidden",
          "md:!max-h-none md:!opacity-100 md:mt-4",
          open && !isDesktop ? "mt-4" : "mt-0 md:mt-4",
          !open && !isDesktop && "pointer-events-none",
        )}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.preventDefault();
            onToggle(null);
            btnRef.current?.focus();
          }
        }}
      >
        <div ref={contentRef} className="min-h-0 py-1 [&_a:focus-visible]:outline-none [&_a:focus-visible]:rounded-md [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-gold [&_a:focus-visible]:ring-offset-2 [&_a:focus-visible]:ring-offset-background">
          {asList ? <ul className="space-y-3">{children}</ul> : children}
        </div>

      </div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-sm text-white/75 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
