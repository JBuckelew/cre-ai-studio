Deno.serve(async (req: Request): Promise<Response> => {
  try {
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const gaApiSecret = Deno.env.get("GA4_API_SECRET") ?? Deno.env.get("GA44_API_SECRET") ?? Deno.env.get("GA44-API-SECRET");

    if (!webhookSecret) {
      console.log("webhook secret not configured");
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

    if (event.type !== "invoice.payment_succeeded") {
      return new Response("ok", { status: 200 });
    }

    const invoice = event.data?.object;
    if (!invoice) {
      return new Response("ok", { status: 200 });
    }

    // Ignore zero-amount invoices
    if (invoice.amount_paid === 0) {
      return new Response("ok", { status: 200 });
    }

    const subscriptionId = invoice.subscription;
    if (!subscriptionId) {
      return new Response("ok", { status: 200 });
    }

    if (!stripeKey) {
      console.log("STRIPE_SECRET_KEY not configured");
      return new Response("ok", { status: 200 });
    }

    // Determine if this is the first paid invoice (new customer) vs a renewal
    let newCustomer = true;
    try {
      const invoicesRes = await fetch(
        `https://api.stripe.com/v1/invoices?subscription=${encodeURIComponent(subscriptionId)}&limit=100`,
        { headers: { Authorization: `Bearer ${stripeKey}` } }
      );
      if (invoicesRes.ok) {
        const invoicesData = await invoicesRes.json();
        const allInvoices = invoicesData.data || [];
        const firstPaid = allInvoices.find((inv: any) => inv.amount_paid > 0);
        newCustomer = !firstPaid || firstPaid.id === invoice.id;
      }
    } catch (e) {
      console.log("failed to list invoices:", e.message);
    }

    // Find the GA client id from the originating Checkout Session
    let clientId: string | null = null;
    try {
      const sessionsRes = await fetch(
        `https://api.stripe.com/v1/checkout/sessions?subscription=${encodeURIComponent(subscriptionId)}&limit=1`,
        { headers: { Authorization: `Bearer ${stripeKey}` } }
      );
      if (sessionsRes.ok) {
        const sessionsData = await sessionsRes.json();
        const session = sessionsData.data && sessionsData.data[0];
        if (session && session.client_reference_id) {
          clientId = session.client_reference_id;
        }
      }
    } catch (e) {
      console.log("failed to retrieve checkout session:", e.message);
    }

    if (!clientId) {
      // Fall back to a stable pseudo id
      clientId = "server." + invoice.customer;
    }

    // POST to Google Analytics Measurement Protocol
    if (!gaApiSecret) {
      console.log("GA4_API_SECRET not configured — skipping GA report");
      return new Response("ok", { status: 200 });
    }

    try {
      const gaRes = await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=G-V6HYB523GP&api_secret=${gaApiSecret}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: clientId,
            events: [
              {
                name: "purchase",
                params: {
                  value: invoice.amount_paid / 100,
                  currency: (invoice.currency || "usd").toUpperCase(),
                  transaction_id: invoice.id,
                  new_customer: newCustomer,
                  billing_reason: invoice.billing_reason,
                },
              },
            ],
          }),
        }
      );
      if (!gaRes.ok) {
        console.log("GA4 MP collect failed:", gaRes.status, await gaRes.text());
      }
    } catch (e) {
      console.log("GA4 MP collect error:", e.message);
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return new Response("ok", { status: 200 });
  }
});