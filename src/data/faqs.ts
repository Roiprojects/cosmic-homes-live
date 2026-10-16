import { FAQItem, FAQCategory } from "@/types";

export const faqs: FAQItem[] = [
  {
    id: "f1",
    category: "General",
    question: "What services does Cosmic Homes offer?",
    answer:
      "Cosmic Homes offers end-to-end residential construction services in Bengaluru — from architectural design and structural planning to full construction, MEP services, interior finishing, project management, and renovation.",
  },
  {
    id: "f2",
    category: "General",
    question: "Where is Cosmic Homes based?",
    answer:
      "Cosmic Homes is based in Bengaluru, Karnataka. Our office is located at 130/1, 1st Floor, 4th Main, Rajajinagar Industrial Town, Bengaluru – 560044.",
  },
  {
    id: "f3",
    category: "General",
    question: "Do you serve areas outside Bengaluru?",
    answer:
      "Our primary service area is Bengaluru and its surrounding regions. Please reach out to discuss your specific location.",
  },
  {
    id: "f4",
    category: "Packages",
    question: "What construction packages do you offer?",
    answer:
      "We offer four construction packages: Essential (functional, practical construction), Premium (enhanced finishes and materials), Luxury (high-end design and premium finishes), and Custom (fully tailored to your specifications). Each package is designed to meet different needs and budgets.",
  },
  {
    id: "f5",
    category: "Packages",
    question: "Do you provide a detailed cost estimate?",
    answer:
      "Yes. After understanding your requirements, plot details, and design preferences, we provide a detailed project proposal and cost estimate before any agreement.",
  },
  {
    id: "f6",
    category: "Packages",
    question: "Are there any hidden costs?",
    answer:
      "No. We provide a detailed scope of work and a transparent cost breakdown. Any changes to the agreed plan are discussed and documented before proceeding.",
  },
  {
    id: "f7",
    category: "Timeline",
    question: "How long does it take to build a house?",
    answer:
      "The timeline depends on the type of construction, size of the project, and design complexity. After the design and planning phase, we provide a detailed construction schedule as part of the proposal.",
  },
  {
    id: "f8",
    category: "Timeline",
    question: "How often will I receive project updates?",
    answer:
      "We provide regular progress updates throughout your construction journey. The frequency and format of updates are agreed upon during the planning stage.",
  },
  {
    id: "f9",
    category: "Timeline",
    question: "Can I visit the construction site during the project?",
    answer:
      "Yes, we encourage site visits at key milestones. We coordinate site visits so you can see the progress firsthand.",
  },
  {
    id: "f10",
    category: "Quality",
    question: "What quality measures do you follow?",
    answer:
      "Quality is central to our process. We conduct inspections at every construction stage, use certified materials, and maintain focused site supervision throughout the project.",
  },
  {
    id: "f11",
    category: "Quality",
    question: "Do you provide a warranty on construction?",
    answer:
      "Warranty terms vary by package and are clearly documented in the agreement. Please discuss warranty details with our team during the consultation.",
  },
  {
    id: "f12",
    category: "Design",
    question: "Do you provide architectural design services?",
    answer:
      "Yes. Architectural design — including floor plans, elevation design, space planning, and 3D visualization — is part of our end-to-end service.",
  },
  {
    id: "f13",
    category: "Design",
    question: "Can I provide my own house plan?",
    answer:
      "Yes, we can work with your existing plans or adapt them. Our team will review your plan and provide feedback on feasibility and improvements.",
  },
  {
    id: "f14",
    category: "Design",
    question: "Can the house design be customized?",
    answer:
      "Absolutely. Customization is at the heart of what we do. We design every home around your specific requirements, preferences, and lifestyle.",
  },
  {
    id: "f15",
    category: "Payments",
    question: "How is the payment schedule structured?",
    answer:
      "We follow a construction-linked payment schedule. The exact payment milestones are defined in the agreement and are linked to completed construction stages.",
  },
  {
    id: "f16",
    category: "Payments",
    question: "What happens if I want to make changes after approval?",
    answer:
      "Change requests after plan approval are handled through a documented change order process. Any cost or timeline impact is communicated to you before proceeding.",
  },
];

export const faqCategories: FAQCategory[] = [
  "General",
  "Packages",
  "Timeline",
  "Quality",
  "Design",
  "Payments",
];

export const getFaqsByCategory = (category: string) =>
  faqs.filter((f) => f.category === category);
