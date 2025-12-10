'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { Testimonial } from '@/types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialSliderProps {
  overline?: string;
  headline?: string;
  testimonials: Testimonial[];
}

export function TestimonialSlider({
  overline,
  headline,
  testimonials,
}: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length, isPaused]);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <Section background="white" padding="lg" className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large quote icon */}
        <Quote
          className="absolute top-10 left-10 w-32 h-32 text-pink/5 -rotate-12"
          strokeWidth={1}
        />
        <Quote
          className="absolute bottom-10 right-10 w-24 h-24 text-pink/5 rotate-12"
          strokeWidth={1}
        />

        {/* Gradient accents */}
        <motion.div
          className="absolute -left-40 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,30,155,0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container size="wide" className="relative z-10">
        {(overline || headline) && (
          <SectionHeader
            overline={overline}
            headline={headline || ''}
            centered
            className="mb-12"
          />
        )}

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-pink hover:border-pink/50 hover:scale-110 transition-all duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-pink hover:border-pink/50 hover:scale-110 transition-all duration-300 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            >
              <TestimonialCard {...testimonials[current]} featured />
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots with progress */}
          <div className="flex justify-center items-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className="relative group"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div
                  className={cn(
                    'w-3 h-3 rounded-full transition-all duration-300',
                    current === index
                      ? 'bg-pink scale-125'
                      : 'bg-white/20 group-hover:bg-white/50'
                  )}
                />
                {/* Progress indicator for current */}
                {current === index && !isPaused && (
                  <motion.div
                    className="absolute -inset-1 border-2 border-pink rounded-full"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 5, ease: 'linear' }}
                    key={`progress-${current}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
