'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'alive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const variants = {
  primary: 'bg-gradient-to-r from-pink-deep to-pink text-white hover:brightness-110 hover:shadow-[0_0_40px_rgba(255,46,147,0.4)]',
  secondary: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
  ghost: 'bg-transparent text-slate hover:text-white',
  white: 'bg-white text-black hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]',
  alive: 'btn-alive text-white', // The Living Button
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4 text-lg',
};


export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  type = 'button',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 relative overflow-hidden',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const content = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {icon && iconPosition === 'left' && !loading && icon}
      {children}
      {icon && iconPosition === 'right' && !loading && icon}
    </span>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {content}
    </motion.button>
  );
}
