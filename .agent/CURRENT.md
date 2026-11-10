# Current focus

**Status:** ready-to-ship
**Working on:** Added **AEO (AI Engine Optimization) & Blog System** to `eltango.vercel.app`:
1. `app/robots.ts`: Opened crawling to all AI bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, `Yeti`, etc.).
2. `app/sitemap.ts`: Dynamic sitemap for static pages and AEO blog routes.
3. `components/json-ld.tsx`: Schema.org `DanceSchool` structured data for Gangnam studio, Director In-kyung Lee, 2023 Rome champion achievements, and links.
4. `app/[locale]/blog/`: Static blog index and individual post pages (`[slug]`) with `FAQPage` JSON-LD schema for AI answer engine citation.
5. `lib/blog-data.ts`: Initial 4 killer AEO articles (Cruise 2027 tango, shoes comparison, lesson costs, posture & wellness).
6. Updated metadata in `messages/ko.json` with keyword-rich titles and descriptions.

**Next step:** Push to `main` branch on GitHub (`minjungsung/eltango`) to trigger automatic Vercel production deployment.
