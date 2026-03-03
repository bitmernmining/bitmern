import type { Metadata } from "next"
import { HostingPage } from "@/components/pages/hosting"

export const metadata: Metadata = {
  title: "ASIC Hosting & Colocation | Bitmern Mining",
  description:
    "Deploy your ASICs at our US and international facilities with sub-$0.06/kWh power, 97% uptime, and real-time monitoring. You retain full ownership — we handle everything else.",
}

export default function Hosting() {
  return <HostingPage />
}
