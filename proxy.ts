import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * AI 검색·수집 봇 판별 (2026-11 기준 AEO 대응)
 * - 크롤러에게는 항상 한국어(기본 로케일) 페이지를 200으로 그대로 돌려준다.
 * - UA가 아예 없는 단순 HTTP 클라이언트도 한국어로 취급한다.
 */
const CRAWLER_UA_PATTERN = new RegExp(
  [
    "bot",
    "crawler",
    "spider",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Google-InspectionTool",
    "bingbot",
    "BingPreview",
    "Amazonbot",
    "Applebot",
    "Yeti",
    "Daum",
    "facebookexternalhit",
    "Slackbot",
    "Twitterbot",
    "LinkedInBot",
    "kakaotalk-scrap",
  ].join("|"),
  "i",
);

function isCrawler(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua.trim()) return true;
  return CRAWLER_UA_PATTERN.test(ua);
}

function hasExplicitLocalePrefix(pathname: string): boolean {
  return (
    pathname === "/ko" ||
    pathname.startsWith("/ko/") ||
    pathname === "/en" ||
    pathname.startsWith("/en/")
  );
}

const intlMiddleware = createMiddleware(routing);

function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) 주소에 /ko, /en 이 명시된 요청은 next-intl 기본 동작을 그대로 유지한다.
  //    (/en 직접 접속 → 영문 페이지 유지)
  if (hasExplicitLocalePrefix(pathname)) return intlMiddleware(request);

  // 2) 이미 언어를 고른 방문자(쿠키 보유)도 기존 동작 유지.
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved === "ko" || saved === "en") return intlMiddleware(request);

  // 3) 쿠키가 없는 요청은 한국어를 기본으로 응답한다.
  //
  //    [P0 수정] 이전 버전은 Vercel의 접속 국가 헤더(x-vercel-ip-country)를 보고
  //    "KR이 아니면 /en 으로 307 리다이렉트"했다. 그 결과
  //    - GPTBot 등 AI 크롤러(해외 IP), 그리고
  //    - 해외 IP·VPN을 쓰는 국내 방문자까지
  //    eltango.vercel.app/ 접속 시 영문(/en)으로 튕겨 한국어 콘텐츠가 수집되지 않았다.
  //
  //    기본 로케일(ko)은 접두사가 없으므로("/"가 곧 한국어), 리다이렉트 없이
  //    그 자리에서 한국어 페이지를 렌더한다. 접속 국가·브라우저 언어로 /en 을
  //    강제하지 않는다(영문은 /en 직접 접속 또는 상단 언어 버튼으로).
  request.cookies.set(LOCALE_COOKIE, routing.defaultLocale);
  const response = intlMiddleware(request);

  // 안전장치: next-intl 이 그래도 /en 으로 보내려 하면 한국어 경로로 내부 rewrite.
  const location = response.headers.get("location");
  if (location && /^\/en(\/|$)/.test(location)) {
    const url = request.nextUrl.clone();
    url.pathname = `/ko${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // 크롤러 응답에는 쿠키를 남기지 않는다(항상 같은 한국어 응답).
  if (isCrawler(request)) return response;

  // 사람 방문자에게는 기본 로케일을 기억시킨다.
  return setLocaleCookie(response, routing.defaultLocale);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api, /trpc (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - static files with a dot in the name (e.g. favicon.ico, robots.txt)
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
