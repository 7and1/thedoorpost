import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>Pricing</h1>
        <p style={{ color: "var(--muted)" }}>
          Simple, transparent pricing. Start for free.
        </p>
        <div className="grid grid-2" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Starter</h3>
            <p style={{ fontSize: "2rem", margin: "12px 0" }}>$0</p>
            <ul>
              <li>10 analyses per month</li>
              <li>Basic reports</li>
              <li>7-day report retention</li>
            </ul>
            <a className="button" style={{ marginTop: 12 }} href="/analyze">
              Get Started
            </a>
          </div>
          <div className="card" style={{ borderColor: "#1d4ed8" }}>
            <h3>Pro</h3>
            <p style={{ fontSize: "2rem", margin: "12px 0" }}>$29/mo</p>
            <ul>
              <li>200 analyses per month</li>
              <li>Full reports + export</li>
              <li>12-month report retention</li>
            </ul>
            <a className="button" style={{ marginTop: 12 }} href="/contact">
              Contact Us
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
