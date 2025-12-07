import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ask Her Marketing Group. Book a free strategy call or send us a message. We\'d love to hear about your business.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
