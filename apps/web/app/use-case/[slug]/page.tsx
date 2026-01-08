import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useCases } from "../../../lib/useCases";

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
