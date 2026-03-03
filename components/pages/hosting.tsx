"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Monitor, Wrench, Check } from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const WHY_CARDS = [
  {
    icon: Zap,
    title: "Sub-$0.06/kWh Power",
    body: "Direct utility contracts at wholesale rates. No markups \u2014 savings passed directly to you. Rates from $0.055/kWh (Ethiopia) to $0.0675/kWh (Missouri).",
  },
  {
    icon: Shield,
    title: "97% Uptime Guarantee",
    body: "Redundant power feeds, backup generators, industrial cooling, and 24/7 on-site technicians. Your miners run when they should.",
  },
  {
    icon: Monitor,
    title: "Real-Time SuperApp Dashboard",
    body: "Monitor hashrate, power consumption, and earnings across all facilities from a single dashboard. Available on iOS, Android, and web.",
  },
  {
    icon: Wrench,
    title: "Full Ownership, Zero Hassle",
    body: "Your hardware is 100% yours. We handle operations \u2014 firmware updates, maintenance, pool optimization, security. You collect daily BTC payouts.",
  },
]

const INFRASTRUCTURE_LIST = [
  "Rack space with industrial airflow and cooling",
  "Redundant power feeds with backup generators",
  "DDoS-protected network connectivity",
  "Physical security \u2014 24/7 CCTV, access control",
  "Fire suppression systems",
]

const OPERATIONS_LIST = [
  "24/7 real-time monitoring and automated alerts",
  "Firmware updates and hashrate optimization",
  "Hardware maintenance and repair",
  "Pool configuration and failover management",
  "Daily BTC payouts to your wallet",
]

const PRICING_TIERS = [
  { term: "Month-to-month", rate: "Market rate", commitment: "No minimum" },
  { term: "6 months", rate: "Reduced rate", commitment: "10+ miners" },
  {
    term: "12+ months",
    rate: "Best rate",
    commitment: "Volume discounts available",
  },
]

const FACILITIES = [
  {
    name: "Indiana, USA",
    power: "20 MW",
    rate: "$0.058/kWh",
    uptime: "97%",
    status: "Full Capacity" as const,
  },
  {
    name: "North Dakota, USA",
    power: "3 MW",
    rate: "$0.058/kWh",
    uptime: "97%",
    status: "Available" as const,
  },
  {
    name: "Missouri, USA",
    power: "5.5 MW",
    rate: "$0.0675/kWh",
    uptime: "97%",
    status: "Available" as const,
  },
  {
    name: "Addis Ababa, Ethiopia",
    power: "3 MW",
    rate: "$0.055/kWh",
    uptime: "99.3%",
    status: "Available" as const,
  },
  {
    name: "Finland",
    power: "TBD",
    rate: "TBD",
    uptime: "TBD",
    status: "Coming Soon" as const,
  },
]

const STEPS = [
  {
    num: "01",
    title: "Choose Your Setup",
    body: "Tell us what miners you\u2019re deploying (or let us source them). Pick your preferred facility based on power rate, location, and availability.",
  },
  {
    num: "02",
    title: "We Deploy & Configure",
    body: "Once equipment arrives, our team racks, connects, configures firmware, and sets up pool connections. Average setup time: 48 hours.",
  },
  {
    num: "03",
    title: "You Earn Daily",
    body: "Monitor performance in real-time via the SuperApp. BTC payouts hit your wallet daily. We handle everything else.",
  },
]

