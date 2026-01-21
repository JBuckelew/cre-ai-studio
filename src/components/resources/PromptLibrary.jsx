import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode } from "lucide-react";
import { motion } from "framer-motion";

export default function PromptLibrary() {
  const prompts = [
    {
      id: 1,
      title: "Build a Skill in Claude (with CRE T12 Analyzer example)",
      description: "Learn how to create custom Claude Skills for repetitive CRE tasks like analyzing financial statements, building OMs, and more. Includes a step-by-step guide and T12 analyzer example.",
      category: "Analysis",
      url: "https://cre-ai-studio.circle.so/c/prompt-library/build-a-skill-in-claude-with-cre-t12-analyzer-example-113330e3-d0a7-4e2f-a4ed-748bd1cc651f",
      tags: ["Claude", "Analysis", "Multifamily"]
    },
    {
      id: 2,
      title: "Building a Financial Model using an OM",
      description: "Quick underwriting model prompt for Claude Opus 4.5. Includes inputs for purchase price, units, rent, operating expenses, financing, and outputs cash-on-cash returns with sensitivity analysis.",
      category: "Analysis",
      url: "https://cre-ai-studio.circle.so/c/prompt-library/building-a-financial-model-using-an-om-use-claude-opus-4-5-5fed923b-743b-4a84-8d9d-fba156f49630",
      tags: ["Claude", "Underwriting", "Excel"]
    },
    {
      id: 3,
      title: "Lease Comp Data Analyst GPT",
      description: "Upload lease comps and easily pull data via chat. Filter by location, space type, date range, square footage, and lease rate. Includes visualization and high-level insights.",
      category: "Analysis",
      url: "https://cre-ai-studio.circle.so/c/prompt-library/lease-comp-data-analyst-gpt-0ff4a86a-721f-4877-8494-a47dc840c176",
      tags: ["ChatGPT", "Data Analysis", "Leasing"]
    },
    {
      id: 4,
      title: "Prospect Finder Pro (Brainstorm 25 Potential Tenants)",
      description: "Three-step workflow to discover space profile, propose 25 tailored tenant types, and generate 25 real local companies with contact information for your vacancy.",
      category: "Leasing",
      url: "https://cre-ai-studio.circle.so/c/prompt-library/prospect-finder-pro-brainstorm-25-potential-tenants-for-your-space-3f13a669-8e19-4624-a813-7d656e622a22",
      tags: ["ChatGPT", "Leasing", "Prospecting"]
    },
    {
      id: 5,
      title: "Multi-Family Asset Manager - Monthly Performance",
      description: "Analyze T12s, Actual vs Budget P&Ls, and rent rolls. Extract KPIs, identify NOI drivers, analyze variances, highlight red flags, and get actionable recommendations.",
      category: "Asset Management",
      url: "https://cre-ai-studio.circle.so/c/prompt-library/multi-family-asset-manager-monthly-performance-prompt-9555e351-fdc6-446b-899a-fb5c23d84ec6",
      tags: ["ChatGPT", "Asset Management", "Multifamily"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-purple-600 text-white">
            <FileCode className="w-4 h-4 mr-2" />
            Free Prompts
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            CRE AI{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prompt Library
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready-to-use AI prompts for commercial real estate workflows. Copy, customize, and implement.
          </p>
        </motion.div>

        {/* Prompts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-purple-200 group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                      {prompt.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-purple-600 transition-colors">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {prompt.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prompt.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-slate-300 text-slate-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    onClick={() => window.open(prompt.url, '_blank')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white group/btn"
                  >
                    View Prompt
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 border-2 border-purple-100"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Want More Prompts?
          </h3>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            Members get access to our full prompt library with new prompts added weekly, plus live training on how to customize them for your workflows.
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/FreeTrialPayment'}
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-xl"
          >
            Start Free Trial
          </Button>
        </motion.div>
      </div>
    </section>
  );
}