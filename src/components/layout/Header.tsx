"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useMobileMenu from "@/hooks/useMobileMenu";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/projects", label: "Projects" },
  { href: "/packages", label: "Packages" },
  { href: "/how-it-works", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { open, toggle, close } = useMobileMenu();
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2 flex items-center justify-between">
        
        {/* LOGO — Rectangular horizontal layout */}
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="relative w-[220px] h-[66px] sm:w-[270px] sm:h-[81px] lg:w-[320px] lg:h-[96px] overflow-hidden rounded-lg">
              <Image
                src="/logo/cosmic-logo-rect.jpg"
                alt="Cosmic Homes - Building Tomorrow, Together"
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 270px, 320px"
              />
            </div>
          </Link>
        </div>

        {/* DESKTOP NAV PILL: Viewport Centered / Floating */}
        <div className="hidden lg:block pointer-events-auto">
          <nav
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/80"
                : "bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100"
            }`}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPillIndicator"
                      className="absolute inset-0 bg-[#022b27] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* DESKTOP CTA BUTTON: Enquire Now */}
        <div className="hidden lg:flex items-center gap-3 pointer-events-auto">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold text-white bg-gold-gradient shadow-[0_4px_14px_rgba(201,164,92,0.35)] hover:shadow-[0_6px_20px_rgba(201,164,92,0.45)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Enquire Now
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="lg:hidden pointer-events-auto">
          <button
            onClick={toggle}
            className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-slate-800 border border-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* MOBILE EXPANDABLE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden pointer-events-auto mx-4 mt-2 bg-white/98 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden"
          >
            <nav className="p-5 space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? "bg-[#022b27] text-white font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3">
                <Link
                  href="/contact"
                  onClick={close}
                  className="block text-center py-3 rounded-xl text-xs uppercase tracking-[0.16em] font-semibold text-white bg-gold-gradient shadow-md"
                >
                  Enquire Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
