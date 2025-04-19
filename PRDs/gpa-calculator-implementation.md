# GPA Calculator Implementation Brief

## Overview

The GPA Calculator allows students to calculate their semester and cumulative Grade Point Average (GPA). It provides flexibility for including past academic performance to get a comprehensive view. The calculator should maintain the clean, minimalist design present in the existing calculators.

## Core Functionality

- Input a list of courses for the current semester/term:
    - Course name (optional)
    - Letter grade (e.g., A, B+, C) or numeric grade (e.g., 4.0, 3.3, 2.0) received for the course. Provide a standard conversion scale (e.g., A=4.0, A-=3.7, B+=3.3, etc.) or allow customization.
    - Credit hours for the course.
- Optionally input existing cumulative GPA and total credit hours completed prior to the current semester.
- Calculate and display:
    - Semester GPA based only on the courses entered.
    - New cumulative GPA, factoring in prior GPA and credits if provided.

## Viral/Shareable Features

- Implement a "Share My GPA" feature allowing students to share their calculated GPA (semester and/or cumulative) via social media using visually appealing cards.
- Consider adding goal-setting features, like "What GPA do I need this semester to reach a cumulative X.X?"

## UI/UX Approach

- Maintain the clean, distraction-free interface established in other calculators.
- Use the existing ShadCN UI component library for consistency.
- Implement responsive design that works well on mobile devices.
- Provide clear visual feedback for both semester and cumulative GPA results.
- Allow easy addition/removal of courses.
- Clearly label optional fields for prior GPA/credits.

## Implementation Requirements

### Page Structure

1.  Header with page title ("GPA Calculator") and brief explanation.
2.  Input section for prior cumulative GPA and total credits (clearly marked as optional).
3.  Input section for current semester courses:
    - A dynamic list allowing users to add/remove course rows.
    - Each row includes fields for Course Name (optional), Grade, and Credit Hours.
4.  Calculate button.
5.  Results display area showing:
    - Semester GPA.
    - Cumulative GPA (only if prior data was entered).
6.  (Optional) Save button for authenticated users.

### Technical Considerations

- Implement using existing React component patterns.
- Manage the list of courses and prior GPA state effectively (potentially using `useState` for simple cases or a reducer/context for more complex logic).
- Implement robust input validation:
    - Ensure grades are valid (either from a predefined list/scale or numeric).
    - Ensure credit hours are positive numbers.
    - Ensure prior GPA (if entered) is a valid GPA value (e.g., 0.0-4.0 or higher depending on scale).
    - Ensure prior credits (if entered) are non-negative numbers.
- Define the grade point conversion scale clearly (e.g., A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, F=0.0). Consider allowing users to select variations (e.g., +/- system or not).

### Calculation Logic

- **Semester GPA:** Sum of (Grade Points * Credit Hours) for all entered courses / Total Semester Credit Hours.
- **Cumulative GPA:** ( (Prior GPA * Prior Credits) + (Semester GPA * Semester Credits) ) / (Prior Credits + Semester Credits). Handle the case where prior GPA/credits are not provided.

### Integration Points

- (Optional) Integrate with authentication system for saving calculations.
- Follow the established route structure.

## Essence of Simplicity

- Focus on easy input of courses and clear display of results.
- Minimize clutter; guide the user through entering course data.
- Make the distinction between semester and cumulative GPA calculations obvious.
- Provide helpful tooltips or placeholders for grade formats and credit hours.

### Non-goals:

- Calculating GPA based on complex weighting systems specific to certain institutions (unless explicitly requested later).
- Storing historical GPA data semester over semester beyond a single save action.
- Allow user to save calculation.

## SEO Implementation

- Implement the following JSON-LD structured data for rich search results:

{
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
    "Optional prior GPA input",
    "Shareable results"
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
}

- Title: "GPA Calculator | Calculate Your Semester & Cumulative GPA"
- Description: "Free and easy GPA calculator. Input your course grades and credits to find your semester and cumulative GPA instantly. Plan your academic success!"
