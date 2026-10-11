// Deploy as a Google Apps Script web app owned by the Kyte team.
// Set CONTACT_SHEET_ID and CONTACT_WEBHOOK_SECRET in Script Properties.
const TAB_NAME = 'Enquiries';
const NOTIFY_EMAIL = 'contact@kyte-agency.com';

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents);
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('CONTACT_WEBHOOK_SECRET');
    const sheetId = properties.getProperty('CONTACT_SHEET_ID');
    if (!secret || !sheetId || data.secret !== secret) return json({ ok: false });

    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(TAB_NAME);
    if (!sheet) return json({ ok: false });

    const safe = (value) => {
      const text = String(value || '').trim();
      return /^[=+\-@]/.test(text) ? "'" + text : text;
    };
    const id = String(data.id || '');
    if (!/^[0-9a-f-]{36}$/.test(id)) return json({ ok: false });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (sheet.getLastRow() > 1 && sheet.getRange(2, 9, sheet.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext()) {
        return json({ ok: true });
      }
      sheet.appendRow([
        new Date(), safe(data.name), safe(data.email), safe(data.company),
        safe(data.service), safe(data.timeline), safe(data.project), 'Kyte website', id,
      ]);
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }

    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New Kyte website enquiry: ' + safe(data.service),
        body: [
          'New enquiry from the Kyte website', '',
          'Name: ' + safe(data.name),
          'Email: ' + safe(data.email),
          'Company or website: ' + safe(data.company),
          'Service: ' + safe(data.service),
          'Timeline: ' + safe(data.timeline), '',
          'Project:', safe(data.project), '',
          'Submission ID: ' + id,
        ].join('\n'),
      });
    } catch (mailError) {
      console.error('Enquiry saved, but notification email failed: ' + mailError);
    }
    return json({ ok: true });
  } catch (error) {
    console.error('Contact receiver failed: ' + error);
    return json({ ok: false });
  }
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
