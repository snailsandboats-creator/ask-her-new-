import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Icon gradient classes for service cards - splotchy gemstone gradients
const iconGradients = [
  'icon-gradient',
  'icon-gradient-alt',
  'icon-gradient-lemon',
  'icon-gradient-peach',
  'icon-gradient-cyan',
  'icon-gradient-violet',
];

export function getIconGradientClass(index: number): string {
  return iconGradients[index % iconGradients.length];
}
