import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Ask Her Marketing Group | Local Agency in New Smyrna Beach, FL',
  description: 'Meet the family-run team behind Ask Her Marketing Group — a full-service marketing agency born and raised in New Smyrna Beach, Volusia County, Florida.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
