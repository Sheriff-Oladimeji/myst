import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";
export const metadata: Metadata = {
  title: {
    default: "Qlip -  Explore, Create, and Share Inspirational Quotes",
    template: "%s | Qlip",
  },
  description:
    "Discover, share, and create inspiring quotes with ease on Qlip, your go-to quotes platform.",
  keywords: [
    "quotes",
    "inspirational quotes",
    "quote archive",
    "share quotes",
    "motivational quotes",
    "free quotes",
    "quotes website",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="google-site-verification"
            content="sVr1fNY12PJP5g7RHtTLJ-AVV77TWGyb7Q-fWgw5LqU"
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6855656947142398"
            crossOrigin="anonymous"
          ></script>
        </Head>

        <body
          className={`w-full min-h-screen m-0 flex flex-col justify-between text-white bg-black`}
        >
          <Navbar />

          <div className="pt-20 pb-8">{children}</div>

          <Footer />
          <Analytics />
        </body>
      </html>
    </QueryProvider>
  );
}
``;
