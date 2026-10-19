import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getCategory, robotsForHost } from "@/data/useCases";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

export default function UseCaseCategoryPage({ type, param }) {
  const c = getCategory(type, param);

  usePageMeta({
    title: c?.titleTag,
    description: c?.metaDescription,
    canonical: c?.canonical,
    path: c?.path,
    ogTitle: c?.ogTitle,
    ogDescription: c?.ogDescription,
    image: c?.ogImage,
    ogImageAlt: c?.ogImageAlt,
    appendSiteName: false,
    robots: robotsForHost(),
  });

  if (!c) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link to="/use-cases">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AI Use Cases
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/60 mb-6">
            {c.breadcrumb.map((crumb, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-1.5">›</span>}
                {crumb.href ? (
                  crumb.href.startsWith("http") ? (
                    <a
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.name}
                    </a>
                  ) : (
                    <Link
                      to={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )
                ) : (
                  <span className="text-white">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">
            {c.heroKicker}
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 pb-2 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            {c.h1}
          </h1>
          <p className="text-lg text-white/70">{c.intro}</p>
        </div>
      </section>

      {/* Other chips */}
      <section className="py-8 px-6 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-500 font-medium mr-1">
              {c.otherLabel}:
            </span>
            {c.other.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">{c.listHeading}</h2>
            <Link
              to={c.allLink.href}
              className="text-blue-600 font-semibold text-sm hover:underline"
            >
              {c.allLink.text}
            </Link>
          </div>
          <div className="space-y-8">
            {c.items.map((item) => (
              <Link
                key={item.slug}
                to={item.href}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        src={item.heroImageSrc}
                        alt={item.imageAlt}
                        className="w-full h-auto object-contain md:w-64 md:h-auto"
                      />
                    </div>
                    <div className="p-8 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                          {item.kicker}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {item.dek}
                      </p>
                      <p className="text-xs text-slate-400">{item.creditLine}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative p-12 md:p-16 text-center text-white">
              <p className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                Want more AI workflows for CRE?
              </p>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of CRE professionals learning AI through weekly
                lessons, live Q&A, and 24/7 founder access.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-full px-10 py-5 text-lg shadow-xl transition-all duration-300 group"
                onClick={() =>
                  (window.location.href = createPageUrl("FreeTrialPayment"))
                }
              >
                Start Your 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-blue-200 mt-4">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}