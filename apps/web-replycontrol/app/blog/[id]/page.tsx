/**
 * Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
 * For maximum performance and SEO
 */

import { cache } from 'react';

// Reusable data fetching function with React cache
const getData = cache(async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/data/${id}`,
      {
        next: {
          revalidate: parseInt(process.env.ISR_REVALIDATE_SECONDS || '3600', 10),
        },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (error) {
    console.error('Data fetch error:', error);
    return null;
  }
});

// ===== STATIC PAGE EXAMPLE =====
export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  if (!data) {
    return <div>Data not found</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

// Static params generation for SSG
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data/all`);
    const data = await res.json();

    return data.map((item: any) => ({
      id: item.id.toString(),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// Metadata generation for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  if (!data) {
    return {
      title: 'Not Found',
      description: 'The requested page was not found',
    };
  }

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      image: data.image,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      image: data.image,
    },
  };
}

// Revalidate on-demand
export const revalidate = parseInt(process.env.ISR_REVALIDATE_SECONDS || '3600', 10);
