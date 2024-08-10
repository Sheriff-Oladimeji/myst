import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";
const inter = Inter({ subsets: ["latin"] });

export const runtime = 'edge' 
export const metadata: Metadata = {
  title: "Qlip",
  description: "Online Quotes Archive",
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
          <Navbar />

          <div className="w-[90%] mx-auto">{children}</div>

          <Footer />
        </body>
      </html>
    </QueryProvider>
  );
}
``