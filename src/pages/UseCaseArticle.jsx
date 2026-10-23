import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getUseCaseBySlug } from "@/data/useCases";
import { setNotFoundFlag } from "@/lib/notFoundFlag";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Lightbulb, ChevronDown } from "lucide-react";
import { createPageUrl } from "@/utils";
import { clearUseCaseJsonLd, injectUseCaseJsonLd, breadcrumbJsonLd } from "@/lib/useCaseJsonLd";

export default function UseCaseArticle({ slug: slugProp }) {
  const { slug: slugParam } = useParams();
  const slug = slugProp || slugParam;
  const uc = getUseCaseBySlug(slug);

  const breadcrumbLd = uc
    ? breadcrumbJsonLd([
        { name: "Home", url: "https://creaistudio.com/" },
        { name: "AI Use Cases", url: "https://creaistudio.com/use-cases" },
        { name: uc.h1, url: `https://creaistudio.com/use-cases/${slug}` },
      ])
    : null;

  if (!uc) setNotFoundFlag(true);

  usePageMeta({
    title: uc ? uc.titleTag : "Use case not found | CRE AI Studio",
    description: uc ? uc.metaDescription : "This use case could not be found. Browse all AI use cases for commercial real estate at CRE AI Studio.",
    path: uc ? `/use-cases/${slug}` : undefined,
    image: uc?.ogImage,
    ogDescription: uc?.ogDescription,
    twitterDescription: uc?.twitterDescription,
    ogImageAlt: uc?.ogImageAlt,
    type: "article",
    appendSiteName: false,
    noCanonical: !uc,
    cleanOgOnUnmount: true,
  });

  // Inject JSON-LD synchronously during render so prerenderers
  // capture structured data on the first paint.
  if (uc) {
    clearUseCaseJsonLd();
    injectUseCaseJsonLd("article", uc.articleJsonLd);
    injectUseCaseJsonLd("faq", uc.faqPageJsonLd);
    injectUseCaseJsonLd("breadcrumb", breadcrumbLd);
  } else {
    clearUseCaseJsonLd();
  }

  // Re-inject after cleanup from previous page, and clean up on unmount.
  useEffect(() => {
    if (uc) {
      clearUseCaseJsonLd();
      injectUseCaseJsonLd("article", uc.articleJsonLd);
      injectUseCaseJsonLd("faq", uc.faqPageJsonLd);
      injectUseCaseJsonLd("breadcrumb", breadcrumbLd);
    }
    return () => clearUseCaseJsonLd();
  }, [slug]);

  // Add a "Copy prompt" button to every prompt block in the article body.
  useEffect(() => {
    if (!uc) return;
    document.querySelectorAll(".use-case-body pre").forEach(pre => {
      if (pre.querySelector("button.copy-prompt")) return;
      const b = document.createElement("button");
      b.className = "copy-prompt absolute top-2 right-2 font-sans font-medium text-xs px-2 py-1 rounded-md bg-slate-800 text-white";
      b.type = "button"; b.textContent = "Copy prompt"; b.setAttribute("aria-label", "Copy prompt");
      b.onclick = () => navigator.clipboard.writeText(
        pre.innerText
          .replace(/^\[(?:CRE AI Studio|Optional add-on)[^\]]*\]:?[ \t]*(\r?\n|$)/gm, "")
          .replace(/^(Copy prompt|Copied)$/m, "")
          .trim()
      ).then(() => { b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy prompt"), 1500); });
      pre.classList.add("relative");
      pre.style.paddingTop = "2.75rem";
      pre.appendChild(b);
    });
  }, [uc?.slug]);

  if (!uc) {
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
    (uc.filedUnder?.tools && uc.filedUnder.tools.length > 0) ||
    (uc.filedUnder?.tasks && uc.filedUnder.tasks.length > 0);

  // Platform-aware credit: if creatorName is empty or matches the handle
  // without its @ / u/ / r/ prefix, show only the handle once.
  const handleBase = uc.creatorHandle ? uc.creatorHandle.replace(/^(@|u\/|r\/)/, "") : "";
  const showCreatorName = uc.creatorName && uc.creatorName !== handleBase;

  // Source link label: defaults to X when sourcePlatform is missing.
  const SOURCE_PLATFORM_NAMES = { X: "X", Reddit: "Reddit", LinkedIn: "LinkedIn" };
  const sourceLabel = SOURCE_PLATFORM_NAMES[uc.sourcePlatform] || SOURCE_PLATFORM_NAMES.X;

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
          <Link
            to={uc.kickerHref}
            className="block text-xs font-bold tracking-widest uppercase text-blue-600 no-underline mt-4"
          >
            {uc.kicker}
          </Link>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 pb-2 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            {uc.h1}
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-4">
            {uc.dek}
          </p>
          <div className="text-sm text-white/50">
            By CRE AI Studio Editorial · {uc.bylineDate} · {uc.readMins} min read
            <span className="block mt-0.5">{uc.aiNote}</span>
          </div>
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
              dangerouslySetInnerHTML={{ __html: uc.answerHtml }}
            />
          </div>
        </div>

        {/* Hero Image */}
        <figure className="mb-4">
          <img
            src={uc.heroImageSrc}
            alt={uc.ogImageAlt}
            className="w-full rounded-2xl shadow-lg"
          />
          <figcaption className="text-sm text-slate-500 mt-3 text-center italic">
            {uc.imageCaption}
          </figcaption>
        </figure>

        {/* Credit Box */}
        <div className="use-case-credit-box text-sm text-slate-500 mb-10 pb-6 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Use case credit
          </p>
          <p className="mb-2">
            {showCreatorName && <strong className="text-slate-900">{uc.creatorName}</strong>}
            {showCreatorName && " "}
            {uc.creatorProfileUrl ? (
              <a
                href={uc.creatorProfileUrl}
                target="_blank"
                rel="noopener"
                className="use-case-link"
              >
                {uc.creatorHandle}
              </a>
            ) : (
              <span>{uc.creatorHandle}</span>
            )}
          </p>
          <p className="mb-3">{uc.creditLine}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {uc.sourceUrl && (
              <a
                href={uc.sourceUrl}
                target="_blank"
                rel="noopener"
                className="use-case-link inline-flex items-center gap-1"
              >
                Read the original post on {sourceLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
            {uc.extraSources.map((extra, i) => (
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
            {(uc.filedUnder?.tools || []).map((tool) => (
              <Link
                key={tool.key}
                to={tool.href}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                {tool.name}
              </Link>
            ))}
            {(uc.filedUnder?.tasks || []).map((task) => (
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
          dangerouslySetInnerHTML={{ __html: uc.bodyHtml }}
        />

        {/* FAQ */}
        <div className="mt-16 use-case-faq">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
            {uc.faqHeading}
          </h2>
          <div className="space-y-4">
            {uc.faq.map((item, index) => (
              <details
                key={index}
                open={index === 0}
                className="border border-slate-200 rounded-2xl px-6 bg-white"
              >
                <summary className="cursor-pointer text-left text-base font-bold text-slate-900 py-5 flex items-center justify-between">
                  <h3 className="inline text-base font-bold m-0">{item.q}</h3>
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
        {uc.related && uc.related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl md:text-3xl font-black text-slate-900">
                {uc.relatedTitle}
              </p>
              <Link
                to="/use-cases"
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                All use cases →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {uc.related.map((r) => (
                <Link
                  key={r.slug}
                  to={r.href}
                  className="block group h-full"
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-[1200/630] border-b border-slate-200 bg-slate-900">
                      <img
                        src={r.heroImageSrc}
                        alt={r.imageAlt}
                        width={1200}
                        height={630}
                        className="w-full h-full object-contain block"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                        {r.kicker}
                      </span>
                      <p className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {r.title}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                        {r.dek}
                      </p>
                      <p className="text-xs text-slate-400 mt-3">{r.creditLine}</p>
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
                Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}