'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
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
  filter: 'drop-shadow(0 0 25px rgba(255,46,147,0.5))',
};

// Generate randomized particles
function generateParticles(count: number) {
  const colors = [
    'rgba(255, 46, 147, 0.4)',
    'rgba(255, 182, 193, 0.35)',
    'rgba(253, 224, 71, 0.3)',
    'rgba(147, 197, 253, 0.3)',
    'rgba(110, 231, 183, 0.25)',
    'rgba(255, 255, 255, 0.3)',
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 5,
    opacity: 0.2 + Math.random() * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4,
  }));
}

export function HeroSection({
  overline,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  // Synced mouse position from HeroVisuals
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInRightZone, setIsInRightZone] = useState(false);
  
  // Generate particles once on mount
  const particles = useMemo(() => generateParticles(18), []);
  
  // Callback to sync spotlight with lens
  const handleMousePosition = useCallback((x: number, y: number, inRightZone: boolean) => {
    setMousePos({ x, y });
    setIsInRightZone(inRightZone);
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
            filter: 'blur(3px)',
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
    <section 
      className="relative w-full min-h-[100dvh] bg-[#050505]"
      style={{ overflow: 'hidden' }}
    >
      
      {/* === Z-0: FUTURISTIC TECH GRID === */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ overflow: 'hidden' }}
      >
        {/* Primary grid - larger squares */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.025,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Secondary grid - smaller squares */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.012,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        {/* Diagonal accent lines */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.015,
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 120px,
                rgba(255,46,147,0.4) 120px,
                rgba(255,46,147,0.4) 121px
              )
            `,
          }}
        />
      </div>

      {/* === Z-2: FLOATING PARTICLES === */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
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
              opacity: isInRightZone ? 0 : particle.opacity,
              transition: 'opacity 0.3s ease',
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

      {/* === Z-5: HERO VISUALS (Macro Lens + Twin Stream) === */}
      <HeroVisuals onMousePosition={handleMousePosition} />

      {/* === Z-10: Ambient Background Effects === */}
      <div className="absolute inset-0 z-[5] pointer-events-none" style={{ overflow: 'hidden' }}>
        {/* Main gradient orb - positioned in left area */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            width: 'min(600px, 50vw)',
            height: 'min(600px, 50vw)',
            opacity: 0.2,
            background: 'radial-gradient(circle, rgba(201,28,111,0.5) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary orb */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '30%',
            left: '35%',
            width: 'min(300px, 30vw)',
            height: 'min(300px, 30vw)',
            opacity: 0.15,
            background: 'radial-gradient(circle, rgba(255,46,147,0.6) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* === Z-15: SYNCED SPOTLIGHT (follows lens, only in right zone) === */}
      <div
        className="pointer-events-none absolute inset-0 z-[15] transition-opacity duration-500"
        style={{
          background: isInRightZone 
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,46,147,0.06), transparent 40%)`
            : 'none',
          opacity: isInRightZone ? 1 : 0,
        }}
      />

      {/* === Z-20: LEFT CONTENT AREA === */}
      <div 
        className="relative z-20 w-full min-h-[100dvh] flex items-center"
      >
        <div 
          className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16 sm:py-20"
          style={{ maxWidth: 'min(650px, 55%)' }}
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
                className="backdrop-blur-md bg-[#C91C6F]/10 border border-[#FF2E93]/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[#FF2E93] text-xs sm:text-sm"
              >
                {overline}
              </Badge>
            </motion.div>

            {/* Headline - Massive, tight tracking, fully responsive */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 sm:mt-8 mb-4 sm:mb-6 font-bold leading-[0.9] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(1.75rem, 5vw + 1rem, 4.5rem)' }}
            >
              {headline.split(' ').map((word, i) => renderWord(word, i))}
            </motion.h1>

            {/* Subheadline - Responsive */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 sm:mb-10 md:mb-12 leading-relaxed"
              style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1.25rem)' }}
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
