import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappHref } from "@/lib/leads";

/**
 * Global floating WhatsApp button only.
 */
export function FloatingCTAs() {
  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <motion.a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp-এ Lumen Builders-এর সাথে যোগাযোগ করুন"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-float"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="relative h-6 w-6" strokeWidth={2.2} />
      </motion.a>
    </div>
  );
}
