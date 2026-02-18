'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, style, ...props }, ref) => {
    const inputId = props.id || props.name || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#050505',
          }}
        >
          {label}
          {props.required && <span style={{ color: '#FF2E93', marginLeft: '0.25rem' }}>*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            padding: '0.75rem',
            backgroundColor: '#FFFFFF',
            border: error ? '1px solid #dc2626' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            color: '#050505',
            fontSize: '0.875rem',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.2s',
            ...style,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#FF2E93';
            e.target.style.boxShadow = '0 0 0 2px rgba(255, 46, 147, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? '#dc2626' : 'rgba(255, 255, 255, 0.1)';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
        {error && (
          <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
