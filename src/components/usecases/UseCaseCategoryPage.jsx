import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useCases } from "@/data/useCases";
import { formatToolName, formatTaskName } from "@/lib/useCaseHelpers";
import UseCaseCard from "./UseCaseCard";
import { ArrowLeft } from "lucide-react";

export default function UseCaseCategoryPage({ type, param }) {
  const isTool = type === "tool";
  const label = isTool ? formatToolName(param) : formatTaskName(param);
  const filtered = useCases.filter((uc) => {
    if (isTool) return uc.tools && uc.tools.includes(param);
    return uc.tasks && uc.tasks.includes(param);
  });

  const h1 = `${label} AI use cases for CRE`;
  const description = `${label} AI use cases for commercial real estate professionals. Real-world workflows, copyable prompts, and what to check.`;

  usePageMeta({
    title: h1,
    description,
    path: `/use-cases/${type}/${param}`,
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Link
            to="/use-cases"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All AI Use Cases
          </Link>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 pb-2 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            {h1}
          </h1>
          <p className="text-lg text-white/70">
            {filtered.length} {filtered.length === 1 ? "workflow" : "workflows"} using {label.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {filtered.length > 0 ? (
            <div className="space-y-8">
              {filtered.map((uc) => (
                <UseCaseCard key={uc.slug} uc={uc} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-600 mb-6">
                No articles found for this category.
              </p>
              <Link
                to="/use-cases"
                className="text-blue-600 font-semibold hover:underline"
              >
                Back to all AI use cases
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}