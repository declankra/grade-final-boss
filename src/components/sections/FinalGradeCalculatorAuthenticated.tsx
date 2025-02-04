// src/components/sections/FinalGradeCalculatorAuthenticated.tsx
// Final grade calculator displayed for authenticated users
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const supabaseBrowserClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Utility to get a "message" for the required exam score
const getResultMessage = (score: number): { message: string; color: string } => {
  if (score > 100) {
    return {
      message: "You're fucked.",
      color: "bg-red-50 border-red-100 text-red-900"
    };
  } else if (score >= 85) {
    return {
      message: "Possible. But you'll need a lot of White Zero Sugar Monster Energy.",
      color: "bg-orange-50 border-orange-100 text-orange-900"
    };
  } else if (score >= 60) {
    return {
      message: "Pretty good. One solid night (or two) of studying and you're there.",
      color: "bg-yellow-50 border-yellow-100 text-yellow-900"
    };
  } else if (score >= 30) {
    return {
      message: "Well done. Cram the few hours before to familiarize yourself and you're golden.",
      color: "bg-green-50 border-green-100 text-green-900"
    };
  } else if (score >= 0) {
    return {
      message: "You're a beast. Show up and ball out. No stress here.",
      color: "bg-emerald-50 border-emerald-100 text-emerald-900"
    };
  } else {
    return {
      message: "Don't even need to show up. Turn up the big bootie mix and celebrate. Cheers!",
      color: "bg-green-50 border-green-100 text-green-900"
    };
  }
};

export default function FinalGradeCalculatorAuthenticated() {
  const [currentGrade, setCurrentGrade] = useState<string>('');
  const [desiredGrade, setDesiredGrade] = useState<string>('');
  const [finalWeight, setFinalWeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState(false);

  /**
   * Calculates the required score on the final
   */
  const calculateRequiredScore = () => {
    // Convert string inputs to numbers and validate
    const current = parseFloat(currentGrade);
    const desired = parseFloat(desiredGrade);
    const weight = parseFloat(finalWeight);

    // Input validation
    if (isNaN(current) || isNaN(desired) || isNaN(weight)) {
      setError('Please fill in all fields with valid numbers');
      setResult(null);
      return;
    }

    if (current < 0 || current > 100 || desired < 0 || desired > 100 || weight < 0 || weight > 100) {
      setError('Please enter values between 0 and 100');
      setResult(null);
      return;
    }

    // Clear any previous errors
    setError('');

    // Calculate required final exam score
    // Formula: (Desired Grade - Current Grade × (1 - Final Weight)) ÷ Final Weight
    const requiredScore = (desired - (current * (1 - weight / 100))) / (weight / 100);

    // Always show the result, even if it's over 100%
    setResult(Math.round(requiredScore * 100) / 100);
  };

  /**
   * Saves the calculation
   */
  const saveCalculation = async () => {
    if (result === null) {
      alert("Please calculate first.");
      return;
    }

    setSaving(true);
    
    try {
      const { data: { session } } = await supabaseBrowserClient.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        throw new Error("No user session found");
      }

      const res = await fetch("/api/calculations/final-exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          input_data: {
            currentGrade,
            desiredGrade,
            finalWeight,
          },
          calculated_final_score_needed: result,
        }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save calculation");
      }
    } catch (err: any) {
      console.error("Save error:", err);
      alert("Unable to save calculation: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="shadow-none">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="currentGrade">Current Grade (%)</Label>
          <Input
            id="currentGrade"
            type="number"
            placeholder="e.g. 85"
            value={currentGrade}
            onChange={(e) => setCurrentGrade(e.target.value)}
            min="0"
            max="100"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desiredGrade">Desired Final Grade (%)</Label>
          <Input
            id="desiredGrade"
            type="number"
            placeholder="e.g. 90"
            value={desiredGrade}
            onChange={(e) => setDesiredGrade(e.target.value)}
            min="0"
            max="100"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="finalWeight">Final Exam Weight (%)</Label>
          <Input
            id="finalWeight"
            type="number"
            placeholder="e.g. 20"
            value={finalWeight}
            onChange={(e) => setFinalWeight(e.target.value)}
            min="0"
            max="100"
            className="w-full"
          />
        </div>

        <Button
          onClick={calculateRequiredScore}
          className="w-full"
          size="lg"
        >
          Calculate
        </Button>
      </CardContent>

      {error && (
        <Alert variant="destructive" className="mt-6 mx-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Display Calculation Result */}
      {result !== null && !error && (
        <div className="mt-6 mx-6 space-y-4 mb-6">
          <div className={cn(
            "rounded-md p-6",
            getResultMessage(result).color
          )}>
            <p className="text-lg mb-2">
              You need a <span className="font-bold">{result.toFixed(2)}%</span> on your final exam to achieve your desired grade.
            </p>
            <p className="text-lg font-bold">
              {getResultMessage(result).message}
            </p>
          </div>

          <Button 
            variant="secondary" 
            onClick={saveCalculation} 
            className="w-full"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save My Result"}
          </Button>
        </div>
      )}
    </Card>
  );
}