import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.askhermarketing.com"),
  alternates: { canonical: "https://www.askhermarketing.com/" },
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "marketing agency",
    "digital marketing",
    "social media marketing",
    "local business marketing",
    "brand strategy",
    "content creation",
    "Volusia County marketing",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    url: "https://www.askhermarketing.com",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ask Her Marketing Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'rQUeUZRkhW-_ESFykmL_wzYdftRyIf2nA0sI1xEeJ8E',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MarketingAgency',
  name: 'Ask Her Marketing Group',
  url: 'https://www.askhermarketing.com',
  telephone: ['+13866909284', '+14076274354'],
  email: 'drita@askhermarketing.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '307 Due East St',
    addressLocality: 'New Smyrna Beach',
    addressRegion: 'FL',
    postalCode: '32169',
    addressCountry: 'US',
  },
  areaServed: [
    'New Smyrna Beach, FL',
    'Edgewater, FL',
    'Daytona Beach, FL',
    'Port Orange, FL',
    'Ormond Beach, FL',
    'DeLand, FL',
    'Deltona, FL',
    'Holly Hill, FL',
    'Orange City, FL',
    'Volusia County, FL',
  ],
  description: 'Ask Her Marketing Group is a full-service marketing agency based in New Smyrna Beach, FL, proudly serving businesses across Volusia County. Services include website design, SEO, branding, social media management, photography, video, and AI solutions.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Marketing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Google Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Logos' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photography & Video' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Creation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Solutions' } },
    ],
  },
  logo: 'https://www.askhermarketing.com/og-image.png',
  image: 'https://www.askhermarketing.com/og-image.png',
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] min-h-dvh overflow-x-hidden">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
