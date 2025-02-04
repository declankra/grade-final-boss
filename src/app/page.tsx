// src/app/page.tsx
// Public homepage (SEO-optimized for guests)
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUpButton from "@/components/ui/sign-up-button"
import { CalculationProvider } from "@/contexts/CalculationContext";

export default function HomePage() {
  return (
    <CalculationProvider>
      <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold sm:text-6xl"> 
              Grade Final Boss
          </h1>
          <p className="mx-auto max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
            Simple, clean grade calculators to help you achieve your academic goals. No ads, no BS.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/final-exam-grade-calculator">
              Calculate Final Exam Grade
            </Link>
          </Button>

          <SignUpButton />
        </div>
      </div>
    </CalculationProvider>
  );
}