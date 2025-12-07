import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactInfoProps {
  phone: string;
  email: string;
  address: string[];
  responseTime?: string;
}

export function ContactInfo({ phone, email, address, responseTime }: ContactInfoProps) {
  return (
    <div className="space-y-6">
      {/* Phone */}
      <a
        href={`tel:${phone.replace(/[^0-9]/g, '')}`}
        className="flex items-center gap-4 group"
      >
        <div className="w-12 h-12 bg-offwhite rounded-lg flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 text-pink" />
        </div>
        <div>
          <div className="text-body-sm text-slate">Give us a call</div>
          <div className="text-body font-medium text-black group-hover:text-pink transition-colors">
            {phone}
          </div>
        </div>
      </a>

      {/* Email */}
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-4 group"
      >
        <div className="w-12 h-12 bg-offwhite rounded-lg flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-pink" />
        </div>
        <div>
          <div className="text-body-sm text-slate">Send us an email</div>
          <div className="text-body font-medium text-black group-hover:text-pink transition-colors">
            {email}
          </div>
        </div>
      </a>

      {/* Address */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-offwhite rounded-lg flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-pink" />
        </div>
        <div>
          <div className="text-body-sm text-slate">Visit us</div>
          {address.map((line, index) => (
            <div key={index} className="text-body text-black">
              {line}
            </div>
          ))}
        </div>
      </div>

      {responseTime && (
        <p className="text-caption text-slate mt-8 pt-6 border-t border-lightgray">
          {responseTime}
        </p>
      )}
    </div>
  );
}
