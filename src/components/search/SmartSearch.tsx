import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Search, Building2, Home, Phone, Calculator, Sparkles, Clock, TrendingUp, FileText, Users } from "lucide-react";
import { projects } from "@/lib/projects-data";
import { primaryNav, secondaryNav } from "@/lib/site";

const RECENT_KEY = "lumen-recent-searches-v1";
const POPULAR = [
  "৩ বেডরুম ফ্ল্যাট",
  "রংপুর প্রকল্প",
  "EMI ক্যালকুলেটর",
  "সাইট ভিজিট",
  "লুমেন গ্যালাক্সি",
];

const QUICK_ACTIONS = [
  { label: "সাইট ভিজিট বুক করুন", to: "/book-visit", icon: Building2 },
  { label: "ফ্ল্যাট বুকিং", to: "/book-apartment", icon: Home },
  { label: "কলব্যাক অনুরোধ", to: "/callback", icon: Phone },
  { label: "EMI ক্যালকুলেটর", to: "/emi-calculator", icon: Calculator },
  { label: "স্মার্ট রেকমেন্ডেশন", to: "/recommend", icon: Sparkles },
  { label: "ব্রোশিওর ডাউনলোড", to: "/brochure", icon: FileText },
  { label: "আমাদের সম্পর্কে", to: "/about", icon: Users },
];

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(q: string) {
  if (typeof window === "undefined" || !q.trim()) return;
  try {
    const list = loadRecent();
    const next = [q, ...list.filter((r) => r !== q)].slice(0, 6);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {}
}

export function SmartSearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="স্মার্ট সার্চ খুলুন"
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/50 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden md:inline">খুঁজুন…</span>
        <kbd className="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground md:inline">⌘K</kbd>
      </button>
      <SmartSearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function SmartSearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    if (open) setRecent(loadRecent());
  }, [open]);

  const go = useCallback(
    (to: string, label?: string) => {
      if (label) saveRecent(label);
      onOpenChange(false);
      setQuery("");
      navigate({ to });
    },
    [navigate, onOpenChange],
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="প্রকল্প, পেজ বা ফিচার খুঁজুন…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>কোনো ফলাফল পাওয়া যায়নি।</CommandEmpty>

        <CommandGroup heading="প্রকল্পসমূহ">
          {projects.map((p) => (
            <CommandItem
              key={p.slug}
              value={`${p.name} ${p.location} ${p.type}`}
              onSelect={() => go(`/projects/${p.slug}`, p.name)}
            >
              <Building2 className="mr-2 h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="font-medium">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.location} · {p.status}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="দ্রুত অ্যাকশন">
          {QUICK_ACTIONS.map((a) => (
            <CommandItem key={a.to} value={a.label} onSelect={() => go(a.to, a.label)}>
              <a.icon className="mr-2 h-4 w-4 text-gold" />
              {a.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="নেভিগেশন">
          {[...primaryNav, ...secondaryNav].map((n) => (
            <CommandItem key={n.to} value={n.label} onSelect={() => go(n.to, n.label)}>
              <Home className="mr-2 h-4 w-4 text-muted-foreground" />
              {n.label}
            </CommandItem>
          ))}
        </CommandGroup>

        {recent.length > 0 && !query && (
          <>
            <CommandSeparator />
            <CommandGroup heading="সাম্প্রতিক সার্চ">
              {recent.map((r) => (
                <CommandItem key={r} value={`recent-${r}`} onSelect={() => setQuery(r)}>
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  {r}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {!query && (
          <>
            <CommandSeparator />
            <CommandGroup heading="জনপ্রিয় সার্চ">
              {POPULAR.map((r) => (
                <CommandItem key={r} value={`pop-${r}`} onSelect={() => setQuery(r)}>
                  <TrendingUp className="mr-2 h-4 w-4 text-secondary" />
                  {r}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
