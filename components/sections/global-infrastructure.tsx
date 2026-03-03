"use client"

import { motion } from "framer-motion"
import { EASE, useSection, useCountUp } from "@/lib/motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { FacilityGlobe } from "@/components/animations/facility-globe"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"

// ---------------------------------------------------------------------------
// Stats data
// ---------------------------------------------------------------------------

const STATS = [
  { value: 31.5, suffix: "+", unit: "MW", label: "Total Capacity" },
  { value: 7, suffix: "", unit: "", label: "Global Facilities" },
  { value: 3, suffix: "", unit: "", label: "Continents" },
] as const

const FACILITIES = [
  { src: "/facilities/indiana.webp", label: "Indiana, USA" },
  { src: "/facilities/north-dakota.webp", label: "North Dakota, USA" },
  { src: "/facilities/missouri.jpeg", label: "Missouri, USA" },
  { src: "/facilities/addis-ababa.webp", label: "Addis Ababa, Ethiopia" },
  { src: "/facilities/finland.webp", label: "Finland" },
] as const

function StatCounter({ stat }: { stat: (typeof STATS)[number] }) {
  const { ref, display } = useCountUp(stat.value, {
    suffix: stat.suffix,
    duration: 1200,
  })

  return (
    <div className="flex flex-col gap-2">
      <span
        ref={ref}
        className="font-heading text-6xl font-bold tracking-tight text-primary lg:text-7xl"
      >
        {display || "0"}
        {stat.unit && (
          <span className="ml-1 text-lg font-normal text-foreground/50">
            {stat.unit}
          </span>
        )}
      </span>
      <Tag size="sm" variant="muted">
        {stat.label}
      </Tag>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function GlobalInfrastructure() {
  const { ref: sectionRef, inView: isInView, cVariants, chVariants } = useSection(0.3)

  return (
    <section ref={sectionRef} className="section-elevated overflow-x-clip">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            <div className="grid items-center gap-12 overflow-visible lg:grid-cols-2">
              {/* Left — text content with staggered entrance */}
              <motion.div
                variants={cVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div variants={chVariants}>
                  <Tag>Global Infrastructure</Tag>
                </motion.div>

                <div className="spacer-xsmall" />

                <motion.h2 variants={chVariants} className="text-balance">
                  Strategically Positioned Across Three Continents
                </motion.h2>

                <div className="spacer-small" />

                <motion.p
                  variants={chVariants}
                  className="text-lg leading-relaxed text-foreground/70"
                >
                  Our mining facilities are located in regions with abundant
                  low-cost energy, stable regulatory environments, and optimal
                  climate conditions. From North America to Northern Europe and
                  beyond, every site is selected for maximum efficiency and
                  long-term operational security.
                </motion.p>

                <div className="spacer-medium" />

                {/* Stat counters */}
                <motion.div
                  variants={chVariants}
                  className="flex flex-wrap gap-8"
                >
                  {STATS.map((stat) => (
                    <StatCounter key={stat.label} stat={stat} />
                  ))}
                </motion.div>

                <div className="spacer-medium" />

                <motion.div
                  variants={chVariants}
                  className="flex flex-wrap gap-3"
                >
                  <Button size="lg" asChild>
                    <Link href="/facilities">View Our Facilities</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/contact">Start Mining</Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right — interactive globe, bleeds past container edge */}
              <motion.div
                className="relative lg:-mr-[10%]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                aria-hidden="true"
              >
                <FacilityGlobe className="h-[450px] lg:h-[600px]" />
              </motion.div>
            </div>

            {/* Facility photo strip */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            >
              <div className="flex flex-wrap items-start justify-center gap-3 lg:flex-nowrap lg:justify-start">
                {FACILITIES.map((facility) => (
                  <div key={facility.label} className="flex w-28 flex-col gap-1.5 lg:w-36">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-md">
                      <Image
                        src={facility.src}
                        alt={facility.label}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 144px, 112px"
                      />
                    </div>
                    <span className="text-xs text-foreground/50">
                      {facility.label}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/facilities"
                className="mt-4 inline-flex items-center gap-1 text-sm text-foreground/50 transition-colors duration-200 hover:text-foreground/80"
              >
                View all facilities
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
