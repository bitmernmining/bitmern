"use client"

import { useRef, useState, useEffect } from "react"
import { useInView, useReducedMotion } from "framer-motion"

// ---------------------------------------------------------------------------
// Shared animation variants — single source of truth
// ---------------------------------------------------------------------------

export const EASE = [0.25, 0.1, 0.25, 1] as const

/** Stagger container — staggers children 120ms apart, 100ms initial delay */
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

/** Fade-up item — slides up 24px over 700ms */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/** Reduced-motion stagger — no stagger delay */
export const reducedStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
}

/** Reduced-motion fade — instant opacity, no transform */
export const reducedFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

/** Card stagger — slightly delayed vs section stagger for orchestration */
export const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

/** Card fade — shorter travel (16px), faster (550ms) */
export const cardFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// ---------------------------------------------------------------------------
// Stiff spring — responsive, no overshoot. For buttons, cards, interactive.
// ---------------------------------------------------------------------------

export const springTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 1,
}

// ---------------------------------------------------------------------------
// useSection — animated section hook with reduced-motion support
// ---------------------------------------------------------------------------

export function useSection<T extends HTMLElement = HTMLDivElement>(amount = 0.2) {
  const ref = useRef<T>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(ref, { once: true, amount })
  const cVariants = prefersReduced ? reducedStagger : staggerContainer
  const chVariants = prefersReduced ? reducedFade : fadeUp
  const crdStagger = prefersReduced ? reducedStagger : cardStagger
  const crdFade = prefersReduced ? reducedFade : cardFade
  return { ref, inView, cVariants, chVariants, crdStagger, crdFade }
}

// ---------------------------------------------------------------------------
// useCountUp — scroll-triggered count-up animation
// ---------------------------------------------------------------------------

/**
 * Scroll-triggered count-up animation.
 * Returns a ref (attach to the element), a display string that animates
 * from 0 to `end` when the element scrolls into view, and the inView flag.
 */
export function useCountUp(
  end: number,
  opts?: {
    duration?: number
    suffix?: string
    prefix?: string
    decimals?: number
  },
) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(opts?.prefix ?? "")

  useEffect(() => {
    if (!inView) return

    const decimals = opts?.decimals ?? 0
    const prefix = opts?.prefix ?? ""
    const suffix = opts?.suffix ?? ""

    // Reduced motion — jump straight to final value
    if (prefersReduced) {
      setDisplay(`${prefix}${end.toFixed(decimals)}${suffix}`)
      return
    }

    const duration = opts?.duration ?? 2000
    const start = performance.now()
    let rafId = 0

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * end
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => { if (rafId) cancelAnimationFrame(rafId) }
  }, [inView, end, prefersReduced, opts?.duration, opts?.suffix, opts?.prefix, opts?.decimals])

  return { ref, display, inView }
}
