import { useEffect, useState } from "react";
import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "অ্যাডমিন প্যানেল — Lumen Builders" }, { name: "robots", content: "noindex, nofollow" }] }),
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/auth", search: { redirect: location.href, mode: "login" } });
    }
    return { user: data.user };
  },
  component: AdminGate,
});

function AdminGate() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      const roles = (data ?? []).map((r) => r.role);
      const staff = ["super_admin", "admin", "sales_manager", "sales", "content_manager", "support"];
      setStatus(roles.some((r) => staff.includes(r)) ? "ok" : "denied");
    })();
  }, [user.id]);

  if (status === "checking") {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <div className="max-w-md rounded-3xl border border-border bg-white p-8 text-center shadow-lg">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold text-primary">অ্যাক্সেস নেই</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            এই প্যানেল শুধুমাত্র অনুমোদিত স্টাফ সদস্যদের জন্য। অ্যাক্সেসের জন্য প্রশাসকের সাথে যোগাযোগ করুন।
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button onClick={() => navigate({ to: "/" })} variant="outline">হোমে ফিরুন</Button>
            <Button onClick={() => navigate({ to: "/dashboard" })}>গ্রাহক ড্যাশবোর্ড</Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            লগইন: <span className="font-medium">{user.email}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminShell email={user.email}>
      <Outlet />
    </AdminShell>
  );
}
