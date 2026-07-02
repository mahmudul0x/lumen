// Corporate content: leadership, milestones, achievements, testimonials,
// blog, careers, media center. Replace with real content when uploaded.

import corporateHero from "@/assets/corporate-hero.jpg";
import chairman from "@/assets/chairman.jpg";
import construction from "@/assets/construction.jpg";
import interior from "@/assets/interior.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import handover from "@/assets/handover.jpg";

export const corporateImages = {
  hero: corporateHero,
  chairman,
  construction,
  interior,
  teamMeeting,
  handover,
};

export type TeamMember = {
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin?: string;
};

export const leadership: TeamMember[] = [
  {
    name: "মো. আব্দুল্লাহ আল মামুন",
    position: "চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক",
    bio: "রিয়েল এস্টেট ও নির্মাণ শিল্পে ২৫ বছরের অভিজ্ঞতা। বিশ্বাস ও গুণগত মানের প্রতি অঙ্গীকারবদ্ধ।",
    image: chairman,
    linkedin: "#",
  },
  {
    name: "ইঞ্জি. রফিকুল ইসলাম",
    position: "পরিচালক — প্রকৌশল",
    bio: "BUET থেকে সিভিল ইঞ্জিনিয়ারিং। ২০+ প্রকল্প সফলভাবে পরিচালনার অভিজ্ঞতা।",
    image: teamMeeting,
    linkedin: "#",
  },
  {
    name: "শাহনাজ পারভীন",
    position: "পরিচালক — অর্থ ও প্রশাসন",
    bio: "চার্টার্ড অ্যাকাউন্ট্যান্ট, ১৫ বছরের কর্পোরেট ফাইন্যান্স অভিজ্ঞতা।",
    image: interior,
    linkedin: "#",
  },
  {
    name: "মো. আরিফুর রহমান",
    position: "পরিচালক — সেলস ও মার্কেটিং",
    bio: "রিয়েল এস্টেট সেলসে দুই দশকের অভিজ্ঞতা, উত্তরাঞ্চলের বিশ্বস্ত নাম।",
    image: handover,
    linkedin: "#",
  },
];

export const engineeringTeam: TeamMember[] = [
  { name: "ইঞ্জি. তানভীর হোসেন", position: "সিনিয়র প্রজেক্ট ইঞ্জিনিয়ার", bio: "স্ট্রাকচারাল ডিজাইন ও প্রজেক্ট ম্যানেজমেন্ট।", image: construction },
  { name: "স্থপতি নুসরাত জাহান", position: "প্রধান স্থপতি", bio: "আধুনিক আবাসিক আর্কিটেকচার বিশেষজ্ঞ।", image: interior },
  { name: "ইঞ্জি. মিজানুর রহমান", position: "সাইট সুপারভাইজার — লুমেন গ্যালাক্সি", bio: "নির্মাণ মান ও নিরাপত্তা তত্ত্বাবধান।", image: construction },
  { name: "মো. সাইফুল ইসলাম", position: "সেলস ম্যানেজার", bio: "গ্রাহক পরামর্শ ও ইউনিট সিলেকশন।", image: teamMeeting },
  { name: "ফাতেমা আক্তার", position: "কাস্টমার সাপোর্ট লিড", bio: "হ্যান্ডওভার ও আফটার-সেলস কেয়ার।", image: teamMeeting },
];

export type Milestone = { year: string; title: string; description: string };

export const milestones: Milestone[] = [
  { year: "২০১০", title: "প্রতিষ্ঠান গঠন", description: "রংপুরে যাত্রা শুরু। মিশন — বিশ্বাসযোগ্য আবাসন।" },
  { year: "২০১২", title: "প্রথম প্রকল্প", description: "লুমেন হেরিটেজ — সফলভাবে সম্পন্ন ও হ্যান্ডওভার।" },
  { year: "২০১৫", title: "৫টি প্রকল্প সম্পন্ন", description: "রংপুরের প্রথম সারির ডেভেলপার হিসেবে স্বীকৃতি।" },
  { year: "২০১৮", title: "গ্রাহক হ্যান্ডওভার", description: "৩০০+ পরিবারের কাছে চাবি হস্তান্তর।" },
  { year: "২০২১", title: "উত্তরাঞ্চলে সম্প্রসারণ", description: "দিনাজপুর ও নীলফামারীতে নতুন প্রকল্প।" },
  { year: "২০২৫", title: "ভবিষ্যৎ দৃষ্টি", description: "পরিবেশবান্ধব ও স্মার্ট আবাসনের দিকে অগ্রসরমান।" },
];

export const achievements = [
  { value: "২০+", label: "সম্পন্ন প্রকল্প" },
  { value: "১০০০+", label: "সন্তুষ্ট পরিবার" },
  { value: "১০০%", label: "আইনি বৈধতা" },
  { value: "৯৫%", label: "গ্রাহক সন্তুষ্টি" },
  { value: "১৫+", label: "বছরের অভিজ্ঞতা" },
  { value: "৫০+", label: "প্রকৌশলী ও কর্মী" },
];

