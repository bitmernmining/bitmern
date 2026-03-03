"use client"

import { motion } from "framer-motion"
import {
  ShieldCheck,
  BarChart3,
  Eye,
  Settings2,
  Check,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { useSection, useCountUp } from "@/lib/motion"
import { SectionCTA } from "@/components/ui/section-cta"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const COMPARISON_CARDS = [
  {
    title: "vs. Bitcoin ETFs",
    body: "ETFs charge management fees while offering zero yield. Mining generates daily BTC income from block rewards \u2014 a fundamentally different return profile.",
  },
  {
    title: "vs. Holding Bitcoin",
    body: "Holding BTC is a pure price bet. Mining produces new Bitcoin below market cost when operated efficiently \u2014 generating yield regardless of short-term price action.",
  },
  {
    title: "vs. Self-Mining",
    body: "Self-mining requires $50K+ in equipment, technical expertise, facility leases, and 24/7 monitoring. Bitmern handles all of it. You deploy capital; we deploy miners.",
  },
]

const TRACK_RECORD = [
  { numericValue: 5, value: "5+", unit: "Years", label: "Large-scale mining expertise", suffix: "+" },
  { numericValue: 176, value: "176+", unit: "PH/s", label: "Bitcoin hashrate under management", suffix: "+" },
  {
    numericValue: 80,
    value: "80%+",
    unit: "",
    label: "Annualized returns over past decade (2014\u20132024)",
    suffix: "%+",
    disclaimer: true,
  },
]

const BLOCKS_FUND_FEATURES = [
  {
    icon: ShieldCheck,
    title: "KYC/AML-Compliant Structure",
    body: "Qualified-investor vehicle with full regulatory compliance and institutional governance.",
  },
  {
    icon: BarChart3,
    title: "Audited Multi-Geography Hosting",
    body: "Miners deployed across US and international facilities \u2014 geographic diversification by design.",
  },
  {
    icon: Eye,
    title: "Real-Time Reporting",
    body: "Clear dashboards, yield tracking, and verified monthly reporting. No black boxes.",
  },
  {
    icon: Settings2,
    title: "Flexible Allocations",
    body: "Tranches as low as 50 ASIC units. Supports trusts, partnerships, and direct ownership structures.",
  },
]

const FAMILY_OFFICE_CARDS = [
  {
    title: "Customized Mining Allocations",
    body: "Minimum 50 ASIC units per tranche. Scale up or down based on your risk appetite and target exposure.",
  },
  {
    title: "Flexible Holding Structures",
    body: "Deploy through trusts, family partnerships, corporate entities, or direct ownership. We accommodate your preferred structure.",
  },
  {
    title: "Exclusive Research & Insights",
    body: "Dedicated market intelligence, macro analysis, and mining-specific research. Quarterly investor calls with the leadership team.",
  },
]

const COMPLIANCE_ITEMS = [
  {
    label: "KYC/AML Compliance",
    detail:
      "Full identity verification and anti-money laundering procedures",
  },
  {
    label: "Institutional Governance",
    detail:
      "Board-level oversight, risk management framework, audit trail",
  },
  {
    label: "Geographic Diversification",
    detail:
      "Miners spread across multiple jurisdictions and power grids",
  },
  {
    label: "Transparent Reporting",
    detail:
      "Audited performance data, verifiable hashrate, daily payout records",
  },
]

// ---------------------------------------------------------------------------
// Count-up stat component
// ---------------------------------------------------------------------------

function CountUpStat({
  numericValue,
  suffix,
  unit,
  label,
  disclaimer,
}: {
  numericValue: number
  suffix: string
  unit: string
  label: string
  disclaimer?: boolean
}) {
  const { ref, display, inView } = useCountUp(numericValue, {
    suffix,
    duration: 2200,
  })

  return (
    <div className="flex flex-col items-center">
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className="font-heading text-3xl font-bold leading-none tracking-tight text-primary sm:text-5xl lg:text-6xl"
      >
        {inView ? display : "0"}
        {disclaimer && (
          <span className="align-top text-2xl lg:text-3xl">*</span>
        )}
      </span>
      {unit && (
        <span className="mt-2 font-mono text-lg uppercase tracking-tight text-foreground/80">
          {unit}
        </span>
      )}
      <p className="mt-3 text-base text-foreground/60">{label}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export function InstitutionalPage() {
  const hero = useSection(0.15)
  const opportunity = useSection()
  const trackRecord = useSection()
  const blocksFund = useSection()
  const familyOffice = useSection()
  const compliance = useSection()
  const teamStrip = useSection()

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero — Dark Authoritative with Facility Background */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hero.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center"
              >
                {/* Text */}
                <div>
                  <motion.div variants={hero.chVariants}>
                    <Tag>Institutional Mining</Tag>
                  </motion.div>
                  <div className="spacer-xsmall" />
                  <motion.h1 variants={hero.chVariants}>
                    Bitcoin Mining Infrastructure for Serious Capital
                  </motion.h1>
                  <div className="spacer-small" />
                  <motion.p
                    variants={hero.chVariants}
                    className="text-[1.125rem] leading-relaxed text-foreground/60"
                  >
                    Designed for Family Offices, High-Net-Worth Individuals, and
                    Institutional Investors seeking yield, transparency, and
                    long-term exposure to digital infrastructure.
                  </motion.p>
                  <div className="spacer-medium" />
                  <motion.div
                    variants={hero.chVariants}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <Button size="lg" asChild>
                      <Link href="/contact">Request Fund Materials</Link>
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                      <a href="https://calendly.com/bitmernmining" target="_blank" rel="noopener noreferrer">Book a Private Consultation</a>
                    </Button>
                  </motion.div>
                  <div className="spacer-xsmall" />
                  <motion.p
                    variants={hero.chVariants}
                    className="text-sm text-foreground/40"
                  >
                    For Accredited &amp; Institutional Investors Only
                  </motion.p>
                </div>

                {/* Photo */}
                <motion.div variants={hero.chVariants} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hidden lg:block">
                  <Image
                    src="/facilities/addis-ababa.webp"
                    alt="Bitmern Mining facility — Addis Ababa"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* The Opportunity */}
      {/* ----------------------------------------------------------------- */}
      <section ref={opportunity.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={opportunity.cVariants}
                initial="hidden"
                animate={opportunity.inView ? "visible" : "hidden"}
              >
                <motion.div variants={opportunity.chVariants}>
                  <Tag>Why Mining</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={opportunity.chVariants}>
                  Bitcoin Mining Is a Superior Investment Strategy
                </motion.h2>
                <div className="spacer-xsmall" />
                <motion.p
                  variants={opportunity.chVariants}
                  className="max-w-3xl text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  While Bitcoin ETFs offer passive exposure, they lack yield and
                  cap upside. Direct Bitcoin purchase exposes investors to
                  volatility without income. Bitcoin mining delivers continuous
                  rewards with operational alpha &mdash; and Bitmern provides
                  the infrastructure to capture it.
                </motion.p>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={opportunity.crdStagger}
                initial="hidden"
                animate={opportunity.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-3"
              >
                {COMPARISON_CARDS.map((card) => (
                  <motion.div
                    key={card.title}
                    variants={opportunity.crdFade}
                    className="card-surface rounded-lg border border-border/60 p-8"
                  >
                    <h3 className="mb-4 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground/60">
                      {card.body}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Track Record — Massive Typography + Count-Up */}
      {/* ----------------------------------------------------------------- */}
      <section ref={trackRecord.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={trackRecord.cVariants}
                initial="hidden"
                animate={trackRecord.inView ? "visible" : "hidden"}
                className="text-align-center"
              >
                <motion.h2 variants={trackRecord.chVariants}>
                  Proven at Scale
                </motion.h2>
                <div className="spacer-large" />

                <motion.div
                  variants={trackRecord.crdStagger}
                  initial="hidden"
                  animate={trackRecord.inView ? "visible" : "hidden"}
                  className="grid gap-8 md:grid-cols-3"
                >
                  {TRACK_RECORD.map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={trackRecord.crdFade}
                    >
                      <CountUpStat
                        numericValue={stat.numericValue}
                        suffix={stat.suffix}
                        unit={stat.unit}
                        label={stat.label}
                        disclaimer={stat.disclaimer}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Proximate disclaimer for compliance */}
                <p className="mx-auto mt-8 max-w-xl text-left text-sm font-medium text-foreground/50 italic">
                  * Based on historical Bitcoin network performance. Past
                  performance does not guarantee future results. Mining returns
                  are variable and depend on network difficulty, energy costs,
                  and Bitcoin price.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Blocks Fund */}
      {/* ----------------------------------------------------------------- */}
      <section ref={blocksFund.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={blocksFund.cVariants}
                initial="hidden"
                animate={blocksFund.inView ? "visible" : "hidden"}
              >
                <motion.div variants={blocksFund.chVariants}>
                  <Tag>Blocks Fund</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={blocksFund.chVariants}>
                  Structured Mining Exposure, Institutional Standards
                </motion.h2>
                <div className="spacer-xsmall" />
                <motion.p
                  variants={blocksFund.chVariants}
                  className="max-w-3xl text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  The Bitmern Mining Blocks Fund offers accredited investors a
                  hands-off vehicle with transparent reporting, managed risk, and
                  quarterly distributions. Built for fiduciaries, trustees, and
                  portfolio managers who need institutional-grade governance.
                </motion.p>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={blocksFund.crdStagger}
                initial="hidden"
                animate={blocksFund.inView ? "visible" : "hidden"}
                className="grid gap-6 sm:grid-cols-2"
              >
                {BLOCKS_FUND_FEATURES.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      variants={blocksFund.crdFade}
                      className="card-surface rounded-lg border border-border/60 p-8"
                    >
                      <div className="mb-6 inline-flex w-fit items-center justify-center rounded bg-primary p-2 text-primary-foreground">
                        <Icon className="size-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="mb-3 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-base leading-relaxed text-foreground/60">
                        {feature.body}
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
      {/* Tailored for Family Offices */}
      {/* ----------------------------------------------------------------- */}
      <section ref={familyOffice.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={familyOffice.cVariants}
                initial="hidden"
                animate={familyOffice.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={familyOffice.chVariants}>
                  Solutions for Private Wealth
                </motion.h2>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={familyOffice.crdStagger}
                initial="hidden"
                animate={familyOffice.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-3"
              >
                {FAMILY_OFFICE_CARDS.map((card) => (
                  <motion.div
                    key={card.title}
                    variants={familyOffice.crdFade}
                    className="card-surface rounded-lg border border-border/60 p-8"
                  >
                    <h3 className="mb-4 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground/60">
                      {card.body}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Security & Compliance */}
      {/* ----------------------------------------------------------------- */}
      <section ref={compliance.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={compliance.cVariants}
                initial="hidden"
                animate={compliance.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={compliance.chVariants}>
                  Built for Institutional Standards
                </motion.h2>
                <div className="spacer-large" />

                <motion.ul
                  variants={compliance.chVariants}
                  className="max-w-2xl space-y-6"
                >
                  {COMPLIANCE_ITEMS.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start gap-4"
                    >
                      <Check className="mt-0.5 size-6 shrink-0 text-primary" />
                      <div>
                        <span className="font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="text-foreground/60">
                          {" \u2014 "}
                          {item.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Leadership Link */}
      {/* ----------------------------------------------------------------- */}
      <section ref={teamStrip.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={teamStrip.cVariants}
                initial="hidden"
                animate={teamStrip.inView ? "visible" : "hidden"}
                className="text-align-center"
              >
                <motion.h2 variants={teamStrip.chVariants} className="text-2xl lg:text-3xl">
                  Led by Industry Veterans
                </motion.h2>
                <div className="spacer-xsmall" />
                <motion.p
                  variants={teamStrip.chVariants}
                  className="mx-auto max-w-xl text-base text-foreground/60"
                >
                  Our leadership team brings decades of combined experience in
                  energy infrastructure, digital assets, and large-scale mining
                  operations.
                </motion.p>
                <div className="spacer-small" />
                <motion.div variants={teamStrip.chVariants}>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/team" className="inline-flex items-center gap-2">
                      Meet Our Leadership <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA — Schedule a Consultation */}
      {/* ----------------------------------------------------------------- */}
      <SectionCTA
        tag="For Institutional Investors"
        heading="Schedule a Consultation"
        description="Our team works directly with family offices, funds, and high-net-worth individuals to structure mining investments."
        primaryCTA={{ label: "Book a Call", href: "/contact" }}
        secondaryCTA={{ label: "View Our Facilities", href: "/facilities" }}
        variant="elevated"
      />
    </>
  )
}
