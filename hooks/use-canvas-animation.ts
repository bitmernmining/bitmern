"use client"

import { useRef, useEffect, useCallback } from "react"

export interface CanvasAnimationOptions {
  /** Called once on init and on every resize — set up state here */
  init: (ctx: CanvasRenderingContext2D, width: number, height: number) => void
  /** Called every frame — delta is ms since last frame */
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number, delta: number) => void
  /** Max device pixel ratio (default 2) */
  maxDpr?: number
}

/**
 * Manages a Canvas 2D animation loop with:
 * - requestAnimationFrame with delta-time
 * - DPR-aware sizing (clamped)
 * - ResizeObserver for container-fit
 * - Visibility API pause/resume
 * - IntersectionObserver — pauses when off-screen
 * - prefers-reduced-motion respect
 */
export function useCanvasAnimation(options: CanvasAnimationOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const optionsRef = useRef(options)
  optionsRef.current = options

  // Store mutable state in a ref to avoid re-running the effect
  const state = useRef({
    width: 0,
    height: 0,
    animationId: 0,
    lastTime: 0,
    running: true,
    visible: true,
    intersecting: true,
  })

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = Math.min(window.devicePixelRatio || 1, optionsRef.current.maxDpr ?? 2)
    const rect = parent.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext("2d")!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    state.current.width = w
    state.current.height = h

    optionsRef.current.init(ctx, w, h)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    // Reduced motion — don't animate
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) {
      resize()
      const ctx = canvas.getContext("2d")!
      // Draw single frame
      optionsRef.current.draw(ctx, state.current.width, state.current.height, 16)
      return
    }

    resize()

    const s = state.current

    // RAF loop
    function loop(time: number) {
      if (!s.running || !s.visible || !s.intersecting) {
        s.animationId = 0
        return
      }
      const delta = s.lastTime ? Math.min(time - s.lastTime, 50) : 16
      s.lastTime = time

      const ctx = canvas!.getContext("2d")!
      optionsRef.current.draw(ctx, s.width, s.height, delta)
      s.animationId = requestAnimationFrame(loop)
    }

    function start() {
      if (s.animationId) return
      s.lastTime = 0
      s.animationId = requestAnimationFrame(loop)
    }

    function stop() {
      if (s.animationId) {
        cancelAnimationFrame(s.animationId)
        s.animationId = 0
      }
    }

    // Visibility
    function onVisibility() {
      s.visible = document.visibilityState === "visible"
      if (s.visible && s.intersecting) start()
      else stop()
    }
    document.addEventListener("visibilitychange", onVisibility)

    // Intersection
    const io = new IntersectionObserver(
      ([entry]) => {
        s.intersecting = entry.isIntersecting
        if (s.intersecting && s.visible) start()
        else stop()
      },
      { threshold: 0.05 }
    )
    io.observe(parent)

    // Resize
    const ro = new ResizeObserver(() => resize())
    ro.observe(parent)

    start()

    return () => {
      s.running = false
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
      io.disconnect()
      ro.disconnect()
    }
  }, [resize])

  return canvasRef
}
