import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const metadata: Metadata = {
  title: "LaunchKit Case Study: From 62 to 91 Score — TheDoorpost",
  description:
    "LaunchKit scored 62 on their initial analysis. After implementing TheDoorpost recommendations, they hit 91 and saw immediate campaign performance improvements.",
  alternates: {
    canonical: "/case-studies/launchkit-62-to-91-score",
  },
};

export default function LaunchKitCaseStudy() {
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
            Startup Tools
          </span>
        </div>
        <h1 style={{ fontSize: "2.4rem", marginBottom: 16 }}>
          How LaunchKit Improved Their Score from 62 to 91 Before Launch
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
          LaunchKit used TheDoorpost to validate their landing page before launching their first paid ad campaign. The analysis revealed critical issues that would have cost them thousands in wasted ad spend.
        </p>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Company Background
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            LaunchKit is a startup toolkit that helps founders validate ideas, build MVPs, and launch products faster. Co-founder David Kumar had bootstrapped the product to 200 beta users and was ready to launch their first paid advertising campaign with a $10,000 budget.
          </p>
          <p style={{ color: "var(--muted)" }}>
            Before spending money on ads, David wanted to ensure their landing page was optimized. He had read horror stories of founders burning through ad budgets on poorly converting landing pages. He needed objective feedback before launch.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            The Initial Analysis
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            David ran LaunchKit's landing page through TheDoorpost and received a score of 62/100. The analysis flagged several issues that would have severely impacted campaign performance:
          </p>
          <ul style={{ paddingLeft: 20, color: "var(--muted)" }}>
            <li style={{ marginBottom: 8 }}>
              <strong>Unclear target audience:</strong> The headline "Build Your Startup Faster" was too broad. It did not specify who LaunchKit was for or what stage of startup journey it addressed.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Weak call-to-action:</strong> The CTA button said "Learn More" which is passive and non-committal. It did not tell visitors what would happen when they clicked.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>No objection handling:</strong> The page did not address the primary objection for their target audience: "How much does this cost?" Visitors had to hunt for pricing information.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Generic hero image:</strong> The hero section used a stock photo of a laptop and coffee cup. It communicated nothing about the actual product.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            The Optimization Process
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 16 }}>
            David spent three days implementing TheDoorpost's recommendations. Here is exactly what he changed:
          </p>

          <div style={{ display: "grid", gap: 20 }}>
            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Fix 1: Made the Target Audience Specific
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 8 }}>
                <strong>Before:</strong> "Build Your Startup Faster"
              </p>
              <p style={{ color: "var(--muted)", marginBottom: 8 }}>
                <strong>After:</strong> "Go From Idea to Paying Customers in 30 Days"
              </p>
              <p style={{ color: "var(--muted)", marginTop: 12 }}>
                The new headline was outcome-focused (paying customers), time-specific (30 days), and implied the target audience (founders at the idea stage). This specificity helped the right people self-identify immediately.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Fix 2: Strengthened the Call-to-Action
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 8 }}>
                <strong>Before:</strong> "Learn More"
              </p>
              <p style={{ color: "var(--muted)", marginBottom: 8 }}>
                <strong>After:</strong> "Start Building Free"
              </p>
              <p style={{ color: "var(--muted)", marginTop: 12 }}>
                The new CTA was action-oriented (start building), specific about what happens next (you will start building), and addressed the cost objection (free). This clarity increased click-through rates significantly.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Fix 3: Added Objection Handling
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                David added a single line below the CTA button: "Free forever for solo founders. No credit card required."
              </p>
              <p style={{ color: "var(--muted)" }}>
                This addressed two objections simultaneously: cost (free forever) and commitment (no credit card). Visitors could now take action without fear of hidden charges or unwanted subscriptions.
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Fix 4: Replaced Stock Photo with Product Screenshot
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                David replaced the generic stock photo with an annotated screenshot of LaunchKit's dashboard showing the key features: idea validation, MVP builder, and launch checklist.
              </p>
              <p style={{ color: "var(--muted)" }}>
                This visual change helped visitors immediately understand what LaunchKit was (a software tool, not a course or consulting service) and what it included (specific features they could see).
              </p>
            </div>

            <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: 16 }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Fix 5: Added Early User Testimonial
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                David added a testimonial from one of their beta users directly below the hero section: "LaunchKit helped me validate my idea and build an MVP in 3 weeks. I launched last month and already have 50 paying customers." - Alex M., Founder of TaskFlow
              </p>
              <p style={{ color: "var(--muted)" }}>
                This specific testimonial (with real name, company, and concrete results) provided social proof and demonstrated that LaunchKit actually worked. The specificity (3 weeks, 50 customers) made it credible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            The Validation
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            After implementing all five fixes, David ran the updated landing page through TheDoorpost again. The new score: 91/100.
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            The analysis confirmed that all critical issues had been resolved. The page now had a clear value proposition, specific target audience, strong CTA, objection handling, and credible social proof.
          </p>
          <p style={{ color: "var(--muted)" }}>
            With confidence in his landing page, David launched his ad campaign. The results exceeded his expectations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", color: "white" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Campaign Results
          </h2>
          <div className="grid grid-2" style={{ gap: 24 }}>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                4.2%
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Conversion rate from ad to signup
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                387
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                New signups in first month
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                $25.84
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Cost per signup (well below target)
              </p>
            </div>
            <div>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 8px 0" }}>
                91/100
              </p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
                Final TheDoorpost score
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            What Made the Difference
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            David attributes the campaign's success to optimizing the landing page before spending on ads. Here is what he learned:
          </p>
          <ul style={{ paddingLeft: 20, color: "var(--muted)" }}>
            <li style={{ marginBottom: 12 }}>
              <strong>Validate before you spend:</strong> Testing the landing page with TheDoorpost before launching ads saved thousands in wasted spend. A 62-scoring page would have converted poorly no matter how good the ads were.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Specificity creates relevance:</strong> The original headline was too broad. The new headline spoke directly to founders at the idea stage, making it immediately relevant to the target audience.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Remove friction everywhere:</strong> Every objection you leave unaddressed is a reason for visitors to leave. Addressing cost and commitment concerns directly in the hero section removed major barriers.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Show, do not just tell:</strong> Replacing the stock photo with a product screenshot helped visitors understand what LaunchKit was and what it included. Visual clarity matters as much as copy clarity.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong>Iterate based on data:</strong> The before/after scores (62 → 91) gave David confidence that his changes were improvements, not just different. Objective measurement beats guesswork.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
          <p style={{ fontSize: "1.2rem", fontStyle: "italic", marginBottom: 16 }}>
            "Tested our landing page before launching our first ad campaign. TheDoorpost scored us at 62. Made the recommended changes, rescored at 91. Campaign performed way better than expected. Best free tool I have found. Saved us from wasting thousands on ads to a poorly converting page."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
              D
            </div>
            <div>
              <strong style={{ fontSize: "1.1rem" }}>David Kumar</strong>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", margin: 0 }}>Co-founder, LaunchKit</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Validate Your Landing Page Before Launch
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24, maxWidth: 600, margin: "0 auto 24px" }}>
          Do not waste ad spend on a poorly converting landing page. Get objective analysis in 30 seconds and fix issues before launch.
        </p>
        <a className="button" href="/analyze" style={{ fontSize: "1.1rem", padding: "14px 32px" }}>
          Analyze Your Landing Page
        </a>
      </section>

      <Footer />
    </main>
  );
}
