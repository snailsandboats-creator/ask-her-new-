import { Phone, Mail } from 'lucide-react';

interface ContactInfoProps {
  phones: string[];
  emails: string[];
  responseTime?: string;
}

export function ContactInfo({ phones, emails, responseTime }: ContactInfoProps) {
  return (
    <div className="space-y-6">
      {/* Phones */}
      {phones.map((phone, index) => (
        <a
          key={`phone-${index}`}
          href={`tel:${phone.replace(/[^0-9]/g, '')}`}
          className="flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-offwhite rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-pink" />
          </div>
          <div>
            <div className="text-body-sm text-slate">Give us a call</div>
            <div className="text-body font-medium text-white group-hover:text-pink transition-colors">
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
          className="flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-offwhite rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-pink" />
          </div>
          <div>
            <div className="text-body-sm text-slate">Send us an email</div>
            <div className="text-body font-medium text-white group-hover:text-pink transition-colors">
              {email}
            </div>
          </div>
        </a>
      ))}

      {responseTime && (
        <p className="text-caption text-slate mt-8 pt-6 border-t border-lightgray">
          {responseTime}
        </p>
      )}
    </div>
  );
}
