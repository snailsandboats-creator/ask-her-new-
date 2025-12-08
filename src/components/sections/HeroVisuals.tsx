'use client';

import { useRef, useEffect, memo } from 'react';

// === CONSTANTS ===
const SERVICES = ['Strategy', 'Branding', 'Social', 'Content', 'Design', 'Growth', 'Marketing', 'Creative'];
const ROW_POSITIONS = ['0%', '12.5%', '25%', '37.5%', '50%', '62.5%', '75%', '87.5%'];
const WORDS_PER_ROW = 10; // Minimum for ultra-wide screen coverage
const LENS_SIZE_VMIN = 35;
const LENS_RADIUS_VMIN = LENS_SIZE_VMIN / 2;

// 4K growth cap: 1vmin at 2160px height = 21.6px
const VMIN_CAP = 21.6;

// === MEMOIZED COMPONENTS ===
const TickerRow = memo(function TickerRow({ rowIndex, type, word }: { rowIndex: number; type: 'fog' | 'clarity'; word: string }) {
  const direction = rowIndex % 2 === 0 ? 'left' : 'right';
  
  return (
    <div
      className="absolute"
      style={{
        top: ROW_POSITIONS[rowIndex],
        left: 0,
        width: '100%',
        height: '12.5%',
        overflow: 'hidden',
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
              return (
                <span
                  key={`${setIndex}-${i}`}
                  className={`flex-shrink-0 font-bold tracking-tighter select-none ${type === 'clarity' ? `gemstone-word gem-path-${(seed % 3) + 1}` : ''}`}
                  style={{
                    fontSize: 'clamp(0px, 11vmin, 238px)',
                    lineHeight: 1.1,
                    marginLeft: 'clamp(0px, 2vmin, 43px)',
                    marginRight: 'clamp(0px, 2vmin, 43px)',
                    ...(type === 'fog'
                      ? { color: 'rgba(255,255,255,0.2)', filter: 'blur(1vmin)' }
                      : { '--word-seed': seed, animationDelay: `${-(seed % 6)}s` } as React.CSSProperties
                    ),
                  }}
                >
                  {word}
                </span>
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
        const x = mouse.x;
        const y = mouse.y;
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Calculate vmin, but CAP it at 21.6px (the 4K equivalent)
        const rawVmin = Math.min(w, h) / 100;
        const vmin = Math.min(rawVmin, VMIN_CAP);
        const r = vmin * LENS_RADIUS_VMIN;

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

        // === OPACITY (vmin-locked to match layout, using capped vmin) ===
        // All boundaries use container-relative coordinates (relX, relY)
        // Left boundary: match the 75vmin gradient width
        const LEFT_BOUNDARY = 65 * vmin;  // Where lens hits 0 opacity (relative to container)
        const FADE_DISTANCE = 10 * vmin;   // 10vmin fade zone (from 65vmin to 75vmin)
        
        // Bottom boundary: fade before hero bottom
        const BOTTOM_FADE_ZONE = 15 * vmin;
        
        // X-axis fade (left side) - using container-relative X
        const distFromLeft = relX - LEFT_BOUNDARY;
        const opX = distFromLeft <= 0 ? 0 : distFromLeft < FADE_DISTANCE ? distFromLeft / FADE_DISTANCE : 1;
        
        // Y-axis fade (bottom) - using viewport Y since rect.bottom is viewport-relative
        const distToBottom = rect.bottom - y;
        const opY = distToBottom <= 0 ? 0 : distToBottom < BOTTOM_FADE_ZONE ? distToBottom / BOTTOM_FADE_ZONE : 1;
        
        // Combined (lowest wins), kill if off-screen or outside container
        const op = rect.bottom < 0 || rect.top > h || relX < 0 ? 0 : (opX < opY ? opX : opY);

        // Only update DOM if opacity changed significantly
        if (Math.abs(op - lastOp.current) > 0.01) {
          lastOp.current = op;
          const opStr = op + '';
          
          // Lens elements
          bezel.style.opacity = opStr;
          if (innerRingRef.current) innerRingRef.current.style.opacity = opStr;
          if (glintRef.current) glintRef.current.style.opacity = opStr;
          
          // Clarity layer (reveal effect)
          clarity.style.opacity = opStr;
          
          // Fog layer mask radius - shrink to 0 when fading out
          // This eliminates the "black circle" when lens disappears
          const maskRadius = (LENS_RADIUS_VMIN * op) + 'vmin';
          fog.style.setProperty('--mr', maskRadius);
          
          // Pass container-relative coordinates for spotlight/particle alignment
          callback.current?.(relX, relY, op > 0);
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

  // Fog mask uses --mr (dynamic radius that shrinks to 0 when fading)
  // Clarity mask uses clamped radius to cap at 4K (17.5vmin → 378px max)
  const fogMask = `linear-gradient(to right,transparent 0%,black 25%,black 100%),radial-gradient(circle var(--mr) at var(--mx) var(--my),transparent 0%,transparent 98%,black 100%)`;
  const clarityMask = `linear-gradient(to right,transparent 0%,black 25%,black 100%),radial-gradient(circle clamp(0px, ${LENS_RADIUS_VMIN}vmin, 378px) at var(--mx) var(--my),black 0%,black 98%,transparent 100%)`;

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-[100vw] h-full">
      {/* FOG - Simple flat text, blur hides detail (CHEAP) */}
      <div 
        ref={fogRef}
        style={{ 
          position: 'absolute',
          inset: 0,
          width: '100vw',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
          '--mx': '-999px',
          '--my': '-999px',
          '--mr': '0vmin',
          maskImage: fogMask,
          WebkitMaskImage: fogMask,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        } as React.CSSProperties}
      >
        <FogLayer />
      </div>

      {/* CLARITY - Full gemstone gradients (visible inside lens) */}
      <div 
        ref={clarityRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 5,
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

      {/* LENS BEZEL */}
      <div 
        ref={bezelRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 'clamp(0px, 35vmin, 756px)',
          height: 'clamp(0px, 35vmin, 756px)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: 'inset 0 0 0.2vmin rgba(255,255,255,0.9),inset 0 0 1vmin rgba(255,255,255,0.2),0 0 1.5vmin rgba(255,255,255,0.1)',
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
          width: 'clamp(0px, calc(35vmin - 0.5vmin), 745px)',
          height: 'clamp(0px, calc(35vmin - 0.5vmin), 745px)',
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
          width: 'clamp(0px, 14vmin, 302px)',
          height: 'clamp(0px, 4.2vmin, 91px)',
          borderRadius: '50%',
          background: 'linear-gradient(180deg,rgba(255,255,255,0.35) 0%,transparent 100%)',
          pointerEvents: 'none',
          zIndex: 52,
          opacity: 0,
          transition: 'none',
          willChange: 'transform',
        }}
      />

      {/* LEFT PROTECTION - vmin locked to match text scaling, capped at 4K */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 'clamp(0px, 75vmin, 1620px)', height: '100%',
          background: 'linear-gradient(90deg, #050505 0%, #050505 40%, rgba(5,5,5,0.95) 60%, rgba(5,5,5,0.7) 80%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}
