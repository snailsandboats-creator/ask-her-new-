'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-black">
          {label}
          {props.required && <span className="text-pink ml-1">*</span>}
        </label>
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-4 bg-white border rounded-lg text-black',
            'placeholder:text-slate',
            'focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20',
            'transition-all duration-200',
            error ? 'border-red-500' : 'border-lightgray',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
