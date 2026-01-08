import React from "react";

const steps = [
  { label: "Connecting to website", threshold: 10 },
  { label: "Capturing screenshot", threshold: 40 },
  { label: "AI visual analysis", threshold: 70 },
  { label: "Generating report", threshold: 90 },
];

export default function ProgressStepper({
  progress,
  message,
}: {
  progress: number;
  message: string;
}) {
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <strong>Analysis Progress</strong>
        <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          {message}
        </span>
      </div>
      <div style={{ marginTop: 12 }} className="progress">
        <div style={{ width: `${progress}%` }} />
      </div>
      <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
        {steps.map((step) => (
          <div
            key={step.label}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background:
                  progress >= step.threshold ? "var(--primary)" : "#e7e0d4",
              }}
            />
            <span
              style={{
                fontSize: "0.95rem",
                color:
                  progress >= step.threshold ? "var(--ink)" : "var(--muted)",
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
