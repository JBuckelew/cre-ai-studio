import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";
import { Brain, Zap, Building2, Image, ArrowRight } from "lucide-react";
import { createPageUrl } from '@/utils';

export default function MissionSection() {
  const courseModules = [
    {
      icon: Brain,
      title: "Learn How to Use the LLMs",
      description: "Master ChatGPT, Claude, & Gemini for daily Commercial Real Estate tasks and decision-making"
    },
    {
      icon: Zap,
      title: "Build Automations",
      description: "Create powerful workflows using Zapier, Make.com, Relay.app and n8n"
    },
    {
      icon: Building2,
      title: "Enterprise-Level AI",
      description: "Learn how to implement and scale AI solutions at the organizational level"
    },
    {
      icon: Image,
      title: "Generate Content & Media",
      description: "Create images, videos, documents, and presentations using tools like Genspark and Gamma"
    }
  ];

  const handleJoinClick = () => {
    window.location.href = createPageUrl('FreeTrialPayment');
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-amber-100/50 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Course Preview Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            What's Inside
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">What You'll Learn</span> by Joining
          </h2>
          <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Comprehensive AI training designed specifically for CRE professionals, covering everything from basic tools to enterprise implementation.
          </p>
        </motion.div>

        {/* Course Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {courseModules.map((module, index) => (
            <Card key={module.title} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <module.icon className="w-8 h-8 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{module.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{module.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-8 bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl text-white text-center"
        >
          <h4 className="text-2xl lg:text-3xl font-bold mb-4">
            Become the best at AI in your company in 3 months
          </h4>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Stand out and get ahead by staying up to date on the latest AI tools, how to use them in CRE, and how to shine in front of your co-workers
          </p>
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-full px-8 transition-all duration-300 group"
            onClick={handleJoinClick}
          >
            Start Your 7-Day Free Trial
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}