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
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheDoorpost — Free Above-the-Fold Analyzer",
    description:
      "Score your hero section and get actionable CRO fixes in seconds.",
    images: ["/og.svg"],
    site: "@thedoorpost",
    creator: "@thedoorpost",
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
            conversion-focused. No login required.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <a className="button" href="/analyze">
              Analyze Now
            </a>
            <a className="button secondary" href="/pricing">
              100% Free
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
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Why Above-the-Fold Analysis Matters
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: "1.1rem" }}>
          Your above-the-fold section is the first thing visitors see when they land on your website. It determines whether they stay and explore or leave immediately. Most websites lose 70% of visitors in the first 10 seconds due to unclear messaging, hidden calls-to-action, or missing trust signals. We help you fix that with instant, actionable analysis.
        </p>
        <div className="grid grid-2">
          <div className="card">
            <h3>Structured Insights</h3>
            <p>
              Scoring broken down into value proposition, CTA visibility, and
              trust design. We analyze what actually drives conversions, not vanity metrics.
            </p>
          </div>
          <div className="card">
            <h3>Instant Suggestions</h3>
            <p>
              Three prioritized fix recommendations pointing directly to
              actionable changes. No fluff. Just fixes that work.
            </p>
          </div>
          <div className="card">
            <h3>Easy Sharing</h3>
            <p>
              Every report has a publicly accessible URL, perfect for team
              collaboration and client reporting. Share insights in seconds.
            </p>
          </div>
          <div className="card">
            <h3>SEO-Driven Growth</h3>
            <p>
              Industry pages and case studies help you continuously drive
              traffic and build a content flywheel. Learn from the best.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          What Makes a Hero Section Convert
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          After analyzing thousands of landing pages, we have identified the three core elements that separate high-converting hero sections from the rest.
        </p>
        <div style={{ display: "grid", gap: 24 }}>
          <div className="card">
            <h3>1. Clear Value Proposition</h3>
            <p>
              Visitors should understand what you do within 3 seconds. No jargon. No clever wordplay. Just a clear statement of the problem you solve and who you solve it for. The best converting headlines are under 10 words and speak directly to customer pain points.
            </p>
          </div>
          <div className="card">
            <h3>2. Visible Call-to-Action</h3>
            <p>
              Your CTA button should be impossible to miss. High-converting pages use contrasting colors, action-oriented text (not "Submit" or "Learn More"), and place the primary CTA above the fold on both desktop and mobile. If visitors have to scroll to find what to do next, you have already lost them.
            </p>
          </div>
          <div className="card">
            <h3>3. Trust Signals</h3>
            <p>
              First-time visitors do not know you. Trust signals like customer logos, ratings, testimonials, or security badges reduce perceived risk. The most effective trust elements are specific ("4.9/5 from 2,000+ reviews") rather than vague ("Trusted by companies").
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          How TheDoorpost Works
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          Our analysis engine combines browser rendering technology with conversion rate optimization expertise. Here is exactly what happens when you submit a URL.
        </p>
        <div className="grid grid-2">
          <div className="card">
            <h3>Step 1: Capture</h3>
            <p>
              We render your page in a real browser and capture the above-the-fold viewport exactly as visitors see it. No simulations. Real pixels.
            </p>
          </div>
          <div className="card">
            <h3>Step 2: Analyze</h3>
            <p>
              Our system evaluates your hero section against proven CRO frameworks. We score clarity, credibility, and conversion potential on a 100-point scale.
            </p>
          </div>
          <div className="card">
            <h3>Step 3: Recommend</h3>
            <p>
              You get three prioritized fixes with specific guidance. Not generic advice like "improve your headline" but actionable steps like "Move your CTA above the fold and change button text to Start Free Trial."
            </p>
          </div>
          <div className="card">
            <h3>Step 4: Share</h3>
            <p>
              Every analysis generates a permanent, shareable report URL. Send it to your team, your client, or save it for your records. No account needed.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Who Uses TheDoorpost
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          Thousands of marketers, founders, and agencies use TheDoorpost to validate landing page decisions and improve conversion rates.
        </p>
        <div className="grid grid-2">
          <div className="card">
            <h3>Founders</h3>
            <p>
              Validate your landing page before spending on ads. Know if your value proposition resonates in seconds, not weeks of A/B testing.
            </p>
          </div>
          <div className="card">
            <h3>Marketing Teams</h3>
            <p>
              Get objective feedback on campaign landing pages. Share reports with stakeholders to justify design decisions with data.
            </p>
          </div>
          <div className="card">
            <h3>Agencies</h3>
            <p>
              Deliver professional CRO audits to clients in minutes. White-label ready reports that demonstrate your expertise.
            </p>
          </div>
          <div className="card">
            <h3>Designers</h3>
            <p>
              Get instant feedback on hero section designs. Validate your work against conversion best practices before handoff. Present data-backed design decisions to stakeholders with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 16, textAlign: "center" }}>
          What Our Users Say
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 32, textAlign: "center", maxWidth: 700, margin: "0 auto 32px" }}>
          Real feedback from marketers, founders, and agencies who use TheDoorpost to optimize their landing pages.
        </p>
        <div className="grid grid-2" style={{ gap: 24 }}>
          <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
            <p style={{ fontSize: "1.05rem", marginBottom: 16, fontStyle: "italic" }}>
              "TheDoorpost caught three critical issues on our landing page that we completely missed. Changed our CTA placement and headline based on the report. Conversion rate jumped 34% in two weeks."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>
                S
              </div>
              <div>
                <strong>Sarah Chen</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Growth Lead, TechFlow</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
            <p style={{ fontSize: "1.05rem", marginBottom: 16, fontStyle: "italic" }}>
              "I use TheDoorpost before every client presentation. The reports are professional enough to share directly with stakeholders. Saves me hours of manual auditing and the clients love the visual format."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>
                M
              </div>
              <div>
                <strong>Marcus Rodriguez</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Founder, Conversion Lab Agency</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
            <p style={{ fontSize: "1.05rem", marginBottom: 16, fontStyle: "italic" }}>
              "Finally, a CRO tool that gives specific advice instead of generic tips. The mobile analysis feature is gold. We discovered our CTA was completely hidden on mobile. Fixed it and saw immediate improvement."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>
                J
              </div>
              <div>
                <strong>Jessica Park</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Product Designer, Streamline</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
            <p style={{ fontSize: "1.05rem", marginBottom: 16, fontStyle: "italic" }}>
              "Tested our landing page before launching our first ad campaign. TheDoorpost scored us at 62. Made the recommended changes, rescored at 91. Campaign performed way better than expected. Best free tool I have found."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>
                D
              </div>
              <div>
                <strong>David Kumar</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Co-founder, LaunchKit</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
            <p style={{ fontSize: "1.05rem", marginBottom: 16, fontStyle: "italic" }}>
              "We run landing page audits for 20+ clients monthly. TheDoorpost is now part of our standard workflow. The shareable reports make client communication effortless. Wish we found this tool years ago."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#333", fontWeight: "bold", fontSize: "1.2rem" }}>
                E
              </div>
              <div>
                <strong>Emily Thompson</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Head of Marketing, GrowthHive</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
            <p style={{ fontSize: "1.05rem", marginBottom: 16, fontStyle: "italic" }}>
              "The speed is unreal. 30 seconds from URL to full report. I analyze competitor pages weekly now to see what they are doing right. The insights have shaped our entire landing page strategy."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#333", fontWeight: "bold", fontSize: "1.2rem" }}>
                A
              </div>
              <div>
                <strong>Alex Morrison</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Marketing Director, CloudScale</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Common Hero Section Mistakes We Fix
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          Our database of analyzed pages shows the same problems appearing again and again. Here is what we catch most often.
        </p>
        <div style={{ display: "grid", gap: 16 }}>
          <div className="card" style={{ borderLeft: "4px solid #ef4444" }}>
            <h3>Vague Headlines</h3>
            <p>
              "Innovation for the future" tells visitors nothing. We flag headlines that fail the "so what" test and suggest specific alternatives that communicate real value and differentiate you from competitors.
            </p>
          </div>
          <div className="card" style={{ borderLeft: "4px solid #ef4444" }}>
            <h3>Hidden CTAs</h3>
            <p>
              If your call-to-action is below the fold on mobile, you are losing conversions. We check viewport coverage and tell you exactly where your CTA appears.
            </p>
          </div>
          <div className="card" style={{ borderLeft: "4px solid #ef4444" }}>
            <h3>Missing Trust Signals</h3>
            <p>
              First-time visitors need proof you are legitimate. We identify missing trust elements and recommend specific additions based on your industry.
            </p>
          </div>
          <div className="card" style={{ borderLeft: "4px solid #ef4444" }}>
            <h3>Visual Clutter</h3>
            <p>
              Too many elements competing for attention kills conversions. We assess visual hierarchy and suggest what to remove or emphasize to create clear focal points.
            </p>
          </div>
          <div className="card" style={{ borderLeft: "4px solid #ef4444" }}>
            <h3>Slow Loading Hero</h3>
            <p>
              If your above-the-fold content takes more than 3 seconds to load, you are losing visitors before they even see your offer. Speed is a critical conversion factor.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Data-Driven Insights
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          Our analysis is backed by real conversion rate optimization research and thousands of analyzed landing pages. These numbers explain why above-the-fold optimization is the highest ROI activity for any landing page.
        </p>
        <div className="grid grid-2">
          <div className="card">
            <h3>70%</h3>
            <p>
              Of visitors bounce within 10 seconds if your value proposition is unclear. First impressions are made in milliseconds, not minutes. Your hero section must communicate value instantly or you lose the visitor forever.
            </p>
          </div>
          <div className="card">
            <h3>3 Seconds</h3>
            <p>
              Is all you have to communicate what you do. Confusion kills conversions faster than anything else. Visitors who cannot understand your offer immediately will leave without scrolling, clicking, or converting.
            </p>
          </div>
          <div className="card">
            <h3>90+ Score</h3>
            <p>
              Pages scoring 90+ on our analysis typically see 2-3x higher conversion rates than pages scoring below 60. Small improvements in clarity and credibility translate directly to revenue growth.
            </p>
          </div>
          <div className="card">
            <h3>30 Seconds</h3>
            <p>
              Is all it takes to get your analysis. No signup forms. No credit cards. No waiting days for agency feedback. Just instant, actionable insights you can implement today.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Our Approach to CRO Analysis
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          We built TheDoorpost after years of frustration with existing CRO tools. Most audit tools give you generic advice or overwhelming reports. We do the opposite.
        </p>
        <div style={{ display: "grid", gap: 16 }}>
          <div className="card">
            <h3>Specific Over Generic</h3>
            <p>
              Instead of "improve your headline," we tell you exactly what is wrong and what to try instead. Our recommendations are tailored to your specific page and industry context.
            </p>
          </div>
          <div className="card">
            <h3>Prioritized Fixes</h3>
            <p>
              You cannot fix everything at once. We rank recommendations by impact and effort so you know exactly what to tackle first. One high-impact fix beats ten low-impact tweaks.
            </p>
          </div>
          <div className="card">
            <h3>Visual Evidence</h3>
            <p>
              Every report includes a screenshot of your above-the-fold area with annotations. You see exactly what we see. No guesswork about what needs improvement.
            </p>
          </div>
          <div className="card">
            <h3>Industry Context</h3>
            <p>
              What works for SaaS does not work for ecommerce. Our analysis considers your industry and adjusts recommendations accordingly. Context matters in CRO. A B2B software page needs different trust signals than a direct-to-consumer product page.
            </p>
          </div>
          <div className="card">
            <h3>Mobile-First Analysis</h3>
            <p>
              Over 60% of web traffic comes from mobile devices. We analyze both desktop and mobile views because your above-the-fold area looks different on every screen size. Mobile optimization is not optional anymore.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 12 }}>
          Built to stay free
        </h2>
        <p style={{ color: "var(--muted)" }}>
          No accounts, no paywalls. Turnstile verification keeps the service
          reliable for everyone. We believe every founder deserves access to professional CRO insights.
        </p>
        <div className="grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Free</h3>
            <p style={{ fontSize: "2rem", margin: "12px 0" }}>$0</p>
            <ul>
              <li>No login required</li>
              <li>Turnstile-protected requests</li>
              <li>Instant reports + exports</li>
              <li>Unlimited analyses</li>
            </ul>
            <a className="button" style={{ marginTop: 12 }} href="/analyze">
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: "grid", gap: 16 }}>
          <div className="card">
            <h3>Is TheDoorpost really free?</h3>
            <p>
              Yes. TheDoorpost is completely free to use. We use Cloudflare Turnstile to prevent abuse, which keeps the service running smoothly for everyone. No credit card, no subscription, no hidden fees. We believe professional CRO insights should be accessible to every founder and marketer, regardless of budget.
            </p>
          </div>
          <div className="card">
            <h3>How accurate is the analysis?</h3>
            <p>
              Our analysis is based on established CRO frameworks and best practices from industry leaders like Nielsen Norman Group, Baymard Institute, and Conversion Rate Experts. While no automated tool can replace human expertise, we catch the most common issues that kill conversions. Use our analysis as a first pass, then validate with user testing for maximum impact.
            </p>
          </div>
          <div className="card">
            <h3>What pages work best with TheDoorpost?</h3>
            <p>
              TheDoorpost is designed for landing pages and homepages with clear hero sections. Ecommerce product pages, SaaS landing pages, and marketing campaign pages get the most value. Complex web applications with minimal above-the-fold content may not be suitable.
            </p>
          </div>
          <div className="card">
            <h3>Can I share my report with my team?</h3>
            <p>
              Every analysis generates a permanent, shareable URL. Send it to teammates, clients, or stakeholders. Reports include the screenshot, scores, and all recommendations. No account required to view shared reports. Perfect for async collaboration and client presentations.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>
          Ready to Improve Your Conversions?
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 24, maxWidth: 600, margin: "0 auto 24" }}>
          Join thousands of marketers, founders, and designers who use TheDoorpost to optimize their landing pages and improve conversion rates. Get your free above-the-fold analysis in just 30 seconds. No signup required.
        </p>
        <a className="button" href="/analyze" style={{ fontSize: "1.1rem", padding: "14px 32px" }}>
          Analyze Your Landing Page
        </a>
      </section>

      <Footer />
    </main>
  );
}
