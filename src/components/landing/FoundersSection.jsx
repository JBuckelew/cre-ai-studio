
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FoundersSection() {
  const founders = [
    {
      name: "Jonathan Buckelew",
      role: "Co-Founder",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/fc8bc390b_Jonathan-Copy.jpg",
      details: ["10+ Years Real Estate Private Equity", "LinkedIn AI Voice"],
    },
    {
      name: "Nadine Ezzie", 
      role: "Co-Founder",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cd96f15c9_Nadine.png",
      details: ["20-Year CRE Attorney", "Former Tech Executive", "National AI Speaker"],
    },
    {
      name: "Topher Stephenson",
      role: "Co-Founder", 
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ea324b7b8_Topher.png",
      details: ["11+ Years in CRE Tech & Brokerage", "Nationwide AI for CRE Educator"],
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="founders" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f8fafc_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-slate-100 text-slate-700 hover:bg-slate-200">
            Meet the Team
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Led by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">CRE AI Experts</span> Across Multiple Real Estate Fields
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Three visionary professionals bringing decades of commercial real estate 
            and technology expertise to revolutionize how the industry works.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              variants={cardVariants}
              className="group"
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-[center_0%] group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {founder.name}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className="border-amber-200 bg-amber-50 text-amber-700 font-medium px-4 py-1"
                  >
                    {founder.role}
                  </Badge>

                  {/* Founder Details */}
                  {founder.details && (
                    <div className="mt-4 text-slate-600 text-sm font-medium space-y-1">
                      {founder.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  )}

                  {/* Decorative element */}
                  <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
          className="text-center mt-16 max-w-4xl mx-auto"
        >
          <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
            We live in your world, marketing properties, pushing deals across the finish line, managing portfolios. We'll teach you to streamline your CRE workflows using the same tools we're using in the field every single day.
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-16 lg:mt-20"
        >
          <div className="text-center mb-12">
            <p className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
              We've built something different: a <span className="font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">teaching team that looks more like an in-house CRE AI team</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
            {[
              {
                title: "Asset + Property Management",
                description: "Jonathan has spent over a decade at both large and small PE groups helping build Asset Management teams and infusing them with technology from LLMs to AI Agents. He's developed a big following on LinkedIn where he shares a lot about his AM journey and the AI that helps him daily",
              },
              {
                title: "Law, Compliance + Tech",
                description: "Nadine is a seasoned CRE attorney and founder of an AI-first law firm reimagining how the industry works. As Chair of Legal Policy & Innovation at the U.S. Proptech Council and co-host of the CRE Unplugged podcast, she brings a bold voice to the future of real estate. Nadine is a sought-after keynote speaker known for making the complex intersection of AI, policy, and the built environment both clear and compelling.",
              },
              {
                title: "Operations + Marketing",
                description: "Topher has spent over a decade in the CRE industry running operations and marketing. He currently is obsessed with Automations and how to build the best Custom GPTs. Topher's expertise has led him across the country, where he gives speeches on how to use AI in the Commercial Real Estate Industry.",
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-white h-full border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-slate-800 mb-2 text-lg">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="text-xl lg:text-2xl text-slate-800 font-semibold leading-relaxed text-center">
            Together, we will teach you how to apply AI across the entire CRE workflow — so you can save time, work smarter and get ahead.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}
