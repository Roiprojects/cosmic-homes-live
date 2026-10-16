"use client";

import { useState, useEffect, useCallback, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "cosmic_homes_popup_dismissed";

export default function LeadCapturePopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    if (!loading) {
      setIsOpen(false);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }, [loading]);

  // Auto-trigger after page loads
  useEffect(() => {
    if (pathname && pathname.startsWith("/admin")) return;
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const timer = setTimeout(open, 1800);
    return () => clearTimeout(timer);
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Focus first input on open
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      closeRef.current?.focus();
    }, 100);
    return () => clearTimeout(t);
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const errs: Record<string, string> = {};

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim() : "";
    const location = typeof data.location === "string" ? data.location.trim() : "";

    if (!name) errs.name = "Please enter your name.";
    if (!phone) {
      errs.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!location) errs.location = "Please enter your location or plot number.";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile: phone.replace(/\D/g, ""),
          location,
          plotSize: (data.plotSize as string) || "",
          homeType: (data.homeType as string) || "",
          source: "Website Popup",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to submit");

      setLoading(false);
      setSubmitted(true);
      e.currentTarget.reset();
    } catch (err: unknown) {
      setLoading(false);
      const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors({ phone: errMsg });
    }
  };

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
          >
            {/* Close button */}
            <button
              ref={closeRef}
              onClick={close}
              disabled={loading}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all disabled:opacity-50"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              /* ── Success State ── */
              <div className="p-8 md:p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5"
                >
                  <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 id="popup-title" className="font-heading text-2xl font-bold text-navy mb-2">
                  Thank You!
                </h3>
                <p className="text-navy-muted text-sm leading-relaxed max-w-xs mx-auto mb-6">
                  Your enquiry has been received. Our team will contact you shortly.
                </p>
                <button
                  onClick={close}
                  className="px-6 py-2.5 bg-navy text-white text-sm font-medium rounded-xl hover:bg-navy/90 transition-colors"
                >
                  Back to Website
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <>
                {/* Decorative top bar */}
                <div className="h-1.5 w-full rounded-t-2xl bg-gradient-to-r from-teal-500 via-teal-400 to-gold" />

                <form onSubmit={handleSubmit} className="p-7 md:p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <span className="inline-block text-teal-600 font-medium text-[10px] uppercase tracking-[0.2em] mb-2.5">
                      Build Your Dream Home
                    </span>
                    <h3 id="popup-title" className="font-heading text-xl md:text-2xl font-bold text-navy mb-1.5">
                      Let&apos;s Start Your Dream Home
                    </h3>
                    <p className="text-navy-muted text-sm">
                      Tell us a few details and our team will get in touch with you.
                    </p>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3.5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="popup-name" className="block text-navy text-xs font-semibold mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="popup-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your name"
                        autoComplete="name"
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border ${errors.name ? "border-red-400 bg-red-50/50" : "border-gray-200 bg-gray-50/80"} text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="popup-phone" className="block text-navy text-xs font-semibold mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">+91</span>
                        <input
                          id="popup-phone"
                          name="phone"
                          type="tel"
                          required
                          inputMode="numeric"
                          placeholder="Enter 10-digit phone number"
                          autoComplete="tel"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.replace(/\D/g, "").slice(0, 10);
                          }}
                          className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${errors.phone ? "border-red-400 bg-red-50/50" : "border-gray-200 bg-gray-50/80"} text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Location / Plot Number */}
                    <div>
                      <label htmlFor="popup-location" className="block text-navy text-xs font-semibold mb-1">
                        Location / Plot Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="popup-location"
                        name="location"
                        type="text"
                        required
                        placeholder="Enter your location or plot number"
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border ${errors.location ? "border-red-400 bg-red-50/50" : "border-gray-200 bg-gray-50/80"} text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                      />
                      {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>

                    {/* Plot Size (optional) */}
                    <div>
                      <label htmlFor="popup-plot" className="block text-navy text-xs font-semibold mb-1">
                        Plot Size <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <select
                        id="popup-plot"
                        name="plotSize"
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/80 text-navy focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all appearance-none"
                      >
                        <option value="">Select plot size</option>
                        <option value="20x30">20 × 30</option>
                        <option value="30x40">30 × 40</option>
                        <option value="30x50">30 × 50</option>
                        <option value="40x60">40 × 60</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>

                    {/* Home Type (optional) */}
                    <div>
                      <label htmlFor="popup-type" className="block text-navy text-xs font-semibold mb-1">
                        Home Type <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <select
                        id="popup-type"
                        name="homeType"
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/80 text-navy focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all appearance-none"
                      >
                        <option value="">What are you looking to build?</option>
                        <option value="Independent House">Independent House</option>
                        <option value="Modern Home">Modern Home</option>
                        <option value="Luxury Home">Luxury Home</option>
                        <option value="Eco-Friendly Home">Eco-Friendly Home</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Villa">Residence</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {errors._global && (
                    <p className="text-red-500 text-xs mt-3 text-center">{errors._global}</p>
                  )}

                  {/* CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-5 bg-navy text-white font-semibold py-3 rounded-xl hover:bg-navy/90 transition-all duration-300 text-sm disabled:opacity-70 hover:-translate-y-0.5 shadow-lg shadow-navy/15"
                  >
                    {loading ? "Submitting…" : "Get Free Consultation"}
                  </button>

                  {/* Privacy text */}
                  <p className="text-center text-gray-400 text-[10px] mt-3 leading-relaxed">
                    By submitting this form, you agree to be contacted regarding your enquiry.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
