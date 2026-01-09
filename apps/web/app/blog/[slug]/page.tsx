import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { posts } from "../../../lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — TheDoorpost`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://thedoorpost.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "TheDoorpost",
    },
    publisher: {
      "@type": "Organization",
      name: "TheDoorpost",
      logo: {
        "@type": "ImageObject",
        url: "https://thedoorpost.com/logo.svg",
      },
    },
    mainEntityOfPage: `https://thedoorpost.com/blog/${post.slug}`,
  };
  return (
    <main>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>{post.title}</h1>
        <p style={{ color: "var(--muted)" }}>
          {post.date} · {post.readingTime}
        </p>
        <div className="card" style={{ marginTop: 24 }}>
          <p style={{ fontSize: "1.05rem" }}>{post.excerpt}</p>
        </div>
        <div style={{ marginTop: 24, display: "grid", gap: 20 }}>
          {post.sections.map((section) => (
            <div key={section.heading} className="card">
              <h2 style={{ fontSize: "1.3rem", marginBottom: 12 }}>
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={`${section.heading}-p-${index}`}
                  style={{ color: "var(--muted)" }}
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul style={{ paddingLeft: 20, color: "var(--muted)" }}>
                  {section.bullets.map((bullet, index) => (
                    <li key={`${section.heading}-b-${index}`}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
