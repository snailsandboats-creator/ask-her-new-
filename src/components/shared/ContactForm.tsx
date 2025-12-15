'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const serviceOptions = [
  { value: 'social', label: 'Social Media Marketing' },
  { value: 'branding', label: 'Branding & Identity' },
  { value: 'web', label: 'Web Design & Development' },
  { value: 'content', label: 'Content Marketing' },
  { value: 'other', label: 'Something Else' },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        service: formData.get('service') as string,
        message: formData.get('message') as string,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '0.75rem',
          padding: '2.5rem',
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '4rem',
            height: '4rem',
            backgroundColor: 'rgba(255, 46, 147, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <svg
            style={{ width: '2rem', height: '2rem', color: '#FF2E93' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
            fontWeight: '600',
            color: '#050505',
            marginBottom: '1rem',
            lineHeight: '1.15',
          }}
        >
          Thanks for reaching out!
        </h3>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#888888',
            marginBottom: '1.5rem',
          }}
        >
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
        <Button variant="secondary" href="/portfolio">
          View Our Work
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '0.75rem',
        padding: '2rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {error && (
        <div
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1.25rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <p style={{ fontSize: '0.875rem', color: '#dc2626', margin: 0 }}>{error}</p>
        </div>
      )}

      <div style={{ marginBottom: '1.25rem' }}>
        <Input
          label="Your Name"
          name="name"
          type="text"
          placeholder="John Smith"
          required
        />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
        />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <Select
          label="What can we help you with?"
          name="service"
          options={serviceOptions}
          placeholder="Select a service..."
        />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <Textarea
          label="Tell us about your project"
          name="message"
          placeholder="What are your goals? What challenges are you facing?"
          rows={5}
          required
        />
      </div>

      <div style={{ paddingTop: '0.5rem', marginBottom: '1rem' }}>
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          loading={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>

      <p
        style={{
          fontSize: '0.75rem',
          lineHeight: '1.4',
          color: '#888888',
          textAlign: 'center',
          width: '100%',
          margin: 0,
        }}
      >
        By submitting this form, you agree to our privacy policy.
      </p>
    </form>
  );
}
