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

    // Send email with affiliate link
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      from_name: "CRE AI Studio",
      subject: "Your CRE AI Studio Referral Link is Ready! 🎉",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Welcome to the CRE AI Studio Referral Program!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for joining our referral program! Your unique referral link is ready:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <a href="${affiliateLink}" style="color: #1e40af; font-size: 18px; word-break: break-all;">${affiliateLink}</a>
          </div>
          <p><strong>How it works:</strong></p>
          <ul>
            <li>Share your unique link with your network</li>
            <li>Earn commissions when people sign up through your link</li>
            <li>Track your referrals and earnings in your Rewardful dashboard</li>
          </ul>
          <p>Start sharing today and help others discover the power of AI in commercial real estate!</p>
          <p>Best regards,<br>The CRE AI Studio Team</p>
        </div>
      `
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