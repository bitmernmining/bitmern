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
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { SupplyChainFlow } from "@/components/animations/supply-chain-flow"
import { DirectAccessBypass } from "@/components/animations/direct-access-bypass"
import { VolumePricingChart } from "@/components/animations/volume-pricing-chart"
import { LogisticsTimeline } from "@/components/animations/logistics-timeline"
import { DeployShipPaths } from "@/components/animations/deploy-ship-paths"

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

const CARDS = [
  {
    title: "Direct Manufacturer Access",
    body: "Priority allocation from Bitmain, MicroBT, and Canaan. No middlemen, no markups.",
    Animation: DirectAccessBypass,
  },
  {
    title: "Volume Pricing",
    body: "Better unit economics at scale. Pricing that reflects your commitment, whether 10 units or 1,000.",
    Animation: VolumePricingChart,
  },
  {
    title: "End-to-End Logistics",
    body: "Shipping, customs, and import documentation handled. Equipment arrives ready for deployment.",
    Animation: LogisticsTimeline,
  },
  {
    title: "Deploy or Ship",
    body: "Colocate at our facilities for a seamless start, or take delivery at your own location.",
    Animation: DeployShipPaths,
  },
]

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function Hardware() {
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
    <section ref={sectionRef}>
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            {/* Main 2-column grid: left large card + right 2x2 cards */}
            <div className="grid items-stretch gap-8 lg:grid-cols-2">
              {/* Left — large card with canvas animation + content */}
              <motion.div
                variants={cVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="card-surface flex flex-col rounded-lg border border-border/60 overflow-hidden"
              >
                {/* Supply chain canvas animation */}
                <motion.div
                  variants={chVariants}
                  className="relative aspect-[2/1] w-full"
                  aria-hidden="true"
                >
                  <SupplyChainFlow />
                </motion.div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-8 lg:p-12">
                  <div>
                    <motion.div variants={chVariants}>
                      <Tag>Hardware</Tag>
                    </motion.div>

                    <div className="spacer-xsmall" />

                    <motion.h2
                      variants={chVariants}
                    >
                      Source Miners at Institutional Pricing
                    </motion.h2>

                    <div className="spacer-small" />

                    <motion.p
                      variants={chVariants}
                      className="text-base leading-relaxed text-foreground/70"
                    >
                      Our direct relationships with Bitmain, MicroBT, and Canaan
                      mean priority allocation and volume pricing on
                      latest-generation ASICs. We handle logistics, import, and
                      deployment at our facilities or yours.
                    </motion.p>
                  </div>

                  <div className="spacer-medium" />

                  <motion.div
                    variants={chVariants}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <Button size="lg" asChild>
                      <a
                        href="https://shop.bitmernmining.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Browse Equipment
                      </a>
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/contact">Get a Quote</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right — 2x2 small card grid */}
              <motion.div
                ref={cardsRef}
                variants={crdStagger}
                initial="hidden"
                animate={cardsInView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              >
                {CARDS.map((card) => (
                  <motion.div
                    key={card.title}
                    variants={crdFade}
                    className="card-surface flex flex-col rounded-lg border border-border/60 overflow-hidden"
                  >
                    {/* Card canvas animation */}
                    <div className="relative aspect-[2/1] w-full" aria-hidden="true">
                      <card.Animation />
                    </div>

                    {/* Card content */}
                    <div className="flex flex-1 flex-col p-4 pt-3 lg:px-6 lg:pb-6">
                      <h3 className="mb-2 font-heading text-[1.44rem] font-normal uppercase leading-tight tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/60">
                        {card.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
