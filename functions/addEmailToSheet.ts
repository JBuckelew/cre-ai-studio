import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    
    // Send email notification
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'jonathan.buckelew@gmail.com',
      subject: 'New Black Friday 2025 Signup',
      body: `New email signup: ${email}\n\nTimestamp: ${timestamp}`
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ 
      error: error.message || 'Failed to send email notification'
    }, { status: 500 });
  }
});