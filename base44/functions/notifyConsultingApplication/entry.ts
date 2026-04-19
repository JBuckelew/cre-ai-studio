const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'CRE AI Studio <onboarding@resend.dev>',
      to: [to],
      subject,
      html
    })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Resend error for ${to}: ${JSON.stringify(data)}`);
  }
  return data;
}

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { application } = body;

    const html = `
      <h2 style="font-family:sans-serif;">New Consulting Inquiry</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;max-width:600px;">
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Name</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${application.first_name} ${application.last_name}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Email</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${application.email}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Company</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${application.company}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Website</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${application.website || '—'}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Firm Type</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${application.firm_type}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Team Size</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${application.team_size}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Timeline</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${application.timeline}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Biggest Challenge</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${application.biggest_challenge || '—'}</td></tr>
      </table>
      <p style="margin-top:16px;color:#6b7280;font-size:13px;font-family:sans-serif;">Review this application in your admin dashboard.</p>
    `;

    const subject = `New Consulting Inquiry: ${application.first_name} ${application.last_name} (${application.company})`;

    // Send sequentially so errors are visible per recipient
    const emailResults = [];
    const recipients = [
      'jonathan@creaistudio.com',
      'topher@creaistudio.com',
      'nadine@ezzieco.com'
    ];

    for (const to of recipients) {
      try {
        const result = await sendEmail(to, subject, html);
        emailResults.push({ to, status: 'sent', id: result.id });
      } catch (err) {
        emailResults.push({ to, status: 'failed', error: err.message });
      }
    }

    return Response.json({ success: true, emailResults });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});