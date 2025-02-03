// /src/app/(guest)/layout.tsx
// Guest layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
} 