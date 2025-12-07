'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-black">
          {label}
          {props.required && <span className="text-pink ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-4 bg-white border rounded-lg text-black resize-none',
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

Textarea.displayName = 'Textarea';
