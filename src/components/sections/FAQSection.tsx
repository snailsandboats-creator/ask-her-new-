'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Accordion } from '@/components/ui/Accordion';
import { FadeUp } from '@/components/motion/FadeUp';
import { FAQItem } from '@/types';

interface FAQSectionProps {
  overline: string;
  headline: string;
  items?: FAQItem[];
  faqs?: FAQItem[]; // alias for items
}

export function FAQSection({ overline, headline, items, faqs }: FAQSectionProps) {
  const faqItems = items || faqs || [];

  return (
    <Section background="offwhite" padding="lg" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,30,155,0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container size="medium" className="relative z-10">
        <FadeUp>
          <SectionHeader
            overline={overline}
            headline={headline}
            centered
            className="mb-12"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-black/5"
            whileHover={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <Accordion items={faqItems} />
          </motion.div>
        </FadeUp>
      </Container>
    </Section>
  );
}
