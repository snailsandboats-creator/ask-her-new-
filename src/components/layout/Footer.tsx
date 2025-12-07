import Link from 'next/link';
import { Container } from './Container';
import { Logo } from '@/components/shared/Logo';
import { navLinks, siteConfig } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 md:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1: Logo & Info */}
          <div>
            <Logo variant="light" className="mb-4" />
            <p className="text-slate mb-6">
              Marketing that actually works.
            </p>
            <p className="text-slate text-sm">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            <div className="flex gap-4 mt-4 text-sm">
              <Link
                href="/privacy"
                className="text-slate hover:text-pink transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-slate hover:text-pink transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-slate hover:text-pink transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-slate">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                  className="hover:text-pink transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-pink transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <address className="not-italic">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </address>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
