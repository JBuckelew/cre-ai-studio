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
      return Response.json({ error: 'GOOGLE_SHEETS_API_KEY not found' }, { status: 500 });
    }

    const credentials = JSON.parse(credentialsJson);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1B3o0rUtiEvuVfrvQwAogp1jV2zh-k8nf';

    // Try to read the sheet metadata
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    // Try to read existing data
    const data = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:B',
    });

    return Response.json({ 
      success: true,
      service_account_email: credentials.client_email,
      sheet_title: metadata.data.properties.title,
      existing_rows: data.data.values?.length || 0,
      message: 'Successfully connected to Google Sheet!'
    });
  } catch (error) {
    return Response.json({ 
      error: error.message,
      stack: error.stack,
      code: error.code
    }, { status: 500 });
  }
});