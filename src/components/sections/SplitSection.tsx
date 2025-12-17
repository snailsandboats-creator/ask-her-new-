'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { FeatureList } from '@/components/shared/FeatureList';
import { Aurora } from '@/components/ui/Aurora';
import { cn } from '@/lib/utils';

interface SplitSectionProps {
  image: { src: string; alt: string };
  imagePosition: 'left' | 'right';
  overline?: string;
  headline: string;
  body?: string;
  cta?: { label: string; href: string };
  features?: string[];
  background?: 'white' | 'offwhite';
  id?: string;
}

const slideFromLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

const slideFromRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

export function SplitSection({
  image,
  imagePosition,
  overline,
  headline,
  body,
  cta,
  features,
  background = 'white',
  id,
}: SplitSectionProps) {
  const imageVariants = imagePosition === 'left' ? slideFromLeftVariants : slideFromRightVariants;
  const contentVariants = imagePosition === 'left' ? slideFromRightVariants : slideFromLeftVariants;

  return (
    <Section background={background} padding="md" id={id}>
      <Container size="wide">
        <div
          className={cn(
            'grid md:grid-cols-2 gap-12 lg:gap-16 items-center',
            imagePosition === 'right' && 'md:[&>*:first-child]:order-2'
          )}
        >
          {/* Aurora Background */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={imageVariants}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-visible relative flex items-center justify-center">
              {/* Aurora - positioned at center */}
              <div
                className="absolute left-1/2 top-1/2 w-[484px] h-[484px] lg:w-[440px] lg:h-[440px] pointer-events-none -translate-y-1/2 -translate-x-1/2"
                style={{ zIndex: 0 }}
              >
                <Aurora
                  mainColor="#a855f7"
                  opacity={0.7}
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={contentVariants}
          >
            <h2 className="text-h2 text-white mb-6">{headline}</h2>
            {body && <p className="text-body-lg text-slate mb-6">{body}</p>}
            {features && <FeatureList items={features} className="mb-6" />}
            {cta && (
              <Button variant="primary" href={cta.href}>
                {cta.label}
              </Button>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
