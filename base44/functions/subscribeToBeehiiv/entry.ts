import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = Deno.env.get('BEEHIIV_API_KEY');
    const publicationId = Deno.env.get('BEEHIIV_PUBLICATION_ID');

    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Beehiiv error:', JSON.stringify(data));
      return Response.json({ error: data.message || data.errors || 'Beehiiv error', details: data }, { status: response.status });
    }

    // Also save to our DB
    try {
      await base44.asServiceRole.entities.EmailSignup.create({ email, source: 'hero_newsletter' });
    } catch (_) {
      // ignore duplicate DB errors
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});