export type Testimonial = {
  name: string;
  project: string;
  rating: number;
  review: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "ডা. সাইফুল আলম",
    project: "লুমেন গ্যালাক্সি",
    rating: 5,
    review: "নির্মাণের গুণগত মান এবং সময়মতো হ্যান্ডওভার — দুটোতেই Lumen Builders অসাধারণ। পুরো পরিবার সন্তুষ্ট।",
    image: handover,
  },
  {
    name: "মিসেস রেহানা বেগম",
    project: "লুমেন জলছায়া",
    rating: 5,
    review: "স্বচ্ছ পেমেন্ট প্ল্যান, প্রতিটি ধাপে আপডেট এবং চমৎকার কাস্টমার সাপোর্ট। কোনো লুকানো খরচ নেই।",
    image: teamMeeting,
  },
  {
    name: "মো. তৌহিদুল ইসলাম",
    project: "লুমেন হেরিটেজ",
    rating: 5,
    review: "১০ বছর পরও ফ্ল্যাটের কোয়ালিটি অটুট। ভবিষ্যতে আবার বিনিয়োগ করবো এখানেই।",
    image: interior,
  },
  {
    name: "ইঞ্জি. কামরুল হাসান",
    project: "লুমেন গ্যালাক্সি",
    rating: 5,
    review: "একজন ইঞ্জিনিয়ার হিসেবে বলতে পারি — স্ট্রাকচারাল ডিজাইন ও ম্যাটেরিয়াল কোয়ালিটি প্রশংসনীয়।",
    image: construction,
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  { slug: "rangpur-real-estate-2025", title: "২০২৫ সালে রংপুরের রিয়েল এস্টেট বাজার", excerpt: "উত্তরাঞ্চলের সবচেয়ে দ্রুত বর্ধনশীল আবাসন বাজারে বিনিয়োগের সুযোগ।", category: "বিনিয়োগ টিপস", date: "১৫ জুন, ২০২৫", readTime: "৫ মিনিট", image: corporateHero },
  { slug: "lumen-galaxy-construction-update", title: "লুমেন গ্যালাক্সি — নির্মাণ আপডেট", excerpt: "প্রকল্পের সর্বশেষ অগ্রগতি ও হ্যান্ডওভার টাইমলাইন।", category: "নির্মাণ আপডেট", date: "১ জুন, ২০২৫", readTime: "৩ মিনিট", image: construction },
  { slug: "flat-buying-checklist", title: "ফ্ল্যাট কেনার আগে ১০টি জরুরি বিষয়", excerpt: "একটি নিরাপদ ও লাভজনক ক্রয়ের জন্য চেকলিস্ট।", category: "প্রপার্টি গাইড", date: "২০ মে, ২০২৫", readTime: "৭ মিনিট", image: interior },
  { slug: "annual-customer-meet-2025", title: "বার্ষিক গ্রাহক সম্মেলন ২০২৫", excerpt: "গ্রাহকদের সাথে আমাদের বার্ষিক পুনর্মিলনী অনুষ্ঠান।", category: "কোম্পানি ইভেন্ট", date: "১০ মে, ২০২৫", readTime: "৪ মিনিট", image: teamMeeting },
  { slug: "new-project-launch-heritage-2", title: "প্রকল্প উদ্বোধন — লুমেন হেরিটেজ ২", excerpt: "নতুন প্রকল্পের বিস্তারিত ও আর্লি বার্ড অফার।", category: "প্রকল্প লঞ্চ", date: "১ মে, ২০২৫", readTime: "৪ মিনিট", image: corporateHero },
  { slug: "emi-vs-full-payment", title: "EMI নাকি ফুল পেমেন্ট — কোনটি লাভজনক?", excerpt: "দুই পদ্ধতির তুলনামূলক বিশ্লেষণ ও সুপারিশ।", category: "বিনিয়োগ টিপস", date: "২৫ এপ্রিল, ২০২৫", readTime: "৬ মিনিট", image: handover },
];

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
};

export const openings: Job[] = [
  { id: "eng-01", title: "সিনিয়র সিভিল ইঞ্জিনিয়ার", department: "প্রকৌশল", location: "রংপুর", type: "ফুল টাইম", experience: "৫+ বছর" },
  { id: "arch-01", title: "আর্কিটেক্ট", department: "ডিজাইন", location: "রংপুর", type: "ফুল টাইম", experience: "৩+ বছর" },
  { id: "sales-01", title: "সেলস এক্সিকিউটিভ", department: "সেলস", location: "রংপুর / দিনাজপুর", type: "ফুল টাইম", experience: "২+ বছর" },
  { id: "supv-01", title: "সাইট সুপারভাইজার", department: "নির্মাণ", location: "প্রকল্প সাইট", type: "ফুল টাইম", experience: "৪+ বছর" },
  { id: "cs-01", title: "কাস্টমার সাপোর্ট অফিসার", department: "গ্রাহক সেবা", location: "রংপুর", type: "ফুল টাইম", experience: "১+ বছর" },
];

