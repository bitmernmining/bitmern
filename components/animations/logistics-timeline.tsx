"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeInOutCubic, ANIM_COLORS, rgba } from "@/lib/animation-utils"

// --- Config: identical to Webflow source ---
const COLORS = {
  base: ANIM_COLORS.base,
  accent: ANIM_COLORS.accent,
  dim: { r: 100, g: 108, b: 120 },
} as const

const CYCLE_MS = 5000
/** 0–0.75: line fills, 0.75–0.9: hold, 0.9–1: fade out */
const FILL_PHASE = 0.75
const HOLD_PHASE = 0.9

const LABELS = ["ORIGIN", "SHIPPING", "CUSTOMS", "DEPLOYED"] as const
/** X positions as fractions of total width between startX and endX */
const LABEL_POSITIONS = [0, 0.33, 0.66, 1] as const

interface Checkpoint {
  x: number
  y: number
  label: string
  active: number
}

interface LogisticsState {
  checkpoints: Checkpoint[]
  globalTime: number
}

export function LogisticsTimeline({ className }: { className?: string }) {
  const stateRef = useRef<LogisticsState>({
    checkpoints: [],
    globalTime: 0,
  })

  const init = useCallback(
    (_ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const y = h * 0.5
      const startX = w * 0.1
      const endX = w * 0.9
      const totalWidth = endX - startX

      stateRef.current.checkpoints = LABELS.map((label, i) => ({
        x: startX + totalWidth * LABEL_POSITIONS[i],
        y,
        label,
        active: 0,
      }))
    },
    []
  )

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, delta: number) => {
      const s = stateRef.current
      s.globalTime += delta

      const { checkpoints } = s
      if (checkpoints.length === 0) return

      // --- Phase calculation ---
      const cycle = (s.globalTime % CYCLE_MS) / CYCLE_MS
      let progress: number
      if (cycle < FILL_PHASE) {
        progress = easeInOutCubic(cycle / FILL_PHASE)
      } else if (cycle < HOLD_PHASE) {
        progress = 1
      } else {
        progress = 1 - (cycle - HOLD_PHASE) / (1 - HOLD_PHASE)
        if (progress < 0.1) {
          checkpoints.forEach((cp) => (cp.active = 0))
        }
      }

      // --- Checkpoint activation ---
      checkpoints.forEach((cp, i) => {
        const threshold = i / (checkpoints.length - 1)
        if (progress >= threshold && cycle < HOLD_PHASE) {
          cp.active = Math.min(1, cp.active + delta * 0.008)
        } else if (cycle >= HOLD_PHASE) {
          cp.active = Math.max(0, cp.active - delta * 0.01)
        }
      })

      // --- Render ---
      ctx.clearRect(0, 0, w, h)

      // For render, progress collapses to 0 during fade phase
      let renderProgress: number
      if (cycle < FILL_PHASE) {
        renderProgress = easeInOutCubic(cycle / FILL_PHASE)
      } else if (cycle < HOLD_PHASE) {
        renderProgress = 1
      } else {
        renderProgress = 0
      }

      const startX = checkpoints[0].x
      const endX = checkpoints[checkpoints.length - 1].x
      const y = h * 0.5

      // Base path line
      ctx.beginPath()
      ctx.moveTo(startX, y)
      ctx.lineTo(endX, y)
      ctx.strokeStyle = rgba(COLORS.dim, 0.2)
      ctx.lineWidth = 2
      ctx.stroke()

      // Active (filled) path line
      if (renderProgress > 0) {
        const activeX = startX + (endX - startX) * renderProgress
        ctx.beginPath()
        ctx.moveTo(startX, y)
        ctx.lineTo(activeX, y)
        ctx.strokeStyle = rgba(COLORS.accent, 0.5)
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Checkpoints
      const nodeRadius = Math.min(w, h) * 0.035
      const fontSize = Math.max(7, Math.min(w, h) * 0.025)

      checkpoints.forEach((cp, i) => {
        const isLast = i === checkpoints.length - 1
        const radius = nodeRadius * (isLast ? 1.2 : 1)

        // Radial glow when active
        if (cp.active > 0) {
          const glowRadius = radius * 2.5
          const gradient = ctx.createRadialGradient(
            cp.x, cp.y, 0,
            cp.x, cp.y, glowRadius
          )
          gradient.addColorStop(0, rgba(COLORS.accent, 0.2 * cp.active))
          gradient.addColorStop(1, rgba(COLORS.accent, 0))
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(cp.x, cp.y, glowRadius, 0, Math.PI * 2)
          ctx.fill()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(cp.x, cp.y, radius, 0, Math.PI * 2)
        if (cp.active > 0.5) {
          ctx.fillStyle = rgba(COLORS.accent, 0.4 + cp.active * 0.5)
        } else {
          ctx.fillStyle = rgba(COLORS.dim, 0.3)
        }
        ctx.fill()

        // Label
        ctx.font = `500 ${fontSize}px "JetBrains Mono", "SF Mono", monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        if (cp.active > 0.5) {
          ctx.fillStyle = rgba(COLORS.accent, 0.5 + cp.active * 0.4)
        } else {
          ctx.fillStyle = rgba(COLORS.base, 0.4)
        }
        ctx.fillText(cp.label, cp.x, cp.y + radius + fontSize * 1.2)
      })

      // Traveling pulse
      if (renderProgress > 0 && renderProgress < 1) {
        const pulseX = startX + (endX - startX) * renderProgress

        // Pulse glow
        const pulseGlow = ctx.createRadialGradient(
          pulseX, y, 0,
          pulseX, y, 15
        )
        pulseGlow.addColorStop(0, rgba(COLORS.accent, 0.7))
        pulseGlow.addColorStop(0.5, rgba(COLORS.accent, 0.2))
        pulseGlow.addColorStop(1, rgba(COLORS.accent, 0))
        ctx.fillStyle = pulseGlow
        ctx.beginPath()
        ctx.arc(pulseX, y, 15, 0, Math.PI * 2)
        ctx.fill()

        // Pulse core
        ctx.beginPath()
        ctx.arc(pulseX, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = rgba(COLORS.accent, 1)
        ctx.fill()
      }
    },
    []
  )

  const canvasRef = useCanvasAnimation({ init, draw })

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  )
}
