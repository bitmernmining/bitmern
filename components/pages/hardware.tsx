"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { SectionCTA } from "@/components/ui/section-cta"
import { CONTACT } from "@/lib/contact"
import { ArrowRight } from "lucide-react"
import { useSection, slideFromLeft, slideFromRight } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FEATURED_MINERS = [
  {
    name: "Proto Rig",
    specs: "819 TH/s · 12,000W · 14.1 J/TH",
    description:
      "Modular, tool-free upgrades in 90 seconds. 9 hashboards, immersion-ready.",
    price: "$9,490",
    estimate: "~$42/day est.",
    image: "/hardware/antminer-s21-plus.webp",
  },
  {
    name: "Antminer S23",
    specs: "318 TH/s · 3,498W · 11 J/TH",
    description: "Bitmain's latest generation flagship. Air-cooled.",
    price: "€7,299",
    estimate: "Top efficiency",
    image: "/hardware/antminer-s21-plus.webp",
  },
  {
    name: "Bitdeer SealMiner A3 Pro",
    specs: "290 TH/s · 3,625W",
    description: "US-competitive alternative with strong efficiency.",
    price: "€4,899",
    estimate: null,
    image: "/hardware/antminer-s21-plus.webp",
  },
  {
    name: "Antminer S21 Pro",
    specs: "234 TH/s · 3,859W · 15 J/TH",
    description: "Proven workhorse, high availability.",
    price: "$3,245",
    estimate: "~$14/day est.",
    image: "/hardware/antminer-s21-pro.avif",
  },
  {
    name: "Avalon A15 Pro 221T",
    specs: "221 TH/s · 3,662W · 16.8 J/TH",
    description: "Canaan's latest generation, strong value.",
    price: "$3,190",
    estimate: "~$13/day est.",
    image: "/hardware/avalon-a15pro.webp",
  },
  {
    name: "Auradine Teraflux AT2880",
    specs: "180-260 TH/s · 4,680W",
    description: "USA-engineered, EnergyTune auto-optimization.",
    price: "$3,490",
    estimate: "~$16/day est.",
    image: "/hardware/antminer-s21-plus.webp",
  },
]

const CATEGORIES = [
  {
    title: "Flagship ASICs",
    description:
      "Maximum hashrate, maximum profitability. For serious operators.",
  },
  {
    title: "Hydro/Immersion",
    description:
      "Liquid-cooled for extreme density and overclocking.",
  },
  {
    title: "Home Miners",
    description:
      "Bitcoin heaters and desktop miners for residential mining.",
  },
  {
    title: "Solo Miners",
    description:
      "Bitaxe, NerdQaxe, and open-source hardware for the Bitmern Solo pool.",
  },
  {
    title: "Scrypt Miners",
    description:
      "Mine Litecoin and Dogecoin with dedicated Scrypt ASICs.",
  },
  {
    title: "Mining Containers",
    description:
      "Turnkey containerized solutions from 20ft to full datacenter pods.",
  },
]

const ADVANTAGES = [
  {
    title: "Direct Manufacturer Access",
    body: "Priority allocation from Bitmain, Canaan, Bitdeer, and more. No reseller markups. Volume pricing from unit 1.",
  },
  {
    title: "17 Brands, 150+ Products",
    body: "The largest curated selection of mining hardware — from €129 Goldshell Byte Miners to €600K turnkey containers.",
  },
  {
    title: "Deploy or Ship",
    body: "Buy and deploy directly into our hosting facilities with 48-hour setup. Or ship to your own location — your choice.",
  },
]

type Brand = {
  name: string
  logo?: string
}

const BRANDS: Brand[] = [
  { name: "Bitmain", logo: "/partners/bitmain.avif" },
  { name: "Canaan", logo: "/partners/avalon.avif" },
  { name: "Bitdeer" },
  { name: "Auradine", logo: "/partners/auradine.webp" },
  { name: "Proto" },
  { name: "21 Energy" },
  { name: "Goldshell" },
  { name: "ElphaPex" },
  { name: "VolcMiner" },
  { name: "iBeLink" },
  { name: "Jasminer" },
  { name: "Innosilicon" },
]

// ---------------------------------------------------------------------------
// Float animation for hero product image
// ---------------------------------------------------------------------------

