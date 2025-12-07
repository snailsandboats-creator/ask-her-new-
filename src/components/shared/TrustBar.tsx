'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

interface TrustBarProps {
  label?: string;
}

export function TrustBar({ label = 'Trusted by local businesses' }: TrustBarProps) {
  // Placeholder logos - in production these would be actual client logos
  const placeholderLogos = [
    { name: 'Client 1' },
    { name: 'Client 2' },
    { name: 'Client 3' },
    { name: 'Client 4' },
    { name: 'Client 5' },
  ];

  return (
    <Section background="offwhite" padding="sm" className="border-y border-lightgray">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-caption text-slate text-center mb-6">
            {label}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {placeholderLogos.map((logo, index) => (
              <div
                key={index}
                className="h-8 w-24 bg-slate/20 rounded flex items-center justify-center text-xs text-slate"
              >
                {logo.name}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
