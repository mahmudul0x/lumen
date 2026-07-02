import projectGalaxy from "@/assets/project-galaxy.jpg";
import projectJolchaya from "@/assets/project-jolchaya.jpg";
import projectHorizon from "@/assets/project-horizon.jpg";
import projectSkyline from "@/assets/project-skyline.jpg";
import projectEmerald from "@/assets/project-emerald.jpg";
import construction from "@/assets/construction.jpg";
import interior from "@/assets/interior.jpg";
import handover from "@/assets/handover.jpg";

export type ProjectStatus = "চলমান" | "সম্পন্ন" | "আসছে";
export type ProjectBadge = "নতুন" | "বুকিং চলছে" | "সীমিত ইউনিট" | "Sold Out" | null;

export type FloorPlan = {
  id: string;
  name: string;
  size: string;         // "১৮৫০ sq.ft"
  sizeNumeric: number;  // 1850
  beds: number;
  baths: number;
  balconies: number;
  price: string;
  priceLakh: number;    // BDT lakh (0 if sold)
  planImage: string;
  available: boolean;
};

export type NearbyPlace = {
  name: string;
  category: "হাসপাতাল" | "স্কুল" | "বিশ্ববিদ্যালয়" | "মসজিদ" | "মার্কেট" | "বাস স্ট্যান্ড" | "রেলওয়ে" | "এয়ারপোর্ট";
  distance: string;
};

export type ProgressStage = {
  label: string;
  percent: number;
  done: boolean;
};

export type ProjectDetail = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  address: string;
  status: ProjectStatus;
  badge: ProjectBadge;
  type: string;
  image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  apartmentInfo: { label: string; value: string }[];
  amenities: string[];
  floorPlans: FloorPlan[];
  progress: number;
  progressStages: ProgressStage[];
  handover: string;
  possessionYear: number;
  startingPrice: string;
  startingPriceLakh: number;
  developer: string;
  landSize: string;
  totalFloors: number;
  totalUnits: number;
  buildingType: string;
  nearby: NearbyPlace[];
  mapEmbed: string;
  mapLat: number;
  mapLng: number;
  brochureUrl: string;
};

const stagesRunning = (p: number): ProgressStage[] => [
  { label: "ফাউন্ডেশন", percent: 100, done: p >= 15 },
  { label: "স্ট্রাকচার", percent: Math.min(100, Math.max(0, (p - 15) / 30 * 100)), done: p >= 45 },
  { label: "ব্রিক ওয়ার্ক", percent: Math.min(100, Math.max(0, (p - 45) / 20 * 100)), done: p >= 65 },
  { label: "ফিনিশিং", percent: Math.min(100, Math.max(0, (p - 65) / 20 * 100)), done: p >= 85 },
  { label: "পেইন্টিং", percent: Math.min(100, Math.max(0, (p - 85) / 10 * 100)), done: p >= 95 },
  { label: "হ্যান্ডওভার", percent: p >= 100 ? 100 : 0, done: p >= 100 },
];

