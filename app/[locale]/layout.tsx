import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { MobileCTA } from "@/components/mobile-cta";
import { Footer, Contact } from "@/components/sections";
import { routing } from "@/i18n/routing";
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
    <html lang={locale} suppressHydrationWarning>
      <body className={`${playfair.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" forcedTheme="dark">
            <Navbar />
            {children}
            <Contact />
            <Footer />
            <MobileCTA />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
