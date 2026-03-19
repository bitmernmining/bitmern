"use client"

import { motion, type Variants } from "framer-motion"
import { Zap, Shield, Wrench, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { SectionCTA } from "@/components/ui/section-cta"
import { FacilityGlobe } from "@/components/animations/facility-globe"
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
  photo: string
}

// USA facilities hidden for now
// const USA_FACILITIES: Facility[] = [
//   { name: "Indiana, USA", ... },
//   { name: "North Dakota, USA", ... },
//   { name: "Missouri, USA", ... },
// ]

const FACILITIES: Facility[] = [
  {
    name: "Addis Ababa, Ethiopia",
    flag: "\u{1F1EA}\u{1F1F9}",
    status: "Available Now",
    power: "3 MW",
    rate: "$0.055/kWh",
    uptime: "97%",
    features: [
      "Lowest electricity rate in our network \u2014 $0.055/kWh",
      "Clean hydroelectric power",
      "Strategic geographic diversification",
      "Growing capacity with expansion pipeline",
    ],
    photo: "/facilities/addis-ababa.webp",
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
    photo: "/facilities/finland.webp",
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

function statusBadge(status: FacilityStatus) {
  switch (status) {
    case "Available Now":
      return (
        <Tag variant="success" size="sm">
          Available
        </Tag>
      )
    case "Full Capacity":
      return (
        <Tag variant="muted" size="sm">
          At Capacity
        </Tag>
      )
    case "Coming Soon":
      return (
        <Tag variant="primary" size="sm">
          Expanding
        </Tag>
      )
  }
}

// ---------------------------------------------------------------------------
// Facility Card Component
// ---------------------------------------------------------------------------

function FacilityCard({
  facility,
  flagship = false,
  variants,
}: {
  facility: Facility
  flagship?: boolean
  variants: Variants
}) {
  return (
    <motion.div
      variants={variants}
      className={`card-surface overflow-hidden rounded-lg border border-border/60 ${
        flagship ? "lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-stretch" : ""
      }`}
    >
      {/* Photo */}
      <div
        className={`relative overflow-hidden ${
          flagship
            ? "aspect-[16/10] lg:aspect-auto lg:min-h-[420px]"
            : "aspect-[16/10]"
        }`}
      >
        <Image
          src={facility.photo}
          alt={`${facility.name} mining facility`}
          fill
          className="object-cover"
          sizes={flagship ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          quality={85}
        />
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h3 className="font-heading text-[1.35rem] font-semibold tracking-tight">
            <span className="mr-2">{facility.flag}</span>
            {facility.name}
          </h3>
          {statusBadge(facility.status)}
        </div>

        {/* Power capacity callout */}
        <p className="mb-4 font-heading text-2xl font-bold tracking-tight text-primary">
          {facility.power}
        </p>

        {/* Stats row */}
        <div className="mb-5 flex gap-6">
          <div>
            <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-foreground/50">
              Rate
            </p>
            <p className="font-heading text-base font-semibold">
              {facility.rate}
            </p>
          </div>
          <div>
            <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-foreground/50">
              Uptime
            </p>
            <p className="font-heading text-base font-semibold">
              {facility.uptime}
            </p>
          </div>
        </div>

        {/* Feature list */}
        <ul className="space-y-2">
          {facility.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/70"
            >
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Note */}
        {facility.note && (
          <p className="mt-5 text-sm italic text-foreground/50">
            {facility.note}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function FacilitiesPage() {
  const hero = useSection(0.15)
  const cards = useSection(0.1)
  const standard = useSection()
  const strategy = useSection()

  const [flagship, ...rest] = FACILITIES

  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Hero — Split Layout with Photo */}
      {/* --------------------------------------------------------------- */}
      <section ref={hero.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:min-h-[70vh]"
              >
                {/* Left — Text */}
                <div>
                  <motion.div variants={hero.chVariants}>
                    <Tag>Our Facilities</Tag>
                  </motion.div>
                  <div className="spacer-xsmall" />
                  <motion.h1 variants={hero.chVariants}>
                    Purpose-Built Mining Infrastructure
                  </motion.h1>
                  <div className="spacer-small" />
                  <motion.p
                    variants={hero.chVariants}
                    className="text-[1.125rem] leading-relaxed text-foreground/70"
                  >
                    Global mining infrastructure selected for low-cost power,
                    stable regulatory environments, and optimal climate
                    conditions. Redundant power feeds, industrial cooling, 24/7
                    security, and on-site technicians at every site.
                  </motion.p>
                  <div className="spacer-medium" />
                  <motion.div
                    variants={hero.chVariants}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <Button size="lg" asChild>
                      <Link href="/contact">Get a Hosting Quote</Link>
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/about">Learn About Us</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Right — Photo */}
                <motion.div
                  variants={hero.chVariants}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl lg:aspect-auto lg:h-full lg:min-h-[420px]"
                >
                  <Image
                    src="/facilities/addis-ababa.webp"
                    alt="Bitmern Mining facility in Addis Ababa, Ethiopia"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    quality={90}
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Facility Cards — Bento Layout */}
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
                {/* Flagship — Ethiopia, full width */}
                <FacilityCard
                  facility={flagship}
                  flagship
                  variants={cards.crdFade}
                />

                {/* Remaining facilities */}
                {rest.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {rest.map((facility) => (
                      <FacilityCard
                        key={facility.name}
                        facility={facility}
                        variants={cards.crdFade}
                      />
                    ))}
                  </div>
                )}
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
      {/* Smart Diversification — Globe */}
      {/* --------------------------------------------------------------- */}
      <section ref={strategy.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={strategy.cVariants}
                initial="hidden"
                animate={strategy.inView ? "visible" : "hidden"}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                {/* Left — Text */}
                <div>
                  <motion.div variants={strategy.chVariants}>
                    <Tag variant="muted">Strategy</Tag>
                  </motion.div>
                  <div className="spacer-xsmall" />
                  <motion.h2 variants={strategy.chVariants}>
                    Smart Diversification
                  </motion.h2>
                  <div className="spacer-small" />
                  <motion.p
                    variants={strategy.chVariants}
                    className="text-[1.125rem] leading-relaxed text-foreground/70"
                  >
                    Deploy in Ethiopia for the lowest power rates in our
                    network. Lock in Finland pricing early for Nordic efficiency.
                    Current clients get priority access to every new facility as
                    we expand.
                  </motion.p>
                </div>

                {/* Right — Globe */}
                <motion.div
                  variants={strategy.chVariants}
                  className="mx-auto aspect-square w-full max-w-[500px]"
                >
                  <FacilityGlobe />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* --------------------------------------------------------------- */}
      <SectionCTA
        tag="Get Started"
        heading="Deploy at the Right Facility"
        description="We'll help you choose the optimal facility based on your fleet size, budget, and risk profile."
        primaryCTA={{ label: "Get a Hosting Quote", href: "/contact" }}
        secondaryCTA={{ label: "Book a Strategy Call", href: "https://calendly.com/bitmernmining" }}
        variant="elevated"
      />
    </>
  )
}
