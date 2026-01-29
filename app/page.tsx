import { Contact, FAQ, Footer, Gallery, Hero, Instructors, Pricing, Schedule, StudioIntro } from "@/components/sections";

export default function Page() {
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
