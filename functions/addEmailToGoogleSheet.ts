import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { google } from 'npm:googleapis@144.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Parse the service account credentials
    const credentialsJson = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    if (!credentialsJson) {
      return Response.json({ error: 'Google Sheets credentials not configured' }, { status: 500 });
    }

    const credentials = JSON.parse(credentialsJson);

    // Set up Google Sheets API client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1B3o0rUtiEvuVfrvQwAogp1jV2zh-k8nf';

    // Get current timestamp
    const timestamp = new Date().toISOString();

    // Append the email to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1079:B1079',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, timestamp]],
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error adding email to Google Sheet:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});