import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const metadata: Metadata = {
  title: "Conversion Lab Case Study: Agency Workflow — TheDoorpost",
  description:
    "How Conversion Lab integrated TheDoorpost into their client workflow and now delivers professional CRO audits in minutes instead of hours.",
  alternates: {
    canonical: "/case-studies/conversion-lab-agency-workflow",
  },
};

export default function ConversionLabCaseStudy() {
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
            Marketing Agency
          </span>
        </div>
        <h1 style={{ fontSize: "2.4rem", marginBottom: 16 }}>
          How Conversion Lab Saves 5 Hours Per Client with TheDoorpost
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
          Conversion Lab Agency integrated TheDoorpost into their standard workflow and now delivers professional CRO audits to clients in minutes instead of hours.
        </p>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Agency Background
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            Conversion Lab is a boutique marketing agency specializing in landing page optimization for B2B SaaS companies. Founder Marcus Rodriguez and his team of five work with 20+ clients monthly, conducting CRO audits and implementing improvements.
          </p>
          <p style={{ color: "var(--muted)" }}>
            Their biggest bottleneck was the initial audit process. Each client landing page required 3-5 hours of manual analysis: screenshot capture, heuristic evaluation, competitive research, and report writing. This time-intensive process limited how many clients they could serve and reduced profitability on smaller engagements.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            The Challenge
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            Marcus faced a classic agency dilemma: How to maintain quality while scaling capacity. Manual audits were thorough but slow. Automated tools were fast but generic. He needed something that combined speed with specificity.
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            The manual audit process looked like this:
          </p>
          <ul style={{ paddingLeft: 20, color: "var(--muted)" }}>
            <li style={{ marginBottom: 8 }}>
              <strong>Screenshot capture (30 minutes):</strong> Manually capturing desktop and mobile screenshots, annotating issues, organizing files.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Heuristic evaluation (90 minutes):</strong> Analyzing value proposition, CTA placement, trust signals, mobile optimization, and visual hierarchy.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Competitive research (60 minutes):</strong> Reviewing competitor landing pages to identify industry best practices and differentiation opportunities.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Report writing (90 minutes):</strong> Documenting findings, prioritizing recommendations, creating presentation-ready deliverables.
            </li>
          </ul>
          <p style={{ color: "var(--muted)", marginTop: 12 }}>
            Total time: 4.5 hours per client. At their hourly rate, this meant each audit cost $675 in labor before any implementation work began.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            The Solution: Integrated Workflow
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 16 }}>
            Marcus discovered TheDoorpost while researching CRO tools for a client project. He immediately saw how it could streamline their audit process. After testing it on several client pages, he integrated it into their standard workflow.
          </p>

          <div style={{ display: "grid", gap: 20 }}>
            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                New Workflow: Step 1 - Initial Analysis (5 minutes)
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                When a new client signs on, the first step is running their landing page through TheDoorpost. This generates an instant report with screenshot, score, and prioritized recommendations.
              </p>
              <p style={{ color: "var(--muted)" }}>
                This replaces the manual screenshot capture and initial heuristic evaluation, saving 2 hours immediately. The TheDoorpost report becomes the foundation for the full audit.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                New Workflow: Step 2 - Deep Dive Analysis (90 minutes)
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                The team uses TheDoorpost's findings as a starting point, then adds agency-specific insights: industry context, competitive positioning, brand alignment, and implementation complexity.
              </p>
              <p style={{ color: "var(--muted)" }}>
                This focused analysis is faster than starting from scratch because the foundational issues have already been identified. The team can spend time on strategic recommendations rather than basic heuristics.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                New Workflow: Step 3 - Client Presentation (30 minutes)
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                Marcus shares the TheDoorpost report directly with clients as the initial assessment, then presents the agency's expanded recommendations. The visual format and clear scoring make client presentations more impactful.
              </p>
              <p style={{ color: "var(--muted)" }}>
                Clients appreciate seeing the objective analysis first, then the agency's strategic layer on top. This two-tier approach builds credibility and justifies the agency's value-add.
              </p>
            </div>
          </div>

          <p style={{ color: "var(--muted)", marginTop: 16 }}>
            Total new workflow time: 2 hours per client (down from 4.5 hours). This 55% time reduction allowed Conversion Lab to take on more clients without hiring additional staff.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Impact on Agency Operations
          </h2>
          <div className="grid grid-2" style={{ gap: 24 }}>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                5 hours
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Saved per client audit (2.5 hours per audit × 2 audits per client)
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                100 hours
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Saved per month across 20 clients
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                8 clients
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Additional capacity without new hires
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                $15,000
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Additional monthly revenue from increased capacity
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Unexpected Benefits
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            Beyond time savings, Marcus discovered several unexpected benefits of integrating TheDoorpost into their workflow:
          </p>

          <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>
                Benefit 1: Easier Client Onboarding
              </h3>
              <p style={{ color: "var(--muted)" }}>
                New clients can run their own TheDoorpost analysis before the sales call. This pre-qualifies them (they already know they have issues) and makes the sales conversation more productive. Conversion Lab's close rate increased from 35% to 48%.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>
                Benefit 2: Objective Progress Tracking
              </h3>
              <p style={{ color: "var(--muted)" }}>
                Marcus uses TheDoorpost scores to track client progress over time. Initial audit: 58. After first round of changes: 76. After final optimization: 92. This quantified improvement helps demonstrate ROI to clients and justify ongoing retainers.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>
                Benefit 3: Junior Team Training
              </h3>
              <p style={{ color: "var(--muted)" }}>
                New team members use TheDoorpost to learn CRO fundamentals. By comparing their manual assessments to TheDoorpost's analysis, they quickly learn what to look for in landing page audits. This reduced training time from 3 months to 6 weeks.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>
                Benefit 4: Competitive Differentiation
              </h3>
              <p style={{ color: "var(--muted)" }}>
                Conversion Lab now offers "instant CRO audits" as a lead magnet. Prospects submit their URL, receive a TheDoorpost report immediately, then get a follow-up call from the agency. This low-friction entry point generates 15-20 qualified leads per month.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Key Lessons for Agencies
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            Marcus shares these insights for other agencies considering similar workflow optimizations:
          </p>
          <ul style={{ paddingLeft: 20, color: "var(--muted)" }}>
            <li style={{ marginBottom: 12 }}>
              <strong>Automation amplifies expertise, it does not replace it:</strong> TheDoorpost handles the mechanical parts of audits (screenshot, basic analysis), freeing the team to focus on strategic recommendations that require human judgment.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Clients value speed and quality:</strong> Delivering initial findings in minutes instead of days improves client satisfaction. The faster turnaround makes Conversion Lab more responsive than competitors.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Standardization enables scaling:</strong> By standardizing the initial audit process, Conversion Lab can onboard new team members faster and maintain consistent quality across all client work.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Free tools can drive paid services:</strong> Using TheDoorpost as a lead magnet generates qualified prospects who already understand they need help. These leads convert at 3x the rate of cold outreach.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Quantified results justify retainers:</strong> Before/after scores make it easy to demonstrate value to clients. This data-driven approach has increased client retention from 6 months to 14 months average.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
          <p style={{ fontSize: "1.2rem", fontStyle: "italic", marginBottom: 16 }}>
            "I use TheDoorpost before every client presentation. The reports are professional enough to share directly with stakeholders. Saves me hours of manual auditing and the clients love the visual format. We have integrated it into our standard workflow and it has become indispensable. Best part? It is free, so we can offer instant audits as a lead magnet without any tool costs."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
              M
            </div>
            <div>
              <strong style={{ fontSize: "1.1rem" }}>Marcus Rodriguez</strong>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", margin: 0 }}>Founder, Conversion Lab Agency</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Streamline Your Agency Workflow
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24, maxWidth: 600, margin: "0 auto 24px" }}>
          Deliver professional CRO audits to clients in minutes. Use TheDoorpost as your first-pass analysis tool and focus your expertise on strategic recommendations.
        </p>
        <a className="button" href="/analyze" style={{ fontSize: "1.1rem", padding: "14px 32px" }}>
          Try TheDoorpost Free
        </a>
      </section>

      <Footer />
    </main>
  );
}
