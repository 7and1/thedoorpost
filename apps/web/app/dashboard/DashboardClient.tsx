"use client";

import { useAuth } from "../../lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function QuotaProgress({
  used,
  limit,
  label,
}: {
  used: number;
  limit: number;
  label: string;
}) {
  const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const color =
    percentage >= 95 ? "#ef4444" : percentage >= 80 ? "#f59e0b" : "#10b981";

  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span style={{ color: "var(--muted)" }}>
          {used} / {limit}
        </span>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "var(--border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: color,
            borderRadius: 4,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function DashboardClient() {
  const { user, usage, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

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

  if (!user) {
    return null;
  }

  const quotaUsed =
    user.tier === "pro" ? usage?.this_month || 0 : usage?.today || 0;
  const quotaLimit = usage?.quota?.limit || (user.tier === "pro" ? 500 : 10);
  const quotaLabel = user.tier === "pro" ? "Monthly Usage" : "Daily Usage";

  const resetDate = usage?.quota?.reset_at
    ? new Date(usage.quota.reset_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <main className="container" style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {user.github_avatar_url && (
              <img
                src={user.github_avatar_url}
                alt={user.github_login}
                width={48}
                height={48}
                style={{ borderRadius: "50%" }}
              />
            )}
            <div>
              <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
                {user.github_name || user.github_login}
              </h1>
              <div style={{ color: "var(--muted)" }}>@{user.github_login}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="button"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--fg)",
            }}
          >
            Sign Out
          </button>
        </div>

        {/* Tier Badge */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 12,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  backgroundColor:
                    user.tier === "pro"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(59, 130, 246, 0.1)",
                  color: user.tier === "pro" ? "#10b981" : "#3b82f6",
                }}
              >
                {user.tier === "pro" ? "Pro" : "Free"} Plan
              </div>
            </div>
            {user.tier === "free" && (
              <a
                href="/pricing"
                style={{ color: "var(--primary)", fontSize: "0.9rem" }}
              >
                Upgrade to Pro (Coming Soon)
              </a>
            )}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 24, fontSize: "1.25rem" }}>Usage</h2>

          <QuotaProgress
            used={quotaUsed}
            limit={quotaLimit}
            label={quotaLabel}
          />

          {resetDate && (
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.9rem",
                marginBottom: 16,
              }}
            >
              Resets: {resetDate}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              paddingTop: 16,
              borderTop: "1px solid var(--border)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                {usage?.today || 0}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                Today
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                {usage?.this_month || 0}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                This Month
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                {usage?.total || 0}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                All Time
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 style={{ marginBottom: 16, fontSize: "1.25rem" }}>
            Quick Actions
          </h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/analyze" className="button">
              New Analysis
            </a>
            <a
              href="/"
              className="button"
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--fg)",
              }}
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
