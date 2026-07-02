// Lead capture core: Zod schemas (Bengali messages), CRM-ready payload,
// Supabase persistence, email-ready structure, local dashboard mirror,
// and utility functions. All submit handlers route through `submitLead()`.

import { z } from "zod";
import { site } from "./site";
import { supabase } from "@/integrations/supabase/client";
import type { Json, Tables } from "@/integrations/supabase/types";

/* ---------- Bengali digits ---------- */
export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

/* ---------- Field-level schemas ---------- */
export const bdPhone = z
  .string({ required_error: "মোবাইল নম্বর আবশ্যক" })
  .trim()
  .regex(/^01[3-9]\d{8}$/, { message: "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (১১ ডিজিট)" });

export const nameField = z
  .string({ required_error: "নাম আবশ্যক" })
  .trim()
  .min(2, { message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে" })
  .max(80, { message: "নাম অনেক বড়" });

export const emailField = z
  .string()
  .trim()
  .email({ message: "সঠিক ইমেইল দিন" })
  .max(120)
  .optional()
  .or(z.literal(""));

export const requiredEmailField = z
  .string({ required_error: "ইমেইল আবশ্যক" })
  .trim()
  .min(1, { message: "ইমেইল আবশ্যক" })
  .email({ message: "সঠিক ইমেইল দিন" })
  .max(120, { message: "ইমেইল অনেক বড়" });

export const messageField = z
  .string()
  .trim()
  .max(1000, { message: "বার্তা সর্বোচ্চ ১০০০ অক্ষর" })
  .optional()
  .or(z.literal(""));

export const sanitizeText = (value: unknown) =>
  String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const honeypotField = z.string().max(0, { message: "স্প্যাম শনাক্ত হয়েছে" }).optional().or(z.literal(""));

const futureDateField = z
  .string({ required_error: "তারিখ নির্বাচন করুন" })
  .min(1, { message: "তারিখ নির্বাচন করুন" })
  .refine((value) => {
    const selected = new Date(`${value}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !Number.isNaN(selected.getTime()) && selected >= today;
  }, { message: "আজ অথবা ভবিষ্যতের তারিখ নির্বাচন করুন" });

function sanitizePayload(data: Record<string, unknown>): Record<string, Json> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === "boolean" || typeof value === "number" || value == null) {
        return [key, value as Json];
      }
      return [key, sanitizeText(value)];
    }),
  );
}

/* ---------- Form schemas ---------- */
export const siteVisitSchema = z.object({
  website: honeypotField,
  name: nameField,
  phone: bdPhone,
  email: requiredEmailField,
  project: z.string().min(1, { message: "প্রকল্প নির্বাচন করুন" }),
  date: futureDateField,
  time: z.string().min(1, { message: "সময় নির্বাচন করুন" }),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  message: messageField,
  contactMethod: z.enum(["phone", "whatsapp", "email"], {
    required_error: "যোগাযোগের মাধ্যম নির্বাচন করুন",
  }),
});
export type SiteVisitInput = z.infer<typeof siteVisitSchema>;

export const bookingSchema = z.object({
  website: honeypotField,
  name: nameField,
  phone: bdPhone,
  email: requiredEmailField,
  project: z.string().min(1, { message: "প্রকল্প নির্বাচন করুন" }),
  size: z.string().min(1, { message: "ফ্ল্যাট সাইজ নির্বাচন করুন" }),
  budget: z.string().min(1, { message: "বাজেট নির্বাচন করুন" }),
  paymentMethod: z.enum(["emi", "full"], { required_error: "পেমেন্ট পদ্ধতি নির্বাচন করুন" }),
  date: futureDateField,
  message: messageField,
  agreed: z.literal(true, {
    errorMap: () => ({ message: "শর্তাবলীতে সম্মতি দিন" }),
  }),
});
export type BookingInput = z.infer<typeof bookingSchema>;

export const callbackSchema = z.object({
  website: honeypotField,
  name: nameField,
  phone: bdPhone,
  time: z.string().min(1, { message: "পছন্দের সময় নির্বাচন করুন" }),
});
export type CallbackInput = z.infer<typeof callbackSchema>;

export const brochureSchema = z.object({
  website: honeypotField,
  name: nameField,
  phone: bdPhone,
  email: requiredEmailField,
  purpose: z.enum(["investment", "living", "business"], {
    required_error: "উদ্দেশ্য নির্বাচন করুন",
  }),
  project: z.string().min(1, { message: "প্রকল্প নির্বাচন করুন" }),
});
export type BrochureInput = z.infer<typeof brochureSchema>;

export const contactSchema = z.object({
  website: honeypotField,
  name: nameField,
  phone: bdPhone,
  email: requiredEmailField,
  subject: z.string().trim().min(3, { message: "বিষয় লিখুন" }).max(120),
  message: z
    .string({ required_error: "বার্তা লিখুন" })
    .trim()
    .min(5, { message: "বার্তা কমপক্ষে ৫ অক্ষরের হতে হবে" })
    .max(1000, { message: "বার্তা সর্বোচ্চ ১০০০ অক্ষর" }),
});
export type ContactInput = z.infer<typeof contactSchema>;

/* ---------- CRM-ready lead payload ---------- */
export type LeadKind =
  | "site-visit"
  | "apartment-booking"
  | "callback"
  | "brochure"
  | "contact";

export type LeadStatus =
  | "pending"
  | "confirmed"
  | "visited"
  | "reserved"
  | "completed"
  | "cancelled";

export interface Lead {
  leadId: string;
  kind: LeadKind;
  createdAt: string;
  status: LeadStatus;
  source: string; // route path
  projectName?: string;
  agent?: string;
  paymentStatus?: "unpaid" | "partial" | "paid";
  data: Record<string, unknown>;
}

type LeadRow = Tables<"leads">;

const STORAGE_KEY = "lumen.leads.v1";
const THROTTLE_KEY = "lumen.leads.throttle.v1";

function readAll(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

function writeAll(leads: Lead[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function generateLeadId(kind: LeadKind) {
  const prefix = {
    "site-visit": "SV",
    "apartment-booking": "BK",
    callback: "CB",
    brochure: "BR",
    contact: "CT",
  }[kind];
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

function readThrottle(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(THROTTLE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function guardSpamSubmission(kind: LeadKind, data: Record<string, Json>) {
  const honeypot = sanitizeText(data.website || data.companyUrl || data.url);
  if (honeypot) {
    throw new Error("স্প্যাম শনাক্ত হয়েছে। অনুগ্রহ করে সঠিকভাবে ফর্মটি পূরণ করুন।");
  }

  const phone = getCustomerPhone(data) || "unknown";
  const key = `${kind}:${phone}`;
  const throttles = readThrottle();
  const last = throttles[key];
  if (last && Date.now() - last < 10_000) {
    throw new Error("আপনি খুব দ্রুত আবার সাবমিট করছেন। অনুগ্রহ করে কয়েক সেকেন্ড পরে চেষ্টা করুন।");
  }
  return key;
}

function markSubmission(key: string) {
  if (typeof window === "undefined") return;
  const throttles = readThrottle();
  throttles[key] = Date.now();
  window.localStorage.setItem(THROTTLE_KEY, JSON.stringify(throttles));
}

function getCustomerName(data: Record<string, unknown>) {
  return sanitizeText(data.name || data.fullName || data.customerName || "Lead Customer");
}

function getCustomerPhone(data: Record<string, unknown>) {
  return sanitizeText(data.phone || data.mobile || data.customerPhone);
}

function getCustomerEmail(data: Record<string, unknown>) {
  const email = sanitizeText(data.email || data.customerEmail);
  return email || null;
}

function getPreferredDate(data: Record<string, unknown>) {
  const date = sanitizeText(data.date || data.preferredDate);
  return date || null;
}

function getPreferredTime(data: Record<string, unknown>) {
  const time = sanitizeText(data.time || data.preferredTime);
  return time || null;
}

function rowToLead(row: LeadRow): Lead {
  return {
    leadId: row.lead_id,
    kind: row.kind as LeadKind,
    createdAt: row.created_at,
    status: row.status as LeadStatus,
    source: row.source,
    projectName: row.project_name ?? undefined,
    agent: row.agent,
    paymentStatus: row.payment_status as Lead["paymentStatus"],
    data: (row.payload as Record<string, unknown>) ?? {},
  };
}

function buildEmailReadyStructure(lead: Lead, data: Record<string, Json>): Json {
  const lines = [
    `Lead ID: ${lead.leadId}`,
    `Timestamp: ${lead.createdAt}`,
    `Type: ${lead.kind}`,
    `Source: ${lead.source}`,
    `Project: ${lead.projectName || "N/A"}`,
    `Name: ${getCustomerName(data)}`,
    `Phone: ${getCustomerPhone(data)}`,
    `Email: ${getCustomerEmail(data) || "N/A"}`,
    `Status: ${lead.status}`,
    "",
    "Submitted Data:",
    JSON.stringify(data, null, 2),
  ];

  return {
    ready: true,
    provider: "pending-integration",
    to: site.contact.email,
    replyTo: getCustomerEmail(data),
    subject: `[${site.name}] নতুন লিড — ${lead.leadId}`,
    text: lines.join("\n"),
  };
}

/**
 * Persist a lead and return the enriched record.
 * Swap this body to POST to a backend / CRM later —
 * all forms funnel through this single helper.
 */
export async function submitLead(input: {
  kind: LeadKind;
  data: Record<string, unknown>;
  source: string;
  projectName?: string;
}): Promise<Lead> {
  const cleanData = sanitizePayload(input.data);
  const throttleKey = guardSpamSubmission(input.kind, cleanData);
  const lead: Lead = {
    leadId: generateLeadId(input.kind),
    kind: input.kind,
    createdAt: new Date().toISOString(),
    status: "pending",
    source: sanitizeText(input.source),
    projectName: sanitizeText(input.projectName),
    agent: "Lumen Sales Team",
    paymentStatus: "unpaid",
    data: cleanData,
  };

  const { error } = await supabase
    .from("leads")
    .insert({
      lead_id: lead.leadId,
      kind: lead.kind,
      status: lead.status,
      payment_status: lead.paymentStatus,
      source: lead.source,
      project_name: lead.projectName || null,
      customer_name: getCustomerName(cleanData),
      customer_phone: getCustomerPhone(cleanData),
      customer_email: getCustomerEmail(cleanData),
      preferred_date: getPreferredDate(cleanData),
      preferred_time: getPreferredTime(cleanData),
      agent: lead.agent,
      payload: {
        ...cleanData,
        crm: {
          leadId: lead.leadId,
          timestamp: lead.createdAt,
          projectName: lead.projectName ?? null,
          source: lead.source,
          status: lead.status,
          emailReady: true,
        },
        email: buildEmailReadyStructure(lead, cleanData),
        security: {
          sanitized: true,
          validation: "zod-client-and-database",
          spamReady: true,
          submittedAt: lead.createdAt,
        },
      },
    });

  if (error) {
    throw new Error("লিড সাবমিট করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
  }

  const all = readAll();
  all.unshift(lead);
  writeAll(all.slice(0, 200));
  markSubmission(throttleKey);
  // Small artificial delay so UI can show loading state cleanly.
  await new Promise((r) => setTimeout(r, 400));
  return lead;
}

/** Lookup by BD phone number (last 11 digits). */
export function getLeadsByPhone(phone: string): Lead[] {
  const p = phone.replace(/\D/g, "").slice(-11);
  return readAll().filter((l) => {
    const stored = String(l.data.phone ?? l.data.mobile ?? l.data.customerPhone ?? "")
      .replace(/\D/g, "")
      .slice(-11);
    return stored === p;
  });
}

/** Lookup dashboard leads from Supabase when policy allows, with local mirror fallback. */
export async function lookupLeadsByPhone(phone: string): Promise<Lead[]> {
  const parsed = bdPhone.safeParse(phone);
  if (!parsed.success) return [];
  const local = getLeadsByPhone(parsed.data);

  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("customer_phone", parsed.data)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) return local;

    const merged = [...data.map(rowToLead), ...local];
    return Array.from(new Map(merged.map((lead) => [lead.leadId, lead])).values());
  } catch {
    return local;
  }
}

/* ---------- Communication helpers ---------- */
const rawPhone = site.contact.phone.replace(/\D/g, "");
export const telHref = `tel:+880${rawPhone.replace(/^0/, "")}`;
export const whatsappNumber = `880${rawPhone.replace(/^0/, "")}`;

export function whatsappHref(message?: string) {
  const text = encodeURIComponent(
    message ?? "আমি Lumen Builders-এর একটি প্রকল্প সম্পর্কে জানতে চাই।"
  );
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}

/* ---------- EMI calculator ---------- */
export function calcEMI(params: {
  price: number;
  downPayment: number;
  interestRate: number; // annual %
  years: number;
  processingFeePct?: number;
}) {
  const principal = Math.max(params.price - params.downPayment, 0);
  const n = Math.max(params.years * 12, 1);
  const r = params.interestRate / 100 / 12;
  const emi =
    r === 0
      ? principal / n
      : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n + params.downPayment;
  const totalInterest = emi * n - principal;
  const processingFee = (principal * (params.processingFeePct ?? 0)) / 100;
  return {
    monthly: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment + processingFee),
    processingFee: Math.round(processingFee),
    principal,
  };
}

/* ---------- Formatters ---------- */
export const bdt = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

export const bdtBn = (n: number) => toBn(bdt(n));

/* ---------- Status labels (BN) ---------- */
export const statusLabels: Record<LeadStatus, { bn: string; tone: string }> = {
  pending: { bn: "অপেক্ষমাণ", tone: "bg-amber-100 text-amber-800 border-amber-200" },
  confirmed: { bn: "নিশ্চিত", tone: "bg-sky-100 text-sky-800 border-sky-200" },
  visited: { bn: "ভিজিট সম্পন্ন", tone: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  reserved: { bn: "রিজার্ভড", tone: "bg-primary/10 text-primary border-primary/20" },
  completed: { bn: "সম্পন্ন", tone: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  cancelled: { bn: "বাতিল", tone: "bg-rose-100 text-rose-800 border-rose-200" },
};
