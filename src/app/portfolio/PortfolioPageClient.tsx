'use client';

import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { PortfolioCard } from '@/components/cards/PortfolioCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { portfolioItems } from '@/data/portfolio';

export function PortfolioPageClient() {
  return (
    <>
      <PageHero
        overline="Our Work"
        headline="Real results for real businesses."
        subheadline="We don't just make things look pretty—we create marketing that drives real business growth. Here's a look at what we've done for clients like you."
      />

      {/* Portfolio Grid */}
      <Section background="white" padding="lg">
        <Container size="wide">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <StaggerItem key={item.id}>
                <PortfolioCard
                  client={item.client}
                  service={item.service}
                  image={item.image}
                  index={index}
                  url={item.url}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* CTA */}
      <CTABlock
        headline="Want results like these?"
        description="Let's create something amazing for your business."
        primaryCta={{ label: "Start Your Project", href: "/contact" }}
        secondaryCta={{ label: "View Our Services", href: "/services" }}
      />
    </>
  );
}
