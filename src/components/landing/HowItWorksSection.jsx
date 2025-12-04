import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Users, MessageCircle, ArrowRight, Zap, Clock, Trophy, CheckCircle } from "lucide-react";
import { createPageUrl } from '@/utils';

export default function HowItWorksSection() {
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
    window.location.href = createPageUrl('Payment');
  };

  return (
    <>
      {/* The navigation bar section has been removed */}

      {/* Main Content Area */}
      <div id="inside-the-studio" className="max-w-7xl mx-auto px-6 my-10">
        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
          <section id="whats-included" className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
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
                
                <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                  Inside the{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CRE AI Studio
                  </span>
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
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

              {/* New CTA Button */}
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
                  Claim Your Spot Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </section>

          <section id="why-choose-us" className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
            
            <div className="px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-16">
                  <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
                    Why Choose Us
                  </Badge>
                  
                  <h3 className="text-4xl lg:text-5xl font-black mb-6 text-slate-900">
                    Why the <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">CRE AI Studio</span>
                  </h3>
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
                <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-12 shadow-2xl">
                  <h4 className="text-3xl font-bold text-white mb-4">
                    Ready to Transform your CRE career?
                  </h4>
                  <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                    Join our exclusive community and start learning from industry experts who are already using AI to revolutionize their work.
                  </p>
                  
                  <Button
                    size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-full px-8 transition-all duration-300 group"
                    onClick={handleJoinClick}
                  >
                    Join Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}