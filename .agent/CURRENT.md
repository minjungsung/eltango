# Current focus

**Status:** The AEO v5 patch is live (`62126ee`, PR #87), and so is the refreshed intro page and the home timetable fix (`6c9a266`, PR #89, 2026-11-19). `https://eltango.vercel.app/intro.html` now serves the Netlify v7 page and `/` shows the corrected 낮반 times. The `public/intro.html` push stranded by Vercel's rate limit went out with the v5 deployment.
**Working on:** Nothing in flight — next is the manual Search Console step (rich results test + re-index request).

## AEO v5 patch (2026-11-19, live)

- `main` is protected (two required checks); a direct push is refused, so the patch went through PR #87 (`aeo/v5`) and was squash-merged as `62126ee`.
- Added `/llms.txt`, `/llms-full.txt`, `/rss.xml` (static routes, generated at build), `lib/school-info.ts` (single source for address, phone, timetable, prices), `lib/og-images.ts`, `components/blog-markdown.tsx`, `components/blog-faq.tsx`, `components/breadcrumbs.tsx` and nine 1200×630 cards under `public/og/`.
- Replaced `components/json-ld.tsx`, both blog pages and `package.json`: `DanceSchool` + `LocalBusiness` + `OfferCatalog`, breadcrumbs on screen and in schema, GFM tables, `<details>` FAQ whose visible text equals the `FAQPage` text, per-column OG and `twitter:card`.
- `package-lock.json` was regenerated because the patch added `remark-gfm` without it; `npm ci` failed before that and passes now.
- Local checks: `npx tsc --noEmit` clean, `npm run build` clean, `/llms.txt` `text/plain`, `/rss.xml` `application/rss+xml` with nine items, column page carries `BlogPosting` + `BreadcrumbList` + `FAQPage` + `OfferCatalog`, no personal mobile number in any route.
- Production checks after the deployment: the same five AEO files plus `/og/*`, `/sitemap.xml` and `/robots.txt` all 200 with the expected content types; the home entity is `[EducationalOrganization, SportsActivityLocation, DanceSchool, LocalBusiness]`; per-column `og:image` is the 1200×630 card with `twitter:card`.
- Facts published in `lib/school-info.ts` (timetable 월 10:30 / 수 11:30 / 수 19:00 / 일 17:00, 원데이 30,000원, 정규 4주 100,000원, 당일 등록 70,000원, 좌표 37.5044284 / 127.0206468) match the director's current 소개페이지 자료; change them there only.

## Intro page delivery

- `public/intro.html` is now the Netlify drop v7 page (2026-11-19 16:40 KST), byte-identical to what `https://eltango.netlify.app/` serves. SHA-256: `33af510f0c318b8bcc804ac339455abeca9c1e34bf1bb151987226f50431bdf0`.
- v7 carries the 웰니스 낮반 timetable (월 10:30–11:30, 수 11:30–12:30 60+), the five-question FAQ with matching `FAQPage` schema, canonical / OG / twitter metadata, the RSS alternate and the 칼럼 footer link; the `chrome_annotation` artifacts of the 11-18 Drive edit are gone.
- Two links that work as relative paths on Netlify are absolute to `https://eltango.netlify.app` because this host has no such routes (`/oneday` 404, `/columns/` 308 to a missing page): the FAQ note's 원데이 link and the footer 칼럼 link. All seven 원데이 CTAs point at `https://eltango.netlify.app/oneday`.
- The file is self-contained. Its non-embedded references are external booking, place, café, Instagram, YouTube and 칼럼 links. No application configuration changed.
- The page's canonical and `og:url` name `https://eltango.netlify.app/`, so this copy is deliberately not the indexed one — decide with the director before changing that.
- Production `/intro.html` answers 200 `text/html` and its served bytes hash to the SHA-256 above; no personal mobile number in it.

## Delivered

- Korean home `/` is the warm-white editorial page: `app/warmwhite.css`, `components/warmwhite-home.tsx`, `warmwhite-nav.tsx`, `warmwhite-cta.tsx` (fixed mobile call/one-day bar), `app/[locale]/warmwhite-page.tsx`, and ten photos in `public/images/warmwhite/` including a Korean `og-cover.jpg`. Its 낮반 timetable row reads `월 10:30 – 11:30` on one line and `수 11:30 – 12:30` on the next (optional `time2` in `CLASSES`), matching `lib/school-info.ts`.
- `/en` keeps the existing screen and its `Navbar` / `MobileCTA`; only its footer contact phone changed.
- `proxy.ts`: cookie-less requests are rendered in Korean instead of being redirected to `/en` by country; `/en` is still English and `/ko` still redirects to `/`. Paths containing a dot (`/llms.txt`, `/rss.xml`) bypass the locale middleware, so no matcher change was needed.
- `app/robots.ts`: thirteen AI/search crawlers explicitly allowed.
- Phone is the safe number `0507-1404-9899` (`+82-507-1404-9899` in JSON-LD) and Instagram is `@gangnamtango` in the footer, the SNS page and structured data. No personal mobile number remains in the code.

**Patch handling:** Earlier patches shipped translation bundles and a `json-ld.tsx` that predated the i18n blog/AEO work; those were ported rather than copied. The v5 patch was authored against the current `main`, so its files applied as-is — the only repo-side change was regenerating `package-lock.json` for `remark-gfm`.

**Next step:** Run `search.google.com/test/rich-results` on one column URL (expect `Article`, `Breadcrumb`, `FAQ`) and request re-indexing of the column URLs in Search Console.

## Existing follow-ups

- `npm run lint` reports two pre-existing errors in `components/warmwhite-nav.tsx` (`<a href="/">` instead of `next/link`); fix on the next design pass rather than inside a content patch.
- English translation of the Korean home is out of scope; `/en` intentionally serves the previous page.
- The Google Forms registration migration remains pending. The current tracked registration endpoint still uses Google Apps Script; confirm the desired backend and production configuration before resuming that separate task.
