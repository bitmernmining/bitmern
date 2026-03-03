"use client"

import { motion } from "framer-motion"
import {
  Monitor,
  TrendingUp,
  Bell,
  Globe,
  BarChart3,
  Settings,
  Smartphone,
  Tablet,
  ArrowRight,
  Cpu,
} from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { SectionCTA } from "@/components/ui/section-cta"
import Link from "next/link"
import Image from "next/image"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SUPERAPP_FEATURES = [
  {
    icon: Monitor,
    title: "Real-Time Dashboard",
    body: "Live hashrate, power consumption, and earnings updated continuously. No page refreshes, no delays.",
  },
  {
    icon: TrendingUp,
    title: "Profit Tracking",
    body: "Daily, weekly, and monthly analytics. See exactly what each miner earns and what you\u2019re paying in power.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    body: "Instant notifications when miners go offline, hashrate drops, temperature spikes, or payouts are processed. Configurable thresholds.",
  },
  {
    icon: Globe,
    title: "Multi-Facility View",
    body: "Monitor miners across all 5 global facilities from a single interface. Compare facility performance side by side.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    body: "Historical data, trend analysis, and efficiency metrics. Identify underperformers and optimize your fleet.",
  },
  {
    icon: Settings,
    title: "Remote Management",
    body: "Start, stop, and configure miners remotely. Adjust pool settings, update firmware, and power cycle \u2014 all from the app.",
  },
]

const AI_STEPS = [
  {
    num: "01",
    title: "Monitor",
    body: "Sensors feed real-time data to our AI models",
  },
  {
    num: "02",
    title: "Analyze",
    body: "Models identify optimal frequency, voltage, and pool settings per miner",
  },
  {
    num: "03",
    title: "Optimize",
    body: "Automatic adjustments applied 24/7, no manual intervention",
  },
]

const COMPATIBLE_HARDWARE = [
  "S19",
  "S19J",
  "S19 PRO",
  "S19J PRO",
  "S19 XP",
  "S19J PRO+",
  "T21",
  "S19K PRO",
  "S21",
  "S21 Immersion",
  "S21 Pro",
  "S21 XP",
]

