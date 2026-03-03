import type { Metadata } from "next"
import { AboutPage } from "@/components/pages/about"

export const metadata: Metadata = {
  title: "Our Story — Bitmern Mining",
  description:
    "From Greece to global mining infrastructure. Bitmern Mining started with a single conviction: Bitcoin mining should be accessible, transparent, and professionally managed.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Our Story — Bitmern Mining",
    description:
      "From Greece to global mining infrastructure. A $10M+ Bitcoin mining company serving individual miners and institutional investors across three continents.",
    url: "https://bitmernmining.com/about",
  },
}

export default function About() {
  return <AboutPage />
}
