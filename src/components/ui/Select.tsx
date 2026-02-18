'use client';

import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, style, ...props }, ref) => {
    const selectId = props.id || props.name || label.toLowerCase().replace(/\s+/g, '-');
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
          htmlFor={selectId}
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
        <div style={{ position: 'relative', width: '100%', maxWidth: '100%' }}>
          <select
            ref={ref}
            id={selectId}
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
              appearance: 'none',
              cursor: 'pointer',
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
          <ChevronDown
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1.25rem',
              height: '1.25rem',
              color: '#888888',
              pointerEvents: 'none',
            }}
          />
        </div>
        {error && (
          <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
