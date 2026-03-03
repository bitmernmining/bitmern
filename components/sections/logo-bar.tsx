import Image from "next/image"

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

// Normalize visual weight — wider logos get constrained, narrow ones get boosted
const LOGO_WIDTHS: Record<string, string> = {
  Bitmain: "w-20 sm:w-28",
  Canaan: "w-24 sm:w-32",
  ViaBTC: "w-20 sm:w-28",
  CoinEx: "w-20 sm:w-28",
  Auradine: "w-24 sm:w-36",
}

export function LogoBar() {
  return (
    <section className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="py-10">
            <div className="flex flex-col items-center gap-8">
              <p className="text-sm font-medium text-foreground/60">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
                {PARTNERS.map((partner) => (
                  <Image
                    key={partner.name}
                    src={partner.logo}
                    alt={partner.name}
                    width={280}
                    height={64}
                    className={`${LOGO_WIDTHS[partner.name] || "w-28"} h-auto brightness-0 opacity-50 hover:opacity-70 transition-[opacity,filter]`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
