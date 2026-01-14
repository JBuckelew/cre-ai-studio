import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const credentialsJson = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    if (!credentialsJson) {
      return Response.json({ error: 'GOOGLE_SHEETS_API_KEY not found' }, { status: 500 });
    }

    const credentials = JSON.parse(credentialsJson);
    
    return Response.json({ 
      service_account_email: credentials.client_email,
      message: 'Share your Google Sheet with this email address as Editor'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});