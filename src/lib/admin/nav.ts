import {
  LayoutDashboard, Building2, Home, Image as ImageIcon, Video, Newspaper,
  Users, Calendar, ClipboardList, PhoneCall, CreditCard, Star, UserCog,
  Briefcase, Mail, Send, Megaphone, Bell, BarChart3, Settings, Shield,
  Boxes, FileBarChart, Target, MapPin, Search, ScrollText,
} from "lucide-react";

export type AdminNavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  group: string;
};

export const adminNav: AdminNavItem[] = [
  { to: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard, group: "ওভারভিউ" },
  { to: "/admin/analytics", label: "এনালিটিক্স", icon: BarChart3, group: "ওভারভিউ" },
  { to: "/admin/calendar", label: "ক্যালেন্ডার", icon: Calendar, group: "ওভারভিউ" },
  { to: "/admin/reports", label: "রিপোর্ট ও এক্সপোর্ট", icon: FileBarChart, group: "ওভারভিউ" },

  { to: "/admin/projects", label: "প্রকল্প", icon: Building2, group: "কন্টেন্ট" },
  { to: "/admin/apartments", label: "অ্যাপার্টমেন্ট", icon: Home, group: "কন্টেন্ট" },
  { to: "/admin/inventory", label: "ইনভেন্টরি", icon: Boxes, group: "কন্টেন্ট" },
  { to: "/admin/media", label: "মিডিয়া লাইব্রেরি", icon: ImageIcon, group: "কন্টেন্ট" },
  { to: "/admin/gallery", label: "গ্যালারি", icon: ImageIcon, group: "কন্টেন্ট" },
  { to: "/admin/videos", label: "ভিডিও", icon: Video, group: "কন্টেন্ট" },
  { to: "/admin/blog", label: "ব্লগ", icon: Newspaper, group: "কন্টেন্ট" },
  { to: "/admin/announcements", label: "ঘোষণা", icon: Megaphone, group: "কন্টেন্ট" },

  { to: "/admin/leads", label: "লিড CRM", icon: PhoneCall, group: "সেলস" },
  { to: "/admin/site-visits", label: "সাইট ভিজিট", icon: Calendar, group: "সেলস" },
  { to: "/admin/bookings", label: "বুকিং", icon: ClipboardList, group: "সেলস" },
  { to: "/admin/payments", label: "পেমেন্ট", icon: CreditCard, group: "সেলস" },
  { to: "/admin/customers", label: "গ্রাহক", icon: Users, group: "সেলস" },
  { to: "/admin/reviews", label: "রিভিউ", icon: Star, group: "সেলস" },
  { to: "/admin/marketing", label: "মার্কেটিং", icon: Target, group: "সেলস" },

  { to: "/admin/messages", label: "যোগাযোগ", icon: Mail, group: "কমিউনিকেশন" },
  { to: "/admin/newsletter", label: "নিউজলেটার", icon: Send, group: "কমিউনিকেশন" },
  { to: "/admin/notifications", label: "নোটিফিকেশন", icon: Bell, group: "কমিউনিকেশন" },

  { to: "/admin/team", label: "টিম", icon: UserCog, group: "প্রশাসন" },
  { to: "/admin/branches", label: "শাখা", icon: MapPin, group: "প্রশাসন" },
  { to: "/admin/careers", label: "ক্যারিয়ার", icon: Briefcase, group: "প্রশাসন" },
  { to: "/admin/seo", label: "SEO প্যানেল", icon: Search, group: "প্রশাসন" },
  { to: "/admin/audit", label: "অডিট লগ", icon: ScrollText, group: "প্রশাসন" },
  { to: "/admin/settings", label: "ওয়েবসাইট সেটিংস", icon: Settings, group: "প্রশাসন" },
  { to: "/admin/roles", label: "রোল ও পারমিশন", icon: Shield, group: "প্রশাসন" },
];

export const groupOrder = ["ওভারভিউ", "কন্টেন্ট", "সেলস", "কমিউনিকেশন", "প্রশাসন"];
