import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'narrow' | 'medium' | 'wide' | 'full';
  className?: string;
}

const sizes = {
  narrow: 'container-narrow',
  medium: 'container-medium',
  wide: 'container-wide',
  full: 'container-full',
};

export function Container({
  children,
  size = 'wide',
  className,
}: ContainerProps) {
  return (
    <div className={cn(sizes[size], className)}>
      {children}
    </div>
  );
}
