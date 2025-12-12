export interface Service {
  id: string;
  icon: string;
  title: string;
  headline: string;
  description: string;
  shortDescription?: string;
  fullDescription?: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  image?: string;
}

export interface PortfolioItem {
  id: string;
  client: string;
  service: string;
  image: string;
  description?: string;
  results?: { value: string; label: string }[];
  url?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}
