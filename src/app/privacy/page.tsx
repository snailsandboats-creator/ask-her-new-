import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { CTABlock } from '@/components/sections/CTABlock';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Ask Her Marketing Group privacy policy and data protection information.',
};

export default function PrivacyPage() {
  return (
    <>
      <Section background="offwhite" padding="lg" className="pt-32 md:pt-40">
        <Container size="narrow">
          <h1 className="text-h1 mb-6">Privacy Policy</h1>
          <p className="text-body-lg text-slate mb-8">
            Last updated: December 15, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-h3 mt-8 mb-4">Information We Collect</h2>
            <p className="text-body text-slate mb-6">
              We collect information you provide directly to us when you contact us, request our services,
              or communicate with us. This may include your name, email address, phone number, and business information.
            </p>

            <h2 className="text-h3 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-body text-slate mb-6">
              We use the information we collect to provide, maintain, and improve our services, communicate with you,
              and respond to your requests and inquiries.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Information Sharing</h2>
            <p className="text-body text-slate mb-6">
              We do not sell or share your personal information with third parties for their marketing purposes.
              We may share information with service providers who help us operate our business.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Cookies and Analytics</h2>
            <p className="text-body text-slate mb-6">
              Our website may use cookies and similar technologies to improve your experience and analyze site traffic.
              You can control cookie preferences through your browser settings.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Data Retention</h2>
            <p className="text-body text-slate mb-6">
              We retain your information only as long as necessary to provide our services and fulfill the purposes
              described in this policy.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Your Rights</h2>
            <p className="text-body text-slate mb-6">
              You may request access to, correction of, or deletion of your personal information by contacting us.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Contact Us</h2>
            <p className="text-body text-slate mb-6">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:drita@askhermarketing.com" className="text-pink hover:underline">
                drita@askhermarketing.com
              </a>
              {' '}or{' '}
              <a href="mailto:che@askhermarketing.com" className="text-pink hover:underline">
                che@askhermarketing.com
              </a>
            </p>
          </div>
        </Container>
      </Section>

      <CTABlock
        headline="Ready to grow your business?"
        description="Let's talk about how we can help you reach your goals."
        primaryCta={{ label: "Book Your Free Call", href: "/contact" }}
        secondaryCta={{ label: "View Our Services", href: "/services" }}
      />
    </>
  );
}
