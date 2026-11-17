import { setRequestLocale } from "next-intl/server";
import { MainPage } from "./main-page";
import { WarmWhitePage } from "./warmwhite-page";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 한국어 홈 = 웜화이트 에디토리얼(v4). 영문 홈은 기존 번역 화면을 그대로 유지한다.
  if (locale === "en") {
    return <MainPage />;
  }

  return <WarmWhitePage />;
}
