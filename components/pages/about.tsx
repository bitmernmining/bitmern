"use client"

import { motion } from "framer-motion"
import {
  Server,
  Cpu,
  Pickaxe,
  ArrowRight,
  Zap,
  Globe,
  Activity,
  HardDrive,
} from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { InfrastructureGrid } from "@/components/animations/infrastructure-grid"
import { SectionCTA } from "@/components/ui/section-cta"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const HERO_STATS = [
  { value: "31.5+", unit: "MW", label: "Power Capacity" },
  { value: "176+", unit: "PH/s", label: "Hashrate Under Management" },
  { value: "3", unit: "", label: "Continents" },
  { value: "1,400+", unit: "", label: "Miners Deployed" },
]

const capabilities = [
  {
    icon: Server,
    title: "Host & Manage",
    description:
      "From $0.055/kWh facilities with 97% uptime. Your hardware, our infrastructure, daily BTC payouts.",
    href: "/hosting",
    cta: "View Hosting",
  },
  {
    icon: Cpu,
    title: "Source & Deploy",
    description:
      "Direct relationships with Bitmain, Canaan, Bitdeer, Auradine, and 13 more manufacturers. Institutional pricing, no middlemen.",
    href: "/hardware",
    cta: "Shop Hardware",
  },
  {
    icon: Pickaxe,
    title: "Mine Solo",
    description:
      "Bitmern Solo \u2014 our 5-coin solo mining pool. 1% flat fee, direct wallet payouts, 99.9% uptime.",
    href: "/solo-pool",
    cta: "Start Mining",
  },
]

const values = [
  {
    number: "01",
    icon: Activity,
    title: "Transparency First",
    description:
      "Real-time dashboards. Daily payouts. No hidden fees. You see exactly what your miners are doing, what they\u2019re earning, and what you\u2019re paying \u2014 every day.",
  },
  {
    number: "02",
    icon: HardDrive,
    title: "Operator Mentality",
    description:
      "We don\u2019t just sell rack space. We manage firmware, optimize hashrate, handle maintenance, and monitor 24/7. Your success is our business model.",
  },
  {
    number: "03",
    icon: Globe,
    title: "Global Diversification",
    description:
      "Five facilities across three continents means no single point of failure. Geographic diversification protects against regulatory shifts, power disruptions, and climate risk.",
  },
]

const milestones = [
  {
    year: "2021",
    title: "Founded",
    milestone: "Bitmern Mining founded in Greece by Giannis Andreou.",
  },
  {
    year: "2022",
    title: "First Facility",
    milestone:
      "First facility operational \u2014 Addis Ababa, Ethiopia (3 MW).",
    image: "/facilities/addis-ababa.webp",
    imageAlt: "Bitmern facility in Addis Ababa, Ethiopia",
  },
  {
    year: "2023–24",
    title: "Scaling Up",
    milestone: "Multi-site expansion brings total managed capacity past 30 MW.",
    image: "/facilities/addis-ababa.webp",
    imageAlt: "Bitmern Mining facility expansion",
  },
  {
    year: "2025",
    title: "Global Recognition",
    milestone:
      "Blockchain Life Dubai. MARA firmware partnership. 176+ PH/s under management.",
  },
  {
    year: "2026",
    title: "Ecosystem Launch",
    milestone:
      "Bitmern Solo pool launch. Finland expansion pipeline. shop.bitmernmining.com live.",
    image: "/facilities/finland.webp",
    imageAlt: "Bitmern expansion site in Finland",
  },
]

