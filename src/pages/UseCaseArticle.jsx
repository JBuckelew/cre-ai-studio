import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getUseCaseBySlug } from "@/data/useCases";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft, Lightbulb } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function UseCaseArticle() {
  const { slug } = useParams();
  const article = getUseCaseBySlug(slug);

  usePageMeta({
    title: article?.titleTag,
    description: article?.metaDescription,
    path: `/use-cases/${slug}`,
    image: article?.heroImage,
    type: "article",
    appendSiteName: false,
  });

  useEffect(() => {
    if (!article) return;

    // Override og:description and twitter:description with article-specific values
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", article.ogDescription);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", article.twitterDescription);

    // og:image:alt
    let ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (!ogImageAlt) {
      ogImageAlt = document.createElement("meta");
      ogImageAlt.setAttribute("property", "og:image:alt");
      document.head.appendChild(ogImageAlt);
    }
    ogImageAlt.setAttribute("content", article.ogImageAlt);

    // JSON-LD: Article
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.h1,
      description: article.metaDescription,
      image: article.heroImage,
      author: { "@type": "Organization", name: "CRE AI Studio" },
      publisher: {
        "@type": "Organization",
        name: "CRE AI Studio",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": article.canonicalPlaceholder,
      },
    };

    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    const scriptArticle = document.createElement("script");
    scriptArticle.type = "application/ld+json";
    scriptArticle.setAttribute("data-usecase-ld", "article");
    scriptArticle.text = JSON.stringify(articleLd);
    document.head.appendChild(scriptArticle);

    const scriptFaq = document.createElement("script");
    scriptFaq.type = "application/ld+json";
    scriptFaq.setAttribute("data-usecase-ld", "faq");
    scriptFaq.text = JSON.stringify(faqLd);
    document.head.appendChild(scriptFaq);

    return () => {
      document.head.removeChild(scriptArticle);
      document.head.removeChild(scriptFaq);
      if (ogImageAlt && !ogImageAlt.getAttribute("data-usecase-ld")) {
        // leave the alt meta; it will be overwritten next time
      }
    };
  }, [article, slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Use Case Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The article you're looking for doesn't exist.
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
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Link
            to="/use-cases"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All AI Use Cases
          </Link>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 pb-2 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            {article.h1}
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            {article.dek}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Short Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div
              className="text-slate-700 leading-relaxed [&_strong]:font-bold [&_strong]:text-slate-900"
              dangerouslySetInnerHTML={{ __html: article.answerHtml }}
            />
          </div>
        </div>

        {/* Hero Image */}
        <figure className="mb-4">
          <img
            src={article.heroImage}
            alt={article.ogImageAlt}
            className="w-full rounded-2xl shadow-lg"
          />
          <figcaption className="text-sm text-slate-500 mt-3 text-center italic">
            {article.imageCaption}
          </figcaption>
        </figure>

        {/* Credit */}
        <p
          className="text-sm text-slate-500 mb-10 pb-6 border-b border-slate-200"
          dangerouslySetInnerHTML={{ __html: article.creditHtml }}
        />

        {/* Body */}
        <div
          className="use-case-body"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
            {article.faqHeading}
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {article.faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-slate-200 rounded-2xl px-6 bg-white"
              >
                <AccordionTrigger className="text-left text-base font-bold text-slate-900 hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </article>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative p-12 md:p-16 text-center text-white">
              <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                Want more AI workflows for CRE?
              </h3>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of CRE professionals learning AI through weekly lessons, live Q&A, and 24/7 founder access.
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