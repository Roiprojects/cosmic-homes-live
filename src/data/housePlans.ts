import { HousePlan } from "@/types";

export const housePlans: HousePlan[] = [
  {
    id: "1",
    title: "Modern Niche 2BHK Residence",
    plotSize: "20×30",
    floors: 1,
    style: "Modern",
    sqft: 900,
    bedrooms: 2,
    bathrooms: 2,
    description:
      "A thoughtfully designed compact home ideal for small plots, maximizing every square foot with smart space planning and warm facade lighting.",
    image: "/images/villa-square-niches-1.png",
  },
  {
    id: "2",
    title: "Navy Accent G+1 Family Home",
    plotSize: "30×40",
    floors: 2,
    style: "Contemporary",
    sqft: 2400,
    bedrooms: 4,
    bathrooms: 3,
    description:
      "A spacious G+1 residence with navy architectural framing and warm wood detailing, perfect for a growing family.",
    image: "/images/villa-navy-duplex-1.png",
  },
  {
    id: "3",
    title: "Terracotta Breeze Block G+2 Home",
    plotSize: "30×40",
    floors: 3,
    style: "Traditional",
    sqft: 3600,
    bedrooms: 5,
    bathrooms: 4,
    description:
      "A three-story design blending traditional terracotta jali screens with contemporary wood soffits, ideal for multi-generational families.",
    image: "/images/villa-terracotta-12-1.png",
  },
  {
    id: "4",
    title: "Horizontal Glow G+1 Luxury",
    plotSize: "30×50",
    floors: 2,
    style: "Modern",
    sqft: 3200,
    bedrooms: 5,
    bathrooms: 4,
    description:
      "An expansive G+1 luxury residence on a wider plot, featuring illuminated horizontal light bands and premium cantilevered balconies.",
    image: "/images/villa-horizontal-light-1.png",
  },
  {
    id: "5",
    title: "Lush Canopy G+3 Residence",
    plotSize: "40×60",
    floors: 3,
    style: "Contemporary",
    sqft: 5400,
    bedrooms: 6,
    bathrooms: 5,
    description:
      "A premium three-story contemporary home on a generous 40×60 plot, surrounded by lush greenery with subtle wood and cream horizontal banding and chevron wall lighting.",
    image: "/images/exterior-greenery-apt-1.png",
  },
  {
    id: "6",
    title: "Corner Balcony Duplex Home",
    plotSize: "40×60",
    floors: 2,
    style: "Modern",
    sqft: 3800,
    bedrooms: 5,
    bathrooms: 4,
    description:
      "A stunning duplex home combining wraparound glass balconies with laser-cut corner jali details for a high-end lifestyle.",
    image: "/images/villa-corner-balcony-1.png",
  },
  {
    id: "7",
    title: "Golden Jali G+1 Home",
    plotSize: "30×50",
    floors: 2,
    style: "Minimalist",
    sqft: 2600,
    bedrooms: 4,
    bathrooms: 3,
    description:
      "Clean lines and back-lit golden CNC jali screens define this home — understated elegance with striking night appeal.",
    image: "/images/villa-golden-jali-1.png",
  },
  {
    id: "8",
    title: "Terracotta Jaali & Stone Home",
    plotSize: "30×40",
    floors: 2,
    style: "Contemporary",
    sqft: 2800,
    bedrooms: 4,
    bathrooms: 3,
    description:
      "A contemporary home featuring exposed terracotta breeze blocks, circular porthole accents, and dark stone walls.",
    image: "/images/villa-terracotta-corner-1.png",
  },
];

export const PLOT_SIZES = ["All", "20×30", "30×40", "30×50", "40×60", "Custom"];
export const FLOOR_OPTIONS = ["Any", "1", "2", "3"];
export const STYLE_OPTIONS = [
  "All",
  "Modern",
  "Contemporary",
  "Traditional",
  "Minimalist",
  "Luxury",
];
