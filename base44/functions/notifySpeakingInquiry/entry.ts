import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { Resend } from 'npm:resend@4.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { inquiry } = body;

    const html = `
      <h2 style="font-family:sans-serif;">New Speaking Inquiry</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;max-width:600px;">
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Name</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${inquiry.name}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Organization</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${inquiry.organization || 'N/A'}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Email</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${inquiry.email}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Event Date</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${inquiry.event_date || 'N/A'}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Format</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${inquiry.format || 'N/A'}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb;">Message</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${inquiry.message}</td></tr>
      </table>
      <p style="margin-top:16px;color:#6b7280;font-size:13px;font-family:sans-serif;">Review this inquiry in your admin dashboard.</p>
    `;

    const subject = `New Speaking Inquiry: ${inquiry.name}${inquiry.organization ? ' (' + inquiry.organization + ')' : ''}`;

    const { data, error } = await resend.emails.send({
      from: 'CRE AI Studio <no-reply@updates.creaistudio.com>',
      to: ['topher@creaistudio.com'],
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