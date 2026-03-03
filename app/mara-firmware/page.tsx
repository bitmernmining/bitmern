import type { Metadata } from "next"
import { MaraFirmwarePage } from "@/components/pages/mara-firmware"

export const metadata: Metadata = {
  title: "MARA Firmware (MARAFW) — Bitmern Mining",
  description:
    "Realize your miners' true potential. Bitmern is an authorized deployment partner for Marathon Digital's MARAFW — up to 35% overclocking, 99% uptime, and industry-leading efficiency.",
  alternates: {
    canonical: "/mara-firmware",
  },
  openGraph: {
    title: "MARA Firmware (MARAFW) — Bitmern Mining",
    description:
      "Authorized MARAFW deployment partner. Up to 35% overclocking, 99% uptime, intelligent auto-tuning for your ASIC fleet.",
    url: "https://bitmernmining.com/mara-firmware",
  },
}

export default function MaraFirmware() {
  return <MaraFirmwarePage />
}
