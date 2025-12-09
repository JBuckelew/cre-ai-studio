import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Angelo Pavanello",
      role: "Vice President @ CBRE Canada",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/d02373aaf_Angelo.jpg",
      content: "The CRE AI Studio team came in and trained over 50 of our brokers on Microsoft Co-Pilot in a single session. The content was practical, immediately applicable, and tailored specifically to how we work in commercial real estate. This is exactly the kind of AI training our industry needs. I'm also personally a member of the CRE AI Studio and can't recommend it enough.",
      highlight: "trained over 50 of our brokers"
    },
    {
      name: "Sarra Hochberg",
      role: "Marketing Manager @ Coldwell Banker Commercial Atlantic",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/af83da311_sarah.jpg",
      content: "Month 1 complete of the CRE AI Studio! So far, I've learned how to create custom GPT's for our Coldwell Banker Commercial Atlantic company marketing and brand consistency & building custom prompts for those GPT's. If you have not signed up for this course and you work in commercial real estate, you should!",
      highlight: "learned how to create custom GPT's"
    },
    {
      name: "Ben Nolte",
      role: "CRE Professional",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/6b5cee3a3_ben.jpg",
      content: "1000% Share away! if it helps for me to like, share or comment please let me know. Honestly Jonathan, I have spent thousands dollars on AI Classes over the past three years, and this group is VASTLY underpriced for the value you are all bringing. Feel free to share or modify utilize that as well if you wish.",
      highlight: "VASTLY underpriced for the value"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(51, 65, 85) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-600 text-white">
            Success Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            What Our Members{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real results from CRE professionals transforming their workflows with AI
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 border-slate-100 hover:border-blue-200">
                <CardContent className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-lg">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">
                        {testimonial.role.includes('@') ? (
                          <>
                            {testimonial.role.split('@')[0].trim()} @{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                              {testimonial.role.split('@')[1].trim()}
                            </span>
                          </>
                        ) : (
                          testimonial.role
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-slate-700 text-sm leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Below Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 text-lg mb-6">
            Join hundreds of CRE professionals already transforming their business with AI
          </p>
          <button
            onClick={() => window.location.href = '/Payment'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Start Your Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}