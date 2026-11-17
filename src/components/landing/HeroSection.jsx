import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import HeroPaths from "@/components/landing/HeroPaths";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Slow-drifting color glows, a faded dot grid and a cursor spotlight behind the hero content.
function HeroBackdrop({ reduceMotion }) {
  const orbs = [
    { className: "-top-32 -left-24 h-[26rem] w-[26rem] bg-blue-600/35", x: [0, 70, -20, 0], y: [0, 40, -30, 0], duration: 22 },
    { className: "top-10 -right-32 h-[24rem] w-[24rem] bg-purple-600/30", x: [0, -60, 30, 0], y: [0, 50, -20, 0], duration: 26 },
    { className: "bottom-0 left-1/3 h-[20rem] w-[20rem] bg-orange-500/15", x: [0, 40, -50, 0], y: [0, -40, 20, 0], duration: 30 },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${o.className}`}
          animate={reduceMotion ? undefined : { x: o.x, y: o.y }}
          transition={{ duration: o.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(520px circle at var(--mx, 50%) var(--my, 25%), rgba(99,102,241,0.16), transparent 60%)",
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse" || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    heroRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.company) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save to database
      await base44.entities.ContactSignup.create({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        company: formData.company,
        source: "hero_signup"
      });
      
      // Download the AI Primer PDF
      const pdfUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/ec97862b9_CREAIStudio-AIPrimer.pdf";
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'CRE-AI-Studio-AI-Primer.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      alert("Success! Your free AI Primer guide is downloading now. Check your downloads folder.");
      setFormData({ first_name: "", last_name: "", email: "", company: "" });
      setIsDialogOpen(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Hero signup error:', error);
      alert("There was an error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50 py-8 sm:py-12 lg:py-16">
      <div
        ref={heroRef}
        onPointerMove={handlePointerMove}
        className="relative overflow-hidden bg-slate-900 text-white rounded-3xl lg:rounded-[2.5rem] mx-auto max-w-7xl xl:max-w-screen-xl border-2 border-white/10 shadow-2xl shadow-blue-500/20"
      >
        <HeroBackdrop reduceMotion={reduceMotion} />

        
        <style>{`
          @keyframes pan {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% -100%; }
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes hero-sheen {
            0% { background-position: 0% center; }
            100% { background-position: 100% center; }
          }
          @keyframes flash {
            0%, 85%, 100% { opacity: 1; box-shadow: none; }
            88% { opacity: 0.7; box-shadow: 0 0 15px 4px rgba(255,255,255,0.4); }
            91% { opacity: 1; }
          }
        `}</style>
        
        <div className="relative z-10 flex flex-col items-start justify-start min-h-[60vh] sm:min-h-[70vh] py-10 sm:py-16 px-6 sm:px-12 lg:px-16">
          


          <div className="flex-1 flex items-center justify-center w-full">
            {/* Content Container - Centered */}
            <div className="relative max-w-full lg:max-w-3xl mx-auto text-center">
              <div className="relative">

                {/* Left-Aligned Content */}
                <div>
                {/* Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 sm:mb-8"
                  >
                    Your{' '}
                    <span className="relative inline-block text-blue-500">
                      Partner
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 120 12"
                        preserveAspectRatio="none"
                        className="absolute -bottom-1.5 left-0 h-2.5 w-full sm:-bottom-2 sm:h-3"
                      >
                        <motion.path
                          d="M3 9 C 30 3, 70 2, 117 6"
                          fill="none"
                          stroke="url(#hero-underline)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ pathLength: reduceMotion ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
                        />
                        <defs>
                          <linearGradient id="hero-underline" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>{' '}
                    in{' '}
                    <span
                      className="bg-clip-text text-transparent animate-[hero-sheen_4s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899, #f97316, #ec4899, #a855f7)",
                        backgroundSize: "300% auto",
                      }}
                    >
                      AI
                    </span>{' '}
                    for the Commercial Real Estate Industry.
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-base sm:text-lg lg:text-2xl text-slate-300 leading-relaxed mb-8 sm:mb-10"
                  >
                    CRE AI Studio provides AI training and consulting for commercial real estate professionals and firms, through an industry-focused membership community,{" "}
                    <a href="/training" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">customized corporate AI training</a>, and{" "}
                    <a href="/Consulting" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">strategic AI consulting</a>.
                  </motion.p>

                </div>

                {/* Popup Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="bg-slate-900 border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Get the Free AI Tools + Prompts Guide</DialogTitle>
                      <DialogDescription className="text-slate-300">
                        Fill in your details to download the CRE AI Primer
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="First Name"
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-full transition-all duration-300 group disabled:opacity-50"
                      >
                        {isSubmitting ? "Processing..." : "Get the Free AI Tools + Prompts Guide"}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                
              </div>
            </div>
          </div>

          {/* Pathways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-10 sm:mt-12 w-full max-w-3xl mx-auto"
          >
            <HeroPaths />
          </motion.div>

          {/* Organizations Represented Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-20 pt-8 border-t-2 border-white/10 w-full overflow-hidden"
          >
            <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-widest mb-6 text-center">Organizations Represented by Our Members</p>
            <div
              className="relative overflow-hidden"
              style={{
                maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
              }}
            >
              <div className="animate-[scroll_10s_linear_infinite] md:animate-[scroll_20s_linear_infinite] flex gap-12 whitespace-nowrap">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex gap-12 items-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">CBRE</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">Newmark</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">MetLife</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">Avison Young</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">Colliers</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">Beacon Capital</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">Cushman & Wakefield</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">Savills</span>
                    <span className="text-2xl md:text-3xl font-bold text-white">Compass</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}