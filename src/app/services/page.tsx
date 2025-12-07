import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-service marketing solutions for local businesses. Brand strategy, social media management, content creation, and website design.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
