'use client';

import { motion } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface HeroSectionMobileProps {
  overline: string;
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

// === CONSTANTS ===
const SERVICES = ['Strategy', 'Branding', 'Social Media', 'Content Creation', 'Graphic Design', 'Growth', 'Marketing', 'Creativity'];

// Word to route mapping
const WORD_ROUTES: Record<string, string> = {
  'Strategy': '/about',
  'Branding': '/services#branding',
  'Social Media': '/portfolio',
  'Content Creation': '/services#content',
  'Graphic Design': '/services#web-design',
  'Growth': '/services',
  'Marketing': '/services',
  'Creativity': '/portfolio',
};

// === ANIMATION VARIANTS ===
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1],
    },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.5,
      delay: 0.3,
      ease: [0, 0, 0.2, 1],
    },
  },
};

// Splotchy gradient style for "ASK HER" text
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
  filter: 'drop-shadow(0 0 20px rgba(255,46,147,0.4))',
};

// === MOBILE TICKER ROW (Parallax scrolling gemstone words) ===
function MobileTickerRow({
  rowIndex,
  word,
  parallaxSpeed = 0.5,
}: {
  rowIndex: number;
  word: string;
  parallaxSpeed?: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const direction = rowIndex % 2 === 0 ? 'left' : 'right';
  const route = WORD_ROUTES[word] || '/services';

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (rowRef.current) {
            const scrolled = window.scrollY;
            // Parallax effect: each row moves at different speed
            setOffsetY(scrolled * parallaxSpeed);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxSpeed]);

  return (
    <div
      ref={rowRef}
      className="relative w-full"
      style={{ height: '24vw', minHeight: '90px' }}
    >
      {/* Parallax layer - Always visible gemstone words */}
      <div
        className={`absolute inset-0 flex w-max items-center ${direction === 'left' ? 'animate-ticker-left-slow' : 'animate-ticker-right-slow'}`}
        style={{
          willChange: 'transform',
          transform: `translate3d(0, ${-offsetY}px, 0)`,
        }}
      >
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center">
            {Array.from({ length: 4 }, (_, i) => {
              const wordSeed = (rowIndex * 17) + (i * 37);
              return (
                <Link
                  key={`${setIndex}-${i}`}
                  href={route}
                  className="inline-block"
                >
                  <span
                    className={`gemstone-word gem-path-${(wordSeed % 3) + 1}`}
                    style={{
                      fontSize: 'clamp(4rem, 24vw, 8rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      marginLeft: 'clamp(2rem, 8vw, 4rem)',
                      marginRight: 'clamp(2rem, 8vw, 4rem)',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      '--word-seed': wordSeed,
                      animationDelay: `${-(wordSeed % 6)}s`,
                    } as React.CSSProperties}
                  >
                    {word}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// === MAIN MOBILE COMPONENT ===
export function HeroSectionMobile({
  overline,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroSectionMobileProps) {
  const [maybeBlur, setMaybeBlur] = useState(1);
  const [askHerBlur, setAskHerBlur] = useState(1);
  const [tickerBlur, setTickerBlur] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;

      // "maybe you should..." unblurs faster (0-50vh scroll)
      const maybeMaxScroll = vh * 0.5; // Unblur over 50vh instead of 100vh
      const maybeFade = Math.max(0, 1 - (scrolled / maybeMaxScroll));
      setMaybeBlur(maybeFade);

      // ASK HER starts unblurring when user reaches middle of "maybe you should..." (50vh-150vh scroll)
      const askHerStartScroll = vh * 0.5; // Start at 50vh (middle of first section)
      const askHerMaxScroll = vh; // Unblur over 100vh (50vh-150vh)
      const askHerScrollProgress = Math.max(0, scrolled - askHerStartScroll);
      const askHerFade = Math.max(0, 1 - (askHerScrollProgress / askHerMaxScroll));
      setAskHerBlur(askHerFade);

      // Ticker words start unblurring earlier and faster (130vh-170vh)
      const tickerStartScroll = vh * 1.3; // Start earlier at 130vh
      const tickerMaxScroll = vh * 0.4; // Unblur over 40vh (faster)
      const tickerScrollProgress = Math.max(0, scrolled - tickerStartScroll);
      const tickerFade = Math.max(0, 1 - (tickerScrollProgress / tickerMaxScroll));
      setTickerBlur(tickerFade);
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render word with special styling
  const renderWord = (word: string, i: number) => {
    const lowerWord = word.toLowerCase();
    
    // "blurry?" gets blur effect
    if (lowerWord === 'blurry?') {
      return (
        <span
          key={i}
          style={{
            filter: 'blur(2px)',
            color: 'rgba(255, 255, 255, 0.7)',
            WebkitTextFillColor: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {word}{' '}
        </span>
      );
    }
    
    // "ASK" and "HER" get splotchy gradient
    if (lowerWord === 'ask' || lowerWord === 'her') {
      return (
        <span
          key={i}
          style={askHerGradientStyle}
        >
          {word}{' '}
        </span>
      );
    }
    
    // Default styling
    return (
      <span
        key={i}
        className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
      >
        {word}{' '}
      </span>
    );
  };

  return (
    <section className="relative w-full min-h-[395dvh] bg-[#050505]" style={{ overflow: 'visible' }}>

      {/* === BACKGROUND GRID === */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ width: '100vw', left: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.04,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* === TICKER ROWS (Large bold words - FULL WIDTH with parallax) === */}
      <div
        className="absolute z-[2] pointer-events-auto transition-all duration-700"
        style={{
          top: 'calc(300vh - 25vh)', // 25vh overlap with ASK HER section
          left: 0,
          right: 0,
          width: '100vw',
          height: '200%',
          overflow: 'visible',
          filter: `blur(${tickerBlur * 8}px)`,
        }}
      >
        {SERVICES.map((word, i) => (
          <MobileTickerRow
            key={i}
            rowIndex={i}
            word={word}
            parallaxSpeed={0.15 + (i * 0.08)}
          />
        ))}
      </div>

      {/* === SCROLL-BASED OVERLAY (Fades as user scrolls to reveal words) === */}
      <div
        className="absolute z-[5] pointer-events-none transition-opacity duration-500"
        style={{
          top: 0,
          left: 0,
          width: '100vw',
          height: '100%',
          background: `
            radial-gradient(ellipse 120% 100% at 50% 35%, transparent 0%, #050505 75%),
            linear-gradient(180deg,
              #050505 0%,
              #050505 45%,
              rgba(5,5,5,0.98) 55%,
              rgba(5,5,5,0.85) 70%,
              rgba(5,5,5,0.5) 85%,
              rgba(5,5,5,0.2) 95%,
              transparent 100%)`,
          opacity: tickerBlur,
        }}
      />


      {/* === MAIN CONTENT (Centered on screen) === */}
      <div className="relative z-[20] min-h-screen flex flex-col justify-center items-center w-full py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full text-center flex flex-col items-center max-w-xl px-6"
        >
          {/* Overline Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Badge
              variant="pink"
              className="bg-[#C91C6F]/20 border border-[#FF2E93]/30 px-3 py-1.5 text-[#FF2E93] text-xs"
            >
              {overline}
            </Badge>
          </motion.div>

          {/* Headline - Only "Need Help Marketing?" */}
          <motion.h1
            variants={headlineVariants}
            className="mt-5 font-bold leading-[1.1] tracking-[-0.02em] w-full max-w-lg mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 8vw, 3rem)' }}
          >
            {headline.includes('ASK HER') ? (
              <>
                {headline.split('ASK HER')[0].trim().split(' ').map((word, i) => renderWord(word, i))}
              </>
            ) : (
              headline.split(' ').map((word, i) => renderWord(word, i))
            )}
          </motion.h1>
        </motion.div>
      </div>

      {/* === "maybe you should..." (Full screen page, centered) === */}
      <div
        className="absolute z-[20] left-0 right-0 flex justify-center items-center px-6"
        style={{
          top: '100vh',
          height: '100vh',
          width: '100vw'
        }}
      >
        <div
          className="transition-all duration-700"
          style={{
            fontSize: 'clamp(1.75rem, 8vw, 3rem)',
            fontWeight: 700,
            filter: `blur(${maybeBlur * 12}px)`,
            opacity: 0.3 + (1 - maybeBlur) * 0.7,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            maybe you should...
          </span>
        </div>
      </div>

      {/* === ASK HER (Full screen page, centered) === */}
      <div
        className="absolute z-[20] left-0 right-0 flex justify-center items-center px-6"
        style={{
          top: '200vh',
          height: '100vh',
          width: '100vw'
        }}
      >
        <div
          className="transition-all duration-700"
          style={{
            fontSize: 'clamp(3rem, 15vw, 6rem)',
            fontWeight: 900,
            filter: `blur(${askHerBlur * 12}px)`,
            opacity: 0.3 + (1 - askHerBlur) * 0.7,
            textAlign: 'center',
            width: '100%',
          }}
        >
          {['ASK', 'HER'].map((word, i) => (
            <span key={i} style={askHerGradientStyle}>
              {word}{' '}
            </span>
          ))}
        </div>
      </div>

      {/* === Scroll Indicator === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-0.5 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

