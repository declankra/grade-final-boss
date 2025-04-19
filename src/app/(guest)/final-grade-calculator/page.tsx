// src/app/(guest)/final-grade-calculator/page.tsx
// Final grade calculator page for guests

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Share2 } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { sendGAEvent } from "@/lib/gtag"; // Import GA utility

interface GradeComponent {
  id: number;
  name: string;
  weight: string; // Store as string for input binding
  score: string; // Store as string for input binding
}

export default function FinalGradeCalculator() {
  const [components, setComponents] = useState<GradeComponent[]>([
    { id: 1, name: "Homework", weight: "20", score: "90" },
    { id: 2, name: "Midterm", weight: "30", score: "85" },
    { id: 3, name: "Final Exam", weight: "50", score: "" }, // Example with empty score
  ]);
  const [nextId, setNextId] = useState(4);
  const [overallGrade, setOverallGrade] = useState<number | null>(null);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isShareSupported, setIsShareSupported] = useState(false);

  const addComponent = () => {
    setComponents([...components, { id: nextId, name: "", weight: "", score: "" }]);
    setNextId(nextId + 1);
  };

  const removeComponent = (id: number) => {
    setComponents(components.filter((comp) => comp.id !== id));
  };

  const updateComponent = (id: number, field: keyof GradeComponent, value: string) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    );
  };

  useEffect(() => {
    // Check for Web Share API support on component mount
    if (typeof navigator.share !== 'undefined') {
      setIsShareSupported(true);
    }
  }, []);

  useEffect(() => {
    let calculatedGrade = 0;
    let currentTotalWeight = 0;
    let weightSumForCalculation = 0;

    components.forEach(comp => {
      const weight = parseFloat(comp.weight);
      const score = parseFloat(comp.score);

      if (!isNaN(weight)) {
        currentTotalWeight += weight;
      }

      // Only include components with valid weight and score in the grade calculation
      if (!isNaN(weight) && weight > 0 && !isNaN(score)) {
        calculatedGrade += (score * weight) / 100;
        weightSumForCalculation += weight;
      }
    });

    setTotalWeight(currentTotalWeight);

    if (currentTotalWeight > 100) {
      setValidationMessage("Warning: Total weight exceeds 100%.");
    } else if (currentTotalWeight < 100 && currentTotalWeight > 0) {
      // Optionally, warn if total weight is less than 100, but still calculate
      setValidationMessage("Note: Total weight is less than 100%.");
    } else {
        setValidationMessage(null); // Clear message if weight is exactly 100 or 0
    }

    // Calculate final grade based on the sum of weights *actually used* in calculation
    if (weightSumForCalculation > 0) {
        // Normalize the grade based on the total weight of components *with scores*
        // This calculates the grade based on the parts that have been graded so far.
        const normalizedGrade = (calculatedGrade / weightSumForCalculation) * 100;
        setOverallGrade(normalizedGrade);
    } else {
      setOverallGrade(null); // No valid components to calculate grade
    }
  }, [components]);

  const handleShare = async () => {
    if (!isShareSupported || overallGrade === null) return;

    // Send GA Event
    sendGAEvent('share_final_grade', { calculator_type: 'final_grade' });

    const shareData = {
      title: 'My Final Grade Calculation',
      text: `I calculated my overall course grade: ${overallGrade.toFixed(2)}%! Check out this final grade calculator: `,
      url: window.location.href,
    };

    try {
      await navigator.share(shareData);
      console.log('Grade shared successfully');
    } catch (err) {
      console.error('Error sharing grade:', err);
      // Optionally, show a user-friendly message here if sharing fails
    }
  };

  // Data preparation for the chart
  const chartData = components
    .map(comp => ({
      name: comp.name || 'Unnamed',
      value: parseFloat(comp.weight) || 0,
    }))
    .filter(item => item.value > 0); // Only include components with weight > 0

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC0CB', '#D2691E'];

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Final Grade Calculator</CardTitle>
          <CardDescription>
            Enter your course components, their weights, and your scores to calculate your overall grade.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {components.map((component, index) => (
            <div key={component.id} className="flex items-end space-x-2 p-2 border rounded">
              <div className="flex-1 space-y-1">
                <Label htmlFor={`name-${component.id}`}>Component Name</Label>
                <Input
                  id={`name-${component.id}`}
                  placeholder="e.g., Homework"
                  value={component.name}
                  onChange={(e) => updateComponent(component.id, "name", e.target.value)}
                />
              </div>
              <div className="space-y-1 w-24">
                 <Label htmlFor={`weight-${component.id}`}>Weight (%)</Label>
                <Input
                  id={`weight-${component.id}`}
                  type="number"
                  placeholder="e.g., 20"
                  value={component.weight}
                  onChange={(e) => updateComponent(component.id, "weight", e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
               <div className="space-y-1 w-24">
                <Label htmlFor={`score-${component.id}`}>Score (%)</Label>
                <Input
                  id={`score-${component.id}`}
                  type="number"
                  placeholder="e.g., 90"
                  value={component.score}
                  onChange={(e) => updateComponent(component.id, "score", e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeComponent(component.id)}
                aria-label="Remove component"
                disabled={components.length <= 1} // Prevent removing the last component
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addComponent}>Add Component</Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          {validationMessage && (
            <p className={`text-sm ${totalWeight > 100 ? 'text-red-600' : 'text-yellow-600'} text-center w-full`}>
              {validationMessage} (Current Total: {totalWeight.toFixed(1)}%)
            </p>
          )}
          <div className="text-4xl font-extrabold pt-4 text-center w-full">
            <span className="text-sm font-medium text-muted-foreground block mb-1">Overall Grade</span>
            {overallGrade !== null ? `${overallGrade.toFixed(2)}%` : "N/A"}
          </div>

          {/* Share Button */}
          <Button 
            onClick={handleShare}
            disabled={!isShareSupported || overallGrade === null}
            className="mt-4"
            aria-label="Share calculated grade"
            variant="outline"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share Grade
          </Button>

          {/* Visual Breakdown */}
          {chartData.length > 0 && (
            <div className="w-full mt-6">
              <h3 className="text-lg font-semibold mb-2 text-center">Component Weight Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    // label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}