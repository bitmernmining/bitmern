"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeInOutCubic, resolveThemeColors, rgba, type AnimColors } from "@/lib/animation-utils"

// Initialized in init() — avoid calling resolveThemeColors() at module scope (SSR)
let COLORS: AnimColors = null as unknown as AnimColors

const GRID = {
  horizontalLines: 5,
  verticalLines: 6,
  gridOpacity: 0.1,
  axisOpacity: 0.2,
} as const

const LINE = {
  /** Line end sits at 8% from graph top — 97% uptime, not 100% */
  topOffset: 0.08,
  glowWidth: 6,
  glowOpacity: 0.15,
  strokeWidth: 2,
  strokeOpacity: 0.5,
  fillTopOpacity: 0.12,
  fillBottomOpacity: 0.02,
} as const

const PULSE = {
  /** Base speed (progress/ms) — Webflow: 0.0004 + random * 0.0001 */
  speedBase: 0.0004,
  speedVariance: 0.0001,
  intensityBase: 0.75,
  intensityVariance: 0.25,
  maxActive: 3,
  /** Probability per frame to spawn (Webflow: 0.01 per frame ≈ every ~4s at 60fps) */
  spawnChance: 0.01,
  trailLength: 0.1,
  trailWidth: 3,
  trailOpacity: 0.45,
  glowRadius: 10,
  glowInnerOpacity: 0.5,
  glowMidOpacity: 0.12,
  coreRadius: 3,
  coreOpacity: 0.9,
  fadeStart: 0.85,
  fadeDuration: 0.3,
  removeAt: 1.15,
} as const

const ENDPOINT = {
  pulseSpeed: 0.003,
  pulseAmplitude: 0.12,
  pulseCenter: 0.88,
  glowRadius: 14,
  glowInnerOpacity: 0.35,
  glowMidOpacity: 0.1,
  coreBaseRadius: 4,
  coreOpacity: 0.9,
} as const

// --- Types ---
interface RisePulse {
  progress: number
  speed: number
  intensity: number
}

