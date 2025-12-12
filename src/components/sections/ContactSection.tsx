'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { ContactInfo } from '@/components/shared/ContactInfo';
import { ContactForm } from '@/components/shared/ContactForm';
import { siteConfig } from '@/lib/constants';

interface ContactSectionProps {
  overline?: string;
  headline?: string;
  subheadline?: string;
  phones?: string[];
  emails?: string[];
  responseTime?: string;
}

export function ContactSection({
  overline = "Get in Touch",
  headline = "Ready to grow your business?",
  subheadline = "Fill out the form below and we'll get back to you within 24 hours.",
  phones = siteConfig.phones,
  emails = siteConfig.emails,
  responseTime = "We typically respond within 24 hours.",
}: ContactSectionProps) {
  return (
    <Section background="white" padding="lg" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-40 top-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,30,155,0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          >
            <h2 className="text-h2 text-white mb-4">{headline}</h2>
            <p className="text-body-lg text-slate mb-8">{subheadline}</p>

            <ContactInfo
              phones={phones}
              emails={emails}
              responseTime={responseTime}
            />
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: 0.1 }}
          >
            <div className="bg-offwhite rounded-2xl p-8 md:p-10 shadow-lg shadow-black/5">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
