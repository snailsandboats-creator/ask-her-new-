'use client';

import { HeroWrapper } from '@/components/sections/HeroWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SplitSection } from '@/components/sections/SplitSection';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTABlock } from '@/components/sections/CTABlock';
import { FadeUp } from '@/components/motion/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { services } from '@/data/services';
import { processSteps } from '@/data/process';

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Uses HeroWrapper to switch between desktop/mobile */}
      <HeroWrapper
        overline="Ask Her for Anything"
        headline="Get Your Time Back."
        subheadline="A mother-son marketing agency serving Volusia County. We handle your entire digital presence so you can focus on running your business."
        primaryCTA={{ label: "Book Your Business Assessment", href: "/contact" }}
        secondaryCTA={{ label: "Why Ask Her?", href: "#why-ask-her" }}
      />

      {/* Services Preview */}
      <Section background="white" padding="lg" id="services">
        <Container>
          <FadeUp>
            <SectionHeader
              overline="What We Do"
              headline="Full-service marketing, tailored to you."
              description="From websites to social media to SEO—we handle it all so you can focus on running your business."
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

      {/* Why Choose Us */}
      <SplitSection
        headline="One Less Thing To Worry About"
        image={{ src: "/images/team-working.jpg", alt: "Ask Her Marketing team collaborating" }}
        imagePosition="right"
        background="white"
        id="why-ask-her"
        features={[
          "No contracts, cancel anytime",
          "Real humans, not a faceless agency",
          "Strategy-first approach",
          "Flexible pricing",
          "Local to Volusia, born and raised",
          "Full service — web, photo, video, social, SEO, Google, and more",
          "Flexible content options — human-made, AI-assisted, or hybrid",
          "We meet you wherever you're comfortable",
          "Family operation, decades of combined experience",
          "We give you your time back",
        ]}
      />

      {/* Process Section */}
      <ProcessSection
        overline="Our Process"
        headline="Keep it simple and stress-free."
        steps={processSteps}
      />

      {/* CTA Block */}
      <CTABlock
        headline="Let's talk about your business."
        description="Book a free business assessment and let's see how we can help. No pressure, no sales pitch—just a real conversation."
        primaryCta={{ label: "Book Your Business Assessment", href: "/contact" }}
        secondaryCta={{ label: "View Our Work", href: "/portfolio" }}
      />
    </>
  );
}
