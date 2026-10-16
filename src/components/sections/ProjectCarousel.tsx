"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/types";
import { useInView } from "@/hooks/useInView";
import { BADGE_COLORS } from "@/data/projects";

const CARD_GAP = 24;

export default function ProjectCarousel({
  projects,
  categoryLabel,
  categorySlug,
}: {
  projects: Project[];
  categoryLabel: string;
  categorySlug: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { ref: headerRef, visible: headerVisible } = useInView(0.15);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-card]")?.getBoundingClientRect().width ?? 340;
    const offset = cardWidth + CARD_GAP;
    el.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  return (
    <div ref={headerRef} className="mb-10">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={headerVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between mb-5"
      >
        <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
          {categoryLabel}
        </h3>
        <Link href={`/projects/${categorySlug === "featured" ? "" : categorySlug}`}>
          <span className="group text-sm text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1.5 transition-colors duration-300 cursor-pointer">
            View All
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </motion.div>

      {/* Carousel Row */}
      <div className="relative group/carousel">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Cards Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              data-card
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[280px] md:w-[320px]"
            >
              <ProjectCard project={project} isHovered={isHovered} />
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-2" />
    </div>
  );
}

function ProjectCard({ project, isHovered }: { project: Project; isHovered: boolean }) {
  const router = useRouter();
  const badgeColor = BADGE_COLORS[project.badge ?? "Premium"] ?? BADGE_COLORS.Premium;

  return (
    <div
      onClick={() => router.push(`/projects/${project.slug}`)}
      className="group cursor-pointer relative rounded-xl overflow-hidden aspect-[16/10]"
    >
      {/* Image */}
      <img
        src={project.images[0]}
        alt={project.title}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      />

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? "opacity-90" : "opacity-70"
        }`}
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Badge */}
      <span
        className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[0.65rem] font-bold uppercase tracking-wider ${badgeColor.bg} ${badgeColor.text}`}
      >
        {project.badge ?? "Premium"}
      </span>

      {/* Project Name */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4
          className="text-white font-heading text-base font-semibold leading-snug transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          {project.title}
        </h4>
        <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {project.location}
        </p>

        {/* View indicator on hover */}
        <span className="inline-flex items-center gap-1 text-teal-400 text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          View Project
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </div>
  );
}
