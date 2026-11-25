# eltango journal

Append-only, newest-first. Curated milestones only — raw commits live in `git log`.

Note: historical commit messages were mostly Korean shorthand (`temp`, `폰`, `내용때려넣기`, etc.). Journal entries below reconstruct meaning from diffs. Going forward, prefer conventional-commit style (see `AGENTS.md`).

---

## 2026-11-25 — 릴스 편집기: 구간 순서 재배치 + 아이폰 무음 분석 폴백 (PR #99)

**Shipped:** `/editor.html` 컷 탭에 **⭐ 맨 앞으로 · ◀ 앞으로 · ▶ 뒤로 · 복제** 버튼을 넣어, 뒤에 나온 하이라이트·결론 장면을 0초로 끌어올릴 수 있게 했다. `S.clips` 배열 순서가 그대로 재생·내보내기 순서이고 타임라인 블록에 순번 배지가 붙는다. 미리보기(`clipAt`)는 원래도 배열 순서를 따랐지만, 내보내기(`playSequenceForExport`)는 `srcTimeToOut`으로 원본 시간만 보고 출력 시간을 계산해 순서를 바꾸면 진행바·자막 타이밍이 어긋났으므로 클립별 누적 출력 오프셋(`accOut`)으로 바꿨다. 블록 손잡이 트림 범위도 이웃 블록 대신 원본 전체(0~dur)로 풀어 순서를 바꾼 뒤에도 트림이 튀지 않는다. 무음 후보 표시는 `srcRangeToOut`으로 새 순서의 여러 토막에 매핑했다.

**Silence fallback:** 아이폰 5분 54초 영상에서 `decodeAudioData()`가 실패해 무음 분석이 통째로 죽던 문제를 고쳤다. 120MB 이하는 기존 파일 디코딩(빠름) → 실패하거나 그보다 크면 **배속 재생 + `AnalyserNode` 스캔**(8x→4x→2x, 배속에서 Safari가 오디오를 건너뛰면 자동 하향, 스캔 중 모니터 음소거)으로 폴백한다. 둘 다 실패하면 “타임라인에서 직접 자르거나 피클에 보내기”를 안내한다.

**Validation:** 추출 JS `node --check` 통과. DOM 스텁 하네스(`work/eltango-seg-test/logic_test.js`)로 재배치·배속 매핑·스캔 표본→무음 23개 항목 통과(맨 앞으로 이동 후 0초가 새 첫 구간의 원본 시각을 가리킴, 1.5x에서 출력↔원본 오차 0, 블록 경계를 넘는 무음이 두 토막으로 갈라짐). 이 워크스페이스의 Chromium은 시스템 라이브러리(libnspr4 등)가 없어 띄울 수 없고 Vercel 프리뷰는 Deployment Protection에 막혀, 배포 후 프로덕션 `/editor.html`에서 직접 확인했다.

**Companion:** 같은 날 `scripts/eltango_auto_editor.py`에 `--segments`(`--clips`/`--reorder` 별칭, `@구간.json` 지원)·`--segments-trim-silence`·`--transcribe-only`를 추가했다. 웹 편집기와 같은 “뒤 하이라이트를 맨 앞으로” 작업을 5분 영상에서도 할 수 있다.

---

## 2026-11-25 — 릴스 편집기 후속 수정 (PR #95–#97)

