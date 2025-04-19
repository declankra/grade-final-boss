import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Icons
const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="8" x2="8" y1="10" y2="10" />
    <line x1="12" x2="12" y1="10" y2="10" />
    <line x1="16" x2="16" y1="10" y2="10" />
    <line x1="8" x2="8" y1="14" y2="14" />
    <line x1="12" x2="12" y1="14" y2="14" />
    <line x1="16" x2="16" y1="14" y2="14" />
    <line x1="8" x2="8" y1="18" y2="18" />
    <line x1="12" x2="12" y1="18" y2="18" />
    <line x1="16" x2="16" y1="18" y2="18" />
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

interface CalculatorCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const CalculatorCard = ({ title, description, href, icon }: CalculatorCardProps) => {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black relative overflow-hidden">
        <div className="p-6 h-full flex flex-col group-hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-900 opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="relative z-10 flex-1">
            <div className="mb-4 p-2 inline-block bg-gray-100 dark:bg-gray-900 rounded-lg">
              {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
            <Button variant="outline" className="mt-auto group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
              Use Calculator
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default function HomePage() {
  const calculators = [
    {
      title: "Final Grade Calculator",
      description: "Calculate your final course grade based on your current scores and remaining assignments.",
      href: "/final-grade-calculator",
      icon: <CalculatorIcon />
    },
    {
      title: "Final Exam Grade Calculator",
      description: "Determine what score you need on your final exam to achieve your desired course grade.",
      href: "/final-exam-grade-calculator",
      icon: <GraduationCapIcon />
    },
    {
      title: "Class Grade Calculator",
      description: "Track your progress and calculate your current standing in any class.",
      href: "/class-grade-calculator",
      icon: <CalculatorIcon />
    },
    {
      title: "GPA Calculator",
      description: "Calculate your cumulative GPA based on your course grades and credit hours.",
      href: "/gpa-calculator",
      icon: <AwardIcon />
    },
    {
      title: "Semester GPA Calculator",
      description: "Calculate your GPA for a specific semester or term.",
      href: "/semester-gpa-calculator",
      icon: <AwardIcon />
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16 md:w-24 md:h-24">
                <Image 
                  src="/logo.png" 
                  alt="Grade Final Boss Logo" 
                  width={96} 
                  height={96} 
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Grade Final Boss
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Simple, powerful grade calculators without ads. Take control of your academic success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 rounded-lg">
                <Link href="/final-exam-grade-calculator">
                  Calculate What You Need
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-lg">
                <Link href="/gpa-calculator">
                  Check Your GPA
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Free Student Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calc, index) => (
              <CalculatorCard
                key={index}
                title={calc.title}
                description={calc.description}
                href={calc.href}
                icon={calc.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Use Grade Final Boss?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our calculators are designed with students in mind - simple, accurate, and completely free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-black rounded-lg shadow-sm">
              <div className="mb-4 p-2 inline-block bg-gray-100 dark:bg-gray-900 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">100% Free</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No paywalls, no premium tiers. All features available to everyone.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-black rounded-lg shadow-sm">
              <div className="mb-4 p-2 inline-block bg-gray-100 dark:bg-gray-900 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Ads</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A clean, distraction-free experience with no annoying advertisements.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-black rounded-lg shadow-sm">
              <div className="mb-4 p-2 inline-block bg-gray-100 dark:bg-gray-900 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 7.82v3a4 4 0 0 1-4 3.999h-.171a1 1 0 0 0-.708.299L9.5 17.682"></path>
                  <path d="M14 7.5V7a3 3 0 0 0-6 0v.5"></path>
                  <path d="M11 13V7"></path>
                  <path d="M4 8.5V7a3 3 0 0 1 6 0v.5"></path>
                  <path d="M8 7v6"></path>
                  <path d="M8 13H6"></path>
                  <path d="M13 13h-2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Simple & Intuitive</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easy to use interfaces built with students' needs in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Grade Final Boss
            </p>
            <a 
              href="https://declankramper.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Created by Declan Kramper
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
