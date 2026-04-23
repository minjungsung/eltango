# Open Chat Registration Flow — Google Forms Setup

Submit name + phone → saved to a Google Sheet via Google Forms →
redirect to your KakaoTalk open chat.

> **Why Google Forms instead of Apps Script?**
> Google Forms has a public, anonymous submission endpoint. No OAuth, no
> "This app is blocked" warning, no Apps Script deployment. It just works
> on any account — personal Gmail or Workspace.

## Architecture

```
[Web form] ──► POST /api/register ──► docs.google.com/forms/.../formResponse
                                                     │
                                                     ▼
                                  [Google Form] ──► [Linked Google Sheet]
                                                     │
                            [Redirect to KakaoTalk open chat]
```

---

## 1. Create (or reuse) a Google Form

1. Go to [forms.google.com](https://forms.google.com) and create a new form.
2. Add these questions. The answer type is **Short answer** for everything
   except Consent which is **Multiple choice**.

   | # | Question label         | Required | Type            |
   | - | ---------------------- | -------- | --------------- |
   | 1 | Name / 이름             | ✓        | Short answer    |
   | 2 | Phone / 전화번호        | ✓        | Short answer    |
   | 3 | Message / 문의 내용     |          | Paragraph       |
   | 4 | Source / 유입경로       |          | Short answer    |
   | 5 | Consent / 개인정보 동의 |          | Multiple choice (options: `Y`, `N`) |

3. **Link it to a Sheet**: in Google Forms, go to the **Responses** tab →
   click the green Sheets icon ("Link to Sheets") → create a new sheet.
   Every submission will now flow into that sheet automatically.

> Already have the form from before? You can reuse the existing one —
> just make sure it has at least Name and Phone fields. Skip to step 2.

## 2. Grab the Form ID

From the form's URL, copy the long ID (the `1FAIpQLSdq...` part):

```
https://docs.google.com/forms/d/e/1FAIpQLSdqxyTy_5Sw.../viewform
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                 this part
```

## 3. Find each field's entry ID

This is the one fiddly step. Each question in a Form has a numeric
"entry ID" used in the submission URL.

**Easiest method — "Get pre-filled link":**

1. Open your form in **edit** mode (forms.google.com → your form).
2. Click the **⋮** (three dots, top right) → **Get pre-filled link**.
3. Fill in **every field** with dummy values, e.g. `NAME_PLACEHOLDER`,
   `PHONE_PLACEHOLDER`, etc. Make sure to give each field something unique
   so you can tell them apart.
4. Click **Get link** at the bottom → **Copy link**.
5. Paste the copied URL somewhere you can read it. It looks like:

   ```
   https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url
     &entry.1234567890=NAME_PLACEHOLDER
     &entry.9876543210=PHONE_PLACEHOLDER
     &entry.1111111111=MESSAGE_PLACEHOLDER
     &entry.2222222222=SOURCE_PLACEHOLDER
     &entry.3333333333=Y
   ```

6. The number after `entry.` is what we need. Match each placeholder to
   its field and note down the IDs.

## 4. Configure `.env.local`

Create `.env.local` in the project root:

```bash
# The form ID from step 2
GOOGLE_FORM_ID=1FAIpQLSdqxyTy_5SwYwzzmRQC3-nyWK0kmvQr8ue6MVLbYXeUdp57vQ

# The entry IDs from step 3 — only NAME and PHONE are required
GOOGLE_FORM_ENTRY_NAME=1234567890
GOOGLE_FORM_ENTRY_PHONE=9876543210
GOOGLE_FORM_ENTRY_MEMO=1111111111
GOOGLE_FORM_ENTRY_SOURCE=2222222222
GOOGLE_FORM_ENTRY_CONSENT=3333333333

# Your KakaoTalk open chat URL
NEXT_PUBLIC_KAKAO_OPENCHAT_URL=https://open.kakao.com/o/YOUR_ROOM
```

If you don't need Message/Source/Consent fields, just leave those env
vars blank — the API will skip them.

## 5. Test locally

```bash
npm run dev
```

- Open http://localhost:3000
- Scroll to the registration section
- Submit a test entry
- Check your linked Google Sheet — the row should appear within a few
  seconds
- You should get redirected to the Kakao open chat URL

## 6. Deploy

### Vercel
- Project **Settings → Environment Variables** → add all 6 variables
  above (Production, Preview, Development)
- Redeploy

### Other hosts
- Set the same env vars on your server / container
- Restart the service

---

## Troubleshooting

### Submission returns `UPSTREAM_ERROR` / status 400 from Google

Usually one of:
- A wrong `entry.XXXXX` ID → double-check step 3
- The form has a field marked **required** that you're not submitting →
  make only Name and Phone required, leave the rest optional
- The Consent field is Multiple Choice and you're sending a value that
  isn't one of the options → make sure the option label is exactly `Y`
  (or match what your route sends)

### Row doesn't show up in the Sheet

- Confirm the Form is linked to the Sheet (Responses tab → green Sheets
  icon should say "View in Sheets", not "Create")
- New submissions are appended to the linked Sheet with a small delay
  (usually under 10 seconds)
- Check the Form's **Responses** tab directly; if it's there, it's a
  Sheet-sync issue; if not, the POST didn't reach the Form

### 400 with `SERVER_NOT_CONFIGURED`

`GOOGLE_FORM_ID` (or `GOOGLE_FORM_URL`), `GOOGLE_FORM_ENTRY_NAME`, and
`GOOGLE_FORM_ENTRY_PHONE` are all required. Check `.env.local` and
restart the dev server after editing.

### I want to disable / replace Kakao redirect later

`NEXT_PUBLIC_KAKAO_OPENCHAT_URL` is just an env var; swap it anytime
without a code change. If empty, the client shows the success state but
doesn't redirect.

---

## Privacy notes

- Google Forms submissions land in the Form owner's account and the
  linked Sheet. No third party is involved.
- Korea's PIPA requires consent to collect names and phone numbers — the
  form already includes a required consent checkbox.
- Decide on a retention period (default wording in the form: 1 year after
  consultation ends) and a deletion procedure.

---

## Why not just POST directly from the browser?

Two reasons to go through `/api/register`:

1. **Server-side validation.** The browser can't be trusted; the API
   route re-checks name length, phone digits, and the consent flag
   before forwarding.
2. **CORS.** Google Forms doesn't send CORS headers, so the browser's
   `fetch` would be blocked if we called it directly. The server has no
   such restriction.
