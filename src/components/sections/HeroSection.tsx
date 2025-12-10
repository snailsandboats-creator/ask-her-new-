'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HeroVisuals } from './HeroVisuals';

interface HeroSectionProps {
  overline: string;
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1] as [number, number, number, number],
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
  filter: 'drop-shadow(0 0 25px rgba(255,46,147,0.5))',
};

// Generate randomized particles - very light
function generateParticles(count: number) {
  const colors = [
    'rgba(255, 46, 147, 0.15)',
    'rgba(255, 182, 193, 0.12)',
    'rgba(253, 224, 71, 0.10)',
    'rgba(147, 197, 253, 0.10)',
    'rgba(110, 231, 183, 0.08)',
    'rgba(255, 255, 255, 0.12)',
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 3,
    opacity: 0.08 + Math.random() * 0.12, // Very light: 0.08-0.20
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 6,
  }));
}

// Generate floating dust particles with depth simulation - subtle but visible
// Farther = smaller + lower opacity + more blur, Closer = larger + higher opacity + sharp
function generateDust(count: number) {
  return Array.from({ length: count }, (_, i) => {
    // Random depth value 0-1 (0 = far, 1 = close)
    const depth = Math.random();
    
    // Size based on depth: far (0.08vw) to close (0.18vw) - small but visible
    const sizeVw = 0.08 + (depth * 0.10);
    
    // Opacity based on depth: far (0.06) to close (0.20) - subtle but visible
    const opacity = 0.06 + (depth * 0.14);
    
    // Blur based on depth: far particles are blurry, close ones are sharp
    const blur = (1 - depth) * 2; // 0-2px blur (far = blurry, close = sharp)
    
    // Slower animation for far particles, faster for close (depth effect)
    const duration = 15 + ((1 - depth) * 10);
    
    return {
      id: i,
      // Distribute across full width
      left: `${Math.random() * 100}vw`,
      // Scattered across full height
      top: `${Math.random() * 100}%`,
      // Staggered start times
      delay: Math.random() * 8, // Faster start
      duration,
      sizeVw,
      opacity,
      depth,
      blur,
    };
  });
}

