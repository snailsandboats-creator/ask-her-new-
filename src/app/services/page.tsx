import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';
import { ServicesPageClientMobile } from './ServicesPageClientMobile';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-service marketing solutions for local businesses. Brand strategy, social media management, content creation, and website design.',
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
