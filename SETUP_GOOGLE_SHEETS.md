# Open Chat Registration Flow — Setup Guide

Name + phone number → saved to Google Sheet → redirect to KakaoTalk open chat.

## Architecture

```
[Web form] ──► POST /api/register ──► Google Apps Script ──► Google Sheet
                                                           │
                                                           ▼
                                            [Redirect to KakaoTalk open chat]
```

---

## 1. Create the Google Sheet

> **IMPORTANT**: Create this with a **personal `@gmail.com` account**, not a
> Google Workspace account. See the "This app is blocked" section below for
> why.

1. Go to [sheets.google.com](https://sheets.google.com) and create a new sheet.
2. Name it something like `Eltango Registrations`.
3. In row 1, enter these headers starting from A1:

   | A         | B    | C     | D    | E      | F       | G          |
   | --------- | ---- | ----- | ---- | ------ | ------- | ---------- |
   | timestamp | name | phone | memo | source | consent | userAgent  |

## 2. Deploy the Apps Script Web App

1. In the sheet, click **Extensions → Apps Script**.
2. Delete the default `Code.gs` content and paste this:

```javascript
// The tab name inside the spreadsheet. Default is "Sheet1" (or "시트1" in Korean Sheets).
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      body.timestamp || new Date().toISOString(),
      body.name || '',
      body.phone || '',
      body.memo || '',
      body.source || '',
      body.consent ? 'Y' : 'N',
      body.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'alive' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the project (`Cmd/Ctrl + S`). Name it anything, e.g. `eltango-register`.
4. Click **Deploy → New deployment** (top right).
5. Click the gear icon → **Web app**.
6. Settings:
   - **Description**: `eltango register v1`
   - **Execute as**: `Me` (your account)
   - **Who has access**: `Anyone` ← this is required so the browser / server can POST without auth
7. Click **Deploy**.
8. A permissions prompt appears. Click **Authorize access** and pick your Google account.
9. You'll see a warning **"Google hasn't verified this app"**. This is normal. Click:
   - **Advanced** (bottom left)
   - **Go to [project name] (unsafe)**
   - **Allow**
10. After it completes you'll see the **Web app URL** (ends in `/exec`). Copy it.

## 3. Get the KakaoTalk Open Chat URL

1. In KakaoTalk, create an open chat room (or use an existing one).
2. Tap the room settings → **Share** → copy the URL.
3. Format: `https://open.kakao.com/o/xxxxxxx`

## 4. Configure environment variables

Create `.env.local` in the project root:

```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
NEXT_PUBLIC_KAKAO_OPENCHAT_URL=https://open.kakao.com/o/YOUR_ROOM
```

`.env.local` is already in `.gitignore`, so it won't be committed.

## 5. Run & deploy

### Local
```bash
npm run dev
```
Open http://localhost:3000 and test the form in the registration section.

### Vercel (or any host)
- Add both env vars under Project Settings → Environment Variables
- Apply to Production, Preview, and Development
- Redeploy

---

## Troubleshooting

### "This app is blocked" when authorizing the Apps Script

This is **not** the regular "unverified app" warning — it's a hard block. It
happens for one of these reasons:

1. **You're signed in with a Google Workspace account** whose admin has
   restricted unverified third-party apps.
   **Fix**: switch to a personal `@gmail.com` account. Create the Sheet with
   that account, then redo the Apps Script deployment from step 2.
   Alternative: ask the Workspace admin to whitelist the app under
   Google Admin Console → Security → Access and data control → API controls
   → Manage third-party app access.

2. **The account is under 18 or has Family Link restrictions.** Google
   blocks unverified scripts entirely for these accounts. Use a different
   account.

3. **You clicked "Back to safety" on the warning screen.** The actual
   allow path is hidden:
   - Click **Advanced** at the bottom left of the warning
   - Click **Go to [project name] (unsafe)**
   - Click **Allow**

   If there is no "Advanced" button at all, you're in case 1 or 2.

### Form submits but nothing shows up in the Sheet

- Verify `GOOGLE_SCRIPT_URL` ends in `/exec` (not `/dev`).
- Verify the web app is deployed with **Who has access: Anyone**
  (not "Anyone with a Google account").
- Verify `SHEET_NAME` in the Apps Script matches the actual tab name
  (case-sensitive). For Korean Sheets the default is `시트1`, for English
  it's `Sheet1`.

### I updated the Apps Script code but nothing changed

Apps Script web apps are pinned to a specific deployment version. Either:
- **Deploy → Manage deployments → Edit (pencil) → Version: New version** to
  keep the same URL, or
- **Deploy → New deployment**, copy the new URL into `.env.local`, and
  restart the dev server / redeploy.

### Redirect doesn't happen after submit

- `NEXT_PUBLIC_KAKAO_OPENCHAT_URL` must have the `NEXT_PUBLIC_` prefix to
  be exposed to the browser.
- After changing env vars, restart the Next.js dev server.

### Privacy

- Data is written only to **your own** Google Sheet; no third party has
  access.
- Collecting names / phone numbers requires user consent under Korean
  PIPA (and similar laws elsewhere). The form already includes a required
  consent checkbox. Decide on a retention period (default wording: 1 year
  after consultation ends) and a deletion procedure.
