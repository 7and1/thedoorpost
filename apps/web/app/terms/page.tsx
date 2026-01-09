import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — TheDoorpost",
  description:
    "Terms governing the use of TheDoorpost above-the-fold analysis services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "January 8, 2026";
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>
          Terms of Service
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          Last updated: {lastUpdated}
        </p>

        <div className="card">
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              By accessing or using TheDoorpost service, you agree to be bound
              by these Terms of Service. If you do not agree to these terms,
              please do not use our service.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              2. Service Description
            </h2>
            <p style={{ marginBottom: 12, color: "var(--muted)" }}>
              TheDoorpost provides above-the-fold CRO (Conversion Rate
              Optimization) analysis services. Our service:
            </p>
            <ul
              style={{
                paddingLeft: 20,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              <li>Analyzes webpage content and structure</li>
              <li>Provides actionable recommendations for improvement</li>
              <li>Generates reports based on industry best practices</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              3. User Responsibilities
            </h2>
            <p style={{ marginBottom: 12, color: "var(--muted)" }}>
              You agree to:
            </p>
            <ul
              style={{
                paddingLeft: 20,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              <li>Provide accurate and lawful URLs for analysis</li>
              <li>Use the service in accordance with applicable laws</li>
              <li>Not attempt to circumvent usage limits or restrictions</li>
              <li>
                Not use the service to analyze malicious or illegal content
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              4. Disclaimer of Warranties
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
              Reports and recommendations are provided for guidance purposes
              only and do not guarantee improved conversion rates or business
              outcomes. You are solely responsible for any changes made to your
              website based on our analysis.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              5. Limitation of Liability
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              TheDoorpost shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of the service. Our total liability shall not exceed the
              amount you paid for the service in the twelve months preceding the
              claim.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              6. Subscription & Billing
            </h2>
            <p style={{ marginBottom: 12, color: "var(--muted)" }}>
              For paid subscriptions:
            </p>
            <ul
              style={{
                paddingLeft: 20,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              <li>Fees are billed monthly or annually as selected</li>
              <li>You may cancel your subscription at any time</li>
              <li>No refunds for partial months of service</li>
              <li>Usage limits apply per plan tier</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              7. Termination
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              We reserve the right to suspend or terminate access to the service
              for violation of these terms or for any reason at our sole
              discretion. Upon termination, your right to use the service
              immediately ceases.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              8. Modifications to Terms
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              We may modify these terms at any time. Continued use of the
              service after changes constitutes acceptance of the new terms.
              Significant changes will be communicated via email or prominent
              notice on our website.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>9. Contact</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Questions about these terms? Contact us at{" "}
              <a
                href="mailto:hello@thedoorpost.com"
                style={{ color: "var(--primary)" }}
              >
                hello@thedoorpost.com
              </a>
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
