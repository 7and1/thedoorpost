import type { ReportData } from "@thedoorpost/shared";

export default function ReportCard({ report }: { report: ReportData }) {
  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "var(--primary)",
          }}
        >
          {report.overall_score}/100
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Overall Score</div>
          <div style={{ color: "var(--muted)" }}>{report.summary}</div>
        </div>
      </div>
      <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
        <strong>Key Metrics</strong>
        <div style={{ display: "grid", gap: 8 }}>
          <Metric label="Value Proposition" value={report.metrics.value_prop} />
          <Metric
            label="CTA Visibility"
            value={report.metrics.cta_visibility}
          />
          <Metric label="Trust Design" value={report.metrics.trust_design} />
        </div>
      </div>
      <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
        <strong>Top 3 Priorities</strong>
        {report.fixes?.map((fix, idx) => (
          <div
            key={idx}
            style={{
              padding: 12,
              background: "#faf7f1",
              borderRadius: 12,
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontWeight: 600 }}>{fix.title}</div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.95rem",
                marginTop: 6,
              }}
            >
              {fix.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 110, color: "var(--muted)" }}>{label}</span>
      <div style={{ flex: 1 }} className="progress">
        <div style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
      <span style={{ width: 40, textAlign: "right", fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}
