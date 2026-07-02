import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import bnCommon from "./resources/bn/common.json";
import enCommon from "./resources/en/common.json";

export const SUPPORTED_LANGS = ["bn", "en"] as const;
export type AppLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: AppLang = "bn";

export const resources = {
  bn: { common: bnCommon },
  en: { common: enCommon },
} as const;

const isBrowser = typeof window !== "undefined";

function detectInitialLang(): AppLang {
  if (!isBrowser) return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem("lumen-lang");
    if (stored === "bn" || stored === "en") return stored;
  } catch {}
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "bn";
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: detectInitialLang(),
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    defaultNS: "common",
    ns: ["common"],
    interpolation: { escapeValue: false },
    returnNull: false,
    react: { useSuspense: false },
  });
}

if (isBrowser) {
  const sync = (lng: string) => {
    const l = lng.startsWith("en") ? "en" : "bn";
    document.documentElement.lang = l;
    try {
      window.localStorage.setItem("lumen-lang", l);
    } catch {}
  };
  sync(i18n.language || DEFAULT_LANG);
  i18n.on("languageChanged", sync);
}

export default i18n;

