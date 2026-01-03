import { PortfolioItem } from '@/types';

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    client: "Beachside Tavern",
    service: 'Web Design & Social Media',
    image: '/images/beachside thumbnail .png',
    description: 'Clean, minimalist website and social media strategy for New Smyrna Beach\'s premier original live music venue.',
    results: [
      { value: '200%', label: 'Event Attendance Growth' },
      { value: '3x', label: 'Social Engagement' },
    ],
    url: 'https://beachsidetavern.com',
  },
  {
    id: '2',
    client: "Cafe Da Vinci Deland",
    service: 'Web Design & Branding',
    image: '/images/davinchi thumbnail.png',
    description: 'Modern website design for DeLand\'s local live music venue with a "Drink Local, Dance Local" community focus.',
    results: [
      { value: '150%', label: 'Event Discovery' },
      { value: '10K+', label: 'Monthly Visitors' },
    ],
    url: 'https://cafedavincideland.com',
  },
  {
    id: '3',
    client: "Peanuts Sports Bar",
    service: 'Web Design & Branding',
    image: '/images/peaunuts thumbnail; .png',
    description: 'Vibrant website for New Smyrna Beach\'s iconic sports bar, cracking nuts and serving great times since 1987.',
    results: [
      { value: '180%', label: 'Online Visibility' },
      { value: '5K+', label: 'Monthly Visitors' },
    ],
    url: 'https://peanutsbarnsb.com',
  },
  {
    id: '4',
    client: "Gator's Dockside DeLand",
    service: 'Web Design & Branding',
    image: '/images/gators thumbnail.png',
    description: 'Modern website for DeLand\'s hometown restaurant, serving the best wings in town since 1989.',
    results: [
      { value: '200%', label: 'Online Orders' },
      { value: '8K+', label: 'Monthly Visitors' },
    ],
    url: 'https://delandgatorsdockside.com',
  },
];
