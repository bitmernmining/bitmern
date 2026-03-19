"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  Snowflake,
  Handshake,
  TrendingUp,
  DollarSign,
  MapPin,
  ShieldCheck,
  Check,
} from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { SectionCTA } from "@/components/ui/section-cta"
import Link from "next/link"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FINLAND_HIGHLIGHTS = [
  "Cold climate \u2014 minimal mechanical cooling required year-round",
  "Renewable energy sources \u2014 hydro, wind, solar",
  "EU regulatory stability and legal clarity",
  "Part of the broader Nordic expansion strategy",
]

const ORIGINSPARK_BENEFITS = [
  "Massive expansion of available capacity",
  "New geographic locations and power sources",
  "Continued competitive electricity rates at scale",
  "Priority access for existing Bitmern clients",
]

const TIMELINE = [
  { phase: "2022", capacity: "3 MW", facilities: "Ethiopia" },
  { phase: "2023–24", capacity: "30+ MW", facilities: "Multi-site expansion" },
  {
    phase: "2025-26",
    capacity: "Expanding",
    facilities: "+ Finland (upcoming)",
  },
  { phase: "Pipeline", capacity: "500+ MW", facilities: "OriginSpark partnership" },
]

const ADVANTAGE_CARDS = [
  {
    icon: DollarSign,
    title: "Better Rates",
    body: "Larger power contracts unlock lower per-kWh pricing",
  },
  {
    icon: MapPin,
    title: "More Options",
    body: "Choose the facility that best fits your risk, cost, and geography preferences",
  },
  {
    icon: ShieldCheck,
    title: "Priority Access",
    body: "Current clients lock in pricing and allocation before facilities open to the public",
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function ExpansionPage() {
  const hero = useSection(0.15)
  const finland = useSection()
  const originspark = useSection()
  const trajectory = useSection(0.15)
  const advantage = useSection()

  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Hero — Dark with Finland facility background                     */}
      {/* --------------------------------------------------------------- */}
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
                    <Tag>Expansion</Tag>
                  </motion.div>
                  <div className="spacer-xsmall" />
                  <motion.h1 variants={hero.chVariants}>
                    Building the Next Generation of Mining Infrastructure
                  </motion.h1>
                  <div className="spacer-small" />
                  <motion.p
                    variants={hero.chVariants}
                    className="text-[1.125rem] leading-relaxed text-foreground/60"
                  >
                    From our roots in Greece and Ethiopia to a global network
                    spanning three continents, Bitmern is scaling aggressively. Our
                    expansion pipeline includes Nordic facilities and the 500 MW
                    OriginSpark partnership.
                  </motion.p>
                  <div className="spacer-medium" />
                  <motion.div
                    variants={hero.chVariants}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <Button size="lg" asChild>
                      <Link href="/contact">Reserve Your Spot</Link>
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/facilities">View Current Facilities</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Photo */}
                <motion.div variants={hero.chVariants} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hidden lg:block">
                  <Image
                    src="/facilities/finland.webp"
                    alt="Bitmern Finland mining facility"
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

      {/* --------------------------------------------------------------- */}
      {/* Finland                                                          */}
      {/* --------------------------------------------------------------- */}
      <section ref={finland.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={finland.cVariants}
                initial="hidden"
                animate={finland.inView ? "visible" : "hidden"}
              >
                <motion.div
                  variants={finland.chVariants}
                  className="overflow-hidden rounded-lg border border-primary/20 bg-primary/[0.03] p-8 md:p-12"
                >
                  {/* Finland photo */}
                  <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                      src="/facilities/finland.webp"
                      alt="Bitmern Finland facility — cold climate mining"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                      quality={85}
                    />
                  </div>

                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <Tag variant="primary">Coming Soon</Tag>
                    <Snowflake className="size-5 text-primary" />
                  </div>

                  <h3 className="mb-4 text-balance">
                    Nordic Mining &mdash; Finland Facility
                  </h3>

                  <p className="mb-8 max-w-3xl text-[1.125rem] leading-relaxed text-foreground/70">
                    Finland offers the ideal combination for Bitcoin mining: cold
                    climate that slashes cooling costs, abundant renewable energy
                    from hydro and wind, and a stable EU regulatory framework.
                    Our upcoming Finnish facility will be Bitmern&rsquo;s first
                    European site.
                  </p>

                  {/* Highlights */}
                  <ul className="mb-8 space-y-3">
                    {FINLAND_HIGHLIGHTS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base leading-relaxed text-foreground/70"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Early access callout */}
                  <div className="mb-8 rounded-md border border-border/60 bg-background/60 px-6 py-4">
                    <p className="text-base italic text-foreground/60">
                      Current Bitmern clients get priority allocation and locked
                      pricing when Finland comes online.
                    </p>
                  </div>

                  <Button size="lg" asChild>
                    <Link href="/contact">Join the Finland Waitlist</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* OriginSpark Partnership                                          */}
      {/* --------------------------------------------------------------- */}
      <section ref={originspark.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={originspark.cVariants}
                initial="hidden"
                animate={originspark.inView ? "visible" : "hidden"}
              >
                <motion.div variants={originspark.chVariants}>
                  <Tag>Strategic Partnership</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={originspark.chVariants}>
                  500 MW Pipeline with OriginSpark
                </motion.h2>
                <div className="spacer-small" />
                <motion.p
                  variants={originspark.chVariants}
                  className="max-w-3xl text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Bitmern has partnered with OriginSpark to develop a 500 MW
                  mining infrastructure pipeline. This partnership represents a
                  step-change in our scale &mdash; from tens of megawatts to
                  hundreds &mdash; and positions Bitmern as a top-tier global
                  mining operator.
                </motion.p>

                <div className="spacer-large" />

                {/* What this means */}
                <motion.div variants={originspark.chVariants}>
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-foreground/50">
                    What this means for clients
                  </p>
                </motion.div>

                <motion.div
                  variants={originspark.crdStagger}
                  initial="hidden"
                  animate={originspark.inView ? "visible" : "hidden"}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {ORIGINSPARK_BENEFITS.map((benefit) => (
                    <motion.div
                      key={benefit}
                      variants={originspark.crdFade}
                      className="card-surface flex items-start gap-3 rounded-lg border border-border/60 px-6 py-4"
                    >
                      <Handshake className="mt-0.5 size-5 shrink-0 text-primary" />
                      <p className="text-base leading-relaxed text-foreground/70">
                        {benefit}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Growth Trajectory                                                */}
      {/* --------------------------------------------------------------- */}
      <section ref={trajectory.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={trajectory.cVariants}
                initial="hidden"
                animate={trajectory.inView ? "visible" : "hidden"}
              >
                <motion.div variants={trajectory.chVariants}>
                  <TrendingUp className="mb-4 size-8 text-primary" />
                </motion.div>
                <motion.h2 variants={trajectory.chVariants}>
                  From 3 MW to 500+ MW
                </motion.h2>

                <div className="spacer-large" />

                {/* Timeline table */}
                <motion.div
                  variants={trajectory.chVariants}
                  className="card-surface overflow-x-auto rounded-lg border border-border/60"
                >
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b bg-foreground/[0.03]">
                        <th scope="col" className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold uppercase tracking-widest">
                          Phase
                        </th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold uppercase tracking-widest">
                          Capacity
                        </th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold uppercase tracking-widest">
                          Facilities
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TIMELINE.map((row, i) => (
                        <tr
                          key={row.phase}
                          className={
                            i < TIMELINE.length - 1 ? "border-b" : ""
                          }
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-base font-medium">
                            {row.phase}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="font-heading text-lg font-semibold text-primary">
                              {row.capacity}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-base text-foreground/70">
                            {row.facilities}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Why It Matters — Scale Creates Advantage                         */}
      {/* --------------------------------------------------------------- */}
      <section ref={advantage.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={advantage.cVariants}
                initial="hidden"
                animate={advantage.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={advantage.chVariants}>
                  Scale Creates Advantage
                </motion.h2>
                <div className="spacer-xsmall" />
                <motion.p
                  variants={advantage.chVariants}
                  className="max-w-3xl text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  More megawatts means lower per-unit costs, better manufacturer
                  pricing, redundant infrastructure, and more options for our
                  clients. Every new facility strengthens the network &mdash;
                  and every existing client benefits from the expansion.
                </motion.p>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={advantage.crdStagger}
                initial="hidden"
                animate={advantage.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-3"
              >
                {ADVANTAGE_CARDS.map((card) => {
                  const Icon = card.icon
                  return (
                    <motion.div
                      key={card.title}
                      variants={advantage.crdFade}
                      className="card-surface rounded-lg border border-border/60 p-8"
                    >
                      <div className="mb-6 inline-flex w-fit items-center justify-center rounded bg-primary p-2 text-primary-foreground">
                        <Icon className="size-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="mb-3 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-base leading-relaxed text-foreground/60">
                        {card.body}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Bottom CTA                                                       */}
      {/* --------------------------------------------------------------- */}
      <SectionCTA
        tag="Expansion"
        heading="Get Ahead of the Expansion"
        description="Reserve your hosting allocation at upcoming facilities. Current clients receive priority access and locked pricing."
        primaryCTA={{ label: "Reserve Your Spot", href: "/contact" }}
        secondaryCTA={{ label: "View Current Facilities", href: "/facilities" }}
        variant="elevated"
      />
    </>
  )
}
