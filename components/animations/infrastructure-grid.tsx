"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { lerp, resolveThemeColors, rgba } from "@/lib/animation-utils"

// --- Config: tuned for ambient hero background ---
const CONFIG = {
  dotSpacing: 70,
  dotRadius: 1.2,
  baseDotOpacity: 0.25,
  activeDotOpacity: 0.55,
  sweepSpeed: 0.08,
  sweepWidth: 280,
  sweepFadeIn: 120,
  sweepFadeOut: 160,
  connectionDistance: 95,
  connectionOpacity: 0.08,
  connectionWidth: 1,
  signalSpeed: 0.18,
  signalRadius: 2,
  signalOpacity: 0.5,
  signalSpawnRate: 0.003,
  signalTrailLength: 16,
} as const

const DIRECTIONS = [
  0,
  Math.PI,
  Math.PI / 2,
  -Math.PI / 2,
  Math.PI / 4,
  -Math.PI / 4,
  (Math.PI * 3) / 4,
  (-Math.PI * 3) / 4,
]

// --- Types ---
interface Dot {
  x: number
  y: number
  col: number
  row: number
  idx: number
  intensity: number
  neighbors: Dot[]
}

// Pre-computed connection pair (avoids indexOf per frame)
interface Edge {
  a: Dot
  b: Dot
}

interface Signal {
  fromX: number
  fromY: number
  toX: number
  toY: number
  progress: number
  speed: number
}

interface Sweep {
  angle: number
  position: number
  maxDistance: number
}

// --- Helpers (ported verbatim from Webflow) ---
function getMaxDistance(w: number, h: number): number {
  const diagonal = Math.sqrt(w * w + h * h)
  return diagonal + CONFIG.sweepWidth + CONFIG.sweepFadeIn + CONFIG.sweepFadeOut
}

function getRandomDirection(excludeAngle: number): number {
  let newAngle: number
  do {
    newAngle = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
  } while (newAngle === excludeAngle)
  return newAngle
}

function getDotSweepDistance(dot: Dot, sweep: Sweep, w: number, h: number): number {
  const cos = Math.cos(sweep.angle)
  const sin = Math.sin(sweep.angle)
  const centerX = w / 2
  const centerY = h / 2
  const dx = dot.x - centerX
  const dy = dot.y - centerY
  const projection = dx * cos + dy * sin
  const maxProjection = (Math.abs(cos) * w + Math.abs(sin) * h) / 2
  return projection + maxProjection
}

function calculateDotIntensityFromSweep(dot: Dot, sweep: Sweep, w: number, h: number): number {
  const dotDistance = getDotSweepDistance(dot, sweep, w, h)
  const sweepStart = sweep.position
  const sweepEnd = sweep.position + CONFIG.sweepWidth

  if (dotDistance < sweepStart - CONFIG.sweepFadeIn) return 0
  if (dotDistance < sweepStart)
    return (dotDistance - (sweepStart - CONFIG.sweepFadeIn)) / CONFIG.sweepFadeIn
  if (dotDistance <= sweepEnd) return 1
  if (dotDistance < sweepEnd + CONFIG.sweepFadeOut)
    return 1 - (dotDistance - sweepEnd) / CONFIG.sweepFadeOut
  return 0
}

