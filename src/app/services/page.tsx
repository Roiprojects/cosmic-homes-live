import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustBenefits from "@/components/sections/TrustBenefits";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Our Services | Cosmic Homes",
  description:
    "Cosmic Homes offers end-to-end residential construction services in Bengaluru — architectural design, home construction, structural planning, interior design, project management, and renovation.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ===== SERVICES HERO ===== */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 bg-[#022b27] text-white overflow-hidden">
        {/* Background Architectural Grid Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-300 mb-6">
            <span>Home</span>
            <span className="text-[#c9a45c]">/</span>
            <span className="text-[#c9a45c] font-semibold">Our Services</span>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4">
            Bespoke Residential <br />
            <span className="italic font-normal text-gold-gradient">Services & Engineering</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-sans-clean leading-relaxed">
            From initial concept blueprints to generational turnkey construction, explore how we build homes with uncompromising craft and complete transparency.
          </p>
        </div>
      </section>

      {/* ===== 6-SERVICE REDESIGNED GRID + FEATURED SPOTLIGHT ===== */}
      <ServicesGrid />

      {/* ===== WHY CHOOSE US ===== */}
      <WhyChooseUs />

      {/* ===== TRUST / BENEFITS ===== */}
      <TrustBenefits />

      {/* ===== CTA SECTION ===== */}
      <CTASection />
    </>
  );
}

