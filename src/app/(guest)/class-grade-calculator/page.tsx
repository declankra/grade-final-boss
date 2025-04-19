// src/app/(guest)/class-grade-calculator/page.tsx
// Class grade calculator page for guests

"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Share2, Check } from 'lucide-react';
import Head from 'next/head';
import ReactConfetti from 'react-confetti';

interface Assignment {
  id: number;
  name: string;
  weight: number | '';
  score: number | '';
}

export default function ClassGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState<number | ''>(85);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: 'Midterm', weight: 20, score: 90 },
    { id: 2, name: 'Project', weight: 30, score: 80 },
  ]);
  const [nextId, setNextId] = useState(3);
  const [projectedGrade, setProjectedGrade] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [runConfetti, setRunConfetti] = useState(false);
  const [isPoopEmoji, setIsPoopEmoji] = useState(false);

  const handleAddAssignment = () => {
    setAssignments([...assignments, { id: nextId, name: '', weight: '', score: '' }]);
    setNextId(nextId + 1);
  };

  const handleRemoveAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const handleAssignmentChange = (id: number, field: keyof Omit<Assignment, 'id'>, value: string) => {
    const numericValue = value === '' ? '' : parseFloat(value);
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, [field]: numericValue } : a
    ));
  };

  const calculateGrade = () => {
    if (currentGrade === '') return;

    const totalWeightAccountedFor = assignments.reduce((sum, a) => sum + (Number(a.weight) || 0), 0);
    if (totalWeightAccountedFor > 100) {
      alert("Total assignment weight cannot exceed 100%.");
      return;
    }

    const currentGradeWeight = 100 - totalWeightAccountedFor;
    if (currentGradeWeight < 0) {
        alert("Total assignment weight exceeds 100%. Cannot calculate.");
        return;
    }

    let calculatedProjectedGrade = (Number(currentGrade) / 100) * currentGradeWeight;

    for (const assignment of assignments) {
      if (assignment.weight === '' || assignment.score === '') {
        alert("Please fill in weight and score for all assignments.");
        setProjectedGrade(null); // Reset if invalid
        return;
      }
      calculatedProjectedGrade += (Number(assignment.score) / 100) * Number(assignment.weight);
    }

    setProjectedGrade(Math.round(calculatedProjectedGrade * 100) / 100); // Round to two decimal places
    setCopied(false);

    // Trigger confetti
    const isBadGrade = calculatedProjectedGrade < 50;
    setIsPoopEmoji(isBadGrade);
    setRunConfetti(true);
  };

  // Effect to stop confetti after a delay
  useEffect(() => {
    if (runConfetti) {
      const timer = setTimeout(() => {
        setRunConfetti(false);
      }, 5000); // Confetti runs for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [runConfetti]);

  const handleShare = async () => {
    if (projectedGrade === null) return;

    const shareData = {
      title: "My Grade Projection",
      text: `My projected course grade is ${projectedGrade}%! Calculate yours with Grade Final Boss.`,
      url: window.location.href // Share the current page URL
    };

    try {
        // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
        // No need for copied state feedback for native share
        console.log('Successfully shared');
      } else {
        // Fallback to clipboard for unsupported browsers/devices
        await navigator.clipboard.writeText(shareData.text + " \n" + shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback to clipboard copy if native share fails (e.g., user cancels)
      try {
        await navigator.clipboard.writeText(shareData.text + " \n" + shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (copyErr) {
        console.error('Failed to copy text after share error: ', copyErr);
        alert('Sharing failed, and copying to clipboard also failed.');
      }
    }
  };

  // Function to draw the emoji for confetti pieces
  const drawEmoji = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '24px serif'; // Adjust size as needed
    ctx.fillText('💩', 0, 0);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Class Grade Calculator | Grade Final Boss",
    "description": "Calculate how future assignments will affect your course grade. Free, fast, and accurate class grade calculator for students.",
    "applicationCategory": "Education",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "featureList": [
      "Multiple assignment projection",
      "Grade impact visualization",
      "Shareable results" // Assuming share feature will be added
    ],
    "keywords": [
      "class grade calculator",
      "assignment grade calculator",
      "how will my assignment affect my grade",
      "course grade projection",
      "grade prediction tool",
      "assignment weight calculator",
      "grade planner",
      "homework grade impact"
    ],
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    },
    "creator": {
      "@type": "Organization",
      "name": "Grade Final Boss"
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
       {/* Confetti Component */}
       {runConfetti && (
          <ReactConfetti
            width={typeof window !== 'undefined' ? window.innerWidth : 0}
            height={typeof window !== 'undefined' ? window.innerHeight : 0}
            recycle={false}
            numberOfPieces={isPoopEmoji ? 100 : 200}
            gravity={0.1}
            drawShape={isPoopEmoji ? drawEmoji : undefined}
            className="!fixed top-0 left-0 w-full h-full z-50" // Ensure it covers the screen
          />
        )}

        <Head>
            <title>Class Grade Calculator | See How Assignments Impact Your Grade</title>
            <meta name="description" content="Instantly calculate how each assignment will affect your final course grade. Plan your study time strategically and reach your academic goals." />
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Class Grade Calculator</h1>
      <p className="text-center text-muted-foreground mb-6">See how upcoming assignments will impact your overall course grade.</p>

      <Card>
        <CardHeader>
          <CardTitle>Grade Projection</CardTitle>
          <CardDescription>Enter your current grade and upcoming assignment details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentGrade">Current Overall Grade (%)</Label>
            <Input
              id="currentGrade"
              type="number"
              placeholder="e.g., 85"
              value={currentGrade}
              onChange={(e) => setCurrentGrade(e.target.value === '' ? '' : parseFloat(e.target.value))}
              min="0"
              max="100"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Upcoming Assignments</h3>
            {assignments.map((assignment, index) => (
              <div key={assignment.id} className="flex items-end space-x-2 p-3 border rounded-md relative">
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor={`name-${assignment.id}`}>Assignment {index + 1} Name (Optional)</Label>
                    <Input
                      id={`name-${assignment.id}`}
                      placeholder="e.g., Final Exam"
                      value={assignment.name}
                      onChange={(e) => handleAssignmentChange(assignment.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`weight-${assignment.id}`}>Weight (%)</Label>
                    <Input
                      id={`weight-${assignment.id}`}
                      type="number"
                      placeholder="e.g., 25"
                      value={assignment.weight}
                      onChange={(e) => handleAssignmentChange(assignment.id, 'weight', e.target.value)}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`score-${assignment.id}`}>Expected Score (%)</Label>
                    <Input
                      id={`score-${assignment.id}`}
                      type="number"
                      placeholder="e.g., 90"
                      value={assignment.score}
                      onChange={(e) => handleAssignmentChange(assignment.id, 'score', e.target.value)}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                 <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveAssignment(assignment.id)}
                  className="absolute top-1 right-1 h-6 w-6"
                  aria-label="Remove assignment"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddAssignment}>Add Another Assignment</Button>
          </div>

           {projectedGrade !== null && (
            <div className="mt-6 p-4 bg-secondary rounded-md text-center relative">
              <p className="text-muted-foreground">Projected Final Course Grade:</p>
              <p className="text-4xl font-bold mb-2">{projectedGrade}%</p>
               {/* Add visual indicators/celebrations later */}
               <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="absolute top-2 right-2"
                  aria-label="Share projection"
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Share2 className="h-4 w-4 mr-1" />}
                  {copied ? 'Copied!' : 'Share'}
                </Button>
            </div>
          )}

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={calculateGrade}>Calculate Projected Grade</Button>
        </CardFooter>
      </Card>


    </div>
  );
}