import { useState } from "react";
import { Facebook, Linkedin, Mail, MessageCircle, Send, Share2, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  url?: string;
  title?: string;
  className?: string;
};

export function SocialShare({ url, title = "Lumen Builders Ltd.", className }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? (url ?? window.location.href) : (url ?? "");
  const encoded = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, icon: Facebook, color: "hover:text-[#1877F2]" },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encoded}`, icon: MessageCircle, color: "hover:text-[#25D366]" },
    { name: "Messenger", href: `https://www.facebook.com/dialog/send?link=${encoded}&app_id=291494419107518&redirect_uri=${encoded}`, icon: Send, color: "hover:text-[#0084FF]" },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, icon: Linkedin, color: "hover:text-[#0A66C2]" },
    { name: "Email", href: `mailto:?subject=${encodedTitle}&body=${encoded}`, icon: Mail, color: "hover:text-primary" },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className={cn("inline-flex flex-wrap items-center gap-2 rounded-[18px] border border-border bg-card px-3 py-2 shadow-sm", className)}>
      <span className="mr-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Share2 className="h-3.5 w-3.5" /> শেয়ার করুন
      </span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${l.name}`}
          className={cn("grid h-8 w-8 place-items-center rounded-full bg-muted text-muted-foreground transition hover:bg-primary/5", l.color)}
        >
          <l.icon className="h-3.5 w-3.5" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className="grid h-8 w-8 place-items-center rounded-full bg-muted text-muted-foreground transition hover:bg-primary/5 hover:text-primary"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald" /> : <Link2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
