'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { FadeUp } from '@/components/motion/FadeUp';
import { ArrowRight } from 'lucide-react';

interface CTABlockProps {
  headline: string;
  description?: string;
  subheadline?: string; // alias for description
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  // Legacy props support
  buttonLabel?: string;
  buttonHref?: string;
  variant?: 'dark' | 'pink';
}

export function CTABlock({
  headline,
  description,
  subheadline,
  primaryCta,
  secondaryCta,
  buttonLabel,
  buttonHref,
  variant = 'dark',
}: CTABlockProps) {
  const desc = description || subheadline;
  const primaryLabel = primaryCta?.label || buttonLabel;
  const primaryHref = primaryCta?.href || buttonHref || '/contact';

  return (
    <Section
      background={variant === 'dark' ? 'black' : 'pink'}
      padding="lg"
      className="relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orb left */}
        <motion.div
          className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,30,155,0.5) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gradient orb right */}
        <motion.div
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,110,199,0.5) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Horizontal lines */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-white"
              style={{ top: `${12.5 * (i + 1)}%` }}
            />
          ))}
        </div>
      </div>

      <Container size="medium" className="relative z-10">
        <FadeUp>
          <div className="text-center">
            <motion.h2
              className="text-h2 text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {headline}
            </motion.h2>

            {desc && (
              <motion.p
                className="text-body-lg text-slate mb-10 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {desc}
              </motion.p>
            )}

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {primaryLabel && (
                <Button
                  variant={variant === 'dark' ? 'primary' : 'white'}
                  size="lg"
                  href={primaryHref}
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="shadow-pink hover:shadow-[0_0_60px_rgba(255,30,155,0.5)] transition-shadow duration-300"
                >
                  {primaryLabel}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant="ghost"
                  size="lg"
                  href={secondaryCta.href}
                  className="text-white hover:text-pink"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </motion.div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
