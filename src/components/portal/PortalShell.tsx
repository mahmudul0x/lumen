import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, Heart, ClipboardList, FileText, Bell, User as UserIcon,
  GitCompareArrows, BellRing, Calculator, LogOut, Menu, X, Home,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export const portalNav = [
  { to: "/dashboard", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { to: "/dashboard/bookings", label: "আমার বুকিং", icon: ClipboardList },
  { to: "/dashboard/favorites", label: "পছন্দের প্রকল্প", icon: Heart },
  { to: "/dashboard/compare", label: "প্রকল্প তুলনা", icon: GitCompareArrows },
  { to: "/dashboard/documents", label: "ডকুমেন্টস", icon: FileText },
  { to: "/dashboard/notifications", label: "নোটিফিকেশন", icon: Bell },
  { to: "/dashboard/alerts", label: "প্রপার্টি অ্যালার্ট", icon: BellRing },
  { to: "/dashboard/emi-planner", label: "EMI প্ল্যানার", icon: Calculator },
  { to: "/dashboard/profile", label: "আমার প্রোফাইল", icon: UserIcon },
] as const;

export function PortalShell({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const { data: unread = 0 } = useQuery({
    queryKey: ["notif-unread", user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { count } = await supabase.from("notifications").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("read", false);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: "/dashboard", mode: "login" }, replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/"><Logo /></Link>
        <button onClick={() => setMobileOpen(true)} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full border border-border">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 lg:px-8">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-border/60 bg-background p-5 shadow-float transition-transform lg:sticky lg:top-6 lg:z-30 lg:h-[calc(100vh-3rem)] lg:translate-x-0 lg:rounded-[26px] lg:border lg:shadow-card ${mobileOpen ? "flex translate-x-0" : "hidden -translate-x-full lg:flex"}`}>
          <div className="mb-6 flex items-center justify-between">
            <Link to="/"><Logo /></Link>
            <button onClick={() => setMobileOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border lg:hidden">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-5 rounded-2xl bg-gradient-to-br from-primary to-accent p-4 text-white">
            <p className="text-xs uppercase tracking-wider text-gold">স্বাগতম</p>
            <p className="mt-1 truncate font-display text-lg font-bold">{user?.user_metadata?.full_name || user?.email?.split("@")[0] || "গ্রাহক"}</p>
            <p className="mt-0.5 truncate text-xs text-white/75">{user?.email}</p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            {portalNav.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              const showBadge = item.to === "/dashboard/notifications" && unread > 0;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    active ? "bg-primary text-primary-foreground shadow-soft" : "text-foreground/75 hover:bg-muted hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{item.label}</span>
                  {showBadge && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-primary">{unread}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <Button asChild variant="outline" size="sm" className="w-full justify-start"><Link to="/"><Home className="mr-2 h-4 w-4" /> মূল ওয়েবসাইট</Link></Button>
            <Button onClick={handleSignOut} variant="ghost" size="sm" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> লগআউট
            </Button>
          </div>
        </aside>

        {mobileOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />}

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
