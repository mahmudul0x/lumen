import { createFileRoute } from "@tanstack/react-router";
import { AdminPage, AdminCard } from "@/components/admin/AdminPage";
import { MapPin, Phone, Mail, Clock, User } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/branches")({
  head: () => ({ meta: [{ title: "শাখা — অ্যাডমিন" }] }),
  component: BranchesPage,
});

const BRANCHES = [
  { name: "প্রধান কার্যালয় — ঢাকা", address: "গুলশান ২, ঢাকা ১২১২", phone: "+৮৮০ ১৭০০-১১১২২২", email: "dhaka@lumenbuilders.com", hours: "শনি–বৃহঃ ৯:০০–৭:০০", manager: "মো. রাশেদুল ইসলাম", map: "https://maps.google.com/?q=Gulshan+Dhaka" },
  { name: "চট্টগ্রাম শাখা", address: "আগ্রাবাদ বাণিজ্যিক এলাকা, চট্টগ্রাম", phone: "+৮৮০ ১৭০০-৩৩৪৪৫৫", email: "ctg@lumenbuilders.com", hours: "শনি–বৃহঃ ৯:৩০–৬:৩০", manager: "সাদিয়া আহমেদ", map: "https://maps.google.com/?q=Agrabad+Chittagong" },
  { name: "সিলেট শাখা", address: "জিন্দাবাজার, সিলেট", phone: "+৮৮০ ১৭০০-৫৫৬৬৭৭", email: "sylhet@lumenbuilders.com", hours: "শনি–বৃহঃ ১০:০০–৬:০০", manager: "তানভীর হাসান", map: "https://maps.google.com/?q=Zindabazar+Sylhet" },
];

function BranchesPage() {
  return (
    <AdminPage title="শাখা ব্যবস্থাপনা" description="Lumen Builders-এর সব শাখার তথ্য একসাথে।">
      <div className="grid gap-5 lg:grid-cols-2">
        {BRANCHES.map((b) => (
          <AdminCard key={b.name}>
            <h3 className="font-display text-lg font-semibold text-primary">{b.name}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-secondary" /> <span>{b.address}</span></li>
              <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 text-secondary" /> <span>{b.phone}</span></li>
              <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 text-secondary" /> <a href={`mailto:${b.email}`} className="hover:text-primary">{b.email}</a></li>
              <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 text-secondary" /> <span>{b.hours}</span></li>
              <li className="flex gap-2"><User className="mt-0.5 h-4 w-4 text-secondary" /> <span>ম্যানেজার: {b.manager}</span></li>
            </ul>
            <a href={b.map} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-medium text-accent hover:underline">মানচিত্রে দেখুন →</a>
          </AdminCard>
        ))}
      </div>
    </AdminPage>
  );
}
