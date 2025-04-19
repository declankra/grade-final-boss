// src/app/(guest)/semester-gpa-calculator/page.tsx
// Semester GPA calculator page for guests

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import Head from 'next/head'; // Import Head for metadata
import Link from 'next/link'; // Import Link
import { sendGAEvent } from "@/lib/gtag"; // Import GA utility

// Define the structure for a course
interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number | string; // Allow string temporarily for input binding
}

// Standard US 4.0 GPA Scale Mapping
const GRADE_POINTS: { [key: string]: number } = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

// Available grades for the Select component
const AVAILABLE_GRADES = Object.keys(GRADE_POINTS);

export default function SemesterGPA() {
  const [courses, setCourses] = useState<Course[]>([
    // Start with one empty course row for convenience
    { id: Date.now(), name: '', grade: AVAILABLE_GRADES[1], credits: '' },
  ]);
  const [semesterGPA, setSemesterGPA] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  // Function to add a new course
  const addCourse = useCallback(() => {
    setCourses((prevCourses) => [
      ...prevCourses,
      { id: Date.now(), name: '', grade: AVAILABLE_GRADES[1], credits: '' },
    ]);
  }, []);

  // Function to remove a course
  const removeCourse = useCallback((idToRemove: number) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== idToRemove)
    );
  }, []);

  // Function to update a specific course
  const updateCourse = useCallback(
    (idToUpdate: number, field: keyof Course, value: string | number) => {
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === idToUpdate ? { ...course, [field]: value } : course
        )
      );
      // Send GA Event (only for grade/credits changes, maybe not name?)
      if (field === 'grade' || field === 'credits') {
        sendGAEvent('update_semester_course', { calculator_type: 'semester_gpa', updated_field: field });
      }
    },
    []
  );

  // Calculate GPA whenever courses change
  useEffect(() => {
    let totalPoints = 0;
    let currentTotalCredits = 0;
    let validCoursesExist = false;

    courses.forEach((course) => {
      const credits = parseFloat(String(course.credits)); // Ensure credits is a number
      const gradePoint = GRADE_POINTS[course.grade];

      // Consider a course valid for calculation if credits > 0 and grade has a point value
      if (!isNaN(credits) && credits > 0 && gradePoint !== undefined) {
        totalPoints += gradePoint * credits;
        currentTotalCredits += credits;
        validCoursesExist = true;
      }
    });

    setTotalCredits(currentTotalCredits);

    if (validCoursesExist && currentTotalCredits > 0) {
      const gpa = totalPoints / currentTotalCredits;
      setSemesterGPA(parseFloat(gpa.toFixed(2))); // Round to 2 decimal places
    } else {
      setSemesterGPA(null); // Reset GPA if no valid courses or total credits are zero
    }
  }, [courses]);

  // JSON-LD Schema for SEO
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Semester GPA Calculator | Grade Final Boss",
    "description": "Calculate your semester GPA based on course grades and credit hours. Free, accurate term GPA calculator for students.",
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
      "Course grade input",
      "Credit hour input",
      "GPA point conversion",
      "What-if GPA scenarios",
      "Shareable results" // As per PRD, even if not implemented yet
    ],
    "keywords": [
      "semester gpa calculator",
      "term gpa calculator",
      "gpa calculator",
      "calculate semester gpa",
      "college gpa calculator",
      "university gpa calculator",
      "grade point average calculator",
      "course grade calculator"
    ],
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    },
    "creator": {
      "@type": "Organization",
      "name": "Grade Final Boss"
    }
  }), []);


  return (
    <>
      {/* Use Head component for title, meta description, and JSON-LD */}
      <Head>
         <title>Semester GPA Calculator | Calculate Your Term GPA</title>
         <meta name="description" content="Easily calculate your semester GPA based on course grades and credit hours. See your term performance instantly with our free GPA calculator." />
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
         />
      </Head>
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Semester GPA Calculator</CardTitle>
            <CardDescription>
              Enter your courses, grades, and credit hours for the semester to calculate your GPA.
            </CardDescription>
             {/* Optional: Display Grade Scale */}
             <details className="text-sm text-muted-foreground mt-2">
                <summary>View Grade Scale (4.0)</summary>
                <ul className="list-disc pl-5 mt-1 grid grid-cols-3 gap-x-4">
                  {AVAILABLE_GRADES.map(grade => (
                    <li key={grade}>{grade}: {GRADE_POINTS[grade].toFixed(1)}</li>
                  ))}
                </ul>
             </details>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Course Input Rows */}
              {courses.map((course, index) => (
                <div key={course.id} className="flex flex-col sm:flex-row gap-2 items-center">
                  <Input
                    placeholder={`Course ${index + 1} Name (Optional)`}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="flex-grow"
                  />
                  <Select
                    value={course.grade}
                    onValueChange={(value: string) => updateCourse(course.id, 'grade', value)}
                  >
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_GRADES.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({GRADE_POINTS[grade].toFixed(1)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Credits"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    min="0"
                    step="0.5" // Allow half credits
                    className="w-full sm:w-[100px]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1} // Prevent removing the last row initially
                    aria-label="Remove Course"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {/* Add Course Button */}
            <Button onClick={addCourse} variant="outline" className="mt-4">
              Add Another Course
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between bg-muted/50 p-4 rounded-b-lg">
             <div className="text-sm text-muted-foreground">
                Total Credit Hours: <span className="font-semibold">{totalCredits.toFixed(1)}</span>
             </div>
             <div className="text-lg font-semibold">
                Semester GPA: <span className="text-primary">{semesterGPA !== null ? semesterGPA.toFixed(2) : 'N/A'}</span>
             </div>
          </CardFooter>
        </Card>
        {/* Link to GPA Calculator */}
        <div className="mt-6 text-center">
           <Link href="/gpa-calculator" className="text-sm text-muted-foreground hover:text-primary underline">
               Looking for the Cumulative GPA Calculator?
           </Link>
        </div>
      </div>
    </>
  );
}