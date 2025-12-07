import { PortfolioItem } from '@/types';

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    client: "Johnson's Bakery",
    service: 'Branding & Social Media',
    image: '/images/portfolio/johnsons-bakery.jpg',
    description: 'Complete brand refresh and social media strategy that transformed a local bakery into a neighborhood destination.',
    results: [
      { value: '200%', label: 'Increase in Foot Traffic' },
      { value: '3x', label: 'More Online Orders' },
    ],
  },
  {
    id: '2',
    client: "Chen's Auto Repair",
    service: 'Web Design & SEO',
    image: '/images/portfolio/chens-auto.jpg',
    description: 'Modern website and local SEO strategy that put this auto shop at the top of search results.',
    results: [
      { value: '150%', label: 'More Website Leads' },
      { value: '#1', label: 'Google Ranking' },
    ],
  },
  {
    id: '3',
    client: 'Martinez Wellness',
    service: 'Content Marketing',
    image: '/images/portfolio/martinez-wellness.jpg',
    description: 'Content strategy and email marketing that built a loyal community of wellness enthusiasts.',
    results: [
      { value: '5,000+', label: 'Email Subscribers' },
      { value: '45%', label: 'Open Rate' },
    ],
  },
  {
    id: '4',
    client: 'Urban Fitness Co',
    service: 'Social Media Marketing',
    image: '/images/portfolio/urban-fitness.jpg',
    description: 'Instagram-first strategy that turned a local gym into a fitness influencer brand.',
    results: [
      { value: '10K+', label: 'New Followers' },
      { value: '300%', label: 'Engagement Increase' },
    ],
  },
  {
    id: '5',
    client: 'Bloom Florist',
    service: 'Branding & Web Design',
    image: '/images/portfolio/bloom-florist.jpg',
    description: 'Elegant rebrand and e-commerce website for a boutique flower shop.',
    results: [
      { value: '400%', label: 'Online Sales Growth' },
      { value: '2x', label: 'Average Order Value' },
    ],
  },
  {
    id: '6',
    client: 'Peak Roofing',
    service: 'Web Design & SEO',
    image: '/images/portfolio/peak-roofing.jpg',
    description: 'Lead-generating website and local SEO for a residential roofing company.',
    results: [
      { value: '85', label: 'Leads Per Month' },
      { value: '$250K', label: 'Revenue Generated' },
    ],
  },
];

export const featuredCaseStudy = portfolioItems[0];
