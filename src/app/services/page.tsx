import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';
import { ServicesPageClientMobile } from './ServicesPageClientMobile';

export const metadata: Metadata = {
  title: 'Marketing Services | Web Design, SEO & Branding — Ask Her Marketing',
  description: 'From website design to SEO and social media management, Ask Her Marketing Group handles it all for Volusia County businesses. Flexible pricing, no surprises.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Mobile version - shown on screens smaller than lg */}
      <div className="lg:hidden">
        <ServicesPageClientMobile />
      </div>

      {/* Desktop version - shown on lg screens and above */}
      <div className="hidden lg:block">
        <ServicesPageClient />
      </div>
    </>
  );
}
