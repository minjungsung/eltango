import { setRequestLocale } from "next-intl/server";
import { FAQ } from "@/components/sections";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <FAQ />
    </main>
  );
}
