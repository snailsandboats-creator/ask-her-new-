import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureListProps {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}

export function FeatureList({ items, columns = 1, className }: FeatureListProps) {
  return (
    <ul
      className={cn(
        'space-y-3',
        columns === 2 && 'md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0 md:gap-y-3',
        className
      )}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <Check className="w-5 h-5 text-pink mt-0.5 flex-shrink-0" />
          <span className="text-body text-gray-400">{item}</span>
        </li>
      ))}
    </ul>
  );
}
