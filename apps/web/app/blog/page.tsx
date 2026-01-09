import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { posts } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Doorpost Blog — CRO Tactics and Above-the-Fold Strategy",
  description:
    "Actionable CRO guidance, hero section teardowns, and optimization frameworks from TheDoorpost.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>Doorpost Blog</h1>
        <div className="grid" style={{ gap: 16 }}>
          {sortedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card">
              <strong>{post.title}</strong>
              <p style={{ color: "var(--muted)" }}>{post.excerpt}</p>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                {post.date} · {post.readingTime}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
