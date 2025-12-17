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
import { Aurora } from '@/components/ui/Aurora';
import { services } from '@/data/services';
import { faqItems } from '@/data/faq';
import { Palette, Instagram, FileText, Globe } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  palette: <Palette className="w-8 h-8 text-pink" />,
  instagram: <Instagram className="w-8 h-8 text-pink" />,
  'file-text': <FileText className="w-8 h-8 text-pink" />,
  globe: <Globe className="w-8 h-8 text-pink" />,
};

// Aurora color mapping for each service
const auroraColors: Record<string, string> = {
  'website-design': '#f43f5e',       // Rose-500 (Pink/magenta)
  'branding': '#a855f7',             // Purple-500
  'social-media': '#06b6d4',         // Cyan-500
  'content-creation': '#f59e0b',     // Amber-500 (Gold/yellow)
  'photography-video': '#f97316',    // Orange-500
  'seo-google': '#10b981',           // Emerald-500 (Green)
};

export function ServicesPageClient() {
  return (
    <>
      <PageHero
        overline="Our Services"
        headline="Everything You Need to Grow."
        subheadline="Let Us Be Your One Stop Shop for Online Presence"
      />

      {/* Services Detail Sections */}
      <div className="relative">
        {/* Connecting line - hidden on mobile, visible on desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-pink/30 to-transparent -translate-x-1/2 pointer-events-none" />

        {services.map((service, index) => (
          <div key={service.id} className="relative">
            <Section
              id={service.id}
              background="black"
              padding="lg"
              className="relative"
            >
              <Container size="wide" className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <FadeUp className={`text-center lg:text-left flex flex-col items-center lg:items-start ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                      {iconMap[service.icon] || <Palette className="w-8 h-8 text-pink" />}
                    </div>
                    <h2 className="text-h2 text-white mb-4">{service.title}</h2>
                    <p className="text-body-lg text-gray-400 mb-8">{service.fullDescription}</p>
                    <FeatureList items={service.features} />
                  </FadeUp>
                  <FadeUp delay={0.2} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="aspect-[4/3] overflow-visible relative flex items-center justify-center">
                      {/* Single Aurora - positioned at center, extends left/right alternately, moved down 10% */}
                      <div
                        className={`absolute left-1/2 w-[484px] h-[484px] lg:w-[440px] lg:h-[440px] pointer-events-none -translate-y-1/2 -translate-x-[50%] ${
                          service.id === 'seo-google' ? 'lg:-translate-x-[70%]' :
                          service.id === 'photography-video' ? 'lg:-translate-x-[35%]' :
                          service.id === 'content-creation' ? 'lg:-translate-x-[75%] lg:top-[65%]' :
                          service.id === 'social-media' ? 'lg:-translate-x-[35%]' :
                          service.id === 'branding' ? 'lg:-translate-x-[75%]' :
                          service.id === 'website-design' ? 'lg:-translate-x-[38%]' :
                          index % 2 === 0 ? 'lg:-translate-x-[50%]' : 'lg:-translate-x-[60%]'
                        } ${service.id === 'content-creation' ? 'top-[70%]' : 'top-[70%] lg:top-[60%]'}`}
                        style={{ zIndex: 0 }}
                      >
                        <Aurora
                          mainColor={auroraColors[service.id] || '#f43f5e'}
                          opacity={0.7}
                        />
                      </div>
                    </div>
                  </FadeUp>
                </div>
              </Container>
            </Section>
          </div>
        ))}
      </div>

      {/* Pricing Teaser */}
      <Section background="black" padding="lg">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <SectionHeader
                overline="Pricing"
                headline="Flexible Pricing, No Surprises."
                description="Every business is different, so we customize our pricing based on your specific needs and goals. Most of our clients invest between $1,000 - $2,500/month depending on the scope of services. We're happy to provide a free brand assessment — Call Today!"
                centered
                dark
              />
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <StaggerItem>
                  <div className="text-center">
                    <div className="text-h3 text-pink mb-2">$850+</div>
                    <div className="text-body text-white">Website Projects</div>
                    <div className="text-body-sm text-slate mt-2">Custom web design</div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="text-center">
                    <div className="text-h3 text-pink mb-2">$1,200+</div>
                    <div className="text-body text-white">Brand Packages</div>
                    <div className="text-body-sm text-slate mt-2">Complete brand identity</div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="text-center">
                    <div className="text-h3 text-pink mb-2">$2,000+</div>
                    <div className="text-body text-white">Monthly Retainers</div>
                    <div className="text-body-sm text-slate mt-2">Ongoing marketing support</div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
              <p className="text-body text-slate mt-12">
                Remember, All Packages are customized to your needs. Book a call to get your brand's assessment!
              </p>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* FAQ */}
      <FAQSection
        overline="Questions?"
        headline="We've Got Answers."
        faqs={faqItems}
      />

      {/* CTA */}
      <CTABlock
        headline="Let's Talk About Your Goals."
        description="Book a free strategy call and we'll create a custom plan for your business."
        primaryCta={{ label: "Book Your Free Call", href: "/contact" }}
      />
    </>
  );
}
