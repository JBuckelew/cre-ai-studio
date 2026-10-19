import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getUseCaseBySlug } from "@/data/useCases";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Lightbulb, ChevronDown } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function UseCaseArticle() {
  const { slug } = useParams();
  const article = getUseCaseBySlug(slug);

  const ogImageAbsolute = article?.ogImage
    ? `${window.location.origin}${article.ogImage}`
    : undefined;

  usePageMeta({
    title: article?.titleTag,
    description: article?.metaDescription,
    path: `/use-cases/${slug}`,
    image: ogImageAbsolute,
    type: "article",
    appendSiteName: false,
    noindex: true,
  });

  useEffect(() => {
    if (!article) return;

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", article.ogDescription);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", article.twitterDescription);

    let ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (!ogImageAlt) {
      ogImageAlt = document.createElement("meta");
      ogImageAlt.setAttribute("property", "og:image:alt");
      document.head.appendChild(ogImageAlt);
    }
    ogImageAlt.setAttribute("content", article.ogImageAlt);

    // Inject articleJsonLd and faqPageJsonLd from the data
    const scriptArticle = document.createElement("script");
    scriptArticle.type = "application/ld+json";
    scriptArticle.setAttribute("data-usecase-ld", "article");
    scriptArticle.text = JSON.stringify(article.articleJsonLd);
    document.head.appendChild(scriptArticle);

    const scriptFaq = document.createElement("script");
    scriptFaq.type = "application/ld+json";
    scriptFaq.setAttribute("data-usecase-ld", "faq");
    scriptFaq.text = JSON.stringify(article.faqPageJsonLd);
    document.head.appendChild(scriptFaq);

    return () => {
      document.head.removeChild(scriptArticle);
      document.head.removeChild(scriptFaq);
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

  const hasChips =
    (article.filedUnder?.tools && article.filedUnder.tools.length > 0) ||
    (article.filedUnder?.tasks && article.filedUnder.tasks.length > 0);

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
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-4">
            {article.dek}
          </p>
          <p className="text-sm text-white/50">
            By CRE AI Studio Editorial · {article.bylineDate} · {article.readMins} min read
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

        {/* Credit Box */}
        <div className="use-case-credit-box text-sm text-slate-500 mb-10 pb-6 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Use case credit
          </p>
          <p className="mb-2">
            <strong className="text-slate-900">{article.creatorName}</strong>{" "}
            <a
              href={article.creatorProfileUrl}
              target="_blank"
              rel="noopener"
              className="use-case-link"
            >
              {article.creatorHandle}
            </a>
          </p>
          <p className="mb-3">{article.creditLine}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener"
                className="use-case-link inline-flex items-center gap-1"
              >
                Read the original post on X
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
            {article.extraSources.map((extra, i) => (
              <a
                key={i}
                href={extra.url}
                target="_blank"
                rel="noopener"
                className="use-case-link inline-flex items-center gap-1"
              >
                · {extra.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Filed Under Chips */}
        {hasChips && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <span className="text-sm text-slate-500 font-medium mr-1">
              Filed under:
            </span>
            {(article.filedUnder?.tools || []).map((tool) => (
              <Link
                key={tool.key}
                to={tool.href}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                {tool.name}
              </Link>
            ))}
            {(article.filedUnder?.tasks || []).map((task) => (
              <Link
                key={task.key}
                to={task.href}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                {task.name}
              </Link>
            ))}
          </div>
        )}

        {/* Body */}
        <div
          className="use-case-body"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />

        {/* FAQ */}
        <div className="mt-16 use-case-faq">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
            {article.faqHeading}
          </h2>
          <div className="space-y-4">
            {article.faq.map((item, index) => (
              <details
                key={index}
                className="border border-slate-200 rounded-2xl px-6 bg-white"
              >
                <summary className="cursor-pointer text-left text-base font-bold text-slate-900 py-5 flex items-center justify-between">
                  {item.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 faq-chevron transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="text-slate-600 text-base leading-relaxed pb-6">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {article.related && article.related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
              More AI use cases
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {article.related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/use-cases/${rel.slug}`}
                  className="block group h-full"
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                        {rel.dek}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

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