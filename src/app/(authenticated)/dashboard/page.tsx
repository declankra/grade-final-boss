// src/app/(authenticated)/dashboard/page.tsx
// Dashboard (Home) for signed-in users
import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
  // Get the Supabase client
  const supabase = await createClient()

  // Fetch user data
  const { data: { user }, error } = await supabase.auth.getUser()
  
  // You can add more data fetching here for GPA, classes, etc.
  // For now using static data

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Grade Dashboard</h1>
      
      {/* Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Current GPA */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Current GPA</h2>
          <p className="text-2xl font-bold">3.2</p>
        </div>

        {/* Projected GPA */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Projected GPA</h2>
          <p className="text-2xl font-bold">3.45</p>
        </div>

        {/* Classes This Semester */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Classes This Semester</h2>
          <p className="text-2xl font-bold">5</p>
        </div>

        {/* Upcoming Finals */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Upcoming Finals</h2>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>
    </>
  );
}