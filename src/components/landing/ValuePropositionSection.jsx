import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, LineChart, Cuboid, Scale, Zap, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { createPageUrl } from '@/utils';

export default function ValuePropositionSection() {
  const propositions = [
    {
      icon: Briefcase,
      title: "Brokers & Investors",
      description: "Market your properties & find opportunities in minutes, not days.",
    },
    {
      icon: LineChart,
      title: "Asset & Property Managers",
      description: "Automate market analyses & analyze deals.",
    },
    {
      icon: Cuboid,
      title: "Analysts & Developers",
      description: "Put complex projects on autopilot.",
    },
    {
      icon: Scale,
      title: "Attorneys & Legal Teams",
      description: "Review leases, draft clauses, and identify risk faster — with ethics-first AI training built for CRE legal practice.",
    }
  ];

  const handleJoinClick = () => {
    window.location.href = createPageUrl('FreeTrialPayment');
  };

  return (
    <section id="value-prop" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#e2e8f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-slate-600 font-medium">
            Transform Your Workflow
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            AI is shaping the <span className="italic text-blue-600">future</span> of the<br />CRE Industry
          </h2>
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-4 font-semibold">
            That's why we created an AI Training Program and Community to make sure our industry isn't left behind.
          </p>
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Whether you're a broker marketing your business, an investor sourcing & analyzing deals, or an asset manager or developer managing complex projects, 
            <span className="font-semibold text-slate-800"> Learn to automate your most time-consuming work using AI.</span>
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {propositions.map((prop) => (
            <motion.div
              key={prop.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="group"
            >
              <Card className="h-full bg-white border border-slate-200 shadow-lg hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                <CardHeader className="text-center items-center pb-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-blue-100">
                    <prop.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    {prop.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 text-lg leading-relaxed">{prop.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
            <div className="bg-slate-100 rounded-3xl p-6 md:p-10 shadow-lg border border-slate-200">
                <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg">
                            <Zap className="w-8 h-8" />
                        </div>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                        Don't know where to start with AI in CRE?
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        We'll guide you from the beginning, from writing your prompts, to creating chatbots, to building our CRE automations.
                    </p>
                    <div className="mt-8">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-amber-500 text-white hover:opacity-90 font-semibold rounded-full px-8 transition-all duration-300 group"
                            onClick={handleJoinClick}
                        >
                            Start Your 7-Day Free Trial
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}