export type GalleryItem = { src: string; alt: string; category: string; span?: "tall" | "wide" | "large" };

export const galleryItems: GalleryItem[] = [
  { src: corporateHero, alt: "লুমেন গ্যালাক্সি — এক্সটেরিয়র", category: "প্রকল্প", span: "large" },
  { src: construction, alt: "নির্মাণ কার্যক্রম", category: "নির্মাণ", span: "tall" },
  { src: interior, alt: "মডেল অ্যাপার্টমেন্ট ইন্টেরিয়র", category: "ইন্টেরিয়র" },
  { src: teamMeeting, alt: "ক্লায়েন্ট মিটিং", category: "ক্লায়েন্ট মিটিং", span: "wide" },
  { src: handover, alt: "গ্রাহক হ্যান্ডওভার", category: "হ্যান্ডওভার" },
  { src: corporateHero, alt: "প্রকল্প এক্সটেরিয়র সন্ধ্যায়", category: "এক্সটেরিয়র" },
  { src: interior, alt: "লিভিং রুম ভিউ", category: "ইন্টেরিয়র", span: "tall" },
  { src: construction, alt: "স্ট্রাকচারাল কাজ", category: "নির্মাণ" },
  { src: teamMeeting, alt: "কর্পোরেট অফিস", category: "অফিস" },
  { src: handover, alt: "চাবি হস্তান্তর অনুষ্ঠান", category: "ইভেন্ট", span: "wide" },
  { src: corporateHero, alt: "প্রকল্প প্রিমিয়াম ভিউ", category: "প্রকল্প" },
  { src: interior, alt: "প্রিমিয়াম ফিনিশিং", category: "ইন্টেরিয়র" },
];

export const galleryCategories = ["সবগুলো", "প্রকল্প", "নির্মাণ", "ইন্টেরিয়র", "এক্সটেরিয়র", "অফিস", "ইভেন্ট", "ক্লায়েন্ট মিটিং", "হ্যান্ডওভার"];

export type VideoItem = { title: string; description: string; youtubeId?: string; thumbnail: string; duration: string };

export const videos: VideoItem[] = [
  { title: "Lumen Builders — কোম্পানি পরিচিতি", description: "আমাদের যাত্রা, মূল্যবোধ ও প্রকল্পসমূহের এক ঝলক।", thumbnail: corporateHero, duration: "৩:২৫" },
  { title: "লুমেন গ্যালাক্সি — প্রকল্প ট্যুর", description: "৩৬০° প্রকল্প ট্যুর ও অ্যামেনিটি ওয়াকথ্রু।", thumbnail: interior, duration: "৫:১০" },
  { title: "নির্মাণ প্রক্রিয়া — বিহাইন্ড দ্য সিন", description: "কীভাবে আমরা প্রতিটি ভবন তৈরি করি — শুরু থেকে হ্যান্ডওভার।", thumbnail: construction, duration: "৭:৪৫" },
  { title: "গ্রাহকদের অভিজ্ঞতা", description: "সন্তুষ্ট গ্রাহকদের প্রকৃত অভিজ্ঞতা ও রিভিউ।", thumbnail: handover, duration: "৪:২০" },
];

export const partners = [
  { name: "সোনালী ব্যাংক", type: "ব্যাংকিং পার্টনার" },
  { name: "ডাচ বাংলা ব্যাংক", type: "ব্যাংকিং পার্টনার" },
  { name: "IDLC ফাইন্যান্স", type: "হোম লোন পার্টনার" },
  { name: "IPDC ফাইন্যান্স", type: "হোম লোন পার্টনার" },
  { name: "BSRM স্টিল", type: "সরবরাহকারী" },
  { name: "শাহ সিমেন্ট", type: "সরবরাহকারী" },
  { name: "RAJUK", type: "সরকারি অনুমোদন" },
  { name: "REHAB", type: "সদস্যপদ" },
];

