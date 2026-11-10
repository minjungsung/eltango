# Current focus

**Status:** v2.1 blog CTA patch merged to `main`; production deployment verification in progress
**Working on:** Applied the director's v2.1 CTA patch (per-column CTA links) and five new tango columns on top of the localized blog system.

## Delivered

- Per-column CTA: the cruise column (`cruise-2027-tango-preparation`) links to the Dulce cruise/class page (`https://dulcenaleo.com/eltango`); every other column links to the current beginner enrollment Google Form (`https://forms.gle/sCXBTGPkSn7WHQ229`).
- Five new columns in Korean and English: salsa vs Argentine tango, learning alone without a partner, ballroom tango vs Argentine tango, academy vs club, and milonga cabeceo etiquette. The blog now carries nine columns in both locales.
- CTA destinations centralized in `lib/site.ts` and chosen per post from `cta` metadata in `lib/blog-data.ts`; no URLs are hardcoded in translation bundles.
- Naver Place identifier confirmed as `20526245` in the column CTA and JSON-LD.

**Editorial handling:** The supplied patch files were written against the pre-i18n single-language page, so they were not copied over. Only the patch's changes were ported into the localized structure, keeping next-intl routing, JSON-LD, and metadata intact. Previously applied wording adjustments (no medical-treatment or discount guarantees) were kept, and the same standard was applied to the new columns.

**Validation:** Translation bundles parse; all nine slugs exist in both locales with title, description, category, tags, content, and FAQ. `ci` (`npm ci` + `next build` on Node 20) and the dependency gate passed on the pull request, and the Vercel preview build completed.

**Publication:** Squash-merged to `main`, which triggers the automatic Vercel production deployment.

**Next step:** Confirm the production deployment and check the rendered CTA links in both locales. Close the superseded PR #65 (`feature/aeo-blog-system`), whose single-language AEO version is fully replaced by `main`.

## Existing follow-up

The earlier Google Forms registration migration remains pending. The current tracked registration endpoint still uses Google Apps Script; there are no migration changes in this working tree. Confirm the desired backend and production configuration before resuming that separate task.
