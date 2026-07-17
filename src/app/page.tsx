import type { Metadata } from "next";
import CinematicHero from "@/components/sections/CinematicHero";
import ServiceGrid from "@/components/sections/ServiceGrid";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Testimonials from "@/components/sections/Testimonials";
import QuoteWizard from "@/components/conversion/QuoteWizard";
import ContactFormSection from "@/components/sections/ContactFormSection";
import StickyConversionDock from "@/components/conversion/StickyConversionDock";

export const metadata: Metadata = {
  title: "Trusted Mechanic Toowoomba | Miller Engines & Mechanical",
  description:
    "Professional vehicle diagnosis, servicing and repairs in Toowoomba QLD. Honest, reliable automotive care with guaranteed workmanship. Call +61 7 4633 2417.",
};

export default function Home() {
  return (
    <>
      <CinematicHero />
      {/* TrustStrip is now integrated into the hero as Phase 3 */}
      <ServiceGrid />
      <FeaturesSection />
      <Testimonials />
      <QuoteWizard />
      <ContactFormSection />
      <StickyConversionDock />
    </>
  );
}
