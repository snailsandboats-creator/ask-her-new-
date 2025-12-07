'use client';

import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { FAQSection } from '@/components/sections/FAQSection';
import { FadeUp } from '@/components/motion/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { FeatureList } from '@/components/shared/FeatureList';
import { services } from '@/data/services';
import { faqItems } from '@/data/faq';
import { Palette, Instagram, FileText, Globe } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  palette: <Palette className="w-8 h-8 text-pink" />,
  instagram: <Instagram className="w-8 h-8 text-pink" />,
  'file-text': <FileText className="w-8 h-8 text-pink" />,
  globe: <Globe className="w-8 h-8 text-pink" />,
};

export function ServicesPageClient() {
  return (
    <>
      <PageHero
        overline="Our Services"
        headline="Everything you need to grow."
        subheadline="We offer comprehensive marketing services designed specifically for local businesses. No cookie-cutter solutions—just strategies that work for your unique business."
      />

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <Section
          key={service.id}
          id={service.id}
          background={index % 2 === 0 ? 'white' : 'offwhite'}
          padding="lg"
        >
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeUp className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-16 h-16 bg-offwhite rounded-2xl flex items-center justify-center mb-6">
                  {iconMap[service.icon] || <Palette className="w-8 h-8 text-pink" />}
                </div>
                <h2 className="text-h2 text-black mb-4">{service.title}</h2>
                <p className="text-body-lg text-slate mb-8">{service.fullDescription}</p>
                <FeatureList items={service.features} />
              </FadeUp>
              <FadeUp delay={0.2} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="aspect-[4/3] bg-lightgray rounded-2xl overflow-hidden">
                  {/* Placeholder for service image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-slate">Service Image</span>
                  </div>
                </div>
              </FadeUp>
            </div>
          </Container>
        </Section>
      ))}

      {/* Pricing Teaser */}
      <Section background="black" padding="lg">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <SectionHeader
                overline="Pricing"
                headline="Transparent pricing, no surprises."
                description="Every business is different, so we create custom packages based on your specific needs and goals. Here's what you can expect:"
                centered
                dark
              />
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <StaggerItem>
                  <div className="text-center">
                    <div className="text-h3 text-pink mb-2">$1,500+</div>
                    <div className="text-body text-white">Monthly Retainers</div>
                    <div className="text-body-sm text-slate mt-2">Ongoing marketing support</div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="text-center">
                    <div className="text-h3 text-pink mb-2">$3,000+</div>
                    <div className="text-body text-white">Brand Packages</div>
                    <div className="text-body-sm text-slate mt-2">Complete brand identity</div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="text-center">
                    <div className="text-h3 text-pink mb-2">$5,000+</div>
                    <div className="text-body text-white">Website Projects</div>
                    <div className="text-body-sm text-slate mt-2">Custom web design</div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
              <p className="text-body text-slate mt-12">
                All packages are customized to your needs. Book a call to get a personalized quote.
              </p>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* FAQ */}
      <FAQSection
        overline="Questions?"
        headline="We've got answers."
        faqs={faqItems}
      />

      {/* CTA */}
      <CTABlock
        headline="Let's talk about your goals."
        description="Book a free strategy call and we'll create a custom plan for your business."
        primaryCta={{ label: "Book Your Free Call", href: "/contact" }}
      />
    </>
  );
}
