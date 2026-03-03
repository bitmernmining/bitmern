import type { Metadata } from "next"
import { HardwarePage } from "@/components/pages/hardware"

export const metadata: Metadata = {
  title: "ASIC Mining Hardware — Bitmern Mining",
  description:
    "Source ASIC miners at institutional pricing. Direct relationships with Bitmain, Canaan, Bitdeer, Auradine, and 13+ manufacturers. Priority allocation and volume pricing.",
  alternates: {
    canonical: "/hardware",
  },
  openGraph: {
    title: "ASIC Mining Hardware — Bitmern Mining",
    description:
      "Source ASIC miners at institutional pricing. 17 brands, 150+ products, direct manufacturer access.",
    url: "https://bitmernmining.com/hardware",
  },
}

export default function Hardware() {
  return <HardwarePage />
}
