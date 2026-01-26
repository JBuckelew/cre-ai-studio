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
    // Check how many times popup has been shown
    const popupCount = parseInt(localStorage.getItem('popupShownCount') || '0');
    
    if (popupCount < 2) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Increment the counter
        localStorage.setItem('popupShownCount', String(popupCount + 1));
      }, 3000);
      
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-4 pb-8"
          >
            <div className="relative bg-black text-white rounded-3xl shadow-2xl max-w-md md:max-w-lg w-full overflow-hidden border-2 border-blue-500">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>

              {/* Content */}
              <div className="relative p-6 md:p-12">
                {!isSuccess ? (
                  <>
                    {/* Badge */}
                    <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
                      START FREE TODAY 🚀
                    </div>

                    {/* Headline */}
                    <h2 className="text-xl md:text-3xl font-black mb-3 leading-tight">
                      Try the <span className="bg-gradient-to-r from-purple-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">CRE AI Studio</span> <span className="text-blue-400">FREE for 7 days</span>
                    </h2>

                    {/* Subheadline */}
                    <p className="text-base md:text-lg text-blue-100 mb-6">
                      Master AI in Commercial Real Estate with weekly lessons, live Q&A sessions, and direct access to founders.
                    </p>

                    {/* Email form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 rounded-xl"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300"
                      >
                        {isSubmitting ? "Starting..." : "Start My Free Trial"}
                      </Button>
                    </form>
                    </>
                    ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">You're In! 🎉</h3>
                    <p className="text-blue-100">Check your email for next steps.</p>
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