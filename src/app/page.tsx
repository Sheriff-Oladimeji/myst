import Image from "next/image";

import AllQuotes from "@/components/AllQuotes";
import QOD from "@/components/QOD";
import Head from "next/head";
  export const runtime = "edge";
export default function Home() {
  return (
    <main>
      <Head>
        <title>Qlip</title>
        <meta
          name="description"
          content="Qlip is an online quotes archive = Discover, share, and create inspiring quotes with ease."
        />
        <meta property="og:title" content="Qlip" />
        <meta
          property="og:description"
          content="Qlip is an online quotes archive = Discover, share, and create inspiring quotes with ease."
        />
        <meta property="og:image" content="https://example.com/thumbnail.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <QOD />
      <AllQuotes />
    </main>
  );
}
