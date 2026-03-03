import type { Metadata } from "next"
import { ExpansionPage } from "@/components/pages/expansion"

export const metadata: Metadata = {
  title: "Expansion & Growth Pipeline — Bitmern Mining",
  description:
    "Building the next generation of mining infrastructure. From 3 MW to 500+ MW — Nordic facilities, the OriginSpark partnership, and priority access for existing clients.",
  alternates: {
    canonical: "/expansion",
  },
  openGraph: {
    title: "Expansion & Growth Pipeline — Bitmern Mining",
    description:
      "Building the next generation of mining infrastructure. From 3 MW to 500+ MW — Nordic facilities, the OriginSpark partnership, and priority access.",
    url: "/expansion",
  },
}

export default function Expansion() {
  return <ExpansionPage />
}
