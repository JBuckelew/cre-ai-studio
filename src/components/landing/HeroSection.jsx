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
      <div className="relative overflow-hidden bg-black text-white rounded-3xl lg:rounded-[2.5rem] mx-auto max-w-7xl xl:max-w-screen-xl border-2 border-white shadow-2xl shadow-blue-500/20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-8 right-8 z-20"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/75a2876a5_image.png"
            alt="CRE AI Studio Logo"
            className="h-8 lg:h-16 filter invert"
          />
        </motion.div>

        {/* Enhanced Tech-Inspired Background with Camera Flashes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          
          {/* Camera Flash Effects */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Flash 1 - Top Left */}
            <motion.div
              className="absolute top-24 left-32 w-8 h-8 bg-white rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeOut"
              }}
              style={{
                boxShadow: '0 0 30px 10px rgba(255, 255, 255, 0.3)',
                filter: 'blur(1px)'
              }}
            />
            
            {/* Flash 2 - Top Right */}
            <motion.div
              className="absolute top-40 right-40 w-6 h-6 bg-yellow-100 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 6,
                delay: 2,
                ease: "easeOut"
              }}
              style={{
                boxShadow: '0 0 25px 8px rgba(255, 255, 200, 0.4)',
                filter: 'blur(0.5px)'
              }}
            />
            
            {/* Flash 3 - Center Left */}
            <motion.div
              className="absolute top-1/2 left-20 w-10 h-10 bg-blue-100 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 8,
                delay: 5,
                ease: "easeOut"
              }}
              style={{
                boxShadow: '0 0 35px 12px rgba(200, 220, 255, 0.3)',
                filter: 'blur(1px)'
              }}
            />

            {/* Flash 4 - Bottom Right */}
            <motion.div
              className="absolute bottom-32 right-24 w-5 h-5 bg-white rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.8, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 7,
                delay: 3.5,
                ease: "easeOut"
              }}
              style={{
                boxShadow: '0 0 20px 6px rgba(255, 255, 255, 0.5)',
                filter: 'blur(0.5px)'
              }}
            />

            {/* Flash 5 - Bottom Left */}
            <motion.div
              className="absolute bottom-40 left-1/3 w-7 h-7 bg-purple-100 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1.4, 0],
              }}
              transition={{
                duration: 0.25,
                repeat: Infinity,
                repeatDelay: 5.5,
                delay: 1,
                ease: "easeOut"
              }}
              style={{
                boxShadow: '0 0 28px 9px rgba(220, 200, 255, 0.3)',
                filter: 'blur(0.8px)'
              }}
            />

            {/* Flash 6 - Center Right */}
            <motion.div
              className="absolute top-1/3 right-1/4 w-4 h-4 bg-amber-100 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 2.2, 0],
              }}
              transition={{
                duration: 0.12,
                repeat: Infinity,
                repeatDelay: 9,
                delay: 4.2,
                ease: "easeOut"
              }}
              style={{
                boxShadow: '0 0 22px 7px rgba(255, 240, 180, 0.4)',
                filter: 'blur(0.3px)'
              }}
            />
          </div>
          
          {/* Subtle floating particles */}
          <div className="absolute inset-0">
            <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"></div>
            <div className="absolute top-[60%] left-[80%] w-1 h-1 bg-purple-400/40 rounded-full animate-pulse [animation-delay:1s]"></div>
            <div className="absolute top-[40%] left-[70%] w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse [animation-delay:2s]"></div>
            <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-green-400/40 rounded-full animate-pulse [animation-delay:3s]"></div>
            <div className="absolute top-[30%] left-[90%] w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse [animation-delay:4s]"></div>
            <div className="absolute top-[70%] left-[5%] w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse [animation-delay:5s]"></div>
          </div>
          
          {/* Central glowing element */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[40rem] h-[40rem] bg-gradient-radial from-blue-500/8 via-transparent to-transparent animate-pulse"></div>
          </div>

          {/* Soft edge gradients */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900/20 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900/20 to-transparent"></div>

          {/* Subtle geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/5 rounded-full animate-spin [animation-duration:30s]"></div>
          <div className="absolute bottom-1/3 left-1/5 w-24 h-24 border border-blue-500/10 rounded-full animate-spin [animation-duration:45s] [animation-direction:reverse]"></div>
          
          {/* Glowing perspective lines */}
          <div
            className="absolute inset-0"
            style={{
              transform: 'perspective(1000px) rotateX(40deg)',
              transformOrigin: 'bottom',
              opacity: 0.15
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,122,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,122,255,0.2)_1px,transparent_1px)] bg-[size:5rem_5rem] animate-[pan_15s_linear_infinite]"></div>
          </div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/2 to-transparent animate-pulse [animation-duration:8s]"></div>
          
          {/* Subtle corner accents */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400/8 via-transparent to-transparent rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-400/8 via-transparent to-transparent rounded-tl-full"></div>

          {/* Horizontal scanning light beam */}
          <motion.div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent"
            style={{ y: '25%' }}
            animate={{
              y: ['25%', '75%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          ></motion.div>

          {/* Vertical scanning elements */}
          <motion.div
            className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div
            className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-300/30 to-transparent"
            animate={{
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </div>
        
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
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[80vh] sm:min-h-[calc(100vh-10rem)] py-10 sm:py-20 px-4 sm:px-6">
          <div className="flex-1 flex items-center">
            {/* Content Container with enhanced subtle border */}
            <div className="relative">
              <div className="relative bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-12 lg:p-16 shadow-2xl shadow-blue-500/10">
                
                {/* Welcome Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mb-4"
                >
                  <p className="text-2xl lg:text-4xl text-gray-300 font-semibold max-w-2xl mx-auto lg:whitespace-nowrap">
                    Where Real Estate Professionals Master AI
                  </p>
                </motion.div>

                {/* Main Heading - Apple style with gradient */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 tracking-tight leading-none bg-gradient-to-r from-purple-500 via-yellow-400 to-green-500 bg-clip-text text-transparent"
                >
                  CRE AI Studio
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-xl lg:text-2xl text-gray-300 font-light mb-12 max-w-3xl mx-auto"
                >
                  Straight to the Point AI Lessons for Commercial Real Estate Professionals
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="max-w-lg mx-auto"
                >
                  <Button
                    size="lg"
                    onClick={() => setIsDialogOpen(true)}
                    className="h-14 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-full px-10 text-lg transition-all duration-300 group"
                  >
                    Get The Free AI Guide
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                {/* Popup Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="bg-slate-900 border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Get Your Free AI Guide</DialogTitle>
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
            className="mt-20 pt-8 border-t-2 border-purple-500/30 w-full overflow-hidden"
          >
            <p className="text-gray-400 text-sm md:text-base font-medium uppercase tracking-widest mb-6">Organizations Represented by Our Members</p>
            <div className="relative overflow-hidden">
              <div className="animate-[scroll_30s_linear_infinite] flex gap-12 whitespace-nowrap">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex gap-12 items-center">
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">CBRE</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Newmark</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">MetLife</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Avison Young</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">Colliers</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">Beacon Capital</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Cushman & Wakefield</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Savills</span>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Compass</span>
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