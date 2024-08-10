import Image from "next/image";

import AllQuotes from "@/components/AllQuotes";
import QOD from "@/components/QOD";
  export const runtime = "edge";
export default function Home() {
  return (
    <main className="pt-24 pb-8">
      <QOD />
      <AllQuotes />
    </main>
  );
}
