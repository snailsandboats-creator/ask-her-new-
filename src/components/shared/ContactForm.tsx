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
      // Get form data
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        service: formData.get('service') as string,
        message: formData.get('message') as string,
      };

      // Submit to API
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
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-pink"
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
        <h3 className="text-h4 text-black mb-4">Thanks for reaching out!</h3>
        <p className="text-body text-slate mb-6">
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
        <Button variant="secondary" href="/portfolio">
          View Our Work
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Input
        label="Your Name"
        name="name"
        type="text"
        placeholder="John Smith"
        required
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="john@example.com"
        required
      />

      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="(555) 123-4567"
      />

      <Select
        label="What can we help you with?"
        name="service"
        options={serviceOptions}
        placeholder="Select a service..."
      />

      <Textarea
        label="Tell us about your project"
        name="message"
        placeholder="What are your goals? What challenges are you facing?"
        rows={5}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      <p className="text-caption text-slate text-center">
        By submitting this form, you agree to our privacy policy.
      </p>
    </form>
  );
}
