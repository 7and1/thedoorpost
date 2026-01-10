import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useCases } from "../../../lib/useCases";

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) return { title: "Use case not found" };
  return {
    title: `${useCase.title} — TheDoorpost`,
    description: `Above-the-fold insights for ${useCase.title.toLowerCase()}. Optimize your hero section for better conversions.`,
    alternates: {
      canonical: `/use-case/${useCase.slug}`,
    },
    openGraph: {
      title: `${useCase.title} — TheDoorpost`,
      description: `Above-the-fold insights for ${useCase.title.toLowerCase()}.`,
      url: `https://thedoorpost.com/use-case/${useCase.slug}`,
      type: "website",
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) return notFound();
  return (
    <main>
      <Navbar />
      <section className="section">
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>
          {useCase.title}
        </h1>
        <div className="grid grid-2">
          <div className="card">
            <h3>Highlights</h3>
            <ul>
              {useCase.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Next step</h3>
            <p>
              Generate a report to align your team around conversion priorities.
            </p>
            <a className="button" href="/analyze">
              Generate report
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
