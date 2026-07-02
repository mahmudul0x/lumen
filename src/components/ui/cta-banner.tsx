import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
};

export function CTABanner({ title, description, primary, secondary }: Props) {
  return (
    <section className="container-luxury">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-primary p-10 text-primary-foreground shadow-float md:p-16">
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl"
          aria-hidden
        />
        <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <h3 className="text-balance text-3xl font-bold leading-tight md:text-4xl">
              {title}
            </h3>
            {description && (
              <p className="mt-4 max-w-xl text-white/80 md:text-lg">{description}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {primary && (
              <Button asChild variant="gold" size="lg">
                <Link to={primary.to}>{primary.label}</Link>
              </Button>
            )}
            {secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"
              >
                <Link to={secondary.to}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
