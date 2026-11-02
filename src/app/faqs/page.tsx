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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#022b27] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] rounded-full bg-[#c9a45c]/8 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-[#c9a45c] font-brand font-semibold text-[0.72rem] uppercase tracking-[0.25em] mb-4">
            FAQs
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-body leading-relaxed">
            Everything you need to know about working with Cosmic Homes.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/25 to-transparent" />
      </section>
      <FAQAccordion />
      <CTASection />
    </>
  );
}
