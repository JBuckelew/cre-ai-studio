Deno.serve(async (req: Request): Promise<Response> => {
  try {
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? Deno.env.get("STRIPE-WEBHOOK-SECRET");
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

    const subscriptionId = invoice.subscription;
    if (!subscriptionId) {
      return new Response("ok", { status: 200 });
    }

    // For the first invoice of a subscription (trial-start or first paid),
    // subscribe the customer to the beehiiv newsletter.
    if (invoice.billing_reason === "subscription_create") {
      try {
        const beehiivApiKey = Deno.env.get("BEEHIIV_API_KEY");
        const beehiivPublicationId = Deno.env.get("BEEHIIV_PUBLICATION_ID");
        if (beehiivApiKey && beehiivPublicationId) {
          let customerEmail = invoice.customer_email;
          if (!customerEmail && invoice.customer && stripeKey) {
            try {
              const custRes = await fetch(
                `https://api.stripe.com/v1/customers/${encodeURIComponent(invoice.customer)}`,
                { headers: { Authorization: `Bearer ${stripeKey}` } }
              );
              if (custRes.ok) {
                const custData = await custRes.json();
                customerEmail = custData.email;
              }
            } catch (e) {
              console.log("failed to fetch customer for beehiiv:", e.message);
            }
          }
          if (customerEmail) {
            try {
              const beehiivRes = await fetch(
                `https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${beehiivApiKey}`,
                  },
                  body: JSON.stringify({
                    email: customerEmail,
                    reactivate_existing: false,
                    send_welcome_email: false,
                    status: "active",
                    utm_source: "stripe",
                    utm_medium: "trial_signup",
                  }),
                }
              );
              console.log("Beehiiv subscribe status:", beehiivRes.status);
            } catch (e) {
              console.log("Beehiiv subscribe error:", e.message);
            }
          } else {
            console.log("No customer email available for beehiiv subscribe");
          }
        } else {
          console.log("Beehiiv secrets not configured — skipping subscribe");
        }
      } catch (e) {
        console.log("Beehiiv bridge error:", e.message);
      }
    }

    // Ignore zero-amount invoices (e.g. $0 trial-start) after beehiiv subscribe
    if (invoice.amount_paid === 0) {
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
          // Stripe silently drops client_reference_id values containing a period,
          // so the site sends the GA client id as "digits-digits". Convert back to
          // the real GA client id ("digits.digits") before reporting to GA4.
          const raw = session.client_reference_id;
          clientId = /^\d+-\d+$/.test(raw) ? raw.replace("-", ".") : raw;
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

    // Build items array from the invoice's first line item
    const lineItem = invoice.lines?.data?.[0];
    const itemName = lineItem?.description || lineItem?.price?.nickname || "Subscription";
    const items = [{ item_name: itemName, price: invoice.amount_paid / 100, quantity: 1 }];

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
                  items,
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