"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Wrench, MapPin, Check } from "lucide-react"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type FacilityStatus = "Full Capacity" | "Available Now" | "Coming Soon"

interface Facility {
  name: string
  flag: string
  status: FacilityStatus
  power: string
  rate: string
  uptime: string
  features: string[]
  note?: string
}

const FACILITIES: Facility[] = [
  {
    name: "Indiana, USA",
    flag: "\u{1F1FA}\u{1F1F8}",
    status: "Full Capacity",
    power: "20 MW",
    rate: "$0.058/kWh",
    uptime: "97%",
    features: [
      "Bitmern\u2019s largest facility and operational headquarters",
      "Redundant power with backup generators",
      "Industrial-grade air cooling with automated climate control",
      "24/7 on-site technicians and security",
      "Full CCTV surveillance and access control",
      "Direct fiber connectivity",
    ],
    note: "Currently at full capacity. Join the waitlist for priority access when new rack space opens.",
  },
  {
    name: "North Dakota, USA",
    flag: "\u{1F1FA}\u{1F1F8}",
    status: "Available Now",
    power: "3 MW",
    rate: "$0.058/kWh",
    uptime: "97%",
    features: [
      "Cold climate reduces cooling costs significantly",
      "Same power rate as Indiana \u2014 $0.058/kWh",
      "Ideal for efficiency-focused deployments",
      "Full monitoring and management included",
    ],
  },
  {
    name: "Missouri, USA",
    flag: "\u{1F1FA}\u{1F1F8}",
    status: "Available Now",
    power: "5.5 MW",
    rate: "$0.0675/kWh",
    uptime: "97%",
    features: [
      "Mid-tier power rate with strong infrastructure",
      "Expanding capacity for growing operations",
      "Full remote management via SuperApp",
      "24/7 monitoring and maintenance",
    ],
  },
  {
    name: "Addis Ababa, Ethiopia",
    flag: "\u{1F1EA}\u{1F1F9}",
    status: "Available Now",
    power: "3 MW",
    rate: "$0.055/kWh",
    uptime: "99.3%",
    features: [
      "Lowest electricity rate in our network \u2014 $0.055/kWh",
      "Clean hydroelectric power",
      "Strategic geographic diversification",
      "Growing capacity with expansion pipeline",
    ],
  },
  {
    name: "Finland",
    flag: "\u{1F1EB}\u{1F1EE}",
    status: "Coming Soon",
    power: "TBD",
    rate: "TBD",
    uptime: "\u2014",
    features: [
      "Nordic climate \u2014 minimal cooling costs year-round",
      "Stable EU regulatory environment",
      "Renewable energy sources",
      "Part of the OriginSpark 500 MW pipeline",
    ],
    note: "Current clients get priority access and locked pricing when Finland goes live.",
  },
]

const STANDARD_FEATURES = [
  {
    icon: Zap,
    title: "Power & Cooling",
    items: [
      "Redundant utility power feeds",
      "Backup diesel generators",
      "Industrial cooling (air or liquid, site-dependent)",
      "Automated climate monitoring",
    ],
  },
  {
    icon: Shield,
    title: "Security & Connectivity",
    items: [
      "24/7 physical security and CCTV",
      "Biometric/card access control",
      "Fire suppression systems",
      "Redundant network connectivity",
    ],
  },
  {
    icon: Wrench,
    title: "Operations",
    items: [
      "24/7 on-site technicians",
      "Real-time SuperApp monitoring",
      "Firmware management and optimization",
      "Hardware maintenance and repair",
    ],
  },
]

