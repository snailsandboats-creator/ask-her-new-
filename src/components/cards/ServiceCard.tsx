'use client';

import { motion } from 'framer-motion';
import { Megaphone, Palette, Monitor, Pencil, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        className="relative bg-white rounded-2xl p-8 h-full flex flex-col overflow-hidden border border-transparent hover:border-pink/20 transition-colors duration-300"
      >
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Icon container with gradient border */}
          <div className="relative mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-pink to-pink-light rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink/20 group-hover:shadow-pink/40 transition-shadow duration-300">
              {iconMap[icon] || <Megaphone className="w-7 h-7" />}
            </div>
          </div>

          <h3 className="text-h4 text-black mb-3 group-hover:text-pink transition-colors duration-300 flex items-center gap-2">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h3>

          <p className="text-body text-slate flex-grow">{description}</p>

          {/* Bottom border accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink via-pink-light to-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>
    </Link>
  );
}
