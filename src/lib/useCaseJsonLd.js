/**
 * Shared helpers for injecting data-usecase-ld JSON-LD script tags.
 * Used by UseCaseArticle, UseCaseCategoryPage, and UseCases.
 */

export function clearUseCaseJsonLd() {
  if (typeof document === "undefined") return;
  document.querySelectorAll('script[data-usecase-ld]').forEach(s => s.remove());
}

export function injectUseCaseJsonLd(id, data) {
  if (typeof document === "undefined" || !data) return;
  let script = document.head.querySelector(`script[data-usecase-ld="${id}"]`);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-usecase-ld", id);
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(data);
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}