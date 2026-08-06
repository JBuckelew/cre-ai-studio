import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    let body = await req.json();
    console.log('RAW request body:', JSON.stringify(body));

    // base44.functions.invoke may wrap the payload in a nested object.
    // Unwrap common wrappers so we always read the caller's actual fields.
    if (body && typeof body === 'object' && !Array.isArray(body)) {
      for (const key of ['payload', 'data', 'body']) {
        const candidate = body[key];
        if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
          // Only unwrap if the nested object looks like the real payload (has email or utm fields)
          if ('email' in candidate || 'utm_source' in candidate || 'utm_medium' in candidate) {
            console.log(`Unwrapping nested body.${key}`);
            body = candidate;
            break;
          }
        }
      }
      // Handle a stringified JSON body that needs a second parse
      if (typeof body === 'string') {
        try {
          const parsed = JSON.parse(body);
          if (parsed && typeof parsed === 'object') {
            console.log('Parsed stringified JSON body');
            body = parsed;
          }
        } catch (_) { /* not JSON, leave as-is */ }
      }
    }

    const pick = (obj, ...keys) => {
      for (const k of keys) {
        const v = obj?.[k];
        if (v !== undefined && v !== null && v !== '') return v;
      }
      return undefined;
    };

    const email = pick(body, 'email', 'Email', 'EMAIL');
    const source = pick(body, 'source');
    const utm_source = pick(body, 'utm_source', 'utm_Source');
    const utm_medium = pick(body, 'utm_medium', 'utm_Medium');
    const utm_campaign = pick(body, 'utm_campaign', 'utm_Campaign');
    const utm_term = pick(body, 'utm_term', 'utm_Term');
    const utm_content = pick(body, 'utm_content', 'utm_Content');
    const referring_site = pick(body, 'referring_site', 'referrer', 'referral_site');

    console.log('Resolved fields:', JSON.stringify({ email, source, utm_source, utm_medium, utm_campaign, utm_term, utm_content, referring_site }));

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
        utm_source: utm_source || 'website',
        utm_medium: utm_medium || 'organic',
        ...(utm_campaign ? { utm_campaign } : {}),
        ...(utm_term ? { utm_term } : {}),
        ...(utm_content ? { utm_content } : {}),
        ...(referring_site ? { referring_site } : {}),
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