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
      <div style={{ display: "flex", gap: 16, fontSize: "0.95rem" }}>
        <Link href="/analyze">Analyze</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/blog">Blog</Link>
      </div>
    </nav>
  );
}
