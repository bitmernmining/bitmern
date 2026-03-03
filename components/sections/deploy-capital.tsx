"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import Image from "next/image"
import {
  staggerContainer,
  fadeUp,
  reducedStagger,
  reducedFade,
  EASE,
} from "@/lib/motion"
import { Landmark, Server, Pickaxe } from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"

// ---------------------------------------------------------------------------
// Card data
// ---------------------------------------------------------------------------

const CARDS = [
  {
    icon: Landmark,
    title: "Structured Mining Exposure",
    audience: "Family Offices & HNWIs seeking passive exposure",
    body: "Gain Bitcoin mining exposure without the operational complexity. Blocks Fund offers accredited investors a hands-off vehicle with transparent reporting, managed risk, and quarterly distributions.",
    cta: "Explore Blocks Fund",
    href: "/institutional",
    featured: true,
  },
  {
    icon: Server,
    title: "Managed ASIC Hosting in Global Facilities",
    audience: "Investors deploying their own hardware",
    body: "Colocate your miners at our global facilities with sub-$0.06/kWh power, 97% uptime, and 24/7 monitoring. With full transparency via our SuperApp dashboard, you own the hardware, we handle operations.",
    cta: "View Hosting Plans",
    href: "/hosting",
    featured: false,
  },
  {
    icon: Pickaxe,
    title: "Solo Mining Pool",
    audience: "Miners who want the full block reward",
    body: "Mine Bitcoin, Litecoin, Dogecoin, Bitcoin Cash, or DigiByte on Bitmern Solo with a flat 1% fee. No shared payouts, no middlemen — direct wallet payouts, real-time monitoring, and 99.9% uptime infrastructure.",
    cta: "Start Solo Mining",
    href: "https://bitmernsolo.com",
    featured: false,
  },
]

// ---------------------------------------------------------------------------
// Bento stagger — featured card first, then two smaller cards follow
// ---------------------------------------------------------------------------

const bentoStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const bentoFeatured = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const bentoCard = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function DeployCapital() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 })

  const cVariants = prefersReduced ? reducedStagger : staggerContainer
  const chVariants = prefersReduced ? reducedFade : fadeUp
  const bStagger = prefersReduced ? reducedStagger : bentoStagger
  const bFeatured = prefersReduced ? reducedFade : bentoFeatured
  const bCard = prefersReduced ? reducedFade : bentoCard

  const [featured, ...supporting] = CARDS

  return (
    <section ref={sectionRef} className="relative">
      {/* Dot-grid background overlay */}
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="padding-global relative">
        <div className="container-large">
          <div className="padding-section-medium">
            {/* Header — 2 columns: tag+h2 left, paragraph right */}
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-20 grid items-start gap-10 lg:grid-cols-2 lg:gap-x-20"
            >
              <div>
                <motion.div variants={chVariants}>
                  <Tag>How We Work With You</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={chVariants}>
                  Three Ways to Deploy Capital
                </motion.h2>
              </div>

              <motion.p
                variants={chVariants}
                className="text-[1.125rem] leading-relaxed text-foreground/70"
              >
                Whether you&rsquo;re seeking passive exposure, deploying
                hardware, or mining solo for the full block reward &mdash; we
                have infrastructure and expertise to match.
              </motion.p>
            </motion.div>

            {/* Asymmetric bento grid */}
            <motion.div
              ref={cardsRef}
              variants={bStagger}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
              className="grid gap-6 lg:grid-cols-2 lg:grid-rows-2"
            >
              {/* Featured card — spans 2 rows */}
              <motion.div
                variants={bFeatured}
                className="card-surface flex flex-col overflow-hidden rounded-lg border border-border/60 lg:row-span-2"
              >
                {/* Facility photo header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src="/facilities/indiana.webp"
                    alt="Bitmern mining facility — Indiana"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-8">
                  {/* Icon badge */}
                  <div className="mb-8 inline-flex w-fit items-center justify-center rounded bg-primary p-2 text-primary-foreground">
                    <featured.icon className="size-6" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-6 font-heading text-[1.728rem] font-normal uppercase leading-none tracking-tight">
                    {featured.title}
                  </h3>

                  {/* Audience */}
                  <p className="mb-4 font-mono text-sm">
                    <strong className="font-semibold text-primary">
                      For:
                    </strong>{" "}
                    {featured.audience}
                  </p>

                  {/* Body */}
                  <p className="mb-6 text-base leading-relaxed text-foreground/60">
                    {featured.body}
                  </p>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Button variant="secondary" size="sm" asChild>
                      <a href={featured.href}>{featured.cta}</a>
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Supporting cards */}
              {supporting.map((card) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.title}
                    variants={bCard}
                    className="card-surface flex flex-col rounded-lg border border-border/60 border-t-2 border-t-primary/20 p-8"
                  >
                    {/* Icon badge — larger for supporting cards */}
                    <div className="mb-8 inline-flex w-fit items-center justify-center rounded bg-primary p-2.5 text-primary-foreground">
                      <Icon className="size-10" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="mb-6 font-heading text-[1.728rem] font-normal uppercase leading-none tracking-tight">
                      {card.title}
                    </h3>

                    {/* Audience */}
                    <p className="mb-4 font-mono text-sm">
                      <strong className="font-semibold text-primary">
                        For:
                      </strong>{" "}
                      {card.audience}
                    </p>

                    {/* Body */}
                    <p className="mb-6 text-base leading-relaxed text-foreground/60">
                      {card.body}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Button variant="secondary" size="sm" asChild>
                        <a href={card.href}>{card.cta}</a>
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
