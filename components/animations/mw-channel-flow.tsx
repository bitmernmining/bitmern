"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeInOutSine, smoothstep, resolveThemeColors, rgba, type AnimColors } from "@/lib/animation-utils"

// --- Config: identical to Webflow source ---
const CHANNEL_COUNT = 5
const PADDING_RATIO = 0.12
const START_X_RATIO = 0.06
const END_X_RATIO = 0.94
const FLOW_WIDTH = 0.35
const FLOW_RESET_THRESHOLD = 1.4
const PHASE_TICK = 0.002
const GLOW_TICK = 0.003
const BASE_SPEED_MIN = 0.00025
const BASE_SPEED_RANGE = 0.0001
const INTENSITY_MIN = 0.6
const INTENSITY_RANGE = 0.4
const STAGGER_STEP = 0.18

// Gradient stops for the flowing trail (symmetric fade)
const TRAIL_STOPS = [
  [0, 0],
  [0.15, 0.25],
  [0.4, 0.55],
  [0.5, 0.65],
  [0.6, 0.55],
  [0.85, 0.25],
  [1, 0],
] as const

const OUTER_GLOW_RADIUS = 12
const INNER_GLOW_RADIUS = 5
const DOT_CORE_RADIUS = 2
const END_NODE_RADIUS = 2.5
const LINE_WIDTH_BASE = 1
const LINE_WIDTH_FLOW = 2.5
const BASE_LINE_OPACITY = 0.12
const END_NODE_OPACITY = 0.25

// Initialized in init() — avoid calling resolveThemeColors() at module scope (SSR)
let colors: AnimColors = null as unknown as AnimColors

interface Channel {
  y: number
  phase: number
  baseSpeed: number
  flowOffset: number
  intensity: number
  glowPhase: number
}

export function MWChannelFlow({ className }: { className?: string }) {
  const channelsRef = useRef<Channel[]>([])

  const init = useCallback((_ctx: CanvasRenderingContext2D, _w: number, h: number) => {
    colors = resolveThemeColors()
    const channels: Channel[] = []
    const padding = h * PADDING_RATIO
    const spacing = (h - padding * 2) / (CHANNEL_COUNT - 1)

    for (let i = 0; i < CHANNEL_COUNT; i++) {
      channels.push({
        y: padding + i * spacing,
        phase: Math.random() * Math.PI * 2,
        baseSpeed: BASE_SPEED_MIN + Math.random() * BASE_SPEED_RANGE,
        flowOffset: i * STAGGER_STEP,
        intensity: INTENSITY_MIN + Math.random() * INTENSITY_RANGE,
        glowPhase: Math.random() * Math.PI * 2,
      })
    }

    channelsRef.current = channels
  }, [])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, delta: number) => {
      const channels = channelsRef.current
      if (channels.length === 0) return

      // --- Update ---
      for (const ch of channels) {
        ch.phase += delta * PHASE_TICK
        ch.glowPhase += delta * GLOW_TICK
        ch.flowOffset += ch.baseSpeed * delta
        if (ch.flowOffset > FLOW_RESET_THRESHOLD) ch.flowOffset -= FLOW_RESET_THRESHOLD
      }

      // --- Render ---
      ctx.clearRect(0, 0, w, h)

      const startX = w * START_X_RATIO
      const endX = w * END_X_RATIO
      const lineLength = endX - startX

      for (const ch of channels) {
        drawChannel(ctx, ch, startX, endX, lineLength)
      }
    },
    []
  )

  const canvasRef = useCanvasAnimation({ init, draw })

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  )
}

