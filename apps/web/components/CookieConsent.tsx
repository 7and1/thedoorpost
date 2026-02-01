"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setShowBanner(false);
  };

  const rejectNonEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "var(--card)",
        borderTop: "1px solid var(--border)",
        padding: "16px 24px",
        zIndex: 1000,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            We use cookies to improve your experience. Cloudflare Web Analytics
            is cookie-free and GDPR compliant. No personal data is stored.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={rejectNonEssential}
            style={{
              padding: "8px 16px",
              fontSize: "0.85rem",
              borderRadius: 6,
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            Reject Non-Essential
          </button>
          <button
            onClick={acceptAll}
            style={{
              padding: "8px 16px",
              fontSize: "0.85rem",
              borderRadius: 6,
              border: "none",
              backgroundColor: "var(--accent)",
              color: "white",
              cursor: "pointer",
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
