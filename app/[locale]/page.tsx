import { setRequestLocale } from "next-intl/server";
import {
  Contact,
  FAQ,
  Footer,
  Gallery,
  Hero,
  Instructors,
  Pricing,
  Schedule,
  StudioIntro,
} from "@/components/sections";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <StudioIntro />
      <Gallery />
      <Schedule />
      <Instructors />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
