import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin, Users2 } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LumenHero } from "@/components/ui/lumen-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { CTABanner } from "@/components/ui/cta-banner";
import { corporateImages, leadership, engineeringTeam, type TeamMember } from "@/lib/corporate-data";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "ব্যবস্থাপনা টিম — Lumen Builders Ltd." },
      { name: "description", content: "Lumen Builders Ltd.-এর নেতৃত্ব, প্রকৌশল, সেলস ও কাস্টমার সাপোর্ট টিমের সাথে পরিচিত হোন।" },
      { property: "og:title", content: "ব্যবস্থাপনা টিম — Lumen Builders" },
      { property: "og:description", content: "আমাদের অভিজ্ঞ নেতৃত্ব ও প্রকৌশল টিম।" },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <SiteShell>
      <LumenHero
        image={corporateImages.teamMeeting}
        eyebrow="নেতৃত্ব"
        title="আমাদের অভিজ্ঞ ও নিবেদিত টিম"
        description="প্রতিটি সফল প্রকল্পের পেছনে রয়েছে দক্ষ, অভিজ্ঞ ও প্যাশনেট মানুষদের দল।"
        breadcrumbs={[{ label: "ব্যবস্থাপনা টিম" }]}
      />

      <section className="container-luxury py-20 md:py-28">
        <SectionHeader eyebrow="ব্যবস্থাপনা পর্ষদ" title="আমাদের নেতৃত্ব" align="center" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((m, i) => <MemberCard key={m.name} member={m} index={i} />)}
        </div>
      </section>

      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container-luxury">
          <SectionHeader
            eyebrow="প্রকৌশল ও অপারেশন"
            title="প্রকৌশল, ডিজাইন, সেলস ও সাপোর্ট"
            description="BUET, KUET-এর অভিজ্ঞ প্রকৌশলী ও নিবেদিত কর্মীদের সমন্বয়ে গঠিত।"
            align="center"
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {engineeringTeam.map((m, i) => <MemberCard key={m.name} member={m} index={i} compact />)}
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-[22px] border border-border/60 bg-card p-8 text-center shadow-soft">
            <Users2 className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-3 font-display text-2xl font-bold text-primary">৫০+ নিবেদিত কর্মী</p>
            <p className="mt-2 text-muted-foreground">
              প্রকৌশলী, স্থপতি, সাইট সুপারভাইজার, সেলস, ফাইন্যান্স ও কাস্টমার সাপোর্ট — সবাই আপনার সেবায়।
            </p>
          </div>
        </div>
      </section>

      <div className="pb-24">
        <CTABanner
          title="আমাদের টিমের সাথে সরাসরি কথা বলুন"
          description="যেকোনো প্রশ্ন বা পরামর্শে আমরা প্রস্তুত।"
          primary={{ label: "যোগাযোগ", to: "/contact" }}
          secondary={{ label: "ক্যারিয়ার", to: "/careers" }}
        />
      </div>
    </SiteShell>
  );
}

function MemberCard({ member, index, compact }: { member: TeamMember; index: number; compact?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-soft transition-shadow hover:shadow-card"
    >
      <div className={`relative overflow-hidden ${compact ? "aspect-square" : "aspect-[4/5]"}`}>
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/0 to-transparent opacity-90" aria-hidden />
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-primary opacity-0 shadow-soft transition-opacity group-hover:opacity-100"
            aria-label={`${member.name} on LinkedIn`}
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="font-display text-lg font-bold leading-tight">{member.name}</h3>
          <p className="text-xs font-medium text-gold">{member.position}</p>
        </div>
      </div>
      {!compact && (
        <p className="p-5 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
      )}
    </motion.article>
  );
}
