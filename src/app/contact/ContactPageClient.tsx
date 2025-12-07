'use client';

import { PageHero } from '@/components/sections/PageHero';
import { ContactSection } from '@/components/sections/ContactSection';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FadeUp } from '@/components/motion/FadeUp';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FAQSection } from '@/components/sections/FAQSection';
import { faqItems } from '@/data/faq';

export function ContactPageClient() {
  return (
    <>
      <PageHero
        overline="Get in Touch"
        headline="Let's talk about your business."
        subheadline="Ready to grow? Book a free strategy call or send us a message. We respond to all inquiries within 24 hours."
      />

      {/* Contact Form & Info */}
      <ContactSection />

      {/* What to Expect */}
      <Section background="offwhite" padding="lg">
        <Container size="narrow">
          <FadeUp>
            <SectionHeader
              overline="What to Expect"
              headline="Here's what happens next."
              centered
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="space-y-8 mt-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-pink rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-h5 text-black mb-2">We'll reach out within 24 hours</h3>
                  <p className="text-body text-slate">
                    One of our team members will personally respond to your inquiry and schedule a call at a time that works for you.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-pink rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-h5 text-black mb-2">Discovery call (30 min)</h3>
                  <p className="text-body text-slate">
                    We'll learn about your business, your goals, and your challenges. This is a no-pressure conversation—just getting to know each other.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-pink rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-h5 text-black mb-2">Custom proposal</h3>
                  <p className="text-body text-slate">
                    If we're a good fit, we'll create a customized proposal outlining our recommended strategy and transparent pricing.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-pink rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-h5 text-black mb-2">Let's get started!</h3>
                  <p className="text-body text-slate">
                    Once you approve the proposal, we hit the ground running. Most projects kick off within 1-2 weeks.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* FAQ */}
      <FAQSection
        overline="Common Questions"
        headline="Before you reach out."
        faqs={faqItems}
      />
    </>
  );
}
