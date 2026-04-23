# eltango journal

Append-only, newest-first. Curated milestones only — raw commits live in `git log`.

Note: historical commit messages were mostly Korean shorthand (`temp`, `폰`, `내용때려넣기`, etc.). Journal entries below reconstruct meaning from diffs. Going forward, prefer conventional-commit style (see `AGENTS.md`).

---

## 2026-04-24 — Internationalization (EN/KO) + registration form + Google Sheets backend

**Shipped:** Migrated to `next-intl` with `app/[locale]/` routing and locale-detecting `middleware.ts`. Added `components/language-switcher.tsx`, `messages/{en,ko}.json` translation bundles. New `components/register-form.tsx` submitting to `app/api/register/route.ts`, which proxies to a Google Apps Script endpoint (`GOOGLE_SCRIPT_URL`) backing a Google Sheet. On successful submit, redirects to a Kakao open-chat URL (`NEXT_PUBLIC_KAKAO_OPENCHAT_URL`). Setup instructions in `SETUP_GOOGLE_SHEETS.md`.
**Commits:** 90cbadd (committed as "temp"; actually a major feature)
**Why:** Capture enrollment leads directly from the landing page without building a backend / database.
**Follow-ups:** Placeholders in `.env.example` (`REPLACE_ME` for Kakao URL, `XXXX` for Apps Script URL) must be set in the Vercel production env.
**See:** `decisions/2026-04-24-next-intl-i18n.md`, `decisions/2026-04-24-google-sheets-backend.md`

---

## 2026-03-25 — Interim iteration (undocumented)

**Shipped:** Intermediate work committed as "temp" (`caae195`). Diff spans multiple areas; consolidated into the 2026-04-24 entry for practical purposes.
**Commits:** caae195
**Follow-ups:** none — superseded by 2026-04-24 landing.

---

## 2026-01-29 — v1 landing page

**Shipped:** Initial Buenos Aires tango landing page on Next.js 14 (App Router) + Tailwind + shadcn-style components. Three instructor profiles (fish, taebong, nenia) with photos under `public/images/`. Always-dark theme, responsive mobile layout, directions/map section (오시는길), enrollment link (수강신청). Accordion, card, button, badge UI primitives under `components/ui/`.
**Commits:** 6fdd804, a813789, 97c4285, 8fff0c9, 86a25fc, 8f57831, d4b5994, 4f4e1ec, adf7cd1, 532b9ad, d4a3fb5, 5dc1772
**Why:** Public face of the tango school — promote classes and capture interest.
