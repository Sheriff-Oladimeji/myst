import Image from "next/image";

import AllQuotes from "@/components/AllQuotes";

export default function Home() {
  return (
    <main className="grid md:grid-cols-3 gap-4">
    
   <AllQuotes/>
    </main>
  );
}
