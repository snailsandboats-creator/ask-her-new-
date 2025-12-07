'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-black">
          {label}
          {props.required && <span className="text-pink ml-1">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full px-4 py-4 bg-white border rounded-lg text-black appearance-none cursor-pointer',
              'focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20',
              'transition-all duration-200',
              error ? 'border-red-500' : 'border-lightgray',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate pointer-events-none" />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
