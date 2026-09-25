"use client";

import { FullPageScroll } from "@/components/full-page-scroll";
import {
  Hero,
  Features,
  BeginnerClass,
  About,
  Difference,
  Director,
  Testimonials,
  SNS,
  Contact,
  Footer,
} from "@/components/sections";

const sectionIds = [
  "hero",
  "value",
  "beginner",
  "about",
  "difference",
  "director",
  "reviews",
  "sns",
  "register",
  "location",
];

export function MainPage() {
  return (
    <FullPageScroll sectionIds={sectionIds}>
      <Hero />
      <Features />
      <BeginnerClass />
      <About />
      <Difference />
      <Director />
      <Testimonials />
      <SNS />
      <Contact />
      <Footer />
    </FullPageScroll>
  );
}
