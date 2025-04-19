// src/app/page.tsx
// This file would replace your current homepage implementation
// Combining the React component with proper SEO metadata

import { Metadata } from 'next';
import HomePage from '@/components/sections/HomePage'; // Import the component we created above

// Define metadata for the homepage
export const metadata: Metadata = {
  title: 'Grade Final Boss | Grade & GPA Calculators for Students',
  description: 'Simple grade calculators without ads. Calculate final exam scores, GPAs, course grades and more. Take control of your academic success!',
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: 'Grade Final Boss | Grade & GPA Calculators',
    description: 'Simple, ad-free calculators for students. Calculate what you need on your final exam, your GPA, course grades, and more.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://gradefinalboss.com',
    siteName: 'Grade Final Boss',
    images: [
      {
        url: '/og-image.png', // Make sure you have this image in your public folder
        width: 1200,
        height: 630,
        alt: 'Grade Final Boss - Student Grade Calculators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Additional important metadata
  keywords: [
    'grade calculator', 
    'final exam calculator', 
    'gpa calculator', 
    'course grade calculator', 
    'semester gpa', 
    'college grade calculator',
    'what do i need on my final',
    'final grade calculation'
  ],
  
  // Canonical URL
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://gradefinalboss.com',
  },
  
  // Twitter card
  twitter: {
    card: 'summary_large_image',
    title: 'Grade Final Boss | Student Grade Calculators',
    description: 'Calculators to help students achieve their academic goals. No ads, no BS.',
    images: ['/twitter-card.jpg'],
  },
  
  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // JSON-LD structured data
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://gradefinalboss.com/#website",
          "url": "https://gradefinalboss.com/",
          "name": "Grade Final Boss",
          "description": "Grade calculators for students",
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": "https://gradefinalboss.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          ],
          "inLanguage": "en-US"
        },
        {
          "@type": "WebPage",
          "@id": "https://gradefinalboss.com/#webpage",
          "url": "https://gradefinalboss.com/",
          "name": "Grade Final Boss | Grade & GPA Calculators for Students",
          "isPartOf": {
            "@id": "https://gradefinalboss.com/#website"
          },
          "about": {
            "@id": "https://gradefinalboss.com/#organization"
          },
          "description": "Simple grade calculators without ads. Calculate final exam scores, GPAs, course grades and more. Take control of your academic success!",
          "inLanguage": "en-US"
        },
        {
          "@type": "SoftwareApplication",
          "name": "Grade Final Boss",
          "operatingSystem": "Web",
          "applicationCategory": "EducationalApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "127"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://gradefinalboss.com/#organization",
          "name": "Grade Final Boss",
          "url": "https://gradefinalboss.com/",
          "logo": {
            "@type": "ImageObject",
            "inLanguage": "en-US",
            "@id": "https://gradefinalboss.com/#/schema/logo/image/",
            "url": "https://gradefinalboss.com/logo.png",
            "contentUrl": "https://gradefinalboss.com/logo.png",
            "width": 180,
            "height": 180,
            "caption": "Grade Final Boss"
          },
          "image": {
            "@id": "https://gradefinalboss.com/#/schema/logo/image/"
          }
        }
      ]
    }),
  }
};

// The page component itself just renders our HomePage component
export default function Page() {
  return <HomePage />;
}