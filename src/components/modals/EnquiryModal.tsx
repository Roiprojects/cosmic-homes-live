"use client";
import { useState, useEffect, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEnquiryModal } from "@/components/layout/EnquiryModalProvider";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const plotSizeOptions = [
  { value: "", label: "Select Plot Size" },
  { value: "20x30", label: "20 × 30" },
  { value: "30x40", label: "30 × 40" },
  { value: "30x50", label: "30 × 50" },
  { value: "40x60", label: "40 × 60" },
  { value: "custom", label: "Custom" },
];

const floorOptions = [
  { value: "", label: "--Select Number of Floors--" },
  { value: "1", label: "Ground Floor (G)" },
  { value: "2", label: "Ground + 1 Floor (G+1)" },
  { value: "3", label: "Ground + 2 Floors (G+2)" },
  { value: "4", label: "Ground + 3 Floors (G+3)" },
  { value: "5", label: "Ground + 4 Floors (G+4)" },
  { value: "custom", label: "Custom" },
];

const budgetOptions = [
  { value: "", label: "--Select Approximate Budget--" },
  { value: "30-50L", label: "₹30 - 50 Lakhs" },
  { value: "50-75L", label: "₹50 - 75 Lakhs" },
  { value: "75L-1Cr", label: "₹75 Lakhs - 1 Crore" },
  { value: "1-1.5Cr", label: "₹1 Crore - 1.5 Crores" },
  { value: "1.5Cr+", label: "₹1.5 Crores +" },
  { value: "custom", label: "Discuss with Team" },
];

export default function EnquiryModal() {
  const { isOpen, closeModal } = useEnquiryModal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = useCallback(() => {
    if (!loading) closeModal();
  }, [closeModal, loading]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, handleClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const errs: Record<string, string> = {};

    const digits = phone.replace(/\D/g, "");
    if (!data.name || typeof data.name !== "string" || !data.name.trim()) errs.name = "Full name is required";
    if (!digits) {
      errs.phone = "Phone number is required";
    } else if (digits.length !== 10) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!data.location || typeof data.location !== "string" || !data.location.trim()) errs.location = "Location is required";

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
          name: String(data.name || ""),
          mobile: digits,
          email: String(data.email || ""),
          location: String(data.location || ""),
          plotSize: String(data.plotSize || ""),
          floors: String(data.floors || ""),
          budget: String(data.budget || ""),
          message: String(data.requirement || ""),
          source: "Enquiry Modal",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit");
      }

      setLoading(false);
      setSubmitted(true);
      setPhone("");
      e.currentTarget.reset();

      setTimeout(() => {
        setSubmitted(false);
        closeModal();
      }, 4000);
    } catch (err: unknown) {
      setLoading(false);
      const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors({ phone: errMsg });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative"
            style={{ zIndex: 301 }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              disabled={loading}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors disabled:opacity-50"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="p-8 md:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy mb-2">Thank You!</h3>
                <p className="text-navy-muted text-sm leading-relaxed max-w-sm mx-auto">
                  Your enquiry has been received. Our home construction expert will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <h3 className="font-heading text-2xl font-bold text-navy mb-1 pr-8">
                  Let&apos;s Build Your Dream Home
                </h3>
                <p className="text-navy-muted text-sm mb-6">
                  Tell us a little about your project and our home construction expert will get in touch with you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <Input label="Full Name" name="name" placeholder="Your full name" required error={errors.name} variant="light" />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="e.g., 9876543210"
                    required
                    value={phone}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhone(cleaned);
                      if (errors.phone && cleaned.length === 10) {
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/\D/g, "").slice(0, 10);
                    }}
                    error={errors.phone}
                    variant="light"
                  />
                  <Input label="Email Address" name="email" type="email" placeholder="your@email.com" variant="light" />
                  <Input label="City / Location" name="location" placeholder="e.g., Rajajinagar, Bengaluru" required error={errors.location} variant="light" />
                  <Select label="Plot Size" name="plotSize" options={plotSizeOptions} variant="light" />
                  <Select label="Number of Floors" name="floors" options={floorOptions} required variant="light" />
                  <Select label="Approximate Budget" name="budget" options={budgetOptions} required variant="light" />
                  <div className="sm:col-span-2">
                    <label htmlFor="requirement" className="block text-sm font-medium text-navy-muted mb-1.5">
                      Tell us about your dream home...
                    </label>
                    <textarea
                      id="requirement"
                      name="requirement"
                      rows={3}
                      placeholder="Any specific requirements, style preferences, timeline..."
                      className="input-light w-full px-4 py-3 border border-gray-300 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none text-sm"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full justify-center mt-5 py-3.5 text-base">
                  {loading ? "Submitting..." : "Request a Consultation"}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
