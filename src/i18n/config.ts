import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import bnCommon from "./resources/bn/common.json";

export const SUPPORTED_LANGS = ["bn"] as const;
export type AppLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: AppLang = "bn";

export const resources = {
  bn: { common: bnCommon },
} as const;

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    defaultNS: "common",
    ns: ["common"],
    interpolation: { escapeValue: false },
    returnNull: false,
    react: { useSuspense: false },
  });
}

if (typeof window !== "undefined") {
  document.documentElement.lang = DEFAULT_LANG;
}

export default i18n;
