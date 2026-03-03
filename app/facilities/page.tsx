import type { Metadata } from "next"
import { FacilitiesPage } from "@/components/pages/facilities"

export const metadata: Metadata = {
  title: "Our Facilities — Bitmern Mining",
  description:
    "31.5+ MW across three continents. Low-cost power, stable regulatory environments, optimal climate conditions, redundant power feeds, industrial cooling, 24/7 security, and on-site technicians at every site.",
  alternates: {
    canonical: "/facilities",
  },
  openGraph: {
    title: "Our Facilities — Bitmern Mining",
    description:
      "31.5+ MW across three continents. Low-cost power, stable regulatory environments, optimal climate conditions, and on-site technicians at every site.",
    url: "/facilities",
  },
}

export default function Facilities() {
  return <FacilitiesPage />
}
