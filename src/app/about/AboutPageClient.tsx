'use client';

import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SplitSection } from '@/components/sections/SplitSection';
import { TeamCard } from '@/components/cards/TeamCard';
import { ValueCard } from '@/components/cards/ValueCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { FadeUp } from '@/components/motion/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { teamMembers } from '@/data/team';
import { values } from '@/data/values';

export function AboutPageClient() {
  return (
    <>
      <PageHero
        overline="About Us"
        headline="Marketing that feels different."
        subheadline="We're not your typical marketing agency. We're a team of strategists, creatives, and business nerds who believe local businesses deserve the same quality marketing as the big brands."
      />

      {/* Our Story */}
      <SplitSection
        overline="Our Story"
        headline="Started from frustration, built on purpose."
        body="Ask Her Marketing Group was born out of frustration. After years of watching local businesses get burned by agencies that overpromised and underdelivered, we decided to do something about it. We believe that great marketing shouldn't require a Fortune 500 budget. Every local business deserves a partner who genuinely cares about their success—not just their monthly retainer."
        image={{ src: "/images/founders.jpg", alt: "Ask Her Marketing founders" }}
        imagePosition="right"
        background="white"
      />

      {/* Values */}
      <Section background="offwhite" padding="lg">
        <Container>
          <FadeUp>
            <SectionHeader
              overline="Our Values"
              headline="What we believe in."
              centered
            />
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {values.map((value, index) => (
              <StaggerItem key={`value-${index}`}>
                <ValueCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  index={index}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Team */}
      <Section background="white" padding="lg">
        <Container>
          <FadeUp>
            <SectionHeader
              overline="The Team"
              headline="Meet the humans behind the magic."
              description="We're a small but mighty team of marketing experts who genuinely love what we do."
              centered
            />
          </FadeUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {teamMembers.map((member) => (
              <StaggerItem key={member.id}>
                <TeamCard
                  name={member.name}
                  title={member.title}
                  image={member.image}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Why Work With Us */}
      <Section background="black" padding="lg">
        <Container size="narrow">
          <FadeUp>
            <div className="text-center">
              <SectionHeader
                overline="Why Ask Her"
                headline="What makes us different."
                centered
                dark
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                <FadeUp delay={0.1}>
                  <div className="border-l-2 border-pink pl-6">
                    <h3 className="text-h5 text-white mb-2">No Long-Term Contracts</h3>
                    <p className="text-body text-slate">
                      We earn your business every month. If you're not happy, you can leave—no strings attached.
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <div className="border-l-2 border-pink pl-6">
                    <h3 className="text-h5 text-white mb-2">Strategy First</h3>
                    <p className="text-body text-slate">
                      We don't just make things pretty. Every decision is backed by strategy and data.
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <div className="border-l-2 border-pink pl-6">
                    <h3 className="text-h5 text-white mb-2">Real Humans</h3>
                    <p className="text-body text-slate">
                      No AI-generated fluff or outsourced work. Real people who know your business.
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={0.4}>
                  <div className="border-l-2 border-pink pl-6">
                    <h3 className="text-h5 text-white mb-2">Transparent Pricing</h3>
                    <p className="text-body text-slate">
                      No hidden fees or surprise charges. You'll always know exactly what you're paying for.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* CTA */}
      <CTABlock
        headline="Want to work with us?"
        description="We'd love to learn about your business and see if we're a good fit."
        primaryCta={{ label: "Book a Free Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/portfolio" }}
      />
    </>
  );
}
