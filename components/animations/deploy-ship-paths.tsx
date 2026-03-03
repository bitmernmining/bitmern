"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeInOutCubic, resolveThemeColors, getCanvasFont, rgba, type AnimColors } from "@/lib/animation-utils"

// Initialized in init() — avoid calling resolveThemeColors() at module scope (SSR)
let COLORS: AnimColors = null as unknown as AnimColors

const PULSE_SPEED = 0.0004
const MAX_CONCURRENT_PULSES = 2
const SPAWN_PROBABILITY = 0.003

const ORIGIN_POS = { x: 0.15, y: 0.5 }
const DEST_X = 0.85
const DEST_TOP_Y = 0.3
const DEST_BOT_Y = 0.7

const CONTROL_TOP_Y = 0.35
const CONTROL_BOT_Y = 0.65

// --- Types ---
interface OriginNode {
  x: number
  y: number
  radius: number
  phase: number
}

interface DestNode {
  x: number
  y: number
  radius: number
  label: string
  sublabel: string
  phase: number
  active: number
}

interface Pulse {
  destIndex: number
  progress: number
  speed: number
  arrived: boolean
}

// --- Helpers (ported verbatim from Webflow) ---
function getPathPoint(
  origin: OriginNode,
  dest: DestNode,
  controlY: number,
  midX: number,
  t: number
): { x: number; y: number } {
  const mt = 1 - t
  return {
    x: mt * mt * origin.x + 2 * mt * t * midX + t * t * dest.x,
    y: mt * mt * origin.y + 2 * mt * t * controlY + t * t * dest.y,
  }
}

