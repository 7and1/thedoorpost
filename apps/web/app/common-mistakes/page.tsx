import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.thedoorpost.com";
export const dynamic = "force-dynamic";

async function getMistakes() {
  const res = await fetch(`${API_BASE}/api/aggregate/common-mistakes`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return { items: [] };
  return res.json() as Promise<{
    items: Array<{ title: string; count: number }>;
    updated_at?: number;
  }>;
}

export const metadata: Metadata = {
  title: "Common Landing Page Mistakes — TheDoorpost Insights",
  description:
    "Frequent issues found in low-scoring hero sections, aggregated from real analyses.",
  alternates: {
    canonical: "/common-mistakes",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function CommonMistakes() {
  const { items, updated_at } = await getMistakes();
  const hasNoData = items.length === 0;
  const updatedLabel =
    updated_at && Number.isFinite(updated_at)
      ? new Date(updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;
  return (
    <>
      {hasNoData && <meta name="robots" content="noindex, follow" />}
      <main>
        <Navbar />
        <section className="section">
          <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>
            Common Mistakes
          </h1>
          <p style={{ color: "var(--muted)" }}>
            Frequent issues aggregated from low-scoring reports.
          </p>
          {updatedLabel && (
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              Last updated: {updatedLabel}
            </p>
          )}
          <div className="grid" style={{ marginTop: 24 }}>
            {items.length === 0 && (
              <div className="card">
                No data yet. Aggregation will appear here automatically.
              </div>
            )}
            {items.map((item) => (
              <div
                key={item.title}
                className="card"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <strong>{item.title}</strong>
                <span style={{ color: "var(--muted)" }}>
                  {item.count} occurrences
                </span>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
