import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, MapPin, Sparkles } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  projects as allProjects,
  uniqueLocations,
  uniqueBuildingTypes,
  bedroomOptions,
  possessionYears,
  type ProjectDetail,
  type ProjectStatus,
} from "@/lib/projects-data";

type Props = {
  title: string;
  description: string;
  eyebrow?: string;
  restrictStatus?: ProjectStatus;
};

const sortOptions = [
  { id: "featured", label: "ফিচার্ড" },
  { id: "price-asc", label: "মূল্য: কম → বেশি" },
  { id: "price-desc", label: "মূল্য: বেশি → কম" },
  { id: "new", label: "নতুন প্রকল্প" },
  { id: "handover", label: "হ্যান্ডওভার দ্রুত" },
] as const;
type SortId = typeof sortOptions[number]["id"];

const statusChoices = ["সব", "চলমান", "সম্পন্ন", "নতুন", "Sold Out"] as const;

function FilterBody(props: {
  query: string; setQuery: (v: string) => void;
  location: string; setLocation: (v: string) => void;
  status: string; setStatus: (v: string) => void;
  bType: string; setBType: (v: string) => void;
  beds: number | null; setBeds: (v: number | null) => void;
  price: [number, number]; setPrice: (v: [number, number]) => void;
  size: [number, number]; setSize: (v: [number, number]) => void;
  year: number | null; setYear: (v: number | null) => void;
  restrictStatus?: ProjectStatus;
  reset: () => void;
}) {
  const {
    query, setQuery, location, setLocation, status, setStatus, bType, setBType,
    beds, setBeds, price, setPrice, size, setSize, year, setYear, restrictStatus, reset,
  } = props;

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">সার্চ</label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="প্রকল্প বা এলাকা…"
            className="pl-9"
            maxLength={80}
          />
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["loc", "status", "price"]} className="space-y-2">
        <AccordionItem value="loc" className="rounded-[14px] border border-border bg-background px-4">
          <AccordionTrigger className="text-sm font-semibold">লোকেশন</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLocation("")}
                className={`rounded-full border px-3 py-1 text-xs transition ${location === "" ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
              >সব</button>
              {uniqueLocations.map((l) => (
                <button key={l} type="button"
                  onClick={() => setLocation(l)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${location === l ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
                >{l}</button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {!restrictStatus && (
          <AccordionItem value="status" className="rounded-[14px] border border-border bg-background px-4">
            <AccordionTrigger className="text-sm font-semibold">প্রকল্প স্ট্যাটাস</AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="flex flex-wrap gap-2">
                {statusChoices.map((s) => (
                  <button key={s} type="button"
                    onClick={() => setStatus(s)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${status === s ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
                  >{s}</button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="price" className="rounded-[14px] border border-border bg-background px-4">
          <AccordionTrigger className="text-sm font-semibold">মূল্য (লাখ)</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>৳ {price[0]}L</span><span>৳ {price[1]}L</span>
            </div>
            <Slider
              value={price} onValueChange={(v) => setPrice(v as [number, number])}
              min={50} max={500} step={5} className="mt-3"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size" className="rounded-[14px] border border-border bg-background px-4">
          <AccordionTrigger className="text-sm font-semibold">অ্যাপার্টমেন্ট সাইজ (sq.ft)</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>{size[0]}</span><span>{size[1]}</span>
            </div>
            <Slider
              value={size} onValueChange={(v) => setSize(v as [number, number])}
              min={1000} max={4000} step={50} className="mt-3"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="beds" className="rounded-[14px] border border-border bg-background px-4">
          <AccordionTrigger className="text-sm font-semibold">বেডরুম</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setBeds(null)}
                className={`rounded-full border px-3 py-1 text-xs transition ${beds === null ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
              >সব</button>
              {bedroomOptions.map((b) => (
                <button key={b} type="button" onClick={() => setBeds(b)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${beds === b ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
                >{b}+ বেড</button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type" className="rounded-[14px] border border-border bg-background px-4">
          <AccordionTrigger className="text-sm font-semibold">নির্মাণ টাইপ</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setBType("")}
                className={`rounded-full border px-3 py-1 text-xs transition ${bType === "" ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
              >সব</button>
              {uniqueBuildingTypes.map((t) => (
                <button key={t} type="button" onClick={() => setBType(t)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${bType === t ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
                >{t}</button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="year" className="rounded-[14px] border border-border bg-background px-4">
          <AccordionTrigger className="text-sm font-semibold">হ্যান্ডওভার সাল</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setYear(null)}
                className={`rounded-full border px-3 py-1 text-xs transition ${year === null ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
              >সব</button>
              {possessionYears.map((y) => (
                <button key={y} type="button" onClick={() => setYear(y)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${year === y ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
                >{y}</button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="outline" onClick={reset} className="w-full">
        <X className="h-4 w-4" /> ফিল্টার রিসেট করুন
      </Button>
    </div>
  );
}

export function ProjectListing({ title, description, eyebrow = "প্রকল্প সমূহ", restrictStatus }: Props) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<string>("সব");
  const [bType, setBType] = useState("");
  const [beds, setBeds] = useState<number | null>(null);
  const [price, setPrice] = useState<[number, number]>([50, 500]);
  const [size, setSize] = useState<[number, number]>([1000, 4000]);
  const [year, setYear] = useState<number | null>(null);
  const [sort, setSort] = useState<SortId>("featured");

  const reset = () => {
    setQuery(""); setLocation(""); setStatus("সব"); setBType("");
    setBeds(null); setPrice([50, 500]); setSize([1000, 4000]); setYear(null);
  };

  const filtered = useMemo(() => {
    let list: ProjectDetail[] = allProjects.slice();
    if (restrictStatus) list = list.filter((p) => p.status === restrictStatus);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    if (location) list = list.filter((p) => p.location === location);
    if (status !== "সব") {
      if (status === "Sold Out" || status === "নতুন") list = list.filter((p) => p.badge === status);
      else list = list.filter((p) => p.status === status);
    }
    if (bType) list = list.filter((p) => p.type === bType);
    if (beds !== null) list = list.filter((p) => p.floorPlans.some((f) => f.beds >= beds));
    if (year !== null) list = list.filter((p) => p.possessionYear === year);
    list = list.filter((p) => {
      const sp = p.startingPriceLakh || 0;
      if (sp === 0) return true;
      return sp >= price[0] && sp <= price[1];
    });
    list = list.filter((p) =>
      p.floorPlans.some((f) => f.sizeNumeric >= size[0] && f.sizeNumeric <= size[1])
    );

    switch (sort) {
      case "price-asc": list.sort((a, b) => (a.startingPriceLakh || 9999) - (b.startingPriceLakh || 9999)); break;
      case "price-desc": list.sort((a, b) => (b.startingPriceLakh || 0) - (a.startingPriceLakh || 0)); break;
      case "new": list.sort((a, b) => b.possessionYear - a.possessionYear); break;
      case "handover": list.sort((a, b) => a.possessionYear - b.possessionYear); break;
    }
    return list;
  }, [query, location, status, bType, beds, price, size, year, sort, restrictStatus]);

  const filterProps = {
    query, setQuery, location, setLocation, status, setStatus, bType, setBType,
    beds, setBeds, price, setPrice, size, setSize, year, setYear, restrictStatus, reset,
  };

  return (
    <section className="bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border bg-primary text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.78 0.15 85 / 0.35), transparent 45%), radial-gradient(circle at 80% 60%, oklch(0.5 0.12 155 / 0.25), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="container-luxury relative py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-gold" /> {allProjects.length}+ প্রিমিয়াম প্রকল্প</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> রংপুর ও উত্তরাঞ্চল</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-luxury flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-primary">{filtered.length}</span> প্রকল্প পাওয়া গেছে
          </p>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> ফিল্টার
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[90%] overflow-y-auto sm:w-[420px]">
                <SheetHeader><SheetTitle>ফিল্টার</SheetTitle></SheetHeader>
                <div className="mt-6"><FilterBody {...filterProps} /></div>
              </SheetContent>
            </Sheet>
            <select
              value={sort} onChange={(e) => setSort(e.target.value as SortId)}
              className="h-9 rounded-[14px] border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-gold"
            >
              {sortOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid + sidebar */}
      <div className="container-luxury grid gap-8 py-10 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-[22px] border border-border bg-surface p-5 shadow-soft">
            <p className="mb-4 text-sm font-bold text-primary">ফিল্টার</p>
            <FilterBody {...filterProps} />
          </div>
        </aside>

        <div className="min-w-0">
          {filtered.length === 0 ? (
            <div className="rounded-[22px] border border-dashed border-border bg-surface p-16 text-center">
              <p className="text-lg font-semibold text-primary">কোনো প্রকল্প পাওয়া যায়নি</p>
              <p className="mt-2 text-sm text-muted-foreground">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
              <Button className="mt-6" onClick={reset}>ফিল্টার রিসেট করুন</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
