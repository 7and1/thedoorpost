import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { posts } from "../../../lib/posts";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>{post.title}</h1>
        <p style={{ color: "var(--muted)" }}>{post.date}</p>
        <div className="card" style={{ marginTop: 24 }}>
          <p>{post.excerpt}</p>
          <p style={{ color: "var(--muted)" }}>
            This is a placeholder draft. Replace with full content in the CMS or
            markdown pipeline.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
