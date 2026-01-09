import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AnalyzerForm from "../../components/AnalyzerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze Above-the-Fold — TheDoorpost",
  description:
    "Run a fast above-the-fold audit and get instant CRO scores, screenshots, and fixes.",
  alternates: {
    canonical: "/analyze",
  },
};

export default function AnalyzePage() {
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>
          Analyze your Above-the-Fold
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Real-time progress feedback. Scores appear first, recommendations
          follow.
        </p>
        <div style={{ marginTop: 24 }}>
          <AnalyzerForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