const PLATFORMS = [
  {
    icon: Smartphone,
    title: "iOS",
    body: "iPhone and iPad (App Store)",
  },
  {
    icon: Tablet,
    title: "Android",
    body: "Phones and tablets (Google Play)",
  },
  {
    icon: Monitor,
    title: "Web",
    body: "Full dashboard at app.bitmernmining.com",
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function TechnologyPage() {
  const hero = useSection(0.15)
  const features = useSection(0.1)
  const ai = useSection()
  const firmware = useSection()
  const platforms = useSection()

  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Hero — Split Layout with Device Mockup */}
      {/* --------------------------------------------------------------- */}
      <section ref={hero.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]"
                style={{ minHeight: "60vh" }}
              >
                {/* Left — Copy */}
                <div>
                  <motion.div variants={hero.chVariants}>
                    <Tag>Technology</Tag>
                  </motion.div>
                  <div className="spacer-xsmall" />
                  <motion.h1 variants={hero.chVariants}>
                    Built for Performance
                  </motion.h1>
                  <div className="spacer-small" />
                  <motion.p
                    variants={hero.chVariants}
                    className="text-[1.125rem] leading-relaxed text-foreground/70"
                  >
                    The Bitmern SuperApp gives you full visibility and control
                    over your mining operation &mdash; from a single miner to a
                    fleet of thousands. Real-time dashboards, automated alerts,
                    and remote management across every facility.
                  </motion.p>
                  <div className="spacer-medium" />
                  <motion.div
                    variants={hero.chVariants}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <Button size="lg" asChild>
                      <Link href="/contact">Request Access</Link>
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/mara-firmware">Explore MARA Firmware</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Right — Device Mockup */}
                <motion.div
                  variants={hero.chVariants}
                  className="mx-auto max-w-[520px]"
                >
                  <Image
                    src="/mockups/app-dashboard.webp"
                    alt="Bitmern SuperApp monitoring dashboard"
                    width={1040}
                    height={780}
                    className="rounded-lg shadow-xl"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* SuperApp Features with Device Composition */}
      {/* --------------------------------------------------------------- */}
      <section ref={features.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={features.cVariants}
                initial="hidden"
                animate={features.inView ? "visible" : "hidden"}
              >
                <motion.div variants={features.chVariants}>
                  <Tag variant="muted">SuperApp</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={features.chVariants}>
                  Everything You Need in One Dashboard
                </motion.h2>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={features.crdStagger}
                initial="hidden"
                animate={features.inView ? "visible" : "hidden"}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {SUPERAPP_FEATURES.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      variants={features.crdFade}
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

      {/* --------------------------------------------------------------- */}
      {/* AI Optimization */}
      {/* --------------------------------------------------------------- */}
      <section ref={ai.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={ai.cVariants}
                initial="hidden"
                animate={ai.inView ? "visible" : "hidden"}
              >
                <motion.div variants={ai.chVariants}>
                  <Tag>AI Boosting</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={ai.chVariants}>
                  25-35% Performance Improvement Through AI
                </motion.h2>
                <div className="spacer-small" />
                <motion.p
                  variants={ai.chVariants}
                  className="max-w-3xl text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Our machine learning models continuously analyze temperature,
                  power draw, firmware behavior, and pool performance to
                  optimize every miner in real time. The result: 25-35% higher
                  effective hashrate compared to stock firmware settings.
                </motion.p>
              </motion.div>

              <div className="spacer-large" />

              {/* 3-step flow */}
              <motion.div
                variants={ai.crdStagger}
                initial="hidden"
                animate={ai.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-3"
              >
                {AI_STEPS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    variants={ai.crdFade}
                    className="card-surface rounded-lg border border-border/60 p-8"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <span className="font-heading text-[2.5rem] font-bold leading-none text-primary/20">
                        {step.num}
                      </span>
                      {i < AI_STEPS.length - 1 && (
                        <ArrowRight className="hidden size-5 text-foreground/20 md:block" />
                      )}
                    </div>
                    <h3 className="mb-3 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground/60">
                      {step.body}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Mid-page CTA — SectionCTA */}
      {/* --------------------------------------------------------------- */}
      <SectionCTA
        tag="Bitmern SuperApp"
        heading="Monitor Everything from One Dashboard"
        primaryCTA={{ label: "Request Access", href: "/contact" }}
        variant="elevated"
      />

      {/* --------------------------------------------------------------- */}
      {/* MARA Firmware */}
      {/* --------------------------------------------------------------- */}
      <section ref={firmware.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={firmware.cVariants}
                initial="hidden"
                animate={firmware.inView ? "visible" : "hidden"}
              >
                <motion.div variants={firmware.chVariants}>
                  <Tag variant="muted">Firmware</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={firmware.chVariants}>
                  Powered by MARA Firmware
                </motion.h2>
                <div className="spacer-small" />
                <motion.p
                  variants={firmware.chVariants}
                  className="max-w-3xl text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Bitmern is an authorized partner of Marathon Digital for
                  MARAFW deployment. Our technicians install and manage MARA
                  firmware across compatible hardware, delivering up to 35%
                  overclocking with intelligent thermal protection.
                </motion.p>

                <div className="spacer-medium" />

                {/* Compatible hardware */}
                <motion.div variants={firmware.chVariants}>
                  <p className="mb-4 font-mono text-xs uppercase tracking-tight text-foreground/50">
                    Compatible Hardware
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {COMPATIBLE_HARDWARE.map((model) => (
                      <Tag key={model} variant="muted" size="sm">
                        {model}
                      </Tag>
                    ))}
                  </div>
                </motion.div>

                <div className="spacer-medium" />

                <motion.div variants={firmware.chVariants}>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/mara-firmware">
                      <Cpu className="size-4" />
                      Learn More About MARA Firmware
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Platform Availability + App Store Buttons */}
      {/* --------------------------------------------------------------- */}
      <section ref={platforms.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={platforms.cVariants}
                initial="hidden"
                animate={platforms.inView ? "visible" : "hidden"}
              >
                <motion.div variants={platforms.chVariants}>
                  <Tag variant="muted">Platforms</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={platforms.chVariants}>
                  Available Everywhere
                </motion.h2>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={platforms.crdStagger}
                initial="hidden"
                animate={platforms.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-3"
              >
                {PLATFORMS.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <motion.div
                      key={platform.title}
                      variants={platforms.crdFade}
                      className="card-surface rounded-lg border border-border/60 p-8 text-align-center"
                    >
                      <div className="mx-auto mb-6 inline-flex w-fit items-center justify-center rounded bg-primary p-3 text-primary-foreground">
                        <Icon className="size-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="mb-2 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                        {platform.title}
                      </h3>
                      <p className="text-base leading-relaxed text-foreground/60">
                        {platform.body}
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
      {/* Bottom CTA */}
      {/* --------------------------------------------------------------- */}
      <SectionCTA
        tag="Get Started"
        heading="See Your Mining Operation in Real Time"
        description="Log in to the web dashboard or request app access to start monitoring."
        primaryCTA={{ label: "Get Started", href: "/contact" }}
        secondaryCTA={{ label: "View Hosting Plans", href: "/hosting" }}
        variant="elevated"
      />
    </>
  )
}
