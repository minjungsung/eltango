# eltango journal

Append-only, newest-first. Curated milestones only — raw commits live in `git log`.

Note: historical commit messages were mostly Korean shorthand (`temp`, `폰`, `내용때려넣기`, etc.). Journal entries below reconstruct meaning from diffs. Going forward, prefer conventional-commit style (see `AGENTS.md`).

---

## 2026-11-19 — AEO v5: llms.txt, RSS, per-column OG cards, breadcrumbs and FAQ accordion

**Shipped:** Applied the director's AEO v5 patch on top of `9d7a5b1`. New static routes `/llms.txt`, `/llms-full.txt` and `/rss.xml`; `lib/school-info.ts` as the single source for address, phone, timetable and prices; global entity widened to `DanceSchool` + `LocalBusiness` with `OfferCatalog` (numeric KRW prices), `openingHoursSpecification`, `geo` and `sameAs`; per-column `BreadcrumbList` (3 steps, on screen and in schema), `Blog` schema on the index, `publisher.logo` on `BlogPosting`; `components/blog-markdown.tsx` renders GFM tables, blockquotes, figure captions and rules via `remark-gfm`; the column FAQ became a `<details>` accordion whose visible text is word-for-word the `FAQPage` text; nine 1200×630 cards under `public/og/` with `twitter:card`. Nine files added, four replaced. The next-intl structure and the `StructuredData` export the column pages import were kept, so no message bundle or `layout.tsx` import changed.
**Why the lock file moved:** the patch's `package.json` adds `remark-gfm@^4.0.1` but shipped no matching `package-lock.json`, so `npm ci` (and therefore the `ci` workflow) failed on an out-of-sync lock. Regenerated `package-lock.json` with `npm install` — 20 new packages, no dependency version changed — and committed it with the patch.
**Validation:** `npx tsc --noEmit` clean, `npm run build` succeeded (`/llms.txt`, `/llms-full.txt`, `/rss.xml` generated as static routes), and a local `npm start` smoke test returned 200 for `/`, `/en`, `/blog`, `/en/blog`, both locales of a column and `/sns`. `/llms.txt` → `text/plain` starting `# 엘땅고 강남본점`; `/rss.xml` → `application/rss+xml` with nine items; a column page carries `BlogPosting`, `BreadcrumbList` (3 `ListItem`s), `FAQPage`, `OfferCatalog` (3 offers) and four `OpeningHoursSpecification` entries; the FAQ accordion text matched the schema text; `/og/*.png` 200. No personal mobile number in any route, and the patch keeps `0507-1404-9899` only.
**Follow-ups:** Confirm the production deployment and the `/llms.txt`, `/rss.xml`, `/intro.html` responses after the push. `npm run lint` still reports two pre-existing errors in `components/warmwhite-nav.tsx` (`<a>` instead of `next/link` for `/`), untouched by this patch.

---

## 2026-11-19 — Standalone intro page pushed; production deployment rate limited

**Delivered to source:** Retrieved the director's `intro.html` from the Drive file linked in her November 18 email and copied it verbatim to `public/intro.html`. Source SHA-256: `6bf06c08136baac87f002b50862f3b5653afdcdfc178146f66a852e3a53d37dc`. The self-contained HTML needs no build or configuration changes. Commit `b2f3454` was pushed to `main`.
**Validation:** Inspected the HTML structure and references; local automated tests were not run, per the user's preference. GitHub's automatic `ci` and secret scanning checks passed after the push. Production `https://eltango.vercel.app/intro.html` still returns 404.
**Deployment blocker:** Vercel marked the commit failed: "Deployment rate limited — retry in 24 hours." Retry after the limit clears and confirm the production response matches the source hash before calling this published.

---

## 2026-11-18 — English mobile CTA dials the safe number

**Shipped:** `components/mobile-cta.tsx:48` now links `tel:+8250714049899` instead of the personal mobile `tel:+821024150563`, so the `/en` mobile bar no longer exposes the personal number. Prompted by the owner after the v4 report; the v4 patch itself left this file untouched.
**Validation:** Repo-wide grep (excluding `node_modules`, `.git`, `.agent`) finds no `010-2415-0563` / `821024150563` left in code. Pushed straight to `main` (`d805e8e`, both required status checks were expected on the push), and `CI`, `Dependency Gate` and `Security Scanning` all finished green on that SHA. Production serves the new bundle: the `/en` JS chunk contains `tel:+8250714049899` and no `821024150563`; `/`, `/en`, `/blog`, `/robots.txt` all 200; `/` and `/en` HTML carry no personal number.
**Follow-ups:** None for the number. The director (이인경 원장님) was told about this change in the v4 completion reply.

---

## 2026-11-18 — Warm-white v4: Korean home renewal, crawler routing, AI bots

