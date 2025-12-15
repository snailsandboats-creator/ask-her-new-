'use client';

import { ContactInfo } from '@/components/shared/ContactInfo';
import { ContactForm } from '@/components/shared/ContactForm';
import { siteConfig } from '@/lib/constants';

export function ContactSection({
  headline = "Ready to grow your business?",
  subheadline = "Fill out the form below and we'll get back to you within 24 hours.",
  phones = siteConfig.phones,
  emails = siteConfig.emails,
  responseTime = "We typically respond within 24 hours.",
}) {
  return (
    <section
      style={{
        width: '100%',
        maxWidth: '100%',
        backgroundColor: '#050505',
        padding: '5rem 0',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            boxSizing: 'border-box',
          }}
          className="contact-grid"
        >
          {/* Left Column: Info */}
          <div style={{ boxSizing: 'border-box' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '1rem',
                lineHeight: '1',
                letterSpacing: '-0.02em',
              }}
            >
              {headline}
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.6',
                color: '#888888',
                marginBottom: '2rem',
              }}
            >
              {subheadline}
            </p>
            <ContactInfo
              phones={phones}
              emails={emails}
              responseTime={responseTime}
            />
          </div>

          {/* Right Column: Form */}
          <div style={{ boxSizing: 'border-box' }}>
            <ContactForm />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1280px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 4rem;
          }
        }
      `}</style>
    </section>
  );
}
