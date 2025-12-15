'use client';

import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ValueCard } from '@/components/cards/ValueCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { FadeUp } from '@/components/motion/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { Aurora } from '@/components/ui/Aurora';
import { values } from '@/data/values';

export function AboutPageClient() {
  return (
    <>
      <PageHero
        overline="About Us"
        headline="Marketing that feels different."
        subheadline="We're not your typical marketing agency. We're a team of strategists, creatives, and business nerds who believe local businesses deserve the same quality marketing as the big brands."
      />

      {/* Values */}
      <Section background="offwhite" padding="md" className="relative overflow-visible">
        {/* Aurora 1 - Purple */}
        <div
          className="absolute left-[12%] top-[5%] w-[300px] h-[300px] pointer-events-none -translate-y-1/2 -translate-x-1/2"
          style={{ zIndex: 0 }}
        >
          <Aurora
            mainColor="#a855f7"
            opacity={0.6}
            blur={66}
          />
        </div>

        {/* Aurora 2 - Cyan */}
        <div
          className="absolute left-[115%] top-[105%] w-[320px] h-[320px] pointer-events-none -translate-y-1/2 -translate-x-1/2"
          style={{ zIndex: 0 }}
        >
          <Aurora
            mainColor="#06b6d4"
            opacity={0.6}
            blur={66}
          />
        </div>
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

      {/* Why Work With Us */}
      <Section background="black" padding="md" className="relative overflow-visible">
        {/* Aurora 3 - Pink */}
        <div
          className="absolute right-[45%] top-[100%] w-[340px] h-[340px] pointer-events-none -translate-y-1/2 -translate-x-1/2"
          style={{ zIndex: 0 }}
        >
          <Aurora
            mainColor="#f43f5e"
            opacity={0.5}
            blur={66}
          />
        </div>
        {/* Aurora 4 - Blue (smaller) */}
        <div
          className="absolute left-[5%] top-[80%] w-[204px] h-[204px] pointer-events-none -translate-y-1/2 -translate-x-1/2"
          style={{ zIndex: 0 }}
        >
          <Aurora
            mainColor="#06b6d4"
            opacity={0.6}
            blur={66}
          />
        </div>
        {/* Aurora 5 - Yellow (smaller, top right) */}
        <div
          className="absolute right-[-15%] top-[5%] w-[204px] h-[204px] pointer-events-none -translate-y-1/2 -translate-x-1/2"
          style={{ zIndex: 0 }}
        >
          <Aurora
            mainColor="#fde047"
            opacity={0.6}
            blur={66}
          />
        </div>
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
                    <h3 className="text-h5 text-white mb-2">Custom Content</h3>
                    <p className="text-body text-slate">
                      We offer human, AI-assisted, and hybrid content options—you pick what fits your goals and budget.
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
