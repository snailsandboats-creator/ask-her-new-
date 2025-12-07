'use client';

import { Megaphone, Palette, Monitor, Pencil, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';

interface ServiceCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  href?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  megaphone: <Megaphone className="w-7 h-7" />,
  palette: <Palette className="w-7 h-7" />,
  monitor: <Monitor className="w-7 h-7" />,
  pencil: <Pencil className="w-7 h-7" />,
};

export function ServiceCard({ id, icon, title, description, href }: ServiceCardProps) {
  const cardHref = href || `/services#${id}`;

  return (
    <Link href={cardHref} className="block h-full group">
      <GlassCard className="p-8 h-full flex flex-col">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Icon container with gradient border */}
          <div className="relative mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-pink to-pink-light rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink/30 group-hover:shadow-pink/50 transition-shadow duration-300">
              {iconMap[icon] || <Megaphone className="w-7 h-7" />}
            </div>
          </div>

          <h3 className="text-h4 text-white mb-3 group-hover:text-pink transition-colors duration-300 flex items-center gap-2">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h3>

          <p className="text-body text-gray-400 flex-grow">{description}</p>

          {/* Bottom border accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink via-pink-light to-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl" />
        </div>
      </GlassCard>
    </Link>
  );
}
