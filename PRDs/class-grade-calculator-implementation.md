# Class-Grade Calculator Implementation Brief

## Overview

The Class-Grade Calculator allows students to calculate how future assignments will impact their overall course grade. The calculator should maintain the clean, minimalist design present in the existing Final Exam Calculator while offering enough flexibility for different grading scenarios.

## Core Functionality

- Input current overall grade percentage
- Add one or multiple upcoming assignments with:
    - Assignment name (optional but helpful)
    - Weight of the assignment (percentage of total grade)
    - Expected/desired score on the assignment
- Calculate and display the projected final course grade after these assignments

## Viral/Shareable Features

- Implement a "Share My Projection" feature allowing students to share their grade calculations via social media with customizable, visually appealing cards
- Create celebratory animations when grade improvements reach certain thresholds

## UI/UX Approach

- Maintain the clean, distraction-free interface established in other calculators
- Use the existing ShadCN UI component library for consistency
- Implement responsive design that works well on mobile devices
- Provide clear visual feedback when grades improve or decline

## Implementation Requirements

### Page Structure

1. Header with page title and brief explanation
2. Calculator card with input fields
3. Add/remove assignment functionality
4. Calculate button
5. Results display with visual indicators
6. Save button (for authenticated users)

### Technical Considerations

- Implement using the existing React component patterns
- Create a new context provider if needed for complex state management
- Ensure proper form validation and error handling

### Integration Points

- Integrate with authentication system for saving calculations
- Use the existing CalculationContext pattern for state management
- Follow the established route structure for both guest and authenticated paths

## Essence of Simplicity

- Primary focus on the calculator itself with minimal distractions
- Every UI element should serve a clear purpose and provide immediate value
- Progressive disclosure of advanced features only when needed
- Clear, guided user flow that intuitively leads to results

### Non-goals:

- no need to allow user to save calculation

## SEO Implementation

- Implement the following JSON-LD structured data for rich search results:

{
"@context": "[https://schema.org](https://schema.org/)",
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
"Save and track progress",
"Shareable results"
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
}

- Title: "Class Grade Calculator | See How Assignments Impact Your Grade"
- Description: "Instantly calculate how each assignment will affect your final course grade. Plan your study time strategically and reach your academic goals."