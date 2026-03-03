"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Bell,
  SlidersHorizontal,
  Wallet,
  Code,
  Server,
  ArrowRight,
} from "lucide-react"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STEPS = [
  {
    step: "01",
    title: "Create Your Account",
    body: "Sign up with just an email address. No KYC, no verification delays. Add a wallet address for each coin you plan to mine.",
    code: null,
  },
  {
    step: "02",
    title: "Configure Your Miner",
    body: "Point your ASIC at the stratum endpoint for your coin. Use your wallet address as the username. VarDiff handles the rest.",
    code: `stratum+tcp://btc.bitmernsolo.com:3102\n-u YOUR_WALLET.worker1 -p x`,
  },
  {
    step: "03",
    title: "Watch It Work",
    body: "Track your hashrate, workers, and block effort in real time. When you find a block, 99% of the reward goes directly to your wallet.",
    code: null,
  },
]

const COINS = [
  { coin: "Bitcoin (BTC)", algorithm: "SHA-256", reward: "3.125 BTC", time: "~10 min" },
  { coin: "Litecoin (LTC)", algorithm: "Scrypt", reward: "6.25 LTC", time: "~2.5 min" },
  { coin: "Dogecoin (DOGE)", algorithm: "Scrypt", reward: "10,000 DOGE", time: "~1 min" },
  { coin: "Bitcoin Cash (BCH)", algorithm: "SHA-256", reward: "3.125 BCH", time: "~10 min" },
  { coin: "DigiByte (DGB)", algorithm: "SHA-256", reward: "665 DGB", time: "~15 sec" },
]

const FEATURES = [
  {
    title: "Real-Time Monitoring",
    body: "Live hashrate, workers, shares, and effort — no refreshing needed. Dashboard updates every 10 seconds.",
    Icon: Activity,
  },
  {
    title: "Instant Alerts",
    body: "Email notifications for worker offline, hashrate drops, and payout confirmations. Configurable thresholds.",
    Icon: Bell,
  },
  {
    title: "Smart Difficulty (VarDiff)",
    body: "Automatically matches difficulty to your hashrate. Multiple ports per coin for optimal share submission.",
    Icon: SlidersHorizontal,
  },
  {
    title: "Direct Wallet Payouts",
    body: "Block rewards sent straight to your wallet. Nothing held on our side. No minimum payout threshold.",
    Icon: Wallet,
  },
  {
    title: "Open API",
    body: "Full REST API for pool stats, miner performance, payment history, and earnings data.",
    Icon: Code,
  },
  {
    title: "Enterprise Infrastructure",
    body: "99.9% uptime, DDoS protection, Dallas TX datacenter, Vercel edge delivery. Built on Miningcore.",
    Icon: Server,
  },
]

const PAYOUT_EXAMPLES = [
  { coin: "BTC", reward: "3.125", fee: "0.031", receive: "3.094" },
  { coin: "LTC", reward: "6.25", fee: "0.063", receive: "6.188" },
  { coin: "DOGE", reward: "10,000", fee: "100", receive: "9,900" },
]

const COMPARISON = [
  {
    feature: "Block Reward",
    solo: "100% to finder (minus 1%)",
    shared: "Split among all miners",
  },
  {
    feature: "Fee",
    solo: "1% on blocks found",
    shared: "2-3% on every payout",
  },
  {
    feature: "Payout",
    solo: "Only when you find a block",
    shared: "Regular, small amounts",
  },
  {
    feature: "Best For",
    solo: "Miners with enough hashrate to absorb variance",
    shared: "Small miners needing consistency",
  },
  {
    feature: "Privacy",
    solo: "Your blocks, no shared data",
    shared: "Pool sees all contributions",
  },
]