export const certifications = [
  { title: "ট্রেড লাইসেন্স", issuer: "রংপুর সিটি কর্পোরেশন", year: "২০১০ থেকে নবায়নকৃত" },
  { title: "REHAB সদস্যপদ", issuer: "রিয়েল এস্টেট অ্যান্ড হাউজিং অ্যাসোসিয়েশন", year: "সক্রিয় সদস্য" },
  { title: "TIN ও VAT রেজিস্ট্রেশন", issuer: "জাতীয় রাজস্ব বোর্ড", year: "যথাযথ কর প্রদানকারী" },
  { title: "ISO 9001:2015", issuer: "গুণগত মান ব্যবস্থাপনা", year: "সার্টিফায়েড" },
  { title: "পরিবেশ ছাড়পত্র", issuer: "পরিবেশ অধিদপ্তর", year: "সকল প্রকল্প" },
  { title: "ব্যাংক অনুমোদন", issuer: "বাংলাদেশের প্রথম সারির ব্যাংকসমূহ", year: "হোম লোন অনুমোদিত" },
];

export const awards = [
  { year: "২০২৩", title: "বেস্ট রিজিওনাল ডেভেলপার", description: "উত্তরাঞ্চলের সেরা আবাসন উদ্যোক্তা।" },
  { year: "২০২২", title: "কাস্টমার সন্তুষ্টি অ্যাওয়ার্ড", description: "৯৫%+ গ্রাহক সন্তুষ্টির জন্য স্বীকৃতি।" },
  { year: "২০২০", title: "টাইমলি ডেলিভারি রিকগনিশন", description: "প্রতিশ্রুত সময়ে হ্যান্ডওভারের জন্য।" },
  { year: "২০১৮", title: "কোয়ালিটি এক্সিলেন্স", description: "নির্মাণ গুণমানের জন্য শিল্প স্বীকৃতি।" },
];

export const whyChooseUs = [
  { title: "প্রিমিয়াম নির্মাণ", description: "শীর্ষস্থানীয় উপকরণ ও আধুনিক প্রযুক্তির ব্যবহার।" },
  { title: "প্রাইম লোকেশন", description: "রংপুরের সেরা এলাকাগুলোতে আমাদের প্রকল্প।" },
  { title: "মডার্ন আর্কিটেকচার", description: "আন্তর্জাতিক মানের আধুনিক নকশা।" },
  { title: "ফ্লেক্সিবল ইনস্টলমেন্ট", description: "আপনার বাজেট অনুযায়ী কিস্তির সুবিধা।" },
  { title: "সময়মতো হ্যান্ডওভার", description: "প্রতিশ্রুত সময়ে প্রকল্প বুঝিয়ে দেওয়া।" },
  { title: "অভিজ্ঞ প্রকৌশলী", description: "BUET, KUET-এর অভিজ্ঞ ইঞ্জিনিয়ার টিম।" },
  { title: "নিবেদিত কাস্টমার সাপোর্ট", description: "হ্যান্ডওভার-পরবর্তী দীর্ঘমেয়াদী সেবা।" },
];

export const coreValues = [
  { title: "বিশ্বাস", description: "প্রতিটি প্রতিশ্রুতি রক্ষা।" },
  { title: "স্বচ্ছতা", description: "কোনো লুকানো খরচ নেই।" },
  { title: "প্রকৌশল উৎকর্ষ", description: "উচ্চতম মানের নির্মাণ।" },
  { title: "গুণগত মান", description: "শীর্ষস্থানীয় উপকরণ।" },
  { title: "উদ্ভাবন", description: "আধুনিক প্রযুক্তির প্রয়োগ।" },
  { title: "গ্রাহক সন্তুষ্টি", description: "আপনার আনন্দই আমাদের লক্ষ্য।" },
  { title: "দীর্ঘমেয়াদী সম্পর্ক", description: "হ্যান্ডওভারের পরও পাশে।" },
];

export const mediaDownloads = [
  { title: "কোম্পানি প্রোফাইল", description: "Lumen Builders Ltd.-এর সম্পূর্ণ পরিচিতি।", size: "৪.২ MB", type: "PDF" },
  { title: "মাস্টার ব্রোশিওর", description: "সকল চলমান ও আসন্ন প্রকল্পের বিস্তারিত।", size: "৮.৫ MB", type: "PDF" },
  { title: "প্রকল্প ক্যাটালগ ২০২৫", description: "বার্ষিক প্রকল্প ক্যাটালগ।", size: "১২ MB", type: "PDF" },
  { title: "ফ্লোর প্ল্যান কালেকশন", description: "সকল ইউনিটের ফ্লোর প্ল্যান।", size: "৬.৮ MB", type: "PDF" },
];

export const pressReleases = [
  { date: "১৫ জুন, ২০২৫", title: "লুমেন হেরিটেজ ২ প্রকল্পের উদ্বোধন" },
  { date: "১ মে, ২০২৫", title: "REHAB বার্ষিক সম্মেলনে অংশগ্রহণ" },
  { date: "২০ মার্চ, ২০২৫", title: "গ্রাহক সম্মেলন ২০২৫ সফলভাবে সম্পন্ন" },
  { date: "১০ জানুয়ারি, ২০২৫", title: "নতুন বছরে বিশেষ ডিসকাউন্ট অফার ঘোষণা" },
];
