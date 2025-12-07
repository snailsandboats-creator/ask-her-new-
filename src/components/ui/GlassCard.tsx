'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      className={cn(
        'relative overflow-hidden rounded-3xl',
        'border border-[var(--glass-border)]',
        'bg-[var(--glass-surface)]',
        'backdrop-blur-2xl',
        'shadow-2xl shadow-black/40',
        'hover:border-white/10 hover:bg-white/[0.05]',
        'transition-colors duration-500',
        className
      )}
    >
      {/* Subtle gradient glow on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-pink/5 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
