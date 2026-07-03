import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, source } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = Deno.env.get('BEEHIIV_API_KEY');
    const publicationId = Deno.env.get('BEEHIIV_PUBLICATION_ID');

    console.log('publicationId:', publicationId);
    console.log('apiKey present:', !!apiKey);
    console.log('email:', email);

    const beehiivRes = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        status: 'active',
        utm_source: 'website',
        utm_medium: 'organic',
      }),
    });

    const data = await beehiivRes.json();
    console.log('Beehiiv status:', beehiivRes.status, 'data:', JSON.stringify(data));

    if (!beehiivRes.ok) {
      return Response.json({ error: data.errors || data.message || 'Beehiiv error', details: data }, { status: beehiivRes.status });
    }

    // Also save to our DB (service role so no auth required)
    try {
      await base44.asServiceRole.entities.EmailSignup.create({ email, source: source || 'hero_newsletter' });
    } catch (_) {
      // ignore duplicate errors
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Exception:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});