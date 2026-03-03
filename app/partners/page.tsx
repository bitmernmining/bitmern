import type { Metadata } from "next"
import { PartnersPage } from "@/components/pages/partners"

export const metadata: Metadata = {
  title: "Partners — Bitmern Mining",
  description:
    "From hardware manufacturers to firmware providers and mining pools, Bitmern's partner ecosystem ensures the best pricing, technology, and infrastructure in the industry.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Partners — Bitmern Mining",
    description:
      "Industry-leading partnerships with Bitmain, Marathon Digital, OriginSpark, and 15+ hardware manufacturers.",
    url: "https://bitmernmining.com/partners",
  },
}

export default function Partners() {
  return <PartnersPage />
}
