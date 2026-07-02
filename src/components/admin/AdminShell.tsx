import { useEffect, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Menu, X, LogOut, Search, ExternalLink, Home } from "lucide-react";
import { adminNav, groupOrder } from "@/lib/admin/nav";
import { Logo } from "@/components/brand/Logo";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminShell({ children, email }: { children: React.ReactNode; email?: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => { setOpen(false); }, [pathname]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: "/admin", mode: "login" } });
  };

  const isActive = (to: string) => to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-slate-50 text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-white shadow-xl transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link to="/admin"><Logo /></Link>
          <button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[calc(100vh-4rem)] flex-col">
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {groupOrder.map((group) => (
              <div key={group} className="mb-5">
                <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group}
                </div>
                <ul className="space-y-0.5">
                  {adminNav.filter((i) => i.group === group).map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.to);
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                            active
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "text-foreground/70 hover:bg-slate-100 hover:text-foreground"
                          )}
                        >
                          <Icon className="h-[18px] w-[18px] shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <div className="mb-3 rounded-2xl bg-slate-100 p-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">লগইন</p>
              <p className="mt-0.5 truncate text-sm font-medium">{email ?? "—"}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/"><Home className="mr-1.5 h-3.5 w-3.5" /> সাইট</Link>
              </Button>
              <Button onClick={signOut} variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">
                <LogOut className="mr-1.5 h-3.5 w-3.5" /> সাইনআউট
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-white/90 px-4 backdrop-blur lg:px-8">
          <button onClick={() => setOpen(true)} className="lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex flex-1 items-center gap-2">
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="খুঁজুন — প্রকল্প, লিড, গ্রাহক..."
                className="h-10 w-full rounded-xl border border-border bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-primary focus:bg-white"
              />
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href="/" target="_blank" rel="noreferrer"><ExternalLink className="mr-1.5 h-3.5 w-3.5" /> সাইট দেখুন</a>
          </Button>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
