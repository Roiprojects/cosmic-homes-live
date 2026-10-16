import HowItWorksSteps from "@/components/sections/HowItWorksSteps";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "How It Works | Cosmic Homes",
  description:
    "Understand Cosmic Homes' construction process — from initial consultation and design to construction, quality checks, and final handover.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0B1930] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[350px] h-[350px] rounded-full bg-gold/[0.03] blur-3xl translate-x-1/3 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-gold font-medium text-xs uppercase tracking-[0.2em] mb-5">
            The Process
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Your Journey <span className="gradient-text">From Dream to Doorstep</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            A clear, step-by-step construction journey — from your first idea to handing over the keys.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      <HowItWorksSteps />
      <CTASection />
    </>
  );
}
