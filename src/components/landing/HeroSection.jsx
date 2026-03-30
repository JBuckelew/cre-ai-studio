import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from '@/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HeroSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Skills", "Company", "Future"];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl lg:rounded-[2.5rem] mx-auto max-w-7xl xl:max-w-screen-xl border-2 border-white/10 shadow-2xl shadow-blue-500/20">

        
        <style>{`
          @keyframes pan {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% -100%; }
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes flash {
            0%, 85%, 100% { opacity: 1; box-shadow: none; }
            88% { opacity: 0.7; box-shadow: 0 0 15px 4px rgba(255,255,255,0.4); }
            91% { opacity: 1; }
          }
        `}</style>
        
        <div className="relative z-10 flex flex-col items-start justify-start min-h-[60vh] sm:min-h-[70vh] py-10 sm:py-16 px-6 sm:px-12 lg:px-16">
          
          {/* Lawyers Track Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mb-8 sm:mb-10"
          >
            <a 
              href={createPageUrl('Workshops')}
              className="block w-full bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 rounded-full py-2 px-6 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-2 text-white text-sm font-semibold">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">NEW</span>
                <span>AI for CRE Attorneys — 6-Week Live Cohort Starts April 8</span>
                <span className="hidden sm:inline">|</span>
                <span className="group-hover:translate-x-1 transition-transform">Reserve Your Seat →</span>
              </div>
            </a>
          </motion.div>

          <div className="flex-1 flex items-center justify-start w-full">
            {/* Content Container - Left Aligned */}
            <div className="relative max-w-full lg:max-w-xl">
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
                    <span className="text-3xl sm:text-5xl lg:text-6xl lg:whitespace-nowrap">AI Training that <span className="italic text-blue-600">transforms</span> your</span>
                    <br />
                    <span className="text-3xl sm:text-5xl lg:text-6xl lg:whitespace-nowrap">Commercial Real Estate{' '}
                    <motion.span
                      key={currentWord}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent pb-1"
                    >
                      {words[currentWord]}
                    </motion.span>
                    </span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-base sm:text-lg lg:text-2xl text-slate-300 leading-relaxed mb-8 sm:mb-10"
                  >
                    <span className="lg:whitespace-nowrap">Learn to integrate AI tools into your daily CRE workflows through</span><br className="hidden lg:block" />{' '}
                    <span className="lg:whitespace-nowrap">hands-on training, live workshops, and a community of hundreds</span><br className="hidden lg:block" />{' '}
                    <span className="lg:whitespace-nowrap">of CRE professionals.</span>
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  >
                    <Button
                      onClick={() => window.open('https://cre-ai-coach.onrender.com/', '_blank')}
                      className="h-10 sm:h-12 bg-amber-50 text-black hover:bg-amber-100 font-semibold rounded-full px-4 sm:px-8 text-sm sm:text-base transition-all duration-300 group"
                      style={{ animation: 'flash 4s ease-in-out infinite' }}
                    >
                      Take the Free CRE AI Studio Assessment
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
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

          {/* Organizations Represented Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-20 pt-8 border-t-2 border-white/10 w-full overflow-hidden"
          >
            <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-widest mb-6 text-center">Organizations Represented by Our Members</p>
            <div className="relative overflow-hidden">
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