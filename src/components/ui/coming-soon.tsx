import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function ComingSoon({ label }: { label: string }) {
  return (
    <section className="container-luxury py-24">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-border bg-surface p-12 text-center shadow-soft">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold">
          <Sparkles className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          {label} — শীঘ্রই আসছে
        </h2>
        <p className="mt-3 text-muted-foreground">
          এই পৃষ্ঠাটি বর্তমানে প্রস্তুত করা হচ্ছে। শীঘ্রই সম্পূর্ণ অভিজ্ঞতা উপভোগ করুন।
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="default">
            <Link to="/">হোমে ফিরুন</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">যোগাযোগ করুন</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