// --- Draw a single channel ---
// NOTE: gradient caching is not practical here — trail gradient coordinates
// (clampedStart/clampedEnd) and dot position (dotX) change every frame.
// The gradient count is bounded by CHANNEL_COUNT (5), so allocation cost is low.
function drawChannel(
  ctx: CanvasRenderingContext2D,
  ch: Channel,
  startX: number,
  endX: number,
  lineLength: number
) {
  // Base line (very subtle)
  ctx.beginPath()
  ctx.moveTo(startX, ch.y)
  ctx.lineTo(endX, ch.y)
  ctx.strokeStyle = rgba(colors.dim, BASE_LINE_OPACITY)
  ctx.lineWidth = LINE_WIDTH_BASE
  ctx.stroke()

  // Smooth flow position with easing
  const rawPos = ch.flowOffset
  const flowPos = rawPos > 1 ? 1 : easeInOutSine(rawPos)

  // Only draw flow if visible
  if (rawPos < 1.1) {
    const flowCenterX = startX + lineLength * flowPos
    const flowStartX = flowCenterX - lineLength * FLOW_WIDTH * 0.5
    const flowEndX = flowCenterX + lineLength * FLOW_WIDTH * 0.5

    // Clamp to line bounds
    const clampedStart = Math.max(startX, flowStartX)
    const clampedEnd = Math.min(endX, flowEndX)

    if (clampedEnd > clampedStart) {
      // Edge fade calculations
      const startFade = flowStartX < startX ? (startX - flowStartX) / (lineLength * FLOW_WIDTH) : 0
      const endFade = flowEndX > endX ? (flowEndX - endX) / (lineLength * FLOW_WIDTH) : 0
      const intensityMod = ch.intensity * (1 - startFade * 0.5) * (1 - endFade * 0.5)
      const glowPulse = Math.sin(ch.glowPhase) * 0.1 + 0.9
      const finalIntensity = intensityMod * glowPulse

      // Multi-stop gradient trail
      const gradient = ctx.createLinearGradient(clampedStart, 0, clampedEnd, 0)
      for (const [stop, alpha] of TRAIL_STOPS) {
        gradient.addColorStop(stop, rgba(colors.accent, alpha * finalIntensity))
      }

      ctx.beginPath()
      ctx.moveTo(clampedStart, ch.y)
      ctx.lineTo(clampedEnd, ch.y)
      ctx.strokeStyle = gradient
      ctx.lineWidth = LINE_WIDTH_FLOW
      ctx.lineCap = "round"
      ctx.stroke()
    }

    // Leading dot
    const dotX = Math.min(endX, Math.max(startX, flowCenterX))
    const pulse = smoothstep((Math.sin(ch.phase * 2) + 1) / 2) * 0.3 + 0.7
    const dotAlpha = rawPos > 1 ? Math.max(0, 1 - (rawPos - 1) * 10) : 1

    // Outer glow (very soft)
    const outerGlow = ctx.createRadialGradient(dotX, ch.y, 0, dotX, ch.y, OUTER_GLOW_RADIUS)
    outerGlow.addColorStop(0, rgba(colors.accent, 0.25 * ch.intensity * pulse * dotAlpha))
    outerGlow.addColorStop(0.4, rgba(colors.accent, 0.08 * ch.intensity * dotAlpha))
    outerGlow.addColorStop(1, rgba(colors.accent, 0))
    ctx.fillStyle = outerGlow
    ctx.beginPath()
    ctx.arc(dotX, ch.y, OUTER_GLOW_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    // Inner glow
    const innerGlow = ctx.createRadialGradient(dotX, ch.y, 0, dotX, ch.y, INNER_GLOW_RADIUS)
    innerGlow.addColorStop(0, rgba(colors.accent, 0.7 * ch.intensity * pulse * dotAlpha))
    innerGlow.addColorStop(0.6, rgba(colors.accent, 0.2 * ch.intensity * dotAlpha))
    innerGlow.addColorStop(1, rgba(colors.accent, 0))
    ctx.fillStyle = innerGlow
    ctx.beginPath()
    ctx.arc(dotX, ch.y, INNER_GLOW_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    // Dot core
    ctx.beginPath()
    ctx.arc(dotX, ch.y, DOT_CORE_RADIUS * pulse, 0, Math.PI * 2)
    ctx.fillStyle = rgba(colors.accent, 0.9 * ch.intensity * dotAlpha)
    ctx.fill()
  }

  // End node (always visible)
  ctx.beginPath()
  ctx.arc(endX, ch.y, END_NODE_RADIUS, 0, Math.PI * 2)
  ctx.fillStyle = rgba(colors.base, END_NODE_OPACITY)
  ctx.fill()
}
