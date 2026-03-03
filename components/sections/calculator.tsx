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
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { MiningProfitsAnimation } from "@/components/animations/mining-profits"

// ---------------------------------------------------------------------------
// File-specific animation variants
// ---------------------------------------------------------------------------

// Device entrance variants — staggered from different directions
const deviceContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
}
const laptopEntrance = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
}
const phoneEntrance = {
  hidden: { opacity: 0, x: -30, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}
const asicEntrance = {
  hidden: { opacity: 0, x: 30, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

// Reduced motion device variants
const reducedDeviceContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function Calculator() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const cVariants = prefersReduced ? reducedStagger : staggerContainer
  const chVariants = prefersReduced ? reducedFade : fadeUp
  const dContainer = prefersReduced ? reducedDeviceContainer : deviceContainer

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* Background canvas animation */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <MiningProfitsAnimation />
      </div>

      {/* Gradient overlay — tames the canvas, keeps text legible */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 70% 50% at 50% 35%, transparent 0%, color-mix(in oklch, var(--color-background) 85%, transparent) 100%)",
            "linear-gradient(180deg, color-mix(in oklch, var(--color-background) 40%, transparent) 0%, transparent 30%, transparent 70%, color-mix(in oklch, var(--color-background) 60%, transparent) 100%)",
          ].join(", "),
        }}
      />

      {/* Content layer */}
      <div className="padding-global relative z-[2]">
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
                <Tag>AI Calculator</Tag>
              </motion.div>

              <div className="spacer-xsmall" />

              <motion.h2 variants={chVariants} className="uppercase text-balance">
                Calculate Your Mining Profits in Seconds with Advanced AI
              </motion.h2>

              <div className="spacer-small" />

              <motion.p
                variants={chVariants}
                className="text-lg leading-relaxed text-foreground/70"
              >
                Model your returns with real-time Bitcoin data, network
                difficulty adjustments, and facility-specific power rates. Get
                transparent projections in seconds.
              </motion.p>

              <div className="spacer-medium" />

              <motion.div
                variants={chVariants}
                className="flex flex-col items-center gap-3"
              >
                <Button size="lg" asChild>
                  <a
                    href="https://calculator.bitmernmining.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    Calculate Your Profits
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                <Button variant="link" size="sm" asChild>
                  <Link href="/technology">
                    Learn How It Works
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <div className="spacer-xlarge" />

            {/* Device mockup group — layered composition with staggered entrance */}
            <motion.div
              variants={dContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative mx-auto flex max-w-[72rem] justify-center"
            >
              {/* Laptop — main, centered */}
              <motion.div
                variants={prefersReduced ? reducedFade : laptopEntrance}
                className="group/laptop relative z-[1] mx-[8%] mb-[8%] w-full transition-transform duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.02]"
              >
                <Image
                  src="/calculator-laptop.png"
                  alt="Bitmern mining calculator on laptop"
                  width={2000}
                  height={1333}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 90vw, 56rem"
                />
              </motion.div>

              {/* Phone — bottom left, slides in from left */}
              <motion.div
                variants={prefersReduced ? reducedFade : phoneEntrance}
                className="device-float absolute bottom-[8%] left-[5%] z-[2] w-[24%] transition-transform duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.05]"
              >
                <Image
                  src="/calculator-phone.png"
                  alt="Bitmern calculator on mobile"
                  width={504}
                  height={1008}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 20vw, 10rem"
                />
              </motion.div>

              {/* ASIC miner — bottom right, slides in from right */}
              <motion.div
                variants={prefersReduced ? reducedFade : asicEntrance}
                className="device-float-alt absolute bottom-0 right-[2%] z-[2] w-[38%] transition-transform duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.04]"
              >
                <Image
                  src="/antminer-s21.webp"
                  alt="Bitmain Antminer S21"
                  width={1280}
                  height={1280}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 30vw, 18rem"
                />
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
