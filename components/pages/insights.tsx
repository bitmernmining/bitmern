"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Mail, CheckCircle2, Youtube } from "lucide-react"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/ui/video-card"
import { SectionCTA } from "@/components/ui/section-cta"
import { useSection } from "@/lib/motion"

type NewsletterState = "idle" | "submitting" | "success" | "error"

// ---------------------------------------------------------------------------
// YouTube videos
// ---------------------------------------------------------------------------

const YOUTUBE_CHANNEL = "https://www.youtube.com/@BitmernMining"

interface Video {
  title: string
  thumbnail: string
}

const VIDEOS: Video[] = [
  {
    title: "Bitcoin Mining Facility Tour",
    thumbnail: "/content/yt-facility-tour.jpg",
  },
  {
    title: "Blockchain Life Forum 2025 Dubai",
    thumbnail: "/content/yt-blockchain-life.jpg",
  },
  {
    title: "Best Bitcoin Miners 2025-2026",
    thumbnail: "/content/yt-best-miners.jpg",
  },
  {
    title: "Buying & Selling Used Miners",
    thumbnail: "/content/yt-used-miners.jpg",
  },
  {
    title: "Proto RIG Miner Overview",
    thumbnail: "/content/yt-proto-rig.jpg",
  },
  {
    title: "Mining Profitability Analysis",
    thumbnail: "/content/yt-profitability.jpg",
  },
  {
    title: "Bitcoin Mining Secrets",
    thumbnail: "/content/yt-bitcoin-secrets.avif",
  },
  {
    title: "$100K Mining Investment Results",
    thumbnail: "/content/yt-100k-results.avif",
  },
  {
    title: "Profitable Bitcoin Mining Guide",
    thumbnail: "/content/yt-profitable-mining.avif",
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InsightsPage() {
  const hero = useSection()
  const newsletter = useSection()
  const videos = useSection(0.15)
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Newsletter CTA — prominent, near hero */}
      {/* ----------------------------------------------------------------- */}
      <section className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={newsletter.ref}>
              <motion.div
                variants={newsletter.cVariants}
                initial="hidden"
                animate={newsletter.inView ? "visible" : "hidden"}
                className="mx-auto max-w-xl text-center"
              >
                <motion.div variants={newsletter.chVariants} className="mb-4">
                  <Mail
                    className="mx-auto size-10 text-primary"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <motion.h2 variants={newsletter.chVariants}>
                  Stay Updated
                </motion.h2>
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
                      <CheckCircle2
                        className="size-8 text-primary"
                        strokeWidth={1.5}
                      />
                      <p className="text-base font-medium">
                        You&rsquo;re subscribed!
                      </p>
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
                          {nlState === "submitting"
                            ? "Subscribing..."
                            : "Subscribe"}
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
      {/* Video Grid */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={videos.ref}>
              <motion.div
                variants={videos.cVariants}
                initial="hidden"
                animate={videos.inView ? "visible" : "hidden"}
                className="mb-10"
              >
                <motion.div
                  variants={videos.chVariants}
                  className="flex items-center gap-3"
                >
                  <Youtube
                    className="size-6 text-primary"
                    strokeWidth={1.5}
                  />
                  <h2>Latest Videos</h2>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.p
                  variants={videos.chVariants}
                  className="text-foreground/60"
                >
                  Deep dives, facility tours, and hardware reviews from the
                  Bitmern YouTube channel.
                </motion.p>
              </motion.div>

              <motion.div
                variants={videos.crdStagger}
                initial="hidden"
                animate={videos.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {VIDEOS.map((video) => (
                  <motion.div key={video.title} variants={videos.crdFade}>
                    <VideoCard
                      thumbnail={video.thumbnail}
                      title={video.title}
                      href={YOUTUBE_CHANNEL}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-8 text-center">
                <Button variant="secondary" size="lg" asChild>
                  <a
                    href={YOUTUBE_CHANNEL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View All on YouTube &rarr;
                  </a>
                </Button>
              </div>
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

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* ----------------------------------------------------------------- */}
      <SectionCTA
        variant="dark"
        heading="Start Mining With Bitmern"
        description="Whether you're looking for hosting, hardware, or expert guidance — we're here to help you mine smarter."
        primaryCTA={{ label: "Get Started", href: "/contact" }}
        secondaryCTA={{ label: "Explore Solutions", href: "/hosting" }}
      />
    </>
  )
}
