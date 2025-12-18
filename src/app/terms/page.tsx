import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { CTABlock } from '@/components/sections/CTABlock';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Ask Her Marketing Group terms of service and conditions.',
};

export default function TermsPage() {
  return (
    <>
      <Section background="offwhite" padding="lg" className="pt-32 md:pt-40">
        <Container size="narrow">
          <h1 className="text-h1 mb-6">Terms of Service</h1>
          <p className="text-body-lg text-slate mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-h3 mt-8 mb-4">Services</h2>
            <p className="text-body text-slate mb-6">
              Ask Her Marketing Group provides marketing services including but not limited to brand strategy,
              social media management, content creation, website design, and digital marketing solutions.
              All services are customized based on client needs and goals.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Payment Terms</h2>
            <p className="text-body text-slate mb-6">
              Payment terms are outlined in individual service agreements. We offer flexible pricing with no long-term
              contracts required. Monthly retainer clients may cancel at any time with 30 days notice.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Client Responsibilities</h2>
            <p className="text-body text-slate mb-6">
              Clients are responsible for providing timely feedback, necessary materials, and access to required
              platforms and accounts. Delays in providing these may impact project timelines.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Intellectual Property</h2>
            <p className="text-body text-slate mb-6">
              Upon full payment, clients receive full rights to final deliverables created specifically for them.
              We retain the right to showcase work in our portfolio unless otherwise agreed.
            </p>

            <h2 className="text-h3 mt-8 mb-4">Contact Us</h2>
            <p className="text-body text-slate mb-6">
              If you have questions about these Terms, please contact us at{' '}
              <a href="mailto:drita@askhermarketing.com" className="text-pink hover:underline">
                drita@askhermarketing.com
              </a>
            </p>
          </div>
        </Container>
      </Section>

      <CTABlock
        headline="Ready to get started?"
        description="Let's create something amazing for your business."
        primaryCta={{ label: "Book Your Free Call", href: "/contact" }}
        secondaryCta={{ label: "View Our Portfolio", href: "/portfolio" }}
      />
    </>
  );
}