interface GraphArea {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

interface Point {
  x: number
  y: number
}

// --- Component ---
export function UptimeChart({ className }: { className?: string }) {
  const globalTimeRef = useRef(0)
  const pulsesRef = useRef<RisePulse[]>([])
  const graphAreaRef = useRef<GraphArea>({ left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 })
  const lineStartRef = useRef<Point>({ x: 0, y: 0 })
  const lineEndRef = useRef<Point>({ x: 0, y: 0 })

  const getPointOnLine = useCallback((t: number): Point => {
    const s = lineStartRef.current
    const e = lineEndRef.current
    return {
      x: s.x + (e.x - s.x) * t,
      y: s.y + (e.y - s.y) * t,
    }
  }, [])

  const canvasRef = useCanvasAnimation({
    init(_ctx, width, height) {
      COLORS = resolveThemeColors()
      // Graph area with padding (10% of smallest dimension)
      const padding = Math.min(width, height) * 0.1
      graphAreaRef.current = {
        left: padding,
        right: width - padding,
        top: padding,
        bottom: height - padding,
        width: width - padding * 2,
        height: height - padding * 2,
      }
      const ga = graphAreaRef.current
      // Rising line: bottom-left to top-right (not quite peak)
      lineStartRef.current = { x: ga.left, y: ga.bottom }
      lineEndRef.current = { x: ga.right, y: ga.top + ga.height * LINE.topOffset }
      // Reset pulses on resize, spawn initial
      pulsesRef.current = [{
        progress: 0,
        speed: PULSE.speedBase + Math.random() * PULSE.speedVariance,
        intensity: PULSE.intensityBase + Math.random() * PULSE.intensityVariance,
      }]
      globalTimeRef.current = 0
    },

    draw(ctx, width, height, delta) {
      const ga = graphAreaRef.current
      const ls = lineStartRef.current
      const le = lineEndRef.current
      const pulses = pulsesRef.current

      // Update
      globalTimeRef.current += delta

      // Spawn pulses (~every 4s at 60fps)
      if (Math.random() < PULSE.spawnChance && pulses.length < PULSE.maxActive) {
        pulses.push({
          progress: 0,
          speed: PULSE.speedBase + Math.random() * PULSE.speedVariance,
          intensity: PULSE.intensityBase + Math.random() * PULSE.intensityVariance,
        })
      }

      // Advance pulses
      for (const p of pulses) {
        p.progress += p.speed * delta
      }
      // Remove finished pulses
      pulsesRef.current = pulses.filter(p => p.progress < PULSE.removeAt)

      // --- Render ---
      ctx.clearRect(0, 0, width, height)

      // Grid background
      const dimColor = COLORS.dim
      const gridStroke = rgba(dimColor, GRID.gridOpacity)
      const axisStroke = rgba(dimColor, GRID.axisOpacity)

      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= GRID.horizontalLines; i++) {
        const y = ga.top + (ga.height / GRID.horizontalLines) * i
        ctx.beginPath()
        ctx.moveTo(ga.left, y)
        ctx.lineTo(ga.right, y)
        ctx.strokeStyle = gridStroke
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i <= GRID.verticalLines; i++) {
        const x = ga.left + (ga.width / GRID.verticalLines) * i
        ctx.beginPath()
        ctx.moveTo(x, ga.top)
        ctx.lineTo(x, ga.bottom)
        ctx.strokeStyle = gridStroke
        ctx.stroke()
      }

      // Y-axis (left edge)
      ctx.beginPath()
      ctx.moveTo(ga.left, ga.top)
      ctx.lineTo(ga.left, ga.bottom)
      ctx.strokeStyle = axisStroke
      ctx.stroke()

      // X-axis (bottom edge)
      ctx.beginPath()
      ctx.moveTo(ga.left, ga.bottom)
      ctx.lineTo(ga.right, ga.bottom)
      ctx.strokeStyle = axisStroke
      ctx.stroke()

      // --- Rising line with filled area ---

      // Fill under line
      ctx.beginPath()
      ctx.moveTo(ls.x, ls.y)
      ctx.lineTo(le.x, le.y)
      ctx.lineTo(le.x, ga.bottom)
      ctx.lineTo(ls.x, ga.bottom)
      ctx.closePath()
      const areaGrad = ctx.createLinearGradient(0, ga.top, 0, ga.bottom)
      areaGrad.addColorStop(0, rgba(COLORS.accent, LINE.fillTopOpacity))
      areaGrad.addColorStop(1, rgba(COLORS.accent, LINE.fillBottomOpacity))
      ctx.fillStyle = areaGrad
      ctx.fill()

      // Line glow
      ctx.beginPath()
      ctx.moveTo(ls.x, ls.y)
      ctx.lineTo(le.x, le.y)
      ctx.strokeStyle = rgba(COLORS.accent, LINE.glowOpacity)
      ctx.lineWidth = LINE.glowWidth
      ctx.lineCap = "round"
      ctx.stroke()

      // Main line
      ctx.beginPath()
      ctx.moveTo(ls.x, ls.y)
      ctx.lineTo(le.x, le.y)
      ctx.strokeStyle = rgba(COLORS.accent, LINE.strokeOpacity)
      ctx.lineWidth = LINE.strokeWidth
      ctx.stroke()

      // --- Pulses ---
      for (const pulse of pulsesRef.current) {
        const t = easeInOutCubic(Math.min(pulse.progress, 1))
        const pos = getPointOnLine(t)

        // Trail
        const trailT = Math.max(0, t - PULSE.trailLength)
        const trailPos = getPointOnLine(trailT)
        const trailGrad = ctx.createLinearGradient(trailPos.x, trailPos.y, pos.x, pos.y)
        trailGrad.addColorStop(0, rgba(COLORS.accent, 0))
        trailGrad.addColorStop(1, rgba(COLORS.accent, PULSE.trailOpacity * pulse.intensity))
        ctx.beginPath()
        ctx.moveTo(trailPos.x, trailPos.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.strokeStyle = trailGrad
        ctx.lineWidth = PULSE.trailWidth
        ctx.lineCap = "round"
        ctx.stroke()

        // Fade at end
        const fadeOut = pulse.progress > PULSE.fadeStart
          ? 1 - (pulse.progress - PULSE.fadeStart) / PULSE.fadeDuration
          : 1
        const alpha = pulse.intensity * fadeOut

        // Glow
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, PULSE.glowRadius)
        glow.addColorStop(0, rgba(COLORS.accent, PULSE.glowInnerOpacity * alpha))
        glow.addColorStop(0.4, rgba(COLORS.accent, PULSE.glowMidOpacity * alpha))
        glow.addColorStop(1, rgba(COLORS.accent, 0))
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, PULSE.glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, PULSE.coreRadius, 0, Math.PI * 2)
        ctx.fillStyle = rgba(COLORS.accent, PULSE.coreOpacity * alpha)
        ctx.fill()
      }

      // --- Endpoint (pulsing dot at line end) ---
      const pulseFactor = Math.sin(globalTimeRef.current * ENDPOINT.pulseSpeed) * ENDPOINT.pulseAmplitude + ENDPOINT.pulseCenter

      // Endpoint glow
      const endGlow = ctx.createRadialGradient(le.x, le.y, 0, le.x, le.y, ENDPOINT.glowRadius)
      endGlow.addColorStop(0, rgba(COLORS.accent, ENDPOINT.glowInnerOpacity))
      endGlow.addColorStop(0.4, rgba(COLORS.accent, ENDPOINT.glowMidOpacity))
      endGlow.addColorStop(1, rgba(COLORS.accent, 0))
      ctx.fillStyle = endGlow
      ctx.beginPath()
      ctx.arc(le.x, le.y, ENDPOINT.glowRadius, 0, Math.PI * 2)
      ctx.fill()

      // Endpoint core
      ctx.beginPath()
      ctx.arc(le.x, le.y, ENDPOINT.coreBaseRadius * pulseFactor, 0, Math.PI * 2)
      ctx.fillStyle = rgba(COLORS.accent, ENDPOINT.coreOpacity)
      ctx.fill()
    },
  })

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  )
}
