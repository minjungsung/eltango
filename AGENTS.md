# Agent instructions

Everything agent-related lives under **`.agent/`**. This file is read by Cursor, Kiro, Claude Code, Codex, and any other AGENTS.md-aware tool.

**First action every session:** read `.agent/CURRENT.md` — it says what was last shipped and what's next.

## Commands
- Dev server: `npm run dev` (localhost:3000)
- Lint: `npm run lint`
- Build (production): `npm run build`
- Start built app: `npm start`

## Invariants
- **Vercel auto-deploys on push to `main`.** A push IS the deploy.
- Routing is locale-prefixed: `app/[locale]/...`. All user-visible strings go through `useTranslations()` / `getTranslations()` — never hardcode text in JSX. Translations live in `messages/{en,ko}.json`.
- Registration flow: `components/register-form.tsx` → `app/api/register/route.ts` → `GOOGLE_SCRIPT_URL` (Apps Script) → Google Sheet. Do not expose `GOOGLE_SCRIPT_URL` to the client bundle — keep it server-side only.
- Always-dark theme by design. Don't add a light-mode toggle without asking.

## Forbidden
- Never `--force` push `main`.
- Never commit `.env` / `.env.local`.
- Never expose `GOOGLE_SCRIPT_URL` to the client (no `NEXT_PUBLIC_` prefix).
- Never bypass lint errors with `// eslint-disable` just to ship.
- Never skip the journal update after shipping (append `.agent/JOURNAL.md`, update `.agent/CURRENT.md`).

## Project skills (`.agent/skills/`)

None yet — for end-to-end delivery use the personal `ship-it` skill (see Personal skills below), which auto-detects Next.js + Vercel + npm lint/build conventions.

## Personal skills (`~/.agent/`)

Also consult `~/.agent/AGENTS.md` — it indexes cross-project skills:
- `project-journal` — maintains `.agent/` (session context, JOURNAL, ROADMAP, decisions)
- `ship-it` — detects verify + deploy conventions and runs the delivery loop

## State (`.agent/`)
- `.agent/CURRENT.md` — "right now" pointer (overwritten per update)
- `.agent/JOURNAL.md` — append-only log of shipped milestones (newest-first)
- `.agent/ROADMAP.md` — Now / Next / Later / Done
- `.agent/decisions/` — ADRs for architectural choices

## Commit style

Historical commits were shorthand (`temp`, `폰`, `내용때려넣기`). **Going forward:** conventional commits — `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`. Subject ≤ 72 chars. Past entries in `.agent/JOURNAL.md` reconstruct meaning from diffs, not commit messages.
