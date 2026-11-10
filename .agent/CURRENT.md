# Current focus

**Status:** verified locally; not published
**Working on:** Applied the `eltango_aeo_patch` bundle to the current application, preserving the latest dependency and security maintenance changes.

## Delivered locally

- Four tango columns in Korean and English, with static index and article routes, formatted Markdown, visible FAQs, and enrollment links.
- Localized school, article, and FAQ structured data, with escaped JSON-LD serialization and supported Schema.org types.
- Crawl rules for search and AI agents, plus a sitemap covering 14 canonical pages across both locales.
- Canonical URLs, language alternates, and article Open Graph metadata that follow the existing default-locale routing convention.
- Desktop and mobile navigation between columns and the correct landing-page sections.

**Validation:** Clean `npm ci`, `npm run lint` (zero errors; two pre-existing unused-directive warnings), and `npm run build` passed. HTTP checks verified all sitemap routes, metadata, article/FAQ data, and missing-page responses. Headless browser checks verified both locales, desktop/mobile navigation, Markdown rendering, scroll restoration, and no browser errors.

**Next step:** Publish the verified changes when deployment is requested. Pushing `main` triggers Vercel production deployment.

## Existing follow-up

The earlier Google Forms registration migration remains pending. The current tracked registration endpoint still uses Google Apps Script; there are no migration changes in this working tree. Confirm the desired backend and production configuration before resuming that separate task.
