import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Myst",
  description: "Online Quotes Archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full min-h-screen m-0 flex flex-col justify-between text-white`}
      >
        <Navbar />
        <div className="w-[90%] mx-auto pt-24">
 {children}
        </div>
       
        <Footer />
      </body>
    </html>
  );
}
``