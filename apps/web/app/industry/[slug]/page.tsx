import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { industries } from "../../../lib/industries";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry not found" };
  return {
    title: `${industry.title} — TheDoorpost`,
    description: `Optimize above-the-fold performance for ${industry.title.toLowerCase()}. Industry-specific CRO insights and hero section analysis.`,
    alternates: {
      canonical: `/industry/${industry.slug}`,
    },
    openGraph: {
      title: `${industry.title} Landing Page Analyzer — TheDoorpost`,
      description: `Optimize above-the-fold performance for ${industry.title.toLowerCase()}.`,
      url: `https://thedoorpost.com/industry/${industry.slug}`,
      type: "website",
    },
  };
}

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
