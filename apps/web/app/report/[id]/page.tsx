import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ReportCard from "../../../components/ReportCard";
import ScreenshotPanel from "../../../components/ScreenshotPanel";
import ShareButtons from "../../../components/ShareButtons";
import FeedbackButtons from "../../../components/FeedbackButtons";
import type { ReportResult } from "@thedoorpost/shared";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.thedoorpost.com";

async function getReport(id: string): Promise<ReportResult | null> {
  const res = await fetch(`${API_BASE}/api/reports/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return (await res.json()) as ReportResult;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) return { title: "Report not found" };
  return {
    title: `TheDoorpost Report — ${report.data.overall_score}/100`,
    description: report.data.summary,
    alternates: {
      canonical: `/report/${id}`,
    },
    openGraph: {
      title: `TheDoorpost Report — ${report.data.overall_score}/100`,
      description: report.data.summary,
      url: `https://thedoorpost.com/report/${id}`,
      images: [{ url: report.image, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `TheDoorpost Report — ${report.data.overall_score}/100`,
      description: report.data.summary,
      images: [report.image],
    },
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) return notFound();
  const reportPath = `/report/${id}`;
  const exportPdfUrl = `${API_BASE}/api/reports/${id}/export.pdf`;
  const exportCsvUrl = `${API_BASE}/api/reports/${id}/export.csv`;
  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `TheDoorpost Report ${report.data.overall_score}/100`,
    reviewBody: report.data.summary,
    reviewRating: {
      "@type": "Rating",
      ratingValue: report.data.overall_score,
      bestRating: "100",
      worstRating: "0",
    },
    author: {
      "@type": "Organization",
      name: "TheDoorpost",
    },
    itemReviewed: {
      "@type": "CreativeWork",
      name: "Above-the-Fold Report",
      url: `https://thedoorpost.com/report/${id}`,
    },
  };

  return (
    <main>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <section className="section">
        <h1 style={{ fontSize: "2.2rem", marginBottom: 12 }}>Report #{id}</h1>
        <ShareButtons reportUrl={reportPath} />
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <a
            className="button secondary"
            href={exportPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Download PDF
          </a>
          <a
            className="button secondary"
            href={exportCsvUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Download CSV
          </a>
        </div>
        <div className="grid grid-2">
          <ScreenshotPanel imageUrl={report.image} alt="Report Screenshot" />
          <ReportCard report={report.data} />
        </div>
        <FeedbackButtons />
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <a className="button" href="/">
            Analyze Another Site
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