export function HeroSection({
  overline,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  // Section ref
  const sectionRef = useRef<HTMLElement>(null);
  
  // Synced state from HeroVisuals (for spotlight AND particle eraser)
  // On desktop: follows mouse. On mobile: follows lantern position.
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInRightZone, setIsInRightZone] = useState(false);
  
  // Generate particles only on client to avoid hydration mismatch
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);
  const [dustParticles, setDustParticles] = useState<ReturnType<typeof generateDust>>([]);
  
  useEffect(() => {
    setParticles(generateParticles(12));
    setDustParticles(generateDust(80));
  }, []);
  
  // Callback to sync spotlight with lens
  const handleMousePosition = useCallback((x: number, y: number, inRightZone: boolean) => {
    setMousePos({ x, y });
    setIsInRightZone(inRightZone);
  }, []);

  // Render word with special styling
  const renderWord = (word: string, i: number) => {
    const lowerWord = word.toLowerCase();
    
    // "blurry?" gets blur effect - keep on same baseline
    if (lowerWord === 'blurry?') {
      return (
        <span
          key={i}
          style={{
            filter: 'blur(3px)',
            color: 'rgba(255, 255, 255, 0.7)',
            WebkitTextFillColor: 'rgba(255, 255, 255, 0.7)',
            display: 'inline',
            fontSize: '1.05em', // Slightly larger to compensate for blur
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
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] bg-[#050505]"
    >
      
      {/* === Z-[-1]: FUTURISTIC TECH GRID (TIGHTER 30px) === */}
      <div 
        className="absolute inset-0 z-[-1] pointer-events-none"
        style={{ overflow: 'hidden' }}
      >
        {/* Primary grid - tight technical squares */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Secondary grid - micro texture */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.035,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px',
          }}
        />
        {/* Diagonal accent lines */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.025,
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 100px,
                rgba(255,46,147,0.5) 100px,
                rgba(255,46,147,0.5) 101px
              )
            `,
          }}
        />
      </div>

      {/* === Z-[15]: LEFT GRADIENT (Desktop only) === */}
      <div 
        className="absolute top-0 left-0 z-[15] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #050505 0%, #050505 60%, rgba(5,5,5,0.98) 75%, rgba(5,5,5,0.9) 85%, rgba(5,5,5,0.5) 92%, transparent 100%)',
          width: '50vw',
          height: '100%',
        }}
      />

      {/* === Z-[16]: FLOATING DUST (above gradient, behind content) === */}
      <div
        className="absolute top-0 left-0 w-[100vw] h-full z-[16] pointer-events-none overflow-visible"
        style={{
          // Lens eraser active - uses synced position (mouse on desktop, lantern on mobile)
          maskImage: isInRightZone
            ? `radial-gradient(circle clamp(56px, 9.375vw, 300px) at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 85%, black 100%)`
            : 'none',
          WebkitMaskImage: isInRightZone
            ? `radial-gradient(circle clamp(56px, 9.375vw, 300px) at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 85%, black 100%)`
            : 'none',
        }}
      >
        {dustParticles.map((dust) => (
          <div
            key={`dust-${dust.id}`}
            className="absolute rounded-full bg-white animate-float-drift"
            style={{
              left: dust.left,
              top: dust.top,
              width: `${dust.sizeVw}vw`,
              height: `${dust.sizeVw}vw`,
              opacity: dust.opacity,
              filter: dust.blur > 0.5 ? `blur(${dust.blur}px)` : 'none',
              animationDuration: `${dust.duration}s`,
              animationDelay: `${dust.delay}s`,
            }}
          />
        ))}
      </div>

      {/* === Z-[17]: FLOATING COLOR PARTICLES (above gradient, behind content) === */}
      <div
        className="absolute inset-0 w-full h-full z-[17] pointer-events-none overflow-hidden"
        style={{
          // Lens eraser active - uses synced position (mouse on desktop, lantern on mobile)
          maskImage: isInRightZone
            ? `radial-gradient(circle clamp(56px, 9.375vw, 300px) at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 85%, black 100%)`
            : 'none',
          WebkitMaskImage: isInRightZone
            ? `radial-gradient(circle clamp(56px, 9.375vw, 300px) at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 85%, black 100%)`
            : 'none',
        }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              filter: `blur(${particle.size * 0.4}px)`,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* === Z-12: HERO VISUALS (Macro Lens + Twin Stream) === */}
      <div className="absolute inset-0 z-[12]">
        <HeroVisuals onMousePosition={handleMousePosition} />
      </div>


      {/* === Z-15: SYNCED SPOTLIGHT (follows lens, only in right zone) === */}
      {/* Spotlight size matches lens: 18.75vw capped at 600px (reduced 25%) */}
      <div
        className="pointer-events-none absolute inset-0 z-[15] transition-opacity duration-500"
        style={{
          background: isInRightZone 
            ? `radial-gradient(clamp(112px, 18.75vw, 600px) circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,46,147,0.06), transparent 40%)`
            : 'none',
          opacity: isInRightZone ? 1 : 0,
        }}
      />

      {/* === Z-20: LEFT CONTENT AREA (Desktop) === */}
      <div 
        className="relative z-20 w-full min-h-[100dvh] flex items-center pointer-events-none"
      >
        <div 
          className="py-20 pointer-events-auto w-[45vw]"
          style={{ 
            paddingLeft: 'clamp(1rem, 4vw, 6rem)',
            paddingRight: 'clamp(1rem, 2vw, 3rem)',
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Overline Badge */}
            <motion.div variants={itemVariants}>
              <Badge 
                variant="pink" 
                className="bg-[#C91C6F]/20 border border-[#FF2E93]/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[#FF2E93] text-xs sm:text-sm"
              >
                {overline}
              </Badge>
            </motion.div>

            {/* Headline - Massive, tight tracking, scales with viewport */}
            <motion.h1
              variants={itemVariants}
              className="mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-6 font-bold leading-[1.1] sm:leading-[0.95] tracking-[-0.03em] sm:tracking-[-0.04em]"
              style={{ fontSize: 'clamp(1.75rem, 5vw + 1rem, 5rem)' }}
            >
              {/* Split headline: first part wraps, "ASK HER For Clarity" stays together */}
              {headline.includes('ASK HER') ? (
                <>
                  {headline.split('ASK HER')[0].split(' ').map((word, i) => renderWord(word, i))}
                  <span className="whitespace-nowrap">
                    {['ASK', 'HER', ...headline.split('ASK HER')[1].trim().split(' ')].map((word, i) => renderWord(word, i + 100))}
                  </span>
                </>
              ) : (
                headline.split(' ').map((word, i) => renderWord(word, i))
              )}
            </motion.h1>

            {/* Subheadline - Scales with viewport */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 sm:mb-10 md:mb-12 leading-relaxed"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.5rem)' }}
            >
              {subheadline}
            </motion.p>

            {/* CTA Buttons - Living Buttons, responsive layout */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              {/* Primary: Living Button with Fountain Effect */}
              <Button
                variant="alive"
                size="lg"
                href={primaryCTA.href}
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                {primaryCTA.label}
              </Button>
              
              {/* Secondary: Ghost button */}
              {secondaryCTA && (
                <Button
                  variant="ghost"
                  size="lg"
                  href={secondaryCTA.href}
                  className="w-full sm:w-auto border border-white/20 hover:bg-white/5 hover:border-white/30 text-sm sm:text-base"
                >
                  {secondaryCTA.label}
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* === Z-30: Scroll Indicator === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 sm:w-6 h-8 sm:h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5 sm:p-2"
        >
          <motion.div className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
