import { setRequestLocale } from "next-intl/server";
import { Milonga, Testimonials, Audience } from "@/components/sections";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Milonga />
      <Testimonials />
      <Audience />
    </main>
  );
}
