import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Map Stripe Payment Link URL slugs to referral sources.
// These are the unique identifiers in the buy.stripe.com URLs from VibeCodeWorkshopCard.
const PAYMENT_LINK_MAP: Record<string, string> = {
  "3cIaEY9WfbPgfFvazAcV20r": "cre-daily",
  "eVq4gAd8rdXo2SJ8rscV20s": "mfn",
  "14A3cw3xR8D48d3gXYcV20q": "cre-ai-studio",
};

function sourceFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  for (const [slug, source] of Object.entries(PAYMENT_LINK_MAP)) {
    if (url.includes(slug)) return source;
  }
  return null;
}

Deno.serve(async (req: Request): Promise<Response> => {
  try {
    const webhookSecret = Deno.env.get("STRIPE_WORKSHOP_WEBHOOK_SECRET");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!webhookSecret) {
      console.log("workshop webhook secret not configured");
      return new Response("ok", { status: 200 });
    }

    const body = await req.text();
    const signatureHeader = req.headers.get("stripe-signature");

    if (!signatureHeader) {
      console.log("missing stripe-signature header");
      return new Response("ok", { status: 200 });
    }

    // Verify Stripe webhook signature manually via Web Crypto
    const parts = signatureHeader.split(",");
    const tPart = parts.find((p) => p.startsWith("t="));
    const v1Part = parts.find((p) => p.startsWith("v1="));
    if (!tPart || !v1Part) {
      console.log("malformed stripe-signature header");
      return new Response("ok", { status: 200 });
    }

    const timestamp = tPart.split("=")[1];
    const signature = v1Part.split("=")[1];

    // Reject timestamps older than 5 minutes
    const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
    if (isNaN(age) || age > 300 || age < -300) {
      console.log("stripe-signature timestamp out of tolerance");
      return new Response("ok", { status: 200 });
    }

    const signedPayload = `${timestamp}.${body}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(webhookSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const expectedBuf = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(signedPayload)
    );
    const expectedHex = Array.from(new Uint8Array(expectedBuf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (expectedHex !== signature) {
      console.log("invalid stripe-signature");
      return new Response("invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    // Only handle completed checkout sessions (one-time workshop payments)
    if (event.type !== "checkout.session.completed") {
      return new Response("ok", { status: 200 });
    }

    const session = event.data?.object;
    if (!session) {
      return new Response("ok", { status: 200 });
    }

    // Determine the referral source from the Stripe Payment Link URL
    // Only workshop Payment Links count; ignore membership and other checkouts
    let source: string | null = null;
    if (session.payment_link && stripeKey) {
      try {
        const plRes = await fetch(
          `https://api.stripe.com/v1/payment_links/${encodeURIComponent(session.payment_link)}`,
          { headers: { Authorization: `Bearer ${stripeKey}` }, signal: AbortSignal.timeout(10000) }
        );
        if (plRes.ok) {
          const plData = await plRes.json();
          source = sourceFromUrl(plData.url);
        }
      } catch (e) {
        console.log("failed to retrieve payment link:", e.message);
      }
    }

    if (!source) {
      console.log("not a workshop checkout, skipping:", session.id);
      return new Response("ok", { status: 200 });
    }

    const base44 = createClientFromRequest(req);

    // Idempotency: skip if this session was already recorded
    const existing = await base44.asServiceRole.entities.WorkshopSignup.filter({
      stripe_session_id: session.id,
    });
    if (existing && existing.length > 0) {
      console.log("workshop signup already recorded:", session.id);
      return new Response("ok", { status: 200 });
    }

    await base44.asServiceRole.entities.WorkshopSignup.create({
      email: session.customer_details?.email || session.customer_email || "",
      source,
      stripe_session_id: session.id,
      amount: (session.amount_total || 0) / 100,
    });

    console.log("workshop signup recorded:", source, session.id);
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Workshop webhook error:", error.message);
    return new Response("ok", { status: 200 });
  }
});