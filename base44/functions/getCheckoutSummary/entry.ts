import { secrets } from "base44:runtime";

export default async function(req: Request): Promise<Response> {
  try {
    const { session_id } = await req.json();

    if (!session_id || !session_id.startsWith("cs_")) {
      return Response.json({ error: true });
    }

    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session_id}`, {
      headers: {
        Authorization: `Bearer ${secrets.get("STRIPE_SECRET_KEY")}`,
      },
    });

    if (!res.ok) {
      return Response.json({ error: true });
    }

    const session = await res.json();

    return Response.json({
      amount_total: session.amount_total,
      currency: session.currency,
      mode: session.mode,
      session_id,
    });
  } catch (error) {
    return Response.json({ error: true });
  }
}