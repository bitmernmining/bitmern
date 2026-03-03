import type { Metadata } from "next"
import { SoloPoolPage } from "@/components/pages/solo-pool"

export const metadata: Metadata = {
  title: "Solo Mining Pool — Bitmern Mining",
  description:
    "Mine Bitcoin, Litecoin, Dogecoin, Bitcoin Cash, or DigiByte solo. Flat 1% fee, direct wallet payouts, no shared rewards, no middlemen. 99.9% uptime on enterprise infrastructure.",
  alternates: {
    canonical: "/solo-pool",
  },
  openGraph: {
    title: "Solo Mining Pool — Bitmern Mining",
    description:
      "Keep the entire block reward to yourself. Flat 1% fee, direct wallet payouts, 99.9% uptime.",
    url: "https://bitmernmining.com/solo-pool",
  },
}

export default function SoloPool() {
  return <SoloPoolPage />
}
