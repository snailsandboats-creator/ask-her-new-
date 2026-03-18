import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';

export const metadata: Metadata = {
  title: 'Ask Her Marketing Group | Marketing Agency in New Smyrna Beach, FL',
  description: 'Ask Her Marketing Group is a full-service marketing agency in New Smyrna Beach, FL. Web design, SEO, social media, branding, photography, and more — no contracts, real results.',
};

export default function HomePage() {
  return <HomePageClient />;
}
