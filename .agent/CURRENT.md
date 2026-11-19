# Current focus

**Status:** The AEO v5 patch is committed and pushed to `main` (see `git log`); the push itself is the Vercel deploy. Production is still on the previous deployment until Vercel accepts a build — the 2026-11-19 push of `public/intro.html` was rejected with "Deployment rate limited — retry in 24 hours", so `/intro.html` returns 404 and the new `/llms.txt`, `/llms-full.txt`, `/rss.xml` and `/og/*` are not live yet.
**Working on:** Verifying the v5 deployment once it lands, then reporting the production URLs to the director.

## AEO v5 patch (2026-11-19)

- Added `/llms.txt`, `/llms-full.txt`, `/rss.xml` (static routes, generated at build), `lib/school-info.ts` (single source for address, phone, timetable, prices), `lib/og-images.ts`, `components/blog-markdown.tsx`, `components/blog-faq.tsx`, `components/breadcrumbs.tsx` and nine 1200×630 cards under `public/og/`.
- Replaced `components/json-ld.tsx`, both blog pages and `package.json`: `DanceSchool` + `LocalBusiness` + `OfferCatalog`, breadcrumbs on screen and in schema, GFM tables, `<details>` FAQ whose visible text equals the `FAQPage` text, per-column OG and `twitter:card`.
- `package-lock.json` was regenerated because the patch added `remark-gfm` without it; `npm ci` failed before that and passes now.
- Local checks: `npx tsc --noEmit` clean, `npm run build` clean, `/llms.txt` `text/plain`, `/rss.xml` `application/rss+xml` with nine items, column page carries `BlogPosting` + `BreadcrumbList` + `FAQPage` + `OfferCatalog`, no personal mobile number in any route.
- Facts published in `lib/school-info.ts` (timetable 월 10:30 / 수 11:30 / 수 19:00 / 일 17:00, 원데이 30,000원, 정규 4주 100,000원, 당일 등록 70,000원, 좌표 37.5044284 / 127.0206468) match the director's current 소개페이지 자료; change them there only.

## Intro page delivery

- Copied the director's Drive `intro.html` verbatim to `public/intro.html`. SHA-256: `6bf06c08136baac87f002b50862f3b5653afdcdfc178146f66a852e3a53d37dc`.
- The file is self-contained. Its non-embedded references are external booking, place, café, Instagram, and YouTube links. No application configuration changed.
- Commit `b2f3454` is on GitHub `main`; automated `ci` and secret scanning passed. Production still misses the file because Vercel rate-limited that deployment.
- Note: `public/intro.html` is the 2026-11-18 15:58 copy, so it predates the 수 11:30 웰니스 낮반 and the `/oneday` link that the Netlify v6/v7 pages carry. Replace it with the current source when the director asks.

## Delivered

- Korean home `/` is the warm-white editorial page: `app/warmwhite.css`, `components/warmwhite-home.tsx`, `warmwhite-nav.tsx`, `warmwhite-cta.tsx` (fixed mobile call/one-day bar), `app/[locale]/warmwhite-page.tsx`, and ten photos in `public/images/warmwhite/` including a Korean `og-cover.jpg`. Its timetable card still shows `월 10:30 – 12:00`; the class actually runs 10:30–11:30, so that label lags `lib/school-info.ts`.
- `/en` keeps the existing screen and its `Navbar` / `MobileCTA`; only its footer contact phone changed.
- `proxy.ts`: cookie-less requests are rendered in Korean instead of being redirected to `/en` by country; `/en` is still English and `/ko` still redirects to `/`. Paths containing a dot (`/llms.txt`, `/rss.xml`) bypass the locale middleware, so no matcher change was needed.
- `app/robots.ts`: thirteen AI/search crawlers explicitly allowed.
- Phone is the safe number `0507-1404-9899` (`+82-507-1404-9899` in JSON-LD) and Instagram is `@gangnamtango` in the footer, the SNS page and structured data. No personal mobile number remains in the code.

**Patch handling:** Earlier patches shipped translation bundles and a `json-ld.tsx` that predated the i18n blog/AEO work; those were ported rather than copied. The v5 patch was authored against the current `main`, so its files applied as-is — the only repo-side change was regenerating `package-lock.json` for `remark-gfm`.

**Next step:** Confirm `https://eltango.vercel.app/llms.txt`, `/llms-full.txt`, `/rss.xml`, `/og/tango-vs-salsa-guide.png` and `/intro.html` once a deployment is accepted, then run `search.google.com/test/rich-results` on one column URL and request re-indexing in Search Console.

## Existing follow-ups

- `npm run lint` reports two pre-existing errors in `components/warmwhite-nav.tsx` (`<a href="/">` instead of `next/link`); fix on the next design pass rather than inside a content patch.
- English translation of the Korean home is out of scope; `/en` intentionally serves the previous page.
- The Google Forms registration migration remains pending. The current tracked registration endpoint still uses Google Apps Script; confirm the desired backend and production configuration before resuming that separate task.
