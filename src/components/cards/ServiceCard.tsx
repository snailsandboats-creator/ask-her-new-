'use client';

import { Megaphone, Palette, Monitor, Pencil, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { getIconGradientClass, cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  href?: string;
  index?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  megaphone: <Megaphone className="w-7 h-7" />,
  palette: <Palette className="w-7 h-7" />,
  monitor: <Monitor className="w-7 h-7" />,
  pencil: <Pencil className="w-7 h-7" />,
};

export function ServiceCard({ id, icon, title, description, href, index = 0 }: ServiceCardProps) {
  const cardHref = href || `/services#${id}`;
  
  // Get deterministic gradient class based on index
  const iconGradientClass = getIconGradientClass(index);

  return (
    <Link href={cardHref} className="block h-full group">
      <GlassCard className="p-6 md:p-8 h-full flex flex-col">
        <div className="relative z-10">
          {/* Icon container */}
          <div className="relative mb-5 md:mb-6">
            <div 
              className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110",
                iconGradientClass
              )}
            >
              {iconMap[icon] || <Megaphone className="w-6 h-6 md:w-7 md:h-7" />}
            </div>
          </div>

          <h3 className="text-h4 text-white mb-2 md:mb-3 transition-colors duration-300 flex items-center gap-2">
            {title}
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h3>

          <p className="text-body text-gray-400 flex-grow group-hover:text-gray-300 transition-colors duration-300">{description}</p>
        </div>
      </GlassCard>
    </Link>
  );
}