const RECOMMENDED_HARDWARE = [
  {
    title: "Flagship ASICs",
    subtitle: "Maximum block-finding probability",
    miners: "Antminer S21 Pro (234 TH/s), Whatsminer M66S (298 TH/s), Antminer L9 (16 GH/s)",
  },
  {
    title: "Mid-Range",
    subtitle: "Best value for dedicated solo miners",
    miners: "Antminer S19K Pro (120 TH/s), Antminer L7 (9.5 GH/s)",
  },
  {
    title: "Home & Solo Miners",
    subtitle: "Affordable entry into solo mining",
    miners: "Bitaxe (1.2 TH/s), Bitaxe Hex (3.6 TH/s), Goldshell Mini-Doge III (800 MH/s)",
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SoloPoolPage() {
  const hero = useSection()
  const steps = useSection()
  const coins = useSection()
  const features = useSection()
  const pricing = useSection()
  const comparison = useSection()
  const hardware = useSection()
  const hosting = useSection()
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
                  <Tag>Solo Mining Pool</Tag>
                </motion.div>

                <div className="spacer-xsmall" />

                <motion.h1
                  variants={hero.chVariants}
                  className="text-balance"
                >
                  Keep the Entire Block Reward to Yourself
                </motion.h1>

                <div className="spacer-small" />

                <motion.p
                  variants={hero.chVariants}
                  className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/70"
                >
                  Mine Bitcoin, Litecoin, Dogecoin, Bitcoin Cash, or DigiByte on
                  Bitmern Solo. Flat 1% fee, direct wallet payouts, no shared
                  rewards, no middlemen. 99.9% uptime on enterprise
                  infrastructure.
                </motion.p>

                <div className="spacer-medium" />

                <motion.div
                  variants={hero.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <a
                      href="https://bitmernsolo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Mining
                    </a>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a
                      href="https://bitmernsolo.com/pool-stats"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Pool Stats
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* How It Works                                                      */}
      {/* ----------------------------------------------------------------- */}
      <section ref={steps.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={steps.cVariants}
                initial="hidden"
                animate={steps.inView ? "visible" : "hidden"}
              >
                <motion.div variants={steps.chVariants}>
                  <Tag>Three Steps</Tag>
                </motion.div>

                <div className="spacer-xsmall" />

                <motion.h2
                  variants={steps.chVariants}
                  className="text-balance"
                >
                  From Signup to First Share in Minutes
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={steps.crdStagger}
                  className="grid gap-6 lg:grid-cols-3"
                >
                  {STEPS.map((s) => (
                    <motion.div
                      key={s.step}
                      variants={steps.crdFade}
                      className="card-surface border border-border/60 rounded-lg p-6"
                    >
                      <span className="mb-4 block font-mono text-4xl font-bold text-primary/30">
                        {s.step}
                      </span>

                      <h3 className="font-heading text-[1.44rem] font-normal uppercase leading-tight tracking-tight">
                        {s.title}
                      </h3>

                      <div className="spacer-xsmall" />

                      <p className="text-sm leading-relaxed text-foreground/60">
                        {s.body}
                      </p>

                      {s.code && (
                        <>
                          <div className="spacer-xsmall" />
                          <pre className="font-mono text-sm bg-secondary/50 rounded-md px-4 py-3 overflow-x-auto text-foreground/80">
                            {s.code}
                          </pre>
                        </>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Supported Coins                                                   */}
      {/* ----------------------------------------------------------------- */}
      <section ref={coins.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={coins.cVariants}
                initial="hidden"
                animate={coins.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={coins.chVariants}
                  className="text-balance"
                >
                  Five Coins, One Account
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={coins.chVariants}
                  className="card-surface overflow-x-auto rounded-lg border border-border/60"
                >
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="border-b border-border/60 bg-foreground/[0.03]">
                        <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                          Coin
                        </th>
                        <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                          Algorithm
                        </th>
                        <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                          Block Reward
                        </th>
                        <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                          Block Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COINS.map((c) => (
                        <tr
                          key={c.coin}
                          className="border-b border-border/30 last:border-0"
                        >
                          <td className="px-6 py-4 text-sm font-medium">
                            {c.coin}
                          </td>
                          <td className="px-6 py-4 font-mono text-sm text-foreground/60">
                            {c.algorithm}
                          </td>
                          <td className="px-6 py-4 font-mono text-sm text-foreground/60">
                            {c.reward}
                          </td>
                          <td className="px-6 py-4 font-mono text-sm text-foreground/60">
                            {c.time}
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
      {/* Features                                                          */}
      {/* ----------------------------------------------------------------- */}
      <section ref={features.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={features.cVariants}
                initial="hidden"
                animate={features.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={features.chVariants}
                  className="text-balance"
                >
                  Built for Serious Miners
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={features.crdStagger}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {FEATURES.map((f) => (
                    <motion.div
                      key={f.title}
                      variants={features.crdFade}
                      className="card-surface border border-border/60 rounded-lg p-6"
                    >
                      <f.Icon className="size-5 text-primary" />

                      <div className="spacer-xsmall" />

                      <h3 className="font-heading text-[1.2rem] font-normal uppercase leading-tight tracking-tight">
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
      {/* Mid-page CTA                                                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="padding-global">
        <div className="container-large text-center py-16">
          <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
          <Button asChild size="lg"><a href="https://bitmernsolo.com" target="_blank" rel="noopener noreferrer">Start Mining</a></Button>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Pricing                                                           */}
      {/* ----------------------------------------------------------------- */}
      <section ref={pricing.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={pricing.cVariants}
                initial="hidden"
                animate={pricing.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={pricing.chVariants}
                  className="text-balance"
                >
                  Simple, Transparent Pricing
                </motion.h2>

                <div className="spacer-xsmall" />

                <motion.p
                  variants={pricing.chVariants}
                  className="max-w-xl text-base leading-relaxed text-foreground/60"
                >
                  One flat fee on block rewards. No subscriptions, no tiers, no
                  surprises.
                </motion.p>

                <div className="spacer-large" />

                <motion.div
                  variants={pricing.chVariants}
                  className="rounded-lg border border-primary/30 bg-primary/5 p-8 text-center lg:p-12"
                >
                  <p className="font-heading text-[2.986rem] font-normal uppercase leading-none tracking-tight text-primary lg:text-[4.209rem]">
                    1%
                  </p>
                  <div className="spacer-xxsmall" />
                  <p className="text-lg font-medium">
                    on block rewards. You keep 99%.
                  </p>
                  <p className="mt-1 text-sm text-foreground/50">
                    No block = no fee.
                  </p>
                </motion.div>

                <div className="spacer-large" />

                {/* Payout examples table */}
                <motion.div variants={pricing.chVariants}>
                  <h3 className="font-heading text-[1.2rem] font-normal uppercase leading-tight tracking-tight">
                    Payout Examples
                  </h3>

                  <div className="spacer-small" />

                  <div className="card-surface overflow-x-auto rounded-lg border border-border/60">
                    <table className="w-full min-w-[480px] text-left">
                      <thead>
                        <tr className="border-b border-border/60 bg-foreground/[0.03]">
                          <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                            Coin
                          </th>
                          <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                            Block Reward
                          </th>
                          <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                            Fee (1%)
                          </th>
                          <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                            You Receive
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {PAYOUT_EXAMPLES.map((p) => (
                          <tr
                            key={p.coin}
                            className="border-b border-border/30 last:border-0"
                          >
                            <td className="px-6 py-4 text-sm font-medium">
                              {p.coin}
                            </td>
                            <td className="px-6 py-4 font-mono text-sm text-foreground/60">
                              {p.reward}
                            </td>
                            <td className="px-6 py-4 font-mono text-sm text-foreground/60">
                              {p.fee}
                            </td>
                            <td className="px-6 py-4 font-mono text-sm font-medium text-primary">
                              {p.receive}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <div className="spacer-small" />

                <motion.p
                  variants={pricing.chVariants}
                  className="text-sm text-foreground/50"
                >
                  <span className="font-medium text-foreground/70">
                    Included free:
                  </span>{" "}
                  Account, dashboard, alerts, API, calculator, earnings history,
                  coin switching.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Solo vs Shared                                                    */}
      {/* ----------------------------------------------------------------- */}
      <section ref={comparison.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={comparison.cVariants}
                initial="hidden"
                animate={comparison.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={comparison.chVariants}
                  className="text-balance"
                >
                  Why Mine Solo?
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={comparison.chVariants}
                  className="card-surface overflow-x-auto rounded-lg border border-border/60"
                >
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="border-b border-border/60 bg-foreground/[0.03]">
                        <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                          Feature
                        </th>
                        <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-primary">
                          Bitmern Solo
                        </th>
                        <th className="px-6 py-4 font-mono text-xs uppercase tracking-wide text-foreground/40">
                          Shared Pools
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.map((row) => (
                        <tr
                          key={row.feature}
                          className="border-b border-border/30 last:border-0"
                        >
                          <td className="px-6 py-4 text-sm font-medium">
                            {row.feature}
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground/80">
                            {row.solo}
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground/50">
                            {row.shared}
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
      {/* Recommended Hardware                                              */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hardware.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hardware.cVariants}
                initial="hidden"
                animate={hardware.inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={hardware.chVariants}
                  className="text-balance"
                >
                  Recommended Miners for Solo Mining
                </motion.h2>

                <div className="spacer-large" />

                <motion.div
                  variants={hardware.crdStagger}
                  className="grid gap-6 lg:grid-cols-3"
                >
                  {RECOMMENDED_HARDWARE.map((hw) => (
                    <motion.div
                      key={hw.title}
                      variants={hardware.crdFade}
                      className="card-surface border border-border/60 rounded-lg p-6"
                    >
                      <h3 className="font-heading text-[1.44rem] font-normal uppercase leading-tight tracking-tight">
                        {hw.title}
                      </h3>
                      <p className="mt-1 text-sm text-foreground/50">
                        {hw.subtitle}
                      </p>

                      <div className="spacer-xsmall" />

                      <p className="text-sm leading-relaxed text-foreground/60">
                        {hw.miners}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="spacer-medium" />

                <motion.div variants={hardware.chVariants}>
                  <Button size="lg" asChild>
                    <a
                      href="https://shop.bitmernmining.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Shop Mining Hardware
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Hosting Integration                                               */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hosting.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hosting.cVariants}
                initial="hidden"
                animate={hosting.inView ? "visible" : "hidden"}
                className="card-surface rounded-lg border border-border/60 p-8 text-center lg:p-12"
              >
                <motion.h2
                  variants={hosting.chVariants}
                  className="text-balance"
                >
                  Need Hosting for Your ASICs?
                </motion.h2>

                <div className="spacer-small" />

                <motion.p
                  variants={hosting.chVariants}
                  className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/60"
                >
                  Bitmern Mining offers enterprise-grade colocation at
                  sub-$0.06/kWh. Deploy your miners at our facilities and point
                  them at Bitmern Solo — seamless integration, one ecosystem.
                </motion.p>

                <div className="spacer-medium" />

                <motion.div variants={hosting.chVariants}>
                  <Button size="lg" asChild>
                    <Link href="/hosting">
                      View Hosting Plans
                      <ArrowRight className="size-4" />
                    </Link>
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
                  Start Mining Solo Today
                </motion.h2>

                <div className="spacer-small" />

                <motion.p
                  variants={cta.chVariants}
                  className="text-base leading-relaxed text-foreground/70"
                >
                  Create a free account, point your miner at our stratum, and
                  start submitting shares in minutes.
                </motion.p>

                <div className="spacer-medium" />

                <motion.div
                  variants={cta.chVariants}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <Button size="lg" asChild>
                    <a
                      href="https://app.bitmernsolo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Create Free Account
                    </a>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <a
                      href="https://bitmernsolo.com/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read the Docs
                    </a>
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
