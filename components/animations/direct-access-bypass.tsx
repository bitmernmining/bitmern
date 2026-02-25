"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeInOutCubic, resolveThemeColors, getCanvasFont, rgba } from "@/lib/animation-utils"

interface Node {
  x: number
  y: number
  radius: number
  phase: number
}

interface ArcPath {
  startX: number
  startY: number
  endX: number
  endY: number
  controlY: number
}

interface Pulse {
  progress: number
  speed: number
  intensity: number
}

export function DirectAccessBypass({ className }: { className?: string }) {
  const colorsRef = useRef(resolveThemeColors())
  const globalTime = useRef(0)
  const manufacturerNode = useRef<Node>({ x: 0, y: 0, radius: 0, phase: 0 })
  const middlemanNode = useRef<Node>({ x: 0, y: 0, radius: 0, phase: 0 })
  const bitmernNode = useRef<Node>({ x: 0, y: 0, radius: 0, phase: 0 })
  const arcPath = useRef<ArcPath>({ startX: 0, startY: 0, endX: 0, endY: 0, controlY: 0 })
  const pulses = useRef<Pulse[]>([])
  const dims = useRef({ width: 0, height: 0 })

  const getPointOnArc = useCallback((t: number) => {
    const arc = arcPath.current
    const w = dims.current.width
    const mt = 1 - t
    const controlX = w * 0.5
    return {
      x: mt * mt * arc.startX + 2 * mt * t * controlX + t * t * arc.endX,
      y: mt * mt * arc.startY + 2 * mt * t * arc.controlY + t * t * arc.endY,
    }
  }, [])

  const canvasRef = useCanvasAnimation({
    init(_ctx, width, height) {
      colorsRef.current = resolveThemeColors()
      dims.current = { width, height }

      const padding = width * 0.12
      const baseY = height * 0.65
      const nodeSize = Math.min(width, height) * 0.05

      manufacturerNode.current = { x: padding, y: baseY, radius: nodeSize, phase: 0 }
      middlemanNode.current = { x: width * 0.5, y: baseY, radius: nodeSize * 0.6, phase: 0 }
      bitmernNode.current = { x: width - padding, y: baseY, radius: nodeSize * 1.1, phase: 0 }

      const arcHeight = height * 0.35
      arcPath.current = {
        startX: manufacturerNode.current.x,
        startY: manufacturerNode.current.y,
        endX: bitmernNode.current.x,
        endY: bitmernNode.current.y,
        controlY: baseY - arcHeight,
      }

      pulses.current = []
    },

    draw(ctx, width, height, delta) {
      const w = width
      const h = height

      // --- Update ---
      globalTime.current += delta

      if (pulses.current.length < 2 && Math.random() < 0.004) {
        pulses.current.push({
          progress: 0,
          speed: 0.00035 + Math.random() * 0.0001,
          intensity: 0.85 + Math.random() * 0.15,
        })
      }

      manufacturerNode.current.phase += delta * 0.0015
      middlemanNode.current.phase += delta * 0.001
      bitmernNode.current.phase += delta * 0.0018

      for (const pulse of pulses.current) {
        pulse.progress += pulse.speed * delta
      }
      pulses.current = pulses.current.filter((p) => p.progress < 1.1)

      // --- Render ---
      ctx.clearRect(0, 0, w, h)

      const arc = arcPath.current
      const mfr = manufacturerNode.current
      const mid = middlemanNode.current
      const btm = bitmernNode.current
      const controlX = w * 0.5

      // Bypassed path (dashed, faint)
      ctx.beginPath()
      ctx.moveTo(mfr.x, mfr.y)
      ctx.lineTo(mid.x, mid.y)
      ctx.lineTo(btm.x, btm.y)
      ctx.strokeStyle = rgba(colorsRef.current.dim, 0.15)
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.stroke()
      ctx.setLineDash([])

      // Arc glow
      ctx.beginPath()
      ctx.moveTo(arc.startX, arc.startY)
      ctx.quadraticCurveTo(controlX, arc.controlY, arc.endX, arc.endY)
      ctx.strokeStyle = rgba(colorsRef.current.accent, 0.12)
      ctx.lineWidth = 8
      ctx.lineCap = "round"
      ctx.stroke()

      // Arc main line
      ctx.beginPath()
      ctx.moveTo(arc.startX, arc.startY)
      ctx.quadraticCurveTo(controlX, arc.controlY, arc.endX, arc.endY)
      ctx.strokeStyle = rgba(colorsRef.current.accent, 0.35)
      ctx.lineWidth = 3
      ctx.stroke()

      // Pulses on arc
      for (const pulse of pulses.current) {
        if (pulse.progress > 1) continue
        const easedProgress = easeInOutCubic(Math.min(pulse.progress, 1))
        const pos = getPointOnArc(easedProgress)

        // Trail
        const prevProgress = Math.max(0, easedProgress - 0.08)
        const prevPos = getPointOnArc(prevProgress)

        const trailGradient = ctx.createLinearGradient(prevPos.x, prevPos.y, pos.x, pos.y)
        trailGradient.addColorStop(0, rgba(colorsRef.current.accent, 0))
        trailGradient.addColorStop(1, rgba(colorsRef.current.accent, 0.5 * pulse.intensity))

        ctx.beginPath()
        ctx.moveTo(prevPos.x, prevPos.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.strokeStyle = trailGradient
        ctx.lineWidth = 4
        ctx.lineCap = "round"
        ctx.stroke()

        // Active arc highlight
        ctx.beginPath()
        ctx.moveTo(arc.startX, arc.startY)
        const steps = 30
        for (let i = 1; i <= steps; i++) {
          const t = (i / steps) * easedProgress
          const pt = getPointOnArc(t)
          ctx.lineTo(pt.x, pt.y)
        }
        ctx.strokeStyle = rgba(colorsRef.current.accent, 0.25 * pulse.intensity)
        ctx.lineWidth = 3
        ctx.stroke()

        // Glow
        const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 12)
        glowGradient.addColorStop(0, rgba(colorsRef.current.accent, 0.7 * pulse.intensity))
        glowGradient.addColorStop(0.4, rgba(colorsRef.current.accent, 0.25 * pulse.intensity))
        glowGradient.addColorStop(1, rgba(colorsRef.current.accent, 0))
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = rgba(colorsRef.current.accent, pulse.intensity)
        ctx.fill()
      }

      // --- Middleman node (bypassed, center) ---
      {
        const pulse = Math.sin(mid.phase) * 0.05 + 0.95
        const radius = mid.radius * pulse

        // Subtle glow (dimmed)
        const glowRadius = radius * 2
        const gradient = ctx.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, glowRadius)
        gradient.addColorStop(0, rgba(colorsRef.current.dim, 0.1))
        gradient.addColorStop(1, rgba(colorsRef.current.dim, 0))
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mid.x, mid.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Core (dimmed)
        ctx.beginPath()
        ctx.arc(mid.x, mid.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = rgba(colorsRef.current.dim, 0.3)
        ctx.fill()

        // Dashed ring (bypassed indicator)
        ctx.beginPath()
        ctx.arc(mid.x, mid.y, radius * 1.4, 0, Math.PI * 2)
        ctx.strokeStyle = rgba(colorsRef.current.dim, 0.2)
        ctx.lineWidth = 1
        ctx.setLineDash([3, 3])
        ctx.stroke()
        ctx.setLineDash([])

        // Label
        const fontSize = Math.max(7, Math.min(w, h) * 0.025)
        ctx.font = getCanvasFont(500, fontSize)
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = rgba(colorsRef.current.dim, 0.4)
        ctx.fillText("MIDDLEMAN", mid.x, mid.y + radius + fontSize * 1.3)
      }

      // --- Manufacturer node (left) ---
      {
        const pulse = Math.sin(mfr.phase) * 0.08 + 0.92
        const radius = mfr.radius * pulse

        // Glow
        const glowRadius = radius * 2.2
        const gradient = ctx.createRadialGradient(mfr.x, mfr.y, 0, mfr.x, mfr.y, glowRadius)
        gradient.addColorStop(0, rgba(colorsRef.current.base, 0.15))
        gradient.addColorStop(1, rgba(colorsRef.current.base, 0))
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mfr.x, mfr.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(mfr.x, mfr.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = rgba(colorsRef.current.base, 0.65)
        ctx.fill()

        // Label
        const fontSize = Math.max(8, Math.min(w, h) * 0.028)
        ctx.font = getCanvasFont(500, fontSize)
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = rgba(colorsRef.current.base, 0.55)
        ctx.fillText("MANUFACTURER", mfr.x, mfr.y + radius + fontSize * 1.3)
      }

      // --- Bitmern node (right, prominent) ---
      {
        const pulse = Math.sin(btm.phase) * 0.1 + 0.9
        const radius = btm.radius * pulse

        // Outer glow
        const glowRadius = radius * 2.8
        const gradient = ctx.createRadialGradient(btm.x, btm.y, 0, btm.x, btm.y, glowRadius)
        gradient.addColorStop(0, rgba(colorsRef.current.accent, 0.22))
        gradient.addColorStop(0.4, rgba(colorsRef.current.accent, 0.08))
        gradient.addColorStop(1, rgba(colorsRef.current.accent, 0))
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(btm.x, btm.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Ring
        ctx.beginPath()
        ctx.arc(btm.x, btm.y, radius * 1.25, 0, Math.PI * 2)
        ctx.strokeStyle = rgba(colorsRef.current.accent, 0.35)
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Core
        ctx.beginPath()
        ctx.arc(btm.x, btm.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = rgba(colorsRef.current.accent, 0.9)
        ctx.fill()

        // Label
        const fontSize = Math.max(8, Math.min(w, h) * 0.028)
        ctx.font = getCanvasFont(500, fontSize)
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = rgba(colorsRef.current.accent, 0.85)
        ctx.fillText("BITMERN", btm.x, btm.y + radius + fontSize * 1.3)
      }
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
