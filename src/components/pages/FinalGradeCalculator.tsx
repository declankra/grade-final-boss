// src/components/pages/final-grade-calculator.tsx

"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

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

export default function FinalGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState<string>('');
  const [desiredGrade, setDesiredGrade] = useState<string>('');
  const [finalWeight, setFinalWeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

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
    const requiredScore = (desired - (current * (1 - weight/100))) / (weight/100);
    
    // Always show the result, even if it's over 100%
    setResult(Math.round(requiredScore * 100) / 100);
  };

  const saveCalculation = () => {
    // This will be implemented in the next step
    console.log('Saving calculation...');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 gap-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2">Final Grade Calculator</h1>
        <p className="text-zinc-600 mb-6">
          Calculate the score you need on your final exam to achieve your desired grade.
        </p>

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
        </Card>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Display Calculation Result */}
        {result !== null && !error && (
          <div className="mt-6 space-y-4">
            <div className={cn(
              "rounded-md p-6",
              getResultMessage(result).color
            )}>
              <p className="text-lg mb-2">
                You need a <span className="font-bold">{result.toFixed(2)}%</span> on your final exam to reach your desired grade.
              </p>
              <p className="text-lg font-bold">
                {getResultMessage(result).message}
              </p>
            </div>

            {/* Save Result Button */}
            <Button variant="secondary" onClick={saveCalculation} className="w-full">
              Save My Result
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}