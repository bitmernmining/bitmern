"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Mail, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { useSection } from "@/lib/motion"

type NewsletterState = "idle" | "submitting" | "success" | "error"

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

const CATEGORIES = [
  "All",
  "Bitcoin Mining",
  "Hardware Reviews",
  "Strategy",
  "Market Analysis",
  "Guides",
]

// ---------------------------------------------------------------------------
// Articles — from blog + shop blog
// ---------------------------------------------------------------------------

interface Article {
  title: string
  category: string
  readTime: string
}

const ARTICLES: Article[] = [
  // Main blog
  {
    title: "Energy Rich Nations Bitcoin Mining Capacity",
    category: "Bitcoin Mining",
    readTime: "5 min",
  },
  {
    title: "Bitcoin Difficulty Adjustment Equilibrium",
    category: "Bitcoin Mining",
    readTime: "5 min",
  },
  {
    title: "Bitcoin Mining ROI Cycle",
    category: "Bitcoin Mining",
    readTime: "5 min",
  },
  {
    title: "Transmission Bottlenecks Bitcoin Mining",
    category: "Bitcoin Mining",
    readTime: "5 min",
  },
  {
    title: "Power Market Bitcoin Mining",
    category: "Bitcoin Mining",
    readTime: "6 min",
  },
  {
    title: "Anti-Hype Bitcoin Mining",
    category: "Bitcoin Mining",
    readTime: "6 min",
  },
  {
    title: "Mining Operations Aging",
    category: "Bitcoin Mining",
    readTime: "5 min",
  },
  {
    title: "Bitmern Solo Pool Now Live",
    category: "Bitcoin Mining",
    readTime: "8 min",
  },
  // Shop blog (hardware-focused)
  {
    title: "Bitcoin Mining in 2026: The Complete Beginners Guide",
    category: "Guides",
    readTime: "10 min",
  },
  {
    title: "Antminer S21 vs S19: Which Should You Buy",
    category: "Hardware Reviews",
    readTime: "7 min",
  },
  {
    title: "Which Bitcoin Miner Should You Buy in 2026",
    category: "Hardware Reviews",
    readTime: "8 min",
  },
  {
    title: "Best Solo Bitcoin Miners",
    category: "Hardware Reviews",
    readTime: "6 min",
  },
  {
    title: "Bitmain Antminer S21 vs S21 Pro: What\u2019s the Difference",
    category: "Hardware Reviews",
    readTime: "6 min",
  },
  {
    title: "Hydro Miners Explained",
    category: "Guides",
    readTime: "7 min",
  },
  {
    title: "ASIC Miners Profitability and Value",
    category: "Strategy",
    readTime: "6 min",
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InsightsPage() {
  const hero = useSection()
  const categories = useSection()
  const articles = useSection(0.15)
  const newsletter = useSection()
  const ebook = useSection()

  const [nlState, setNlState] = useState<NewsletterState>("idle")

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setNlState("submitting")

    const fd = new FormData(e.currentTarget)
    const email = fd.get("email") as string

    try {
      // TODO: Replace with real newsletter API (e.g. Mailchimp, ConvertKit, Loops)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[insights newsletter] subscribed:", email)
      setNlState("success")
    } catch {
      setNlState("error")
    }
  }

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
                className="max-w-3xl"
              >
                <motion.div variants={hero.chVariants}>
                  <Tag>Insights</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h1 variants={hero.chVariants}>
                  Mining Intelligence
                </motion.h1>
                <div className="spacer-small" />
                <motion.p
                  variants={hero.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Market analysis, hardware reviews, strategy guides, and
                  operational insights from the Bitmern team. Stay ahead of the
                  curve.
                </motion.p>
                <div className="spacer-small" />
                <motion.div
                  variants={hero.chVariants}
                  className="inline-flex items-center gap-2.5 rounded-md border border-primary/30 bg-primary/[0.06] px-4 py-2.5"
                >
                  <Clock className="size-4 text-primary shrink-0" strokeWidth={1.5} />
                  <p className="text-sm text-foreground/70">
                    Our insights hub is launching soon. Subscribe below to get notified.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Category Filter Chips */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-small">
            <div ref={categories.ref}>
              <motion.div
                variants={categories.cVariants}
                initial="hidden"
                animate={categories.inView ? "visible" : "hidden"}
                className="flex flex-wrap gap-2"
              >
                {CATEGORIES.map((category, i) => (
                  <motion.div key={category} variants={categories.chVariants}>
                    <Tag variant={i === 0 ? "primary" : "muted"}>
                      {category}
                    </Tag>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Article Grid */}
      {/* ----------------------------------------------------------------- */}
      <section className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={articles.ref}>
              <motion.div
                variants={articles.crdStagger}
                initial="hidden"
                animate={articles.inView ? "visible" : "hidden"}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {ARTICLES.map((article) => (
                  <motion.div
                    key={article.title}
                    variants={articles.crdFade}
                    className="card-surface relative flex flex-col gap-3 rounded-lg border border-border/60 p-6"
                  >
                    <div className="flex items-center gap-2">
                      <Tag variant="muted" size="sm">
                        {article.category}
                      </Tag>
                      <Tag variant="primary" size="sm">
                        Coming Soon
                      </Tag>
                    </div>
                    <h5 className="font-heading text-[1.1rem] font-normal uppercase leading-tight tracking-tight">
                      {article.title}
                    </h5>
                    <span className="mt-auto font-mono text-xs text-foreground/40">
                      {article.readTime} read
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Newsletter CTA */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={newsletter.ref}>
              <motion.div
                variants={newsletter.cVariants}
                initial="hidden"
                animate={newsletter.inView ? "visible" : "hidden"}
                className="mx-auto max-w-xl text-center"
              >
                <motion.h2 variants={newsletter.chVariants}>Stay Updated</motion.h2>
                <div className="spacer-small" />
                <motion.p
                  variants={newsletter.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  Subscribe for weekly mining insights, market analysis, and
                  Bitmern news. No spam &mdash; just signal.
                </motion.p>
                <div className="spacer-medium" />

                <AnimatePresence mode="wait">
                  {nlState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <CheckCircle2 className="size-8 text-primary" strokeWidth={1.5} />
                      <p className="text-base font-medium">You&rsquo;re subscribed!</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.form
                        variants={newsletter.chVariants}
                        onSubmit={handleNewsletterSubmit}
                        className="flex gap-3"
                      >
                        <input
                          type="email"
                          name="email"
                          required
                          aria-label="Email address"
                          autoComplete="email"
                          placeholder="Enter your email"
                          disabled={nlState === "submitting"}
                          className="h-11 w-full rounded-md border border-border/60 bg-transparent px-4 text-sm placeholder:text-foreground/40 focus:border-primary outline-none transition-colors duration-200 disabled:opacity-50"
                        />
                        <Button
                          type="submit"
                          size="lg"
                          className="shrink-0"
                          isLoading={nlState === "submitting"}
                          disabled={nlState === "submitting"}
                        >
                          {nlState === "submitting" ? "Subscribing..." : "Subscribe"}
                        </Button>
                      </motion.form>
                      {nlState === "error" && (
                        <p className="mt-3 text-sm text-destructive">
                          Something went wrong. Please try again.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* eBook CTA */}
      {/* ----------------------------------------------------------------- */}
      <section className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large" ref={ebook.ref}>
              <motion.div
                variants={ebook.cVariants}
                initial="hidden"
                animate={ebook.inView ? "visible" : "hidden"}
                className="rounded-lg border border-primary/30 bg-primary/[0.04] p-8 lg:p-12"
              >
                <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                  <div>
                    <motion.div variants={ebook.chVariants} className="mb-4">
                      <BookOpen
                        className="size-10 text-primary"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <motion.h2 variants={ebook.chVariants}>
                      Coming Soon: The Modern Guide to Bitcoin Mining
                    </motion.h2>
                    <div className="spacer-small" />
                    <motion.p
                      variants={ebook.chVariants}
                      className="max-w-2xl text-[1.125rem] leading-relaxed text-foreground/70"
                    >
                      Opportunities, profits, and innovations. Learn the 3 key
                      factors that determine mining profitability, how to access
                      ultra-low-cost energy, which miners deliver the best ROI,
                      and real investor case studies.
                    </motion.p>
                    <div className="spacer-xsmall" />
                    <motion.p
                      variants={ebook.chVariants}
                      className="font-mono text-sm text-foreground/50"
                    >
                      By Giannis Andreou, Founder &amp; CEO
                    </motion.p>
                  </div>
                  <motion.div variants={ebook.chVariants}>
                    <Button size="lg" asChild>
                      <Link href="/contact">
                        <Mail className="size-4" strokeWidth={1.5} />
                        Get Notified When Available
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
