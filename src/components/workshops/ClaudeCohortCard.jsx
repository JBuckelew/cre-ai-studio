import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Calendar } from "lucide-react";

const CLAUDE_COHORT_URL = "https://cre-agent-lab.base44.app";

export default function ClaudeCohortCard() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            <div className="absolute top-6 left-6 z-10">
              <Badge className="bg-amber-600 text-white font-bold px-4 py-2 text-sm">
                NOW ENROLLING
              </Badge>
            </div>

            <CardContent className="p-10 md:p-12">
              <div className="mb-10 mt-8">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                  Claude Cohort for CRE Professionals
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  A six-week live training program built specifically for Commercial Real Estate professionals. Learn what Claude is, how to set it up properly, how to get Claude to both know you and sound like you, and turn it into a powerful agent.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-10">
                {/* LEFT COLUMN */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-amber-600" />
                    The Six-Week Claude Class
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Week 1: Foundations of Claude — setup, models, and your first CRE-specific prompts",
                      "Week 2: Get Claude to know you and sound like you with custom instructions and knowledge bases",
                      "Week 3: Build skills and plugins for repetitive CRE work — tone cloning and brand voice",
                      "Week 4: Advanced prompting techniques and multi-step CRE workflows",
                      "Week 5: Turn Claude into an autonomous agent for lease analysis and underwriting",
                      "Week 6: Market research, deal pipelines, and putting it all together"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT COLUMN */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-amber-600" />
                    Program Details
                  </h3>
                  <div className="space-y-5 bg-slate-50 rounded-2xl p-6">
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Starts</div>
                      <div className="text-lg font-bold text-slate-900">August 13th, 2026</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Format</div>
                      <div className="text-lg font-bold text-slate-900">6 weekly live lessons, 1 hour each</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Level</div>
                      <div className="text-lg font-bold text-slate-900">All levels welcome</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Investment</div>
                      <div className="text-lg font-bold text-slate-900">Annual Studio membership required</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Includes</div>
                      <div className="text-lg font-bold text-slate-900">Live + recorded sessions, founder access, CRE community</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-full px-12 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => window.open(CLAUDE_COHORT_URL, "_blank")}
                >
                  Join the Cohort
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