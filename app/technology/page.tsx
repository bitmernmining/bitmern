import type { Metadata } from "next"
import { TechnologyPage } from "@/components/pages/technology"

export const metadata: Metadata = {
  title: "Technology & SuperApp — Bitmern Mining",
  description:
    "Enterprise monitoring with real-time control. The Bitmern SuperApp gives you full visibility over your mining operation with real-time dashboards, automated alerts, AI optimization, and remote management.",
  alternates: {
    canonical: "/technology",
  },
  openGraph: {
    title: "Technology & SuperApp — Bitmern Mining",
    description:
      "Enterprise monitoring with real-time control. Real-time dashboards, automated alerts, AI optimization, and remote management.",
    url: "/technology",
  },
}

export default function Technology() {
  return <TechnologyPage />
}
