import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import RealProjectsShowcase from "@/components/sections/RealProjectsShowcase";
import HowItWorksSteps from "@/components/sections/HowItWorksSteps";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Cosmic Homes | Turnkey Luxury Residences & Construction in Bengaluru",
  description:
    "Cosmic Homes is a premier architectural design and residential home construction firm in Bengaluru, delivering bespoke turnkey homes with unwavering quality and transparency.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Master Editorial Hero */}
      <Hero />

      {/* 2. Storytelling About Us */}
      <AboutSection />

      {/* 3. Structured Services Grid */}
      <ServicesGrid />

      {/* 4. Real Completed Projects & Craftsmanship Showcase (16 HD Images) */}
      <RealProjectsShowcase />

      {/* 5. 10-Step Turnkey Process Timeline */}
      <HowItWorksSteps />

      {/* 6. FAQs Preview */}
      <FAQAccordion preview />

      {/* 7. High-Conversion CTA */}
      <CTASection />
    </>
  );
}
