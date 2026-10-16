import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/data/siteConfig";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/packages", label: "Packages & Gallery" },
  { href: "/how-it-works", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  "Architecture & Spatial Design",
  "Residential Construction",
  "Interior Craftsmanship",
  "Turnkey Luxury Solutions",
];

export default function Footer() {
  return (
    <footer className="relative bg-[#021f1d] text-white overflow-hidden pt-16 pb-12 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md border border-[#c9a45c]/40 group-hover:border-[#c9a45c] transition-all flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src="/logo/cosmic-logo.png"
                    alt="Cosmic Homes"
                    fill
                    className="object-contain"
                    sizes="64px"
                    quality={95}
                  />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wide block group-hover:text-[#c9a45c] transition-colors">Cosmic Homes</span>
                <span className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a45c]">Building Tomorrow, Together</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-sans-clean">
              Bespoke residential architectural design and turnkey construction services across Bengaluru, crafted with trust, transparency, and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a45c] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-sans-clean">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#c9a45c] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a45c] font-semibold mb-4">
              Our Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-sans-clean">
              {serviceLinks.map((s) => (
                <li key={s} className="hover:text-[#c9a45c] transition-colors">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a45c] font-semibold mb-4">
              Headquarters
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans-clean">
              {COMPANY.address}
            </p>
            <div className="pt-2 text-sm text-slate-300 space-y-1">
              <p>Phone: <a href={`tel:${COMPANY.primaryPhone}`} className="text-white hover:text-[#c9a45c] font-medium">{COMPANY.primaryPhone}</a></p>
              <p>Email: <a href={`mailto:${COMPANY.email}`} className="text-white hover:text-[#c9a45c]">{COMPANY.email}</a></p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-sans-clean gap-4">
          <p>&copy; {new Date().getFullYear()} Cosmic Homes. All rights reserved.</p>
          <p>Crafted for Turnkey Luxury Residences in Bengaluru.</p>
        </div>
      </div>
    </footer>
  );
}
