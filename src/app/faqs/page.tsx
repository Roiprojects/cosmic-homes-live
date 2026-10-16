import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "FAQs | Cosmic Homes",
  description:
    "Find answers to frequently asked questions about Cosmic Homes construction services, packages, timelines, and quality.",
};

export default function FAQsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0B1930] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] rounded-full bg-gold/[0.03] blur-3xl anim-float" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold font-medium text-xs uppercase tracking-[0.2em] mb-5">
            FAQs
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Everything you need to know about working with Cosmic Homes.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>
      <FAQAccordion />
      <CTASection />
    </>
  );
}
