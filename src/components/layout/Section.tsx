import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  background?: 'white' | 'offwhite' | 'black' | 'pink' | 'transparent' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

const backgrounds = {
  white: 'bg-white/[0.02]',
  offwhite: 'bg-white/[0.03]',
  black: 'bg-[var(--background)]',
  pink: 'bg-pink/10',
  transparent: 'bg-transparent',
  glass: 'bg-[var(--glass-surface)] backdrop-blur-xl border-y border-white/5',
};

const paddings = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
  xl: 'py-24 md:py-40',
};

export function Section({
  children,
  background = 'offwhite',
  padding = 'lg',
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(backgrounds[background], paddings[padding], className)}
    >
      {children}
    </section>
  );
}
