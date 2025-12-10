'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  overline: string;
  headline: string;
  subheadline?: string;
  variant?: 'light' | 'dark';
  align?: 'center' | 'left';
}

export function PageHero({
  overline,
  headline,
  subheadline,
  variant = 'light',
  align = 'center',
}: PageHeroProps) {
  const isDark = variant === 'dark';

  return (
    <Section
      background={isDark ? 'black' : 'offwhite'}
      padding="lg"
      className="pt-32 md:pt-40 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient accent */}
        <motion.div
          className={cn(
            "absolute w-[600px] h-[600px] rounded-full opacity-10",
            align === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-0 right-0 translate-x-1/4 -translate-y-1/4'
          )}
          style={{
            background: 'radial-gradient(circle, rgba(255,30,155,0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Decorative dots pattern */}
        {!isDark && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        )}

        {/* Gradient mesh for dark variant */}
        {isDark && (
          <>
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(255,110,199,0.5) 0%, transparent 70%)',
              }}
              animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      <Container size="medium" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className={cn(align === 'center' ? 'text-center' : 'text-left')}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge
              variant="pink"
              className={cn(
                "mb-6 backdrop-blur-sm px-4 py-2",
                isDark ? "bg-pink/10 border border-pink/20" : "bg-pink/10"
              )}
            >
              {overline}
            </Badge>
          </motion.div>

          <motion.h1
            className="text-h1 mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {headline}
          </motion.h1>

          {subheadline && (
            <motion.p
              className={cn(
                'text-body-lg text-slate max-w-2xl',
                align === 'center' && 'mx-auto'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {subheadline}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
