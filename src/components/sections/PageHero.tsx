'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  overline: string;
  headline: string;
  subheadline?: string;
  variant?: 'light' | 'dark';
  align?: 'center' | 'left';
}

// Dynamic words for the transitioning effect
const DYNAMIC_WORDS_GROW = ['Grow', 'Succeed', 'Thrive', 'Scale', 'Win'];
const DYNAMIC_WORDS_BUSINESS = ['businesses.', 'companies.', 'brands.', 'people.', 'partners.'];
const DYNAMIC_WORDS_DIFFERENT = ['different.', 'easy.', 'custom.', 'intuitive.', 'awesome.'];

// Word transition variants
const wordVariants = {
  enter: {
    opacity: 0,
    filter: 'blur(20px)',
  },
  center: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(20px)',
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

// Generate floating particles
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
  }));
}

export function PageHero({
  overline,
  headline,
  subheadline,
  variant = 'light',
  align = 'center',
}: PageHeroProps) {
  const isDark = variant === 'dark';
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);

  // Generate particles on client
  useEffect(() => {
    setParticles(generateParticles(30));
  }, []);

  // Rotate words every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Check if headline contains "grow", "business/businesses", or "different" and split it
  const hasGrow = headline.toLowerCase().includes('grow');
  const hasBusiness = headline.toLowerCase().includes('business');
  const hasDifferent = headline.toLowerCase().includes('different');
  const hasTransitionWord = hasGrow || hasBusiness || hasDifferent;
  const headlineParts = hasTransitionWord
    ? headline.split(hasGrow ? /\bgrow\b/i : hasBusiness ? /\bbusinesses?\b/i : /\bdifferent\b/i)
    : null;

  // Use the appropriate word list
  const DYNAMIC_WORDS = hasDifferent ? DYNAMIC_WORDS_DIFFERENT : hasBusiness ? DYNAMIC_WORDS_BUSINESS : DYNAMIC_WORDS_GROW;

  return (
    <Section
      background={isDark ? 'black' : 'offwhite'}
      padding="lg"
      className="pt-32 md:pt-40 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 z-[50] pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={cn(
                "absolute rounded-full animate-float-drift",
                isDark ? "bg-white opacity-[0.15]" : "bg-black opacity-[0.1]"
              )}
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size * 1.5}px`,
                height: `${particle.size * 1.5}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Fade grid */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px',
            backgroundPosition: '0 0, 0 0',
            maskImage: 'linear-gradient(to top, transparent 0%, black 40%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%, black 100%)',
          }}
        />

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
      </div>

      <Container size="medium" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          className={cn('text-center', align === 'left' && 'md:text-left')}
        >
          <motion.h1
            className="text-h1 mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {hasTransitionWord && headlineParts ? (
              <>
                {headlineParts[0]}
                <span className="inline-block relative align-baseline overflow-visible" style={{ verticalAlign: 'baseline', lineHeight: '1.2' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWordIndex}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      variants={wordVariants}
                      className="inline-block gemstone-word gem-path-1"
                      style={{
                        whiteSpace: 'nowrap',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        overflow: 'visible',
                        '--word-seed': currentWordIndex * 17,
                      } as React.CSSProperties}
                    >
                      {DYNAMIC_WORDS[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                  {/* Invisible spacer to maintain layout - use longest word from current word list */}
                  <span className="invisible">{hasDifferent ? 'intuitive.' : hasBusiness ? 'businesses.' : 'Succeed'}</span>
                </span>
              </>
            ) : (
              headline
            )}
          </motion.h1>

          {subheadline && (
            <motion.p
              className={cn(
                'text-body-lg text-slate max-w-2xl mx-auto',
                align === 'left' && 'md:mx-0'
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
