import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const metadata: Metadata = {
  title: "TechFlow Case Study: 34% Conversion Rate Increase — TheDoorpost",
  description:
    "How TechFlow used TheDoorpost to identify critical hero section issues and increase conversions by 34% in two weeks.",
  alternates: {
    canonical: "/case-studies/techflow-34-percent-conversion-increase",
  },
};

export default function TechFlowCaseStudy() {
  return (
    <main>
      <Navbar />
      <section className="section">
        <div style={{ marginBottom: 24 }}>
          <span
            style={{
              fontSize: "0.85rem",
              padding: "4px 12px",
              background: "var(--primary)",
              color: "white",
              borderRadius: 4,
            }}
          >
            B2B SaaS
          </span>
        </div>
        <h1 style={{ fontSize: "2.4rem", marginBottom: 16 }}>
          How TechFlow Increased Conversions by 34% in Two Weeks
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
          TechFlow used TheDoorpost to identify three critical issues in their hero section. After implementing the recommended fixes, they saw a 34% increase in trial signups.
        </p>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Company Background
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            TechFlow is a B2B SaaS platform that helps software teams automate their deployment pipelines. They had been running paid ads to their landing page for three months with disappointing results—a 2.1% conversion rate that was costing them $180 per trial signup.
          </p>
          <p style={{ color: "var(--muted)" }}>
            Sarah Chen, their Growth Lead, knew something was wrong with their landing page but could not pinpoint the issue. Traditional analytics showed high bounce rates (68%) but did not explain why visitors were leaving.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            The Problem
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            TechFlow's landing page had a fundamental clarity problem. Their headline read "Accelerate Your Development Velocity" which sounded impressive but communicated nothing concrete. Visitors could not understand what TechFlow actually did within the critical first 3 seconds.
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            Sarah ran their landing page through TheDoorpost and received a score of 58/100. The analysis identified three critical issues:
          </p>
          <ul style={{ paddingLeft: 20, color: "var(--muted)" }}>
            <li style={{ marginBottom: 8 }}>
              <strong>Vague value proposition:</strong> The headline used jargon ("development velocity") instead of explaining the actual outcome (faster deployments).
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Hidden CTA on mobile:</strong> The primary CTA button was below the fold on mobile devices, which accounted for 62% of their traffic.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Missing trust signals:</strong> No social proof was visible above the fold, making the page feel unproven and risky.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            The Solution
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            Based on TheDoorpost's recommendations, Sarah made three specific changes:
          </p>
          <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Change 1: Rewrote the Headline
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 8 }}>
                <strong>Before:</strong> "Accelerate Your Development Velocity"
              </p>
              <p style={{ color: "var(--muted)" }}>
                <strong>After:</strong> "Deploy Code 10x Faster Without Breaking Production"
              </p>
              <p style={{ color: "var(--muted)", marginTop: 12 }}>
                The new headline was specific (10x faster), outcome-focused (deploy code), and addressed a key objection (without breaking production). Visitors immediately understood what TechFlow did and why it mattered.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Change 2: Fixed Mobile CTA Placement
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                Sarah reduced the height of their hero image from 600px to 400px on mobile, which brought the CTA button above the fold. She also increased the button size from 44px to 56px tall, making it easier to tap.
              </p>
              <p style={{ color: "var(--muted)" }}>
                This single change had an outsized impact because 62% of their traffic was mobile. By making the CTA visible without scrolling, they removed a major conversion barrier.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Change 3: Added Social Proof Above the Fold
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                Sarah added a single line of social proof directly below the CTA: "Trusted by 2,847 development teams including GitHub, Stripe, and Notion."
              </p>
              <p style={{ color: "var(--muted)" }}>
                This specific, verifiable social proof (exact number + recognizable brands) reduced perceived risk and built instant credibility. First-time visitors now had proof that TechFlow was legitimate and used by companies they recognized.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            The Results
          </h2>
          <div className="grid grid-2" style={{ gap: 24 }}>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                34%
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Increase in conversion rate (2.1% → 2.8%)
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                91/100
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                New TheDoorpost score (up from 58)
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                $134
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                New cost per trial signup (down from $180)
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                2 weeks
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Time to implement and measure results
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Key Takeaways
          </h2>
          <ul style={{ paddingLeft: 20, color: "var(--muted)" }}>
            <li style={{ marginBottom: 12 }}>
              <strong>Clarity beats cleverness:</strong> The original headline sounded impressive but communicated nothing. The new headline was specific and immediately understandable.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Mobile optimization is not optional:</strong> With 62% mobile traffic, fixing the mobile CTA placement had a massive impact on overall conversion rate.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Social proof reduces risk:</strong> Adding specific, verifiable social proof above the fold built trust instantly and reduced the perceived risk of trying a new tool.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Small changes, big impact:</strong> Three focused changes implemented in two weeks produced a 34% conversion lift. You do not need a complete redesign to see results.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
          <p style={{ fontSize: "1.2rem", fontStyle: "italic", marginBottom: 16 }}>
            "TheDoorpost caught three critical issues on our landing page that we completely missed. Changed our CTA placement and headline based on the report. Conversion rate jumped 34% in two weeks. The analysis paid for itself—well, it is free—but you know what I mean. It saved us thousands in wasted ad spend."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
              S
            </div>
            <div>
              <strong style={{ fontSize: "1.1rem" }}>Sarah Chen</strong>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", margin: 0 }}>Growth Lead, TechFlow</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Ready to Improve Your Conversions?
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24, maxWidth: 600, margin: "0 auto 24px" }}>
          Get the same analysis that helped TechFlow increase conversions by 34%. Analyze your landing page in 30 seconds.
        </p>
        <a className="button" href="/analyze" style={{ fontSize: "1.1rem", padding: "14px 32px" }}>
          Analyze Your Landing Page
        </a>
      </section>

      <Footer />
    </main>
  );
}
