import { getCheckoutSummary } from "@/functions/getCheckoutSummary";

export function trackCheckoutConversion(sessionId) {
  if (!sessionId) return;

  const dedupeKey = `tracked_${sessionId}`;
  if (localStorage.getItem(dedupeKey)) return;

  getCheckoutSummary({ session_id: sessionId })
    .then((res) => {
      const data = res.data;
      if (!data || data.error) return;

      const pollFor = (isReady, fire) => {
        const attempt = (tries) => {
          if (tries <= 0) return;
          if (isReady()) {
            try {
              fire();
            } catch (e) {
              console.error("Tracking fire error:", e);
            }
          } else {
            setTimeout(() => attempt(tries - 1), 300);
          }
        };
        attempt(15);
      };

      if (data.mode === "subscription") {
        pollFor(
          () => typeof window.gtag === "function",
          () => window.gtag("event", "sign_up", { method: "stripe_checkout" })
        );
        pollFor(
          () => typeof window.fbq === "function",
          () => window.fbq("track", "StartTrial", { value: 0, currency: "USD" })
        );
        localStorage.setItem(dedupeKey, "1");
      } else if (data.mode === "payment") {
        const value = data.amount_total / 100;
        const currency = (data.currency || "usd").toUpperCase();
        pollFor(
          () => typeof window.gtag === "function",
          () =>
            window.gtag("event", "purchase", {
              transaction_id: data.session_id,
              value,
              currency,
            })
        );
        pollFor(
          () => typeof window.fbq === "function",
          () =>
            window.fbq(
              "track",
              "Purchase",
              { value, currency },
              { eventID: data.session_id }
            )
        );
        localStorage.setItem(dedupeKey, "1");
      }
    })
    .catch((e) => console.error("Failed to fetch checkout summary:", e));
}