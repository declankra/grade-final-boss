// /src/app/(guest)/layout.tsx
// Guest layout - Server Component
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GuestLayoutClient from './guest-layout-client'; // Import the client component

// Metadata MUST be exported from a Server Component
export const metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* Use the client component to wrap children and render NavBar */}
      <GuestLayoutClient>{children}</GuestLayoutClient>
      <Footer />
    </>
  );
} 