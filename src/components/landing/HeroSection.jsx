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
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
        
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        
        <div className="flex flex-col items-start justify-start min-h-[70vh] py-10 sm:py-16">
          <div className="flex-1 flex items-center justify-start w-full">
            {/* Content Container - Left Aligned */}
            <div className="relative max-w-2xl">
              <div className="relative">

                {/* Left-Aligned Content */}
                <div>
                  {/* Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
                  >
                    <span className="text-5xl lg:text-7xl">AI Training</span> that{' '}
                    <span className="italic text-blue-600">transforms</span>
                    {' '}your<br />
                    <span className="text-5xl lg:text-7xl">Commercial Real Estate</span>{' '}
                    <motion.span
                      key={currentWord}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block text-5xl lg:text-7xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
                    >
                      {words[currentWord]}
                    </motion.span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-8"
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
                      className="h-12 bg-slate-900 text-white hover:bg-slate-800 font-medium rounded-lg px-8 text-base transition-all duration-300 group"
                    >
                      Get the Free AI Tools + Prompts Guide
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      onClick={() => window.location.href = createPageUrl('FreeTrialPayment')}
                      className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 text-base transition-all duration-300"
                    >
                      Join for Free
                    </Button>
                  </motion.div>
                </div>

                {/* Popup Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="bg-white border-slate-200 text-slate-900">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-slate-900">Get the Free AI Tools + Prompts Guide</DialogTitle>
                      <DialogDescription className="text-slate-600">
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
                          className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                          className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg transition-all duration-300 group disabled:opacity-50"
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
            className="mt-20 pt-8 border-t border-slate-200 w-full overflow-hidden"
          >
            <p className="text-slate-500 text-sm md:text-base font-medium uppercase tracking-wide mb-6">Organizations Represented by Our Members</p>
            <div className="relative overflow-hidden">
              <div className="animate-[scroll_30s_linear_infinite] flex gap-12 whitespace-nowrap">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex gap-12 items-center">
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">CBRE</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">Newmark</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">MetLife</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">Avison Young</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">Colliers</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">Beacon Capital</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">Cushman & Wakefield</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">Savills</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">Compass</span>
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