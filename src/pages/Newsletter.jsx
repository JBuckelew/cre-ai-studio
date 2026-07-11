import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import NewsletterHero from "@/components/newsletter/NewsletterHero";
import NewsletterTestimonials from "@/components/newsletter/NewsletterTestimonials";
import Footer from "@/components/Footer";

export default function Newsletter() {
  usePageMeta({
    title: "The CRE AI Studio Newsletter | Free AI Tutorials for Commercial Real Estate",
    description: "Free weekly AI tutorials, prompt libraries, and real CRE workflows delivered to your inbox. Join hundreds of commercial real estate professionals learning to use AI. Subscribe free.",
    path: "/Newsletter",
    appendSiteName: false,
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-slate-900">
            CRE <span className="text-blue-600">AI Studio</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <NewsletterHero />
        <NewsletterTestimonials />
      </main>

      <Footer />
    </div>
  );
}