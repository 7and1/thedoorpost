import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — TheDoorpost",
  description:
    "Talk to TheDoorpost about audits, pricing, or product questions. We reply within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>Contact</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          Have questions? We'd love to hear from you.
        </p>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
