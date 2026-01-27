import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Clock, Trophy, Video, Users, MessageCircle } from "lucide-react";
import { createPageUrl } from '@/utils';

export default function WhyChooseSection() {
  const includedFeatures = [
    {
      icon: Video,
      iconColor: "text-white",
      bgColor: "from-indigo-500 to-purple-600",
      title: "The CRE AI Course + Community Access",
      description: "Weekly, step by step AI tutorials showing you how to execute specific Commercial Real Estate tasks with specific AI tools. From marketing to deal sourcing, to legal doc analyses & automations.",
      highlight: "Weekly Video Drops"
    },
    {
      icon: MessageCircle,
      iconColor: "text-white",
      bgColor: "from-amber-500 to-orange-600",
      title: "Exclusive Monthly Live Q&A Sessions",
      description: "Join exclusive live sessions where you can ask questions directly and get personalized guidance on your AI journey.",
      highlight: "Monthly Coaching Calls"
    },
    {
      icon: Users,
      iconColor: "text-white",
      bgColor: "from-green-500 to-teal-600",
      title: "24/7 Access to the Founders",
      description: "Direct access to Jonathan, Topher, and Nadine through our Circle Community - get answers and insights whenever you need them.",
      highlight: "24/7 Support"
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
          <div className="text-center mb-16 max-w-7xl mx-auto relative">
            {/* Animated Background */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl rounded-full"></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-slate-900 leading-tight">
                AI is shaping the{" "}
                <span className="relative inline-block">
                  <span className="italic bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    future
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
                <br />of the CRE Industry.
              </h3>
              
              <p className="text-xl md:text-3xl text-slate-700 mb-4 font-semibold">
                So we developed an <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Training Program</span>
              </p>
              <p className="text-lg md:text-2xl text-slate-500 mb-12 font-medium">
                specifically for CRE professionals like you
              </p>
              
              {/* Role Cards with Staggered Animation */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {[
                  { name: "Asset Managers", gradient: "from-blue-500 to-blue-600", icon: "🏢" },
                  { name: "Brokers", gradient: "from-purple-500 to-purple-600", icon: "🤝" },
                  { name: "Marketers", gradient: "from-indigo-500 to-indigo-600", icon: "📢" },
                  { name: "Lawyers", gradient: "from-amber-500 to-amber-600", icon: "⚖️" },
                  { name: "Analysts", gradient: "from-teal-500 to-teal-600", icon: "📊" },
                  { name: "And More", gradient: "from-rose-500 to-rose-600", icon: "✨" }
                ].map((role, index) => (
                  <motion.div
                    key={role.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group cursor-default"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-br ${role.gradient} p-6 rounded-2xl shadow-lg border border-white/20 text-white overflow-hidden`}>
                      <div className="absolute top-0 right-0 text-6xl opacity-10 -mr-4 -mt-2">{role.icon}</div>
                      <div className="text-3xl mb-2 relative z-10">{role.icon}</div>
                      <h4 className="text-base md:text-lg font-bold relative z-10">{role.name}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Inside the CRE AI Studio Section */}
          <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-xl mb-4">
            <div className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-3xl"></div>

              <div className="relative px-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
                    What's Included
                  </Badge>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                    Inside the{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      CRE AI Studio
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                    Everything you need to master AI in commercial real estate
                  </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                  {includedFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card className="border-0 shadow-lg bg-white/10 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group h-full">
                        <CardContent className="p-8 text-center h-full flex flex-col">
                          <Badge className="bg-blue-500 text-white font-medium text-sm px-3 py-1 mb-4 self-center">
                            {feature.highlight}
                          </Badge>
                          
                          <div className="flex justify-center mb-6">
                            <div className={`w-16 h-16 bg-gradient-to-br ${feature.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
                              <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                            </div>
                          </div>
                          
                          <h4 className="text-xl font-bold text-white mb-4 flex-shrink-0">{feature.title}</h4>
                          <p className="text-blue-100 leading-relaxed flex-grow">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center mb-16"
                >
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
            </div>
          </div>


      </motion.div>
      </div>
    </section>
  );
}