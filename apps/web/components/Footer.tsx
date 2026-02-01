import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "space-between",
        }}
      >
        <div style={{ minWidth: 200 }}>
          <strong>TheDoorpost</strong>
          <p style={{ margin: "8px 0", color: "var(--muted)", fontSize: "0.9rem" }}>
            Free above-the-fold CRO analyzer. Get instant scores and actionable fixes for your landing pages.
          </p>
          <p style={{ margin: "8px 0", fontSize: "0.9rem" }}>
            <a href="mailto:hello@thedoorpost.com">hello@thedoorpost.com</a>
          </p>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <strong style={{ fontSize: "0.85rem", textTransform: "uppercase" }}>Product</strong>
            <Link href="/analyze" style={{ fontSize: "0.9rem" }}>Analyze</Link>
            <Link href="/pricing" style={{ fontSize: "0.9rem" }}>Pricing</Link>
            <Link href="/blog" style={{ fontSize: "0.9rem" }}>Blog</Link>
            <Link href="/about" style={{ fontSize: "0.9rem" }}>About</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <strong style={{ fontSize: "0.85rem", textTransform: "uppercase" }}>Resources</strong>
            <Link href="/best-landing-pages" style={{ fontSize: "0.9rem" }}>Best Landing Pages</Link>
            <Link href="/common-mistakes" style={{ fontSize: "0.9rem" }}>Common Mistakes</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <strong style={{ fontSize: "0.85rem", textTransform: "uppercase" }}>Legal</strong>
            <Link href="/privacy" style={{ fontSize: "0.9rem" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: "0.9rem" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border)", fontSize: "0.85rem", color: "var(--muted)" }}>
        © {new Date().getFullYear()} TheDoorpost. All rights reserved.
      </div>
    </footer>
  );
}