const FAQS = [
  {
    q: "What are the hosting fees?",
    a: "Hosting is charged per kWh consumed, varying by contract term and total capacity. Long-term contracts (12+months) get preferential rates. Contact us for a custom quote.",
  },
  {
    q: "Who owns the equipment?",
    a: "You do. Equipment is 100% yours. You can request shipment at any time with 30 days notice.",
  },
  {
    q: "How is my equipment monitored?",
    a: "24/7 real-time monitoring with automated alerts. Our technicians handle firmware updates, repairs, and optimization. You get full dashboard access to hashrate, temperature, and performance metrics.",
  },
  {
    q: "What happens if a miner goes down?",
    a: "Our on-site team diagnoses and repairs hardware issues, typically within 24 hours. You\u2019re notified instantly via the SuperApp.",
  },
  {
    q: "Can I visit the facility?",
    a: "Yes. Contact us to schedule a tour of any active facility.",
  },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export function HostingPage() {
  const hero = useSection(0.15)
  const why = useSection()
  const included = useSection()
  const pricing = useSection()
  const facilities = useSection(0.15)
  const howItWorks = useSection()
  const faq = useSection(0.15)
  const cta = useSection()

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hero.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="mx-auto max-w-3xl text-align-center"
              >
                <motion.div variants={hero.chVariants}>
                  <Tag>ASIC Hosting</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h1 variants={hero.chVariants}>
                  Your Hardware, Our Facilities, Industry-Leading Uptime
                </motion.h1>
                <div className="spacer-small" />
                <motion.p
                  variants={hero.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Deploy your ASICs at our US and international facilities with
                  sub-$0.06/kWh power, 97% uptime, and real-time monitoring
                  through our SuperApp dashboard. You retain full ownership
                  &mdash; we handle power, cooling, maintenance, and security.
                </motion.p>
                <div className="spacer-medium" />
                <motion.div
                  variants={hero.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <a href="/contact">Get a Hosting Quote</a>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a href="/facilities">View Our Facilities</a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Why Host With Bitmern */}
      {/* ----------------------------------------------------------------- */}
      <section ref={why.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={why.cVariants}
                initial="hidden"
                animate={why.inView ? "visible" : "hidden"}
              >
                <motion.div variants={why.chVariants}>
                  <Tag>Why Bitmern</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h2 variants={why.chVariants}>
                  Everything Your Miners Need. Nothing They Don&rsquo;t.
                </motion.h2>
              </motion.div>

              <div className="spacer-large" />

              <motion.div
                variants={why.crdStagger}
                initial="hidden"
                animate={why.inView ? "visible" : "hidden"}
                className="grid gap-6 sm:grid-cols-2"
              >
                {WHY_CARDS.map((card) => {
                  const Icon = card.icon
                  return (
                    <motion.div
                      key={card.title}
                      variants={why.crdFade}
                      className="card-surface rounded-lg border border-border/60 p-8"
                    >
                      <div className="mb-6 inline-flex w-fit items-center justify-center rounded bg-primary p-2 text-primary-foreground">
                        <Icon className="size-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="mb-3 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-base leading-relaxed text-foreground/60">
                        {card.body}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* What's Included */}
      {/* ----------------------------------------------------------------- */}
      <section ref={included.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={included.cVariants}
                initial="hidden"
                animate={included.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={included.chVariants}>
                  Hosting Includes
                </motion.h2>
                <div className="spacer-large" />
                <motion.div
                  variants={included.chVariants}
                  className="grid gap-12 md:grid-cols-2"
                >
                  {/* Infrastructure column */}
                  <div>
                    <h3 className="mb-6 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                      Infrastructure
                    </h3>
                    <ul className="space-y-4">
                      {INFRASTRUCTURE_LIST.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base leading-relaxed text-foreground/70"
                        >
                          <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Operations column */}
                  <div>
                    <h3 className="mb-6 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                      Operations
                    </h3>
                    <ul className="space-y-4">
                      {OPERATIONS_LIST.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base leading-relaxed text-foreground/70"
                        >
                          <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Pricing */}
      {/* ----------------------------------------------------------------- */}
      <section ref={pricing.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={pricing.cVariants}
                initial="hidden"
                animate={pricing.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={pricing.chVariants}>
                  Simple, Transparent Pricing
                </motion.h2>
                <div className="spacer-xsmall" />
                <motion.p
                  variants={pricing.chVariants}
                  className="max-w-2xl text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Hosting is charged per kWh consumed. No service fees on mining
                  profits. No hidden costs. Long-term contracts (12+ months)
                  receive preferential rates.
                </motion.p>
                <div className="spacer-large" />

                {/* Pricing table */}
                <motion.div
                  variants={pricing.chVariants}
                  className="card-surface overflow-hidden rounded-lg border border-border/60"
                >
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b bg-foreground/[0.03]">
                        <th className="px-6 py-4 font-mono text-sm font-semibold uppercase tracking-tight">
                          Term
                        </th>
                        <th className="px-6 py-4 font-mono text-sm font-semibold uppercase tracking-tight">
                          Rate
                        </th>
                        <th className="px-6 py-4 font-mono text-sm font-semibold uppercase tracking-tight">
                          Commitment
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRICING_TIERS.map((tier, i) => (
                        <tr
                          key={tier.term}
                          className={[
                            i < PRICING_TIERS.length - 1 ? "border-b" : "",
                            i % 2 === 0 ? "bg-foreground/[0.015]" : "",
                            "transition-colors duration-200 hover:bg-foreground/[0.04]",
                          ].join(" ")}
                        >
                          <td className="px-6 py-4 text-base font-medium">
                            {tier.term}
                          </td>
                          <td className="px-6 py-4 text-base text-foreground/70">
                            {tier.rate}
                          </td>
                          <td className="px-6 py-4 text-base text-foreground/70">
                            {tier.commitment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>

                <div className="spacer-medium" />
                <motion.p
                  variants={pricing.chVariants}
                  className="text-sm text-foreground/50 italic"
                >
                  Contact us for a custom quote based on your fleet size,
                  preferred facility, and contract term.
                </motion.p>
                <div className="spacer-small" />
                <motion.div variants={pricing.chVariants}>
                  <Button size="lg" asChild>
                    <a href="/contact">Get a Custom Quote</a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Facilities Overview */}
      {/* ----------------------------------------------------------------- */}
      <section ref={facilities.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={facilities.cVariants}
                initial="hidden"
                animate={facilities.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={facilities.chVariants}>
                  Seven Facilities, Four Continents
                </motion.h2>
                <div className="spacer-large" />

                <motion.div
                  variants={facilities.chVariants}
                  className="card-surface overflow-x-auto rounded-lg border border-border/60"
                >
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b bg-foreground/[0.03]">
                        <th className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold uppercase tracking-tight">
                          Facility
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold uppercase tracking-tight">
                          Power
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold uppercase tracking-tight">
                          Rate
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold uppercase tracking-tight">
                          Uptime
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold uppercase tracking-tight">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {FACILITIES.map((f, i) => (
                        <tr
                          key={f.name}
                          className={[
                            i < FACILITIES.length - 1 ? "border-b" : "",
                            i % 2 === 0 ? "bg-foreground/[0.015]" : "",
                            "transition-colors duration-200 hover:bg-foreground/[0.04]",
                          ].join(" ")}
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-base font-medium">
                            {f.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-base text-foreground/70">
                            {f.power}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-base text-foreground/70">
                            {f.rate}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-base text-foreground/70">
                            {f.uptime}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {f.status === "Available" && (
                              <Tag variant="muted" size="sm">
                                Available
                              </Tag>
                            )}
                            {f.status === "Full Capacity" && (
                              <Tag
                                variant="destructive"
                                size="sm"
                              >
                                Full Capacity
                              </Tag>
                            )}
                            {f.status === "Coming Soon" && (
                              <Tag variant="primary" size="sm">
                                Coming Soon
                              </Tag>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* How It Works */}
      {/* ----------------------------------------------------------------- */}
      <section ref={howItWorks.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={howItWorks.cVariants}
                initial="hidden"
                animate={howItWorks.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={howItWorks.chVariants}>
                  From Order to Earning in 48 Hours
                </motion.h2>
                <div className="spacer-large" />

                <motion.div
                  variants={howItWorks.crdStagger}
                  initial="hidden"
                  animate={howItWorks.inView ? "visible" : "hidden"}
                  className="grid gap-8 md:grid-cols-3"
                >
                  {STEPS.map((step) => (
                    <motion.div
                      key={step.num}
                      variants={howItWorks.crdFade}
                      className="relative"
                    >
                      <span className="mb-4 block font-mono text-4xl font-bold text-primary/30">
                        {step.num}
                      </span>
                      <h3 className="mb-3 font-heading text-[1.2rem] font-semibold uppercase tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed text-foreground/60">
                        {step.body}
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
      {/* FAQ */}
      {/* ----------------------------------------------------------------- */}
      <section ref={faq.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={faq.cVariants}
                initial="hidden"
                animate={faq.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={faq.chVariants}
                  className="text-align-center"
                >
                  Hosting FAQ
                </motion.h2>
                <div className="spacer-large" />

                <motion.div
                  variants={faq.chVariants}
                  className="mx-auto max-w-3xl"
                >
                  <Accordion type="multiple" className="flex flex-col gap-4">
                    {FAQS.map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="px-6 py-5 text-[1rem] font-bold">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5">
                          <p className="text-[1.125rem] leading-relaxed text-foreground/70">
                            {item.a}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* ----------------------------------------------------------------- */}
      <section ref={cta.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={cta.cVariants}
                initial="hidden"
                animate={cta.inView ? "visible" : "hidden"}
                className="mx-auto max-w-3xl text-align-center"
              >
                <motion.h2 variants={cta.chVariants}>
                  Ready to Deploy?
                </motion.h2>
                <div className="spacer-xsmall" />
                <motion.p
                  variants={cta.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Get a custom hosting quote based on your fleet size and
                  preferred facility. Current clients get priority access to new
                  facilities and locked pricing.
                </motion.p>
                <div className="spacer-medium" />
                <motion.div
                  variants={cta.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <a href="/contact">Get a Hosting Quote</a>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a href="https://calendly.com/bitmernmining" target="_blank" rel="noopener noreferrer">Book a Strategy Call</a>
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
