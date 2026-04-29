import type { Metadata } from "next"
import { HostingPage } from "@/components/pages/hosting"

export const metadata: Metadata = {
  title: "ASIC Hosting & Colocation — Bitmern Mining",
  description:
    "Deploy your ASICs at our global facilities with sub-$0.06/kWh power, 97% uptime, and real-time monitoring. You retain full ownership — we handle everything else.",
  alternates: {
    canonical: "/hosting",
  },
  openGraph: {
    title: "ASIC Hosting & Colocation — Bitmern Mining",
    description:
      "Deploy your ASICs at our global facilities with sub-$0.06/kWh power, 97% uptime, and real-time monitoring.",
    url: "/hosting",
  },
}

export default function Hosting() {
  return <HostingPage />
}
