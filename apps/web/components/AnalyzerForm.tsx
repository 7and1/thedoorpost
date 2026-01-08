"use client";

import { useEffect, useRef, useState } from "react";
import type { ReportResult } from "@thedoorpost/shared";
import ProgressStepper from "./ProgressStepper";
import ReportCard from "./ReportCard";
import ScreenshotPanel from "./ScreenshotPanel";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.thedoorpost.com";

type AnalyzeResponse =
  | ({ status: "complete" } & ReportResult)
  | { status: "queued"; job_id: string; stream_url: string; poll_url: string };

export default function AnalyzerForm() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "queued" | "complete" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [partialScore, setPartialScore] = useState<number | null>(null);
  const [result, setResult] = useState<ReportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const pollingRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
      if (pollingRef.current) window.clearInterval(pollingRef.current);
    };
  }, []);

  const reset = () => {
    setProgress(0);
    setMessage("");
    setPartialScore(null);
    setResult(null);
    setError(null);
    eventSourceRef.current?.close();
    if (pollingRef.current) window.clearInterval(pollingRef.current);
  };

  const startPolling = (pollUrl: string) => {
    if (pollingRef.current) window.clearInterval(pollingRef.current);
    pollingRef.current = window.setInterval(async () => {
      const res = await fetch(pollUrl);
      if (!res.ok) return;
      const data = await res.json();
      setProgress(data.progress || 0);
      setMessage(data.message || "");
      if (data.partial_score) setPartialScore(data.partial_score);
      if (data.status === "complete") {
        setResult(data.result);
        setStatus("complete");
        if (pollingRef.current) window.clearInterval(pollingRef.current);
      }
      if (data.status === "error") {
        setError(data.error || "Analysis failed");
        setStatus("error");
        if (pollingRef.current) window.clearInterval(pollingRef.current);
      }
    }, 1200);
  };

  const startStream = (streamUrl: string, pollUrl: string) => {
    if (typeof EventSource === "undefined") {
      startPolling(pollUrl);
      return;
    }
    const es = new EventSource(streamUrl);
    eventSourceRef.current = es;

    es.addEventListener("progress", (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.progress || 0);
      setMessage(data.message || "");
      if (data.partial_score) setPartialScore(data.partial_score);
    });

    es.addEventListener("complete", (event) => {
      const data = JSON.parse(event.data);
      setResult(data);
      setStatus("complete");
      es.close();
    });

    es.addEventListener("error", (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data);
        setError(data.message || "Analysis failed");
      } catch {
        setError("Analysis failed");
      }
      setStatus("error");
      es.close();
      startPolling(pollUrl);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    reset();
    setStatus("loading");
    try {
      // user_email flow: optional email passed to worker for notifications/follow-ups
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          // Optionally include user_email if provided
          ...(email ? { user_email: email } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      const data = (await res.json()) as AnalyzeResponse;

      if (data.status === "complete") {
        setResult(data);
        setStatus("complete");
        return;
      }

      setStatus("queued");
      setMessage("Queued...");
      startStream(data.stream_url, data.poll_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
      setStatus("error");
    }
  };

  return (
    <div className="grid" style={{ gap: 24 }}>
      <form
        onSubmit={handleSubmit}
        className="hero-card"
        style={{ display: "grid", gap: 12 }}
      >
        <label htmlFor="url" style={{ fontWeight: 600 }}>
          Enter your website URL
        </label>
        <input
          id="url"
          type="url"
          required
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />
        <label htmlFor="email" style={{ fontWeight: 600, marginTop: 8 }}>
          Email (optional)
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <button
          className="button"
          disabled={status === "loading" || status === "queued"}
          style={{ marginTop: 8 }}
        >
          {status === "loading" || status === "queued"
            ? "Analyzing..."
            : "Analyze Doorpost"}
        </button>
        <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          We only analyze above-the-fold content and do not store login
          credentials or user sessions.
        </div>
      </form>

      {(status === "loading" || status === "queued") && (
        <ProgressStepper
          progress={progress}
          message={message || "Preparing..."}
        />
      )}

      {partialScore !== null && status !== "complete" && (
        <div
          className="card"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <strong>Preliminary Score</strong>
          <span style={{ fontSize: "1.6rem", color: "var(--primary)" }}>
            {partialScore}
          </span>
          <span style={{ color: "var(--muted)" }}>
            Generating full report...
          </span>
        </div>
      )}

      {status === "error" && error && (
        <div
          className="card"
          style={{ borderColor: "#f87171", color: "#7f1d1d" }}
        >
          {error}
        </div>
      )}

      {result && (
        <div className="grid grid-2">
          <ScreenshotPanel imageUrl={result.image} alt="Site Screenshot" />
          <ReportCard report={result.data} />
        </div>
      )}
    </div>
  );
}
