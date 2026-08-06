const STORAGE_KEY = "cre_attribution";

/**
 * On first page load, capture the visitor's first-touch attribution and
 * store it in localStorage so it survives navigation. Only writes once —
 * if "cre_attribution" already exists, this is a no-op.
 */
export function captureFirstTouchAttribution() {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
  } catch {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmTerm = params.get("utm_term");
  const utmContent = params.get("utm_content");
  const referrer = document.referrer;

  const hasUtms = utmSource || utmMedium || utmCampaign || utmTerm || utmContent;

  let source, medium;
  if (hasUtms) {
    source = utmSource || "";
    medium = utmMedium || "";
  } else if (referrer) {
    try {
      const refHost = new URL(referrer).hostname.replace(/^www\./, "");
      const siteHost = window.location.hostname.replace(/^www\./, "");
      const isSelfReferral =
        refHost === siteHost ||
        refHost === "creaistudio.com" ||
        refHost.endsWith(".creaistudio.com") ||
        refHost.endsWith(".base44.app") ||
        refHost === "buy.stripe.com";
      if (isSelfReferral) {
        source = "direct";
        medium = "none";
      } else {
        source = refHost;
        medium = "referral";
      }
    } catch {
      source = "direct";
      medium = "none";
    }
  } else {
    source = "direct";
    medium = "none";
  }

  const attribution = {
    utm_source: source,
    utm_medium: medium,
    utm_campaign: utmCampaign || "",
    utm_term: utmTerm || "",
    utm_content: utmContent || "",
    referrer,
    landing_page: window.location.pathname,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // ignore
  }
}

/**
 * Read the stored first-touch attribution object, or null if not set.
 */
export function getAttribution() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}