import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'narrow' | 'medium' | 'wide' | 'full';
  className?: string;
}

const maxWidths: Record<string, string> = {
  narrow: '768px',
  medium: '1024px',
  wide: '1280px',
  full: '1600px',
};

export function Container({
  children,
  size = 'wide',
  className,
}: ContainerProps) {
  return (
    <div 
      className={cn('px-4 md:px-8 lg:px-12', className)}
      style={{
        maxWidth: maxWidths[size],
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {children}
    </div>
  );
}
