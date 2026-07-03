import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHECKOUT_URL } from "./CTAButton";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <a
            href={CHECKOUT_URL}
            data-cta="sticky_mobile_start_trial"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-blue-600 text-white font-semibold text-base shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-transform"
          >
            Start Free Trial
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}