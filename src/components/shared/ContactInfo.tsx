import { Phone, Mail } from 'lucide-react';

interface ContactInfoProps {
  phones: string[];
  emails: string[];
  responseTime?: string;
}

export function ContactInfo({ phones, emails, responseTime }: ContactInfoProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Phones */}
      {phones.map((phone, index) => (
        <a
          key={`phone-${index}`}
          href={`tel:${phone.replace(/[^0-9]/g, '')}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            const textElement = e.currentTarget.querySelector('.contact-text') as HTMLElement;
            if (textElement) textElement.style.color = '#FF2E93';
          }}
          onMouseLeave={(e) => {
            const textElement = e.currentTarget.querySelector('.contact-text') as HTMLElement;
            if (textElement) textElement.style.color = '#FFFFFF';
          }}
        >
          <div
            style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: '#0A0A0A',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Phone style={{ width: '1.25rem', height: '1.25rem', color: '#FF2E93' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', lineHeight: '1.5', color: '#888888' }}>
              Give us a call
            </div>
            <div
              className="contact-text"
              style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                fontWeight: '500',
                color: '#FFFFFF',
                transition: 'color 0.2s',
              }}
            >
              {phone}
            </div>
          </div>
        </a>
      ))}

      {/* Emails */}
      {emails.map((email, index) => (
        <a
          key={`email-${index}`}
          href={`mailto:${email}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            const textElement = e.currentTarget.querySelector('.contact-text') as HTMLElement;
            if (textElement) textElement.style.color = '#FF2E93';
          }}
          onMouseLeave={(e) => {
            const textElement = e.currentTarget.querySelector('.contact-text') as HTMLElement;
            if (textElement) textElement.style.color = '#FFFFFF';
          }}
        >
          <div
            style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: '#0A0A0A',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Mail style={{ width: '1.25rem', height: '1.25rem', color: '#FF2E93' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', lineHeight: '1.5', color: '#888888' }}>
              Send us an email
            </div>
            <div
              className="contact-text"
              style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                fontWeight: '500',
                color: '#FFFFFF',
                transition: 'color 0.2s',
              }}
            >
              {email}
            </div>
          </div>
        </a>
      ))}

      {responseTime && (
        <p
          style={{
            fontSize: '0.75rem',
            lineHeight: '1.4',
            color: '#888888',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            margin: 0,
          }}
        >
          {responseTime}
        </p>
      )}
    </div>
  );
}
