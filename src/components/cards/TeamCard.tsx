'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamCardProps {
  name: string;
  title: string;
  image: string;
}

export function TeamCard({ name, title, image }: TeamCardProps) {
  const [imageError, setImageError] = useState(false);

  // Get initials from name
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  // Get gradient class based on name hash
  const getGradientClass = (name: string) => {
    const classes = [
      'icon-gradient',
      'icon-gradient-alt',
      'card-gradient',
      'card-gradient-metallic',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % classes.length;
    return classes[index];
  };

  return (
    <motion.div
      className="text-center group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 overflow-hidden rounded-2xl relative aspect-square">
        {!imageError ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center", getGradientClass(name))}>
            <span className="text-4xl font-bold text-white/90">{initials}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-pink-tint-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3 className="text-h5 text-black group-hover:text-brand-pink transition-colors">{name}</h3>
      <p className="text-body-sm text-slate">{title}</p>
    </motion.div>
  );
}
