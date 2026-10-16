import ModalTrigger from "@/components/ui/ModalTrigger";
import { COMPANY } from "@/data/siteConfig";

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#022b27] text-white overflow-hidden">
      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-[#c9a45c] font-semibold text-[0.72rem] uppercase tracking-[0.25em] mb-4">
          Start Your Journey
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
          Ready to Build Your <br />
          <span className="italic font-normal text-gold-gradient">Dream Home?</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mb-10 max-w-xl mx-auto font-sans-clean leading-relaxed">
          Let's discuss your requirements and turn your vision into reality. Get in touch with us today.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <ModalTrigger variant="primary" size="lg">
            Start Your Project
          </ModalTrigger>
          <a
            href={`tel:${COMPANY.primaryPhone}`}
            className="px-8 py-3.5 rounded-full border border-white/30 text-white text-xs uppercase tracking-wider font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-[#c9a45c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us Directly
          </a>
        </div>

        <p className="text-slate-400 text-xs mt-6 font-sans-clean">
          Direct Line:{" "}
          <a href={`tel:${COMPANY.primaryPhone}`} className="text-[#c9a45c] font-medium hover:underline">
            {COMPANY.primaryPhone}
          </a>{" "}
          /{" "}
          <a href={`tel:${COMPANY.phones[1]}`} className="text-[#c9a45c] font-medium hover:underline">
            {COMPANY.phones[1]}
          </a>
        </p>
      </div>
    </section>
  );
}
