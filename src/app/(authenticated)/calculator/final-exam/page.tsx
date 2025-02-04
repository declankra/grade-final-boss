// src/app/(authenticated)/caculator/final-exam/page.tsx
// Final exam calculator with saved calculations

'use client';
import FinalGradeCalculatorAuthenticated from '@/components/sections/FinalGradeCalculatorAuthenticated';
import SavedCalculations from '@/components/sections/SavedCalculations';

export default function FinalExamPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Final Exam Calculator</h1>
          <p className="text-muted-foreground">
            Calculate what you need on your final exam and track your past calculations.
          </p>
        </div>

        {/* Calculator Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Calculate Final Exam Score</h2>
          <FinalGradeCalculatorAuthenticated />
        </section>

        {/* Past Calculations Section */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Past Calculations</h2>
          <SavedCalculations />
        </section>
      </div>
    </div>
  );
}