'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  variant?: 'default' | 'light';
}

export function StatCard({ value, label, variant = 'default' }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and suffix (e.g., "150+" -> 150, "+")
    const numericMatch = value.match(/[\d.]+/);
    const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
    const prefix = value.match(/^[^\d]*/)?.[0] || '';
    const suffix = value.match(/[^\d]*$/)?.[0] || '';

    if (numericValue === 0) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const displayNum = numericValue >= 100
          ? Math.floor(current)
          : current.toFixed(1);
        setDisplayValue(`${prefix}${displayNum}${suffix}`);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const isLight = variant === 'light';

  return (
    <motion.div
      ref={ref}
      className="text-center relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect behind the number */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500",
          isLight ? "bg-white" : "bg-pink"
        )}
      />

      <motion.div
        className={cn(
          'text-display mb-2 relative font-bold',
          isLight ? 'text-white' : 'text-pink'
        )}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Gradient text effect for non-light variant */}
        <span
          className={cn(
            isLight
              ? ''
              : 'bg-gradient-to-r from-pink via-pink-light to-pink bg-clip-text text-transparent'
          )}
        >
          {displayValue}
        </span>
      </motion.div>

      <motion.div
        className={cn(
          'text-body relative',
          isLight ? 'text-white/80' : 'text-slate'
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {label}
      </motion.div>

      {/* Decorative underline */}
      <motion.div
        className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 rounded-full",
          isLight ? "bg-white/30" : "bg-pink/30"
        )}
        initial={{ width: 0 }}
        animate={isInView ? { width: '40%' } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
    </motion.div>
  );
}
