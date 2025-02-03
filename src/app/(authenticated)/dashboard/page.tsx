// src/app/(authenticated)/dashboard/page.tsx
// Dashboard (Home) for signed-in users
import Link from "next/link";
import { Home, Settings, BookOpen, Calculator, MessageCircle } from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar Section */}
        <Sidebar className="bg-sidebar">
          <SidebarContent>
            <SidebarMenu>
              {/* Dashboard/Home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/(authenticated)/dashboard">
                    <Home className="mr-2" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/(authenticated)/settings">
                    <Settings className="mr-2" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Learn */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Learn">
                  <Link href="/(authenticated)/learn">
                    <BookOpen className="mr-2" />
                    Learn
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Calculations (collapsible) */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Final Exam Calculator">
                  <Link href="/(authenticated)/calculator/final-exam">
                    <Calculator className="mr-2" />
                    Calculations
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Feedback/Question buttons as pop-overs could be added here */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Questions?">
                  <Link href="/(authenticated)/question">
                    <MessageCircle className="mr-2" />
                    Question?
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          {/* Render dashboard widgets, saved calculations, etc. */}
          <section>
            {/* For example, list saved final exam calculations fetched from Supabase */}
            <p>Your saved final exam calculations will appear here.</p>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}

/*
Later you can add collapsible menus (for Classes or nested Calculations) and implement pop-over inputs for Feedback/Questions with your existing UI components.
*/
