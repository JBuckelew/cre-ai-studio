import React, { useEffect } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { createPageUrl } from '@/utils';
import confetti from 'canvas-confetti';

export default function WorkshopThankYou() {
  usePageMeta({
    title: "You're Registered",
    description: "You're registered for the CRE AI Studio workshop. Here's what to expect next.",
    path: "/WorkshopThankYou",
    noindex: true,
  });
  useEffect(() => {
    // Trigger confetti animation on page load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            Welcome to the Cohort! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
            You're officially registered for <span className="font-bold">AI for CRE Attorneys</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What Happens Next?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      Check Your Email
                    </div>
                    <p className="text-slate-600">
                      You'll receive a welcome email within the next 10 minutes with your Studio login credentials and workshop calendar invite.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      Join Circle Community
                    </div>
                    <p className="text-slate-600">
                      Your invitation to our private Circle community will arrive tomorrow. This is where you'll connect with your cohort and get async Q&A access to Nadine.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Mark Your Calendar
                    </div>
                    <p className="text-slate-600">
                      First session is <span className="font-bold">Tuesday, March 25, 2026 at 1:00 PM ET</span>. All sessions are recorded if you can't make it live.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-blue-900 mb-1">Studio Membership Activated</div>
                      <p className="text-blue-800 text-sm">
                        Your lifetime Studio membership is now active. Start exploring the library while you wait for the workshop to begin!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => window.location.href = createPageUrl('Home')}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full group"
                  >
                    Explore the Studio
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => window.location.href = 'mailto:info@creaistudio.com'}
                    variant="outline"
                    className="flex-1 h-12 border-2 border-slate-300 hover:bg-slate-50 font-semibold rounded-full"
                  >
                    Have Questions? Email Us
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-600">
            Questions? We're here to help at{" "}
            <a href="mailto:info@creaistudio.com" className="text-blue-600 font-semibold hover:underline">
              info@creaistudio.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}