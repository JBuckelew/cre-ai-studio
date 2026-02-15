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

    let affiliateData;
    let affiliateLink;

    if (!rewardfulResponse.ok) {
      const errorText = await rewardfulResponse.text();
      console.error('Rewardful API error:', errorText);
      
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
          }
        }
      }
      
      if (!affiliateLink) {
        return Response.json({ error: 'Failed to create affiliate in Rewardful' }, { status: 500 });
      }
    } else {
      affiliateData = await rewardfulResponse.json();
      affiliateLink = affiliateData.link || `https://creai.studio/?via=${affiliateData.token}`;
    }

    // Save to database with approved status
    await base44.asServiceRole.entities.AffiliateApplication.create({
      name: name,
      email: email,
      status: "approved",
      rewardful_link: affiliateLink
    });

    // Send welcome email via Resend with detailed logging
    console.log('Attempting to send email to:', email);
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'CRE AI Studio <hello@creaistudio.com>',
        to: [email],
        subject: 'Welcome to the CRE AI Studio Referral Program!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
            <h2 style="color: #1e40af;">Welcome to the CRE AI Studio Referral Program!</h2>
            <p>Hi ${name.split(' ')[0]},</p>
            <p>We're so excited to have you on board. You already know firsthand how AI is transforming commercial real estate — and now you can share that with your network while earning $100 for every new member you refer.</p>
            
            <p><strong>Here's how it works:</strong></p>
            <p>Share your unique referral link with colleagues, partners, or anyone in CRE who's ready to level up with AI. When they sign up and remain an active member for 60 days after their free trial ends, you'll earn $100. There's no cap — the more people you bring in, the more you earn.</p>
            
            <p>That's it.</p>
            
            <p>You're part of a community of hundreds of CRE professionals who are already ahead of the curve. Every referral you make strengthens that community and helps more people in our industry work smarter.</p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
              <p style="margin: 0; font-weight: bold;">Your Referral Link:</p>
              <p style="margin: 10px 0 0 0;"><a href="${affiliateLink}" style="color: #1e40af; word-break: break-all;">${affiliateLink}</a></p>
            </div>
            
            <p>If you have any questions, just reply to this email — we're here to help.</p>
            
            <p>Thank you for being part of CRE AI Studio and for helping us grow.</p>
            
            <p>Best,<br>The CRE AI Studio Team</p>
          </div>
        `
      })
    });

    const resendData = await resendResponse.json();
    console.log('Resend response status:', resendResponse.status);
    console.log('Resend response:', JSON.stringify(resendData));

    if (!resendResponse.ok) {
      console.error('Resend API error:', resendData);
      return Response.json({ 
        error: 'Failed to send email',
        details: resendData 
      }, { status: 500 });
    }

    return Response.json({ 
      success: true, 
      affiliateLink: affiliateLink,
      emailSent: true,
      emailId: resendData.id
    });
  } catch (error) {
    console.error('Create affiliate error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});