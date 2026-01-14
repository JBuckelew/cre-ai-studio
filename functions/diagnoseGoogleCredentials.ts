import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin required' }, { status: 403 });
    }

    const credentialsJson = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    if (!credentialsJson) {
      return Response.json({ error: 'GOOGLE_SHEETS_API_KEY not found' }, { status: 500 });
    }

    const credentials = JSON.parse(credentialsJson);

    return Response.json({ 
      service_account_email: credentials.client_email,
      project_id: credentials.project_id,
      instructions: `Go to https://console.cloud.google.com/apis/library/sheets.googleapis.com?project=${credentials.project_id} and verify the Google Sheets API is ENABLED in THIS specific project.`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});