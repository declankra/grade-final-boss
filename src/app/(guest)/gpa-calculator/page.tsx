// src/app/(guest)/gpa-calculator/page.tsx
// GPA calculator page for guests

'use client';

import React, { useState, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import Head from 'next/head';

interface Course {
  id: string;
  name: string;
  grade: string; // Use string to accommodate letter grades initially
  credits: string; // Use string initially for input flexibility
}

const gradeToPoints: { [key: string]: number } = {
  'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0,
  'F': 0.0,
};

const isValidGrade = (grade: string): boolean => {
  const numericGrade = parseFloat(grade);
  if (!isNaN(numericGrade) && numericGrade >= 0 && numericGrade <= 4.0) { // Allow direct numeric input too
    return true;
  }
  return grade.toUpperCase() in gradeToPoints;
};

const getGradePoints = (grade: string): number => {
    const upperGrade = grade.toUpperCase();
    if (upperGrade in gradeToPoints) {
        return gradeToPoints[upperGrade];
    }
    const numericGrade = parseFloat(grade);
    if (!isNaN(numericGrade) && numericGrade >= 0 && numericGrade <= 4.0) {
        return numericGrade; // Assume valid numeric grade if it passes validation
    }
    return 0; // Default or error case
};

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([{ id: useId(), name: '', grade: '', credits: '' }]);
  const [priorGpa, setPriorGpa] = useState<string>('');
  const [priorCredits, setPriorCredits] = useState<string>('');
  const [semesterGpa, setSemesterGpa] = useState<number | null>(null);
  const [cumulativeGpa, setCumulativeGpa] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addCourse = () => {
    setCourses([...courses, { id: useId(), name: '', grade: '', credits: '' }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleCourseChange = (id: string, field: keyof Omit<Course, 'id'>, value: string) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
     // Reset results when inputs change
     setSemesterGpa(null);
     setCumulativeGpa(null);
     setError(null);
  };

  const handlePriorGpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriorGpa(e.target.value);
    setCumulativeGpa(null); // Reset cumulative when prior changes
    setError(null);
  }

  const handlePriorCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriorCredits(e.target.value);
    setCumulativeGpa(null); // Reset cumulative when prior changes
    setError(null);
  }

  const calculateGpa = () => {
    setError(null);
    let totalPoints = 0;
    let totalCredits = 0;
    let validInputs = true;

    // Validate prior GPA/Credits if entered
    const priorGpaNum = parseFloat(priorGpa);
    const priorCreditsNum = parseFloat(priorCredits);
    const hasPriorInfo = priorGpa.trim() !== '' || priorCredits.trim() !== '';
    const hasCompletePriorInfo = priorGpa.trim() !== '' && priorCredits.trim() !== '';

    if (hasPriorInfo && !hasCompletePriorInfo) {
        setError('Please enter both prior GPA and prior credits, or leave both blank.');
        validInputs = false;
    } else if (hasCompletePriorInfo) {
        if (isNaN(priorGpaNum) || priorGpaNum < 0 || priorGpaNum > 5.0) { // Allow slightly higher scale just in case
            setError('Prior GPA must be a valid number (e.g., 0.0 - 4.0).');
            validInputs = false;
        }
        if (isNaN(priorCreditsNum) || priorCreditsNum < 0) {
            setError('Prior credits must be a non-negative number.');
            validInputs = false;
        }
    }


    if (courses.length === 0) {
        setError('Please add at least one course.');
        validInputs = false;
    }


    courses.forEach((course, index) => {
      const creditsNum = parseFloat(course.credits);
      const gradeStr = course.grade.trim();

      if (gradeStr === '' || course.credits.trim() === '') {
          setError(`Course ${index + 1}: Please enter both grade and credits.`);
          validInputs = false;
          return; // Stop processing this course
      }


      if (!isValidGrade(gradeStr)) {
        setError(`Course ${index + 1}: Invalid grade format. Use A, B+, 3.7, etc.`);
        validInputs = false;
        return;
      }
      if (isNaN(creditsNum) || creditsNum <= 0) {
        setError(`Course ${index + 1}: Credit hours must be a positive number.`);
        validInputs = false;
        return;
      }

      if (validInputs) { // Only add if inputs for this course are valid so far
        const points = getGradePoints(gradeStr);
        totalPoints += points * creditsNum;
        totalCredits += creditsNum;
      }
    });

    if (!validInputs) {
        setSemesterGpa(null);
        setCumulativeGpa(null);
        return; // Stop calculation if any validation failed
    }


    if (totalCredits === 0 && courses.length > 0) {
         // This case might happen if validation logic had an issue, safeguard here.
         setError('Total semester credits cannot be zero.');
         setSemesterGpa(null);
         setCumulativeGpa(null);
         return;
    } else if (totalCredits > 0) {
         const calculatedSemesterGpa = totalPoints / totalCredits;
         setSemesterGpa(calculatedSemesterGpa);


         if (hasCompletePriorInfo && !isNaN(priorGpaNum) && !isNaN(priorCreditsNum) && priorCreditsNum >= 0) {
             const totalPriorQualityPoints = priorGpaNum * priorCreditsNum;
             const totalCombinedCredits = priorCreditsNum + totalCredits;
             const calculatedCumulativeGpa = (totalPriorQualityPoints + totalPoints) / totalCombinedCredits;
             setCumulativeGpa(calculatedCumulativeGpa);
         } else {
            setCumulativeGpa(null); // No prior info, only semester GPA is calculated
         }
    } else {
        // No courses entered or total credits are zero (and validation didn't catch it)
        setSemesterGpa(null);
        setCumulativeGpa(null);
        if (!error && courses.length > 0) setError("Calculation error: Could not calculate GPA."); // Generic error if no specific one was set
        else if (!error && courses.length === 0) setError("Please add courses to calculate GPA.");
    }


  };

  const handleShare = async () => {
    if (!navigator.share) {
      console.log('Web Share API not supported in this browser.');
      // Optionally: Implement a fallback, like copying to clipboard
      // alert('Sharing not supported on this browser. You could copy the results manually.');
      return;
    }

    let shareText = `Check out my GPA results from Grade Final Boss!`;
    if (semesterGpa !== null) {
      shareText += `\nSemester GPA: ${semesterGpa.toFixed(3)}`;
    }
    if (cumulativeGpa !== null) {
      shareText += `\nCumulative GPA: ${cumulativeGpa.toFixed(3)}`;
    }

    try {
      await navigator.share({
        title: 'My GPA Calculation',
        text: shareText,
        url: window.location.href,
      });
      console.log('GPA shared successfully');
    } catch (error) {
      console.error('Error sharing GPA:', error);
      // Handle errors (e.g., user cancelled share)
      // alert(`Could not share: ${error}`);
    }
  };

  const gpaJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "GPA Calculator | Grade Final Boss",
      "description": "Calculate your semester and cumulative GPA quickly and accurately. Free GPA calculator for college and university students.",
      "applicationCategory": "Education",
      "operatingSystem": "Any",
      "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
      },
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "featureList": [
          "Semester GPA calculation",
          "Cumulative GPA calculation",
          "Support for letter and numeric grades",
          "Credit hour input",
          "Optional prior GPA input"
          // "Shareable results" // Not implemented yet
      ],
      "keywords": [
          "gpa calculator",
          "college gpa calculator",
          "semester gpa calculator",
          "cumulative gpa calculator",
          "calculate my gpa",
          "grade point average calculator",
          "university gpa tool",
          "gpa predictor"
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
    <>
       <Head>
            <title>GPA Calculator | Calculate Your Semester & Cumulative GPA</title>
            <meta name="description" content="Free and easy GPA calculator. Input your course grades and credits to find your semester and cumulative GPA instantly. Plan your academic success!" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gpaJsonLd) }} />
       </Head>
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">GPA Calculator</CardTitle>
            <CardDescription>Calculate your semester and cumulative GPA.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prior GPA Section */}
            <div className="space-y-4 p-4 border rounded-md bg-muted/40">
              <h3 className="text-lg font-semibold">Prior Academic Record (Optional)</h3>
              <p className="text-sm text-muted-foreground">
                Enter your cumulative GPA and total credits earned *before* this semester to calculate your new cumulative GPA. Leave blank if not applicable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prior-gpa">Prior Cumulative GPA</Label>
                  <Input
                    id="prior-gpa"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 3.50"
                    value={priorGpa}
                    onChange={handlePriorGpaChange}
                    aria-label="Prior Cumulative GPA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prior-credits">Prior Total Credits</Label>
                  <Input
                    id="prior-credits"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 60"
                    value={priorCredits}
                    onChange={handlePriorCreditsChange}
                     aria-label="Prior Total Credits Earned"
                  />
                </div>
              </div>
            </div>

            {/* Current Semester Courses Section */}
            <div className="space-y-4">
               <h3 className="text-lg font-semibold">Current Semester Courses</h3>
              {courses.map((course, index) => (
                <div key={course.id} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 p-3 border rounded-md relative">
                  <div className="flex-grow w-full sm:w-auto space-y-1">
                    <Label htmlFor={`course-name-${course.id}`} className="text-xs">Course Name (Optional)</Label>
                    <Input
                      id={`course-name-${course.id}`}
                      placeholder={`Course ${index + 1}`}
                      value={course.name}
                      onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                       aria-label={`Course ${index + 1} Name`}
                    />
                  </div>
                  <div className="space-y-1 w-full sm:w-32">
                     <Label htmlFor={`grade-${course.id}`} className="text-xs">Grade</Label>
                     <Input
                       id={`grade-${course.id}`}
                       placeholder="e.g., A-, B+, 3.7"
                       value={course.grade}
                       onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)}
                       required
                       aria-label={`Course ${index + 1} Grade`}
                     />
                  </div>
                  <div className="space-y-1 w-full sm:w-28">
                     <Label htmlFor={`credits-${course.id}`} className="text-xs">Credits</Label>
                    <Input
                      id={`credits-${course.id}`}
                      type="number"
                      step="0.1"
                      placeholder="e.g., 3"
                      value={course.credits}
                      onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                      required
                      aria-label={`Course ${index + 1} Credits`}
                    />
                  </div>
                   <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCourse(course.id)}
                        className="absolute top-1 right-1 sm:static sm:ml-2 text-muted-foreground hover:text-destructive h-8 w-8"
                        aria-label={`Remove Course ${index + 1}`}
                    >
                        <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addCourse}>+ Add Course</Button>
            </div>

             {/* Error Display */}
             {error && (
                <p className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
             )}


            {/* Calculate Button */}
            <Button onClick={calculateGpa} className="w-full sm:w-auto" size="lg">Calculate GPA</Button>

            {/* Results Section */}
            {(semesterGpa !== null || cumulativeGpa !== null) && (
              <div className="space-y-4 p-4 border rounded-md">
                 <h3 className="text-lg font-semibold">Results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {semesterGpa !== null && (
                     <div className="p-4 rounded-lg bg-background border">
                       <p className="text-sm font-medium text-muted-foreground">Semester GPA</p>
                       <p className="text-3xl font-bold text-primary">{semesterGpa.toFixed(3)}</p>
                     </div>
                   )}
                   {cumulativeGpa !== null && (
                    <div className="p-4 rounded-lg bg-background border">
                       <p className="text-sm font-medium text-muted-foreground">New Cumulative GPA</p>
                       <p className="text-3xl font-bold text-primary">{cumulativeGpa.toFixed(3)}</p>
                     </div>
                   )}
                </div>
                 {cumulativeGpa === null && priorGpa.trim() !== '' && priorCredits.trim() !== '' && semesterGpa !== null && (
                    <p className="text-sm text-muted-foreground">Cumulative GPA calculated based on prior info and current semester.</p>
                 )}
                 {cumulativeGpa === null && (priorGpa.trim() === '' || priorCredits.trim() === '') && semesterGpa !== null && (
                    <p className="text-sm text-muted-foreground">Enter prior GPA and credits to calculate new cumulative GPA.</p>
                 )}
              </div>
            )}
          </CardContent>
          {(semesterGpa !== null) && (
            <CardFooter className="pt-6">
                 <Button
                    className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
                    onClick={handleShare}
                 >
                    Share My GPA
                 </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
}