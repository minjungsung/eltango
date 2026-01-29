import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { MobileCTA } from "@/components/mobile-cta";

const noto = Noto_Sans_KR({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "엘땅고 | Buenos Aires Style Tango",
  description:
    "부에노스아이레스 스타일 탱고 스튜디오 엘땅고. 초급부터 마스터까지, 제대로 배워요.",
  keywords: [
    "탱고학원",
    "아르헨티나탱고",
    "탱고배우기",
    "강남탱고",
    "직장인취미",
    "엘땅고",
    "서울탱고아카데미",
  ],
  openGraph: {
    title: "엘땅고",
    description:
      "부에노스아이레스 스타일 탱고 스튜디오 엘땅고. 초급부터 마스터까지, 제대로 배워요.",
    type: "website",
    url: "https://eltango.vercel.app",
  },
  metadataBase: new URL("https://eltango.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={noto.className}>
        <ThemeProvider attribute="class" forcedTheme="dark">
          <Navbar />
          {children}
          <MobileCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
