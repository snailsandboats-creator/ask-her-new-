'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight } from 'lucide-react';

interface PortfolioCardProps {
  client: string;
  service: string;
  image: string;
}

export function PortfolioCard({ client, service, image }: PortfolioCardProps) {
  const [imageError, setImageError] = useState(false);

  // Generate a gradient based on client name for variety
  const getGradient = (name: string) => {
    const gradients = [
      'from-pink via-pink-light to-purple-400',
      'from-purple-500 via-pink to-pink-light',
      'from-pink-light via-pink to-rose-500',
      'from-fuchsia-500 via-pink to-pink-light',
      'from-pink via-rose-400 to-orange-300',
      'from-violet-500 via-pink to-pink-light',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
    return gradients[index];
  };

  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image or Placeholder */}
      <div className="aspect-[4/3] overflow-hidden">
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          className="w-full h-full relative"
        >
          {!imageError ? (
            <Image
              src={image}
              alt={`${client} project`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${getGradient(client)} flex items-center justify-center`}>
              <div className="text-center text-white">
                <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-80" />
                <span className="text-lg font-medium opacity-90">{client}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Overlay */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 text-white font-medium bg-white/20 px-4 py-2 rounded-full">
          View Project <ArrowUpRight className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Info */}
      <div className="p-6 bg-white">
        <h3 className="text-h5 text-black group-hover:text-pink transition-colors">{client}</h3>
        <p className="text-body-sm text-slate">{service}</p>
      </div>
    </motion.div>
  );
}
