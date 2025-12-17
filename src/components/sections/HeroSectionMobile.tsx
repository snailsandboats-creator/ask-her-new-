'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroSectionMobileProps {
  overline: string;
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

// === DYNAMIC WORDS ===
const DYNAMIC_WORDS = ['MARKETING', 'STRATEGY', 'PRESENCE', 'GROWTH', 'CONTENT', 'ANYTHING'];

// Word to route mapping
const WORD_ROUTES: Record<string, string> = {
  'MARKETING': '/services',
  'STRATEGY': '/about',
  'PRESENCE': '/services',
  'GROWTH': '/services',
  'CONTENT': '/services#content',
  'ANYTHING': '/contact',
};

// === SPLOTCHY PINK GRADIENT FOR "ASK HER" ===
const askHerGradientStyle = {
  background: `
    radial-gradient(ellipse 60% 50% at 25% 30%, rgba(255, 46, 147, 0.95) 0%, transparent 55%),
    radial-gradient(ellipse 50% 60% at 75% 70%, rgba(255, 182, 193, 0.9) 0%, transparent 50%),
    radial-gradient(ellipse 45% 40% at 60% 25%, rgba(253, 224, 71, 0.85) 0%, transparent 50%),
    radial-gradient(ellipse 55% 45% at 35% 75%, rgba(253, 164, 175, 0.9) 0%, transparent 55%),
    radial-gradient(ellipse 35% 35% at 80% 40%, rgba(147, 197, 253, 0.5) 0%, transparent 50%),
    radial-gradient(ellipse 30% 30% at 15% 55%, rgba(110, 231, 183, 0.45) 0%, transparent 50%),
    radial-gradient(ellipse 40% 35% at 50% 50%, rgba(255, 255, 255, 0.7) 0%, transparent 45%),
    linear-gradient(135deg, #FF2E93 0%, #C91C6F 50%, #FF2E93 100%)
  `,
  backgroundSize: '150% 150%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'splotch-drift 8s ease-in-out infinite',
  filter: 'drop-shadow(0 0 25px rgba(255,46,147,0.5))',
};

// === ANIMATION VARIANTS ===
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

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

// === MAIN MOBILE COMPONENT ===
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

export function HeroSectionMobile({
  overline,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroSectionMobileProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [autoFocusProgress, setAutoFocusProgress] = useState(0);

  // Generate particles on client
  useEffect(() => {
    setParticles(generateParticles(30));
  }, []);

  // Rotate words every 6 seconds (longer to match slower transitions)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-unblur buttons over 5.5 seconds on page load
  useEffect(() => {
    const duration = 5500; // 5.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAutoFocusProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Detect scroll and unblur buttons
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] bg-[#080808]"
      style={{
        width: '100vw',
        maxWidth: '100vw',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >

      {/* === GRAIN TEXTURE OVERLAY === */}
      <div
        className="absolute inset-0 z-[50] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* === FLOATING PARTICLES === */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-[0.08] animate-float-drift"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* === LOWER HALF GRID (Fades to black at top) === */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to top, transparent 0%, #080808 60%, #080808 100%),
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 0 0, 0 0',
        }}
      />

      {/* === CENTERED CONTENT === */}
      <div
        className="relative z-20 min-h-[100dvh] flex flex-col justify-center items-center py-16"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          margin: 0,
          padding: '4rem 0',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
          style={{
            width: '100%',
            maxWidth: '100%',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            boxSizing: 'border-box',
          }}
        >

          {/* === EYEBROW TEXT === */}
          <motion.div
            variants={itemVariants}
            className="text-white/50 font-light uppercase w-full"
            style={{
              letterSpacing: '0.25em',
              fontSize: 'clamp(0.875rem, 3.5vw, 1.25rem)',
              textAlign: 'center',
              display: 'block',
            }}
          >
            {/* Text removed per client request */}
          </motion.div>

          {/* === MAIN HEADLINE === */}
          <motion.h1
            variants={itemVariants}
            className="font-bold tracking-tight leading-[1.1] w-full"
            style={{
              fontSize: 'clamp(2.5rem, 12vw, 4rem)',
              fontWeight: 700,
              textAlign: 'center',
              display: 'block',
            }}
          >
            <span style={askHerGradientStyle}>Ask Her</span>{' '}
            <span className="text-white">For:</span>
          </motion.h1>

          {/* === DYNAMIC WORD (THE GEM) === */}
          <div
            className="relative w-full flex items-center justify-center"
            style={{
              fontSize: 'clamp(3rem, 16vw, 6rem)',
              height: '1.5em',
            }}
          >
            <AnimatePresence mode="wait">
              <Link
                href={WORD_ROUTES[DYNAMIC_WORDS[currentWordIndex]] || '/services'}
                className="inline-block cursor-pointer"
              >
                <motion.div
                  key={currentWordIndex}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={wordVariants}
                  className="gemstone-word gem-path-1 font-bold tracking-tight"
                  style={{
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    letterSpacing: '-0.02em',
                    '--word-seed': currentWordIndex * 17,
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  } as React.CSSProperties}
                >
                  {DYNAMIC_WORDS[currentWordIndex]}
                </motion.div>
              </Link>
            </AnimatePresence>
          </div>

          {/* === CTA BUTTONS === */}
          <motion.div
            variants={itemVariants}
            className="mt-4 relative z-[100] flex flex-col items-center gap-4"
          >
            <Link
              href={primaryCTA.href}
              className="relative inline-block z-[100]"
            >
              <button
                className={`gem-button ${hasScrolled ? 'unblurred' : ''}`}
                style={{
                  filter: hasScrolled ? 'blur(0px)' : `blur(${3 * (1 - autoFocusProgress)}px)`,
                  transition: 'none',
                }}
              >
                <span>{primaryCTA.label}</span>
              </button>
            </Link>

            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="relative inline-block z-[100]"
              >
                <button
                  className={`gem-button-pink ${hasScrolled ? 'unblurred' : ''}`}
                  style={{
                    filter: hasScrolled ? 'blur(0px)' : `blur(${3 * (1 - autoFocusProgress)}px)`,
                    transition: 'none',
                  }}
                >
                  <span>{secondaryCTA.label}</span>
                </button>
              </Link>
            )}
          </motion.div>

        </motion.div>
      </div>

      {/* === SCROLL INDICATOR === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.div>

    </section>
  );
}
