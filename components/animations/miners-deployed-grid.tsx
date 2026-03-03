"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeOutCubic, resolveThemeColors, rgba, type AnimColors } from "@/lib/animation-utils"

// Initialized in init() — avoid calling resolveThemeColors() at module scope (SSR)
let COLORS: AnimColors = null as unknown as AnimColors

// --- Types ---
interface GridSlot {
  x: number
  y: number
  occupied: boolean
  node: ActiveNode | null
}

interface IncomingNode {
  x: number
  y: number
  targetX: number
  targetY: number
  startX: number
  startY: number
  progress: number
  speed: number
  slot: GridSlot
  settled: boolean
}

interface ActiveNode {
  x: number
  y: number
  phase: number
  intensity: number
  settleTime: number
  fading: boolean
  fadeStart: number
}

// --- Component ---
export function MinersDeployedGrid({ className }: { className?: string }) {
  const gridSlotsRef = useRef<GridSlot[]>([])
  const incomingNodesRef = useRef<IncomingNode[]>([])
  const activeNodesRef = useRef<ActiveNode[]>([])
  const globalTimeRef = useRef(0)
  // Gradient cache — avoids createRadialGradient per node per frame
  const glowCacheRef = useRef<Map<ActiveNode, { gradient: CanvasGradient; radius: number; alpha: number }>>(new Map())

  const initGrid = useCallback((w: number, h: number) => {
    const slots: GridSlot[] = []

    // Grid sizing — verbatim from Webflow
    const nodeSize = Math.min(w, h) * 0.055
    const spacing = nodeSize * 2
    const edgePadding = nodeSize * 0.8
    const availableWidth = w - edgePadding * 2
    const availableHeight = h - edgePadding * 2
    const cols = Math.max(2, Math.floor(availableWidth / spacing) + 1)
    const rows = Math.max(2, Math.floor(availableHeight / spacing) + 1)
    const actualSpacingX = cols > 1 ? availableWidth / (cols - 1) : 0
    const actualSpacingY = rows > 1 ? availableHeight / (rows - 1) : 0

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        slots.push({
          x: edgePadding + col * actualSpacingX,
          y: edgePadding + row * actualSpacingY,
          occupied: false,
          node: null,
        })
      }
    }

    // Shuffle for random fill order
    for (let i = slots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[slots[i], slots[j]] = [slots[j], slots[i]]
    }

    return slots
  }, [])

  const init = useCallback(
    (_ctx: CanvasRenderingContext2D, w: number, h: number) => {
      COLORS = resolveThemeColors()
      gridSlotsRef.current = initGrid(w, h)
      incomingNodesRef.current = []
      activeNodesRef.current = []
      globalTimeRef.current = 0
      glowCacheRef.current.clear()
    },
    [initGrid]
  )

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, delta: number) => {
      const gridSlots = gridSlotsRef.current
      let incomingNodes = incomingNodesRef.current
      let activeNodes = activeNodesRef.current
      const globalTime = globalTimeRef.current + delta
      globalTimeRef.current = globalTime

      const nodeRadius = Math.min(w, h) * 0.022

      // --- Spawn new nodes (2.5% chance per frame, max 5 in-flight) ---
      if (Math.random() < 0.025 && incomingNodes.length < 5) {
        const availableSlot = gridSlots.find((s) => !s.occupied)
        if (!availableSlot) {
          // All slots filled — reset grid: fade out active, mark unoccupied
          gridSlots.forEach((s) => {
            s.occupied = false
            if (s.node) {
              s.node.fading = true
              s.node.fadeStart = globalTime
            }
            s.node = null
          })
        } else {
          availableSlot.occupied = true

          // Spawn from random edge
          const edge = Math.floor(Math.random() * 4)
          let startX = 0
          let startY = 0
          switch (edge) {
            case 0: // top
              startX = Math.random() * w
              startY = -20
              break
            case 1: // right
              startX = w + 20
              startY = Math.random() * h
              break
            case 2: // bottom
              startX = Math.random() * w
              startY = h + 20
              break
            case 3: // left
              startX = -20
              startY = Math.random() * h
              break
          }

          incomingNodes.push({
            x: startX,
            y: startY,
            targetX: availableSlot.x,
            targetY: availableSlot.y,
            startX,
            startY,
            progress: 0,
            speed: 0.0008 + Math.random() * 0.0003,
            slot: availableSlot,
            settled: false,
          })
        }
      }

      // --- Update incoming nodes ---
      for (const node of incomingNodes) {
        node.progress += node.speed * delta
        const t = easeOutCubic(Math.min(node.progress, 1))
        node.x = node.startX + (node.targetX - node.startX) * t
        node.y = node.startY + (node.targetY - node.startY) * t

        if (node.progress >= 1 && !node.settled) {
          node.settled = true
          node.x = node.targetX
          node.y = node.targetY

          const active: ActiveNode = {
            x: node.targetX,
            y: node.targetY,
            phase: Math.random() * Math.PI * 2,
            intensity: 0,
            settleTime: globalTime,
            fading: false,
            fadeStart: 0,
          }
          node.slot.node = active
          activeNodes.push(active)
        }
      }
      incomingNodes = incomingNodes.filter((n) => !n.settled)
      incomingNodesRef.current = incomingNodes

      // --- Update active nodes ---
      for (const node of activeNodes) {
        node.phase += delta * 0.002
        const timeSinceSettle = globalTime - node.settleTime
        node.intensity = Math.min(1, timeSinceSettle / 500)

        if (node.fading) {
          const fadeTime = globalTime - node.fadeStart
          node.intensity = Math.max(0, 1 - fadeTime / 400)
        }
      }
      activeNodes = activeNodes.filter((n) => !n.fading || n.intensity > 0)
      activeNodesRef.current = activeNodes
      // Prune stale gradient cache entries for removed nodes
      for (const key of glowCacheRef.current.keys()) {
        if (!activeNodes.includes(key)) glowCacheRef.current.delete(key)
      }

      // --- Render ---
      ctx.clearRect(0, 0, w, h)

      // Empty slots — subtle placeholder dots
      for (const slot of gridSlots) {
        if (!slot.node) {
          ctx.beginPath()
          ctx.arc(slot.x, slot.y, nodeRadius * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = rgba(COLORS.dim, 0.15)
          ctx.fill()
        }
      }

      // Settled nodes
      const glowCache = glowCacheRef.current
      for (const node of activeNodes) {
        const pulse = Math.sin(node.phase) * 0.15 + 0.85
        const radius = nodeRadius * pulse
        const alpha = node.intensity
        const glowRadius = radius * 2.5

        // Glow — cache gradient per node, recreate only when radius or alpha shift significantly
        const cached = glowCache.get(node)
        const alphaKey = Math.round(alpha * 20) // quantize to ~5% steps
        const radiusKey = Math.round(glowRadius * 2)
        let glow: CanvasGradient
        if (cached && Math.round(cached.radius * 2) === radiusKey && Math.round(cached.alpha * 20) === alphaKey) {
          glow = cached.gradient
        } else {
          glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius)
          glow.addColorStop(0, rgba(COLORS.accent, 0.2 * alpha))
          glow.addColorStop(0.5, rgba(COLORS.accent, 0.05 * alpha))
          glow.addColorStop(1, rgba(COLORS.accent, 0))
          glowCache.set(node, { gradient: glow, radius: glowRadius, alpha })
        }
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Outer ring
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 1.2, 0, Math.PI * 2)
        ctx.strokeStyle = rgba(COLORS.accent, 0.25 * alpha)
        ctx.lineWidth = 1
        ctx.stroke()

        // Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = rgba(COLORS.accent, 0.85 * alpha)
        ctx.fill()
      }

      // Incoming nodes on top
      for (const node of incomingNodes) {
        // Trail
        const dx = node.x - node.startX
        const dy = node.y - node.startY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 5) {
          const trailX = node.x - (dx / dist) * nodeRadius * 3
          const trailY = node.y - (dy / dist) * nodeRadius * 3
          const trailGradient = ctx.createLinearGradient(trailX, trailY, node.x, node.y)
          trailGradient.addColorStop(0, rgba(COLORS.accent, 0))
          trailGradient.addColorStop(1, rgba(COLORS.accent, 0.4))
          ctx.beginPath()
          ctx.moveTo(trailX, trailY)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = trailGradient
          ctx.lineWidth = nodeRadius * 0.8
          ctx.lineCap = "round"
          ctx.stroke()
        }

        // Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = rgba(COLORS.accent, 0.9)
        ctx.fill()
      }
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
