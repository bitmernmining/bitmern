"use client"

import { useRef } from "react"
import { useCanvasAnimation } from "@/hooks/use-canvas-animation"
import { easeInOutCubic, lerp, rgba, ANIM_COLORS } from "@/lib/animation-utils"

// --- Webflow-identical config ---

const SOURCE_COLORS = [
  { r: 242, g: 174, b: 46 },
  { r: 220, g: 160, b: 60 },
  { r: 255, g: 190, b: 50 },
]

const DEST_COUNT = 5
const SIGNAL_SPAWN_RATE = 0.006
const HUB_PULSE_SPEED = 0.002
const SOURCE_PULSE_SPEED = 0.0015
const DEST_PULSE_SPEED = 0.0015

// --- Types ---

interface Vec2 {
  x: number
  y: number
}

interface Source extends Vec2 {
  colorIndex: number
  phase: number
}

interface Hub extends Vec2 {
  radius: number
  pulsePhase: number
}

interface Destination extends Vec2 {
  pulsePhase: number
  activeUntil: number
}

interface Pathway {
  type: "toHub" | "fromHub"
  from: Vec2
  to: Vec2
  sourceIndex?: number
  destIndex?: number
  cp1x: number
  cp1y: number
  cp2x: number
  cp2y: number
}

interface TrailPoint {
  x: number
  y: number
  age: number
  intensity: number
}

interface Signal {
  phase: "toHub" | "fromHub"
  path: Pathway
  progress: number
  speed: number
  sourceIndex: number
  destIndex: number
  intensity: number
  trail: TrailPoint[]
  trailLength: number
  transitioned: boolean
}

interface HubParticle {
  angle: number
  radius: number
  targetRadius: number
  rotationSpeed: number
  life: number
  maxLife: number
  destIndex: number
  intensity: number
  sourceIndex: number
  dispatched: boolean
}

interface Label {
  text: string
  x: number
  y: number
}

// --- Mutable animation state ---

interface AnimState {
  globalTime: number
  sources: Source[]
  hub: Hub
  destinations: Destination[]
  pathways: Pathway[]
  signals: Signal[]
  hubParticles: HubParticle[]
  labels: { left: Label; center: Label; right: Label }
}

function createState(): AnimState {
  return {
    globalTime: 0,
    sources: [],
    hub: { x: 0, y: 0, radius: 0, pulsePhase: 0 },
    destinations: [],
    pathways: [],
    signals: [],
    hubParticles: [],
    labels: {
      left: { text: "MANUFACTURER", x: 0, y: 0 },
      center: { text: "BITMERN", x: 0, y: 0 },
      right: { text: "LOCATION", x: 0, y: 0 },
    },
  }
}

// --- Easing helpers not in shared utils ---

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t)
}

function easeInQuad(t: number): number {
  return t * t
}

// --- Bezier math ---

function getPointOnBezier(path: Pathway, t: number): Vec2 {
  const mt = 1 - t
  const mt2 = mt * mt
  const mt3 = mt2 * mt
  const t2 = t * t
  const t3 = t2 * t
  return {
    x:
      mt3 * path.from.x +
      3 * mt2 * t * path.cp1x +
      3 * mt * t2 * path.cp2x +
      t3 * path.to.x,
    y:
      mt3 * path.from.y +
      3 * mt2 * t * path.cp1y +
      3 * mt * t2 * path.cp2y +
      t3 * path.to.y,
  }
}

// --- Network layout (matches Webflow exactly) ---

