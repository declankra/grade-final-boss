// src/app/(guest)/final-exam-grade-calculator/page.tsx
import { Metadata } from 'next';
import FinalGradeCalculator from '@/components/sections/FinalGradeCalculator';
import { CalculationProvider } from '@/contexts/CalculationContext';
export const metadata: Metadata = {
  title: 'Final Grade Calculator | Grade Final Boss',
  description: 'Calculate the score you need on your final exam to achieve your desired grade.',
  openGraph: {
    title: 'Final Grade Calculator | Grade Final Boss',
    description: 'Calculate the score you need on your final exam to achieve your desired grade.',
    type: 'website',
  },
};

export default function CalculatorPage() {
  return(
    <CalculationProvider>
      <FinalGradeCalculator />
    </CalculationProvider>
  );
}