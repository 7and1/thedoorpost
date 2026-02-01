"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 0",
      }}
    >
      <Link href="/" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
        TheDoorpost
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: "0.95rem",
        }}
      >
        <Link href="/analyze">Analyze</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/blog">Blog</Link>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 999,
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            color: "#10b981",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          Free · No login
        </span>
      </div>
    </nav>
  );
}
