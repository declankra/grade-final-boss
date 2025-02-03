// Add this interface above the function
interface Learn {
  slug: string;
}

export async function generateStaticParams() {
    const posts = await fetch('https://.../learn').then((res) => res.json())
   
    return posts.map((post: Learn) => ({
      slug: post.slug,
    }))
  }

// Here's an example of a page optimized for this using SSG:
// pages/learn/[slug].js

 
import Head from 'next/head';
 
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://www.example.com/api/learn');
  const posts = await res.json();
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: Learn) => ({
    params: { slug: post.slug },
  }));
  // Set fallback to blocking. Now any new post added post build will SSR
  // to ensure SEO. It will then be static for all subsequent requests
  return { paths, fallback: 'blocking' };
}
 
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://www.example.com/api/learn/${params.slug}`);
  const data = await res.json();
 
  return {
    props: {
      learn: data,
    },
  };
}
 
function LearnPost ({ learn }: { learn: Learn }) {
  return (
    <>
      <Head>
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
        {/* Add more meta tags as needed */}
      </Head>
    </>
  );
}
 
export default LearnPost;