import HousePlanFilters from "@/components/sections/HousePlanFilters";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "House Plans | Cosmic Homes",
  description:
    "Browse house plans and designs from Cosmic Homes. Explore floor plans for 20x30, 30x40, 30x50, 40x60 plots in Bengaluru.",
};

export default function HousePlansPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0a1220] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] rounded-full bg-gold/[0.03] blur-3xl anim-float-slow" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold font-medium text-xs uppercase tracking-[0.2em] mb-5">
            House Plans
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Explore Home <span className="gradient-text">Designs</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Explore our collection of thoughtfully designed home plans for different plot sizes and styles.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>
      <HousePlanFilters />
      <CTASection />
    </>
  );
}
