import { setRequestLocale } from "next-intl/server";
import { BeginnerClass, Difference } from "@/components/sections";

export default async function ClassesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <BeginnerClass />
      <Difference />
    </main>
  );
}
