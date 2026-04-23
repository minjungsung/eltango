# Current focus

**Status:** in-progress
**Working on:** Migrating the registration backend from **Google Apps Script → Google Forms direct submit**. Replacing `GOOGLE_SCRIPT_URL` + Apps Script `doPost` with `GOOGLE_FORM_ID` + per-field `GOOGLE_FORM_ENTRY_*` IDs that POST straight to `formResponse`. Motivation: no OAuth, no Apps Script deploy dance, instructors can still see submissions in the Form's linked Sheet.
**Next step:** (1) finish editing `app/api/register/route.ts` to POST to `https://docs.google.com/forms/d/e/{GOOGLE_FORM_ID}/formResponse` with the entry-ID map, (2) rename / delete the stale `SETUP_GOOGLE_SHEETS.md`, (3) manually test one submission end-to-end, (4) ship.

### Uncommitted changes in working tree
- `.env.example` — migrated to `GOOGLE_FORM_ID` / `GOOGLE_FORM_ENTRY_*` vars
- `app/api/register/route.ts` — migration in progress (still check `git diff`)
- `SETUP_GOOGLE_FORMS.md` — new setup walkthrough (untracked)

When this ships, write an ADR at `.agent/decisions/YYYY-MM-DD-google-forms-backend.md` marking `decisions/2026-04-24-google-sheets-backend.md` as superseded, and append a JOURNAL entry.
