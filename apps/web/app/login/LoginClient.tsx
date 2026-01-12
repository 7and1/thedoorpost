"use client";

import { useSearchParams } from "next/navigation";
import { useAuth } from "../../lib/useAuth";
import { Suspense } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  missing_params: "Missing authorization parameters",
  invalid_state: "Invalid session state. Please try again.",
  token_exchange_failed: "GitHub authentication failed. Please try again.",
  user_fetch_failed: "Could not retrieve your GitHub profile.",
  user_create_failed: "Could not create your account. Please try again.",
  access_denied: "You denied access to your GitHub account.",
};

function LoginContent() {
  const searchParams = useSearchParams();
  const { user, loading, loginUrl } = useAuth();
  const error = searchParams.get("error");

  if (loading) {
    return (
      <main className="container" style={{ padding: "80px 24px" }}>
        <div
          className="card"
          style={{ textAlign: "center", maxWidth: 400, margin: "0 auto" }}
        >
          <div style={{ fontSize: "1.2rem", color: "var(--muted)" }}>
            Loading...
          </div>
        </div>
      </main>
    );
  }

  if (user) {
    return (
      <main className="container" style={{ padding: "80px 24px" }}>
        <div
          className="card"
          style={{ textAlign: "center", maxWidth: 400, margin: "0 auto" }}
        >
          <h1 style={{ marginBottom: 16 }}>Already logged in</h1>
          <p style={{ color: "var(--muted)", marginBottom: 24 }}>
            Welcome back,{" "}
            <strong>{user.github_name || user.github_login}</strong>!
          </p>
          <a
            href="/dashboard"
            className="button"
            style={{ display: "inline-block" }}
          >
            Go to Dashboard
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "80px 24px" }}>
      <div
        className="card"
        style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}
      >
        <h1 style={{ marginBottom: 8 }}>Sign in to TheDoorpost</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          Get more analyses and track your optimization progress.
        </p>

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="card"
            style={{
              borderColor: "#f87171",
              color: "#7f1d1d",
              marginBottom: 24,
              padding: "12px 16px",
            }}
          >
            {ERROR_MESSAGES[error] || `Error: ${error}`}
          </div>
        )}

        <a
          href={loginUrl}
          className="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 32px",
            fontSize: "1.1rem",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </a>

        <div
          style={{
            marginTop: 32,
            padding: "24px 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <h3 style={{ marginBottom: 16, fontSize: "1rem" }}>What you get</h3>
          <div style={{ display: "grid", gap: 12, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                Free
              </span>
              <div>
                <div style={{ fontWeight: 500 }}>10 analyses per day</div>
                <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  No credit card required
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: "#10b981", fontWeight: 600 }}>Pro</span>
              <div>
                <div style={{ fontWeight: 500 }}>500 analyses per month</div>
                <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  Coming soon
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 24 }}
        >
          By signing in, you agree to our{" "}
          <a
            href="/terms"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export default function LoginClient() {
  return (
    <Suspense
      fallback={
        <main className="container" style={{ padding: "80px 24px" }}>
          <div
            className="card"
            style={{ textAlign: "center", maxWidth: 400, margin: "0 auto" }}
          >
            <div style={{ fontSize: "1.2rem", color: "var(--muted)" }}>
              Loading...
            </div>
          </div>
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
