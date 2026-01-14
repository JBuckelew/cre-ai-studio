import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { google } from 'npm:googleapis@144.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const credentialsJson = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    if (!credentialsJson) {
      return Response.json({ error: 'Credentials not found' }, { status: 500 });
    }

    const credentials = JSON.parse(credentialsJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1B3o0rUtiEvuVfrvQwAogp1jV2zh-k8nf';

    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:B',
    });

    return Response.json({ 
      success: true,
      service_account: credentials.client_email,
      sheet_title: metadata.data.properties.title,
      rows: data.data.values?.length || 0
    });
  } catch (error) {
    return Response.json({ 
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
});