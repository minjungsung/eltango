import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export const SITE_URL = "https://eltango.vercel.app";
export const SCHOOL_ID = `${SITE_URL}/#school`;

export function localizedUrl(locale: Locale, pathname = "/") {
  return new URL(getPathname({ locale, href: pathname }), SITE_URL).href;
}

export function localizedAlternates(pathname = "/") {
  return {
    ko: localizedUrl("ko", pathname),
    en: localizedUrl("en", pathname),
    "x-default": localizedUrl("ko", pathname),
  };
}
