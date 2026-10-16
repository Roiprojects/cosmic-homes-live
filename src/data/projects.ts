import { Project } from "@/types";
import projectsData from "./projects.json";

export const projects: Project[] = projectsData as Project[];

export const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  "Featured": { bg: "bg-gold", text: "text-navy-900" },
  "Premium": { bg: "bg-teal-500", text: "text-white" },
  "Premium+": { bg: "bg-navy-900 border border-gold/30", text: "text-white" },
  "Interior": { bg: "bg-amber-500", text: "text-white" },
};

export const PROJECT_CATEGORIES = [
  { slug: "featured", title: "Featured Projects", label: "Featured", subtitle: "Handpicked selections" },
  { slug: "modern", title: "Modern Homes", label: "Modern", subtitle: "Contemporary designs" },
  { slug: "contemporary", title: "Contemporary Homes", label: "Contemporary", subtitle: "Elegant architecture" },
  { slug: "urban", title: "Urban Living", label: "Urban", subtitle: "City-style homes" },
  { slug: "premium", title: "Premium Residences", label: "Premium", subtitle: "Luxury living" },
  { slug: "interior", title: "Interior Designs", label: "Interior", subtitle: "Beautiful spaces" }
];

export function getProjectsByCategory(slug: string) {
  const areaLabelMap: Record<string, string> = {
    "Featured": "featured",
    "Modern": "modern",
    "Contemporary": "contemporary",
    "Urban": "urban",
    "Premium": "premium",
    "Interior": "interior",
  };
  return projects.filter(p => areaLabelMap[p.area] === slug || (slug === "featured" && p.badge === "Featured") || (slug === "featured" && p.badge === "Premium+"));
}
