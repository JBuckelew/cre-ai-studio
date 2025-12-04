
import React from 'react';
import { motion } from 'framer-motion';

export default function ToolsSection() {
  const tools = [
    { name: "ChatGPT", gradient: "bg-gradient-to-r from-green-400 to-blue-500" },
    { name: "Perplexity", gradient: "bg-gradient-to-r from-purple-400 to-pink-500" },
    { name: "Claude", gradient: "bg-gradient-to-r from-orange-400 to-red-500" },
    { name: "Gemini", gradient: "bg-gradient-to-r from-blue-400 to-purple-500" },
    { name: "Zapier", gradient: "bg-gradient-to-r from-yellow-400 to-orange-500" },
    { name: "Make.com", gradient: "bg-gradient-to-r from-teal-400 to-blue-500" },
    { name: "Base44", gradient: "bg-gradient-to-r from-indigo-400 to-purple-500" },
    { name: "And More", gradient: "bg-gradient-to-r from-gray-500 to-slate-600" }
  ];

  const ArrowSvg = () => (
    <div className="relative h-20 w-full max-w-3xl mx-auto mb-2 hidden md:block">
      <svg width="100%" height="100%" viewBox="0 0 600 80" preserveAspectRatio="none" className="absolute inset-0">
        <defs>
          <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#a8a29e', stopOpacity: 0}} />
            <stop offset="20%" style={{stopColor: '#a8a29e', stopOpacity: 1}} />
            <stop offset="80%" style={{stopColor: '#a8a29e', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#a8a29e', stopOpacity: 0}} />
          </linearGradient>
          <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="5" refY="1.75" orient="auto">
            <polygon points="0 0, 5 1.75, 0 3.5" fill="#a8a29e" />
          </marker>
        </defs>

        {/* Start point x=300, y=5. End points y=75 */}
        {[37.5, 112.5, 187.5, 262.5, 337.5, 412.5, 487.5, 562.5].map((endX, i) => (
            <path
              key={i}
              d={`M 300 5 Q ${(300 + endX) / 2} 40 ${endX} 75`}
              stroke="url(#arrow-gradient)"
              strokeWidth="1"
              fill="none"
              markerEnd="url(#arrowhead)"
              style={{
                opacity: 0.5
              }}
            />
        ))}
      </svg>
    </div>
  );

  return (
    <section id="tools" className="py-20 lg:py-24 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f1f5f9_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
                <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight text-slate-900">
                    Learn the AI Tools That
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Matter for CRE
                    </span>
                </h2>

                <ArrowSvg />

                <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 mb-16 max-w-5xl mx-auto mt-8">
                  {tools.map((tool, index) => (
                    <motion.span
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`${tool.gradient} bg-clip-text text-transparent text-lg md:text-xl lg:text-2xl font-bold hover:scale-110 transition-transform duration-300 cursor-default text-center px-3 py-2 whitespace-nowrap`}
                    >
                      {tool.name}
                    </motion.span>
                  ))}
                </div>
            </motion.div>
        </div>
    </section>
  );
}
