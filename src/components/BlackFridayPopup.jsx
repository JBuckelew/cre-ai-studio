import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function FreeTrialPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check how many times popup has been shown this session
    const popupCount = parseInt(sessionStorage.getItem('popupShownCount') || '0');
    
    if (popupCount < 1) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Mark as shown so it doesn't appear again this visit
        sessionStorage.setItem('popupShownCount', String(popupCount + 1));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Save to database
      await base44.entities.EmailSignup.create({
        email: email,
        source: "free_trial_signup"
      });

      // Redirect to Free Trial payment page
      window.location.href = '/FreeTrialPayment';
    } catch (error) {
      console.error('Popup error:', error);
      alert(`Error: ${error.message || "There was an error. Please try again."}`);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 pb-8"
          >
            <div className="relative bg-slate-900 text-white rounded-3xl shadow-2xl shadow-blue-500/20 max-w-md w-full overflow-hidden border border-white/10">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative blobs matching hero */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {!isSuccess ? (
                  <>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
                      7-Day Free Trial
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                      AI Training that{" "}
                      <span className="italic text-blue-400">transforms</span>{" "}
                      your CRE Practice
                    </h2>

                    {/* Subheadline */}
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                      Weekly AI lessons, live Q&amp;A sessions, and a community of hundreds of CRE professionals — all in one place.
                    </p>

                    {/* Email form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Enter your work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 rounded-full px-5"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300"
                      >
                        {isSubmitting ? "Starting..." : "Start My Free Trial →"}
                      </Button>
                    </form>

                    <p className="text-xs text-slate-500 mt-4 text-center">
                      Cancel anytime. No commitment required.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">You're In!</h3>
                    <p className="text-slate-300 text-sm">Check your email for next steps.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}