import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Building2, CheckCircle2, ArrowRight, Bed, Bath, Maximize,
  Phone, Download, ShieldCheck, Sparkles, MessageCircle, Users, Home, Layers,
  Hospital, School, GraduationCap, Church, ShoppingBag, Bus, Train, Plane, FileText,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/lib/projects-data";
import { site } from "@/lib/site";
import { StatusBadge, ExtraBadge } from "@/components/projects/StatusBadge";
import { GalleryLightbox } from "@/components/projects/GalleryLightbox";
import { EMICalculator } from "@/components/projects/EMICalculator";
import { SiteVisitForm } from "@/components/projects/SiteVisitForm";
import { ProjectCard } from "@/components/ui/project-card";

const nearbyIcon: Record<string, typeof Hospital> = {
  "হাসপাতাল": Hospital, "স্কুল": School, "বিশ্ববিদ্যালয়": GraduationCap,
  "মসজিদ": Church, "মার্কেট": ShoppingBag, "বাস স্ট্যান্ড": Bus,
  "রেলওয়ে": Train, "এয়ারপোর্ট": Plane,
};

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) return { meta: [{ title: "প্রকল্প পাওয়া যায়নি" }] };
    const title = `${p.name} — ${p.tagline} | Lumen Builders`;
    const desc = p.overview.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} — Lumen Builders` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.image },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/projects/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Residence",
            name: p.name,
            description: p.overview,
            image: [p.image],
            address: {
              "@type": "PostalAddress",
              streetAddress: p.address,
              addressLocality: p.city,
              addressCountry: "BD",
            },
            geo: { "@type": "GeoCoordinates", latitude: p.mapLat, longitude: p.mapLng },
            numberOfRooms: p.floorPlans[0]?.beds,
            floorSize: { "@type": "QuantitativeValue", value: p.floorPlans[0]?.sizeNumeric, unitCode: "FTK" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "হোম", item: "/" },
              { "@type": "ListItem", position: 2, name: "প্রকল্প", item: "/projects" },
              { "@type": "ListItem", position: 3, name: p.name, item: `/projects/${p.slug}` },
            ],
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-luxury py-32 text-center">
        <h1 className="text-3xl font-bold">প্রকল্প পাওয়া যায়নি</h1>
        <Button asChild className="mt-6" variant="gold">
          <Link to="/projects">সকল প্রকল্প দেখুন</Link>
        </Button>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ reset }) => (
    <SiteShell>
      <div className="container-luxury py-32 text-center">
        <h1 className="text-2xl font-bold">সমস্যা হয়েছে</h1>
        <Button className="mt-6" onClick={reset}>আবার চেষ্টা করুন</Button>
      </div>
    </SiteShell>
  ),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project: p } = Route.useLoaderData() as { project: import("@/lib/projects-data").ProjectDetail };
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 3);
  const waMsg = encodeURIComponent(`আসসালামু আলাইকুম, ${p.name} সম্পর্কে জানতে চাই।`);
  const waUrl = `https://wa.me/${site.contact.phone.replace(/\D/g, "")}?text=${waMsg}`;

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </div>
        <div className="container-luxury flex min-h-[85vh] flex-col justify-end pb-16 pt-32 text-white">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link to="/" className="hover:text-white">হোম</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-white">প্রকল্প</Link>
            <span>/</span>
            <span className="text-white">{p.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={p.status} />
            {p.badge && <ExtraBadge badge={p.badge} />}
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
              {p.type}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-5 max-w-4xl text-balance text-4xl font-bold leading-[1.05] md:text-6xl"
          >{p.name}</motion.h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{p.tagline}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <MetaTile icon={MapPin} label="লোকেশন" value={p.location} />
            <MetaTile icon={Calendar} label="হ্যান্ডওভার" value={p.handover} />
            <MetaTile icon={Building2} label="মোট ইউনিট" value={`${p.totalUnits}টি`} />
            <MetaTile icon={Sparkles} label="শুরুর মূল্য" value={p.startingPrice} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl">
              <Link to="/book-visit">এখনই বুক করুন <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-primary">
              <Link to="/brochure"><Download className="h-4 w-4" /> ব্রোশিওর</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-emerald-400/60 bg-emerald-500/10 text-white hover:bg-emerald-500 hover:text-white">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* OVERVIEW + PROGRESS */}
      <section className="container-luxury grid gap-12 py-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">প্রকল্প পরিচিতি</p>
          <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">{p.name} সম্পর্কে</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{p.overview}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                <span className="text-sm font-medium text-foreground">{h}</span>
              </div>
            ))}
          </div>

          {/* Overview grid */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "ডেভেলপার", value: p.developer, icon: ShieldCheck },
              { label: "লোকেশন", value: p.location, icon: MapPin },
              { label: "জমির সাইজ", value: p.landSize, icon: Home },
              { label: "বিল্ডিং টাইপ", value: p.buildingType, icon: Building2 },
              { label: "মোট তলা", value: `${p.totalFloors} তলা`, icon: Layers },
              { label: "মোট ইউনিট", value: `${p.totalUnits}টি`, icon: Users },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-surface p-5">
                <s.icon className="h-5 w-5 text-gold" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-base font-bold text-primary">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[22px] border border-border bg-surface p-6 shadow-soft lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">নির্মাণ অগ্রগতি</p>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-4xl font-bold text-primary">{p.progress}%</span>
            <span className="text-sm text-muted-foreground">সম্পন্ন</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-surface-strong">
            <div className="h-full rounded-full bg-gradient-to-r from-gold to-primary" style={{ width: `${p.progress}%` }} />
          </div>
          <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
            <Row k="স্ট্যাটাস" v={p.status} />
            <Row k="হ্যান্ডওভার" v={p.handover} />
            <Row k="শুরুর মূল্য" v={p.startingPrice} />
            <Row k="ঠিকানা" v={p.address} />
          </div>
          <Button asChild variant="gold" className="mt-6 w-full">
            <a href={`tel:${site.contact.phone}`}><Phone className="h-4 w-4" /> এখনই কল করুন</a>
          </Button>
          <Button asChild variant="outline" className="mt-3 w-full">
            <Link to="/book-visit"><Calendar className="h-4 w-4" /> সাইট ভিজিট</Link>
          </Button>
        </aside>
      </section>

      {/* GALLERY */}
      <section className="border-y border-border bg-surface-strong/40">
        <div className="container-luxury py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">গ্যালারি</p>
          <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">প্রকল্পের দৃশ্য</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">এক্সটেরিয়র, ইন্টেরিয়র, নির্মাণ অগ্রগতি ও হ্যান্ডওভার — যেকোনো ছবিতে ক্লিক করে বড় করে দেখুন।</p>
          <div className="mt-8">
            <GalleryLightbox images={p.gallery} alt={p.name} />
          </div>
        </div>
      </section>

      {/* APARTMENT INFO */}
      <section className="container-luxury py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">অ্যাপার্টমেন্ট ইনফরমেশন</p>
        <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">প্রতিটি ইউনিটে যা পাচ্ছেন</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.apartmentInfo.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-1.5 text-base font-bold text-primary">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AMENITIES */}
      <section className="bg-surface-strong/40 border-y border-border">
        <div className="container-luxury py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">অ্যামিনিটিজ</p>
          <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">প্রিমিয়াম সুবিধাসমূহ</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {p.amenities.map((a) => (
              <div key={a} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition hover:shadow-soft">
                <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-gold/15 text-gold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-foreground">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOOR PLANS */}
      <section className="container-luxury py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">ফ্লোর প্ল্যান</p>
        <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">ইউনিট ও মূল্য</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {p.floorPlans.map((f) => (
            <div key={f.id} className="group overflow-hidden rounded-[22px] border border-border bg-surface shadow-soft transition hover:shadow-float">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
                <img src={f.planImage} alt={f.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {!f.available && (
                  <span className="absolute right-3 top-3 rounded-full bg-red-600/95 px-3 py-1 text-[11px] font-semibold text-white">Sold Out</span>
                )}
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">{f.name.split("—")[0]}</p>
                <h3 className="mt-2 text-xl font-bold text-primary">{f.name}</h3>
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4" /> {f.size}</span>
                  <span className="flex items-center gap-1.5"><Bed className="h-4 w-4" /> {f.beds} বেড</span>
                  <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" /> {f.baths} বাথ</span>
                </div>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="text-xs text-muted-foreground">মূল্য</p>
                  <p className="mt-1 text-xl font-bold text-primary">{f.price}</p>
                </div>
                <div className="mt-5 flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/projects/$slug/flats/$flat" params={{ slug: p.slug, flat: f.id }}>
                      বিস্তারিত
                    </Link>
                  </Button>
                  {f.available && (
                    <Button asChild variant="luxury" className="flex-1">
                      <Link to="/book-apartment">বুক করুন</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONSTRUCTION PROGRESS */}
      <section className="bg-surface-strong/40 border-y border-border">
        <div className="container-luxury py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">নির্মাণ অগ্রগতি</p>
          <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">প্রকল্পের বর্তমান পর্যায়</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.progressStages.map((st, i) => (
              <div key={st.label} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold">ধাপ {i + 1}</span>
                  {st.done && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </div>
                <p className="mt-2 text-lg font-bold text-primary">{st.label}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-strong">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold to-primary transition-[width] duration-700"
                    style={{ width: `${Math.round(st.percent)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{Math.round(st.percent)}% সম্পন্ন</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION MAP */}
      <section className="container-luxury py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">লোকেশন</p>
        <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">প্রকল্পের ঠিকানা</h2>
        <p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> {p.address}</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="overflow-hidden rounded-[24px] border border-border shadow-soft">
            <iframe
              src={p.mapEmbed}
              className="h-[420px] w-full"
              loading="lazy"
              title={`${p.name} map`}
            />
          </div>
          <div className="rounded-[22px] border border-border bg-surface p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">অফিস ঠিকানা</p>
            <p className="mt-2 text-lg font-bold text-primary">{site.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {site.contact.address.line1}<br />
              {site.contact.address.line2}<br />
              {site.contact.address.line3}
            </p>
            <Button asChild variant="outline" className="mt-5 w-full">
              <a href={`tel:${site.contact.phone}`}><Phone className="h-4 w-4" /> {site.contact.phone}</a>
            </Button>
          </div>
        </div>

        {/* NEARBY */}
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">আশেপাশে</p>
          <h3 className="mt-2 text-2xl font-bold text-primary md:text-3xl">কাছাকাছি সুবিধাসমূহ</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {p.nearby.map((n) => {
              const Icon = nearbyIcon[n.category] ?? MapPin;
              return (
                <div key={n.name} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">{n.category}</p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-foreground">{n.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{n.distance}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMI + BROCHURE */}
      <section className="bg-surface-strong/40 border-y border-border">
        <div className="container-luxury grid gap-8 py-20 lg:grid-cols-[minmax(0,1fr)_360px]">
          <EMICalculator defaultPriceLakh={p.startingPriceLakh || 125} />

          <div className="rounded-[22px] border border-border bg-primary p-8 text-white">
            <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-gold text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">ব্রোশিওর ডাউনলোড</h3>
            <p className="mt-2 text-sm text-white/75">
              সম্পূর্ণ প্রজেক্ট ইনফরমেশন, ফ্লোর প্ল্যান, প্রাইস চার্ট ও কন্টাক্ট বিস্তারিত — একটি PDF-এ।
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> সম্পূর্ণ প্রজেক্ট বিস্তারিত</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> সব ফ্লোর প্ল্যান</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> মূল্য ও পেমেন্ট শিডিউল</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> কন্টাক্ট ডিটেইলস</li>
            </ul>
            <Button asChild variant="gold" size="lg" className="mt-6 w-full">
              <Link to="/brochure"><Download className="h-4 w-4" /> ব্রোশিওর ডাউনলোড</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* BOOK SITE VISIT */}
      <section className="container-luxury py-20">
        <SiteVisitForm projectName={p.name} />
      </section>

      {/* RELATED PROJECTS */}
      <section className="bg-surface-strong/40 border-y border-border">
        <div className="container-luxury py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">রিলেটেড প্রকল্প</p>
          <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">আপনার আরও পছন্দ হতে পারে</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((o) => (<ProjectCard key={o.slug} project={o} />))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline"><Link to="/projects">সকল প্রকল্প দেখুন <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-20 text-white">
        <div className="container-luxury text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">আজই আপনার স্বপ্নের ফ্ল্যাট বুক করুন</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            আজই সাইট ভিজিট বুক করুন — আমাদের এক্সপার্ট আপনাকে {p.name} প্রকল্পের সম্পূর্ণ বিস্তারিত জানাবে।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="xl">
              <a href={`tel:${site.contact.phone}`}><Phone className="h-4 w-4" /> কল করুন</a>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-emerald-400/60 bg-emerald-500/10 text-white hover:bg-emerald-500 hover:text-white">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Messenger / যোগাযোগ</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function MetaTile({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
      <Icon className="h-4 w-4 text-gold" />
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-white/60">{label}</p>
      <p className="mt-1 truncate text-sm font-bold">{value}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right font-semibold">{v}</span>
    </div>
  );
}
