'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FeatureList } from '@/components/shared/FeatureList';
import { cn } from '@/lib/utils';
import { Users, Sparkles } from 'lucide-react';

interface SplitSectionProps {
  image: { src: string; alt: string };
  imagePosition: 'left' | 'right';
  overline?: string;
  headline: string;
  body: string;
  cta?: { label: string; href: string };
  features?: string[];
  background?: 'white' | 'offwhite';
}

const slideFromLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] } },
};

const slideFromRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] } },
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
}: SplitSectionProps) {
  const [imageError, setImageError] = useState(false);
  const imageVariants = imagePosition === 'left' ? slideFromLeftVariants : slideFromRightVariants;
  const contentVariants = imagePosition === 'left' ? slideFromRightVariants : slideFromLeftVariants;

  return (
    <Section background={background} padding="lg">
      <Container size="wide">
        <div
          className={cn(
            'grid md:grid-cols-2 gap-12 lg:gap-16 items-center',
            imagePosition === 'right' && 'md:[&>*:first-child]:order-2'
          )}
        >
          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={imageVariants}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              {!imageError ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink via-pink-light to-purple-400 flex items-center justify-center relative overflow-hidden">
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="text-center text-white relative z-10">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <span className="text-lg font-medium opacity-90">{image.alt}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={contentVariants}
          >
            {overline && (
              <Badge variant="pink" className="mb-4 bg-pink/10 backdrop-blur-sm">
                {overline}
              </Badge>
            )}
            <h2 className="text-h2 text-black mb-6">{headline}</h2>
            <p className="text-body-lg text-slate mb-6">{body}</p>
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