**Shipped:** `/editor.html` 초기 배포(#93, `fdc3615`) 뒤 세 번 다듬었다. #95(`8e99188`) 내보내기 중 캔버스를 매 프레임 다시 그려 녹화 fps를 0.35 → 정자·웹캠 수준으로 올렸고(미리보기 rAF 상시 구동, MediaRecorder mimeType 대신 실제 컨테이너로 확장자 결정), #96(`e3b25fe`) 훅 배너·자막 줄바꿈을 DP 균형 배분으로 바꿔 외톨이 단어를 없애고 스크림/아웃트로 그라데이션을 캐시, #97(`bbce822`)는 내보낸 파일 헤더에서 `avc1` 유무를 확인해 Chromium처럼 H.264 없이 VP9로 녹화된 MP4에는 “SNS 업로드 거부 가능” 안내를 띄운다.
**Validation:** 프로덕션 `/editor.html` 200, `window.ELTANGO_EDITOR` 노출, 15초 생영상으로 무음 감지(3곳·1.7초) → 컷(4구간) → 자막 → 딥그린 → 내보내기까지 실제 수행, `window.__errors` 빈 배열.
**Known:** 이 원격 브라우저(CPU 전용, H.264 없음)에서 1080p 녹화가 9fps 수준 — 기기 GPU에 따라 달라지며, 최종 H.264 MP4가 필요하면 `scripts/eltango_auto_editor.py`가 정답.

---

## 2026-11-25 — 릴스 편집기 추가 (`/editor.html`)

**Shipped:** `public/editor.html` — 엘땅고 전용 브라우저 릴스 편집기(단일 파일, 의존성 0). 라우트는 `/editor.html`(파일명에 점이 있어 `proxy.ts`의 로케일 미들웨어를 타지 않음). `noindex, nofollow`.
**기능:** 드래그앤드롭 영상 로드(MP4/MOV/WebM) → WebAudio RMS 분석으로 무음 구간 자동 감지·컷(기준 dB·최소 무음·앞뒤 여유 조절) → 타임라인 분할/삭제/드래그 핸들 트림 → 배속 0.8~2.0x → 9:16·1:1·16:9 + 확대/위치 → 훅 배너·자막(직접 입력/SRT/Web Speech) → 로얄 버건디·딥그린 템플릿(워터마크·진행바·아웃트로) → Canvas + MediaRecorder로 워터마크 없는 MP4/WebM 다운로드.
**Privacy:** 파일은 서버로 전송되지 않고 브라우저 메모리에서만 처리된다. 외부 요청은 Pretendard CDN 하나뿐.
**Facts:** 아웃트로·푸터는 안심번호 `0507-1404-9899`·원데이 30,000원·신논현역 1번 출구 4분·`@gangnamtango`만 사용. 개인 휴대폰 번호 없음.
**Validation:** esprima 파싱 통과, 로컬 정적 서버에서 DOM/이벤트 배선 확인. 프로덕션 검증은 배포 후 `/editor.html` 200·`window.ELTANGO_EDITOR` 존재·콘솔 오류 0으로 확인.
**Follow-ups:** iOS Safari는 MediaRecorder MP4 내보내기가 제한적 — 데스크톱/안드로이드 Chrome 권장 문구를 페이지에 넣어 둠.

---

## 2026-11-19 — Intro page refreshed to the Netlify v7; home 낮반 timetable corrected

**Shipped:** `public/intro.html` replaced with the Netlify drop v7 (`netlify_drop_v7/index.html`, 16:40 KST — the same bytes `https://eltango.netlify.app/` serves). New in v7: the 웰니스 낮반 timetable (월 10:30–11:30, 수 11:30–12:30 60+), a five-question FAQ section with matching `FAQPage` schema, canonical / OG / twitter metadata, the RSS alternate and the 칼럼 footer link. The 11-18 copy also still carried `chrome_annotation` artifacts from the Drive edit; those are gone.
**Host fixes:** this site has no `/oneday` (404) and `/columns/` only 308-redirects to a page that does not exist, so the two links that work as relative paths on Netlify are absolute to `https://eltango.netlify.app` — the FAQ note's 원데이 link and the footer 칼럼 link. No other relative `href`/`src` is left in the file; all seven 원데이 CTAs point at `https://eltango.netlify.app/oneday`.
**Home:** `components/warmwhite-home.tsx` still showed `월 10:30 – 12:00` on the 낮반 row. It now reads `월 10:30 – 11:30` / `수 11:30 – 12:30`, matching `lib/school-info.ts` and the intro page. `CLASSES` took an optional `time2` field rendered as a second line, so the right-aligned `white-space: nowrap` column stays inside the card on mobile.
**Validation:** `npx tsc --noEmit` clean, `npm run build` clean, local `npm start` 200 on `/` and `/intro.html` with no `10:30 – 12:00`.
**Publication:** PR #89 squash-merged as `6c9a266`; `ci`, dependency gate, secret scanning and the Vercel preview all green. Production: `/` 200 and the 낮반 card carries both times; `/intro.html` 200 `text/html`, byte-identical to the repo file (SHA-256 `33af510f0c318b8bcc804ac339455abeca9c1e34bf1bb151987226f50431bdf0`), 0 personal numbers, 10 `0507-1404-9899`, the FAQ visible and the sticky CTA on the netlify `/oneday`.
**Follow-ups:** None. The page's canonical and `og:url` still name `https://eltango.netlify.app/`, so this copy is deliberately not the indexed one — say so before changing it. Branch `feat/update-intro-and-schedule` is still on the remote (the delete was refused by the credential policy).

---

## 2026-11-19 — AEO v5: llms.txt, RSS, per-column OG cards, breadcrumbs and FAQ accordion

**Shipped:** Applied the director's AEO v5 patch on top of `9d7a5b1`. New static routes `/llms.txt`, `/llms-full.txt` and `/rss.xml`; `lib/school-info.ts` as the single source for address, phone, timetable and prices; global entity widened to `DanceSchool` + `LocalBusiness` with `OfferCatalog` (numeric KRW prices), `openingHoursSpecification`, `geo` and `sameAs`; per-column `BreadcrumbList` (3 steps, on screen and in schema), `Blog` schema on the index, `publisher.logo` on `BlogPosting`; `components/blog-markdown.tsx` renders GFM tables, blockquotes, figure captions and rules via `remark-gfm`; the column FAQ became a `<details>` accordion whose visible text is word-for-word the `FAQPage` text; nine 1200×630 cards under `public/og/` with `twitter:card`. Nine files added, four replaced. The next-intl structure and the `StructuredData` export the column pages import were kept, so no message bundle or `layout.tsx` import changed.
**Why the lock file moved:** the patch's `package.json` adds `remark-gfm@^4.0.1` but shipped no matching `package-lock.json`, so `npm ci` (and therefore the `ci` workflow) failed on an out-of-sync lock. Regenerated `package-lock.json` with `npm install` — 20 new packages, no dependency version changed — and committed it with the patch.
**Validation:** `npx tsc --noEmit` clean, `npm run build` succeeded (`/llms.txt`, `/llms-full.txt`, `/rss.xml` generated as static routes), and a local `npm start` smoke test returned 200 for `/`, `/en`, `/blog`, `/en/blog`, both locales of a column and `/sns`. `/llms.txt` → `text/plain` starting `# 엘땅고 강남본점`; `/rss.xml` → `application/rss+xml` with nine items; a column page carries `BlogPosting`, `BreadcrumbList` (3 `ListItem`s), `FAQPage`, `OfferCatalog` (3 offers) and four `OpeningHoursSpecification` entries; the FAQ accordion text matched the schema text; `/og/*.png` 200. No personal mobile number in any route, and the patch keeps `0507-1404-9899` only.
**Publication:** `main` is protected (two required status checks), so a direct push is refused with `GH006`; the patch went through PR #87 on branch `aeo/v5` and was squash-merged as `62126ee`. The merge triggered the Vercel production deployment, which completed. Verified on production: `/`, `/llms.txt` (`text/plain`), `/llms-full.txt`, `/rss.xml` (`application/rss+xml`, nine items), `/og/cover.png`, `/og/tango-vs-salsa-guide.png`, `/sitemap.xml`, `/robots.txt` all 200; the column page serves `BlogPosting` + `BreadcrumbList` + `FAQPage` + `OfferCatalog`, the breadcrumb nav and the `<details>` FAQ; per-column `og:image` is the 1200×630 card with `twitter:card`; the home entity is `[EducationalOrganization, SportsActivityLocation, DanceSchool, LocalBusiness]`; no personal mobile number in any checked route. `/intro.html`, stranded by the earlier rate limit, went live with this same deployment and its served bytes hash to the source SHA-256 above.
**Follow-ups:** Run one column URL through the Google Rich Results test and request re-indexing in Search Console. `npm run lint` still reports two pre-existing errors in `components/warmwhite-nav.tsx` (`<a>` instead of `next/link` for `/`), untouched by this patch.

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
