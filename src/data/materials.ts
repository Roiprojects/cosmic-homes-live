export interface MaterialGroup {
  title: string;
  icon: string;
  items: string[];
}

export const materials: MaterialGroup[] = [
  {
    title: "Foundation & Structure",
    icon: "🏗️",
    items: [
      "TMT steel bars from trusted brands",
      "High-grade cement for durability",
      "Seismic-resistant design standards",
      "Waterproofing at foundation level",
    ],
  },
  {
    title: "Wall & Partition",
    icon: "🧱",
    items: [
      "Fly-ash bricks for eco-friendly walls",
      "AAC blocks for thermal insulation",
      "Premium quality wall finishes",
      "Anti-termite treatment",
    ],
  },
  {
    title: "Flooring & Finishes",
    icon: "✨",
    items: [
      "Vitrified tiles in common areas",
      "Premium wooden flooring options",
      "Granite/marble countertops",
      "Anti-skid tiles in bathrooms",
    ],
  },
  {
    title: "Electrical & Plumbing",
    icon: "⚡",
    items: [
      "Branded concealed wiring",
      "Modular switches and fixtures",
      "Premium CPVC piping",
      "ISI-approved electrical fittings",
    ],
  },
  {
    title: "Safety & Security",
    icon: "🛡️",
    items: [
      "Earthquake-resistant construction",
      "Fire-rated doors in key areas",
      "CCTV-ready wiring infrastructure",
      "Intercom system provision",
    ],
  },
  {
    title: "Exterior & Roofing",
    icon: "🏠",
    items: [
      "Weather-proof external paint",
      "Terrace waterproofing system",
      "Rainwater drainage channels",
      "Anti-fading exterior finishes",
    ],
  },
];
