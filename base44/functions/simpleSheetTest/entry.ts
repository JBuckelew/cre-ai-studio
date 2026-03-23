import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { google } from 'npm:googleapis@144.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin required' }, { status: 403 });
    }

    const credentialsJson = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    const credentials = JSON.parse(credentialsJson);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // Test with the actual spreadsheet ID
    const result = await sheets.spreadsheets.get({
      spreadsheetId: '1B3o0rUtiEvuVfrvQwAogp1jV2zh-k8nf',
    });

    return Response.json({ 
      success: true,
      service_account: credentials.client_email,
      sheet_info: {
        title: result.data.properties.title,
        sheets: result.data.sheets.map(s => s.properties.title)
      }
    });
  } catch (error) {
    return Response.json({ 
      error: error.message,
      code: error.code,
      status: error.status,
      full_error: JSON.stringify(error, null, 2)
    }, { status: 500 });
  }
});