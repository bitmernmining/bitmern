import type { Metadata } from "next"
import { InstitutionalPage } from "@/components/pages/institutional"

export const metadata: Metadata = {
  title: "Institutional Mining & Blocks Fund — Bitmern Mining",
  description:
    "Bitcoin mining infrastructure for Family Offices, HNWIs, and Institutional Investors. Structured exposure, transparent reporting, and quarterly distributions.",
  alternates: {
    canonical: "/institutional",
  },
  openGraph: {
    title: "Institutional Mining & Blocks Fund — Bitmern Mining",
    description:
      "Bitcoin mining infrastructure for Family Offices, HNWIs, and Institutional Investors. Structured exposure, transparent reporting, and quarterly distributions.",
    url: "/institutional",
  },
}

export default function Institutional() {
  return <InstitutionalPage />
}
