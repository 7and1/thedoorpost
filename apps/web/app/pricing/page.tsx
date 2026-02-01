import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — TheDoorpost",
  description:
    "TheDoorpost is 100% free with Turnstile verification. No login required.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What counts as an analysis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each submitted URL and generated report counts as one analysis. Cached reports do not consume additional credits.",
        },
      },
      {
        "@type": "Question",
        name: "Do you store my screenshots?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Screenshots are stored with the report for the retention period of your plan. You can request deletion at any time.",
        },
      },
      {
        "@type": "Question",
        name: "Is TheDoorpost really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. TheDoorpost is free to use and does not require a login.",
        },
      },
    ],
  };
  return (
    <main>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>Pricing</h1>
        <p style={{ color: "var(--muted)" }}>
          100% free. No login. Just verify the Turnstile challenge and run your
          analysis.
        </p>
        <div className="grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Free</h3>
            <p style={{ fontSize: "2rem", margin: "12px 0" }}>$0</p>
            <ul>
              <li>No login required</li>
              <li>Turnstile-protected requests</li>
              <li>Basic reports</li>
              <li>Report retention with cached results</li>
            </ul>
            <a className="button" style={{ marginTop: 12 }} href="/analyze">
              Get Started
            </a>
          </div>
        </div>
        <div className="grid" style={{ marginTop: 32 }}>
          <div className="card">
            <h3>FAQ</h3>
            <div style={{ display: "grid", gap: 16, marginTop: 12 }}>
              <div>
                <strong>What counts as an analysis?</strong>
                <p style={{ color: "var(--muted)" }}>
                  Each submitted URL and generated report counts as one
                  analysis. Cached reports do not consume additional credits.
                </p>
              </div>
              <div>
                <strong>Do you store my screenshots?</strong>
                <p style={{ color: "var(--muted)" }}>
                  Screenshots are stored with the report for the retention
                  period of your plan. You can request deletion at any time.
                </p>
              </div>
              <div>
                <strong>Is TheDoorpost really free?</strong>
                <p style={{ color: "var(--muted)" }}>
                  Yes. TheDoorpost is free to use and does not require a login.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
