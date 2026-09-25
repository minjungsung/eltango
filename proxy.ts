import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, type Locale } from "./i18n/routing";

const LOCALE_COOKIE = "NEXT_LOCALE";

function pickLocale(request: NextRequest): Locale {
  const explicit = request.cookies.get(LOCALE_COOKIE)?.value;
  if (explicit === "ko" || explicit === "en") return explicit;

  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "";
  if (country.toUpperCase() === "KR") return "ko";
  if (country) return "en";

  const accept = request.headers.get("accept-language") ?? "";
  const primary = accept.split(",")[0]?.toLowerCase().trim() ?? "";
  if (primary.startsWith("ko")) return "ko";
  if (primary) return "en";

  return routing.defaultLocale;
}

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasExplicitPrefix =
    pathname === "/en" ||
    pathname.startsWith("/en/") ||
    pathname === "/ko" ||
    pathname.startsWith("/ko/");
  const hasCookie = request.cookies.has(LOCALE_COOKIE);

  if (!hasCookie && !hasExplicitPrefix) {
    const locale = pickLocale(request);
    const url = request.nextUrl.clone();
    if (locale === routing.defaultLocale) {
      // Default locale has no prefix; keep the path but set the cookie.
      const response = intlMiddleware(request);
      response.cookies.set(LOCALE_COOKIE, locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
      return response;
    }
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  return intlMiddleware(request);
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
