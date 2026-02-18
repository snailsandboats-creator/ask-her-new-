'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks, siteConfig } from '@/lib/constants';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // On non-home pages, navbar is always visible
    const isHomePage = pathname === '/';

    if (!isHomePage) {
      setNavOpacity(1);
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // On home page, use scroll-based fade
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;

      setIsScrolled(scrolled > 50);

      // Fade in navbar as user scrolls through hero section
      // Hero is 100vh tall, start fading at 40vh, fully visible at 70vh
      const fadeStart = vh * 0.4;  // 40vh
      const fadeEnd = vh * 0.7;    // 70vh

      if (scrolled < fadeStart) {
        setNavOpacity(0);
      } else if (scrolled >= fadeEnd) {
        setNavOpacity(1);
      } else {
        const progress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
        setNavOpacity(progress);
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: navOpacity }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          isScrolled
            ? 'bg-[#0a0a0a]/95 border-b border-white/10'
            : 'bg-transparent border-b border-white/5'
        )}
        style={{
          willChange: 'background-color, opacity',
          pointerEvents: navOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
        <Container size="full">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <Logo variant="light" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-base font-medium transition-colors duration-200 relative py-2',
                    'hover:text-brand-pink',
                    pathname === link.href
                      ? 'text-brand-pink'
                      : 'text-white'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button variant="primary" size="sm" href="/contact">
                Let&apos;s Talk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-10 p-2 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </Container>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="fixed inset-0 bg-[var(--background)] z-40 md:hidden pt-20"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 -mt-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'text-2xl font-semibold transition-colors',
                      pathname === link.href ? 'text-brand-pink' : 'text-white hover:text-brand-pink'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    'text-2xl font-semibold transition-colors',
                    pathname === '/contact' ? 'text-brand-pink' : 'text-white hover:text-brand-pink'
                  )}
                >
                  Contact
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mt-4"
              >
                <Button variant="primary" size="lg" href="/contact">
                  Let&apos;s Talk
                </Button>
              </motion.div>
              {siteConfig.phones.map((phone, index) => (
                <motion.a
                  key={`phone-${index}`}
                  href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  className="text-slate hover:text-brand-pink transition-colors"
                >
                  {phone}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
