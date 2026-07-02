import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  MapPin, Calendar, ArrowLeft, Bed, Bath, Maximize, Home, Phone,
  Download, CheckCircle2, Sparkles,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { getFloorPlan } from "@/lib/projects-data";
import { GalleryLightbox } from "@/components/projects/GalleryLightbox";
import { EMICalculator } from "@/components/projects/EMICalculator";
import { SiteVisitForm } from "@/components/projects/SiteVisitForm";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { site } from "@/lib/site";

export const Route = createFileRoute("/projects/$slug/flats/$flat")({
  head: ({ params }) => {
    const r = getFloorPlan(params.slug, params.flat);
    if (!r) return { meta: [{ title: "ফ্ল্যাট পাওয়া যায়নি" }] };
    const { project, plan } = r;
    return {
      meta: [
        { title: `${plan.name} — ${project.name} | Lumen Builders` },
        { name: "description", content: `${project.name} প্রকল্পের ${plan.name} — ${plan.size}, ${plan.beds} বেড, মূল্য ${plan.price}.` },
        { property: "og:title", content: `${plan.name} — ${project.name}` },
        { property: "og:description", content: `${plan.size} • ${plan.beds} বেড • ${plan.baths} বাথ` },
        { property: "og:image", content: plan.planImage },
        { property: "og:url", content: `/projects/${project.slug}/flats/${plan.id}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${project.slug}/flats/${plan.id}` }],
    };
  },
  loader: ({ params }) => {
    const r = getFloorPlan(params.slug, params.flat);
    if (!r) throw notFound();
    return r;
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-luxury py-32 text-center">
        <h1 className="text-3xl font-bold">ফ্ল্যাট পাওয়া যায়নি</h1>
        <Button asChild className="mt-6" variant="gold"><Link to="/projects">সকল প্রকল্প</Link></Button>
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
  component: FlatDetailPage,
});

function FlatDetailPage() {
  const { project: p, plan: f } = Route.useLoaderData() as NonNullable<ReturnType<typeof import("@/lib/projects-data").getFloorPlan>>;

  return (
    <SiteShell>
      {/* Breadcrumbs + header */}
      <section className="border-b border-border bg-surface">
        <div className="container-luxury py-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">হোম</Link><span>/</span>
            <Link to="/projects" className="hover:text-primary">প্রকল্প</Link><span>/</span>
            <Link to="/projects/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.name}</Link>
            <span>/</span>
            <span className="text-primary">{f.name}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={p.status} />
                {!f.available && <span className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-semibold text-white">Sold Out</span>}
              </div>
              <h1 className="mt-3 text-3xl font-bold text-primary md:text-4xl">{f.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                <Home className="h-4 w-4" /> {p.name} <span>•</span>
                <MapPin className="h-4 w-4" /> {p.location}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/projects/$slug" params={{ slug: p.slug }}>
                <ArrowLeft className="h-4 w-4" /> প্রকল্পে ফিরুন
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="container-luxury grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-10">
          <div className="overflow-hidden rounded-[24px] border border-border bg-surface shadow-soft">
            <img src={f.planImage} alt={f.name} className="w-full object-cover" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "সাইজ", value: f.size, icon: Maximize },
              { label: "বেডরুম", value: `${f.beds}টি`, icon: Bed },
              { label: "বাথরুম", value: `${f.baths}টি`, icon: Bath },
              { label: "বারান্দা", value: `${f.balconies}টি`, icon: Sparkles },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-surface p-5">
                <s.icon className="h-5 w-5 text-gold" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-lg font-bold text-primary">{s.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">ফ্ল্যাটের বৈশিষ্ট্য</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">এই ইউনিটে যা পাচ্ছেন</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.apartmentInfo.map((s) => (
                <div key={s.label} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">{s.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-foreground">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">অ্যামিনিটিজ</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">প্রকল্পের সুবিধাসমূহ</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="text-sm font-semibold text-foreground">{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">প্রকল্প গ্যালারি</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">দৃশ্যাবলি</h2>
            <div className="mt-6"><GalleryLightbox images={p.gallery} alt={p.name} /></div>
          </div>

          <EMICalculator defaultPriceLakh={f.priceLakh || 125} />

          <SiteVisitForm projectName={`${p.name} — ${f.name}`} />
        </div>

        {/* Sticky price sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[22px] border border-border bg-surface p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">মূল্য</p>
            <p className="mt-2 text-3xl font-bold text-primary">{f.price}</p>
            <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <Row k="প্রকল্প" v={p.name} />
              <Row k="ইউনিট টাইপ" v={f.name} />
              <Row k="সাইজ" v={f.size} />
              <Row k="হ্যান্ডওভার" v={p.handover} />
              <Row k="স্ট্যাটাস" v={f.available ? "বুকিং চলছে" : "Sold Out"} />
            </div>
            {f.available ? (
              <Button asChild variant="gold" size="lg" className="mt-6 w-full">
                <Link to="/book-apartment">এখনই বুক করুন</Link>
              </Button>
            ) : (
              <Button disabled variant="outline" size="lg" className="mt-6 w-full">Sold Out</Button>
            )}
            <Button asChild variant="outline" className="mt-3 w-full">
              <a href={`tel:${site.contact.phone}`}><Phone className="h-4 w-4" /> কল করুন</a>
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link to="/brochure"><Download className="h-4 w-4" /> ব্রোশিওর</Link>
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link to="/book-visit"><Calendar className="h-4 w-4" /> সাইট ভিজিট</Link>
            </Button>
          </div>
        </aside>
      </section>
    </SiteShell>
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
