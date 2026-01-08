import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { industries } from "../../../lib/industries";

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return notFound();
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>
          {industry.title}
        </h1>
        <div className="grid grid-2">
          <div className="card">
            <h3>Why it matters</h3>
            <ul>
              {industry.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Next step</h3>
            <p>
              Run a Doorpost analysis to benchmark your above-the-fold
              performance.
            </p>
            <a className="button" href="/analyze">
              Analyze now
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
