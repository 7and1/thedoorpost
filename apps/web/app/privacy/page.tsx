import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — TheDoorpost",
  description:
    "How TheDoorpost collects, uses, and protects data for above-the-fold analysis.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "January 8, 2026";
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          Last updated: {lastUpdated}
        </p>

        <div className="card">
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: 12, color: "var(--muted)" }}>
              We collect only the information necessary to provide our CRO
              analysis services:
            </p>
            <ul
              style={{
                paddingLeft: 20,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              <li>
                <strong>URL Data:</strong> The webpage URL you submit for
                analysis
              </li>
              <li>
                <strong>Email (Optional):</strong> If provided, to send your
                analysis report
              </li>
              <li>
                <strong>Usage Data:</strong> Anonymous usage metrics to improve
                our service
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              2. How We Use Your Data
            </h2>
            <p style={{ marginBottom: 12, color: "var(--muted)" }}>
              Your data is used solely for:
            </p>
            <ul
              style={{
                paddingLeft: 20,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              <li>Generating and delivering your CRO analysis report</li>
              <li>Maintaining service quality and performance</li>
              <li>Sending updates if you've opted in to receive them</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              3. Data Storage & Retention
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Analysis reports are stored for a limited retention period:
              <br />- Standard retention: 7 days
              <br />
              <br />
              After the retention period, all associated data is permanently
              deleted.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              4. Data Sharing
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              We do not sell, rent, or trade your personal data. Your
              information is never shared with third parties for marketing
              purposes.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              5. Your Rights
            </h2>
            <p style={{ marginBottom: 12, color: "var(--muted)" }}>
              You have the right to:
            </p>
            <ul
              style={{
                paddingLeft: 20,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              <li>
                <strong>Access:</strong> Request a copy of your data
              </li>
              <li>
                <strong>Delete:</strong> Request deletion of your data
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from communications at any
                time
              </li>
            </ul>
            <p style={{ marginTop: 12, color: "var(--muted)" }}>
              Contact{" "}
              <a
                href="mailto:hello@thedoorpost.com"
                style={{ color: "var(--primary)" }}
              >
                hello@thedoorpost.com
              </a>{" "}
              for any requests.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              6. Security
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              We implement industry-standard security measures to protect your
              data. All data is transmitted using HTTPS encryption and stored
              securely.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
