"use client"

import Image from "next/image"
import { LogoMarquee } from "@/components/ui/logo-marquee"

interface Partner {
  name: string
  logo: string
}

const PARTNERS: Partner[] = [
  { name: "Bitmain", logo: "/partners/bitmain.avif" },
  { name: "Canaan", logo: "/partners/avalon.avif" },
  { name: "ViaBTC", logo: "/partners/viabtc.avif" },
  { name: "CoinEx", logo: "/partners/coinex.avif" },
  { name: "Auradine", logo: "/partners/auradine.webp" },
]

export function LogoBar() {
  return (
    <section className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="py-10">
            <div className="flex flex-col items-center gap-6">
              <p className="text-sm font-medium text-foreground/60">
                Trusted by industry leaders
              </p>
              <LogoMarquee speed={25} fadeColor="var(--color-elevated)">
                {PARTNERS.map((partner) => (
                  <Image
                    key={partner.name}
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={32}
                    className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  />
                ))}
              </LogoMarquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
