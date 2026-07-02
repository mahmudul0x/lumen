import { Link } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle, MessagesSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { telHref, whatsappHref } from "@/lib/leads";
import { site } from "@/lib/site";

/**
 * Mobile-first sticky bottom CTA bar (page-level, opt-in).
 * Drop into any high-intent page above the Footer.
 */
export function StickyLeadBar({ projectName }: { projectName?: string }) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-border/60 bg-background/95 shadow-float backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-4 gap-2 p-3">
        <Button asChild variant="outline" size="sm" className="h-12 w-full flex-col gap-0.5 px-2 text-[11px]">
          <a href={telHref}>
            <Phone className="h-4 w-4" /> কল
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="h-12 w-full flex-col gap-0.5 px-2 text-[11px]">
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="h-12 w-full flex-col gap-0.5 px-2 text-[11px]">
          <a href={site.social.messenger} target="_blank" rel="noopener noreferrer">
            <MessagesSquare className="h-4 w-4" /> Messenger
          </a>
        </Button>
        <Button asChild variant="gold" size="sm" className="h-12 w-full flex-col gap-0.5 px-2 text-[11px]">
          <Link to="/book-visit" search={projectName ? ({ project: projectName } as never) : undefined}>
            <CalendarCheck className="h-4 w-4" /> বুকিং
          </Link>
        </Button>
      </div>
    </div>
  );
}
