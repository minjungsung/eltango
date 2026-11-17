import type { Metadata } from "next";
import "../globals.css";
import "../warmwhite.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { MobileCTA } from "@/components/mobile-cta";
import { WarmWhiteNav } from "@/components/warmwhite-nav";
import { WarmWhiteCTA } from "@/components/warmwhite-cta";
import { JsonLd } from "@/components/json-ld";
import { routing } from "@/i18n/routing";
import { SITE_URL, localizedAlternates, localizedUrl } from "@/lib/site";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata" });

  // 한국어 홈은 웜화이트 리뉴얼 화면이라 웜화이트 OG 이미지를 쓴다. (영문은 기존 화면 유지)
  const ogImage =
    locale === "ko"
      ? { url: "/images/warmwhite/og-cover.jpg", width: 1200, height: 630, alt: t("title") }
      : { url: "/images/main.png", width: 2000, height: 3000, alt: t("title") };

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "tango studio",
      "argentine tango",
      "learn tango",
      "gangnam tango",
      "seoul tango academy",
      "eltango",
      "탱고학원",
      "아르헨티나탱고",
      "강남탱고",
    ],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: localizedUrl(locale),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      images: [ogImage],
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: localizedUrl(locale),
      languages: localizedAlternates(),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // 한국어는 웜화이트 헤더/하단바, 영문은 기존 헤더/플로팅 CTA를 그대로 쓴다.
  const isKo = locale === "ko";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd locale={locale} />
      </head>
      <body className={`${playfair.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" forcedTheme="dark">
            {isKo ? <WarmWhiteNav /> : <Navbar />}
            {children}
            {isKo ? <WarmWhiteCTA /> : <MobileCTA />}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
