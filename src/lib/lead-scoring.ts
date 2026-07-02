// AI Lead Scoring — deterministic heuristic scoring for CRM.
// Categorizes leads as Hot / Warm / Cold based on signals.

export type LeadSignal = {
  type: "site_visit" | "book_apartment" | "callback" | "brochure" | "contact" | string;
  budgetLakh?: number;
  whatsappClick?: boolean;
  projectViews?: number;
  bookingInterest?: boolean;
  createdAt?: string | Date;
};

export type LeadScore = {
  score: number;                     // 0 - 100
  tier: "hot" | "warm" | "cold";
  tierLabel: "হট লিড" | "ওয়ার্ম লিড" | "কোল্ড লিড";
  color: string;                     // Tailwind class
  reasons: string[];
};

export function scoreLead(signal: LeadSignal): LeadScore {
  let score = 20;
  const reasons: string[] = [];

  // Intent by lead type
  const intent: Record<string, number> = {
    book_apartment: 45,
    site_visit: 35,
    callback: 20,
    brochure: 15,
    contact: 10,
  };
  const intentBoost = intent[signal.type] ?? 10;
  score += intentBoost;
  reasons.push(`ইনটেন্ট: +${intentBoost}`);

  // Budget signal
  if (signal.budgetLakh && signal.budgetLakh > 0) {
    const boost = signal.budgetLakh >= 80 ? 20 : signal.budgetLakh >= 50 ? 12 : 6;
    score += boost;
    reasons.push(`বাজেট (${signal.budgetLakh} লাখ): +${boost}`);
  }

  // Engagement signals
  if (signal.whatsappClick) { score += 8; reasons.push("WhatsApp ক্লিক: +8"); }
  if (signal.bookingInterest) { score += 10; reasons.push("বুকিং আগ্রহ: +10"); }
  if (signal.projectViews && signal.projectViews > 0) {
    const boost = Math.min(15, signal.projectViews * 3);
    score += boost;
    reasons.push(`প্রকল্প ভিউ (${signal.projectViews}): +${boost}`);
  }

  // Recency decay — leads older than 14 days lose points
  if (signal.createdAt) {
    const days = (Date.now() - new Date(signal.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (days > 30) { score -= 15; reasons.push("৩০+ দিন পুরনো: -15"); }
    else if (days > 14) { score -= 8; reasons.push("১৪+ দিন পুরনো: -8"); }
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  const tier: LeadScore["tier"] = score >= 70 ? "hot" : score >= 45 ? "warm" : "cold";
  const map = {
    hot:  { tierLabel: "হট লিড"    as const, color: "bg-red-500/10 text-red-600 border-red-500/30" },
    warm: { tierLabel: "ওয়ার্ম লিড" as const, color: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
    cold: { tierLabel: "কোল্ড লিড"  as const, color: "bg-sky-500/10 text-sky-600 border-sky-500/30" },
  };
  return { score, tier, tierLabel: map[tier].tierLabel, color: map[tier].color, reasons };
}