function initNetwork(s: AnimState, w: number, h: number) {
  const padding = Math.min(w, h) * 0.08
  const sourceX = padding + w * 0.08
  const hubX = w * 0.5
  const destX = w - padding - w * 0.08
  const hubY = h * 0.5
  const sourceSpacing = (h - padding * 2) / 4

  s.sources = [
    { x: sourceX, y: padding + sourceSpacing, colorIndex: 0, phase: 0 },
    { x: sourceX, y: h * 0.5, colorIndex: 1, phase: Math.PI * 0.66 },
    {
      x: sourceX,
      y: h - padding - sourceSpacing,
      colorIndex: 2,
      phase: Math.PI * 1.33,
    },
  ]

  s.hub = {
    x: hubX,
    y: hubY,
    radius: Math.min(w, h) * 0.04,
    pulsePhase: 0,
  }

  const destSpacing = (h - padding * 2) / (DEST_COUNT + 1)
  s.destinations = []
  for (let i = 0; i < DEST_COUNT; i++) {
    s.destinations.push({
      x: destX,
      y: padding + destSpacing * (i + 1),
      pulsePhase: Math.random() * Math.PI * 2,
      activeUntil: 0,
    })
  }

  // Labels
  const labelOffset = Math.min(w, h) * 0.06
  s.labels.left.x = sourceX
  s.labels.left.y = padding - labelOffset * 0.3
  s.labels.center.x = hubX
  s.labels.center.y = hubY + s.hub.radius + labelOffset * 0.8
  s.labels.right.x = destX
  s.labels.right.y = padding - labelOffset * 0.3

  // Pathways
  s.pathways = []

  s.sources.forEach((source, i) => {
    const controlOffset = (hubX - sourceX) * 0.45
    s.pathways.push({
      type: "toHub",
      from: source,
      to: s.hub,
      sourceIndex: i,
      cp1x: source.x + controlOffset,
      cp1y: source.y,
      cp2x: s.hub.x - controlOffset * 0.8,
      cp2y: s.hub.y + (source.y - s.hub.y) * 0.25,
    })
  })

  s.destinations.forEach((dest, i) => {
    const controlOffset = (destX - hubX) * 0.45
    s.pathways.push({
      type: "fromHub",
      from: s.hub,
      to: dest,
      destIndex: i,
      cp1x: s.hub.x + controlOffset * 0.8,
      cp1y: s.hub.y + (dest.y - s.hub.y) * 0.25,
      cp2x: dest.x - controlOffset,
      cp2y: dest.y,
    })
  })

  s.signals = []
  s.hubParticles = []
}

// --- Spawn / dispatch ---

function spawnSignal(s: AnimState) {
  const sourceIndex = Math.floor(Math.random() * s.sources.length)
  const sourcePath = s.pathways.find(
    (p) => p.type === "toHub" && p.sourceIndex === sourceIndex
  )
  if (sourcePath) {
    s.signals.push({
      phase: "toHub",
      path: sourcePath,
      progress: 0,
      speed: 0.0005 + Math.random() * 0.00015,
      sourceIndex,
      destIndex: Math.floor(Math.random() * s.destinations.length),
      intensity: 0.9 + Math.random() * 0.1,
      trail: [],
      trailLength: 20 + Math.floor(Math.random() * 8),
      transitioned: false,
    })
  }
}

function spawnHubParticle(s: AnimState, signal: Signal) {
  s.hubParticles.push({
    angle: Math.atan2(
      signal.path.from.y - s.hub.y,
      signal.path.from.x - s.hub.x
    ),
    radius: s.hub.radius * 0.7,
    targetRadius: s.hub.radius * 1.1,
    rotationSpeed: 0.003 + Math.random() * 0.0015,
    life: 0,
    maxLife: 350 + Math.random() * 200,
    destIndex: signal.destIndex,
    intensity: signal.intensity,
    sourceIndex: signal.sourceIndex,
    dispatched: false,
  })
}

function dispatchFromHub(s: AnimState, particle: HubParticle) {
  const destPath = s.pathways.find(
    (p) => p.type === "fromHub" && p.destIndex === particle.destIndex
  )
  if (destPath) {
    s.signals.push({
      phase: "fromHub",
      path: destPath,
      progress: 0,
      speed: 0.0006 + Math.random() * 0.00015,
      sourceIndex: particle.sourceIndex,
      destIndex: particle.destIndex,
      intensity: particle.intensity * 0.95,
      trail: [],
      trailLength: 18 + Math.floor(Math.random() * 6),
      transitioned: false,
    })
    s.destinations[particle.destIndex].activeUntil = s.globalTime + 800
  }
}

// --- Update ---

function update(s: AnimState, dt: number) {
  s.globalTime += dt

  if (Math.random() < SIGNAL_SPAWN_RATE) {
    spawnSignal(s)
  }

  s.hub.pulsePhase += dt * HUB_PULSE_SPEED

  for (const source of s.sources) {
    source.phase += dt * SOURCE_PULSE_SPEED
  }
  for (const dest of s.destinations) {
    dest.pulsePhase += dt * DEST_PULSE_SPEED
  }

  // Signals
  for (const signal of s.signals) {
    signal.progress += signal.speed * dt
    const easedProgress = easeInOutCubic(Math.min(signal.progress, 1))
    const pos = getPointOnBezier(signal.path, easedProgress)
    signal.trail.unshift({
      x: pos.x,
      y: pos.y,
      age: 0,
      intensity: signal.intensity,
    })
    if (signal.trail.length > signal.trailLength) signal.trail.pop()
    for (const t of signal.trail) {
      t.age += dt * 0.003
      t.intensity *= 0.997
    }
    if (signal.progress >= 1 && !signal.transitioned) {
      signal.transitioned = true
      if (signal.phase === "toHub") {
        spawnHubParticle(s, signal)
      }
    }
  }
  s.signals = s.signals.filter((sig) => sig.progress < 1.15)

  // Hub particles
  for (const particle of s.hubParticles) {
    particle.angle += particle.rotationSpeed * dt
    particle.life += dt
    const lifeRatio = particle.life / particle.maxLife
    particle.radius = lerp(
      s.hub.radius * 0.7,
      particle.targetRadius,
      easeOutQuad(Math.min(lifeRatio * 2, 1))
    )
    if (particle.life >= particle.maxLife && !particle.dispatched) {
      particle.dispatched = true
      dispatchFromHub(s, particle)
    }
  }
  s.hubParticles = s.hubParticles.filter((p) => p.life < p.maxLife + 80)
}

