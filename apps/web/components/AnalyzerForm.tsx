"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { ReportResult } from "@thedoorpost/shared";
import ProgressStepper from "./ProgressStepper";
import ReportCard from "./ReportCard";
import ScreenshotPanel from "./ScreenshotPanel";
import TurnstileWidget from "./TurnstileWidget";

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
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const eventSourceRef = useRef<EventSource | null>(null);
  const pollingRef = useRef<number | null>(null);
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

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
      if (typeof data.partial_score === "number") {
        setPartialScore(data.partial_score);
      }
      if (data.status === "complete") {
        setResult(data.result);
        setStatus("complete");
        if (turnstileEnabled) {
          setTurnstileToken("");
          setTurnstileReset((value) => value + 1);
        }
        if (pollingRef.current) window.clearInterval(pollingRef.current);
      }
      if (data.status === "error") {
        setError(data.error || "Analysis failed");
        setStatus("error");
        if (turnstileEnabled) {
          setTurnstileToken("");
          setTurnstileReset((value) => value + 1);
        }
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
      if (typeof data.partial_score === "number") {
        setPartialScore(data.partial_score);
      }
    });

    es.addEventListener("complete", (event) => {
      const data = JSON.parse(event.data);
      setResult(data);
      setStatus("complete");
      if (turnstileEnabled) {
        setTurnstileToken("");
        setTurnstileReset((value) => value + 1);
      }
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
      if (turnstileEnabled) {
        setTurnstileToken("");
        setTurnstileReset((value) => value + 1);
      }
      es.close();
      startPolling(pollUrl);
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    reset();
    if (turnstileEnabled && !turnstileToken) {
      setError("Please complete the verification challenge.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      // userEmail flow: optional email passed to worker for notifications/follow-ups
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          // Optionally include userEmail if provided
          ...(email ? { userEmail: email } : {}),
          ...(turnstileToken ? { turnstileToken } : {}),
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
        if (turnstileEnabled) {
          setTurnstileToken("");
          setTurnstileReset((value) => value + 1);
        }
        return;
      }

      setStatus("queued");
      setMessage("Queued...");
      startStream(data.stream_url, data.poll_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
      setStatus("error");
      if (turnstileEnabled) {
        setTurnstileToken("");
        setTurnstileReset((value) => value + 1);
      }
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
          maxLength={2048}
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
          maxLength={200}
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
        <TurnstileWidget
          onVerify={setTurnstileToken}
          resetKey={turnstileReset}
        />
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
          role="alert"
          aria-live="assertive"
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
