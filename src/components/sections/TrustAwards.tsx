import { COMPANY } from "@/data/siteConfig";

const certifications = [
  { name: "CREDAI", label: "CREDAI Member" },
  { name: "RERA", label: "RERA Registered" },
  { name: "ISO", label: "ISO 9001 Certified" },
  { name: "GRIHA", label: "GRIHA Compliant" },
  { name: "KSPCB", label: "KSPCB Approved" },
  { name: "Bengaluru", label: "Bengaluru Home Builder" },
];

export default function TrustAwards() {
  return (
    <section className="relative py-16 md:py-20 bg-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-navy-muted font-medium text-xs uppercase tracking-[0.2em] mb-10">
          Trusted & Certified
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 flex flex-col items-center justify-center text-center hover:border-teal-500/30 transition-all duration-300"
            >
              <span className="font-heading text-sm md:text-base font-semibold text-navy leading-tight">
                {cert.name}
              </span>
              <span className="text-xs text-navy-muted mt-1 hidden sm:block">
                {cert.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
