"use client"

import { useRef, useCallback } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeOutCubic, resolveThemeColors, getCanvasFont, rgba } from "@/lib/animation-utils"

// ---------- Types ----------

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  wobble: number
  wobbleSpeed: number
  wobbleAmount: number
  type: "btc" | "dot"
}

interface ProfitNumber {
  x: number
  y: number
  value: string
  speed: number
  opacity: number
  maxOpacity: number
  fadeInY: number
  fadeOutY: number
}

interface Pulse {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  startTime: number
}

// ---------- Config (identical to Webflow) ----------

const CONFIG = {
  particleCount: 18,
  profitNumberCount: 5,
  pulseInterval: 4000,
  pulseDuration: 2000,
  gridSpacing: 70,
  gridOpacity: 0.055,
} as const

const PROFIT_VALUES = [
  "+0.00042",
  "+0.00089",
  "+0.00156",
  "+0.00234",
  "+0.00312",
  "+0.00067",
  "+0.00198",
]

// ---------- Component ----------

export function MiningProfitsAnimation({ className }: { className?: string }) {
  const colorsRef = useRef(resolveThemeColors())

  const stateRef = useRef({
    particles: [] as Particle[],
    profitNumbers: [] as ProfitNumber[],
    pulses: [] as Pulse[],
    globalTime: 0,
    lastPulseTime: 0,
    w: 0,
    h: 0,
  })

  const createParticle = useCallback((w: number, h: number): Particle => {
    const size = 2.5 + Math.random() * 4.5
    return {
      x: Math.random() * w,
      y: h + Math.random() * 100,
      size,
      speed: 0.055 + Math.random() * 0.035,
      opacity: 0.4 + Math.random() * 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.003 + Math.random() * 0.002,
      wobbleAmount: 10 + Math.random() * 15,
      type: Math.random() > 0.75 ? "btc" : "dot",
    }
  }, [])

  const createProfitNumber = useCallback((w: number, h: number): ProfitNumber => {
    return {
      x: Math.random() * w * 0.65 + w * 0.175,
      y: h + 40 + Math.random() * 80,
      value: PROFIT_VALUES[Math.floor(Math.random() * PROFIT_VALUES.length)],
      speed: 0.045 + Math.random() * 0.025,
      opacity: 0,
      maxOpacity: 0.3 + Math.random() * 0.18,
      fadeInY: h * 0.88,
      fadeOutY: h * 0.12,
    }
  }, [])

  const createPulse = useCallback((w: number, h: number, time: number): Pulse => {
    return {
      x: w * 0.18 + Math.random() * w * 0.64,
      y: h * 0.28 + Math.random() * h * 0.44,
      radius: 0,
      maxRadius: 65 + Math.random() * 25,
      opacity: 0.45,
      startTime: time,
    }
  }, [])

  const canvasRef = useCanvasAnimation({
    init(_ctx, w, h) {
      colorsRef.current = resolveThemeColors()

      const s = stateRef.current
      s.w = w
      s.h = h

      // Init particles — spread across canvas
      s.particles = []
      for (let i = 0; i < CONFIG.particleCount; i++) {
        const p = createParticle(w, h)
        p.y = Math.random() * (h + 100)
        s.particles.push(p)
      }

      // Init profit numbers — spread vertically
      s.profitNumbers = []
      for (let i = 0; i < CONFIG.profitNumberCount; i++) {
        const pn = createProfitNumber(w, h)
        pn.y = h * 0.25 + Math.random() * h * 0.55
        pn.opacity = pn.maxOpacity * 0.6
        s.profitNumbers.push(pn)
      }

      // Reset pulses on resize
      s.pulses = []
    },

    draw(ctx, w, h, delta) {
      const s = stateRef.current
      s.w = w
      s.h = h
      s.globalTime += delta

      // --- Update ---

      // Particles
      for (let i = 0; i < s.particles.length; i++) {
        const p = s.particles[i]
        p.y -= p.speed * delta
        p.wobble += p.wobbleSpeed * delta
        p.x += Math.sin(p.wobble) * 0.15
        if (p.y < -25) {
          s.particles[i] = createParticle(w, h)
        }
      }

      // Profit numbers
      for (let i = 0; i < s.profitNumbers.length; i++) {
        const pn = s.profitNumbers[i]
        pn.y -= pn.speed * delta

        if (pn.y > pn.fadeInY) {
          pn.opacity = Math.min(
            pn.maxOpacity,
            ((h - pn.y) / (h - pn.fadeInY)) * pn.maxOpacity,
          )
        } else if (pn.y < pn.fadeOutY) {
          pn.opacity = Math.max(0, (pn.y / pn.fadeOutY) * pn.maxOpacity)
        } else {
          pn.opacity = pn.maxOpacity
        }

        if (pn.y < -35) {
          s.profitNumbers[i] = createProfitNumber(w, h)
        }
      }

      // Spawn pulses
      if (s.globalTime - s.lastPulseTime > CONFIG.pulseInterval) {
        s.pulses.push(createPulse(w, h, s.globalTime))
        s.lastPulseTime = s.globalTime
      }

      // Update pulses
      s.pulses = s.pulses.filter((pulse) => {
        const elapsed = s.globalTime - pulse.startTime
        const progress = elapsed / CONFIG.pulseDuration
        if (progress >= 1) return false
        pulse.radius = pulse.maxRadius * easeOutCubic(progress)
        pulse.opacity = 0.45 * (1 - progress * progress)
        return true
      })

      // --- Render ---

      ctx.clearRect(0, 0, w, h)

      // Grid
      ctx.strokeStyle = rgba(colorsRef.current.base, CONFIG.gridOpacity)
      ctx.lineWidth = 1
      for (let x = CONFIG.gridSpacing; x < w; x += CONFIG.gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = CONFIG.gridSpacing; y < h; y += CONFIG.gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Pulses
      for (const pulse of s.pulses) {
        const grad = ctx.createRadialGradient(
          pulse.x,
          pulse.y,
          0,
          pulse.x,
          pulse.y,
          pulse.radius,
        )
        grad.addColorStop(0, rgba(colorsRef.current.success, pulse.opacity * 0.3))
        grad.addColorStop(0.45, rgba(colorsRef.current.accent, pulse.opacity * 0.12))
        grad.addColorStop(1, rgba(colorsRef.current.accent, 0))
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2)
        ctx.fill()

        // Center glow
        if (pulse.opacity > 0.08) {
          ctx.fillStyle = rgba(colorsRef.current.success, pulse.opacity * 0.7)
          ctx.beginPath()
          ctx.arc(pulse.x, pulse.y, 3.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Profit numbers
      for (const pn of s.profitNumbers) {
        if (pn.opacity < 0.03) continue
        const fontSize = Math.max(9, Math.min(w, h) * 0.025)
        ctx.font = getCanvasFont(500, fontSize)
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = rgba(colorsRef.current.success, pn.opacity)
        ctx.fillText(`${pn.value} BTC`, pn.x, pn.y)
      }

      // Particles
      for (const p of s.particles) {
        if (p.type === "btc") {
          // BTC symbol with glow
          ctx.save()
          ctx.translate(p.x, p.y)
          const scale = p.size / 11
          ctx.scale(scale, scale)
          ctx.shadowColor = rgba(colorsRef.current.accent, p.opacity * 0.35)
          ctx.shadowBlur = 6
          ctx.fillStyle = rgba(colorsRef.current.accent, p.opacity)
          ctx.font = "bold 18px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("\u20BF", 0, 0)
          ctx.restore()
        } else {
          // Dot with radial gradient
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          grad.addColorStop(0, rgba(colorsRef.current.accent, p.opacity * 0.85))
          grad.addColorStop(0.5, rgba(colorsRef.current.accent, p.opacity * 0.35))
          grad.addColorStop(1, rgba(colorsRef.current.accent, 0))
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    },
  })

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
