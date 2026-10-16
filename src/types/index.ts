export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
}

export interface HousePlan {
  id: string;
  title: string;
  plotSize: string;
  floors: number;
  style: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  image?: string;
}

export interface Package {
  id: string;
  name: "Essential" | "Premium" | "Luxury" | "Custom";
  tagline: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  startingPrice?: string;
  idealFor?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  area: string;
  badge?: string;
  description: string;
  images: string[];
  features: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  role?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface HeroEnquiryData {
  name: string;
  phone: string;
  location: string;
  plotSize: string;
  builtUpArea: string;
  requirement: string;
}

export interface LeadFormData {
  name: string;
  mobile: string;
  email: string;
  location: string;
  plotSize: string;
  builtUpArea: string;
  floors: string;
  expectedStartDate: string;
  message: string;
}

export type FAQCategory =
  | "General"
  | "Packages"
  | "Timeline"
  | "Quality"
  | "Design"
  | "Payments";
