'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

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
  theme,
  dark,
  className,
}: SectionHeaderProps) {
  const alignment = centered ? 'center' : (align || 'center');
  const colorTheme = dark ? 'dark' : (theme || 'light');
  const isDark = colorTheme === 'dark';
  const isCentered = alignment === 'center';

  return (
    <div className={cn(isCentered ? 'text-center' : 'text-left', className)}>
      {overline && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="pink"
            className={cn(
              "mb-4 inline-block backdrop-blur-sm px-3 py-1",
              isDark ? "bg-pink/10 border border-pink/20" : "bg-pink/10"
            )}
          >
            {overline}
          </Badge>
        </motion.div>
      )}

      {headline && (
        <motion.h2
          className={cn(
            'text-h2 mb-4',
            isDark ? 'text-white' : 'text-black'
          )}
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
