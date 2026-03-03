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
import { Check, X } from "lucide-react"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"

// ---------------------------------------------------------------------------
// File-specific animation variants
// ---------------------------------------------------------------------------

const tableStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const rowFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

// ---------------------------------------------------------------------------
// Comparison data
// ---------------------------------------------------------------------------

type CellValue = string | "check" | "cross"

interface ComparisonRow {
  feature: string
  spotBtc: CellValue
  etf: CellValue
  mining: CellValue
}

const ROWS: ComparisonRow[] = [
  {
    feature: "BTC Accumulation Potential",
    spotBtc: "Limited",
    etf: "Limited",
    mining: "Unlimited",
  },
  {
    feature: "Income Without Liquidating Holdings",
    spotBtc: "cross",
    etf: "cross",
    mining: "check",
  },
  {
    feature: "Produces New Assets Continuously",
    spotBtc: "cross",
    etf: "cross",
    mining: "check",
  },
  {
    feature: "Tax-Deductible Business Expenses",
    spotBtc: "cross",
    etf: "cross",
    mining: "check",
  },
  {
    feature: "Creates Cash Flow (Not Just Appreciation)",
    spotBtc: "cross",
    etf: "cross",
    mining: "check",
  },
  {
    feature: "Secures the Bitcoin Network",
    spotBtc: "cross",
    etf: "cross",
    mining: "check",
  },
]

// ---------------------------------------------------------------------------
// Cell renderer
// ---------------------------------------------------------------------------

function CellContent({ value, highlighted }: { value: CellValue; highlighted?: boolean }) {
  if (value === "check") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/20">
        <Check className="size-4 text-primary" strokeWidth={3} />
      </span>
    )
  }
  if (value === "cross") {
    return <X className="size-5 text-foreground/15" strokeWidth={1.5} />
  }
  return (
    <span className={highlighted ? "font-semibold text-foreground" : "font-medium text-foreground/60"}>
      {value}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function Comparison() {
  const sectionRef = useRef<HTMLElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const tableInView = useInView(tableRef, { once: true, amount: 0.15 })

  const cVariants = prefersReduced ? reducedStagger : staggerContainer
  const chVariants = prefersReduced ? reducedFade : fadeUp
  const tblStagger = prefersReduced ? reducedStagger : tableStagger
  const tblRow = prefersReduced ? reducedFade : rowFade

  return (
    <section ref={sectionRef}>
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            {/* Header — centered */}
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mx-auto max-w-[48rem] text-align-center"
            >
              <motion.div variants={chVariants}>
                <Tag>Beyond ETFs & Spot BTC</Tag>
              </motion.div>

              <div className="spacer-xsmall" />

              <motion.h2 variants={chVariants} className="text-balance">
                The Next Evolution in Bitcoin Exposure
              </motion.h2>

              <div className="spacer-small" />

              <motion.p
                variants={chVariants}
                className="text-lg leading-relaxed text-foreground/70"
              >
                Family Offices and institutional allocators are moving past
                passive holdings into yield-generating infrastructure. Mining
                delivers what ETFs and spot BTC can&apos;t — continuous Bitcoin
                rewards alongside capital appreciation, fully managed across
                audited global facilities.
              </motion.p>

              <div className="spacer-medium" />

              <motion.div
                variants={chVariants}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <Button size="lg" asChild>
                  <Link href="/contact">Get a Consultation</Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/institutional">Explore Institutional Access</Link>
                </Button>
              </motion.div>
            </motion.div>

            <div className="spacer-xxlarge" />

            {/* Comparison table */}
            <motion.div
              ref={tableRef}
              variants={tblStagger}
              initial="hidden"
              animate={tableInView ? "visible" : "hidden"}
              className="overflow-hidden rounded-lg border border-border/60 shadow-[0_1px_3px_0_oklch(0_0_0/0.04),0_4px_12px_0_oklch(0_0_0/0.03)]"
            >
              {/* Scrollable inner on mobile only */}
              <div className="overflow-x-auto md:overflow-x-visible">
                <table className="min-w-[640px] w-full border-collapse text-center">
                  <caption className="sr-only">
                    Comparison of Spot BTC, Bitcoin ETFs, and Bitcoin Mining
                  </caption>
                  <thead>
                    <motion.tr
                      variants={tblRow}
                      className="border-b border-border/60 bg-foreground/[0.02]"
                    >
                      <th scope="col" className="sticky left-0 z-10 bg-foreground/[0.02] px-6 py-5 text-left align-bottom">
                        <span className="font-mono text-xs font-normal uppercase tracking-widest text-foreground/40">
                          Comparison
                        </span>
                      </th>
                      <th scope="col" className="px-6 py-5 align-middle">
                        <span className="font-mono text-sm font-normal text-foreground/60">Spot BTC</span>
                      </th>
                      <th scope="col" className="px-6 py-5 align-middle">
                        <span className="font-mono text-sm font-normal text-foreground/60">Bitcoin ETFs</span>
                      </th>
                      {/* Bitcoin Mining — highlighted column header */}
                      <th scope="col" className="bg-primary/20 px-6 py-5 align-middle">
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          <Tag size="sm" variant="primary">Recommended</Tag>
                          <span className="font-mono text-sm font-semibold text-foreground">
                            Bitcoin Mining
                          </span>
                        </div>
                      </th>
                    </motion.tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row, i) => {
                      const isAlt = i % 2 === 0
                      const isLast = i === ROWS.length - 1

                      return (
                        <motion.tr
                          key={row.feature}
                          variants={tblRow}
                          className={[
                            "transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                            "hover:bg-foreground/[0.03]",
                            isAlt ? "bg-foreground/[0.015]" : "",
                            isLast ? "" : "border-b border-border/40",
                          ].join(" ")}
                        >
                          {/* Feature name — sticky on mobile scroll */}
                          <td className={`sticky left-0 z-10 px-6 py-4 text-left text-sm font-medium text-foreground/70 ${isAlt ? "bg-foreground/[0.015]" : "bg-background"}`}>
                            {row.feature}
                          </td>
                          {/* Spot BTC */}
                          <td className="px-6 py-4">
                            <CellContent value={row.spotBtc} />
                          </td>
                          {/* Bitcoin ETFs */}
                          <td className="px-6 py-4">
                            <CellContent value={row.etf} />
                          </td>
                          {/* Bitcoin Mining — highlighted column */}
                          <td
                            className={[
                              "px-6 py-4",
                              "bg-primary/[0.06]",
                              "shadow-[inset_1px_0_0_oklch(0.90_0.06_78),-1px_0_0_oklch(0.90_0.06_78)]",
                              isLast ? "shadow-[inset_1px_0_0_oklch(0.90_0.06_78),-1px_0_0_oklch(0.90_0.06_78),inset_0_-1px_0_oklch(0.90_0.06_78)]" : "",
                            ].join(" ")}
                          >
                            <CellContent value={row.mining} highlighted />
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