// --- Draw helpers ---

function drawBezierPath(
  ctx: CanvasRenderingContext2D,
  path: Pathway,
  alpha: number
) {
  ctx.beginPath()
  ctx.moveTo(path.from.x, path.from.y)
  ctx.bezierCurveTo(path.cp1x, path.cp1y, path.cp2x, path.cp2y, path.to.x, path.to.y)
  ctx.strokeStyle = rgba(ANIM_COLORS.dim, alpha)
  ctx.lineWidth = 1
  ctx.stroke()
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  label: Label,
  isCenter: boolean,
  w: number,
  h: number
) {
  const fontSize = Math.max(10, Math.min(w, h) * 0.032)
  ctx.font = `500 ${fontSize}px "JetBrains Mono", "SF Mono", "Fira Code", monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  if (isCenter) {
    ctx.shadowColor = rgba(ANIM_COLORS.accent, 0.3)
    ctx.shadowBlur = 8
    ctx.fillStyle = rgba(ANIM_COLORS.accent, 0.9)
  } else {
    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0
    ctx.fillStyle = rgba(ANIM_COLORS.base, 0.5)
  }

  ctx.fillText(label.text, label.x, label.y)
  ctx.shadowColor = "transparent"
  ctx.shadowBlur = 0
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  isHub: boolean,
  isSource: boolean,
  pulsePhase: number,
  colorIndex: number
) {
  const pulse = Math.sin(pulsePhase || 0) * 0.12 + 0.88
  const currentRadius = radius * pulse

  if (isHub) {
    const glowRadius = currentRadius * 3.2
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
    gradient.addColorStop(0, rgba(ANIM_COLORS.accent, 0.18))
    gradient.addColorStop(0.35, rgba(ANIM_COLORS.accent, 0.08))
    gradient.addColorStop(1, rgba(ANIM_COLORS.accent, 0))
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(x, y, currentRadius * 1.25, 0, Math.PI * 2)
    ctx.strokeStyle = rgba(ANIM_COLORS.accent, 0.3)
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(x, y, currentRadius, 0, Math.PI * 2)
    ctx.fillStyle = rgba(ANIM_COLORS.accent, 0.9)
    ctx.fill()
  } else if (isSource) {
    const col = SOURCE_COLORS[colorIndex] || ANIM_COLORS.accent
    const glowRadius = currentRadius * 2.2
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
    gradient.addColorStop(0, rgba(col, 0.15))
    gradient.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(x, y, currentRadius, 0, Math.PI * 2)
    ctx.fillStyle = rgba(col, 0.75)
    ctx.fill()
  } else {
    ctx.beginPath()
    ctx.arc(x, y, currentRadius, 0, Math.PI * 2)
    ctx.fillStyle = rgba(ANIM_COLORS.base, 0.4)
    ctx.fill()
  }
}

function drawSignal(ctx: CanvasRenderingContext2D, signal: Signal) {
  if (signal.progress > 1.1) return

  const easedProgress = easeInOutCubic(Math.min(signal.progress, 1))
  const pos = getPointOnBezier(signal.path, easedProgress)
  const col = SOURCE_COLORS[signal.sourceIndex] || ANIM_COLORS.accent

  // Trail
  if (signal.trail.length > 1) {
    for (let i = 0; i < signal.trail.length - 1; i++) {
      const point = signal.trail[i]
      const nextPoint = signal.trail[i + 1]
      const trailProgress = 1 - i / signal.trail.length
      const alpha = trailProgress * point.intensity * 0.6 * (1 - point.age)
      if (alpha <= 0.01) continue
      ctx.beginPath()
      ctx.moveTo(point.x, point.y)
      ctx.lineTo(nextPoint.x, nextPoint.y)
      ctx.strokeStyle = rgba(col, alpha)
      ctx.lineWidth = 2.5 * trailProgress + 0.5
      ctx.lineCap = "round"
      ctx.stroke()
    }
  }

  // Glow
  const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 10)
  glowGradient.addColorStop(0, rgba(col, 0.55 * signal.intensity))
  glowGradient.addColorStop(0.4, rgba(col, 0.2 * signal.intensity))
  glowGradient.addColorStop(1, rgba(col, 0))
  ctx.fillStyle = glowGradient
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2)
  ctx.fill()

  // Core
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2)
  ctx.fillStyle = rgba(col, signal.intensity)
  ctx.fill()
}

function drawHubParticle(
  ctx: CanvasRenderingContext2D,
  particle: HubParticle,
  hub: Hub
) {
  const lifeRatio = particle.life / particle.maxLife
  const fadeIn = Math.min(lifeRatio * 4, 1)
  const fadeOut =
    lifeRatio > 0.7 ? 1 - easeInQuad((lifeRatio - 0.7) / 0.3) : 1
  const alpha = fadeIn * fadeOut * particle.intensity

  const x = hub.x + Math.cos(particle.angle) * particle.radius
  const y = hub.y + Math.sin(particle.angle) * particle.radius
  const col = SOURCE_COLORS[particle.sourceIndex] || ANIM_COLORS.accent

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, 7)
  gradient.addColorStop(0, rgba(col, 0.7 * alpha))
  gradient.addColorStop(0.5, rgba(col, 0.2 * alpha))
  gradient.addColorStop(1, rgba(col, 0))
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(x, y, 7, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x, y, 2.5, 0, Math.PI * 2)
  ctx.fillStyle = rgba(col, alpha)
  ctx.fill()
}

function drawActivePath(ctx: CanvasRenderingContext2D, signal: Signal) {
  if (signal.progress >= 1) return

  const col = SOURCE_COLORS[signal.sourceIndex] || ANIM_COLORS.accent
  const easedProgress = easeInOutCubic(signal.progress)

  ctx.beginPath()
  ctx.moveTo(signal.path.from.x, signal.path.from.y)
  const steps = 30
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * easedProgress
    const pt = getPointOnBezier(signal.path, t)
    ctx.lineTo(pt.x, pt.y)
  }
  ctx.strokeStyle = rgba(col, 0.35 * signal.intensity)
  ctx.lineWidth = 1.8
  ctx.lineCap = "round"
  ctx.stroke()
}

// --- Render ---

function render(
  ctx: CanvasRenderingContext2D,
  s: AnimState,
  w: number,
  h: number
) {
  ctx.clearRect(0, 0, w, h)

  // Labels
  drawLabel(ctx, s.labels.left, false, w, h)
  drawLabel(ctx, s.labels.center, true, w, h)
  drawLabel(ctx, s.labels.right, false, w, h)

  // Base pathways
  for (const path of s.pathways) {
    drawBezierPath(ctx, path, 0.06)
  }

  // Active path overlays
  for (const signal of s.signals) {
    drawActivePath(ctx, signal)
  }

  // Hub particles
  for (const particle of s.hubParticles) {
    drawHubParticle(ctx, particle, s.hub)
  }

  // Signals
  for (const signal of s.signals) {
    drawSignal(ctx, signal)
  }

  // Source nodes
  const sourceRadius = Math.min(w, h) * 0.022
  for (const source of s.sources) {
    drawNode(
      ctx,
      source.x,
      source.y,
      sourceRadius,
      false,
      true,
      source.phase,
      source.colorIndex
    )
  }

  // Destination nodes
  const destRadius = Math.min(w, h) * 0.013
  for (const dest of s.destinations) {
    const isActive = s.globalTime < dest.activeUntil
    const activeIntensity = isActive
      ? Math.min(1, (dest.activeUntil - s.globalTime) / 400)
      : 0
    const radius = destRadius * (1 + activeIntensity * 0.4)
    const alpha = 0.3 + activeIntensity * 0.5

    if (isActive) {
      const glowGradient = ctx.createRadialGradient(
        dest.x,
        dest.y,
        0,
        dest.x,
        dest.y,
        radius * 3
      )
      glowGradient.addColorStop(
        0,
        rgba(ANIM_COLORS.accent, 0.2 * activeIntensity)
      )
      glowGradient.addColorStop(1, rgba(ANIM_COLORS.accent, 0))
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(dest.x, dest.y, radius * 3, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.beginPath()
    ctx.arc(dest.x, dest.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = isActive
      ? rgba(ANIM_COLORS.accent, alpha)
      : rgba(ANIM_COLORS.base, alpha)
    ctx.fill()
  }

  // Hub node (drawn last, on top)
  drawNode(
    ctx,
    s.hub.x,
    s.hub.y,
    s.hub.radius,
    true,
    false,
    s.hub.pulsePhase,
    0
  )
}

// --- Component ---

export function SupplyChainFlow({ className }: { className?: string }) {
  const state = useRef(createState())

  const canvasRef = useCanvasAnimation({
    init(_ctx, w, h) {
      initNetwork(state.current, w, h)
    },
    draw(ctx, w, h, delta) {
      update(state.current, delta)
      render(ctx, state.current, w, h)
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
