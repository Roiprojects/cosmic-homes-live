import Image from "next/image";
import LeadForm from "@/components/forms/LeadForm";
import CTASection from "@/components/sections/CTASection";
import { COMPANY } from "@/data/siteConfig";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Cosmic Homes",
  description:
    "Get in touch with Cosmic Homes for free home construction consultation in Bengaluru. Call 9538733555 or fill out our enquiry form.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#fbfbf9] min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 bg-[#022b27] text-white overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a45c]/8 blur-3xl" />
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Visiting Card Logo Display */}
          <div className="flex justify-center mb-8">
            <div className="relative w-[260px] sm:w-[360px] lg:w-[440px] aspect-[954/504] rounded-2xl overflow-hidden bg-[#022421] border-2 border-[#c9a45c]/70 shadow-[0_14px_45px_rgba(0,0,0,0.5)] hover:scale-[1.02] hover:border-[#c9a45c] transition-all duration-300">
              <Image
                src="/logo/cosmic_logo.png"
                alt="Cosmic Homes - Turnkey Luxury Residences"
                fill
                className="object-cover"
                priority
                quality={100}
                unoptimized
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 440px"
              />
            </div>
          </div>

          <span className="inline-block text-[#c9a45c] font-brand font-semibold text-[0.72rem] uppercase tracking-[0.25em] mb-3">
            Contact & Consultation
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Let&apos;s Build Your <span className="text-gold-gradient">Dream Home</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-body leading-relaxed">
            Tell us about your plot and architectural requirements — our turnkey design and construction team will bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Lead Form */}
            <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-md">
              <LeadForm />
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Contact Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-md">
                <h3 className="font-heading text-xl font-bold text-[#022b27] mb-6">Contact Information</h3>
                <div className="space-y-5 text-sm text-slate-600 font-body">
                  <div>
                    <p className="text-[0.68rem] text-[#c9a45c] font-brand uppercase tracking-wider font-semibold mb-1">Direct Lines</p>
                    <a
                      href={`tel:${COMPANY.primaryPhone}`}
                      className="text-[#022b27] hover:text-[#c9a45c] transition-colors block font-medium"
                    >
                      +91 {COMPANY.phones[0]}
                    </a>
                    <a
                      href={`tel:${COMPANY.phones[1]}`}
                      className="text-[#022b27] hover:text-[#c9a45c] transition-colors block font-medium"
                    >
                      +91 {COMPANY.phones[1]}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.68rem] text-[#c9a45c] font-brand uppercase tracking-wider font-semibold mb-1">Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-[#022b27] hover:text-[#c9a45c] transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.68rem] text-[#c9a45c] font-brand uppercase tracking-wider font-semibold mb-1">Office Address</p>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {COMPANY.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-md">
                <h3 className="font-heading text-lg font-bold text-[#022b27] mb-4">Explore</h3>
                <ul className="space-y-2.5 text-xs uppercase tracking-wider font-body font-medium">
                  {[
                    { href: "/packages", label: "Packages & Specifications" },
                    { href: "/projects", label: "Completed Residences" },
                    { href: "/services", label: "Our Capabilities" },
                    { href: "/how-it-works", label: "Construction Process" },
                    { href: "/about", label: "About Cosmic Homes" },
                  ].map((navLink) => (
                    <li key={navLink.href}>
                      <Link
                        href={navLink.href}
                        className="text-slate-600 hover:text-[#022b27] transition-colors inline-block"
                      >
                        {navLink.label} &rarr;
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
