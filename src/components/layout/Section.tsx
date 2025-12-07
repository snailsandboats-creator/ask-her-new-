import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  background?: 'white' | 'offwhite' | 'black' | 'pink';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

const backgrounds = {
  white: 'bg-white',
  offwhite: 'bg-offwhite',
  black: 'bg-black',
  pink: 'bg-pink',
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
