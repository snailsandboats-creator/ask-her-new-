'use client';

import { PageHero } from '@/components/sections/PageHero';
import { ContactSection } from '@/components/sections/ContactSection';

export function ContactPageClient() {
  return (
    <>
      <PageHero
        overline="Get in Touch"
        headline="Let's talk about your businesses"
        subheadline="Ready to grow? Book a free strategy call or send us a message. We respond to all inquiries within 24 hours."
      />

      {/* Contact Form & Info */}
      <ContactSection />
    </>
  );
}
