// /src/app/(authenticated)/layout.tsx
// Authenticated layout that wraps pages with the sidebarimport { redirect } from 'next/navigation';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Header from '@/components/layout/Header';
import { Sidebar } from '@/components/ui/sidebar';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
} 