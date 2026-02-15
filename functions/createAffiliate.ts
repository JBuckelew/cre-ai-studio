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

    // Send email to applicant with program terms
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      from_name: "CRE AI Studio",
      subject: "Welcome to the CRE AI Studio Referral Program!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #1e40af;">Welcome to the CRE AI Studio Referral Program!</h2>
          <p>We're so excited to have you on board. You already know firsthand how AI is transforming commercial real estate — and now you can share that with your network while earning $100 for every new member you refer.</p>
          
          <p><strong>Here's how it works:</strong></p>
          <p>Share your unique referral link with colleagues, partners, or anyone in CRE who's ready to level up with AI. When they sign up and remain an active member for 60 days after their free trial ends, you'll earn $100. There's no cap — the more people you bring in, the more you earn.</p>
          
          <p>That's it.</p>
          
          <p>You're part of a community of hundreds of CRE professionals who are already ahead of the curve. Every referral you make strengthens that community and helps more people in our industry work smarter.</p>
          
          <p>We'll be in touch with your referral link from Rewardful and everything you need to get started. In the meantime, if you have any questions, just reply to this email — we're here to help.</p>
          
          <p>Thank you for being part of CRE AI Studio and for helping us grow.</p>
          
          <p>The CRE AI Studio Team</p>
        </div>
      `
    });

    // Notify admins about new referral signup
    const adminNotification = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">New Referral Program Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Referral Link:</strong> <a href="${affiliateLink}">${affiliateLink}</a></p>
        <p>This person has been automatically approved and sent their referral program terms.</p>
      </div>
    `;

    await Promise.all([
      base44.asServiceRole.integrations.Core.SendEmail({
        to: "hello@creaistudio.com",
        from_name: "CRE AI Studio",
        subject: "New Referral Program Signup",
        body: adminNotification
      }),
      base44.asServiceRole.integrations.Core.SendEmail({
        to: "topher@creaistudio.com",
        from_name: "CRE AI Studio",
        subject: "New Referral Program Signup",
        body: adminNotification
      })
    ]);

    return Response.json({ 
      success: true, 
      affiliateLink: affiliateLink 
    });
  } catch (error) {
    console.error('Create affiliate error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});