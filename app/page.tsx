import { Contact, FAQ, Features, Footer, Hero, Instructors, Pricing, Schedule } from "@/components/sections";

export default function Page() {
  return (
    <main>
      <Hero />
      <Features />
      <Schedule />
      <Instructors />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
