import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, ArrowRight } from "lucide-react";

export default function AISurveySection() {
  const handleSurveyClick = () => {
    window.open("https://cre-ai-coach.onrender.com", "_blank");
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-stone-200 via-neutral-100 to-stone-300 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-l from-stone-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-neutral-300/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-700 to-emerald-900 text-white rounded-full flex items-center justify-center shadow-lg shadow-teal-900/20">
              <BarChart3 className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-teal-900 mb-6 tracking-tight leading-tight">
            Discover Your AI Readiness
          </h2>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Take our quick AI readiness assessment to identify where your firm stands and get personalized recommendations for AI adoption.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border border-stone-300 shadow-2xl shadow-stone-900/10 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-teal-900 mb-3">
                    5-Minute AI Readiness Survey
                  </h3>
                  <p className="text-stone-600 text-lg leading-relaxed">
                    Answer a few quick questions about your firm's current use of AI, workflows, and goals. We'll provide instant insights and personalized recommendations.
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-stone-700">Understand your firm's AI maturity level</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-stone-700">Get actionable insights for your role</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-stone-700">Discover next steps for your firm</p>
                  </div>
                </div>

                <Button
                  onClick={handleSurveyClick}
                  className="w-full h-12 bg-gradient-to-r from-teal-700 to-emerald-800 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-full text-lg transition-all duration-300 group mt-8 shadow-lg shadow-teal-900/20"
                >
                  Take the Survey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}