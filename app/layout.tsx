import type { Metadata } from "next";
import "./globals.css";
import SiteBackground from "@/components/SiteBackground";

export const metadata: Metadata = {
  title: "CryptoLab",
  description: "Le Basi-TradingBook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-[#070B16] text-white antialiased">
        <SiteBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}