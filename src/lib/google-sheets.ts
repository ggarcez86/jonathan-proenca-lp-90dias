import { google } from "googleapis";

export async function appendToSheet(data: { name: string; email: string; whatsapp: string; source?: string; userAgent?: string }) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Página1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            data.name,
            data.email,
            data.whatsapp,
            data.source || "organic",
            data.userAgent || "unknown"
          ]
        ]
      }
    });

    return true;
  } catch (error) {
    console.error("Sheets API Error:", error);
    throw error;
  }
}