const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HardwarePage() {
  const hero = useSection()
  const miners = useSection()
  const categories = useSection()
  const advantage = useSection()
  const brands = useSection()
  const bulk = useSection()

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero — Split Layout                                               */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hero.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large is-hero">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]"
              >
                {/* Left — Copy */}
                <div>
                  <motion.div variants={slideFromLeft}>
                    <Tag>Hardware</Tag>
                  </motion.div>

                  <div className="spacer-xsmall" />

                  <motion.h1
                    variants={slideFromLeft}
                    className="text-balance"
                  >
                    Source Miners at Institutional Pricing
                  </motion.h1>

                  <div className="spacer-small" />

                  <motion.p
                    variants={slideFromLeft}
                    className="max-w-xl text-lg leading-relaxed text-foreground/70"
                  >
                    Leverage our direct relationships with Bitmain, Canaan,
                    Bitdeer, Auradine, and 13 more manufacturers for priority
                    allocation and volume pricing. We handle logistics, import,
                    and deployment at our facilities or yours.
                  </motion.p>

                  <div className="spacer-medium" />

                  <motion.div
                    variants={slideFromLeft}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <Button size="lg" asChild>
                      <a
                        href={CONTACT.shop}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Shop All Miners
                      </a>
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/contact">Get a Bulk Quote</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Right — Product Photo */}
                <motion.div
                  variants={slideFromRight}
                  className="flex items-center justify-center"
                >
                  <motion.div
                    animate={floatAnimation}
                    className="relative w-full max-w-md"
                  >
                    <Image
                      src="/hardware/antminer-s21-plus.webp"
                      alt="Bitmain Antminer S21+"
                      width={600}
                      height={500}
                      className="h-auto w-full drop-shadow-2xl"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Featured Miners — Bento Layout with Product Photos                */}
      {/* ----------------------------------------------------------------- */}
      <section ref={miners.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={miners.cVariants}
                initial="hidden"
                animate={miners.inView ? "visible" : "hidden"}
              >
                <motion.div variants={miners.chVariants}>
                  <Tag>Most Profitable</Tag>
                </motion.div>

                <div className="spacer-xsmall" />

                <motion.h2
                  variants={miners.chVariants}
                  className="text-balance"
                >
                  Current Top Performers
                </motion.h2>

                <div className="spacer-large" />

                {/* Featured row — first 2 products, larger cards */}
                <motion.div
                  variants={miners.crdStagger}
                  className="grid gap-6 lg:grid-cols-2"
                >
                  {FEATURED_MINERS.slice(0, 2).map((miner) => (
                    <motion.div
                      key={miner.name}
                      variants={miners.crdFade}
                      className="group card-surface flex flex-col overflow-hidden border border-border/60 rounded-lg"
                    >
                      {/* Product image */}
                      <div className="relative aspect-[4/3] bg-foreground/[0.03]">
                        <Image
                          src={miner.image}
                          alt={miner.name}
                          fill
                          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-6 lg:p-8">
                        <h3 className="font-heading text-[1.44rem] font-normal uppercase leading-tight tracking-tight">
                          {miner.name}
                        </h3>

                        <div className="spacer-xxsmall" />

                        <p className="font-mono text-sm text-foreground/50">
                          {miner.specs}
                        </p>

                        <div className="spacer-xsmall" />

                        <p className="text-sm leading-relaxed text-foreground/60">
                          {miner.description}
                        </p>

                        <div className="mt-auto pt-6">
                          <p className="font-heading text-2xl font-bold text-primary">
                            {miner.price}
                          </p>
                          {miner.estimate && (
                            <p className="mt-1 font-mono text-xs text-foreground/50">
                              {miner.estimate}
                            </p>
                          )}

                          <div className="spacer-small" />

                          <a
                            href={CONTACT.shop}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                          >
                            View Details
                            <ArrowRight className="size-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="spacer-medium" />

                {/* Remaining miners — smaller grid */}
                <motion.div
                  variants={miners.crdStagger}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {FEATURED_MINERS.slice(2).map((miner) => (
                    <motion.div
                      key={miner.name}
                      variants={miners.crdFade}
                      className="group card-surface flex flex-col overflow-hidden border border-border/60 rounded-lg"
                    >
                      {/* Product image */}
                      <div className="relative aspect-[4/3] bg-foreground/[0.03]">
                        <Image
                          src={miner.image}
                          alt={miner.name}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-heading text-[1.1rem] font-normal uppercase leading-tight tracking-tight">
                          {miner.name}
                        </h3>

                        <div className="spacer-xxsmall" />

                        <p className="font-mono text-xs text-foreground/50">
                          {miner.specs}
                        </p>

                        <div className="spacer-xsmall" />

                        <p className="text-xs leading-relaxed text-foreground/60">
                          {miner.description}
                        </p>

                        <div className="mt-auto pt-4">
                          <p className="font-heading text-xl font-bold text-primary">
                            {miner.price}
                          </p>
                          {miner.estimate && (
                            <p className="mt-1 font-mono text-xs text-foreground/50">
                              {miner.estimate}
                            </p>
                          )}

                          <div className="spacer-xsmall" />

                          <a
                            href={CONTACT.shop}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                          >
                            View Details
                            <ArrowRight className="size-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  variants={miners.chVariants}
                  className="mt-6 text-sm italic text-foreground/50"
                >
                  Estimates based on current network conditions. Actual returns
                  vary with BTC price and mining difficulty.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Categories                                                        */}
      {/* ----------------------------------------------------------------- */}
      <section ref={categories.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={categories.cVariants}
                initial="hidden"
                animate={categories.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={categories.chVariants}
                  className="text-balance"
                >
                  Find the Right Miner
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={categories.crdStagger}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {CATEGORIES.map((cat) => (
                    <motion.div
                      key={cat.title}
                      variants={categories.crdFade}
                      className="card-surface border border-border/60 rounded-lg p-6"
                    >
                      <h3 className="font-heading text-[1.2rem] font-normal uppercase leading-tight tracking-tight">
                        {cat.title}
                      </h3>
                      <div className="spacer-xxsmall" />
                      <p className="text-sm leading-relaxed text-foreground/60">
                        {cat.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Why Buy Through Bitmern                                           */}
      {/* ----------------------------------------------------------------- */}
      <section ref={advantage.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={advantage.cVariants}
                initial="hidden"
                animate={advantage.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={advantage.chVariants}
                  className="text-balance"
                >
                  The Bitmern Advantage
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={advantage.crdStagger}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {ADVANTAGES.map((adv) => (
                    <motion.div
                      key={adv.title}
                      variants={advantage.crdFade}
                      className="card-surface border border-border/60 rounded-lg p-6"
                    >
                      <h3 className="font-heading text-[1.2rem] font-normal uppercase leading-tight tracking-tight">
                        {adv.title}
                      </h3>
                      <div className="spacer-xxsmall" />
                      <p className="text-sm leading-relaxed text-foreground/60">
                        {adv.body}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Manufacturers — Logos + Text                                      */}
      {/* ----------------------------------------------------------------- */}
      <section ref={brands.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={brands.cVariants}
                initial="hidden"
                animate={brands.inView ? "visible" : "hidden"}
                className="text-center"
              >
                <motion.h2
                  variants={brands.chVariants}
                  className="text-balance"
                >
                  Manufacturers We Work With
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={brands.chVariants}
                  className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
                >
                  {BRANDS.map((brand) =>
                    brand.logo ? (
                      <div
                        key={brand.name}
                        className="flex items-center"
                        title={brand.name}
                      >
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={120}
                          height={32}
                          className="h-8 w-auto object-contain opacity-60 transition-opacity duration-350 hover:opacity-100"
                        />
                      </div>
                    ) : (
                      <span
                        key={brand.name}
                        className="font-mono text-sm uppercase tracking-wide text-foreground/40"
                      >
                        {brand.name}
                      </span>
                    ),
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bulk & Institutional                                              */}
      {/* ----------------------------------------------------------------- */}
      <section ref={bulk.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={bulk.cVariants}
                initial="hidden"
                animate={bulk.inView ? "visible" : "hidden"}
                className="card-surface rounded-lg border border-border/60 p-8 text-center lg:p-12"
              >
                <motion.h2
                  variants={bulk.chVariants}
                  className="text-balance"
                >
                  Volume Pricing for Large Orders
                </motion.h2>

                <div className="spacer-small" />

                <motion.p
                  variants={bulk.chVariants}
                  className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/60"
                >
                  Orders of 50+ units receive volume pricing. 100+ and 500+
                  tiers unlock significant additional discounts. We handle
                  customs, logistics, and deployment at any of our facilities.
                </motion.p>

                <div className="spacer-medium" />

                <motion.div variants={bulk.chVariants}>
                  <Button size="lg" asChild>
                    <Link href="/contact">Contact Sales for Bulk Pricing</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA                                                        */}
      {/* ----------------------------------------------------------------- */}
      <SectionCTA
        tag="Full Catalog"
        heading="Browse 150+ Products Across 17 Brands"
        description="New miners, used miners, accessories, containers, and cooling solutions — all at institutional pricing."
        primaryCTA={{ label: "Shop All Miners", href: CONTACT.shop }}
        secondaryCTA={{ label: "Get a Custom Quote", href: "/contact" }}
        variant="elevated"
      />
    </>
  )
}
