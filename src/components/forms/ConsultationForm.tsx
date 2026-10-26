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
            <label className="block text-gray-400 text-xs mb-1.5 font-body">Name *</label>
            <input
              type="text"
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9a45c]/50 focus:ring-1 focus:ring-[#c9a45c]/30 transition-all font-body"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5 font-body">Phone *</label>
            <input
              type="tel"
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9a45c]/50 focus:ring-1 focus:ring-[#c9a45c]/30 transition-all font-body"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1.5 font-body">Email</label>
            <input
              type="email"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9a45c]/50 focus:ring-1 focus:ring-[#c9a45c]/30 transition-all font-body"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5 font-body">Location</label>
            <input
              type="text"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9a45c]/50 focus:ring-1 focus:ring-[#c9a45c]/30 transition-all font-body"
              placeholder="Bengaluru"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1.5 font-body">Plot Size</label>
            <select className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#c9a45c]/50 focus:ring-1 focus:ring-[#c9a45c]/30 transition-all appearance-none font-body">
              <option value="" className="bg-[#022b27]">Select plot size</option>
              <option value="30x40" className="bg-[#022b27]">30 x 40</option>
              <option value="30x50" className="bg-[#022b27]">30 x 50</option>
              <option value="40x60" className="bg-[#022b27]">40 x 60</option>
              <option value="other" className="bg-[#022b27]">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5 font-body">Home Type</label>
            <select className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#c9a45c]/50 focus:ring-1 focus:ring-[#c9a45c]/30 transition-all appearance-none font-body">
              <option value="" className="bg-[#022b27]">Select type</option>
              <option value="independent" className="bg-[#022b27]">Independent House</option>
              <option value="duplex" className="bg-[#022b27]">Duplex</option>
              <option value="villa" className="bg-[#022b27]">Residence</option>
              <option value="apartment" className="bg-[#022b27]">Apartment</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-body">Message</label>
          <textarea
            rows={3}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9a45c]/50 focus:ring-1 focus:ring-[#c9a45c]/30 transition-all resize-none font-body"
            placeholder="Tell us about your dream home..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gold-gradient text-white font-semibold py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 text-xs uppercase tracking-wider hover:-translate-y-0.5 shadow-lg shadow-[#c9a45c]/20 cursor-pointer font-body"
        >
          Get Free Consultation
        </button>
      </div>
    </form>
  );
}
