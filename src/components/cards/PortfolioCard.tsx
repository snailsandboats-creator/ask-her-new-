'use client';

import { useState } from 'react';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import { getIconGradientClass, cn } from '@/lib/utils';

interface PortfolioCardProps {
  client: string;
  service: string;
  image: string;
  index?: number;
  url?: string;
}

export function PortfolioCard({ client, service, image, index = 0, url }: PortfolioCardProps) {
  const [imageError, setImageError] = useState(false);
  const gradientClass = getIconGradientClass(index);

  const cardContent = (
    <div className="group relative cursor-pointer transition-all duration-300">
      {/* Thumbnail Container - Fixed height with proper image fitting */}
      <div className="w-full h-[350px] p-4">
        <img
          src={image}
          alt={`${client} portfolio thumbnail`}
          className="w-[400px] aspect-video object-contain"
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className={cn("w-full h-full flex items-center justify-center", gradientClass)}>
            <div className="text-center text-white">
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-80" />
              <span className="text-lg font-medium opacity-90">{client}</span>
            </div>
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
        <div className="flex items-center gap-2 text-white font-medium bg-white/20 px-4 py-2 rounded-full">
          View Project <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10 text-center">
        <h3 className="text-xl font-semibold text-white group-hover:text-pink-500 transition-colors">{client}</h3>
        <p className="text-sm text-gray-300">{service}</p>
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
