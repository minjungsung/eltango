# Registration backend: Google Apps Script → Google Sheet

**Date:** 2026-04-24
**Status:** accepted

## Context

The landing page needed to capture enrollment submissions (name, contact, class interest) and route leads to the instructors. Requirements: zero-cost operation, no server to maintain, and data accessible to non-technical staff (instructors who already use Google Sheets).

## Decision

Use a **Google Apps Script Web App** as the form backend. `components/register-form.tsx` POSTs to `app/api/register/route.ts` (a Next.js route handler on Vercel), which forwards the payload to `GOOGLE_SCRIPT_URL` (an Apps Script `doPost` endpoint that appends a row to a Google Sheet). On success the client redirects to `NEXT_PUBLIC_KAKAO_OPENCHAT_URL` so the submitter lands in the instructor chat immediately. Setup steps in `SETUP_GOOGLE_SHEETS.md`.

## Alternatives considered

- **Build a Next.js API + a real DB (Neon / Supabase)**: overkill for ~tens of submissions per week; adds ops burden.
- **Formspree / Typeform / Google Forms embed**: works but owns the UX (iframe) and branding.
- **Direct client-side POST from `register-form.tsx` to Apps Script**: reject — leaks the script URL and can't add server-side validation / rate-limiting later.

## Consequences

- Proxying through `/api/register` keeps the Apps Script URL out of the client bundle and lets us add validation, rate-limiting, or a second destination (email, Slack) later without changing the form.
- Apps Script has a daily quota; if submissions grow past ~1000/day this needs revisiting.
- Instructors can add/rename columns in the Sheet without a deploy, as long as Apps Script field names match.
- `.env.example` must stay in sync with required vars (`GOOGLE_SCRIPT_URL`, `NEXT_PUBLIC_KAKAO_OPENCHAT_URL`).
