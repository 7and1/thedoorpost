import "./globals.css";
import { Space_Grotesk, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import ErrorBoundary from "../components/ErrorBoundary";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Newsreader({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "TheDoorpost — Above-the-Fold Analyzer",
  description:
    "Instant CRO analysis for your hero section. Scores, screenshots, and fixes in seconds.",
  metadataBase: new URL("https://thedoorpost.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TheDoorpost — Above-the-Fold Analyzer",
    description: "Score your hero section and get actionable CRO fixes.",
    url: "https://thedoorpost.com",
    siteName: "TheDoorpost",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheDoorpost — Above-the-Fold Analyzer",
    description: "Score your hero section and get actionable CRO fixes.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        url: "https://thedoorpost.com",
        name: "TheDoorpost",
        description:
          "Instant CRO analysis for your hero section. Scores, screenshots, and fixes in seconds.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://thedoorpost.com/analyze?url={search_term_string}",
          "query-input": "required name=url",
        },
      },
      {
        "@type": "Organization",
        name: "TheDoorpost",
        url: "https://thedoorpost.com",
        logo: "https://thedoorpost.com/logo.svg",
        description:
          "Above-the-fold analyzer for conversion rate optimization.",
        sameAs: [],
      },
      {
        "@type": "Product",
        name: "TheDoorpost Hero Analyzer",
        description:
          "Analyze your landing page hero section for conversion optimization.",
        url: "https://thedoorpost.com",
        brand: {
          "@type": "Organization",
          name: "TheDoorpost",
        },
        offers: {
          "@type": "Offer",
          url: "https://thedoorpost.com/pricing",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
        {/* Cloudflare Web Analytics
          Token: Set NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN in .env
          Get token: https://dash.cloudflare.com/[account-id]/analytics/web
          Privacy: Cloudflare Web Analytics is cookie-free and GDPR compliant
        */}
        {process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}`}
            defer
          />
        )}
      </body>
    </html>
  );
}
