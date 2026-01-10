import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnalyzerForm from "../components/AnalyzerForm";

export const metadata: Metadata = {
  title: "TheDoorpost — Free Above-the-Fold Analyzer | CRO Tool",
  description:
    "Analyze your landing page hero section in 30 seconds. Get instant CRO scores, screenshots, and actionable fixes. Free tool for marketers and designers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TheDoorpost — Free Above-the-Fold Analyzer",
    description:
      "Score your hero section and get actionable CRO fixes in seconds.",
    url: "https://thedoorpost.com",
    siteName: "TheDoorpost",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheDoorpost — Free Above-the-Fold Analyzer",
    description:
      "Score your hero section and get actionable CRO fixes in seconds.",
    images: ["/og.png"],
  },
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section className="hero">
        <div>
          <div className="badge">⚡ Above-the-Fold Analyzer</div>
          <h1 style={{ fontSize: "3rem", margin: "16px 0" }}>
            Your First Impression Matters. Assess It in 30 Seconds.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>
            TheDoorpost captures your above-the-fold area and delivers
            professional CRO scoring with actionable improvement suggestions.
            Know instantly if your hero section is clear, credible, and
            conversion-focused.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <a className="button" href="/analyze">
              Analyze Now
            </a>
            <a className="button secondary" href="/pricing">
              View Pricing
            </a>
          </div>
        </div>
        <div className="hero-card">
          <h3>Quick Analysis</h3>
          <p style={{ color: "var(--muted)" }}>
            Enter a URL and see real-time progress, scores, and screenshots.
          </p>
          <AnalyzerForm />
        </div>
      </section>

      <section className="section">
        <div className="grid grid-2">
          <div className="card">
            <h3>Structured Insights</h3>
            <p>
              Scoring broken down into value proposition, CTA visibility, and
              trust design.
            </p>
          </div>
          <div className="card">
            <h3>Instant Suggestions</h3>
            <p>
              Three prioritized fix recommendations pointing directly to
              actionable changes.
            </p>
          </div>
          <div className="card">
            <h3>Easy Sharing</h3>
            <p>
              Every report has a publicly accessible URL, perfect for team
              collaboration and client reporting.
            </p>
          </div>
          <div className="card">
            <h3>SEO-Driven Growth</h3>
            <p>
              Industry pages and case studies help you continuously drive
              traffic and build a content flywheel.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
