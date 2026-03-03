import type { Metadata } from "next"
import { InsightsPage } from "@/components/pages/insights"

export const metadata: Metadata = {
  title: "Insights & Mining Intelligence — Bitmern Mining",
  description:
    "Market analysis, hardware reviews, strategy guides, and operational insights from the Bitmern team. Stay ahead of the curve.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights & Mining Intelligence — Bitmern Mining",
    description:
      "Market analysis, hardware reviews, strategy guides, and operational insights from the Bitmern team.",
    url: "https://bitmernmining.com/insights",
  },
}

export default function Insights() {
  return <InsightsPage />
}
