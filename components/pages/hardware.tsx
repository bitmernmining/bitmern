"use client"

import { motion } from "framer-motion"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useSection } from "@/lib/motion"

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
  },
  {
    name: "Antminer S23",
    specs: "318 TH/s · 3,498W · 11 J/TH",
    description: "Bitmain's latest generation flagship. Air-cooled.",
    price: "€7,299",
    estimate: "Top efficiency",
  },
  {
    name: "Bitdeer SealMiner A3 Pro",
    specs: "290 TH/s · 3,625W",
    description: "US-competitive alternative with strong efficiency.",
    price: "€4,899",
    estimate: null,
  },
  {
    name: "Antminer S21 Pro",
    specs: "234 TH/s · 3,859W · 15 J/TH",
    description: "Proven workhorse, high availability.",
    price: "$3,245",
    estimate: "~$14/day est.",
  },
  {
    name: "Avalon A15 Pro 221T",
    specs: "221 TH/s · 3,662W · 16.8 J/TH",
    description: "Canaan's latest generation, strong value.",
    price: "$3,190",
    estimate: "~$13/day est.",
  },
  {
    name: "Auradine Teraflux AT2880",
    specs: "180-260 TH/s · 4,680W",
    description: "USA-engineered, EnergyTune auto-optimization.",
    price: "$3,490",
    estimate: "~$16/day est.",
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

const BRANDS = [
  "Bitmain",
  "Canaan",
  "Bitdeer",
  "Auradine",
  "Proto",
  "21 Energy",
  "Goldshell",
  "ElphaPex",
  "VolcMiner",
  "iBeLink",
  "Jasminer",
  "Innosilicon",
]

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
  const cta = useSection()

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hero.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large is-hero">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="mx-auto max-w-3xl text-center"
              >
                <motion.div variants={hero.chVariants}>
                  <Tag>Hardware</Tag>
                </motion.div>

                <div className="spacer-xsmall" />

                <motion.h1
                  variants={hero.chVariants}
                  className="text-balance"
                >
                  Source ASIC Miners at Institutional Pricing
                </motion.h1>

                <div className="spacer-small" />

                <motion.p
                  variants={hero.chVariants}
                  className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/70"
                >
                  Leverage our direct relationships with Bitmain, Canaan,
                  Bitdeer, Auradine, and 13 more manufacturers for priority
                  allocation and volume pricing. We handle logistics, import,
                  and deployment at our facilities or yours.
                </motion.p>

                <div className="spacer-medium" />

                <motion.div
                  variants={hero.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <a
                      href="https://shop.bitmernmining.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Shop All Miners
                    </a>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a href="/contact">Get a Bulk Quote</a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Featured Miners                                                   */}
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

                <motion.div
                  variants={miners.crdStagger}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {FEATURED_MINERS.map((miner) => (
                    <motion.div
                      key={miner.name}
                      variants={miners.crdFade}
                      className="card-surface flex flex-col border border-border/60 rounded-lg p-6"
                    >
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
                          href="https://shop.bitmernmining.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          View Details
                          <ArrowRight className="size-3.5" />
                        </a>
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
      {/* Brands                                                            */}
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
                  className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
                >
                  {BRANDS.map((brand) => (
                    <span
                      key={brand}
                      className="font-mono text-sm uppercase tracking-wide text-foreground/40"
                    >
                      {brand}
                    </span>
                  ))}
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
                    <a href="/contact">Contact Sales for Bulk Pricing</a>
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
      <section ref={cta.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={cta.cVariants}
                initial="hidden"
                animate={cta.inView ? "visible" : "hidden"}
                className="mx-auto max-w-2xl text-center"
              >
                <motion.h2
                  variants={cta.chVariants}
                  className="text-balance"
                >
                  Browse the Full Catalog
                </motion.h2>

                <div className="spacer-small" />

                <motion.p
                  variants={cta.chVariants}
                  className="text-base leading-relaxed text-foreground/70"
                >
                  150+ products across 17 brands. New miners, used miners,
                  accessories, containers, and cooling solutions.
                </motion.p>

                <div className="spacer-medium" />

                <motion.div
                  variants={cta.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <a
                      href="https://shop.bitmernmining.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Shop All Miners
                    </a>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a href="/contact">Get a Custom Quote</a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
