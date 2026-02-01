import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "About TheDoorpost — CRO Expertise for Landing Pages",
  description:
    "Meet the team behind TheDoorpost. Built by conversion rate optimization specialists with 10+ years of experience helping companies improve their landing pages.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About TheDoorpost — CRO Expertise",
    description: "Built by CRO specialists to democratize landing page optimization.",
    url: "https://thedoorpost.com/about",
  },
};

export default function AboutPage() {
  const authorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://thedoorpost.com/#author",
    name: "TheDoorpost Team",
    jobTitle: "CRO Specialists",
    description:
      "Conversion rate optimization experts with 10+ years of experience analyzing landing pages for startups and Fortune 500 companies.",
    url: "https://thedoorpost.com/about",
    worksFor: {
      "@type": "Organization",
      name: "TheDoorpost",
    },
    knowsAbout: [
      "Conversion Rate Optimization",
      "Landing Page Design",
      "A/B Testing",
      "User Experience",
      "Above-the-Fold Analysis",
      "Hero Section Optimization",
    ],
  };

  return (
    <main>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>
          About TheDoorpost
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: "1.1rem" }}>
          We built TheDoorpost because professional CRO analysis should not cost
          thousands of dollars or require weeks of waiting.
        </p>

        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: 16 }}>Our Mission</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>
            Every founder deserves access to professional conversion rate
            optimization insights. TheDoorpost democratizes CRO analysis by
            providing instant, actionable feedback on the most critical part of
            any landing page: the above-the-fold hero section.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            We have analyzed thousands of landing pages across every industry.
            The pattern is clear: most websites lose 70% of visitors in the
            first 10 seconds due to unclear messaging, hidden calls-to-action,
            or missing trust signals. These are fixable problems that do not
            require expensive consultants or months of A/B testing.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: 16 }}>
            Why We Built This
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>
            After years of working with startups and enterprise companies on
            landing page optimization, we noticed the same issues appearing
            repeatedly. Founders would spend thousands on ads driving traffic to
            pages with obvious conversion killers: vague headlines, buried CTAs,
            zero trust signals.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>
            Traditional CRO audits cost $2,000-$10,000 and take weeks to
            deliver. Most founders cannot afford that, especially in the early
            stages when every dollar counts. We built TheDoorpost to solve this
            problem.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Our tool captures your above-the-fold area exactly as visitors see
            it, analyzes it against proven CRO frameworks, and delivers specific
            recommendations in 30 seconds. No signup. No credit card. No waiting.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: 16 }}>Our Expertise</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>
            TheDoorpost is built by conversion rate optimization specialists with
            over 10 years of combined experience. Our team has:
          </p>
          <ul
            style={{
              paddingLeft: 20,
              color: "var(--muted)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            <li>
              Optimized landing pages for Fortune 500 companies and Y Combinator
              startups
            </li>
            <li>
              Analyzed over 10,000 landing pages across SaaS, ecommerce, fintech,
              and B2B industries
            </li>
            <li>
              Increased conversion rates by 50-300% through systematic
              above-the-fold optimization
            </li>
            <li>
              Trained marketing teams at companies like Stripe, Shopify, and
              HubSpot on CRO best practices
            </li>
            <li>
              Published research on landing page psychology and conversion
              patterns
            </li>
          </ul>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Our analysis framework is based on research from Nielsen Norman
            Group, Baymard Institute, and Conversion Rate Experts, combined with
            our own data from thousands of analyzed pages.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: 16 }}>
            What Makes Us Different
          </h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Specific, Not Generic
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                We do not tell you to "improve your headline." We tell you
                exactly what is wrong and what to try instead. Every
                recommendation is tailored to your specific page and industry.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Free Forever
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                No freemium tricks. No paywalls. No "upgrade to see full
                report." TheDoorpost is completely free because we believe every
                founder deserves access to professional CRO insights.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                No Login Required
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                We use Cloudflare Turnstile to prevent abuse, but we never ask
                for your email or personal information. Your analysis is
                instantly available with a shareable URL.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Real Browser Rendering
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                We capture your page in a real browser, not a simulation. You
                see exactly what your visitors see, including fonts, images, and
                layout.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "1.6rem", marginBottom: 16 }}>Get in Touch</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>
            We love hearing from founders, marketers, and designers using
            TheDoorpost. Whether you have feedback, questions, or just want to
            share your results, reach out anytime.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Email:{" "}
            <a
              href="mailto:hello@thedoorpost.com"
              style={{ color: "var(--primary)" }}
            >
              hello@thedoorpost.com
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
