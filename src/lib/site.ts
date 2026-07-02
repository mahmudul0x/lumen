// Central site config — business info + nav structure.
// UI labels come from i18n (see src/i18n/resources/*/common.json).
// Never hardcode brand strings in components.

export const site = {
  name: "Lumen Builders Ltd.",
  domain: "lumenbuilders.com.bd",
  tagline: {
    en: "We Build Trust, We Build Dreams.",
    bn: "স্বপ্নের বাড়ি, নিজেই গড়ি, এক সাথে জমি কিনি",
  },
  contact: {
    phone: "01711-381422",
    email: "hrlumenbuilders@gmail.com",
    address: {
      line1: "হাউস ১০৬/২, ২য় তলা",
      line2: "শান্তিধারা রোড, আইডিয়াল মোড়",
      line3: "আর. কে. রোড, রংপুর, বাংলাদেশ",
      // English lines used when app language is EN
      line1En: "House 106/2, 2nd Floor",
      line2En: "Shantidhara Road, Ideal Mor",
      line3En: "R. K. Road, Rangpur, Bangladesh",
    },
  },
  social: {
    facebook: "#",
    messenger: "https://m.me/lumenbuildersltd",
    instagram: "#",
    youtube: "#",
    linkedin: "#",
  },
} as const;

export type NavItem = {
  /** i18n key inside the `common` namespace, e.g. "nav.home" */
  labelKey: string;
  /** Fallback Bengali label (used if a translation is missing) */
  label: string;
  to: string;
  group?: "primary" | "secondary";
};

export const primaryNav: NavItem[] = [
  { labelKey: "nav.home", label: "হোম", to: "/" },
  { labelKey: "nav.about", label: "আমাদের সম্পর্কে", to: "/about" },
  { labelKey: "nav.ongoing", label: "চলমান প্রকল্প", to: "/projects/ongoing" },
  { labelKey: "nav.completed", label: "সম্পন্ন প্রকল্প", to: "/projects/completed" },
  { labelKey: "nav.apartments", label: "ফ্ল্যাট", to: "/apartments" },
  { labelKey: "nav.landShare", label: "জমি শেয়ার", to: "/land-share" },
  { labelKey: "nav.gallery", label: "গ্যালারি", to: "/gallery" },
  { labelKey: "nav.contact", label: "যোগাযোগ", to: "/contact" },
];

export const secondaryNav: NavItem[] = [
  { labelKey: "nav.blog", label: "ব্লগ", to: "/blog" },
  { labelKey: "nav.careers", label: "ক্যারিয়ার", to: "/careers" },
  { labelKey: "nav.testimonials", label: "গ্রাহকদের মতামত", to: "/testimonials" },
  { labelKey: "nav.booking", label: "বুকিং", to: "/booking" },
  { labelKey: "nav.downloads", label: "ডাউনলোড", to: "/downloads" },
  { labelKey: "nav.faq", label: "FAQ", to: "/faq" },
  { labelKey: "nav.privacy", label: "Privacy Policy", to: "/privacy" },
  { labelKey: "nav.terms", label: "Terms", to: "/terms" },
];

export const values = [
  "বিশ্বাস", "স্বচ্ছতা", "গুণগত মান", "প্রতিশ্রুতি",
  "আধুনিক জীবনযাত্রা", "দীর্ঘমেয়াদী বিনিয়োগ",
  "গ্রাহক সন্তুষ্টি", "প্রিমিয়াম নির্মাণ",
] as const;
