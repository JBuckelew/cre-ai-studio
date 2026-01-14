import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { google } from 'npm:googleapis@144.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, source } = await req.json();

    console.log('Received email:', email, 'source:', source);

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Parse the service account credentials
    const credentialsJson = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    if (!credentialsJson) {
      console.error('GOOGLE_SHEETS_API_KEY not found');
      return Response.json({ error: 'Google Sheets credentials not configured' }, { status: 500 });
    }

    console.log('Parsing credentials...');
    const credentials = JSON.parse(credentialsJson);

    // Set up Google Sheets API client
    console.log('Setting up Google Auth...');
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1Fkwu108D-lrhogfNMBpCXM0vOkuH11UtIif4oZfoyqQ';

    // Get current timestamp
    const timestamp = new Date().toISOString();

    console.log('Appending to sheet...');
    // Append the email to the sheet - using A:C range so it appends to the next available row
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, timestamp, source || 'unknown']],
      },
    });

    console.log('Successfully added email to sheet:', result.data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error adding email to Google Sheet:', error);
    console.error('Error details:', error.message, error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
});