**Shipped:** Applied the director's v4 patch (`eltango_warmwhite_v4_code.zip` from mail of 2026-11-18 01:02 KST; full set with photos from Drive `eltango_warmwhite_v4_final.zip`). The Korean home `/` is now the warm-white editorial page (`app/warmwhite.css`, `components/warmwhite-home.tsx`, `warmwhite-nav.tsx`, `warmwhite-cta.tsx`, `app/[locale]/warmwhite-page.tsx`) with ten new photos under `public/images/warmwhite/`, a fixed mobile bar with call/one-day booking, and an `og-cover.jpg` for Korean social cards. `/en` keeps the existing screen. `proxy.ts` now answers cookie-less requests in Korean instead of redirecting non-KR traffic to `/en`, `app/robots.ts` allows thirteen AI/search crawlers, and the phone moved to the safe number `0507-1404-9899` (`+82-507-1404-9899` in JSON-LD) with Instagram `@gangnamtango` in the footer, SNS page and structured data. The v3 deep-green mail was not applied anywhere.
**Why not verbatim:** The patch's `messages/{ko,en}.json` and `components/json-ld.tsx` were authored before the 11/10–11/11 i18n blog/AEO work: those bundles carry no `school` or `blog` namespace (breaking `/blog`, `/blog/[slug]` and the localized JSON-LD at runtime) and the patch's `json-ld.tsx` drops the `StructuredData` export that `app/[locale]/blog/[slug]/page.tsx` imports (type error). Only the patch's intent was ported there — two phone values per bundle, and `telephone` plus the Instagram `sameAs` in the existing localized schema. `nav.tagline` (used by `components/navbar.tsx` on `/en`) was kept. The patch-only `geo`, `openingHoursSpecification` and `DanceSchool` fields were left out: the coordinates are unverified and `DanceSchool` is not a schema.org type. Same handling as v2.1.
**Validation:** PR #76 — `ci` (`npm ci` + `next build`, Node 20), dependency gate, secret scanning and the Vercel preview build all passed. Local `npm ci` again did not finish inside this environment's call cap (slow workspace filesystem), so the workflow build stands as the build check. On production after the squash merge (`40db641`): `/` 200 with the warm-white markup and no `/en` redirect, `/en` 200 on the old screen with the new footer phone, `/ko` 307 to `/`, `/robots.txt` lists the thirteen bots, `/blog` and both checked column URLs 200, and the served JSON-LD carries `+82-507-1404-9899` and `instagram.com/gangnamtango/`. No `010-2415-0563` remains in the served HTML of either locale.
**Follow-ups:** `components/mobile-cta.tsx:48` still points at `tel:+821024150563` (personal mobile) for the English mobile bar — the patch deliberately leaves that file alone, so changing it needs the director's or the owner's decision. The new Korean home is Korean-only; English translation is out of scope in v4.

---

## 2026-11-11 — Blog CTA patch v2.1 and five new columns

**Shipped:** Applied the director's v2.1 patch (mailed `eltango_cta_patch_v2.zip`, 2026-11-11). Each column's bottom CTA now resolves per post: the cruise column links to `https://dulcenaleo.com/eltango`, all other columns link to the current beginner Google Form `https://forms.gle/sCXBTGPkSn7WHQ229`. Added five new columns in both locales (salsa vs tango, learning alone, ballroom vs Argentine tango, academy vs club, milonga cabeceo), bringing the blog to nine columns per locale. Naver Place identifier confirmed as `20526245`.
**Why per-column CTA:** The patch shipped a single-language page with a slug conditional. Rather than overwrite the next-intl version, CTA destinations moved to `lib/site.ts` constants selected by `cta` metadata in `lib/blog-data.ts`, so copy stays in the JSON bundles and links stay in code.
**Editorial:** Existing claim adjustments were preserved (no medical-treatment or discount guarantees); the new columns follow the same standard, including guidance to consult a healthcare professional rather than promising relief.
**Validation:** Both bundles parse, nine slugs match across locales, `ci` (`npm ci` + `next build`, Node 20) and the dependency gate passed on PR #66, and the Vercel preview build completed. The preview URL sits behind Vercel SSO, so rendered checks happen on production.
**Follow-ups:** Confirm the production deployment and rendered links; PR #65 (`feature/aeo-blog-system`) is superseded by `main` and should be closed.

---

## 2026-11-10 — Publish the AEO patch to main

**Shipped:** Feature commit `b90f4e1` (`feat: add localized tango columns and AEO metadata`) was pushed to `main` following the user's explicit commit-and-push request. The push triggers the project's automatic Vercel production deployment.
**Validation:** The previously completed clean installation, lint, production build, HTTP checks, and desktop/mobile browser checks apply to this feature commit. No application changes were made between validation and publication.
**Follow-ups:** Verify deployment and GitHub checks. The separate Google Forms registration migration remains pending.

---

## 2026-11-10 — AEO crawl metadata and localized tango columns

**Delivered locally:** Applied the supplied AEO bundle to the latest application state. Added four columns in both locales, static article pages with rendered Markdown and visible FAQs, school/article/FAQ JSON-LD, crawl rules, and a 14-page bilingual sitemap. Corrected Promise-based route parameters, default-locale canonical URLs, language alternates, and desktop/mobile links back to landing-page sections. All new visible copy is in the translation bundles; `react-markdown` renders article bodies without enabling raw HTML.
**Validation:** Clean dependency installation, lint, and production build passed. Lint reported only two existing unused-directive warnings. HTTP checks covered all sitemap URLs, canonical/alternate metadata, JSON-LD consistency, and invalid-route 404s. Headless desktop/mobile checks covered navigation, both locales, Markdown, scroll restoration, layout overflow, and browser errors.
**Publication:** Changes are local and uncommitted. Production deployment has not been triggered.
**Follow-ups:** Publish when requested. The separate Google Forms registration migration remains pending.

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

## 2026-10-15 — Next.js security patch

Upgrade Next.js and its matching lint configuration to16.3.8 to address six Next.js advisories. Strict clean installation, lint and production build passed. No application behavior changed. Unpatched braces in lint tooling remains unresolved; GitHub alert closure is verified after merge.
