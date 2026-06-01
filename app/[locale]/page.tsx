import { setRequestLocale } from "next-intl/server";
import {
  Hero,
  Features,
  About,
  Director,
  Difference,
  BeginnerClass,
  Milonga,
  Testimonials,
  Audience,
  FAQ,
  Contact,
  Footer,
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
      <Features />
      <About />
      <Director />
      <Difference />
      <BeginnerClass />
      <Milonga />
      <Testimonials />
      <Audience />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
