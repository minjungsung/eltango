import { setRequestLocale } from "next-intl/server";
import { MainPage } from "./main-page";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MainPage />;
}
