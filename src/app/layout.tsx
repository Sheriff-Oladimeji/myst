import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: {
    default: "Qlip - Explore, Create, and Share Inspirational Quotes",
    template: "%s | Qlip",
  },
  description:
    "Qlip is the ultimate platform to discover, create, and share inspirational and motivational quotes. Easily filter quotes by authors and categories, and download them as beautiful images. Join our community to explore a vast collection of quotes and share your own.",
  keywords: [
    "quotes",
    "inspirational quotes",
    "motivational quotes",
    "quote images",
    "share quotes",
    "download quotes",
    "quote categories",
    "quote authors",
    "create quotes",
    "quote platform",
    "Qlip",
    "famous quotes",
    "life quotes",
    "love quotes",
    "success quotes",
    "wisdom quotes",
    "quote community",
    "quote sharing",
    "quote creation",
    "quote discovery",
  ],
  authors: [{ name: "Sheriff Oladimeji" }],
  creator: "Sheriff Oladimeji",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qlip.vercel.app/",
    siteName: "Qlip",
    images: [
      {
        url: "https://www.yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Qlip - Your Interactive Quote Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dimeji_dev",
    creator: "@dimeji_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "sVr1fNY12PJP5g7RHtTLJ-AVV77TWGyb7Q-fWgw5LqU",
  },
  alternates: {
    canonical: "https://qlip.vercel.app/",
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body
          className={`w-full min-h-screen m-0 flex flex-col justify-between text-white bg-black`}
        >
          {/* <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6855656947142398"
            crossOrigin="anonymous"
          /> */}
          <Script id="schema-org" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://qlip.vercel.app/",
              name: "Qlip",
              author: {
                "@type": "Person",
                name: "Sheriff Oladimeji",
              },
              description:
                "Discover, share, and create inspiring quotes with ease on Qlip, your go-to quotes platform.",
              publisher: {
                "@type": "Organization",
                name: "Qlip",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://qlip.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            })}
          </Script>
          <Navbar />
          <div className="pt-20 pb-8">{children}</div>
          <Footer />
          <Analytics />
          <SpeedInsights/>
        </body>
      </html>
    </QueryProvider>
  );
}
