import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AnnouncementBar } from "./AnnouncementBar";
import { FloatingCTAs } from "@/components/leads/FloatingCTAs";

import "@/i18n/config";

export function SiteShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation("common");
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        {t("shell.skipToMain")}
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingCTAs />
    </div>
  );
}
