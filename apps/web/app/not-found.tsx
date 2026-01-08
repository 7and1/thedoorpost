import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="section" style={{ textAlign: "center" }}>
        <div className="card" style={{ maxWidth: 500, margin: "0 auto" }}>
          <h1 style={{ fontSize: "4rem", marginBottom: 8 }}>404</h1>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>
            Page not found
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 32 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <Link href="/" className="button">
              Go Home
            </Link>
            <div style={{ display: "flex", gap: 16, fontSize: "0.9rem" }}>
              <Link href="/analyze" style={{ color: "var(--muted)" }}>
                Analyze
              </Link>
              <span style={{ color: "var(--border)" }}>|</span>
              <Link href="/pricing" style={{ color: "var(--muted)" }}>
                Pricing
              </Link>
              <span style={{ color: "var(--border)" }}>|</span>
              <Link href="/contact" style={{ color: "var(--muted)" }}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
