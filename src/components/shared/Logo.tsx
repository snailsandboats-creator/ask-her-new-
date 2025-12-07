import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        {/* Speech bubble icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M16 4C9.373 4 4 8.373 4 13.5C4 16.12 5.329 18.467 7.5 20.118V26L12.618 22.642C13.712 22.874 14.843 23 16 23C22.627 23 28 18.627 28 13.5C28 8.373 22.627 4 16 4Z"
            fill="#FF1E9B"
          />
          <circle cx="11" cy="13.5" r="1.5" fill="white" />
          <circle cx="16" cy="13.5" r="1.5" fill="white" />
          <circle cx="21" cy="13.5" r="1.5" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            'text-lg font-bold leading-tight tracking-tight',
            variant === 'dark' ? 'text-black' : 'text-white'
          )}
        >
          Ask Her
        </span>
        <span
          className={cn(
            'text-xs tracking-wide',
            variant === 'dark' ? 'text-slate' : 'text-slate'
          )}
        >
          MARKETING GROUP
        </span>
      </div>
    </div>
  );
}
