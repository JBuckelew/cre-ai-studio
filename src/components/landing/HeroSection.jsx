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
      <div className="relative overflow-hidden bg-white text-black rounded-3xl lg:rounded-[2.5rem] mx-auto max-w-7xl xl:max-w-screen-xl border-2 border-gray-200 shadow-2xl shadow-blue-500/20">

        
        <style>{`
          @keyframes pan {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% -100%; }
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        
        <div className="relative z-10 flex flex-col items-start justify-start min-h-[80vh] sm:min-h-[calc(100vh-10rem)] py-10 sm:py-20 px-6 sm:px-12 lg:px-16">
          {/* Partnership Badge - Centered at Top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-gray-200 rounded-full px-8 py-3 shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-800 tracking-wide">
                  In Partnership with
                </span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CRE Daily
              </span>
            </div>
          </motion.div>

          <div className="flex-1 flex items-center justify-start w-full">
            {/* Content Container - Left Aligned */}
            <div className="relative max-w-xl">
              <div className="relative">

                {/* Left-Aligned Content */}
                <div>
                {/* Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-3xl lg:text-5xl font-bold text-black leading-tight mb-6"
                  >
                    AI training that{' '}
                    <span className="italic text-blue-600">transforms</span>
                    {' '}your<br />
                    <span className="text-4xl lg:text-6xl">Commercial Real Estate</span>{' '}
                    <motion.span
                      key={currentWord}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block text-4xl lg:text-6xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
                    >
                      {words[currentWord]}
                    </motion.span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8"
                  >
                    Learn to integrate AI tools into your daily CRE workflows through<br />
                    hands-on training, webinars, and a community of 200+ professionals.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="h-11 bg-black text-white hover:bg-gray-800 font-medium rounded-full px-6 text-sm transition-all duration-300 group"
                    >
                      Get Free AI Guide
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      onClick={() => window.location.href = createPageUrl('FreeTrialPayment')}
                      className="h-11 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold rounded-full px-6 text-sm transition-all duration-300"
                    >
                      Join for Free
                    </Button>
                  </motion.div>
                </div>

                {/* Popup Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="bg-slate-900 border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Get Your Free CRE AI Starter Guide</DialogTitle>
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
                        {isSubmitting ? "Processing..." : "Get The Free AI Guide"}
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
            className="mt-20 pt-8 border-t-2 border-gray-300 w-full overflow-hidden"
          >
            <p className="text-gray-600 text-sm md:text-base font-medium uppercase tracking-widest mb-6">Organizations Represented by Our Members</p>
            <div className="relative overflow-hidden">
              <div className="animate-[scroll_30s_linear_infinite] flex gap-12 whitespace-nowrap">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex gap-12 items-center">
                    <span className="text-2xl md:text-3xl font-bold text-black">CBRE</span>
                    <span className="text-2xl md:text-3xl font-bold text-black">Newmark</span>
                    <span className="text-2xl md:text-3xl font-bold text-black">MetLife</span>
                    <span className="text-2xl md:text-3xl font-bold text-black">Avison Young</span>
                    <span className="text-2xl md:text-3xl font-bold text-black">Colliers</span>
                    <span className="text-2xl md:text-3xl font-bold text-black">Beacon Capital</span>
                    <span className="text-2xl md:text-3xl font-bold text-black">Cushman & Wakefield</span>
                    <span className="text-2xl md:text-3xl font-bold text-black">Savills</span>
                    <span className="text-2xl md:text-3xl font-bold text-black">Compass</span>
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