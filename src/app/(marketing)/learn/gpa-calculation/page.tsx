import CalculatorLinks from '@/components/CalculatorLinks';

export const metadata = {
  title: 'Master GPA Calculation: Simple Steps & Tools | Grade Final Boss',
  description: 'Learn how to calculate your GPA accurately. Understand weighted vs. unweighted GPA, and use our simple GPA calculator tool for quick results.',
};

export default function GpaCalculationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl max-w-none">
        <h1>Master GPA Calculation: Simple Steps & Tools</h1>
        <p>
          Calculating your Grade Point Average (GPA) is essential for tracking academic progress. It's a standard measure used by schools and employers. Understanding how it works empowers you to set goals and improve your performance.
        </p>

        <h2>Understanding GPA Basics</h2>
        <p>
          Your GPA represents the average value of your accumulated final grades. It's typically calculated on a 4.0 scale, where A=4, B=3, C=2, D=1, and F=0 points. To calculate your GPA, you multiply the grade points for each course by the number of credit hours, sum these results, and then divide by the total number of credit hours.
        </p>
        <p>
          <strong>Formula:</strong> GPA = (Total Grade Points) / (Total Credit Hours)
        </p>

        <h2>Weighted vs. Unweighted GPA</h2>
        <p>
          An <strong>unweighted GPA</strong> uses the standard 4.0 scale regardless of course difficulty. A <strong>weighted GPA</strong> assigns extra points to grades in advanced courses (like AP or IB), often using a 5.0 scale for these classes. Check your school's policy to know which system they use.
        </p>

        <h2>How to Calculate Your GPA</h2>
        <ol>
          <li>List your courses, their credit hours, and the letter grade received.</li>
          <li>Convert each letter grade to its grade point value (e.g., A=4.0, B+=3.3).</li>
          <li>Multiply the grade point value by the credit hours for each course to get the quality points.</li>
          <li>Sum the quality points for all courses.</li>
          <li>Sum the credit hours for all courses.</li>
          <li>Divide the total quality points by the total credit hours.</li>
        </ol>
        <p>
          Need a quick calculation? Use our specialized calculators linked below!
        </p>

      </article>

      <CalculatorLinks />
    </div>
  );
} 