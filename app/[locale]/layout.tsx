import type { Metadata } from "next";
import "../globals.css";
import { Fraunces, Noto_Serif_KR } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { MobileCTA } from "@/components/mobile-cta";
import { routing } from "@/i18n/routing";

// Editorial serif for headings — optical-sizing aware variable font that
// lends a tango/Buenos Aires editorial feel. Body text uses Pretendard via
// globals.css (see --font-sans) because it renders Korean far more cleanly
// than any Google serif.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-latin",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

// Korean serif so "갤러리" etc. don't fall back to the browser default
// Korean serif (which varies across OS and generally looks worse than
// Pretendard). Noto Serif KR pairs well with Fraunces.
const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-kr",
  weight: ["400", "500", "600"],
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
  const t = await getTranslations({ locale, namespace: "metadata" });
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
      url: "https://eltango.vercel.app",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    metadataBase: new URL("https://eltango.vercel.app"),
    alternates: {
      languages: {
        ko: "/",
        en: "/en",
      },
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

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${notoSerifKr.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" forcedTheme="dark">
            <Navbar />
            {children}
            <MobileCTA />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
