import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind Ask Her Marketing Group. We\'re a boutique marketing agency that helps local businesses grow with strategy-first marketing.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
