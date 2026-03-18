import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Ask Her Marketing Group | Free Business Assessment',
  description: 'Book a free business assessment with Ask Her Marketing Group. No pressure, no sales pitch — just a real conversation about growing your business in Volusia County.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
