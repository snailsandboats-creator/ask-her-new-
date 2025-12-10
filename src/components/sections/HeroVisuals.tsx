'use client';

import { useRef, useEffect, memo } from 'react';
import Link from 'next/link';

// === CONSTANTS ===
const SERVICES = ['Strategy', 'Branding', 'Social Media', 'Content Creation', 'Graphic Design', 'Growth', 'Marketing', 'Creativity'];
const ROW_POSITIONS = ['0%', '12.5%', '25%', '37.5%', '50%', '62.5%', '75%', '87.5%'];
const WORDS_PER_ROW = 10; // Minimum for ultra-wide screen coverage

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

// Lens size as percentage of viewport width (18.75vw = 0.1875, reduced 25% from original)
const LENS_SIZE_VW = 0.1875;
const LENS_RADIUS_VW = LENS_SIZE_VW / 2; // 9.375vw

// This component is desktop-only. Mobile uses HeroSectionMobile.tsx

// === MEMOIZED COMPONENTS ===
const TickerRow = memo(function TickerRow({ rowIndex, type, word }: { rowIndex: number; type: 'fog' | 'clarity'; word: string }) {
  const direction = rowIndex % 2 === 0 ? 'left' : 'right';
  const route = WORD_ROUTES[word] || '/services';
  
  return (
    <div
      className="absolute"
      style={{
        top: ROW_POSITIONS[rowIndex],
        left: 0,
        width: '100%',
        height: '12.5%',
        overflow: 'visible', // Allow text to overflow for proper scaling
      }}
    >
      <div 
        className={`flex w-max ${direction === 'left' ? 'animate-ticker-left' : 'animate-ticker-right'}`}
        style={{
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
        }}
      >
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center">
            {Array.from({ length: WORDS_PER_ROW }, (_, i) => {
              const seed = (rowIndex * 17) + (i * 37);
              const content = (
                <span
                  className={`flex-shrink-0 font-bold tracking-tighter cursor-pointer hover:scale-105 transition-transform ticker-word ${type === 'clarity' ? `gemstone-word gem-path-${(seed % 3) + 1}` : ''}`}
                  style={{
                    // Desktop: original size. Mobile: uses CSS override in globals.css
                    fontSize: 'clamp(1.5rem, 6vw, 12rem)',
                    lineHeight: 1.2,
                    marginLeft: 'clamp(0.5rem, 1.5vw, 3rem)',
                    marginRight: 'clamp(0.5rem, 1.5vw, 3rem)',
                    ...(type === 'fog'
                      ? { color: 'rgba(255,255,255,0.2)', filter: 'blur(0.6vw)' }
                      : { '--word-seed': seed, animationDelay: `${-(seed % 6)}s` } as React.CSSProperties
                    ),
                  }}
                >
                  {word}
                </span>
              );
              
              // Wrap ALL words in links (both fog and clarity layers)
              return (
                <Link 
                  key={`${setIndex}-${i}`} 
                  href={route}
                  className="inline-block"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});

const FogLayer = memo(function FogLayer() {
  return <>{SERVICES.map((word, i) => <TickerRow key={i} rowIndex={i} type="fog" word={word} />)}</>;
});

const ClarityLayer = memo(function ClarityLayer() {
  return <>{SERVICES.map((word, i) => <TickerRow key={i} rowIndex={i} type="clarity" word={word} />)}</>;
});

// === MAIN COMPONENT ===
interface HeroVisualsProps {
  onMousePosition?: (x: number, y: number, isInRightZone: boolean) => void;
}

export function HeroVisuals({ onMousePosition }: HeroVisualsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const clarityRef = useRef<HTMLDivElement>(null);
  const bezelRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  
  // Cached values (reused every frame - no GC)
  const rectCache = useRef({ left: 0, top: 0, bottom: 0 });
  const mouseCache = useRef({ x: -9999, y: -9999 });
  const callback = useRef(onMousePosition);
  const frameId = useRef<number>(0);
  const lastOp = useRef(-1);
  
  useEffect(() => { callback.current = onMousePosition; }, [onMousePosition]);

  useEffect(() => {
    const rect = rectCache.current;
    const mouse = mouseCache.current;
    
    // Cache container rect (update on scroll/resize)
    const updateRect = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        rect.left = r.left;
        rect.top = r.top;
        rect.bottom = r.bottom;
      }
    };
    
    updateRect();
    window.addEventListener('scroll', updateRect, { passive: true });
    window.addEventListener('resize', updateRect, { passive: true });

    // === ZERO-GC MOUSE HANDLER ===
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // === RENDER LOOP (runs every frame, recycles all variables) ===
    const render = () => {
      const bezel = bezelRef.current;
      const fog = fogRef.current;
      const clarity = clarityRef.current;
      
      if (bezel && fog && clarity) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        // === MOUSE TRACKING ===
        const x = mouse.x;
        const y = mouse.y;
        // Calculate lens radius based on viewport width (capped for very large screens)
        const lensRadius = Math.min(w * LENS_RADIUS_VW, 300); // 9.375vw capped at 300px
        const r = lensRadius;

        // === LENS (reuse transform string pattern) ===
        bezel.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
        if (innerRingRef.current) innerRingRef.current.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
        if (glintRef.current) glintRef.current.style.transform = 'translate3d(' + (x - r * 0.3) + 'px,' + (y - r * 0.5) + 'px,0) rotate(-15deg)';

        // === MASK (inline string concat - faster than template) ===
        // Calculate container-relative positions for masks and callback
        const relX = x - rect.left;
        const relY = y - rect.top;
        const mx = relX + 'px';
        const my = relY + 'px';
        fog.style.setProperty('--mx', mx);
        fog.style.setProperty('--my', my);
        clarity.style.setProperty('--mx', mx);
        clarity.style.setProperty('--my', my);

        // === OPACITY (viewport-width locked to match layout) ===
        // All boundaries use container-relative coordinates (relX, relY)
        // Left boundary: match the 50vw gradient width (lens fades as it approaches left content)
        const LEFT_BOUNDARY = w * 0.40;  // Where lens hits 0 opacity (40% of viewport width)
        const FADE_DISTANCE = w * 0.10;   // 10vw fade zone (from 40vw to 50vw)
        
        // Bottom boundary: fade before hero bottom (15% of viewport height)
        const BOTTOM_FADE_ZONE = h * 0.15;
        
        // X-axis fade (left side) - using container-relative X
        const distFromLeft = relX - LEFT_BOUNDARY;
        const opX = distFromLeft <= 0 ? 0 : distFromLeft < FADE_DISTANCE ? distFromLeft / FADE_DISTANCE : 1;
        
        // Y-axis fade (bottom) - using viewport Y since rect.bottom is viewport-relative
        const distToBottom = rect.bottom - y;
        const opY = distToBottom <= 0 ? 0 : distToBottom < BOTTOM_FADE_ZONE ? distToBottom / BOTTOM_FADE_ZONE : 1;
        
        // Combined (lowest wins), kill if off-screen or outside container
        const op = rect.bottom < 0 || rect.top > h || relX < 0 ? 0 : (opX < opY ? opX : opY);

        // ALWAYS pass position to callback for particle eraser tracking
        // This must happen on every frame, not just when opacity changes
        callback.current?.(x, y, op > 0);

        // Only update DOM if opacity changed significantly
        if (Math.abs(op - lastOp.current) > 0.01) {
          lastOp.current = op;
          const opStr = op + '';
          
          // Lens elements
          bezel.style.opacity = opStr;
          if (innerRingRef.current) innerRingRef.current.style.opacity = opStr;
          if (glintRef.current) glintRef.current.style.opacity = opStr;
          
          // Clarity layer (reveal effect) - only clickable when visible inside lens
          clarity.style.opacity = opStr;
          clarity.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
          
          // Fog layer mask radius - shrink to 0 when fading out
          // This eliminates the "black circle" when lens disappears
          const maskRadius = (9.375 * op) + 'vw'; // 9.375vw matches lens radius
          fog.style.setProperty('--mr', maskRadius);
        }
      }

      frameId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    frameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
      cancelAnimationFrame(frameId.current);
    };
  }, []);

  // === DESKTOP MASKS: Radial lens following mouse ===
  const fogMask = `linear-gradient(to right,transparent 0%,black 25%,black 100%),radial-gradient(circle var(--mr) at var(--mx) var(--my),transparent 0%,transparent 85%,black 100%)`;
  
  const clarityMask = `linear-gradient(to right,transparent 0%,black 25%,black 100%),radial-gradient(circle clamp(56px, 9.375vw, 300px) at var(--mx) var(--my),black 0%,black 85%,transparent 100%)`;

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-[100vw] h-full overflow-hidden">
      {/* FOG - Simple flat text, blur hides detail (CHEAP) - NOT clickable */}
      <div 
        ref={fogRef}
        style={{ 
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none', // Fog words are NOT clickable - only clarity layer is
          zIndex: 10,
          '--mx': '-999px',
          '--my': '-999px',
          '--mr': '0vw',
          maskImage: fogMask,
          WebkitMaskImage: fogMask,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        } as React.CSSProperties}
      >
        <FogLayer />
      </div>

      {/* CLARITY - Full gemstone gradients (visible inside lens) - only clickable inside lens */}
      <div 
        ref={clarityRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none', // Only enabled dynamically when lens is visible
          zIndex: 20,
          opacity: 0,
          '--mx': '-999px',
          '--my': '-999px',
          maskImage: clarityMask,
          WebkitMaskImage: clarityMask,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
          transition: 'none',
        } as React.CSSProperties}
      >
        <ClarityLayer />
      </div>

      {/* LENS BEZEL - scales with viewport width (18.75vw, reduced 25%) */}
      <div 
        ref={bezelRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 'clamp(112px, 18.75vw, 600px)',
          height: 'clamp(112px, 18.75vw, 600px)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: 'inset 0 0 0.12vw rgba(255,255,255,0.9),inset 0 0 0.6vw rgba(255,255,255,0.2),0 0 0.9vw rgba(255,255,255,0.1)',
          pointerEvents: 'none',
          zIndex: 50,
          opacity: 0,
          background: 'transparent',
          transition: 'none',
          willChange: 'transform',
        }}
      />

      {/* INNER RING */}
      <div 
        ref={innerRingRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 'clamp(108px, calc(18.75vw - 0.3vw), 592px)',
          height: 'clamp(108px, calc(18.75vw - 0.3vw), 592px)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          pointerEvents: 'none',
          zIndex: 51,
          opacity: 0,
          transition: 'none',
          willChange: 'transform',
        }}
      />

      {/* GLINT */}
      <div 
        ref={glintRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 'clamp(45px, 7.5vw, 240px)',
          height: 'clamp(14px, 2.25vw, 72px)',
          borderRadius: '50%',
          background: 'linear-gradient(180deg,rgba(255,255,255,0.35) 0%,transparent 100%)',
          pointerEvents: 'none',
          zIndex: 52,
          opacity: 0,
          transition: 'none',
          willChange: 'transform',
        }}
      />

    </div>
  );
}
