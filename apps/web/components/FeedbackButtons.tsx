"use client";

import { useState } from "react";

export default function FeedbackButtons() {
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(
    null,
  );

  const handleFeedback = (type: "helpful" | "not-helpful") => {
    setFeedback(type);
    // Log feedback for now - can be connected to analytics/backend later
    console.log(`User feedback: ${type} at ${window.location.href}`);
  };

  return (
    <div style={{ marginTop: 32, textAlign: "center" }}>
      <p
        style={{ color: "var(--muted)", marginBottom: 12, fontSize: "0.95rem" }}
      >
        Was this report helpful?
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          onClick={() => handleFeedback("helpful")}
          className={`button secondary ${feedback === "helpful" ? "active" : ""}`}
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            ...(feedback === "helpful"
              ? { background: "var(--primary)", color: "var(--primary-ink)" }
              : {}),
          }}
        >
          {feedback === "helpful" ? "Thanks!" : "Helpful"}
        </button>
        <button
          onClick={() => handleFeedback("not-helpful")}
          className={`button secondary ${feedback === "not-helpful" ? "active" : ""}`}
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            ...(feedback === "not-helpful"
              ? { background: "var(--primary)", color: "var(--primary-ink)" }
              : {}),
          }}
        >
          {feedback === "not-helpful" ? "Thanks!" : "Not Helpful"}
        </button>
      </div>
      {feedback && (
        <p
          style={{ color: "var(--muted)", marginTop: 12, fontSize: "0.85rem" }}
        >
          Thanks for your feedback!
        </p>
      )}
    </div>
  );
}
