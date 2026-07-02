import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AuthProvider } from "@/hooks/useAuth";
import { PortalShell } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/auth", search: { redirect: location.href, mode: "login" } });
    }
    return { user: data.user };
  },
  component: () => (
    <AuthProvider>
      <PortalShell>
        <Outlet />
      </PortalShell>
    </AuthProvider>
  ),
});