export function DeployShipPaths({ className }: { className?: string }) {
  const originRef = useRef<OriginNode>({
    x: 0,
    y: 0,
    radius: 0,
    phase: 0,
  })
  const destsRef = useRef<DestNode[]>([])
  const pulsesRef = useRef<Pulse[]>([])
  const nextPathRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  const init = useCallback(
    (_ctx: CanvasRenderingContext2D, w: number, h: number) => {
      COLORS = resolveThemeColors()
      sizeRef.current = { w, h }
      const nodeRadius = Math.min(w, h) * 0.04

      originRef.current = {
        x: w * ORIGIN_POS.x,
        y: w > 0 ? h * ORIGIN_POS.y : 0,
        radius: nodeRadius,
        phase: 0,
      }

      destsRef.current = [
        {
          x: w * DEST_X,
          y: h * DEST_TOP_Y,
          radius: nodeRadius,
          label: "DEPLOY",
          sublabel: "Our Facility",
          phase: 0,
          active: 0,
        },
        {
          x: w * DEST_X,
          y: h * DEST_BOT_Y,
          radius: nodeRadius,
          label: "SHIP",
          sublabel: "Your Location",
          phase: Math.PI,
          active: 0,
        },
      ]

      pulsesRef.current = []
      nextPathRef.current = 0
    },
    []
  )

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, delta: number) => {
      const origin = originRef.current
      const dests = destsRef.current
      let pulses = pulsesRef.current

      if (!origin || dests.length === 0) return

      // --- Update ---
      // Spawn pulses alternating between paths
      if (pulses.length < MAX_CONCURRENT_PULSES && Math.random() < SPAWN_PROBABILITY) {
        pulses.push({
          destIndex: nextPathRef.current,
          progress: 0,
          speed: PULSE_SPEED,
          arrived: false,
        })
        nextPathRef.current = (nextPathRef.current + 1) % 2
      }

      origin.phase += delta * 0.002
      for (const d of dests) {
        d.phase += delta * 0.0015
        d.active = Math.max(0, d.active - delta * 0.002)
      }

      for (const pulse of pulses) {
        pulse.progress += pulse.speed * delta
        if (pulse.progress >= 0.95 && !pulse.arrived) {
          pulse.arrived = true
          dests[pulse.destIndex].active = 1
        }
      }

      pulsesRef.current = pulses = pulses.filter((p) => p.progress < 1.1)

      // --- Render ---
      ctx.clearRect(0, 0, w, h)

      const midX = w * 0.5
      const controlYs = [h * CONTROL_TOP_Y, h * CONTROL_BOT_Y]

      // Draw base paths
      for (let i = 0; i < dests.length; i++) {
        const dest = dests[i]
        ctx.beginPath()
        ctx.moveTo(origin.x, origin.y)
        ctx.quadraticCurveTo(midX, controlYs[i], dest.x, dest.y)
        ctx.strokeStyle = rgba(COLORS.accent, 0.2)
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw pulses
      for (const pulse of pulses) {
        if (pulse.progress > 1) continue

        const dest = dests[pulse.destIndex]
        const controlY = controlYs[pulse.destIndex]
        const easedProgress = easeInOutCubic(Math.min(pulse.progress, 1))
        const pos = getPathPoint(origin, dest, controlY, midX, easedProgress)
        const prevPos = getPathPoint(
          origin,
          dest,
          controlY,
          midX,
          Math.max(0, easedProgress - 0.05)
        )

        // Active path segment (origin to current position)
        ctx.beginPath()
        ctx.moveTo(origin.x, origin.y)
        const steps = 20
        for (let i = 1; i <= steps; i++) {
          const t = (i / steps) * easedProgress
          const pt = getPathPoint(origin, dest, controlY, midX, t)
          ctx.lineTo(pt.x, pt.y)
        }
        ctx.strokeStyle = rgba(COLORS.accent, 0.4)
        ctx.lineWidth = 2
        ctx.stroke()

        // Trail gradient
        const trailGradient = ctx.createLinearGradient(
          prevPos.x,
          prevPos.y,
          pos.x,
          pos.y
        )
        trailGradient.addColorStop(0, rgba(COLORS.accent, 0))
        trailGradient.addColorStop(1, rgba(COLORS.accent, 0.5))
        ctx.beginPath()
        ctx.moveTo(prevPos.x, prevPos.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.strokeStyle = trailGradient
        ctx.lineWidth = 4
        ctx.lineCap = "round"
        ctx.stroke()

        // Glow
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 12)
        glow.addColorStop(0, rgba(COLORS.accent, 0.7))
        glow.addColorStop(0.5, rgba(COLORS.accent, 0.2))
        glow.addColorStop(1, rgba(COLORS.accent, 0))
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = rgba(COLORS.accent, 1)
        ctx.fill()
      }

      // Draw destinations
      for (const dest of dests) {
        const pulse = Math.sin(dest.phase) * 0.08 + 0.92
        const radius = dest.radius * pulse * (1 + dest.active * 0.15)

        // Glow (stronger when active)
        const glowIntensity = 0.1 + dest.active * 0.15
        const glow = ctx.createRadialGradient(
          dest.x,
          dest.y,
          0,
          dest.x,
          dest.y,
          radius * 2.5
        )
        glow.addColorStop(0, rgba(COLORS.base, glowIntensity))
        glow.addColorStop(1, rgba(COLORS.base, 0))
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(dest.x, dest.y, radius * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Core
        const coreAlpha = 0.5 + dest.active * 0.4
        ctx.beginPath()
        ctx.arc(dest.x, dest.y, radius, 0, Math.PI * 2)
        ctx.fillStyle =
          dest.active > 0.3
            ? rgba(COLORS.accent, coreAlpha)
            : rgba(COLORS.base, coreAlpha)
        ctx.fill()

        // Labels
        const fontSize = Math.max(8, Math.min(w, h) * 0.028)
        const smallFont = Math.max(7, Math.min(w, h) * 0.022)

        ctx.font = getCanvasFont(600, fontSize)
        ctx.textAlign = "center"
        ctx.fillStyle =
          dest.active > 0.3
            ? rgba(COLORS.accent, 0.85)
            : rgba(COLORS.base, 0.6)
        ctx.fillText(dest.label, dest.x, dest.y + radius + fontSize * 1.2)

        ctx.font = getCanvasFont(400, smallFont)
        ctx.fillStyle = rgba(COLORS.base, 0.4)
        ctx.fillText(
          dest.sublabel,
          dest.x,
          dest.y + radius + fontSize * 1.2 + smallFont * 1.3
        )
      }

      // Draw origin
      const oPulse = Math.sin(origin.phase) * 0.1 + 0.9
      const oRadius = origin.radius * oPulse

      // Origin glow
      const originGlow = ctx.createRadialGradient(
        origin.x,
        origin.y,
        0,
        origin.x,
        origin.y,
        oRadius * 2.5
      )
      originGlow.addColorStop(0, rgba(COLORS.accent, 0.15))
      originGlow.addColorStop(1, rgba(COLORS.accent, 0))
      ctx.fillStyle = originGlow
      ctx.beginPath()
      ctx.arc(origin.x, origin.y, oRadius * 2.5, 0, Math.PI * 2)
      ctx.fill()

      // Origin core
      ctx.beginPath()
      ctx.arc(origin.x, origin.y, oRadius, 0, Math.PI * 2)
      ctx.fillStyle = rgba(COLORS.accent, 0.85)
      ctx.fill()

      // Origin label
      const fontSize = Math.max(8, Math.min(w, h) * 0.028)
      ctx.font = getCanvasFont(500, fontSize)
      ctx.textAlign = "center"
      ctx.fillStyle = rgba(COLORS.accent, 0.8)
      ctx.fillText("BITMERN", origin.x, origin.y + oRadius + fontSize * 1.3)
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
