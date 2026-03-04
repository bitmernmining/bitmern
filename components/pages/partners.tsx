"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Tag } from "@/components/ui/tag"
import { SectionCTA } from "@/components/ui/section-cta"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Logo map — partners with available logo assets
// ---------------------------------------------------------------------------

const PARTNER_LOGOS: Record<string, string> = {
  Bitmain: "/partners/bitmain.avif",
  Canaan: "/partners/avalon.avif",
  ViaBTC: "/partners/viabtc.avif",
  CoinEx: "/partners/coinex.avif",
  Auradine: "/partners/auradine.webp",
  "Blockchain Summits": "/partners/blockchain-summits.png",
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STRATEGIC_PARTNERS = [
  {
    name: "Bitmain",
    type: "Hardware Manufacturer",
    relationship: "Direct, priority allocation",
    description:
      "The world\u2019s largest ASIC manufacturer. Our direct relationship with Bitmain means priority access to new releases (S21, S23, L9 series), volume pricing, and dedicated support channels. No middlemen, no reseller markups.",
  },
  {
    name: "Marathon Digital (MARA)",
    type: "Firmware & Technology",
    relationship: "Authorized deployment partner",
    description:
      "Bitmern is an authorized partner for MARAFW firmware deployment. We install and manage Marathon\u2019s proprietary firmware across client fleets, delivering up to 35% overclocking with intelligent thermal protection.",
  },
  {
    name: "OriginSpark",
    type: "Infrastructure Development",
    relationship: "500 MW pipeline partnership",
    description:
      "Our partnership with OriginSpark is building a 500 MW mining infrastructure pipeline \u2014 positioning Bitmern for a step-change from tens of megawatts to hundreds.",
  },
]

const HARDWARE_PARTNERS = [
  { name: "Bitmain", description: "Antminer series \u2014 S21, S23, L9, T21, KS series" },
  { name: "Canaan", description: "Avalon series \u2014 A15 Pro, A1566, Nano 3S" },
  { name: "Bitdeer", description: "SealMiner series \u2014 A2, A3, air and hydro variants" },
  { name: "Auradine", description: "Teraflux series \u2014 US-engineered, EnergyTune technology" },
  { name: "Proto", description: "Proto Rig \u2014 modular, 819 TH/s, tool-free upgrades" },
  { name: "21 Energy", description: "Ofen 2 \u2014 Bitcoin mining heater for residential use" },
  { name: "Goldshell", description: "Mini miners, KDA, CKB, SC, Aleo, Alephium ASICs" },
  { name: "ElphaPex", description: "DG series \u2014 Scrypt miners for LTC/DOGE" },
  { name: "VolcMiner", description: "D series \u2014 Scrypt miners, hydro and air variants" },
  { name: "iBeLink", description: "Kaspa, KDA, CKB, SC miners" },
  { name: "Jasminer", description: "ETC/Etchash miners" },
  { name: "Innosilicon", description: "A-series ETC miners" },
]

const ECOSYSTEM_PARTNERS = [
  {
    name: "ViaBTC",
    description:
      "Mining pool partner. Reliable pool infrastructure for hosted miners seeking shared pool payouts.",
  },
  {
    name: "CoinEx",
    description:
      "Exchange partner. Streamlined OTC and exchange access for mining operations.",
  },
  {
    name: "Blockchain Summits",
    description:
      "Events partner. Bitmern co-organizes and participates in the Blockchain Summits conference series.",
  },
]

// ---------------------------------------------------------------------------
// Shared: Partner Logo
// ---------------------------------------------------------------------------

function PartnerLogo({ name, size = "default" }: { name: string; size?: "default" | "sm" }) {
  const src = PARTNER_LOGOS[name]
  if (!src) return null
  const sizeClass = size === "sm" ? "h-8 sm:h-10" : "h-12 sm:h-14"
  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={200}
      height={56}
      className={`${sizeClass} w-auto object-contain brightness-0 opacity-70`}
    />
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PartnersPage() {
  const hero = useSection()
  const strategic = useSection()
  const hardware = useSection()
  const ecosystem = useSection()

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hero.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="max-w-3xl"
              >
                <motion.div variants={hero.chVariants}>
                  <Tag>Partners</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h1 variants={hero.chVariants}>
                  Built on Industry-Leading Partnerships
                </motion.h1>
                <div className="spacer-small" />
                <motion.p
                  variants={hero.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  From hardware manufacturers to firmware providers and mining
                  pools, Bitmern&rsquo;s partner ecosystem ensures our clients
                  get the best pricing, technology, and infrastructure in the
                  industry.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Strategic Partners */}
      {/* ----------------------------------------------------------------- */}
      <section ref={strategic.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={strategic.cVariants}
                initial="hidden"
                animate={strategic.inView ? "visible" : "hidden"}
                className="mb-12"
              >
                <motion.h2 variants={strategic.chVariants}>
                  Strategic Partnerships
                </motion.h2>
              </motion.div>

              <motion.div
                variants={strategic.crdStagger}
                initial="hidden"
                animate={strategic.inView ? "visible" : "hidden"}
                className="grid gap-6 lg:grid-cols-2"
              >
                {STRATEGIC_PARTNERS.map((partner) => {
                  const hasLogo = !!PARTNER_LOGOS[partner.name]
                  return (
                    <motion.div
                      key={partner.name}
                      variants={strategic.crdFade}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`card-surface group flex flex-col gap-4 rounded-lg border border-border/60 p-8 transition-shadow duration-350 hover:shadow-md ${hasLogo ? "hover:opacity-90" : ""}`}
                    >
                      {hasLogo && (
                        <div className="mb-1">
                          <PartnerLogo name={partner.name} />
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading text-[1.44rem] font-normal uppercase leading-none tracking-tight">
                          {partner.name}
                        </h3>
                        <Tag variant="muted" size="sm">
                          {partner.type}
                        </Tag>
                      </div>
                      <p className="font-mono text-sm text-foreground/50">
                        {partner.relationship}
                      </p>
                      <p className="text-base leading-relaxed text-foreground/70">
                        {partner.description}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Hardware Partners */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hardware.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={hardware.cVariants}
                initial="hidden"
                animate={hardware.inView ? "visible" : "hidden"}
                className="mb-12"
              >
                <motion.h2 variants={hardware.chVariants}>
                  Hardware Manufacturers
                </motion.h2>
              </motion.div>

              <motion.div
                variants={hardware.crdStagger}
                initial="hidden"
                animate={hardware.inView ? "visible" : "hidden"}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {HARDWARE_PARTNERS.map((partner) => {
                  const hasLogo = !!PARTNER_LOGOS[partner.name]
                  return (
                    <motion.div
                      key={partner.name}
                      variants={hardware.crdFade}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`card-surface group rounded-lg border border-border/60 p-6 transition-shadow duration-350 hover:shadow-md ${hasLogo ? "hover:opacity-90" : ""}`}
                    >
                      {hasLogo && (
                        <div className="mb-3">
                          <PartnerLogo name={partner.name} size="sm" />
                        </div>
                      )}
                      <h4 className="mb-2 font-heading text-base font-medium uppercase tracking-tight">
                        {partner.name}
                      </h4>
                      <p className="text-sm leading-relaxed text-foreground/60">
                        {partner.description}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Ecosystem Partners */}
      {/* ----------------------------------------------------------------- */}
      <section ref={ecosystem.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={ecosystem.cVariants}
                initial="hidden"
                animate={ecosystem.inView ? "visible" : "hidden"}
                className="mb-12"
              >
                <motion.h2 variants={ecosystem.chVariants}>
                  Ecosystem &amp; Service Partners
                </motion.h2>
              </motion.div>

              <motion.div
                variants={ecosystem.crdStagger}
                initial="hidden"
                animate={ecosystem.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-3"
              >
                {ECOSYSTEM_PARTNERS.map((partner) => {
                  const hasLogo = !!PARTNER_LOGOS[partner.name]
                  return (
                    <motion.div
                      key={partner.name}
                      variants={ecosystem.crdFade}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`card-surface group rounded-lg border border-border/60 p-8 transition-shadow duration-350 hover:shadow-md ${hasLogo ? "hover:opacity-90" : ""}`}
                    >
                      {hasLogo && (
                        <div className="mb-4">
                          <PartnerLogo name={partner.name} />
                        </div>
                      )}
                      <h3 className="mb-4 font-heading text-[1.2rem] font-normal uppercase leading-none tracking-tight">
                        {partner.name}
                      </h3>
                      <p className="text-base leading-relaxed text-foreground/70">
                        {partner.description}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Become a Partner CTA */}
      {/* ----------------------------------------------------------------- */}
      <SectionCTA
        variant="elevated"
        tag="Partner With Us"
        heading="Become a Bitmern Partner"
        description="We're always looking for strategic partners — hardware manufacturers, energy providers, institutional investors, and technology companies. If you can help us mine more Bitcoin, more efficiently, we want to talk."
        primaryCTA={{ label: "Contact Our Team", href: "/contact" }}
      />
    </>
  )
}
