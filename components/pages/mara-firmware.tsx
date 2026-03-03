"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import {
  Gauge,
  Wand2,
  SlidersHorizontal,
  ShieldCheck,
  Wifi,
  CreditCard,
} from "lucide-react"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CORE_FEATURES = [
  {
    title: "Optimize Performance",
    body: "Boost hashrate while maintaining peak efficiency. MARAFW extracts maximum output from every hashboard without compromising hardware lifespan.",
    Icon: Gauge,
  },
  {
    title: "Auto-Tune Like Never Before",
    body: "Set your target — performance, efficiency, or balanced — and let MARAFW optimize automatically. Results in minutes, not hours of manual tuning.",
    Icon: Wand2,
  },
  {
    title: "Overclock or Underclock with Ease",
    body: "Need more hashrate? Push to 35% above stock. Prioritizing efficiency? Underclock to the sweet spot. One slider, full control.",
    Icon: SlidersHorizontal,
  },
  {
    title: "Safeguard Your Miners",
    body: "Intelligent thermal protection activates in seconds. MARAFW monitors temperature per-chip and adjusts frequency dynamically to prevent damage.",
    Icon: ShieldCheck,
  },
]

const STATS = [
  { value: "Up to 35%", label: "Overclocking above stock settings" },
  { value: "99%", label: "Uptime with MARAFW-managed fleets" },
  { value: "25-29 W/TH", label: "Industry-leading efficiency on S19J Pro" },
]

const COMPATIBLE_MINERS = [
  "Antminer S19",
  "Antminer S19J",
  "Antminer S19 PRO",
  "Antminer S19J PRO",
  "Antminer S19 XP",
  "Antminer S19J PRO+",
  "Antminer S19K PRO",
  "Antminer T21",
  "Antminer S21",
  "Antminer S21 Immersion",
  "Antminer S21 Pro",
  "Antminer S21 XP",
]

const DASHBOARD_FEATURES = [
  {
    title: "Automatic Tuning",
    body: "Set a target and let firmware optimize across all hashboards",
  },
  {
    title: "Mode Selection",
    body: "Overclock, underclock, or balanced with a single setting",
  },
  {
    title: "Environment Profiles",
    body: "Air, hydro, or immersion cooling presets",
  },
  {
    title: "Pool Failover",
    body: "Configure multiple backup pools with automatic switching",
  },
  {
    title: "Detailed Logs",
    body: "Troubleshooting data with export capability",
  },
]

const INSTALLATION_METHODS = [
  {
    title: "Over-the-Air (OTA)",
    body: "Remote installation by Bitmern's technical team. No physical access needed. Ideal for hosted miners.",
    Icon: Wifi,
  },
  {
    title: "SD Card",
    body: "Flash the firmware to an SD card and insert into the miner's control board. For self-hosted deployments.",
    Icon: CreditCard,
  },
]

