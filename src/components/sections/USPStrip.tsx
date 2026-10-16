"use client";
import { motion } from "framer-motion";

const usps = [
  {
    num: "01",
    title: "Transparent Process",
    description: "Clear communication from planning to handover.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Customized Designs",
    description: "Homes designed around your lifestyle and requirements.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.227-1.128zm0 0a15.998 15.998 0 003.388-6.186m-3.388 6.186a15.974 15.974 0 01-3.388-6.186m3.388 6.186l-.001.001m0 0l3.388 6.186m0 0a3 3 0 105.78-1.128 2.25 2.25 0 012.4-2.245 4.5 4.5 0 00-8.4 2.245c0 .399.078.78.227 1.128zm0 0a15.998 15.998 0 00-3.388 6.186m3.388-6.186l.001-.001" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Quality Construction",
    description: "Focused supervision and quality control throughout construction.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "End-to-End Support",
    description: "Design, estimation, construction and handover under one roof.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Dedicated Support",
    description: "Regular updates throughout your construction journey.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.819-.517L11.046 19.5H9.75l-3.375-3.375a2.115 2.115 0 01-.519-.817c-.11-.326-.136-1.666-.163-4.02C5.493 8.353 6.337 7.5 7.5 7.5h9.75c.97 0 1.813.616 2.25 1.511z" />
      </svg>
    ),
  },
];

export default function USPStrip() {
  return (
    <section className="relative py-16 md:py-20 bg-section-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-navy-muted font-medium text-xs uppercase tracking-[0.2em] mb-3">
          Why Homeowners Choose Cosmic Homes
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-10">
          Everything You Need to Build Your <span className="text-teal-500">Dream Home</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 border border-teal-500/10 text-teal-500 mb-4 group-hover:bg-teal-500/10 group-hover:border-teal-500/20 transition-all duration-500">
                {usp.icon}
              </div>
              <span className="text-teal-500/20 font-heading text-2xl font-bold block mb-2 group-hover:text-teal-500/30 transition-colors duration-500">
                {usp.num}
              </span>
              <h3 className="text-navy font-semibold text-sm mb-1.5">{usp.title}</h3>
              <p className="text-navy-muted text-xs leading-relaxed">{usp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
