import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
    "Enterprise-grade Bitcoin mining infrastructure, ASIC hosting, and solo mining pools. 20+ MW capacity across US and Nordic facilities. Built for serious miners.",
  metadataBase: new URL("https://bitmernmining.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Bitmern Mining — Bitcoin Mining Infrastructure & Hosting",
    description:
      "Enterprise-grade Bitcoin mining infrastructure, ASIC hosting, and solo mining pools. 20+ MW capacity across US and Nordic facilities.",
    type: "website",
    url: "https://bitmernmining.com",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitmern Mining — Bitcoin Mining Infrastructure & Hosting",
    description:
      "Enterprise-grade Bitcoin mining infrastructure, ASIC hosting, and solo mining pools.",
    images: ["/opengraph-image.png"],
  },
  other: {
    "theme-color": "#f2ae2e",
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
      dir="ltr"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bitmern Mining",
              url: "https://bitmernmining.com",
              logo: "https://bitmernmining.com/favicon.png",
              description:
                "Enterprise-grade Bitcoin mining infrastructure, ASIC hosting, and solo mining pools. 20+ MW capacity across US and Nordic facilities.",
              sameAs: [
                "https://www.linkedin.com/company/bitmern",
                "https://www.instagram.com/bitmernmining",
                "https://www.youtube.com/@bitmernmining",
              ],
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <div className="page-wrapper">
          <Navbar />
          <main id="main-content" className="main-wrapper">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
