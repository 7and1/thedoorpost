"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>Contact</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          Have questions? We'd love to hear from you.
        </p>

        {submitted ? (
          <div className="card">
            <h2 style={{ marginBottom: 12 }}>Message Sent!</h2>
            <p style={{ color: "var(--muted)" }}>
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button
              className="button"
              style={{ marginTop: 24 }}
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
                >
                  Subject
                </label>
                <select className="input" defaultValue="">
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="general">General inquiry</option>
                  <option value="support">Technical support</option>
                  <option value="sales">Sales & pricing</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label
                  style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
                >
                  Message
                </label>
                <textarea
                  className="input"
                  rows={5}
                  placeholder="How can we help you?"
                  required
                  style={{ resize: "vertical" as const }}
                />
              </div>

              <button type="submit" className="button">
                Send Message
              </button>
            </form>

            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid var(--border)",
              }}
            >
              <p style={{ color: "var(--muted)", marginBottom: 8 }}>
                Prefer email directly?
              </p>
              <a
                href="mailto:hello@thedoorpost.com"
                style={{ color: "var(--primary)", fontWeight: 500 }}
              >
                hello@thedoorpost.com
              </a>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
