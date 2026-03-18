import type { Metadata } from 'next';
import { PortfolioPageClient } from './PortfolioPageClient';

export const metadata: Metadata = {
  title: 'Our Work | Ask Her Marketing Group Portfolio',
  description: 'See how Ask Her Marketing Group has helped Volusia County businesses grow — websites, branding, social media, and more.',
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
