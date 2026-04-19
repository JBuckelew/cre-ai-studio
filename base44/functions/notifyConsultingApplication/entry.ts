import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { Resend } from 'npm:resend@4.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
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

    const { data, error } = await resend.emails.send({
      from: 'CRE AI Studio <no-reply@creaistudio.com>',
      to: ['jonathan@creaistudio.com', 'topher@creaistudio.com', 'nadine@ezzieco.com'],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ success: false, error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});