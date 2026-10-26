export interface ProcessStep {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Initial Enquiry",
    subtitle: "Tell Us About Your Dream Home",
    description:
      "Share your vision with us. We listen to your requirements, discuss your plot details, preferred home style, and establish clear expectations for your dream project.",
    bullets: [
      "Understand your requirements and vision",
      "Discuss plot details and location",
      "Explore preferred home styles",
      "Establish initial project expectations",
    ],
    image: "/images/villa-horizontal-light-1.png",
    imageAlt: "Modern architectural residence concept consultation",
  },
  {
    num: "02",
    title: "Consultation & Assessment",
    subtitle: "Professional Consultation and Requirements Evaluation",
    description:
      "Our team conducts a thorough on-site assessment to understand the plot conditions, discuss your spatial and lifestyle needs, and evaluate project feasibility.",
    bullets: [
      "On-site plot assessment",
      "Timeline and lifestyle requirements discussion",
      "Spatial and architectural requirement analysis",
      "Project feasibility evaluation",
    ],
    image: "/images/villa-terracotta-corner-1.png",
    imageAlt: "Detailed on-site architectural evaluation",
  },
  {
    num: "03",
    title: "Design & Planning",
    subtitle: "Creating Your Vision Into a Solid Plan",
    description:
      "Our architects translate your vision into detailed architectural plans, floor layouts, elevation concepts, and comprehensive material planning.",
    bullets: [
      "Custom architectural floor plans",
      "Elevation and facade design",
      "3D visualization and walkthroughs",
      "Material and specification planning",
    ],
    image: "/images/interior-living-1.jpg",
    imageAlt: "Architectural design drawings and blueprints",
  },
  {
    num: "04",
    title: "Proposal & Quotation",
    subtitle: "Comprehensive Specifications & Project Scope",
    description:
      "We provide a detailed project proposal covering complete scope of work, material specifications, technical drawings, and the proposed construction timeline.",
    bullets: [
      "Detailed project scope document",
      "Material specification schedule",
      "Comprehensive BOQ & architectural deliverables",
      "Proposed construction timeline",
    ],
    image: "/images/dream-home-building.jpg",
    imageAlt: "Architectural 3D rendering proposal and project specifications",
  },
  {
    num: "05",
    title: "Agreement & Contract",
    subtitle: "Moving Forward With Confidence",
    description:
      "Once you approve the proposal, we finalize the contract documentation, confirm the project responsibilities, and lock in the agreed timeline.",
    bullets: [
      "Final scope confirmation",
      "Contract documentation",
      "Project responsibility matrix",
      "Timeline and milestone confirmation",
    ],
    image: "/images/villa-golden-jali-1.png",
    imageAlt: "Project commitment and milestone confirmation",
  },
  {
    num: "06",
    title: "Pre-Construction Preparation",
    subtitle: "Preparing Everything Before Construction Begins",
    description:
      "Before the first brick is laid, we ensure all drawings are finalized, approvals are in place, the site is prepared, and materials are planned and scheduled.",
    bullets: [
      "Final architectural and structural drawings",
      "Regulatory approvals and permits",
      "Site clearing and preparation",
      "Material procurement and scheduling",
    ],
    image: "/images/exterior-greenview-123.png",
    imageAlt: "Site planning and pre-construction engineering",
  },
  {
    num: "07",
    title: "Construction Phase",
    subtitle: "From Plans to a Real Home",
    description:
      "Our expert execution team brings your home to life — from foundation and structural work to electrical, plumbing, masonry, and finishing touches.",
    bullets: [
      "Foundation and RCC structure",
      "Brickwork and plastering",
      "Electrical and plumbing installations",
      "Flooring, painting, and finishing",
    ],
    image: "/images/exterior-golden-stone-1.png",
    imageAlt: "Precision construction and premium masonry execution",
  },
  {
    num: "08",
    title: "Inspections & Quality Checks",
    subtitle: "Maintaining Quality at Every Stage",
    description:
      "Every stage of construction undergoes rigorous quality inspections — from material verification to safety checks and progress reviews.",
    bullets: [
      "Regular site inspections",
      "Material quality verification",
      "Construction progress reviews",
      "Safety and compliance checks",
    ],
    image: "/images/villa-navy-duplex-1.png",
    imageAlt: "Rigorous quality inspection and structural verification",
  },
  {
    num: "09",
    title: "Client Walkthrough & Approval",
    subtitle: "Review Your Home Before Handover",
    description:
      "We invite you for a detailed walkthrough of your completed home. Inspect every detail, report any snags, and give your final approval.",
    bullets: [
      "Guided client walkthrough",
      "Detailed inspection checklist",
      "Snag identification and correction",
      "Final client approval",
    ],
    image: "/images/interior-dining-1.jpg",
    imageAlt: "Client walkthrough of completed home",
  },
  {
    num: "10",
    title: "Project Handover",
    subtitle: "Handing Over Your New Home With Care",
    description:
      "The final step — we hand over your completed home with all documentation, keys, and after-handover support to ensure a smooth transition.",
    bullets: [
      "Complete project documentation",
      "Key handover ceremony",
      "Completion confirmation",
      "After-handover support and warranty",
    ],
    image: "/images/villa-housewarming-1.png",
    imageAlt: "Festive Griha Pravesh handover celebration",
  },
];
