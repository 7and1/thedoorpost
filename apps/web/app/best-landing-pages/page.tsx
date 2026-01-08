import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.thedoorpost.com";
export const dynamic = "force-dynamic";

async function getBest() {
  const res = await fetch(`${API_BASE}/api/aggregate/best`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return { items: [] };
  return res.json() as Promise<{
    items: Array<{
      id: string;
      url: string;
      score: number;
      summary: string;
      image: string;
    }>;
  }>;
}

export const metadata: Metadata = {
  title: "Best Landing Pages 2026 — TheDoorpost Gallery",
  description:
    "Showcase of landing pages scoring 90+ on above-the-fold analysis.",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function BestLandingPages() {
  const { items } = await getBest();
  const hasNoData = items.length === 0;
  return (
    <>
      {hasNoData && <meta name="robots" content="noindex, follow" />}
      <main>
        <Navbar />
        <section className="section">
          <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>
            Best Landing Pages 2026
          </h1>
          <p style={{ color: "var(--muted)" }}>
            A showcase of hero sections scoring 90+. Updated regularly.
          </p>
          <div className="grid grid-2" style={{ marginTop: 24 }}>
            {items.length === 0 && (
              <div className="card">
                No data yet. High-scoring examples will be displayed here soon.
              </div>
            )}
            {items.map((item) => (
              <div key={item.id} className="card">
                <img
                  src={item.image}
                  alt={item.url}
                  style={{ width: "100%", borderRadius: 12 }}
                />
                <div style={{ marginTop: 12, fontWeight: 600 }}>
                  {item.score}/100
                </div>
                <div style={{ color: "var(--muted)" }}>{item.summary}</div>
                <a
                  href={item.url}
                  style={{ fontSize: "0.9rem", color: "var(--primary)" }}
                >
                  Visit site
                </a>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
