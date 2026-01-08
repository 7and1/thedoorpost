"use client";

import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <section
            className="section"
            style={{ textAlign: "center", padding: "120px 0" }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>
              Oops, something went wrong
            </h1>
            <p
              style={{
                color: "var(--muted)",
                marginBottom: 24,
                fontSize: "1.1rem",
              }}
            >
              We encountered an unexpected error. Please try again.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a
                className="button"
                href="/"
                onClick={() => window.location.reload()}
              >
                Try Again
              </a>
              <a className="button secondary" href="/">
                Go Home
              </a>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
