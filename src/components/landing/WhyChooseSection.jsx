import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Clock, Trophy } from "lucide-react";
import { createPageUrl } from '@/utils';

export default function WhyChooseSection() {
  const whyChoosePoints = [
    {
      icon: Clock,
      title: "AI courses are out of date as soon as you finish them",
      description: "The studio's lessons will include new tools and features WEEKLY as they roll out.",
      accent: "Always Updated"
    },
    {
      icon: Zap,
      title: "Social media posts and AI message boards only get you so far",
      description: "Our step by step lessons will show you exactly how to use these incredible platforms to save you time in your CRE workflows.",
      accent: "Real Results"
    },
    {
      icon: Trophy,
      title: "Everyone thinks they need an AI consultant",
      description: "But they really just want ANSWERS from people using this technology in the field. Ask your questions in the community and one of our CRE AI experts will get back to you within 24 hours.",
      accent: "Expert Answers"
    }
  ];

  const handleJoinClick = () => {
    window.location.href = createPageUrl('FreeTrialPayment');
  };

  return (
    <section id="why-choose-us" className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16 max-w-5xl mx-auto">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 leading-tight">
              AI is shaping the <span className="italic text-blue-600">future</span> of the CRE Industry.
            </h3>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              So we developed an AI Training Program and Community specifically for the Commercial Real Estate Industry to drive meaningful change.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {whyChoosePoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-transparent hover:border-blue-500 transition-all duration-300 group h-full">
                  <CardContent className="p-8 text-center flex flex-col items-center h-full">
                    <Badge variant="outline" className="mb-4 text-xs font-medium">
                      {point.accent}
                    </Badge>
                    <div className="flex-shrink-0 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                          <point.icon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-4 flex-grow">
                      {point.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        {/* Call to Action */}
        <motion.div
          id="join-now"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-6 md:p-12 shadow-2xl">
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform your CRE career?
            </h4>
            <p className="text-base md:text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our exclusive community and start learning from industry experts who are already using AI to revolutionize their work.
            </p>
            
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-full px-8 transition-all duration-300 group"
              onClick={handleJoinClick}
            >
              Start Your 7-Day Free Trial
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}