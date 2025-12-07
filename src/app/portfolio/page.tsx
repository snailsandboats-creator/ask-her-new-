import type { Metadata } from 'next';
import { PortfolioPageClient } from './PortfolioPageClient';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'See our work. Real results for real businesses. Browse our portfolio of brand identities, social media campaigns, and website designs.',
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
