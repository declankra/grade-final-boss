// /src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { OpenPanelProvider } from "@/lib/analytics/openpanel/OpenPanelProvider";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

// fallback metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "Grade Final Boss | Defeat your Final Exams",
    template: "%s | Grade Final Boss"
  },
  description: "Free calculators and tools to help students plan their grades, calculate cumulative GPAs, and achieve their academic goals.",
  keywords: ["grade calculator", "GPA calculator", "final exam calculator", "cumulative GPA calculator", "final grade calculator", "final exam grade calculator", "class grade calculator", "semester GPA calculator"],
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Grade Final Boss",
    title: "Grade Final Boss | Defeat your Final Exams",
    description: "Free calculators and tools to help students plan their grades",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Grade Final Boss Preview"
    }],
  },
  
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
  
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  // Favicon and manifest
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-touch-icon-precomposed.png" }
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen w-full overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-65754CVRTC`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-65754CVRTC', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <OpenPanelProvider />
        <Header />
        <main className="w-full overflow-x-hidden">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}