const teamMembers = [
  {
    name: "Giannis Andreou",
    title: "Founder & CEO",
    image: "/team/giannis-new.avif",
  },
  {
    name: "Paschalis Pietris",
    title: "Vice President",
    image: "/team/paschalis-new.avif",
  },
  {
    name: "Michelle Chikomboya",
    title: "Chief Financial Officer",
    image: "/team/michelle.webp",
  },
]

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function HeroSection() {
  const { ref, inView, cVariants, chVariants } = useSection()

  return (
    <section ref={ref} className="relative">
      {/* Canvas background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <InfrastructureGrid />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: [
            "linear-gradient(180deg, color-mix(in oklch, var(--color-background) 70%, transparent) 0%, color-mix(in oklch, var(--color-background) 55%, transparent) 50%, color-mix(in oklch, var(--color-background) 80%, transparent) 100%)",
            "radial-gradient(circle farthest-corner at 50% 50%, transparent 50%, color-mix(in oklch, var(--color-background) 85%, transparent))",
          ].join(", "),
        }}
      />

      <div className="padding-global relative z-[10]">
        <div className="container-large">
          <div className="padding-section-large is-hero">
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="max-width-large">
                <motion.div variants={chVariants}>
                  <Tag>Our Story</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h1 variants={chVariants}>
                  From Greece to Global Mining Infrastructure
                </motion.h1>
                <div className="spacer-small" />
                <motion.p
                  variants={chVariants}
                  className="text-lg leading-relaxed text-foreground/70"
                >
                  Bitmern Mining started with a single conviction: Bitcoin
                  mining should be accessible, transparent, and professionally
                  managed. What began as a small operation has grown into a
                  multi-continent infrastructure company serving individual
                  miners and institutional investors alike.
                </motion.p>
              </div>

              {/* Hero stats row */}
              <div className="spacer-xlarge" />
              <motion.div
                variants={chVariants}
                className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
              >
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <div className="font-heading text-[2.5rem] font-bold leading-none text-primary md:text-[3rem]">
                      {stat.value}
                      {stat.unit && (
                        <span className="ml-1 text-[1.2rem] font-normal text-foreground/50">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-wide text-foreground/50">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OriginSection() {
  const { ref, inView, cVariants, chVariants } = useSection()

  return (
    <section ref={ref} className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid items-start gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-x-20"
            >
              {/* Left — story content */}
              <div>
                <motion.div variants={chVariants}>
                  <Tag variant="muted">Origin</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={chVariants}>
                  Built by Miners, for Miners
                </motion.h2>
                <div className="spacer-small" />
                <motion.p
                  variants={chVariants}
                  className="text-lg leading-relaxed text-foreground/70"
                >
                  Founded by Giannis Andreou, Bitmern Mining grew from a
                  passion for Bitcoin into a $10M+ infrastructure business in
                  under two years. Our founder&rsquo;s hands-on experience
                  &mdash; from sourcing hardware and negotiating power contracts
                  to building out facilities in Ethiopia and the United States
                  &mdash; shaped a company that understands every link in the
                  mining value chain.
                </motion.p>
                <div className="spacer-small" />
                <motion.p
                  variants={chVariants}
                  className="text-lg leading-relaxed text-foreground/70"
                >
                  We didn&rsquo;t start with a fund or a pitch deck. We started
                  with ASICs, power cables, and a commitment to doing things
                  right. That operator-first mentality still drives every
                  decision we make.
                </motion.p>
              </div>

              {/* Right — facility photo + pull-quote card */}
              <motion.div variants={chVariants} className="lg:mt-16">
                {/* Facility photo */}
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/facilities/addis-ababa.webp"
                    alt="Bitmern Mining facility"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={85}
                  />
                </div>

                {/* Pull-quote card */}
                <div className="card-surface rounded-lg border border-border/60 p-8">
                  <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary p-2 text-primary-foreground">
                    <Zap className="size-6" strokeWidth={1.5} />
                  </div>
                  <blockquote className="mb-4 font-heading text-[1.44rem] font-normal uppercase leading-tight tracking-tight">
                    &ldquo;We didn&rsquo;t start with a pitch deck. We started
                    with ASICs and power cables.&rdquo;
                  </blockquote>
                  <p className="font-mono text-sm text-foreground/50">
                    <strong className="font-semibold text-primary">
                      Giannis Andreou
                    </strong>{" "}
                    &mdash; Founder &amp; CEO
                  </p>
                </div>

                {/* Key stats below the quote */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="card-surface rounded-lg border border-border/60 p-4 text-center">
                    <div className="font-heading text-[2rem] font-bold leading-none text-primary">
                      $10M+
                    </div>
                    <div className="mt-1 font-mono text-xs uppercase tracking-wide text-foreground/50">
                      Infrastructure Value
                    </div>
                  </div>
                  <div className="card-surface rounded-lg border border-border/60 p-4 text-center">
                    <div className="font-heading text-[2rem] font-bold leading-none text-primary">
                      &lt;2yrs
                    </div>
                    <div className="mt-1 font-mono text-xs uppercase tracking-wide text-foreground/50">
                      From Zero to Scale
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatWeDoSection() {
  const header = useSection()
  const cards = useSection(0.15)

  return (
    <section ref={header.ref}>
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {/* Header — 2 columns */}
            <motion.div
              variants={header.cVariants}
              initial="hidden"
              animate={header.inView ? "visible" : "hidden"}
              className="mb-20 grid items-start gap-10 lg:grid-cols-2 lg:gap-x-20"
            >
              <div>
                <motion.div variants={header.chVariants}>
                  <Tag>What We Do</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={header.chVariants}>
                  A Full-Stack Mining Company
                </motion.h2>
              </div>

              <motion.p
                variants={header.chVariants}
                className="text-[1.125rem] leading-relaxed text-foreground/70"
              >
                Today, Bitmern Mining operates across three continents with
                31.5+ MW of power capacity and 176+ PH/s of hashrate under
                management. Our ecosystem covers every stage of the mining
                journey.
              </motion.p>
            </motion.div>

            {/* 3-column card grid */}
            <motion.div
              ref={cards.ref}
              variants={cards.crdStagger}
              initial="hidden"
              animate={cards.inView ? "visible" : "hidden"}
              className="grid gap-6 md:grid-cols-3"
            >
              {capabilities.map((cap) => {
                const Icon = cap.icon
                return (
                  <motion.div
                    key={cap.title}
                    variants={cards.crdFade}
                    className="card-surface flex flex-col rounded-lg border border-border/60 p-8"
                  >
                    {/* Icon badge */}
                    <div className="mb-8 inline-flex w-fit items-center justify-center rounded bg-primary p-2 text-primary-foreground">
                      <Icon className="size-6" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 font-heading text-[1.728rem] font-normal uppercase leading-none tracking-tight">
                      {cap.title}
                    </h3>

                    {/* Body */}
                    <p className="mb-6 text-base leading-relaxed text-foreground/60">
                      {cap.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Button variant="secondary" size="sm" asChild>
                        <Link href={cap.href}>{cap.cta}</Link>
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const header = useSection()
  const cards = useSection(0.15)

  return (
    <section ref={header.ref} className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {/* Header — 2 columns */}
            <motion.div
              variants={header.cVariants}
              initial="hidden"
              animate={header.inView ? "visible" : "hidden"}
              className="mb-20 grid items-start gap-10 lg:grid-cols-2 lg:gap-x-20"
            >
              <div>
                <motion.div variants={header.chVariants}>
                  <Tag variant="muted">Values</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={header.chVariants}>How We Operate</motion.h2>
              </div>

              <motion.p
                variants={header.chVariants}
                className="text-[1.125rem] leading-relaxed text-foreground/70"
              >
                Every decision we make is guided by three principles that
                have defined Bitmern since day one.
              </motion.p>
            </motion.div>

            {/* Value cards — numbered */}
            <motion.div
              ref={cards.ref}
              variants={cards.crdStagger}
              initial="hidden"
              animate={cards.inView ? "visible" : "hidden"}
              className="grid gap-6 md:grid-cols-3"
            >
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    variants={cards.crdFade}
                    className="card-surface flex flex-col rounded-lg border border-border/60 p-8"
                  >
                    {/* Large number + icon */}
                    <div className="mb-6 flex items-start justify-between">
                      <span className="font-heading text-[3rem] font-bold leading-none text-primary/20">
                        {value.number}
                      </span>
                      <div className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-primary-foreground">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-heading text-[1.2rem] font-normal uppercase leading-tight tracking-[-0.01375rem]">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {value.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamPreviewSection() {
  const { ref, inView, cVariants, chVariants } = useSection()

  return (
    <section ref={ref}>
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mx-auto max-w-[42rem] text-align-center"
            >
              <motion.div variants={chVariants}>
                <Tag>Leadership</Tag>
              </motion.div>
              <div className="spacer-xsmall" />
              <motion.h2 variants={chVariants}>
                The Team Behind the Hash
              </motion.h2>
              <div className="spacer-small" />
              <motion.p
                variants={chVariants}
                className="text-lg leading-relaxed text-foreground/70"
              >
                A leadership team that combines deep industry expertise
                with an operator-first mentality across three continents.
              </motion.p>

              <div className="spacer-large" />

              {/* Team headshots */}
              <motion.div
                variants={chVariants}
                className="flex flex-wrap items-start justify-center gap-10"
              >
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex flex-col items-center">
                    <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-border/60">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <p className="font-heading text-sm font-medium text-foreground">
                      {member.name}
                    </p>
                    <p className="font-mono text-xs text-foreground/50">
                      {member.title}
                    </p>
                  </div>
                ))}
              </motion.div>

              <div className="spacer-medium" />

              <motion.div variants={chVariants}>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/team">
                    Meet the Full Team
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const header = useSection()
  const cards = useSection(0.1)

  return (
    <section ref={header.ref} className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {/* Header — centered */}
            <motion.div
              variants={header.cVariants}
              initial="hidden"
              animate={header.inView ? "visible" : "hidden"}
              className="mx-auto max-w-[48rem] text-align-center"
            >
              <motion.div variants={header.chVariants}>
                <Tag variant="muted">Milestones</Tag>
              </motion.div>
              <div className="spacer-xsmall" />
              <motion.h2 variants={header.chVariants}>
                Five Years of Relentless Growth
              </motion.h2>
              <div className="spacer-small" />
              <motion.p
                variants={header.chVariants}
                className="text-lg leading-relaxed text-foreground/70"
              >
                From a single conviction in Greece to multi-continent
                operations. Every year, we&rsquo;ve doubled down.
              </motion.p>
            </motion.div>

            <div className="spacer-xxlarge" />

            {/* Timeline grid — 3 cols on desktop, 2 on tablet, 1 on mobile */}
            <motion.div
              ref={cards.ref}
              variants={cards.crdStagger}
              initial="hidden"
              animate={cards.inView ? "visible" : "hidden"}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {milestones.map((item) => (
                <motion.div
                  key={item.year}
                  variants={cards.crdFade}
                  className="card-surface group flex flex-col overflow-hidden rounded-lg border border-border/60 transition-colors duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-primary/40"
                >
                  {/* Facility photo if available */}
                  {item.image && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={80}
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    {/* Year */}
                    <div className="mb-4 font-heading text-[2.5rem] font-bold leading-none text-primary">
                      {item.year}
                    </div>

                    {/* Divider */}
                    <div className="mb-4 h-px w-12 bg-border transition-colors duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-primary/60" />

                    {/* Title */}
                    <h3 className="mb-2 font-heading text-[1rem] font-medium uppercase tracking-tight text-foreground">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {item.milestone}
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function AboutPage() {
  return (
    <>
      <HeroSection />
      <OriginSection />

      <WhatWeDoSection />
      <ValuesSection />
      <TeamPreviewSection />
      <TimelineSection />

      <SectionCTA
        variant="elevated"
        tag="Get Started"
        heading="Ready to Start Mining?"
        description="Whether you're deploying your first miner or scaling an institutional portfolio, we have the infrastructure and expertise to match."
        primaryCTA={{ label: "Get Started", href: "/contact" }}
        secondaryCTA={{ label: "Book a Strategy Call", href: "https://calendly.com/bitmernmining" }}
      />
    </>
  )
}
