"use client";

import { useState, type FormEvent } from "react";
import TurnstileWidget from "./TurnstileWidget";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.thedoorpost.com";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setError("Please complete the verification challenge.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Unable to send message");
      }
      setSubmitted(true);
      setStatus("idle");
      setName("");
      setEmail("");
      setSubject("general");
      setMessage("");
      if (turnstileEnabled) {
        setTurnstileToken("");
        setTurnstileReset((value) => value + 1);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to send message");
      if (turnstileEnabled) {
        setTurnstileToken("");
        setTurnstileReset((value) => value + 1);
      }
    }
  };

  if (submitted) {
    return (
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
    );
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="contact-name"
            style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            className="input"
            placeholder="Your name"
            required
            maxLength={100}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="contact-email"
            style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className="input"
            placeholder="you@example.com"
            required
            maxLength={200}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="contact-subject"
            style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
          >
            Subject
          </label>
          <select
            id="contact-subject"
            className="input"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          >
            <option value="general">General inquiry</option>
            <option value="support">Technical support</option>
            <option value="sales">Sales & pricing</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="contact-message"
            style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
          >
            Message
          </label>
          <textarea
            id="contact-message"
            className="input"
            rows={5}
            placeholder="How can we help you?"
            required
            style={{ resize: "vertical" as const }}
            maxLength={2000}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        <TurnstileWidget
          onVerify={setTurnstileToken}
          resetKey={turnstileReset}
        />
      </form>

      {status === "error" && error && (
        <div
          className="card"
          style={{
            borderColor: "#f87171",
            color: "#7f1d1d",
            marginTop: 16,
          }}
        >
          {error}
        </div>
      )}

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
  );
}
