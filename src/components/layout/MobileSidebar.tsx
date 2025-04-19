'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility

type NavItem = {
  name: string;
  url: string;
  icon: React.ElementType;
};

interface MobileSidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ items, isOpen, onClose }: MobileSidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out md:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-background p-4 shadow-xl transition-transform duration-300 ease-in-out transform md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Calculators</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav>
          <ul>
            {items.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.url}
                  className="flex items-center p-2 rounded-md hover:bg-muted text-sm"
                  onClick={onClose} // Close menu on link click
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
} 