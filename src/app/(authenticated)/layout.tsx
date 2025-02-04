// /src/app/(authenticated)/layout.tsx
// Authenticated layout that wraps pages with the sidebar
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SidebarProvider,
} from '@/components/ui/sidebar';

// Import the client-side SidebarNav component from a new file we'll create
import { SidebarNav } from './SidebarNav';


// Server component for authentication check
async function AuthCheck() {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return null;
}



export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // First check authentication
  await AuthCheck();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background">
        <SidebarNav />
        <main className="flex-1 overflow-x-hidden">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}