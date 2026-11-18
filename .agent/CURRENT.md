# Current focus

**Status:** warm-white v4 patch merged to `main` (PR #76, `40db641`); production verified; English mobile CTA moved to the safe number (`d805e8e`)
**Working on:** The director's v4 final patch: Korean home renewal, crawler routing, AI-bot allow-list, and the safe-number phone / new Instagram handle.

## Delivered

- Korean home `/` is the warm-white editorial page: `app/warmwhite.css`, `components/warmwhite-home.tsx`, `warmwhite-nav.tsx`, `warmwhite-cta.tsx` (fixed mobile call/one-day bar), `app/[locale]/warmwhite-page.tsx`, and ten photos in `public/images/warmwhite/` including a Korean `og-cover.jpg`.
- `/en` keeps the existing screen and its `Navbar` / `MobileCTA`; only its footer contact phone changed.
- `proxy.ts`: cookie-less requests are rendered in Korean instead of being redirected to `/en` by country; `/en` is still English and `/ko` still redirects to `/`.
- `app/robots.ts`: thirteen AI/search crawlers explicitly allowed.
- Phone is the safe number `0507-1404-9899` (`+82-507-1404-9899` in JSON-LD) and Instagram is `@gangnamtango` in the footer, the SNS page and structured data. The `/en` mobile bar (`components/mobile-cta.tsx`) dials `tel:+8250714049899` since `d805e8e`; no personal mobile number remains in the code.

**Patch handling:** The patch's translation bundles and `json-ld.tsx` predate the i18n blog/AEO work, so they were not copied over — the bundles would have lost the `school`/`blog` namespaces and the component would have dropped the `StructuredData` export the blog imports. Only the patch's intent was ported into the localized structure, as with v2.1.

**Validation:** `ci` (`npm ci` + `next build`, Node 20), the dependency gate, secret scanning and the Vercel preview build passed on PR #76. Production after merge: `/` 200 with warm-white markup, `/en` 200, `/ko` 307 to `/`, `/robots.txt` with the thirteen bots, `/blog` and column pages 200, JSON-LD carrying the safe number and the new Instagram URL.

**Next step:** v4 is fully closed out — the mobile CTA number is fixed and the director was sent the completion reply (thread `1a1ea3efc2f2c4a9`, message `1a1ebf4878d6679c`). Wait for her next patch or feedback.

## Existing follow-ups

- English translation of the new Korean home is out of scope in v4; `/en` intentionally serves the previous page.
- The earlier Google Forms registration migration remains pending. The current tracked registration endpoint still uses Google Apps Script; confirm the desired backend and production configuration before resuming that separate task.
