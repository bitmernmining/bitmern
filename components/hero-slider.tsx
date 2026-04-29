"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/contact"

// --- Slide data (full Webflow copy) ---
const SLIDES = [
  {
    tag: "Institutional Mining Infrastructure",
    headline: "Bitcoin Mining Infrastructure for Serious Capital",
    body: "Mining infrastructure built for investors who expect more than a rack and a handshake. Transparent operations, institutional-grade reporting, and a leadership team with deep Bitcoin expertise and a track record of delivering for serious capital.",
    primaryCta: { label: "Get Started", href: "/contact" },
    secondaryCta: { label: "Explore Facilities", href: "/facilities" },
  },
  {
    tag: "Global Colocation Infrastructure",
    headline: "Your Hardware, Our Facilities, Industry-Leading Uptime",
    body: "Deploy your ASICs at our global facilities with sub-$0.06/kWh power, 97% uptime guarantees, and real-time monitoring through our SuperApp dashboard. You retain full ownership while we handle power, cooling, maintenance, and security.",
    primaryCta: { label: "View Hosting Plans", href: "/hosting" },
    secondaryCta: { label: "Tour Our Facilities", href: "/facilities" },
  },
  {
    tag: "Solo Mining Pool",
    headline: "Keep the Entire Block Reward to Yourself",
    body: "Connect your ASIC to Bitmern Solo and mine Bitcoin, Litecoin, Dogecoin, Bitcoin Cash, or DigiByte with a flat 1% fee. No shared payouts, no middlemen — just real-time monitoring, instant alerts, and direct wallet payouts on 99.9% uptime infrastructure.",
    primaryCta: { label: "Start Solo Mining", href: CONTACT.solo, external: true },
    secondaryCta: { label: "See How It Works", href: CONTACT.solo, external: true },
  },
  {
    tag: "Direct Manufacturer Access",
    headline: "Source ASIC Miners at Institutional Pricing",
    body: "Leverage our direct relationships with Bitmain, MicroBT, and Canaan for priority allocation and volume pricing on the latest-generation miners. We handle logistics, import, and deployment at our facilities or yours.",
    primaryCta: { label: "Shop Miners", href: CONTACT.shop, external: true },
    secondaryCta: { label: "Browse Hardware", href: "/hardware" },
  },
] as const

const FILL_DURATION = 5200
const HOLD_DURATION = 800   // Webflow-matched pause
const TOTAL_DURATION = FILL_DURATION + HOLD_DURATION
const TRANSITION_EASE = [0.25, 0.1, 0.25, 1] as const