export const projects: ProjectDetail[] = [
  {
    slug: "lumen-galaxy",
    name: "Lumen Galaxy",
    tagline: "রংপুরের হৃদয়ে আধুনিক লাক্সারি লিভিং",
    location: "আর. কে. রোড, রংপুর",
    city: "রংপুর",
    address: "১২৪ আর. কে. রোড, ধাপ, রংপুর ৫৪০০",
    status: "চলমান",
    badge: "বুকিং চলছে",
    type: "লাক্সারি অ্যাপার্টমেন্ট",
    image: projectGalaxy,
    gallery: [projectGalaxy, interior, construction, projectJolchaya, projectHorizon, handover],
    overview:
      "Lumen Galaxy হলো রংপুরের অন্যতম প্রিমিয়াম আবাসিক প্রকল্প — যেখানে আধুনিক স্থাপত্য, আন্তর্জাতিক মানের ফিনিশিং এবং সর্বোচ্চ নিরাপত্তার মিশ্রণে তৈরি হয়েছে ৪২টি লাক্সারি অ্যাপার্টমেন্ট। প্রতিটি ইউনিটে রয়েছে খোলা বারান্দা, প্রাকৃতিক আলো ও আধুনিক ইউরোপিয়ান ইন্টেরিয়র।",
    highlights: [
      "৪২টি প্রিমিয়াম অ্যাপার্টমেন্ট",
      "১৪ তলা বিশিষ্ট গ্লাস-ফিনিশ কর্পোরেট টাওয়ার",
      "রুফটপ গার্ডেন ও ইনফিনিটি ভিউ",
      "সম্পূর্ণ RAJUK/RDA অনুমোদিত",
    ],
    specs: [
      { label: "জমির পরিমাণ", value: "১৮ কাঠা" },
      { label: "মোট তলা", value: "১৪ তলা" },
      { label: "মোট ইউনিট", value: "৪২টি" },
      { label: "পার্কিং", value: "৪৮টি গাড়ি" },
      { label: "লিফট", value: "৩টি (হাই-স্পীড)" },
      { label: "জেনারেটর", value: "১০০% ব্যাকআপ" },
    ],
    apartmentInfo: [
      { label: "সাইজ", value: "১৮৫০ - ২৮০০ sq.ft" },
      { label: "বেডরুম", value: "৩ - ৪টি" },
      { label: "বাথরুম", value: "৩ - ৪টি" },
      { label: "বারান্দা", value: "২ - ৩টি" },
      { label: "কিচেন", value: "মডুলার" },
      { label: "ডাইনিং", value: "স্বতন্ত্র" },
      { label: "ড্রয়িং রুম", value: "স্পেশাস" },
      { label: "পার্কিং", value: "১টি সংরক্ষিত" },
      { label: "লিফট", value: "৩টি হাই-স্পীড" },
      { label: "জেনারেটর", value: "১০০% ব্যাকআপ" },
      { label: "রিসেপশন", value: "২৪ ঘণ্টা" },
      { label: "সিকিউরিটি", value: "CCTV + গার্ড" },
    ],
    amenities: [
      "প্যাসেঞ্জার লিফট", "জেনারেটর", "সাব-স্টেশন", "রিসেপশন",
      "সিকিউরিটি রুম", "কার পার্কিং", "কার ওয়াশ", "চিলড্রেনস এরিয়া",
      "রুফটপ গার্ডেন", "ফায়ার সেফটি", "২৪ ঘণ্টা সিকিউরিটি", "সোলার প্যানেল",
    ],
    floorPlans: [
      { id: "a", name: "Type A — ৩ বেড", size: "১৮৫০ sq.ft", sizeNumeric: 1850, beds: 3, baths: 3, balconies: 2, price: "৳ ১.২৫ কোটি", priceLakh: 125, planImage: projectGalaxy, available: true },
      { id: "b", name: "Type B — ৩ বেড প্রিমিয়াম", size: "২১০০ sq.ft", sizeNumeric: 2100, beds: 3, baths: 3, balconies: 3, price: "৳ ১.৫০ কোটি", priceLakh: 150, planImage: interior, available: true },
      { id: "c", name: "Type C — ৪ বেড ডুপ্লেক্স", size: "২৮০০ sq.ft", sizeNumeric: 2800, beds: 4, baths: 4, balconies: 3, price: "৳ ২.১০ কোটি", priceLakh: 210, planImage: handover, available: true },
    ],
    progress: 65,
    progressStages: stagesRunning(65),
    handover: "ডিসেম্বর ২০২৬",
    possessionYear: 2026,
    startingPrice: "৳ ১.২৫ কোটি থেকে",
    startingPriceLakh: 125,
    developer: "Lumen Builders Ltd.",
    landSize: "১৮ কাঠা",
    totalFloors: 14,
    totalUnits: 42,
    buildingType: "রেসিডেন্সিয়াল টাওয়ার",
    nearby: [
      { name: "রংপুর মেডিকেল কলেজ হাসপাতাল", category: "হাসপাতাল", distance: "১.২ কিমি" },
      { name: "ক্যান্টনমেন্ট পাবলিক স্কুল", category: "স্কুল", distance: "০.৮ কিমি" },
      { name: "বেগম রোকেয়া বিশ্ববিদ্যালয়", category: "বিশ্ববিদ্যালয়", distance: "৪.৫ কিমি" },
      { name: "কেরামতিয়া মসজিদ", category: "মসজিদ", distance: "০.৪ কিমি" },
      { name: "জাহাজ কোম্পানি মোড় মার্কেট", category: "মার্কেট", distance: "০.৬ কিমি" },
      { name: "কামারপাড়া বাস স্ট্যান্ড", category: "বাস স্ট্যান্ড", distance: "১.৮ কিমি" },
      { name: "রংপুর রেলওয়ে স্টেশন", category: "রেলওয়ে", distance: "৩.২ কিমি" },
      { name: "সৈয়দপুর এয়ারপোর্ট", category: "এয়ারপোর্ট", distance: "৫৫ কিমি" },
    ],
    mapEmbed: "https://www.google.com/maps?q=Rangpur+RK+Road&output=embed",
    mapLat: 25.7439,
    mapLng: 89.2752,
    brochureUrl: "/brochure",
  },
  {
    slug: "lumen-jolchaya",
    name: "Lumen Jolchaya",
    tagline: "শহরের কেন্দ্রে প্রশান্তির ঠিকানা",
    location: "শাপলা চত্বর, রংপুর",
    city: "রংপুর",
    address: "৫৬ শাপলা চত্বর, রংপুর ৫৪০০",
    status: "চলমান",
    badge: "সীমিত ইউনিট",
    type: "প্রিমিয়াম ফ্ল্যাট",
    image: projectJolchaya,
    gallery: [projectJolchaya, interior, construction, projectHorizon, projectGalaxy, handover],
    overview:
      "Lumen Jolchaya একটি বুটিক প্রিমিয়াম ফ্ল্যাট প্রকল্প — শহরের কোলাহলের মাঝেও যেখানে আপনি পাবেন প্রশান্ত ও পরিপাটি জীবনযাত্রা। ল্যান্ডস্কেপ গার্ডেন, ওয়াটার ফিচার এবং কাঠের ফিনিশিং প্রতিটি ইউনিটকে করেছে অনন্য।",
    highlights: [
      "২৪টি এক্সক্লুসিভ ফ্ল্যাট",
      "১০ তলা স্মার্ট রেসিডেন্স",
      "ল্যান্ডস্কেপড কোর্টইয়ার্ড",
      "প্রতিটি ফ্লোরে মাত্র ২টি ইউনিট (প্রাইভেসি)",
    ],
    specs: [
      { label: "জমির পরিমাণ", value: "১০ কাঠা" },
      { label: "মোট তলা", value: "১০ তলা" },
      { label: "মোট ইউনিট", value: "২৪টি" },
      { label: "পার্কিং", value: "৩০টি গাড়ি" },
      { label: "লিফট", value: "২টি" },
      { label: "জেনারেটর", value: "১০০% ব্যাকআপ" },
    ],
    apartmentInfo: [
      { label: "সাইজ", value: "১৭৫০ - ১৯৫০ sq.ft" },
      { label: "বেডরুম", value: "৩টি" },
      { label: "বাথরুম", value: "৩টি" },
      { label: "বারান্দা", value: "২টি" },
      { label: "কিচেন", value: "ওপেন কনসেপ্ট" },
      { label: "ডাইনিং", value: "স্বতন্ত্র" },
      { label: "ড্রয়িং রুম", value: "লাউঞ্জ স্টাইল" },
      { label: "পার্কিং", value: "১টি" },
      { label: "লিফট", value: "২টি" },
      { label: "জেনারেটর", value: "১০০%" },
      { label: "রিসেপশন", value: "১২ ঘণ্টা" },
      { label: "সিকিউরিটি", value: "CCTV + গার্ড" },
    ],
    amenities: [
      "কোর্টইয়ার্ড গার্ডেন", "জিমনেসিয়াম", "কমিউনিটি লাউঞ্জ",
      "চিলড্রেনস জোন", "২৪/৭ সিকিউরিটি", "CCTV",
      "ইন্টারকম", "ফায়ার সেফটি", "ভিজিটর পার্কিং", "রিসেপশন", "কার ওয়াশ",
    ],
    floorPlans: [
      { id: "a", name: "Type A — ৩ বেড", size: "১৭৫০ sq.ft", sizeNumeric: 1750, beds: 3, baths: 3, balconies: 2, price: "৳ ১.১০ কোটি", priceLakh: 110, planImage: projectJolchaya, available: true },
      { id: "b", name: "Type B — ৩ বেড কর্নার", size: "১৯৫০ sq.ft", sizeNumeric: 1950, beds: 3, baths: 3, balconies: 2, price: "৳ ১.৩৫ কোটি", priceLakh: 135, planImage: interior, available: true },
    ],
    progress: 45,
    progressStages: stagesRunning(45),
    handover: "জুন ২০২৭",
    possessionYear: 2027,
    startingPrice: "৳ ১.১০ কোটি থেকে",
    startingPriceLakh: 110,
    developer: "Lumen Builders Ltd.",
    landSize: "১০ কাঠা",
    totalFloors: 10,
    totalUnits: 24,
    buildingType: "বুটিক রেসিডেন্স",
    nearby: [
      { name: "প্রাইম মেডিকেল সেন্টার", category: "হাসপাতাল", distance: "০.৭ কিমি" },
      { name: "রংপুর জিলা স্কুল", category: "স্কুল", distance: "১.১ কিমি" },
      { name: "কারমাইকেল কলেজ", category: "বিশ্ববিদ্যালয়", distance: "২.৩ কিমি" },
      { name: "শাপলা চত্বর জামে মসজিদ", category: "মসজিদ", distance: "০.২ কিমি" },
      { name: "সিটি বাজার", category: "মার্কেট", distance: "০.৫ কিমি" },
      { name: "মেডিকেল মোড় বাস স্ট্যান্ড", category: "বাস স্ট্যান্ড", distance: "১.৪ কিমি" },
      { name: "রংপুর রেলওয়ে স্টেশন", category: "রেলওয়ে", distance: "২.৮ কিমি" },
      { name: "সৈয়দপুর এয়ারপোর্ট", category: "এয়ারপোর্ট", distance: "৫২ কিমি" },
    ],
    mapEmbed: "https://www.google.com/maps?q=Shapla+Chattar+Rangpur&output=embed",
    mapLat: 25.7500, mapLng: 89.2500,
    brochureUrl: "/brochure",
  },
  {
    slug: "lumen-horizon",
    name: "Lumen Horizon",
    tagline: "প্রকৃতির কোলে প্রিমিয়াম গার্ডেন রেসিডেন্স",
    location: "মেডিকেল রোড, রংপুর",
    city: "রংপুর",
    address: "৭৮ মেডিকেল রোড, রংপুর ৫৪০০",
    status: "সম্পন্ন",
    badge: "Sold Out",
    type: "গার্ডেন রেসিডেন্স",
    image: projectHorizon,
    gallery: [projectHorizon, interior, handover, projectGalaxy, projectJolchaya, construction],
    overview:
      "Lumen Horizon সফলভাবে হ্যান্ডওভার সম্পন্ন একটি প্রিমিয়াম গার্ডেন রেসিডেন্স। প্রকল্পটি ইতিমধ্যে ১০০% অকুপাইড এবং রংপুরের অন্যতম সফল আবাসিক কমিউনিটি হিসেবে প্রতিষ্ঠিত।",
    highlights: [
      "৩৬টি সম্পন্ন ইউনিট",
      "১২ তলা গার্ডেন টাওয়ার",
      "১০০% হ্যান্ডওভার সম্পন্ন",
      "সক্রিয় রেসিডেন্ট কমিউনিটি",
    ],
    specs: [
      { label: "জমির পরিমাণ", value: "১৫ কাঠা" },
      { label: "মোট তলা", value: "১২ তলা" },
      { label: "মোট ইউনিট", value: "৩৬টি" },
      { label: "পার্কিং", value: "৪০টি গাড়ি" },
      { label: "লিফট", value: "২টি" },
      { label: "স্ট্যাটাস", value: "১০০% অকুপাইড" },
    ],
    apartmentInfo: [
      { label: "সাইজ", value: "১৮০০ - ২৪০০ sq.ft" },
      { label: "বেডরুম", value: "৩ - ৪টি" },
      { label: "বাথরুম", value: "৩ - ৪টি" },
      { label: "বারান্দা", value: "২ - ৩টি" },
      { label: "কিচেন", value: "মডুলার" },
      { label: "ডাইনিং", value: "স্বতন্ত্র" },
      { label: "ড্রয়িং রুম", value: "গার্ডেন ভিউ" },
      { label: "পার্কিং", value: "১টি" },
      { label: "লিফট", value: "২টি" },
      { label: "জেনারেটর", value: "১০০%" },
      { label: "রিসেপশন", value: "২৪ ঘণ্টা" },
      { label: "সিকিউরিটি", value: "CCTV + গার্ড" },
    ],
    amenities: [
      "রুফটপ গার্ডেন", "সুইমিং পুল", "জিমনেসিয়াম", "কমিউনিটি হল",
      "চিলড্রেনস প্লে এরিয়া", "২৪/৭ সিকিউরিটি", "CCTV",
      "ইন্টারকম", "ফায়ার সেফটি", "কার পার্কিং", "রিসেপশন",
    ],
    floorPlans: [
      { id: "a", name: "Type A — ৩ বেড", size: "১৮০০ sq.ft", sizeNumeric: 1800, beds: 3, baths: 3, balconies: 2, price: "হ্যান্ডওভার সম্পন্ন", priceLakh: 0, planImage: projectHorizon, available: false },
      { id: "b", name: "Type B — ৪ বেড", size: "২৪০০ sq.ft", sizeNumeric: 2400, beds: 4, baths: 4, balconies: 3, price: "হ্যান্ডওভার সম্পন্ন", priceLakh: 0, planImage: interior, available: false },
    ],
    progress: 100,
    progressStages: stagesRunning(100),
    handover: "সম্পন্ন — মার্চ ২০২৪",
    possessionYear: 2024,
    startingPrice: "সম্পূর্ণ বিক্রয় হয়েছে",
    startingPriceLakh: 0,
    developer: "Lumen Builders Ltd.",
    landSize: "১৫ কাঠা",
    totalFloors: 12,
    totalUnits: 36,
    buildingType: "গার্ডেন টাওয়ার",
    nearby: [
      { name: "রংপুর মেডিকেল কলেজ হাসপাতাল", category: "হাসপাতাল", distance: "০.৩ কিমি" },
      { name: "মেডিকেল রোড হাই স্কুল", category: "স্কুল", distance: "০.৯ কিমি" },
      { name: "বেগম রোকেয়া বিশ্ববিদ্যালয়", category: "বিশ্ববিদ্যালয়", distance: "৩.৮ কিমি" },
      { name: "মেডিকেল রোড জামে মসজিদ", category: "মসজিদ", distance: "০.১ কিমি" },
      { name: "ধাপ বাজার", category: "মার্কেট", distance: "১.১ কিমি" },
      { name: "মেডিকেল মোড় বাস স্ট্যান্ড", category: "বাস স্ট্যান্ড", distance: "০.৫ কিমি" },
      { name: "রংপুর রেলওয়ে স্টেশন", category: "রেলওয়ে", distance: "৩.৫ কিমি" },
      { name: "সৈয়দপুর এয়ারপোর্ট", category: "এয়ারপোর্ট", distance: "৫৪ কিমি" },
    ],
    mapEmbed: "https://www.google.com/maps?q=Medical+Road+Rangpur&output=embed",
    mapLat: 25.7420, mapLng: 89.2600,
    brochureUrl: "/brochure",
  },
  {
    slug: "lumen-skyline-heights",
    name: "Lumen Skyline Heights",
    tagline: "রংপুরের আকাশছোঁয়া লাইফস্টাইল টাওয়ার",
    location: "কলেজ রোড, রংপুর",
    city: "রংপুর",
    address: "৩৪ কলেজ রোড, রংপুর ৫৪০০",
    status: "চলমান",
    badge: "নতুন",
    type: "লাইফস্টাইল টাওয়ার",
    image: projectSkyline,
    gallery: [projectSkyline, interior, construction, projectGalaxy, projectHorizon, handover],
    overview:
      "Lumen Skyline Heights রংপুরের সবচেয়ে আধুনিক লাইফস্টাইল টাওয়ার — যেখানে স্কাই লাউঞ্জ, ইনফিনিটি পুল ও পূর্ণাঙ্গ ক্লাব সুবিধাসহ থাকছে ৬০টি প্রিমিয়াম রেসিডেন্স। শহরের প্যানোরামিক ভিউ ও ইউরোপিয়ান ইন্টেরিয়র মিলিয়ে এটি হয়ে উঠেছে নতুন যুগের আইকনিক টাওয়ার।",
    highlights: [
      "৬০টি প্রিমিয়াম রেসিডেন্স",
      "১৮ তলা আইকনিক স্কাই টাওয়ার",
      "স্কাই লাউঞ্জ ও ইনফিনিটি পুল",
      "স্মার্ট হোম অটোমেশন প্রস্তুত",
    ],
    specs: [
      { label: "জমির পরিমাণ", value: "২২ কাঠা" },
      { label: "মোট তলা", value: "১৮ তলা" },
      { label: "মোট ইউনিট", value: "৬০টি" },
      { label: "পার্কিং", value: "৭০টি গাড়ি" },
      { label: "লিফট", value: "৪টি (হাই-স্পীড)" },
      { label: "জেনারেটর", value: "১০০% ব্যাকআপ" },
    ],
    apartmentInfo: [
      { label: "সাইজ", value: "১৯০০ - ৩৬০০ sq.ft" },
      { label: "বেডরুম", value: "৩ - ৫টি" },
      { label: "বাথরুম", value: "৩ - ৫টি" },
      { label: "বারান্দা", value: "৩ - ৪টি" },
      { label: "কিচেন", value: "স্মার্ট মডুলার" },
      { label: "ডাইনিং", value: "ফরমাল" },
      { label: "ড্রয়িং রুম", value: "প্যানোরামিক" },
      { label: "পার্কিং", value: "১ - ২টি" },
      { label: "লিফট", value: "৪টি হাই-স্পীড" },
      { label: "জেনারেটর", value: "১০০% ব্যাকআপ" },
      { label: "রিসেপশন", value: "২৪ ঘণ্টা কনসিয়ার্জ" },
      { label: "সিকিউরিটি", value: "স্মার্ট অ্যাক্সেস + গার্ড" },
    ],
    amenities: [
      "স্কাই লাউঞ্জ", "ইনফিনিটি পুল", "মাল্টি-জিম", "ইয়োগা ডেক",
      "কো-ওয়ার্কিং স্পেস", "কিডস জোন", "২৪/৭ সিকিউরিটি",
      "CCTV সার্ভেইলেন্স", "স্মার্ট অ্যাক্সেস", "সোলার প্যানেল",
      "কার পার্কিং", "কার ওয়াশ",
    ],
    floorPlans: [
      { id: "a", name: "Type A — ৩ বেড", size: "১৯০০ sq.ft", sizeNumeric: 1900, beds: 3, baths: 3, balconies: 3, price: "৳ ১.৪০ কোটি", priceLakh: 140, planImage: projectSkyline, available: true },
      { id: "b", name: "Type B — ৪ বেড স্কাই", size: "২৪৫০ sq.ft", sizeNumeric: 2450, beds: 4, baths: 4, balconies: 3, price: "৳ ১.৯৫ কোটি", priceLakh: 195, planImage: interior, available: true },
      { id: "c", name: "Type C — পেন্টহাউস", size: "৩৬০০ sq.ft", sizeNumeric: 3600, beds: 5, baths: 5, balconies: 4, price: "৳ ৩.৫০ কোটি", priceLakh: 350, planImage: handover, available: true },
    ],
    progress: 30,
    progressStages: stagesRunning(30),
    handover: "মার্চ ২০২৮",
    possessionYear: 2028,
    startingPrice: "৳ ১.৪০ কোটি থেকে",
    startingPriceLakh: 140,
    developer: "Lumen Builders Ltd.",
    landSize: "২২ কাঠা",
    totalFloors: 18,
    totalUnits: 60,
    buildingType: "আইকনিক স্কাই টাওয়ার",
    nearby: [
      { name: "রংপুর কমিউনিটি হাসপাতাল", category: "হাসপাতাল", distance: "০.৯ কিমি" },
      { name: "কলেজ রোড আইডিয়াল স্কুল", category: "স্কুল", distance: "০.৪ কিমি" },
      { name: "কারমাইকেল কলেজ", category: "বিশ্ববিদ্যালয়", distance: "১.৬ কিমি" },
      { name: "কলেজ রোড কেন্দ্রীয় মসজিদ", category: "মসজিদ", distance: "০.৩ কিমি" },
      { name: "কলেজ মার্কেট", category: "মার্কেট", distance: "০.৫ কিমি" },
      { name: "কামারপাড়া বাস স্ট্যান্ড", category: "বাস স্ট্যান্ড", distance: "১.৭ কিমি" },
      { name: "রংপুর রেলওয়ে স্টেশন", category: "রেলওয়ে", distance: "২.৯ কিমি" },
      { name: "সৈয়দপুর এয়ারপোর্ট", category: "এয়ারপোর্ট", distance: "৫৩ কিমি" },
    ],
    mapEmbed: "https://www.google.com/maps?q=College+Road+Rangpur&output=embed",
    mapLat: 25.7460, mapLng: 89.2700,
    brochureUrl: "/brochure",
  },
  {
    slug: "lumen-emerald-court",
    name: "Lumen Emerald Court",
    tagline: "ক্লাসিক এলিগ্যান্সে সম্পন্ন বুটিক রেসিডেন্স",
    location: "ধাপ, রংপুর",
    city: "রংপুর",
    address: "৯২ ধাপ ইসলামপুর, রংপুর ৫৪০০",
    status: "সম্পন্ন",
    badge: "Sold Out",
    type: "বুটিক রেসিডেন্স",
    image: projectEmerald,
    gallery: [projectEmerald, interior, handover, projectJolchaya, projectGalaxy, construction],
    overview:
      "Lumen Emerald Court হ্যান্ডওভার সম্পন্ন একটি ক্লাসিক-এলিগ্যান্স বুটিক প্রকল্প — কেন্দ্রীয় কোর্টইয়ার্ড, ফোয়ারা ও লাশ ল্যান্ডস্কেপিং সহ ২০টি এক্সক্লুসিভ পরিবারকে দিয়েছে প্রশান্ত ও প্রেস্টিজিয়াস জীবন।",
    highlights: [
      "২০টি এক্সক্লুসিভ ইউনিট (১০০% হ্যান্ডওভার)",
      "৮ তলা ক্লাসিক-স্টাইল বুটিক ভবন",
      "কেন্দ্রীয় ওয়াটার-কোর্টইয়ার্ড",
      "৫ বছর ওয়ারেন্টি সহ সম্পন্ন",
    ],
    specs: [
      { label: "জমির পরিমাণ", value: "১২ কাঠা" },
      { label: "মোট তলা", value: "৮ তলা" },
      { label: "মোট ইউনিট", value: "২০টি" },
      { label: "পার্কিং", value: "২৫টি গাড়ি" },
      { label: "লিফট", value: "২টি" },
      { label: "স্ট্যাটাস", value: "১০০% হ্যান্ডওভার" },
    ],
    apartmentInfo: [
      { label: "সাইজ", value: "১৮৫০ - ২৫০০ sq.ft" },
      { label: "বেডরুম", value: "৩ - ৪টি" },
      { label: "বাথরুম", value: "৩ - ৪টি" },
      { label: "বারান্দা", value: "২ - ৩টি" },
      { label: "কিচেন", value: "ক্লাসিক মডুলার" },
      { label: "ডাইনিং", value: "ফরমাল" },
      { label: "ড্রয়িং রুম", value: "কোর্টইয়ার্ড ভিউ" },
      { label: "পার্কিং", value: "১টি" },
      { label: "লিফট", value: "২টি" },
      { label: "জেনারেটর", value: "১০০%" },
      { label: "রিসেপশন", value: "১৮ ঘণ্টা" },
      { label: "সিকিউরিটি", value: "CCTV + গার্ড" },
    ],
    amenities: [
      "কোর্টইয়ার্ড ফোয়ারা", "ল্যান্ডস্কেপ গার্ডেন", "জিমনেসিয়াম",
      "কমিউনিটি লাউঞ্জ", "চিলড্রেনস জোন", "২৪/৭ সিকিউরিটি",
      "CCTV", "ইন্টারকম", "ফায়ার সেফটি", "কার পার্কিং", "রিসেপশন",
    ],
    floorPlans: [
      { id: "a", name: "Type A — ৩ বেড", size: "১৮৫০ sq.ft", sizeNumeric: 1850, beds: 3, baths: 3, balconies: 2, price: "হ্যান্ডওভার সম্পন্ন", priceLakh: 0, planImage: projectEmerald, available: false },
      { id: "b", name: "Type B — ৪ বেড ক্লাসিক", size: "২৫০০ sq.ft", sizeNumeric: 2500, beds: 4, baths: 4, balconies: 3, price: "হ্যান্ডওভার সম্পন্ন", priceLakh: 0, planImage: interior, available: false },
    ],
    progress: 100,
    progressStages: stagesRunning(100),
    handover: "সম্পন্ন — সেপ্টেম্বর ২০২৩",
    possessionYear: 2023,
    startingPrice: "সম্পূর্ণ বিক্রয় হয়েছে",
    startingPriceLakh: 0,
    developer: "Lumen Builders Ltd.",
    landSize: "১২ কাঠা",
    totalFloors: 8,
    totalUnits: 20,
    buildingType: "বুটিক রেসিডেন্স",
    nearby: [
      { name: "ধাপ কমিউনিটি হাসপাতাল", category: "হাসপাতাল", distance: "০.৬ কিমি" },
      { name: "ধাপ ইসলামপুর হাই স্কুল", category: "স্কুল", distance: "০.৪ কিমি" },
      { name: "বেগম রোকেয়া বিশ্ববিদ্যালয়", category: "বিশ্ববিদ্যালয়", distance: "৪.১ কিমি" },
      { name: "ধাপ কেন্দ্রীয় মসজিদ", category: "মসজিদ", distance: "০.২ কিমি" },
      { name: "ধাপ বাজার", category: "মার্কেট", distance: "০.৭ কিমি" },
      { name: "কামারপাড়া বাস স্ট্যান্ড", category: "বাস স্ট্যান্ড", distance: "২.১ কিমি" },
      { name: "রংপুর রেলওয়ে স্টেশন", category: "রেলওয়ে", distance: "৩.৪ কিমি" },
      { name: "সৈয়দপুর এয়ারপোর্ট", category: "এয়ারপোর্ট", distance: "৫৫ কিমি" },
    ],
    mapEmbed: "https://www.google.com/maps?q=Dhap+Rangpur&output=embed",
    mapLat: 25.7480, mapLng: 89.2650,
    brochureUrl: "/brochure",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFloorPlan(slug: string, planId: string) {
  const p = getProject(slug);
  if (!p) return null;
  const plan = p.floorPlans.find((f) => f.id === planId);
  if (!plan) return null;
  return { project: p, plan };
}

export const timeSlots = [
  "সকাল ১০:০০", "সকাল ১১:৩০", "দুপুর ১:০০",
  "দুপুর ২:৩০", "বিকাল ৪:০০", "বিকাল ৫:৩০",
];

export const budgetRanges = [
  "৳ ৮০ লক্ষ - ১ কোটি",
  "৳ ১ - ১.৫ কোটি",
  "৳ ১.৫ - ২ কোটি",
  "৳ ২ - ৩ কোটি",
  "৳ ৩ কোটি+",
];

export type CatalogEntry = {
  slug: string;
  name: string;
  location: string;
  sizes: string[];
  startingPrice: number;
};

export const projectCatalog: CatalogEntry[] = projects.map((p) => ({
  slug: p.slug,
  name: p.name,
  location: p.location,
  sizes: p.floorPlans.map((f) => f.size),
  startingPrice: p.startingPriceLakh || 180,
}));

// Filter helpers
export const uniqueLocations = Array.from(new Set(projects.map((p) => p.location)));
export const uniqueStatuses: ProjectStatus[] = ["চলমান", "সম্পন্ন", "আসছে"];
export const uniqueBuildingTypes = Array.from(new Set(projects.map((p) => p.type)));
export const bedroomOptions = [2, 3, 4, 5];
export const possessionYears = Array.from(new Set(projects.map((p) => p.possessionYear))).sort();
