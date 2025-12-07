'use client';

import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { PortfolioCard } from '@/components/cards/PortfolioCard';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { CTABlock } from '@/components/sections/CTABlock';
import { FadeUp } from '@/components/motion/FadeUp';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { portfolioItems } from '@/data/portfolio';
import { testimonials } from '@/data/testimonials';
import { portfolioStats } from '@/data/stats';

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
            {portfolioItems.map((item) => (
              <StaggerItem key={item.id}>
                <PortfolioCard
                  client={item.client}
                  service={item.service}
                  image={item.image}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Results Stats */}
      <StatsSection
        stats={portfolioStats}
        background="black"
        overline="The Numbers"
        headline="Results that speak for themselves."
      />

      {/* Case Study Highlight */}
      <Section background="offwhite" padding="lg">
        <Container>
          <FadeUp>
            <SectionHeader
              overline="Featured Case Study"
              headline="How we helped Bloom Beauty Bar 3x their bookings."
              centered
            />
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <FadeUp delay={0.1}>
              <div className="aspect-[4/3] bg-lightgray rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-slate">Case Study Image</span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-h5 text-black mb-2">The Challenge</h3>
                  <p className="text-body text-slate">
                    Bloom Beauty Bar was struggling to stand out in a crowded market. Their social media presence was inconsistent, and they weren't converting followers into actual bookings.
                  </p>
                </div>
                <div>
                  <h3 className="text-h5 text-black mb-2">Our Solution</h3>
                  <p className="text-body text-slate">
                    We developed a cohesive brand identity, created a content strategy focused on before/after transformations, and implemented a booking-focused social media campaign.
                  </p>
                </div>
                <div>
                  <h3 className="text-h5 text-black mb-2">The Results</h3>
                  <p className="text-body text-slate">
                    Within 90 days, Bloom Beauty Bar saw a 3x increase in online bookings, 200% growth in Instagram followers, and became the top-rated beauty bar in their area.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section background="white" padding="lg">
        <Container>
          <FadeUp>
            <SectionHeader
              overline="Client Love"
              headline="What our clients say."
              centered
            />
          </FadeUp>
          <div className="mt-12">
            <TestimonialSlider testimonials={testimonials} />
          </div>
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
