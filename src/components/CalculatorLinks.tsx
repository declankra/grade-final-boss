import Link from 'next/link';

const calculators = [
  { name: 'GPA Calculator', href: '/gpa-calculator' },
  { name: 'Semester GPA Calculator', href: '/semester-gpa-calculator' },
  { name: 'Class Grade Calculator', href: '/class-grade-calculator' },
  { name: 'Final Grade Calculator', href: '/final-grade-calculator' },
  { name: 'Final Exam Grade Calculator', href: '/final-exam-grade-calculator' },
];

export default function CalculatorLinks() {
  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Try Our Calculators:</h2>
      <ul className="space-y-2">
        {calculators.map((calc) => (
          <li key={calc.href}>
            <Link href={calc.href} className="text-blue-600 hover:underline">
              {calc.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 