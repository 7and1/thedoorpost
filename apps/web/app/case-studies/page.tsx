import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Case Studies — TheDoorpost",
  description:
    "Real results from companies that used TheDoorpost to optimize their landing pages and increase conversion rates.",
  alternates: {
    canonical: "/case-studies",
  },
};

const caseStudies = [
  {
    slug: "techflow-34-percent-conversion-increase",
    company: "TechFlow",
    industry: "B2B SaaS",
    result: "34% Conversion Rate Increase",
    excerpt:
      "How TechFlow used TheDoorpost to identify critical hero section issues and increase conversions by 34% in two weeks.",
    image: "🚀",
  },
  {
    slug: "launchkit-62-to-91-score",
    company: "LaunchKit",
    industry: "Startup Tools",
    result: "62 to 91 Score Improvement",
    excerpt:
      "LaunchKit scored 62 on their initial analysis. After implementing TheDoorpost recommendations, they hit 91 and saw immediate campaign performance improvements.",
    image: "📈",
  },
  {
    slug: "conversion-lab-agency-workflow",
    company: "Conversion Lab",
    industry: "Marketing Agency",
    result: "5 Hours Saved Per Client",
    excerpt:
      "How Conversion Lab integrated TheDoorpost into their client workflow and now delivers professional CRO audits in minutes instead of hours.",
    image: "⚡",
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 16 }}>
          Case Studies
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem", maxWidth: 700 }}>
          Real results from companies that used TheDoorpost to optimize their landing pages and increase conversion rates. See how they identified issues, implemented fixes, and measured impact.
        </p>
      </section>

      <section className="section">
        <div style={{ display: "grid", gap: 24 }}>
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="card"
              style={{
                textDecoration: "none",
                color: "inherit",
                borderLeft: "4px solid var(--primary)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    flexShrink: 0,
                  }}
                >
                  {study.image}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        padding: "4px 12px",
                        background: "var(--primary)",
                        color: "white",
                        borderRadius: 4,
                      }}
                    >
                      {study.industry}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        padding: "4px 12px",
                        background: "var(--muted)",
                        color: "white",
                        borderRadius: 4,
                      }}
                    >
                      {study.result}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.5rem", marginBottom: 8 }}>
                    {study.company}
                  </h2>
                  <p style={{ color: "var(--muted)" }}>{study.excerpt}</p>
                  <p
                    style={{
                      marginTop: 12,
                      color: "var(--primary)",
                      fontWeight: 500,
                    }}
                  >
                    Read case study →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Ready to Improve Your Conversions?
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24, maxWidth: 600, margin: "0 auto 24px" }}>
          Join these companies and thousands of others who use TheDoorpost to optimize their landing pages. Get your free analysis in 30 seconds.
        </p>
        <a className="button" href="/analyze" style={{ fontSize: "1.1rem", padding: "14px 32px" }}>
          Analyze Your Landing Page
        </a>
      </section>

      <Footer />
    </main>
  );
}
