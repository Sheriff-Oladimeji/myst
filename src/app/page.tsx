import Image from "next/image";

import AllQuotes from "@/components/AllQuotes";
import QOD from "@/components/QOD";
import Head from "next/head";
  export const runtime = "edge";
export default function Home() {
  return (
    <main>

      <QOD />
      <AllQuotes />
    </main>
  );
}
