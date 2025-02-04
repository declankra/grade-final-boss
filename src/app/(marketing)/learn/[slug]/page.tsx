// src/app/(marketing)/learn/[slug]/page.tsx
import { Metadata } from 'next'

// Define the Learn interface for future use
interface Learn {
  slug: string
  title: string
  description: string
  keywords: string[]
  image: string
  url: string
}

// Hardcode valid slugs for development
const validSlugs = [
  'gpa-calculation',
  'final-grade-calculation',
  'semester-planning',
  'study-strategies'
]

export async function generateStaticParams() {
  // Return hardcoded slugs during development
  return validSlugs.map((slug) => ({
    slug,
  }))
}

// Placeholder data generator
function getPlaceholderData(slug: string): Learn {
  return {
    slug,
    title: `${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
    description: `Learn about ${slug.replace(/-/g, ' ')} with Grade Final Boss.`,
    keywords: ['grades', 'education', 'calculator', slug.replace(/-/g, ' ')],
    image: '/placeholder.jpg',
    url: `https://gradefinalboss.com/learn/${slug}`,
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const learn = getPlaceholderData(params.slug)
  
  return {
    title: `${learn.title} | Grade Final Boss`,
    description: learn.description,
    keywords: learn.keywords,
    openGraph: {
      title: learn.title,
      description: learn.description,
      images: [learn.image],
      url: learn.url,
      type: 'article',
      siteName: 'Grade Final Boss',
    },
  }
}

export default function LearnPage({ params }: { params: { slug: string } }) {
  // For development, show a placeholder page
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Coming Soon: {params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </h1>
      <p className="text-gray-600 mb-8">
        This learning resource is currently under development. Check back soon!
      </p>
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-800">
          Placeholder content for {params.slug} learning page.
        </p>
      </div>
    </div>
  )
}

/*
// First, let's define a complete Learn interface
interface Learn {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
}

// This is the correct way to handle static params in App Router
export async function generateStaticParams() {
  try {
    // Try to fetch from API first (REPLACE WITH YOUR ACTUAL API ENDPOINT)
    const posts = await fetch('https://www.gradefinalboss.com/api/learn').then((res) => res.json());
    
    return posts.map((post: Learn) => ({
      slug: post.slug,
    }));
  } catch (error) {
    // Fallback to hardcoded slugs if API fails
    console.log('Falling back to static slugs:', error);
    return [
      { slug: 'gpa-calculation' },
      { slug: 'final-grade-calculation' },
      // Add other valid slugs your learn section uses
    ];
  }
}

// This replaces getStaticProps in App Router - it must be named 'page'
export default async function Page({ params }: { params: { slug: string } }) {
  // Replace with your actual API endpoint
  const learn: Learn = await fetch(
    `https://www.gradefinalboss.com/api/learn/${params.slug}`
  ).then((res) => res.json());

  return (
    <>
      // Note: Head component is not needed in App Router - use metadata export instead 
      <title>{learn.title} | Grade Final Boss</title>
      <meta name="description" content={learn.description} />
      <meta name="keywords" content={learn.keywords} />
      <meta name="author" content="Grade Final Boss" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="generator" content="Grade Final Boss" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="content-language" content="en" />
        <meta name="og:title" content={learn.title} />
        <meta name="og:description" content={learn.description} />
        <meta name="og:image" content={learn.image} />
        <meta name="og:url" content={learn.url} />
        <meta name="og:type" content="article" />
        <meta name="og:site_name" content="Grade Final Boss" />
    </>
  );
}

// You can also export metadata configuration
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const learn: Learn = await fetch(
    `https://www.gradefinalboss.com/api/learn/${params.slug}`
  ).then((res) => res.json());

  return {
    title: `${learn.title} | Grade Final Boss`,
    description: learn.description,
    keywords: learn.keywords,
    openGraph: {
      title: learn.title,
      description: learn.description,
      images: [learn.image],
      url: learn.url,
      type: 'article',
      siteName: 'Grade Final Boss',
    },
    // ... other metadata
  };
}
*/