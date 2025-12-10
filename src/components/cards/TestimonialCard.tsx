'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image?: string;
  featured?: boolean;
  rating?: number;
}

export function TestimonialCard({
  quote,
  name,
  title,
  image,
  featured = false,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <motion.div
      className={cn(
        "relative bg-white rounded-2xl text-center overflow-hidden group",
        featured ? "p-10 md:p-14 shadow-xl" : "p-8 md:p-12 shadow-md"
      )}
      whileHover={{ y: featured ? 0 : -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient accent on top - using hard brand class */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-pink" />

      {/* Background quote decoration */}
      <Quote
        className="absolute top-8 left-8 w-16 h-16 text-pink/5 -rotate-12"
        strokeWidth={1}
      />

      {/* Stars rating */}
      {featured && (
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
      )}

      <blockquote
        className={cn(
          "text-white italic mb-8 relative z-10",
          featured ? "text-h3 leading-relaxed" : "text-h4"
        )}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="flex items-center justify-center gap-4">
        <div className="relative">
          {/* Avatar with hard gradient class */}
          <div className="w-14 h-14 rounded-full overflow-hidden icon-gradient relative flex-shrink-0 ring-2 ring-pink/20 flex items-center justify-center">
            <span className="text-xl font-bold text-white">{name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          {/* Decorative ring */}
          <div className="absolute -inset-1 rounded-full border-2 border-pink/10 group-hover:border-pink/30 transition-colors duration-300" />
        </div>
        <div className="text-left">
          <div className="text-body font-semibold text-white">{name}</div>
          <div className="text-body-sm text-slate">{title}</div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-tint-5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
