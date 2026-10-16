"use client";

import React from "react";

export default function ConsultationForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (btn) {
      btn.textContent = "Thank You! We'll be in touch.";
      btn.disabled = true;
      btn.classList.add("opacity-70");
    }
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
      <span className="text-gold font-medium text-xs uppercase tracking-[0.2em] mb-4">
        Get Started
      </span>
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
        Build Your Dream Home With Us
      </h3>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
        Tell us about your requirements and our team will help you take the next step.
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Name *</label>
            <input
              type="text"
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Phone *</label>
            <input
              type="tel"
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Email</label>
            <input
              type="email"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Location</label>
            <input
              type="text"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
              placeholder="Bengaluru"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Plot Size</label>
            <select className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all appearance-none">
              <option value="" className="bg-navy">Select plot size</option>
              <option value="30x40" className="bg-navy">30 x 40</option>
              <option value="30x50" className="bg-navy">30 x 50</option>
              <option value="40x60" className="bg-navy">40 x 60</option>
              <option value="other" className="bg-navy">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Home Type</label>
            <select className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all appearance-none">
              <option value="" className="bg-navy">Select type</option>
              <option value="independent" className="bg-navy">Independent House</option>
              <option value="duplex" className="bg-navy">Duplex</option>
              <option value="villa" className="bg-navy">Residence</option>
              <option value="apartment" className="bg-navy">Apartment</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Message</label>
          <textarea
            rows={3}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all resize-none"
            placeholder="Tell us about your dream home..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gold text-white font-semibold py-3.5 rounded-xl hover:bg-gold-600 transition-all duration-300 text-sm hover:-translate-y-0.5 shadow-lg shadow-gold/20"
        >
          Get Free Consultation
        </button>
      </div>
    </form>
  );
}
