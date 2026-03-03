"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  EASE,
  staggerContainer,
  fadeUp,
  reducedStagger,
  reducedFade,
} from "@/lib/motion"
import { KeyRound, BarChart3, Zap, Settings } from "lucide-react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"

// ---------------------------------------------------------------------------
// File-specific animation variants — card timing differs from shared
// ---------------------------------------------------------------------------

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const cardFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// ---------------------------------------------------------------------------
// Feature cards data
// ---------------------------------------------------------------------------

const FEATURES = [
  {
    icon: KeyRound,
    title: "Full Ownership",
    body: "Your miners, your Bitcoin, your keys. We provide the infrastructure and operations. You retain complete ownership of hardware and 100% of mining rewards.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Monitoring",
    body: "Track hashrate, temperature, power consumption, and earnings through our SuperApp dashboard. Detailed monthly reports with full operational transparency.",
  },
  {
    icon: Zap,
    title: "All-In Power Rates",
    body: "Sub-$0.06/kWh across all of our facilities. No hidden fees, no surprise charges, no escalators. The rate we quote is the rate you pay.",
  },
  {
    icon: Settings,
    title: "On-Site Maintenance",
    body: "Our technicians handle repairs, firmware updates, and hardware issues. Response times under 24 hours. Downtime is money, and we treat it that way.",
  },
] as const

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function Hosting() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 })

  const cVariants = prefersReduced ? reducedStagger : staggerContainer
  const chVariants = prefersReduced ? reducedFade : fadeUp
  const crdStagger = prefersReduced ? reducedStagger : cardStagger
  const crdFade = prefersReduced ? reducedFade : cardFade

  return (
    <section ref={sectionRef} className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            {/* Main grid: .5fr 1fr, 5rem col gap, 4rem row gap — exact Webflow values */}
            <div className="grid items-start gap-10 lg:grid-cols-[0.5fr_1fr] lg:gap-x-20 lg:gap-y-16">
              {/* Left column — tag + heading top, body + CTAs bottom */}
              <motion.div
                variants={cVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-col items-start justify-between lg:row-span-2 lg:min-h-full"
              >
                {/* Facility photo */}
                <motion.div
                  variants={chVariants}
                  className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-lg"
                >
                  <Image
                    src="/facilities/missouri.jpeg"
                    alt="Bitmern Mining facility in Missouri"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  {/* Live Facility badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-background/90 px-3 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
                    <span className="badge-pulse relative inline-block size-2 rounded-full bg-emerald-500" data-variant="success" />
                    Live Facility
                  </div>
                </motion.div>

                {/* Top */}
                <div>
                  <motion.div variants={chVariants}>
                    <Tag>Hosting</Tag>
                  </motion.div>
                  <div className="spacer-xsmall" />
                  <motion.h2 variants={chVariants}>
                    Your Hardware.
                    <br />
                    Our Facilities.
                  </motion.h2>
                </div>

                {/* Bottom — pushed down by space-between */}
                <div className="mt-auto pt-10 lg:pt-0">
                  <motion.p
                    variants={chVariants}
                    className="text-lg leading-relaxed text-foreground/70"
                  >
                    Colocate your ASICs at our facilities with sub-$0.06/kWh
                    power, 97% uptime guarantees, and real-time monitoring
                    through our SuperApp dashboard.{" "}
                    <strong className="text-foreground">
                      You retain full ownership
                    </strong>{" "}
                    while{" "}
                    <strong className="text-foreground">
                      we handle power
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">cooling</strong>,{" "}
                    <strong className="text-foreground">maintenance</strong>,
                    and{" "}
                    <strong className="text-foreground">security</strong>.
                  </motion.p>

                  <div className="spacer-medium" />

                  <motion.div
                    variants={chVariants}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <Button size="lg" asChild>
                      <Link href="/hosting">View Hosting Plans</Link>
                    </Button>
                    <Button variant="link" size="lg" className="gap-2" asChild>
                      <Link href="/facilities">
                        View Facilities
                        <ChevronRight className="size-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right column — 2x2 feature card grid */}
              {/* Webflow: grid-column-gap 3rem, grid-row-gap 4rem */}
              <motion.div
                ref={cardsRef}
                variants={crdStagger}
                initial="hidden"
                animate={cardsInView ? "visible" : "hidden"}
                className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:col-start-2 lg:row-span-2"
              >
                {FEATURES.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      variants={crdFade}
                      className="card-surface rounded-lg border border-border/60 p-6"
                    >
                      {/* Icon badge — fuel-yellow bg, 2rem icon (Webflow: icon-embed-small) */}
                      <div className="mb-6 inline-flex items-center justify-center rounded-md bg-primary p-2 text-primary-foreground">
                        <Icon className="size-8" strokeWidth={1.5} />
                      </div>

                      {/* Heading — Webflow h4: 1.728rem, weight 400, uppercase, line-height 1 */}
                      <h3 className="mb-4 font-heading text-[1.728rem] font-normal uppercase leading-none tracking-tight">
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
      </div>
    </section>
  )
}
