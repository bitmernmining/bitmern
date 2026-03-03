"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  EASE,
  staggerContainer,
  fadeUp,
  reducedStagger,
  reducedFade,
  useCountUp,
} from "@/lib/motion"
import { Tag } from "@/components/ui/tag"
import { MinersDeployedGrid } from "@/components/animations/miners-deployed-grid"
import { MWChannelFlow } from "@/components/animations/mw-channel-flow"
import { UptimeChart } from "@/components/animations/uptime-chart"

// ---------------------------------------------------------------------------
// File-specific animation variants — card timing differs from shared
// ---------------------------------------------------------------------------

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const cardFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// ---------------------------------------------------------------------------
// Stat cards data
// ---------------------------------------------------------------------------

const STATS = [
  {
    value: 1400,
    suffix: "+",
    title: "Miners Deployed",
    description: "From procurement to production—at scale.",
    Animation: MinersDeployedGrid,
  },
  {
    value: 20,
    suffix: "+",
    title: "MW Under Management",
    description: "Infrastructure built for serious operations.",
    Animation: MWChannelFlow,
  },
  {
    value: 97,
    suffix: "%",
    title: "Uptime Rate",
    description: "Reliability that compounds returns.",
    Animation: UptimeChart,
  },
]

// ---------------------------------------------------------------------------
// StatNumber — count-up animation per stat
// ---------------------------------------------------------------------------

function StatNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, display } = useCountUp(value, {
    suffix,
    duration: 2500,
  })
  return (
    <span ref={ref}>
      {display || "0"}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function ProvenAtScale() {
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
          <div className="padding-section-large">
            {/* Header — 2 columns: tag+h2 left, paragraph right */}
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-20 grid items-start gap-10 lg:grid-cols-2 lg:gap-x-20"
            >
              {/* Left — tag + heading */}
              <div>
                <motion.div variants={chVariants}>
                  <Tag>Proven at Scale</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={chVariants}>
                  Infrastructure You Can Count On
                </motion.h2>
              </div>

              {/* Right — paragraph */}
              <motion.p
                variants={chVariants}
                className="text-[1.125rem] leading-relaxed text-foreground/70"
              >
                Institutional mining demands institutional execution. From
                procurement through deployment, our infrastructure and operations
                are built to deliver consistent, measurable results at scale.
              </motion.p>
            </motion.div>

            {/* Stat cards — 3-column grid */}
            <motion.div
              ref={cardsRef}
              variants={crdStagger}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
              className="grid gap-8 md:grid-cols-3"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.title}
                  variants={crdFade}
                  className="card-surface flex flex-col justify-between overflow-hidden rounded-lg border border-border/60 p-8"
                >
                  {/* Stat number */}
                  <div className="mb-6 font-heading text-[4rem] font-bold leading-none text-primary">
                    <StatNumber value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Canvas animation */}
                  <div className="relative mb-6 aspect-[3/1] w-full" aria-hidden="true">
                    <stat.Animation />
                  </div>

                  {/* Label + description */}
                  <div>
                    <h3 className="mb-2 font-heading text-[1.2rem] font-normal uppercase leading-tight tracking-[-0.01375rem]">
                      {stat.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
