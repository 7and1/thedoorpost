import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "space-between",
        }}
      >
        <div>
          <strong>TheDoorpost</strong>
          <div>Above-the-fold CRO analyzer.</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:hello@thedoorpost.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