function statusTag(status: FacilityStatus) {
  switch (status) {
    case "Available Now":
      return (
        <Tag variant="success" size="sm">
          Available Now
        </Tag>
      )
    case "Full Capacity":
      return (
        <Tag variant="destructive" size="sm">
          Full Capacity
        </Tag>
      )
    case "Coming Soon":
      return (
        <Tag variant="primary" size="sm">
          Coming Soon
        </Tag>
      )
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function FacilitiesPage() {
  const hero = useSection(0.15)
  const cards = useSection(0.1)
  const standard = useSection()
  const strategy = useSection()
  const cta = useSection()

  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Hero */}
      {/* --------------------------------------------------------------- */}
      <section ref={hero.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="mx-auto max-w-3xl text-align-center"
              >
                <motion.div variants={hero.chVariants}>
                  <Tag>Our Facilities</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h1 variants={hero.chVariants}>
                  31.5+ MW Across Four Continents
                </motion.h1>
                <div className="spacer-small" />
                <motion.p
                  variants={hero.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Every facility is selected for low-cost power, stable
                  regulatory environments, and optimal climate conditions.
                  Redundant power feeds, industrial cooling, 24/7 security, and
                  on-site technicians at every site.
                </motion.p>
                <div className="spacer-medium" />
                <motion.div
                  variants={hero.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <Link href="/contact">Get a Hosting Quote</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/about">Learn About Us</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Facility Cards */}
      {/* --------------------------------------------------------------- */}
      <section ref={cards.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={cards.cVariants}
                initial="hidden"
                animate={cards.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={cards.chVariants}>
                  Active Facilities
                </motion.h2>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={cards.crdStagger}
                initial="hidden"
                animate={cards.inView ? "visible" : "hidden"}
                className="flex flex-col gap-6"
              >
                {FACILITIES.map((facility) => (
                  <motion.div
                    key={facility.name}
                    variants={cards.crdFade}
                    className="card-surface overflow-hidden rounded-lg border border-border/60 p-8"
                  >
                    {/* Header row */}
                    <div className="mb-6 flex flex-wrap items-center gap-4">
                      <h3 className="font-heading text-[1.5rem] font-semibold tracking-tight">
                        <span className="mr-2">{facility.flag}</span>
                        {facility.name}
                      </h3>
                      {statusTag(facility.status)}
                    </div>

                    {/* Stats grid */}
                    <div className="mb-6 grid grid-cols-3 gap-6 sm:max-w-md">
                      <div>
                        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-foreground/50">
                          Power
                        </p>
                        <p className="font-heading text-lg font-semibold">
                          {facility.power}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-foreground/50">
                          Rate
                        </p>
                        <p className="font-heading text-lg font-semibold">
                          {facility.rate}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-foreground/50">
                          Uptime
                        </p>
                        <p className="font-heading text-lg font-semibold">
                          {facility.uptime}
                        </p>
                      </div>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-2.5">
                      {facility.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-base leading-relaxed text-foreground/70"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Note */}
                    {facility.note && (
                      <p className="mt-6 text-sm italic text-foreground/50">
                        {facility.note}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* What Every Facility Includes */}
      {/* --------------------------------------------------------------- */}
      <section ref={standard.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={standard.cVariants}
                initial="hidden"
                animate={standard.inView ? "visible" : "hidden"}
              >
                <motion.div variants={standard.chVariants}>
                  <Tag variant="muted">Standard</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={standard.chVariants}>
                  Standard Across All Sites
                </motion.h2>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={standard.crdStagger}
                initial="hidden"
                animate={standard.inView ? "visible" : "hidden"}
                className="grid gap-8 md:grid-cols-3"
              >
                {STANDARD_FEATURES.map((group) => {
                  const Icon = group.icon
                  return (
                    <motion.div
                      key={group.title}
                      variants={standard.crdFade}
                      className="card-surface rounded-lg border border-border/60 p-8"
                    >
                      <div className="mb-6 inline-flex w-fit items-center justify-center rounded bg-primary p-2 text-primary-foreground">
                        <Icon className="size-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="mb-4 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                        {group.title}
                      </h3>
                      <ul className="space-y-3">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-base leading-relaxed text-foreground/60"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Smart Diversification */}
      {/* --------------------------------------------------------------- */}
      <section ref={strategy.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={strategy.cVariants}
                initial="hidden"
                animate={strategy.inView ? "visible" : "hidden"}
                className="mx-auto max-w-3xl text-align-center"
              >
                <motion.div variants={strategy.chVariants}>
                  <MapPin className="mx-auto mb-4 size-10 text-primary" />
                </motion.div>
                <motion.h2 variants={strategy.chVariants}>
                  Smart Diversification
                </motion.h2>
                <div className="spacer-small" />
                <motion.p
                  variants={strategy.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Start with a US deployment for regulatory stability and
                  top-tier infrastructure. Expand to Ethiopia for the lowest
                  power rates. Lock in Finland pricing early for Nordic
                  efficiency. Current clients get priority access to every new
                  facility.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* --------------------------------------------------------------- */}
      <section ref={cta.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={cta.cVariants}
                initial="hidden"
                animate={cta.inView ? "visible" : "hidden"}
                className="mx-auto max-w-3xl text-align-center"
              >
                <motion.h2 variants={cta.chVariants}>
                  Deploy at the Right Facility
                </motion.h2>
                <div className="spacer-xsmall" />
                <motion.p
                  variants={cta.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  We&rsquo;ll help you choose the optimal facility based on your
                  fleet size, budget, and risk profile.
                </motion.p>
                <div className="spacer-medium" />
                <motion.div
                  variants={cta.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <Link href="/contact">Get a Hosting Quote</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a href="https://calendly.com/bitmernmining" target="_blank" rel="noopener noreferrer">Book a Strategy Call</a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
