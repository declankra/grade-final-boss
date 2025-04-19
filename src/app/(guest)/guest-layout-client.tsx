'use client';

import { useState } from 'react';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { Menu, X } from 'lucide-react';
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
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* NavBar for medium screens and up */}
      <div className="hidden md:block">
        <NavBar items={calculatorNavItems} />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={openMobileMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background/80 backdrop-blur-sm md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar */}
      <MobileSidebar
        items={calculatorNavItems}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      {/* Add padding top/bottom to prevent overlap - Adjust pt for mobile */}
      <main className="min-h-screen pt-20 pb-20 md:pt-24">
        {children}
      </main>
    </>
  );
} 