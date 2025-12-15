'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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

const getVariantStyles = (variant: string) => {
  const baseStyles = {
    primary: {
      background: 'linear-gradient(to right, #C91C6F, #FF2E93)',
      color: '#FFFFFF',
    },
    secondary: {
      background: 'transparent',
      color: '#050505',
      border: '1px solid #050505',
    },
    ghost: {
      background: 'transparent',
      color: '#888888',
    },
    white: {
      background: '#FFFFFF',
      color: '#050505',
    },
    alive: {
      background: 'linear-gradient(135deg, #C91C6F 0%, #FF2E93 100%)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 0 30px rgba(255, 46, 147, 0.3)',
    },
  };
  return baseStyles[variant as keyof typeof baseStyles] || baseStyles.primary;
};

const getSizeStyles = (size: string) => {
  const sizes = {
    sm: { padding: '0.625rem 1.25rem', fontSize: '0.875rem' },
    md: { padding: '0.875rem 1.75rem', fontSize: '1rem' },
    lg: { padding: '1rem 2.25rem', fontSize: '1.125rem' },
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
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
  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    borderRadius: '0.75rem',
    transition: 'all 0.3s',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    pointerEvents: disabled || loading ? 'none' : 'auto',
    width: fullWidth ? '100%' : 'auto',
    border: 'none',
    textDecoration: 'none',
    ...variantStyles,
    ...sizeStyles,
  };

  const content = (
    <span
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {loading && <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />}
      {icon && iconPosition === 'left' && !loading && icon}
      {children}
      {icon && iconPosition === 'right' && !loading && icon}
    </span>
  );

  if (href && !disabled) {
    return (
      <Link href={href} style={baseStyle} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={baseStyle}
      className={className}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {content}
    </motion.button>
  );
}
