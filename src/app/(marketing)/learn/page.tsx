// src/app/(marketing)/learn/page.tsx
// Marketing & Blog Listing Page
import Link from 'next/link';
import CalculatorLinks from '@/components/CalculatorLinks'; // Assuming components alias is set up
import { FAQPage, WithContext } from 'schema-dts'; // Import schema types

const blogPosts = [
  { name: 'Master GPA Calculation: Simple Steps & Tools', href: '/learn/gpa-calculation' },
  { name: 'How to Calculate Your Final Grade: Essential Guide', href: '/learn/final-grade-calculation' },
  { name: 'Effective Semester Planning for Academic Success', href: '/learn/semester-planning' },
  { name: 'Boost Your Grades: Proven Study Strategies', href: '/learn/study-strategies' },
];

// Define FAQ Schema
const faqSchema: WithContext<FAQPage> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between GPA and final grade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GPA (Grade Point Average) represents your average academic performance across multiple courses or terms, while a final grade is the specific grade earned in a single course for a particular term.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I estimate my final grade before the course ends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To estimate your final grade, you need the weighting of each assignment category (like homework, quizzes, exams) and your current scores. Our Final Grade Calculator tool can help you calculate this easily based on your inputs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is semester planning important for students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Effective semester planning helps you manage workload, balance deadlines, allocate study time efficiently, and reduce stress, ultimately contributing to better academic performance and well-being.',
      },
    },
  ],
};

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add link to homepage */}
      <div className="mb-4">
        <Link href="/" className="text-blue-700 hover:underline">
          &larr; Back to Home
        </Link>
      </div>

      {/* Add JSON-LD script for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-3xl font-bold mb-4">Learn About Grades & Academic Success</h1>
      <p className="mb-6 text-lg text-gray-700">
        Understanding how grades are calculated and planning your semester effectively are crucial for academic success. Explore our guides to master GPA calculations, estimate final grades, plan your workload, and discover effective study strategies. Use our free tools to simplify the process!
      </p>

      <h2 className="text-2xl font-semibold mb-4">Explore Our Guides:</h2>
      <ul className="space-y-3 mb-8">
        {blogPosts.map((post) => (
          <li key={post.href}>
            <Link href={post.href} className="text-blue-700 hover:underline text-lg">
              {post.name}
            </Link>
          </li>
        ))}
      </ul>

      <CalculatorLinks />
    </div>
  );
}