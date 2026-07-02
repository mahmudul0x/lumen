import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart, Trash2, Eye, GitCompareArrows, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { projects, getProject } from "@/lib/projects-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/favorites")({
  head: () => ({ meta: [{ title: "পছন্দের প্রকল্প — Lumen Builders" }, { name: "robots", content: "noindex" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: favs = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("favorites").select("*").eq("user_id", user!.id).order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  const removeMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("favorites").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["favorites"] }); toast.success("সরানো হয়েছে"); },
  });

  const addMut = useMutation({
    mutationFn: async (slug: string) => {
      const { error } = await supabase.from("favorites").insert({ user_id: user!.id, project_slug: slug });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["favorites"] }); toast.success("যুক্ত হয়েছে"); },
  });

  const savedSlugs = new Set(favs.map((f) => f.project_slug));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">পছন্দের প্রকল্প</h1>
        <p className="mt-2 text-muted-foreground">আপনার সংরক্ষিত প্রকল্প — তুলনা করুন, বিস্তারিত দেখুন বা বুকিং করুন।</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      ) : favs.length === 0 ? (
        <div className="rounded-[26px] border-2 border-dashed border-border bg-card py-16 text-center">
          <Heart className="mx-auto h-14 w-14 text-muted-foreground/50" />
          <p className="mt-4 font-display text-lg font-semibold text-primary">এখনো পছন্দের প্রকল্প নেই</p>
          <p className="mt-1 text-sm text-muted-foreground">নীচ থেকে যেকোনো প্রকল্প যোগ করুন।</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {favs.map((f, i) => {
            const p = getProject(f.project_slug);
            if (!p) return null;
            return (
              <motion.div key={f.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-soft">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button onClick={() => removeMut.mutate(f.id)} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-destructive shadow-soft transition-transform hover:scale-110" aria-label="সরান">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-primary">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.location}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link to="/projects/$slug" params={{ slug: p.slug }} className="flex items-center justify-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><Eye className="h-3 w-3" /> বিস্তারিত</Link>
                    <Link to="/dashboard/compare" search={{ slugs: p.slug }} className="flex items-center justify-center gap-1 rounded-full bg-gold px-3 py-2 text-xs font-semibold text-primary"><GitCompareArrows className="h-3 w-3" /> তুলনা</Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add from all projects */}
      <div className="rounded-[26px] border border-border/60 bg-card p-6 shadow-soft">
        <h2 className="font-display text-xl font-bold text-primary">আরও প্রকল্প যোগ করুন</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.filter((p) => !savedSlugs.has(p.slug)).map((p) => (
            <div key={p.slug} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3">
              <img src={p.image} alt={p.name} loading="lazy" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">{p.location}</p>
              </div>
              <button onClick={() => addMut.mutate(p.slug)} className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold hover:bg-gold hover:text-primary" aria-label="যোগ করুন">
                <Heart className="h-4 w-4" />
              </button>
            </div>
          ))}
          {projects.every((p) => savedSlugs.has(p.slug)) && <p className="text-sm text-muted-foreground">সব প্রকল্প ইতিমধ্যে যুক্ত।</p>}
        </div>
      </div>
    </div>
  );
}
