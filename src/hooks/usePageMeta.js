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
 * Twitter Card, and canonical URL.
 *
 * All meta is set in a single useEffect (not during render) so that, on
 * navigation, the old page's cleanup runs before the new page's effect.
 *
 * @param {Object} opts
 * @param {string} [opts.title] - Page title (site name appended unless appendSiteName is false).
 * @param {string} [opts.description] - Meta description.
 * @param {string} [opts.path] - Route path, e.g. "/Resources". Used for canonical + og:url.
 * @param {string} [opts.canonical] - Full canonical URL (overrides path-based canonical).
 * @param {string} [opts.image] - Absolute URL for og:image / twitter:image.
 * @param {string} [opts.ogImageAlt] - og:image:alt text.
 * @param {string} [opts.ogTitle] - Overrides og:title / twitter:title (defaults to full title).
 * @param {string} [opts.ogDescription] - Overrides og:description (defaults to description).
 * @param {string} [opts.twitterDescription] - Overrides twitter:description (defaults to ogDescription or description).
 * @param {string} [opts.type="website"] - og:type.
 * @param {boolean} [opts.cleanOgOnUnmount] - If true, removes og:image, og:image:alt, twitter:image and og:url on unmount.
 * @param {boolean} [opts.appendSiteName=true] - If false, title is used as-is.
 */
export function usePageMeta({
  title,
  description,
  path,
  canonical,
  image,
  ogImageAlt,
  ogTitle,
  ogDescription,
  twitterDescription,
  type = "website",
  noCanonical,
  cleanOgOnUnmount,
  appendSiteName = true,
} = {}) {

  // All head writes happen in a single useEffect so that, on navigation,
  // the old page's cleanup runs before the new page's effect — the new
  // page's values always win. Nothing writes to the head during render.
  useEffect(() => {
    if (typeof document === "undefined") return;

    const fullTitle = title ? (appendSiteName ? `${title} | ${SITE_NAME}` : title) : SITE_NAME;
    document.title = fullTitle;

    if (description) {
      upsertMeta('meta[name="description"]', "name", "description").setAttribute("content", description);
    }

    // Open Graph
    const ogTitleValue = ogTitle || fullTitle;
    upsertMeta('meta[property="og:title"]', "property", "og:title").setAttribute("content", ogTitleValue);

    const ogDescValue = ogDescription || description;
    if (ogDescValue) {
      upsertMeta('meta[property="og:description"]', "property", "og:description").setAttribute("content", ogDescValue);
    }

    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name").setAttribute("content", SITE_NAME);
    upsertMeta('meta[property="og:type"]', "property", "og:type").setAttribute("content", type);

    if (image) {
      upsertMeta('meta[property="og:image"]', "property", "og:image").setAttribute("content", image);
    }

    if (ogImageAlt) {
      upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt").setAttribute("content", ogImageAlt);
    }

    // Canonical + og:url
    if (noCanonical) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    } else {
      const canonicalUrl = canonical || (path ? BASE_URL + (path === "/" ? "/" : path) : null);
      if (canonicalUrl) {
        upsertMeta('meta[property="og:url"]', "property", "og:url").setAttribute("content", canonicalUrl);
        upsertLink("canonical").setAttribute("href", canonicalUrl);
      }
    }

    // Twitter Card
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card").setAttribute("content", image ? "summary_large_image" : "summary");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title").setAttribute("content", ogTitleValue);
    const twDescValue = twitterDescription || ogDescValue;
    if (twDescValue) {
      upsertMeta('meta[name="twitter:description"]', "name", "twitter:description").setAttribute("content", twDescValue);
    }
    if (image) {
      upsertMeta('meta[name="twitter:image"]', "name", "twitter:image").setAttribute("content", image);
    }

    // Og cleanup: reset og:image / twitter:image to the default logo on prod
    // (so the next page never keeps the previous page's images), or remove
    // them on non-prod hosts. Always remove og:image:alt and og:url.
    if (!cleanOgOnUnmount) return;
    const DEFAULT_OG_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/render/image/public/base44-prod/public/68a7d83d574299e5af5ccbd3/4da799a0b_CREAIStudioLogoDesign.png?width=1200&height=630&resize=contain";
    const IS_PROD = ["creaistudio.com", "www.creaistudio.com"].includes(window.location.hostname);
    return () => {
      if (IS_PROD) {
        upsertMeta('meta[property="og:image"]', "property", "og:image").setAttribute("content", DEFAULT_OG_IMAGE);
        upsertMeta('meta[name="twitter:image"]', "name", "twitter:image").setAttribute("content", DEFAULT_OG_IMAGE);
      } else {
        document.head.querySelector('meta[property="og:image"]')?.remove();
        document.head.querySelector('meta[name="twitter:image"]')?.remove();
      }
      document.head.querySelector('meta[property="og:image:alt"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    };
  }, [title, description, path, canonical, image, ogImageAlt, ogTitle, ogDescription, twitterDescription, type, noCanonical, cleanOgOnUnmount, appendSiteName]);
}

/**
 * Sets or creates a <meta name="..."> tag with the given content.
 */
export function setMeta(name, content) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}