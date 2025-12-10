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

// Responsive padding using viewport-relative values
const paddings = {
  sm: 'py-[clamp(3rem,6vw,4rem)]',
  md: 'py-[clamp(4rem,8vw,6rem)]',
  lg: 'py-[clamp(5rem,10vw,8rem)]',
  xl: 'py-[clamp(6rem,12vw,10rem)]',
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
      style={{ width: '100%' }}
    >
      {children}
    </section>
  );
}
