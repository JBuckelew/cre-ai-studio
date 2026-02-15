import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email } = await req.json();

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Send affiliate invite directly via Rewardful (this sends the email automatically)
    const inviteResponse = await fetch('https://api.getrewardful.com/v1/affiliates/invite', {
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

    let affiliateData;
    let affiliateLink;

    if (!inviteResponse.ok) {
      const errorText = await inviteResponse.text();
      console.error('Rewardful invite error:', errorText);
      console.error('Response status:', inviteResponse.status);
      
      // Check if affiliate already exists
      if (errorText.includes('Email has already been taken') || errorText.includes('already been taken')) {
        // Fetch all affiliates and find by email
        const getResponse = await fetch('https://api.getrewardful.com/v1/affiliates', {
          headers: {
            'Authorization': `Bearer ${Deno.env.get('REWARDFUL_API_KEY')}`
          }
        });
        
        if (getResponse.ok) {
          const affiliatesResponse = await getResponse.json();
          const affiliate = affiliatesResponse.data?.find(a => a.email === email);
          
          if (affiliate) {
            affiliateData = affiliate;
            const token = affiliate.token || affiliate.id;
            affiliateLink = affiliate.link || `https://creai.studio/?via=${token}`;
            
            // Resend invite for existing affiliate
            await fetch(`https://api.getrewardful.com/v1/affiliates/${affiliate.id}/resend_invite`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${Deno.env.get('REWARDFUL_API_KEY')}`
              }
            });
          }
        }
      }
      
      if (!affiliateLink) {
        return Response.json({ error: 'Failed to send affiliate invite' }, { status: 500 });
      }
    } else {
      affiliateData = await inviteResponse.json();
      affiliateLink = affiliateData.link || `https://creai.studio/?via=${affiliateData.token}`;
    }

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