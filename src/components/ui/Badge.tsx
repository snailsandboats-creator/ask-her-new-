import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'pink', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'text-overline',
        variant === 'pink' ? 'text-pink' : 'text-slate',
        className
      )}
    >
      {children}
    </span>
  );
}
