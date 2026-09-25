import { setRequestLocale } from "next-intl/server";
import { Director } from "@/components/sections";

export default async function InstructorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Director />
    </main>
  );
}
