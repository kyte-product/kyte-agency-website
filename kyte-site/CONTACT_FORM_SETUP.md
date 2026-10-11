# Kyte contact form delivery

The sitewide Kyte contact modal and `/contact` page use the same custom form. The browser posts to `/api/contact`. The server validates the enquiry and forwards it to a team-owned Google Apps Script web app. The script saves a row in Google Sheets and emails `contact@kyte-agency.com`. No Google credentials or webhook secret are exposed to the browser.

## Create the private lead sheet

Create a Google Sheet named **Kyte Website Enquiries** with an `Enquiries` tab. Put these headers in row 1, in this exact order:

`Received at | Name | Work email | Company or website | Service | Timeline | Project details | Source | Submission ID`

Restrict access to people who handle enquiries. The submission ID is used to prevent duplicate rows if a request is retried. The sheet can be opened from Codex through the connected Google Drive app, and exported to Excel when needed.

## Current setup status

The native enquiry sheet exists and its bound Apps Script project contains the receiver code and both Script Properties. The Kyte account authorized and deployed the web app on 11 October 2026. Its `/exec` URL and shared secret are configured in the ignored local `.env.local` and as Sensitive server-side variables in Vercel Production. One synthetic test enquiry reached the sheet and sent a notification to `contact@kyte-agency.com`. Repeating that submission through the local `/api/contact` route returned success without creating a duplicate row or email. The production site was deployed on 12 October 2026. A validation-only request to its `/api/contact` returned the expected HTTP 400 for missing fields. A real production submission has not yet been sent.

## Deploy the Google receiver

1. In the sheet, open **Extensions → Apps Script**. Replace `Code.gs` with [`contact-google-sheets/Code.gs`](contact-google-sheets/Code.gs).
2. In **Project Settings → Script Properties**, add `CONTACT_SHEET_ID` with the ID between `/d/` and `/edit` in the sheet URL. Add `CONTACT_WEBHOOK_SECRET` with a long random value. Keep the secret out of Git, chat, and browser code.
3. Deploy as a **Web app**, running as the Kyte account that owns the sheet, with access set to **Anyone**. Authorize Google Sheets and email permissions when prompted. Copy the `/exec` deployment URL. The shared secret in the request is checked before the script opens the sheet.
4. Set these server-only variables in `kyte-site/.env.local` for local testing and in Vercel Production:

   ```text
   GOOGLE_CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   GOOGLE_CONTACT_WEBHOOK_SECRET=the-same-long-random-value
   ```

5. Restart the local Next.js server after adding the variables. Send a test enquiry, then check the success message, a single row in `Enquiries`, and the notification at `contact@kyte-agency.com`. Test an invalid submission and an unavailable receiver too. Do this before any production release.

The script records the row before sending the notification. If Google email fails, it logs that failure and still confirms the saved enquiry. Google account quotas apply to Apps Script and MailApp. The endpoint currently has basic field validation, a honeypot, and a shared secret on the Google receiver; add durable abuse protection if public traffic or spam warrants it.
