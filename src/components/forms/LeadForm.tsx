"use client";
import { useState, FormEvent } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

const plotSizeOptions = [
  { value: "", label: "Select Plot Size" },
  { value: "20x30", label: "20 × 30 (600 sq.ft)" },
  { value: "20x40", label: "20 × 40 (800 sq.ft)" },
  { value: "30x40", label: "30 × 40 (1200 sq.ft)" },
  { value: "30x50", label: "30 × 50 (1500 sq.ft)" },
  { value: "40x60", label: "40 × 60 (2400 sq.ft)" },
  { value: "50x80", label: "50 × 80 (4000 sq.ft)" },
  { value: "custom", label: "Custom Size" },
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

const packageOptions = [
  { value: "", label: "--Select Preferred Package--" },
  { value: "Essential", label: "Essential Turnkey Package" },
  { value: "Premium", label: "Premium Luxury Package" },
  { value: "Luxury", label: "Luxury Bespoke Package" },
  { value: "Custom", label: "Custom Architectural Design" },
  { value: "Discuss", label: "Discuss with Architecture Team" },
];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(cleaned);
    if (errors.mobile && cleaned.length === 10) {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Name is required";
    
    const digits = mobile.replace(/\D/g, "");
    if (!digits) {
      newErrors.mobile = "Mobile number is required";
    } else if (digits.length !== 10) {
      newErrors.mobile = "Please enter a valid 10-digit phone number.";
    }

    if (!data.location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
          message: String(data.message || ""),
          source: "Contact Form",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit");
      }

      setSubmitted(true);
      setErrors({});
      setMobile("");
      e.currentTarget.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors({ mobile: errMsg });
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-navy mb-2">Thank You!</h3>
        <p className="text-navy-muted max-w-sm mx-auto text-sm leading-relaxed">
          We&apos;ve received your enquiry. Our team will contact you within 24 hours to discuss your project.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 md:p-8 border border-gray-100 shadow-sm">
      <h3 className="font-heading text-xl font-bold text-navy mb-1">
        Get Free Consultation
      </h3>
      <p className="text-navy-muted text-sm mb-6">
        Fill in your details and we&apos;ll get back to you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <Input label="Full Name" name="name" placeholder="Your name" required error={errors.name} variant="light" />
        <Input
          label="Mobile Number"
          name="mobile"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="9876543210"
          required
          value={mobile}
          onChange={handleMobileChange}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/\D/g, "").slice(0, 10);
          }}
          error={errors.mobile}
          variant="light"
        />
        <Input label="Email Address" name="email" type="email" placeholder="your@email.com" variant="light" />
        <Input label="Location" name="location" placeholder="e.g., Rajajinagar" required error={errors.location} variant="light" />
        <Select label="Plot Size" name="plotSize" options={plotSizeOptions} variant="light" />
        <Select label="Number of Floors" name="floors" options={floorOptions} required variant="light" />
        <Select label="Preferred Package / Scope" name="budget" options={packageOptions} required variant="light" />
      </div>

      <div className="mb-4 mt-4">
        <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5 font-body">
          Message / Requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your plot location, desired architectural style, and specific requirements..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-[#c9a45c]/20 focus:border-[#c9a45c] transition-all resize-none text-sm font-body"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 px-8 bg-gold hover:bg-gold-600 text-white font-bold text-base rounded-xl shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      >
        Get My Free Consultation
      </button>

      <p className="text-xs text-gray-600 mt-3 text-center">
        By submitting, you agree to our{" "}
        <a href="/privacy-policy" className="text-gold hover:text-gold-300 transition-colors">Privacy Policy</a>.
      </p>
    </form>
  );
}
