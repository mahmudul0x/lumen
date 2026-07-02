import { Building2, Home as HomeIcon, Phone } from "lucide-react";

const messages = [
  { icon: HomeIcon, text: "স্বপ্নের বাড়ি, নিজেই গড়ি — এক সাথে জমি কিনি" },
  { icon: Building2, text: "দীর্ঘমেয়াদী কিস্তির সুবিধা — বুকিং চলছে" },
  { icon: Phone, text: "আজই বুকিং করুন — ০১৭১১-৩৮১৪২২" },
  { icon: Building2, text: "রংপুরের প্রিমিয়াম রিয়েল এস্টেট প্রতিষ্ঠান" },
];

export function AnnouncementBar() {
  const loop = [...messages, ...messages, ...messages];
  return (
    <div className="relative z-[60] overflow-hidden bg-primary text-primary-foreground">
      <div className="flex whitespace-nowrap py-2 animate-[marquee_38s_linear_infinite]">
        {loop.map((m, i) => {
          const Icon = m.icon;
          return (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-2 text-[13px] font-medium tracking-wide"
            >
              <Icon className="h-3.5 w-3.5 text-gold" />
              {m.text}
              <span aria-hidden className="ml-8 text-gold/50">◆</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
