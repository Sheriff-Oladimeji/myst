
import GoogleAd from "@/components/GoogleAd";
import AllQuotes from "@/components/AllQuotes";
import QOD from "@/components/QOD";
import Head from "next/head";
export const runtime = "edge";
export default function Home() {
  return (
    <main>
      <Head>
        <meta
          name="google-site-verification"
          content="sVr1fNY12PJP5g7RHtTLJ-AVV77TWGyb7Q-fWgw5LqU"
        />
      </Head>

      <QOD />
      <GoogleAd adSlot="f08c47fec0942fa0" />
      <AllQuotes />
    </main>
  );
}
