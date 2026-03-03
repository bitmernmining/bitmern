"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeInOutCubic, resolveThemeColors, getCanvasFont, rgba, type AnimColors } from "@/lib/animation-utils"

// --- Config: identical to Webflow source ---
const CYCLE_MS = 6000
const BAR_RADIUS = 6

// Gradient opacity stops (Webflow verbatim)
const VOL_GRADIENT = { top: 0.9, bottom: 0.6 }
const COST_GRADIENT = { top: 0.5, bottom: 0.3 }

// Initialized in init() — avoid calling resolveThemeColors() at module scope (SSR)
let COLORS: AnimColors = null as unknown as AnimColors

// --- Component ---
export function VolumePricingChart({ className }: { className?: string }) {
  const globalTimeRef = useRef(0)

  const init = useCallback(() => {
    COLORS = resolveThemeColors()
  }, [])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, delta: number) => {
      globalTimeRef.current += delta
      ctx.clearRect(0, 0, w, h)

      // --- Animation cycle (6 seconds) ---
      const cycle = (globalTimeRef.current % CYCLE_MS) / CYCLE_MS
      let progress: number
      if (cycle < 0.7) {
        // 0–70%: ease in/out from 0→1
        progress = easeInOutCubic(cycle / 0.7)
      } else if (cycle < 0.85) {
        // 70–85%: hold at 1
        progress = 1
      } else {
        // 85–100%: ease back to 0
        progress = 1 - easeInOutCubic((cycle - 0.85) / 0.15)
      }

      // --- Layout (Webflow values) ---
      const barWidth = w * 0.25
      const maxBarHeight = h * 0.5
      const barY = h * 0.55
      const gap = w * 0.15

      // Volume bar (left) — grows UP
      const volumeX = w * 0.5 - gap - barWidth
      const volumeHeight = maxBarHeight * (0.15 + progress * 0.85)

      // Cost bar (right) — shrinks DOWN
      const costX = w * 0.5 + gap
      const costHeight = maxBarHeight * (1 - progress * 0.65)

      // --- Volume bar ---
      const volGrad = ctx.createLinearGradient(volumeX, barY - volumeHeight, volumeX, barY)
      volGrad.addColorStop(0, rgba(COLORS.accent, VOL_GRADIENT.top))
      volGrad.addColorStop(1, rgba(COLORS.accent, VOL_GRADIENT.bottom))
      ctx.fillStyle = volGrad
      ctx.beginPath()
      ctx.roundRect(volumeX, barY - volumeHeight, barWidth, volumeHeight, BAR_RADIUS)
      ctx.fill()

      // --- Cost bar ---
      const costGrad = ctx.createLinearGradient(costX, barY - costHeight, costX, barY)
      costGrad.addColorStop(0, rgba(COLORS.base, COST_GRADIENT.top))
      costGrad.addColorStop(1, rgba(COLORS.base, COST_GRADIENT.bottom))
      ctx.fillStyle = costGrad
      ctx.beginPath()
      ctx.roundRect(costX, barY - costHeight, barWidth, costHeight, BAR_RADIUS)
      ctx.fill()

      // --- Labels ---
      const fontSize = Math.max(9, Math.min(w, h) * 0.032)
      ctx.font = getCanvasFont(500, fontSize)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      ctx.fillStyle = rgba(COLORS.accent, 0.8)
      ctx.fillText("VOLUME", volumeX + barWidth * 0.5, barY + fontSize * 1.5)

      ctx.fillStyle = rgba(COLORS.base, 0.5)
      ctx.fillText("COST/UNIT", costX + barWidth * 0.5, barY + fontSize * 1.5)
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
