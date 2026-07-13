import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle, Calendar, Users, Video, Award } from "lucide-react";
import { createPageUrl } from '@/utils';
import { base44 } from "@/api/base44Client";
import ClaudeCohortCard from "@/components/workshops/ClaudeCohortCard";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Workshops() {
  usePageMeta({
    title: "Claude Cohort — Live AI Training for Commercial Real Estate | CRE AI Studio",
    description: "The Claude Cohort is a four-week live training program built specifically for CRE professionals. Learn to set up Claude, make it sound like you, and turn it into a powerful agent.",
    path: "/Workshops",
    appendSiteName: false,
  });
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleJoinClick = () => {
    window.location.href = createPageUrl('FreeTrialPayment');
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!waitlistEmail) return;

    await base44.entities.WorkshopWaitlist.create({
      email: waitlistEmail
    });

    setWaitlistSubmitted(true);
    setWaitlistEmail("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block bg-blue-500/10 border border-blue-400/30 rounded-full px-6 py-3 mb-8"
            >
              <span className="text-sm font-semibold text-blue-300">Now Enrolling</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-[1.1]">
              The{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Claude Cohort
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              A four-week live training program built specifically for CRE professionals. Set up Claude properly, make it know you and sound like you, and turn it into a powerful agent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - CLAUDE COHORT */}
      <ClaudeCohortCard />

      {/* SECTION 3 - COMING SOON TEASER */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              More Workshops Coming in 2026
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              We're building intensive workshops for every CRE role. Want to be the first to know when new cohorts open?
            </p>

            {!waitlistSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  required
                  className="h-14 px-6 text-lg bg-white border-slate-300"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full px-8 h-14 whitespace-nowrap"
                >
                  Get Notified
                </Button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-xl mx-auto">
                <div className="flex items-center justify-center gap-3 text-green-700">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold text-lg">Thanks! We'll notify you when new workshops launch.</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 text-center">
              Workshop FAQ
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-slate-200 rounded-2xl px-6 bg-slate-50">
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-6">
                  How are workshops different from the Studio membership?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                  The Studio membership gives you access to weekly video lessons, monthly coaching calls, and our community. Workshops are intensive, multi-week live cohorts focused on a specific role or topic - like a deep-dive masterclass with hands-on exercises and direct instructor access.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-slate-200 rounded-2xl px-6 bg-slate-50">
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-6">
                  Do I need to be a Studio member to join a workshop?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                  No - workshop registration includes a Studio membership. If you're already a member, you'll get credit toward your workshop investment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-slate-200 rounded-2xl px-6 bg-slate-50">
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-6">
                  What if I can't attend a live session?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                  All sessions are recorded and available in the Studio within 24 hours. You'll also have async Q&A access to the instructor through our Circle community.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-slate-200 rounded-2xl px-6 bg-slate-50">
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-6">
                  Will there be more workshops after the Lawyers Track?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                  Yes. We're developing workshops for brokers, asset managers, and other CRE roles. Sign up for notifications above to be first to know.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 - BOTTOM CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl"
          >
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative p-12 md:p-16 text-center text-white">
              <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Not ready for a workshop? Start with the Studio.
              </h3>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                Join hundreds of CRE professionals already learning AI through weekly lessons, live Q&A, and 24/7 founder access.
              </p>
              
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-full px-12 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={handleJoinClick}
              >
                Start Your 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-sm text-blue-200 mt-6">
                No credit card required • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}