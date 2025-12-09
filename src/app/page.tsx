'use client';

import { HeroWrapper } from '@/components/sections/HeroWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StatsSection } from '@/components/sections/StatsSection';
import { SplitSection } from '@/components/sections/SplitSection';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTABlock } from '@/components/sections/CTABlock';
import { FadeUp } from '@/components/motion/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { homeStats } from '@/data/stats';
import { processSteps } from '@/data/process';

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Uses HeroWrapper to switch between desktop/mobile */}
      <HeroWrapper
        overline="Ask Her Marketing"
        headline="Need Help Marketing? ASK HER"
        subheadline="We Help Service-Based Businesses Get More Calls, More Clients, and More Growth—Without the Agency BS."
        primaryCTA={{ label: "Book a Free Strategy Call", href: "/contact" }}
        secondaryCTA={{ label: "See Our Work", href: "/portfolio" }}
      />

      {/* Services Preview */}
      <Section background="white" padding="lg">
        <Container>
          <FadeUp>
            <SectionHeader
              overline="What We Do"
              headline="Full-service marketing, tailored to you."
              description="From brand strategy to social media management, we handle everything so you can focus on running your business."
              centered
            />
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard
                  id={service.id}
                  icon={service.icon}
                  title={service.title}
                  description={service.shortDescription || service.description}
                  href={`/services#${service.id}`}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Stats Section */}
      <StatsSection stats={homeStats} background="black" />

      {/* Why Choose Us */}
      <SplitSection
        overline="Why Ask Her"
        headline="We're not your typical agency."
        body="We started Ask Her because we were tired of seeing local businesses get burned by marketing agencies that overpromise and underdeliver. We believe great marketing shouldn't require a Fortune 500 budget or an MBA to understand."
        image={{ src: "/images/team-working.jpg", alt: "Ask Her Marketing team collaborating" }}
        imagePosition="right"
        background="white"
        features={[
          "No long-term contracts—ever",
          "Real humans, not AI-generated fluff",
          "Strategy-first approach",
          "Transparent pricing, no surprises",
        ]}
      />

      {/* Testimonials */}
      <Section background="offwhite" padding="lg">
        <Container>
          <FadeUp>
            <SectionHeader
              overline="Client Love"
              headline="Don't take our word for it."
              centered
            />
          </FadeUp>
          <div className="mt-12">
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <ProcessSection
        overline="Our Process"
        headline="Simple, straightforward, stress-free."
        steps={processSteps}
      />

      {/* CTA Block */}
      <CTABlock
        headline="Ready to grow your business?"
        description="Let's chat about your goals and see if we're a good fit. No pressure, no obligations—just a real conversation about your business."
        primaryCta={{ label: "Book Your Free Call", href: "/contact" }}
        secondaryCta={{ label: "View Our Work", href: "/portfolio" }}
      />
    </>
  );
}
