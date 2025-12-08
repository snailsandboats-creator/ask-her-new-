'use client';

import { useEffect, useState, useCallback } from 'react';

// The services that scroll in the ticker
const SERVICES = ['Strategy', 'Branding', 'Social', 'Content', 'Design', 'Growth', 'Marketing', 'Creative'];

// The "Vast Array" gemstone gradient classes (Mint -> Pink -> White)
const GEMSTONE_GRADIENTS = [
  'from-[#5eead4] via-[#FF2E93] to-white', // Mint
  'from-[#7dd3fc] via-[#FF2E93] to-white', // Sky
  'from-[#fde047] via-[#FF2E93] to-white', // Lemon
  'from-[#d8b4fe] via-[#FF2E93] to-white', // Lavender
  'from-[#fda4af] via-[#FF2E93] to-white', // Peach
];

// Get deterministic gradient for each word instance
function getGradientClass(rowIndex: number, wordIndex: number): string {
  const index = (rowIndex * 7 + wordIndex) % GEMSTONE_GRADIENTS.length;
  return GEMSTONE_GRADIENTS[index];
}

interface HeroVisualsProps {
  onMousePosition?: (x: number, y: number, isInRightZone: boolean) => void;
}

export function HeroVisuals({ onMousePosition }: HeroVisualsProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInRightZone, setIsInRightZone] = useState(false);
  
  // Track mouse position with 1:1 tracking (no lag)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const windowWidth = window.innerWidth;
    const safeZone = windowWidth * 0.50; // Left 50% is safe zone (no lens/spotlight)
    
    // Only show lens when mouse is in right 50%
    const inRightZone = e.clientX > safeZone;
    setIsInRightZone(inRightZone);
    
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
    
    // Notify parent of mouse position for synced spotlight
    onMousePosition?.(e.clientX, e.clientY, inRightZone);
  }, [onMousePosition]);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);
  
  // Row positions - spread across full viewport height (8 rows)
  const rowPositions = ['0%', '12.5%', '25%', '37.5%', '50%', '62.5%', '75%', '87.5%'];
  const copies = 50; // Many copies for seamless scrolling
  
  return (
    <>
      {/* ============================================
          TWIN STREAM TICKER - FULL SCREEN COVERAGE
          ============================================ */}
      <div 
        className="absolute z-0 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {SERVICES.map((word, rowIndex) => {
          const direction = rowIndex % 2 === 0 ? 'left' : 'right';
          const animationClass = direction === 'left' ? 'animate-ticker-left' : 'animate-ticker-right';
          
          return (
            <div
              key={word}
              className="absolute w-[200vw] overflow-visible"
              style={{
                top: rowPositions[rowIndex],
                left: direction === 'left' ? '0' : '-100vw',
                height: '12.5%',
              }}
            >
              {/* FOG LAYER - Ghostly blurred text */}
              <div 
                className={`absolute top-0 left-0 whitespace-nowrap flex items-center h-full ${animationClass}`}
                style={{ willChange: 'transform' }}
              >
                {[...Array(copies * 2)].map((_, i) => (
                  <span
                    key={`fog-${i}`}
                    className="text-[clamp(3rem,10vh,6rem)] font-bold tracking-tighter text-white/[0.035] blur-[12px] select-none mx-8"
                  >
                    {word}
                  </span>
                ))}
              </div>
              
              {/* CLARITY LAYER - Sharp gemstone text revealed by lens */}
              <div 
                className={`absolute top-0 left-0 whitespace-nowrap flex items-center h-full ${animationClass} transition-opacity duration-300`}
                style={{ 
                  willChange: 'transform',
                  maskImage: isInRightZone 
                    ? `radial-gradient(circle 290px at ${mousePos.x}px ${mousePos.y}px, black 45%, transparent 100%)`
                    : 'none',
                  WebkitMaskImage: isInRightZone 
                    ? `radial-gradient(circle 290px at ${mousePos.x}px ${mousePos.y}px, black 45%, transparent 100%)`
                    : 'none',
                  opacity: isInRightZone ? 1 : 0,
                }}
              >
                {[...Array(copies * 2)].map((_, i) => (
                  <span
                    key={`clarity-${i}`}
                    className={`text-[clamp(3rem,10vh,6rem)] font-bold tracking-tighter select-none mx-8 bg-gradient-to-r ${getGradientClass(rowIndex, i)} bg-clip-text text-transparent`}
                    style={{ 
                      filter: 'drop-shadow(0 0 20px rgba(255,46,147,0.4))',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================
          LEFT SIDE PROTECTION - Gradient fade
          Only covers left 50% to protect text content
          ============================================ */}
      <div 
        className="absolute z-[1] pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '55%',
          height: '100%',
          background: 'linear-gradient(90deg, #050505 0%, #050505 50%, rgba(5,5,5,0.95) 70%, rgba(5,5,5,0.7) 85%, transparent 100%)',
        }}
      />

      {/* ============================================
          CRYSTAL LENS BEZEL - Only in right zone
          ============================================ */}
      <div
        className="fixed pointer-events-none z-50 transition-opacity duration-300"
        style={{
          left: mousePos.x - 145,
          top: mousePos.y - 145,
          width: 290,
          height: 290,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          background: 'transparent',
          boxShadow: `
            inset 0 0 60px rgba(255, 255, 255, 0.08),
            inset 0 0 120px rgba(255, 46, 147, 0.05),
            0 0 80px rgba(255, 46, 147, 0.15),
            0 0 120px rgba(255, 46, 147, 0.1)
          `,
          opacity: isInRightZone ? 1 : 0,
        }}
      >
        {/* Inner glow ring */}
        <div 
          className="absolute inset-3 rounded-full"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'inset 0 0 30px rgba(255, 46, 147, 0.08)',
          }}
        />
        {/* Center dot */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/30"
        />
      </div>
    </>
  );
}
