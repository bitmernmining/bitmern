"use client"

import Image from "next/image"
import { LogoMarquee } from "@/components/ui/logo-marquee"

interface Partner {
  name: string
  logo?: string
}

const PARTNERS: Partner[] = [
  { name: "Bitmain", logo: "/partners/bitmain.avif" },
  { name: "MicroBT" },
  { name: "Canaan", logo: "/partners/avalon.avif" },
  { name: "ViaBTC", logo: "/partners/viabtc.avif" },
  { name: "CoinEx", logo: "/partners/coinex.avif" },
  { name: "Auradine", logo: "/partners/auradine.webp" },
  { name: "Marathon Digital" },
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
                {PARTNERS.map((partner) =>
                  partner.logo ? (
                    <Image
                      key={partner.name}
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={32}
                      className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    />
                  ) : (
                    <span
                      key={partner.name}
                      className="font-heading text-lg font-medium uppercase tracking-tight text-foreground/40 hover:text-foreground/70 transition-opacity h-8 flex items-center whitespace-nowrap"
                    >
                      {partner.name}
                    </span>
                  )
                )}
              </LogoMarquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
