'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { StatCard } from '@/components/cards/StatCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { Stat } from '@/types';

interface StatsSectionProps {
  stats: Stat[];
  variant?: 'light' | 'pink';
  background?: 'white' | 'black' | 'pink' | 'offwhite';
  overline?: string;
  headline?: string;
}

export function StatsSection({
  stats,
  variant = 'light',
  background,
  overline,
  headline,
}: StatsSectionProps) {
  const bgColor = background || (variant === 'pink' ? 'pink' : 'white');
  const isDark = bgColor === 'black';
  const statVariant = isDark || bgColor === 'pink' ? 'light' : 'default';

  return (
    <Section background={bgColor} padding="lg" className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {isDark && (
          <>
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(255,30,155,0.5) 0%, transparent 70%)',
              }}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(255,110,199,0.5) 0%, transparent 70%)',
              }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </>
        )}

        {/* Subtle grid pattern */}
        {isDark && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        )}
      </div>

      <Container size="wide" className="relative z-10">
        {/* Optional header */}
        {(overline || headline) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionHeader
              overline={overline}
              headline={headline}
              centered
              dark={isDark}
            />
          </motion.div>
        )}

        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <StatCard
                value={stat.value}
                label={stat.label}
                variant={statVariant}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
