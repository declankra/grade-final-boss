'use client';

import { NavBar } from '@/components/ui/tubelight-navbar';
import {
  Calculator,
  GraduationCap,
  ClipboardList,
  Target,
  BookOpenCheck
} from 'lucide-react';

// Define navigation items for the calculator pages
const calculatorNavItems = [
  { name: 'Semester GPA', url: '/semester-gpa-calculator', icon: Calculator },
  { name: 'Cumulative GPA', url: '/gpa-calculator', icon: GraduationCap },
  { name: 'Class Grade', url: '/class-grade-calculator', icon: ClipboardList },
  { name: 'Final Grade', url: '/final-grade-calculator', icon: Target },
  { name: 'Final Exam', url: '/final-exam-grade-calculator', icon: BookOpenCheck },
];

export default function GuestLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar items={calculatorNavItems} />
      {/* Add padding top/bottom to prevent overlap */}
      <main className="min-h-screen pt-20 pb-20 sm:pt-24">
        {children}
      </main>
    </>
  );
} 