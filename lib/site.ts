import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export const SITE_URL = "https://eltango.vercel.app";
export const SCHOOL_ID = `${SITE_URL}/#school`;

// Column CTA destinations (v2.1)
export const CRUISE_REGISTRATION_URL = "https://dulcenaleo.com/eltango";
export const BEGINNER_FORM_URL = "https://forms.gle/sCXBTGPkSn7WHQ229";
export const NAVER_PLACE_URL = "https://m.place.naver.com/place/20526245";

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