function easeInOut(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const containerVariants = {
  enter: {
    transition: { staggerChildren: 0.1, delayChildren: 0.35 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const childVariants = {
  initial: { opacity: 0, y: 24 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.45, ease: TRANSITION_EASE },
  },
}

// Reduced-motion variants — instant, no movement
const reducedContainerVariants = {
  enter: { transition: { staggerChildren: 0 } },
  exit: { transition: { staggerChildren: 0 } },
}

const reducedChildVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

export function HeroSlider() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReduced = useReducedMotion()
  const startRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const tagRef = useRef<HTMLSpanElement>(null)
  const pausedRef = useRef(paused)
  const visibleRef = useRef(true)

  // Keep ref in sync
  useEffect(() => { pausedRef.current = paused }, [paused])

  const goTo = useCallback((index: number) => {
    setActive(((index % SLIDES.length) + SLIDES.length) % SLIDES.length)
    if (tagRef.current) tagRef.current.style.setProperty("--fill", "0")
    startRef.current = performance.now()
  }, [])

  // Keyboard navigation — scoped to carousel container, not window
  const carouselRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1) }
      else if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1) }
    }
    el.addEventListener("keydown", onKey)
    return () => el.removeEventListener("keydown", onKey)
  }, [active, goTo])

  // rAF-driven progress via CSS custom property (no React re-render per frame)
  const tick = useCallback((now: number) => {
    // When paused or not visible, stop the loop — IO/handleResume restarts it
    if (pausedRef.current || !visibleRef.current) {
      rafRef.current = 0
      return
    }

    const elapsed = now - startRef.current
    const linearFill = Math.min(elapsed / FILL_DURATION, 1)
    const fill = easeInOut(linearFill)

    // Direct DOM update — avoids 60fps React re-renders
    if (tagRef.current) {
      tagRef.current.style.setProperty("--fill", String(fill * 100))
    }

    if (elapsed >= TOTAL_DURATION) {
      setActive((prev) => (prev + 1) % SLIDES.length)
      startRef.current = now
      if (tagRef.current) tagRef.current.style.setProperty("--fill", "0")
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  // Pause handling — stops rAF loop, resume restarts it with corrected timing
  const pauseTimeRef = useRef<number>(0)
  const handlePause = useCallback(() => {
    setPaused(true)
    pausedRef.current = true
    pauseTimeRef.current = performance.now()
    // rAF loop will self-terminate on next frame via pausedRef check
  }, [])
  const handleResume = useCallback(() => {
    // Shift start forward by the time spent paused
    const pausedFor = performance.now() - pauseTimeRef.current
    startRef.current += pausedFor
    setPaused(false)
    pausedRef.current = false
    // Restart the loop (only if auto-advance is active)
    if (!rafRef.current && !prefersReduced) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [tick, prefersReduced])

  // Pause rAF when slider scrolls out of view
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && !pausedRef.current && !rafRef.current && !prefersReduced) {
          startRef.current = performance.now()
          rafRef.current = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [tick, prefersReduced])

  // Start auto-advance loop — skip entirely when reduced motion is preferred
  useEffect(() => {
    if (prefersReduced) return
    startRef.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [tick, prefersReduced])

  const slide = SLIDES[active]
  const cVariants = prefersReduced ? reducedContainerVariants : containerVariants
  const chVariants = prefersReduced ? reducedChildVariants : childVariants

  return (
    <div
      ref={carouselRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Services overview"
      tabIndex={0}
      className="relative flex min-h-[85svh] flex-col items-center justify-center px-4 outline-none sm:min-h-[100svh] sm:px-0"
    >
      {/* Chevron nav — left */}
      <button
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-1 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full p-2 sm:p-3 bg-background/60 backdrop-blur-sm border border-border/40 text-foreground/50 transition-all duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-background/90 hover:text-foreground hover:border-border/80 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
      >
        <ChevronLeft className="size-5 sm:size-7" />
      </button>

      {/* Chevron nav — right */}
      <button
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-1 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full p-2 sm:p-3 bg-background/60 backdrop-blur-sm border border-border/40 text-foreground/50 transition-all duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-background/90 hover:text-foreground hover:border-border/80 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
      >
        <ChevronRight className="size-5 sm:size-7" />
      </button>

      {/* Slide content — fixed height prevents layout shift on tab change */}
      <div
        className="max-width-large mx-auto flex min-h-[22rem] flex-col items-center justify-center text-align-center sm:min-h-[26rem]"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocusCapture={handlePause}
        onBlurCapture={handleResume}
      >
        {/* Live region for screen readers — outside AnimatePresence so it persists */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {active + 1} of {SLIDES.length}: {SLIDES[active].headline}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${active + 1} of ${SLIDES.length}`}
            variants={cVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex flex-col items-center"
          >
            {/* Tag — fill-up progress via CSS custom property */}
            <motion.div variants={chVariants}>
              <span
                ref={tagRef}
                className="hero-tag-fill inline-flex items-center justify-center whitespace-nowrap rounded-sm font-mono text-sm font-normal uppercase tracking-[-0.0625rem] select-none overflow-hidden backdrop-blur-[10px]"
                style={
                  { "--fill": "0", padding: "0.25rem 0.625rem" } as React.CSSProperties
                }
              >
                {slide.tag}
              </span>
            </motion.div>

            <div className="spacer-small" />

            <motion.h1 variants={chVariants} className="is-hero text-balance">
              {slide.headline}
            </motion.h1>

            <div className="spacer-small" />

            <motion.p
              variants={chVariants}
              className="max-width-medium align-center text-lg leading-relaxed"
            >
              {slide.body}
            </motion.p>

            <div className="spacer-medium" />

            <motion.div
              variants={chVariants}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button size="lg" asChild>
                {"external" in slide.primaryCta && slide.primaryCta.external ? (
                  <a href={slide.primaryCta.href} target="_blank" rel="noopener noreferrer">{slide.primaryCta.label}</a>
                ) : (
                  <Link href={slide.primaryCta.href}>{slide.primaryCta.label}</Link>
                )}
              </Button>
              <Button variant="secondary" size="lg" asChild>
                {"external" in slide.secondaryCta && slide.secondaryCta.external ? (
                  <a href={slide.secondaryCta.href} target="_blank" rel="noopener noreferrer">{slide.secondaryCta.label}</a>
                ) : (
                  <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="spacer-medium" />
        <div className="flex items-center justify-center gap-1">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "step" : undefined}
              className="flex items-center justify-center p-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
            >
              <span
                className={[
                  "block rounded-full",
                  "transition-all duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                  i === active
                    ? "w-6 h-2 bg-primary"
                    : "size-2 bg-foreground/30 hover:bg-foreground/50",
                ].join(" ")}
              />
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
