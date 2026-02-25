// Easing functions — matched to Webflow canvas animations
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

// Webflow animation color palette (RGB)
export const ANIM_COLORS = {
  accent:  { r: 242, g: 174, b: 46 },
  base:    { r: 140, g: 150, b: 165 },
  dim:     { r: 90,  g: 100, b: 115 },
  success: { r: 16,  g: 185, b: 129 },
} as const

export function rgba(c: { r: number; g: number; b: number }, a: number): string {
  return `rgba(${c.r},${c.g},${c.b},${a})`
}

/** Simple seeded random for deterministic layouts */
export function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
