import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitmern Mining — Bitcoin Mining Infrastructure & Hosting",
  description:
    "Enterprise-grade Bitcoin mining infrastructure, ASIC hosting, and solo mining pools. Built for serious miners.",
  openGraph: {
    title: "Bitmern Mining — Bitcoin Mining Infrastructure & Hosting",
    description:
      "Enterprise-grade Bitcoin mining infrastructure, ASIC hosting, and solo mining pools.",
    type: "website",
    url: "https://bitmernmining.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitmern Mining — Bitcoin Mining Infrastructure & Hosting",
    description:
      "Enterprise-grade Bitcoin mining infrastructure, ASIC hosting, and solo mining pools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background antialiased">
        <div className="page-wrapper">
          <Navbar />
          <main className="main-wrapper">{children}</main>
        </div>
      </body>
    </html>
  );
}
