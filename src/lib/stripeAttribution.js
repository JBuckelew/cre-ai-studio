/**
 * Reads the _ga cookie and extracts the GA client id (XXXXXXXX.YYYYYYYY).
 * Returns null if the cookie is missing or malformed.
 */
export function getGAClientId() {
  try {
    const gaCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('_ga='));
    if (gaCookie) {
      const parts = gaCookie.split('.');
      if (parts.length >= 4) {
        return parts.slice(2).join('.');
      }
    }
  } catch (e) {}
  return null;
}

/**
 * Stripe SILENTLY DROPS client_reference_id when the value contains a period.
 * Verified 2026-08-12 with two checkout sessions on the same payment link:
 *   "664482884.1786569868"  -> stored as null
 *   "664482884-1786569868"  -> stored correctly
 * GA client ids are always "digits.digits", so they must be hyphenated in
 * transit. stripeInvoiceWebhook converts the hyphen back to a dot before
 * reporting to the GA4 Measurement Protocol.
 */
export function getStripeSafeClientId() {
  const clientId = getGAClientId();
  return clientId ? clientId.replace('.', '-') : null;
}

/**
 * Appends client_reference_id=<GA client id> to a buy.stripe.com URL.
 * Keeps all existing params intact. Returns the original URL unchanged
 * if it's not a Stripe link or the _ga cookie is missing.
 */
export function enhanceStripeUrl(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.indexOf('buy.stripe.com') === -1) {
      return url;
    }
    const clientId = getStripeSafeClientId();
    if (clientId) {
      urlObj.searchParams.set('client_reference_id', clientId);
    }
    return urlObj.toString();
  } catch (e) {
    return url;
  }
}