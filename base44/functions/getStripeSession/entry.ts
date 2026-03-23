import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

Deno.serve(async (req) => {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return Response.json({ error: 'Missing session_id' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    return Response.json({
      email: session.customer_details?.email || null,
      customer_id: session.customer || null,
      amount_total: session.amount_total,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});