'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from './HeroSection';
import { HeroSectionMobile } from './HeroSectionMobile';

interface HeroWrapperProps {
  overline: string;
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

const MOBILE_BREAKPOINT = 768;

export function HeroWrapper(props: HeroWrapperProps) {
  // Start with null to prevent hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      // Check for touch-only devices (no hover capability)
      const noHover = window.matchMedia('(hover: none)').matches;
      // Also check screen width as fallback
      const narrowScreen = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(noHover || narrowScreen);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Also listen for orientation changes on mobile
    window.addEventListener('orientationchange', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // During SSR and initial hydration, render desktop (prevents layout shift)
  // This is fine because mobile users will quickly switch to mobile view
  if (isMobile === null) {
    return <HeroSection {...props} />;
  }

  // After hydration, render the appropriate version
  return isMobile ? <HeroSectionMobile {...props} /> : <HeroSection {...props} />;
}





