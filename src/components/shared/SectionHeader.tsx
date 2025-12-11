'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  overline?: string;
  headline?: string;
  description?: string;
  align?: 'center' | 'left';
  centered?: boolean; // alias for align="center"
  theme?: 'light' | 'dark';
  dark?: boolean; // alias for theme="dark"
  className?: string;
}

export function SectionHeader({
  overline,
  headline,
  description,
  align,
  centered,
  className,
}: SectionHeaderProps) {
  const alignment = centered ? 'center' : (align || 'center');
  const isCentered = alignment === 'center';

  return (
    <div className={cn(isCentered ? 'text-center' : 'text-left', className)}>
      {headline && (
        <motion.h2
          className="text-h2 mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {headline}
        </motion.h2>
      )}

      {description && (
        <motion.p
          className={cn(
            'text-body-lg max-w-2xl text-slate',
            isCentered && 'mx-auto'
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
