import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — TheDoorpost",
  description:
    "Transparent pricing for above-the-fold CRO analysis. Start free, upgrade when you need higher volume.",
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
        name: "Can I cancel anytime?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can cancel or downgrade at any time and keep access through the end of your billing cycle.",
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
          Simple, transparent pricing. Start for free.
        </p>
        <div className="grid grid-2" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Starter</h3>
            <p style={{ fontSize: "2rem", margin: "12px 0" }}>$0</p>
            <ul>
              <li>10 analyses per month</li>
              <li>Basic reports</li>
              <li>7-day report retention</li>
            </ul>
            <a className="button" style={{ marginTop: 12 }} href="/analyze">
              Get Started
            </a>
          </div>
          <div className="card" style={{ borderColor: "#1d4ed8" }}>
            <h3>Pro</h3>
            <p style={{ fontSize: "2rem", margin: "12px 0" }}>$29/mo</p>
            <ul>
              <li>200 analyses per month</li>
              <li>Full reports + export</li>
              <li>12-month report retention</li>
            </ul>
            <a className="button" style={{ marginTop: 12 }} href="/contact">
              Contact Us
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
                <strong>Can I cancel anytime?</strong>
                <p style={{ color: "var(--muted)" }}>
                  Yes. You can cancel or downgrade at any time and keep access
                  through the end of your billing cycle.
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
