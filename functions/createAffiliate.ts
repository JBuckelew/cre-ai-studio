import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email } = await req.json();

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Create affiliate in Rewardful
    const rewardfulResponse = await fetch('https://api.getrewardful.com/v1/affiliates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('REWARDFUL_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        first_name: name.split(' ')[0] || name,
        last_name: name.split(' ').slice(1).join(' ') || ''
      })
    });

    if (!rewardfulResponse.ok) {
      const errorData = await rewardfulResponse.text();
      console.error('Rewardful API error:', errorData);
      return Response.json({ error: 'Failed to create affiliate in Rewardful' }, { status: 500 });
    }

    const affiliateData = await rewardfulResponse.json();
    const affiliateLink = affiliateData.link || `https://creai.studio/?via=${affiliateData.token}`;

    // Save to database with approved status
    await base44.asServiceRole.entities.AffiliateApplication.create({
      name: name,
      email: email,
      status: "approved",
      rewardful_link: affiliateLink
    });

    return Response.json({ 
      success: true, 
      affiliateLink: affiliateLink 
    });
  } catch (error) {
    console.error('Create affiliate error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});