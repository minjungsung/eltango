# Roadmap

<!-- Now: actively in flight (≤3). Next: committed. Later: backlog. Done: recent milestones. -->

## Now

- Migrate registration backend from Google Apps Script → Google Forms direct submit (in progress — see `.env.example`, `app/api/register/route.ts`, `SETUP_GOOGLE_FORMS.md` in working tree)

## Next

- Set production env vars on Vercel: `GOOGLE_FORM_ID` + all `GOOGLE_FORM_ENTRY_*` IDs, `NEXT_PUBLIC_KAKAO_OPENCHAT_URL`
- Delete stale `SETUP_GOOGLE_SHEETS.md` once the Forms migration is merged (keep it until then as a reference for the old path)
- Replace placeholder contact email + map embed in `components/sections.tsx` Contact section (README flags this as a customization point)
- Audit `messages/en.json` vs `messages/ko.json` for missing/drifted keys as UI evolves
- Adopt conventional-commit style going forward (`feat:` / `fix:` / `chore:`) — past history is mostly `temp` / Korean shorthand

## Later

- Analytics on landing page (GA4 or Plausible) to measure enrollment-form conversion
- Per-locale OG metadata in `app/[locale]/layout.tsx` (currently generic)
- Add Japanese (`ja`) and possibly Spanish (`es`) translations — tango is international
- Extract register-form validation into a schema (zod) if fields grow
- Add a lightweight E2E test for the register form → Google Forms round trip

## Done

- i18n (EN/KO) + registration form + Google Sheets backend (2026-04-24, 90cbadd)
- v1 landing page: Next.js 14 scaffold, instructor profiles, dark mode, mobile polish, directions, enrollment link (2026-01-29, 6fdd804..5dc1772)
