import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { posts } from "../../lib/posts";

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>Doorpost Blog</h1>
        <div className="grid" style={{ gap: 16 }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card">
              <strong>{post.title}</strong>
              <p style={{ color: "var(--muted)" }}>{post.excerpt}</p>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
