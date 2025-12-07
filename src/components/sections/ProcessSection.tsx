'use client';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProcessCard } from '@/components/cards/ProcessCard';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { ProcessStep } from '@/types';

interface ProcessSectionProps {
  overline: string;
  headline: string;
  steps: ProcessStep[];
}

export function ProcessSection({ overline, headline, steps }: ProcessSectionProps) {
  return (
    <Section background="black" padding="lg">
      <Container size="wide">
        <SectionHeader
          overline={overline}
          headline={headline}
          align="center"
          theme="dark"
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <ProcessCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
