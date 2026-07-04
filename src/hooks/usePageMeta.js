import { useEffect } from "react";

const SITE_NAME = "CRE | AI Studio";
const BASE_URL = "https://creaistudio.com";

function upsertMeta(selector, keyAttr, keyValue) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(keyAttr, keyValue);
    document.head.appendChild(el);
  }
  return el;
}

function upsertLink(rel) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Sets per-page SEO meta: document title, meta description, Open Graph,
 * Twitter Card, canonical URL, and robots directives.
 *
 * @param {Object} opts
 * @param {string} [opts.title] - Page title (site name is appended). Omit for home/brand-only.
 * @param {string} [opts.description] - Meta description.
 * @param {string} [opts.path] - Route path, e.g. "/Resources". Used for canonical + og:url.
 * @param {string} [opts.image] - Absolute URL for og:image / twitter:image.
 * @param {string} [opts.type="website"] - og:type.
 * @param {boolean} [opts.noindex=false] - If true, sets noindex,nofollow.
 */
export function usePageMeta({ title, description, path, image, type = "website", noindex = false, appendSiteName = true } = {}) {
  useEffect(() => {
    const fullTitle = title ? (appendSiteName ? `${title} | ${SITE_NAME}` : title) : SITE_NAME;
    document.title = fullTitle;

    if (description) {
      upsertMeta('meta[name="description"]', "name", "description").setAttribute("content", description);
    }

    // Open Graph
    upsertMeta('meta[property="og:title"]', "property", "og:title").setAttribute("content", fullTitle);
    if (description) {
      upsertMeta('meta[property="og:description"]', "property", "og:description").setAttribute("content", description);
    }
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name").setAttribute("content", SITE_NAME);
    upsertMeta('meta[property="og:type"]', "property", "og:type").setAttribute("content", type);
    if (image) {
      upsertMeta('meta[property="og:image"]', "property", "og:image").setAttribute("content", image);
    }
    if (path) {
      const url = BASE_URL + (path === "/" ? "/" : path);
      upsertMeta('meta[property="og:url"]', "property", "og:url").setAttribute("content", url);
      upsertLink("canonical").setAttribute("href", url);
    }

    // Twitter Card
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card").setAttribute("content", image ? "summary_large_image" : "summary");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title").setAttribute("content", fullTitle);
    if (description) {
      upsertMeta('meta[name="twitter:description"]', "name", "twitter:description").setAttribute("content", description);
    }
    if (image) {
      upsertMeta('meta[name="twitter:image"]', "name", "twitter:image").setAttribute("content", image);
    }

    // Robots
    upsertMeta('meta[name="robots"]', "name", "robots").setAttribute("content", noindex ? "noindex, nofollow" : "index, follow");
  }, [title, description, path, image, type, noindex, appendSiteName]);
}