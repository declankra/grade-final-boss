import CalculatorLinks from '@/components/CalculatorLinks';

export const metadata = {
  title: 'Boost Your Grades: Proven Study Strategies | Grade Final Boss',
  description: 'Discover effective study strategies to improve learning, retention, and test performance. Learn about active recall, spaced repetition, and time management techniques.',
};

export default function StudyStrategiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl max-w-none">
        <h1>Boost Your Grades: Proven Study Strategies</h1>
        <p>
          Effective studying isn't just about putting in hours; it's about studying smarter. Implementing proven strategies can significantly improve how well you learn and retain information, leading to better grades and less stress.
        </p>

        <h2>Key Study Techniques</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Active Recall:</strong> Instead of passively rereading notes, test yourself. Try to retrieve information from memory without looking at the material. Use flashcards, practice questions, or summarize concepts in your own words.
          </li>
          <li>
            <strong>Spaced Repetition:</strong> Review material at increasing intervals. Instead of cramming, revisit topics shortly after learning them, then again a day later, a few days later, a week later, etc. This strengthens memory consolidation.
          </li>
          <li>
            <strong>Interleaving:</strong> Mix up the subjects or types of problems you study in one session. Instead of blocking study time by subject (e.g., 3 hours of math), alternate between different topics (e.g., math, then history, then physics). This helps your brain differentiate between concepts.
          </li>
          <li>
            <strong>Elaboration:</strong> Connect new information to what you already know. Ask yourself how concepts relate, explain them to someone else, or create analogies. Deeper processing leads to better understanding and recall.
          </li>
          <li>
            <strong>Time Management (Pomodoro Technique):</strong> Study in focused bursts (e.g., 25 minutes) followed by short breaks (e.g., 5 minutes). This helps maintain concentration and prevents burnout.
          </li>
          <li>
            <strong>Optimize Your Environment:</strong> Find a quiet study space free from distractions. Ensure good lighting and minimize interruptions from phones or social media.
          </li>
        </ul>

        <h2>Applying Strategies</h2>
        <p>
          Experiment with these techniques to find what works best for you. Combine strategies for maximum effect. For example, use active recall with spaced repetition via flashcard apps (like Anki). Plan your study sessions using time management techniques.
        </p>
        <p>
          Remember, understanding your grades and how they're calculated can also motivate your study efforts. Check out our calculators below!
        </p>

      </article>

      <CalculatorLinks />
    </div>
  );
} 