const UCB_FEATURES = [
  "Pre-loaded MARAFW firmware",
  "Large-scale remote deployment support",
  "Immersion-ready design",
  "Compatible with Foreman, Awesome Miner, BTCtools",
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MaraFirmwarePage() {
  const hero = useSection()
  const core = useSection()
  const results = useSection()
  const compatible = useSection()
  const dashboard = useSection()
  const install = useSection()
  const ucb = useSection()
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
                  <Tag>MARA Firmware</Tag>
                </motion.div>

                <div className="spacer-xsmall" />

                <motion.h1
                  variants={hero.chVariants}
                  className="text-balance"
                >
                  Realize Your Miners&rsquo; True Potential
                </motion.h1>

                <div className="spacer-small" />

                <motion.p
                  variants={hero.chVariants}
                  className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/70"
                >
                  More performance. Less power. Innovative auto-tuning. Bitmern
                  is an authorized deployment partner for Marathon Digital&rsquo;s
                  MARAFW — the firmware that sets MARA apart. Now available for
                  your fleet.
                </motion.p>

                <div className="spacer-medium" />

                <motion.div
                  variants={hero.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <Link href="/contact">Get MARAFW on Your Miners</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a href="#compatible-hardware">View Compatible Hardware</a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Core Features                                                     */}
      {/* ----------------------------------------------------------------- */}
      <section ref={core.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={core.cVariants}
                initial="hidden"
                animate={core.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={core.chVariants}
                  className="text-balance"
                >
                  Four Ways MARAFW Transforms Your Fleet
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={core.crdStagger}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  {CORE_FEATURES.map((f) => (
                    <motion.div
                      key={f.title}
                      variants={core.crdFade}
                      className="card-surface border border-border/60 rounded-lg p-6"
                    >
                      <f.Icon className="size-5 text-primary" />

                      <div className="spacer-xsmall" />

                      <h3 className="font-heading text-[1.44rem] font-normal uppercase leading-tight tracking-tight">
                        {f.title}
                      </h3>

                      <div className="spacer-xxsmall" />

                      <p className="text-sm leading-relaxed text-foreground/60">
                        {f.body}
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
      {/* Results                                                           */}
      {/* ----------------------------------------------------------------- */}
      <section ref={results.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={results.cVariants}
                initial="hidden"
                animate={results.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={results.chVariants}
                  className="text-balance"
                >
                  Proven Performance
                </motion.h2>

                <div className="spacer-large" />

                {/* Stats */}
                <motion.div
                  variants={results.crdStagger}
                  className="grid gap-6 lg:grid-cols-3"
                >
                  {STATS.map((stat) => (
                    <motion.div
                      key={stat.value}
                      variants={results.crdFade}
                      className="card-surface border border-border/60 rounded-lg p-6 text-center"
                    >
                      <p className="font-heading text-[2.986rem] font-normal uppercase leading-none tracking-tight text-primary">
                        {stat.value}
                      </p>
                      <div className="spacer-xxsmall" />
                      <p className="text-sm text-foreground/60">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="spacer-large" />

                {/* Testimonial */}
                <motion.blockquote
                  variants={results.chVariants}
                  className="rounded-lg border border-border/60 bg-secondary/30 p-8 lg:p-12"
                >
                  <p className="text-lg leading-relaxed text-foreground/80 italic">
                    &ldquo;Deploying MARAFW across our 15MW S19j Pro fleet
                    yielded outstanding results: up to 35% overclocking, 99%
                    uptime, and industry-leading efficiency at 25-29W/TH.&rdquo;
                  </p>
                  <div className="spacer-small" />
                  <footer className="text-sm">
                    <span className="font-medium">Abdulrahman Hamdy</span>
                    <span className="text-foreground/50">
                      {" "}
                      — Head of Technology at Zero Two
                    </span>
                  </footer>
                </motion.blockquote>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Compatible Hardware                                               */}
      {/* ----------------------------------------------------------------- */}
      <section ref={compatible.ref} id="compatible-hardware" className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={compatible.cVariants}
                initial="hidden"
                animate={compatible.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={compatible.chVariants}
                  className="text-balance"
                >
                  Supported Miners
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={compatible.chVariants}
                  className="flex flex-wrap gap-3"
                >
                  {COMPATIBLE_MINERS.map((miner) => (
                    <Tag key={miner} variant="muted" size="sm">
                      {miner}
                    </Tag>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Dashboard Capabilities                                            */}
      {/* ----------------------------------------------------------------- */}
      <section ref={dashboard.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={dashboard.cVariants}
                initial="hidden"
                animate={dashboard.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={dashboard.chVariants}
                  className="text-balance"
                >
                  Full Control from the Dashboard
                </motion.h2>

                <div className="spacer-large" />

                <motion.ol
                  variants={dashboard.crdStagger}
                  className="space-y-4"
                >
                  {DASHBOARD_FEATURES.map((f, i) => (
                    <motion.li
                      key={f.title}
                      variants={dashboard.crdFade}
                      className="card-surface flex gap-4 border border-border/60 rounded-lg p-6"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-sm font-medium text-primary">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-heading text-[1.2rem] font-normal uppercase leading-tight tracking-tight">
                          {f.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                          {f.body}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ol>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Installation                                                      */}
      {/* ----------------------------------------------------------------- */}
      <section ref={install.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={install.cVariants}
                initial="hidden"
                animate={install.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={install.chVariants}
                  className="text-balance"
                >
                  Two Ways to Deploy
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={install.crdStagger}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  {INSTALLATION_METHODS.map((method) => (
                    <motion.div
                      key={method.title}
                      variants={install.crdFade}
                      className="card-surface border border-border/60 rounded-lg p-6"
                    >
                      <method.Icon className="size-5 text-primary" />

                      <div className="spacer-xsmall" />

                      <h3 className="font-heading text-[1.44rem] font-normal uppercase leading-tight tracking-tight">
                        {method.title}
                      </h3>

                      <div className="spacer-xxsmall" />

                      <p className="text-sm leading-relaxed text-foreground/60">
                        {method.body}
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
      {/* UCB 2100                                                          */}
      {/* ----------------------------------------------------------------- */}
      <section ref={ucb.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={ucb.cVariants}
                initial="hidden"
                animate={ucb.inView ? "visible" : "hidden"}
                className="card-surface rounded-lg border border-border/60 p-8 lg:p-12"
              >
                <motion.h2
                  variants={ucb.chVariants}
                  className="text-balance"
                >
                  Hardware Upgrade: UCB 2100
                </motion.h2>

                <div className="spacer-small" />

                <motion.p
                  variants={ucb.chVariants}
                  className="max-w-2xl text-base leading-relaxed text-foreground/60"
                >
                  For maximum MARAFW performance, the MARA UCB 2100 replacement
                  control board comes pre-loaded with proprietary firmware.
                  Drop-in compatible with Bitmain Antminers.
                </motion.p>

                <div className="spacer-medium" />

                <motion.ul
                  variants={ucb.crdStagger}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {UCB_FEATURES.map((feature) => (
                    <motion.li
                      key={feature}
                      variants={ucb.crdFade}
                      className="flex items-start gap-2 text-sm text-foreground/70"
                    >
                      <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA                                                        */}
      {/* ----------------------------------------------------------------- */}
      <section ref={cta.ref} className="section-elevated">
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
                  Upgrade Your Fleet Today
                </motion.h2>

                <div className="spacer-small" />

                <motion.p
                  variants={cta.chVariants}
                  className="text-base leading-relaxed text-foreground/70"
                >
                  Whether you&apos;re hosted with Bitmern or running your own
                  facility, MARAFW can optimize your miners. Contact us to get
                  started.
                </motion.p>

                <div className="spacer-medium" />

                <motion.div
                  variants={cta.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <Link href="/contact">Get MARAFW on Your Miners</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/technology">Explore Our Technology</Link>
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
