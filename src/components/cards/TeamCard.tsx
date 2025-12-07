'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface TeamCardProps {
  name: string;
  title: string;
  image: string;
}

export function TeamCard({ name, title, image }: TeamCardProps) {
  const [imageError, setImageError] = useState(false);

  // Get initials from name
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  // Generate a gradient based on name
  const getGradient = (name: string) => {
    const gradients = [
      'from-pink to-pink-light',
      'from-purple-500 to-pink',
      'from-pink-light to-rose-400',
      'from-fuchsia-500 to-pink',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
    return gradients[index];
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
          <div className={`w-full h-full bg-gradient-to-br ${getGradient(name)} flex items-center justify-center`}>
            <span className="text-4xl font-bold text-white/90">{initials}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-pink/0 group-hover:bg-pink/10 transition-colors duration-300" />
      </div>

      <h3 className="text-h5 text-black group-hover:text-pink transition-colors">{name}</h3>
      <p className="text-body-sm text-slate">{title}</p>
    </motion.div>
  );
}