// --- Component ---
export function InfrastructureGrid({ className }: { className?: string }) {
  const dotsRef = useRef<Dot[]>([])
  const edgesRef = useRef<Edge[]>([])
  const signalsRef = useRef<Signal[]>([])
  const sweepsRef = useRef<Sweep[]>([])
  const colorsRef = useRef(resolveThemeColors())

  function lerpColor(intensity: number) {
    const c = colorsRef.current
    return {
      r: Math.round(lerp(c.dim.r, c.accent.r, intensity)),
      g: Math.round(lerp(c.dim.g, c.accent.g, intensity)),
      b: Math.round(lerp(c.dim.b, c.accent.b, intensity)),
    }
  }

  const init = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    colorsRef.current = resolveThemeColors()

    // Build dot grid
    const dots: Dot[] = []
    const cols = Math.ceil(w / CONFIG.dotSpacing) + 2
    const rows = Math.ceil(h / CONFIG.dotSpacing) + 2
    const offsetX = (w % CONFIG.dotSpacing) / 2
    const offsetY = (h % CONFIG.dotSpacing) / 2

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * CONFIG.dotSpacing + offsetX,
          y: row * CONFIG.dotSpacing + offsetY,
          col,
          row,
          idx: dots.length,
          intensity: 0,
          neighbors: [],
        })
      }
    }

    // Pre-compute neighbors
    for (const dot of dots) {
      dot.neighbors = dots.filter((other) => {
        if (other === dot) return false
        const dx = other.x - dot.x
        const dy = other.y - dot.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        return dist <= CONFIG.connectionDistance && dist > 0
      })
    }

    // Pre-compute unique edge pairs (draw each connection once, not twice)
    const edges: Edge[] = []
    const seen = new Set<string>()
    for (const dot of dots) {
      for (const neighbor of dot.neighbors) {
        const key = dot.idx < neighbor.idx
          ? `${dot.idx}:${neighbor.idx}`
          : `${neighbor.idx}:${dot.idx}`
        if (!seen.has(key)) {
          seen.add(key)
          edges.push({ a: dot, b: neighbor })
        }
      }
    }

    dotsRef.current = dots
    edgesRef.current = edges
    signalsRef.current = []

    // Dual sweeps
    const maxDist = getMaxDistance(w, h)
    sweepsRef.current = [
      {
        angle: DIRECTIONS[0],
        position: -CONFIG.sweepWidth - CONFIG.sweepFadeIn,
        maxDistance: maxDist,
      },
      {
        angle: DIRECTIONS[4],
        position: -CONFIG.sweepWidth - CONFIG.sweepFadeIn + maxDist / 2,
        maxDistance: maxDist,
      },
    ]
  }, [])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, delta: number) => {
      const dots = dotsRef.current
      const sweeps = sweepsRef.current
      let signals = signalsRef.current

      // --- Update sweeps ---
      for (const sweep of sweeps) {
        sweep.position += CONFIG.sweepSpeed * delta
        if (sweep.position > sweep.maxDistance) {
          sweep.angle = getRandomDirection(sweep.angle)
          sweep.position = -CONFIG.sweepWidth - CONFIG.sweepFadeIn
        }
      }

      // --- Update dot intensities ---
      for (const dot of dots) {
        let maxIntensity = 0
        for (const sweep of sweeps) {
          const intensity = calculateDotIntensityFromSweep(dot, sweep, w, h)
          if (intensity > maxIntensity) maxIntensity = intensity
        }
        dot.intensity = maxIntensity
      }

      // --- Update signals ---
      signals = signals.filter((signal) => {
        const dx = signal.toX - signal.fromX
        const dy = signal.toY - signal.fromY
        const distance = Math.sqrt(dx * dx + dy * dy)
        signal.progress += (signal.speed * delta) / distance
        return signal.progress < 1
      })

      // Spawn new signals
      for (const dot of dots) {
        if (dot.intensity > 0.5 && Math.random() < CONFIG.signalSpawnRate) {
          const activeNeighbors = dot.neighbors.filter((n) => n.intensity > 0.3)
          if (activeNeighbors.length > 0) {
            const toDot = activeNeighbors[Math.floor(Math.random() * activeNeighbors.length)]
            signals.push({
              fromX: dot.x,
              fromY: dot.y,
              toX: toDot.x,
              toY: toDot.y,
              progress: 0,
              speed: CONFIG.signalSpeed,
            })
          }
        }
      }

      signalsRef.current = signals

      // --- Render ---
      ctx.clearRect(0, 0, w, h)

      // Connections — iterate pre-computed edge pairs (no indexOf, no dupes)
      const edges = edgesRef.current
      ctx.lineWidth = CONFIG.connectionWidth
      for (let i = 0; i < edges.length; i++) {
        const { a, b } = edges[i]
        if (a.intensity < 0.1 && b.intensity < 0.1) continue
        const strength = Math.min(a.intensity, b.intensity)
        if (strength < 0.05) continue
        const color = lerpColor(strength)
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = rgba(color, CONFIG.connectionOpacity * strength)
        ctx.stroke()
      }

      // Signal trails + heads — solid color, no gradient allocation per frame
      const accentColor = colorsRef.current.accent
      for (const signal of signals) {
        const dx = signal.toX - signal.fromX
        const dy = signal.toY - signal.fromY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const currentX = signal.fromX + dx * signal.progress
        const currentY = signal.fromY + dy * signal.progress
        const trailProgress = Math.max(0, signal.progress - CONFIG.signalTrailLength / distance)
        const trailX = signal.fromX + dx * trailProgress
        const trailY = signal.fromY + dy * trailProgress

        // Trail line — solid color at reduced opacity (replaces per-frame gradient)
        ctx.beginPath()
        ctx.moveTo(trailX, trailY)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = rgba(accentColor, CONFIG.signalOpacity * 0.35)
        ctx.lineWidth = 2
        ctx.stroke()

        // Head dot
        ctx.beginPath()
        ctx.arc(currentX, currentY, CONFIG.signalRadius, 0, Math.PI * 2)
        ctx.fillStyle = rgba(accentColor, CONFIG.signalOpacity)
        ctx.fill()
      }

      // Dots (drawn on top)
      for (const dot of dots) {
        const color = lerpColor(dot.intensity)
        const opacity =
          CONFIG.baseDotOpacity +
          (CONFIG.activeDotOpacity - CONFIG.baseDotOpacity) * dot.intensity
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, CONFIG.dotRadius + dot.intensity * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = rgba(color, opacity)
        ctx.fill()
      }

      // Sweep glow — cheap soft circle (no per-frame radialGradient allocation)
      ctx.globalCompositeOperation = "lighter"
      for (const sweep of sweeps) {
        const cos = Math.cos(sweep.angle)
        const sin = Math.sin(sweep.angle)
        const centerX = w / 2
        const centerY = h / 2
        const maxProjection = (Math.abs(cos) * w + Math.abs(sin) * h) / 2
        const sweepCenterDist = sweep.position + CONFIG.sweepWidth / 2 - maxProjection
        const glowX = centerX + cos * sweepCenterDist
        const glowY = centerY + sin * sweepCenterDist
        const glowRadius = CONFIG.sweepWidth * 1.2

        ctx.beginPath()
        ctx.arc(glowX, glowY, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = rgba(accentColor, 0.008)
        ctx.fill()
      }
      ctx.globalCompositeOperation = "source-over"
    },
    []
  )

  const canvasRef = useCanvasAnimation({ init, draw })

  return (
    <div className={className} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  )
}
