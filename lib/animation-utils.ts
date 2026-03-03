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

// ---------------------------------------------------------------------------
// Theme-aware color system for canvas animations
// ---------------------------------------------------------------------------

export type RGB = { r: number; g: number; b: number }

export interface AnimColors {
  accent: RGB   // brand gold (--primary)
  base: RGB     // structural elements (--muted-foreground)
  dim: RGB      // subtle bg elements (--border)
  success: RGB  // green indicators (--success)
}

// Fallback values — used during SSR or if CSS vars aren't available
const FALLBACK_LIGHT: AnimColors = {
  accent:  { r: 225, g: 168, b: 46 },   // oklch(0.795 0.153 78)
  base:    { r: 155, g: 155, b: 155 },   // oklch(0.68 0 0) — medium grey
  dim:     { r: 190, g: 190, b: 190 },   // oklch(0.80 0 0) — soft grey
  success: { r: 30,  g: 155, b: 100 },   // oklch(0.60 0.14 150)
}

const FALLBACK_DARK: AnimColors = {
  accent:  { r: 225, g: 168, b: 46 },   // same gold both modes
  base:    { r: 59,  g: 59,  b: 59 },    // oklch(0.28 0 0) — border dark
  dim:     { r: 40,  g: 40,  b: 40 },    // oklch(0.22 0 0) — muted dark
  success: { r: 30,  g: 155, b: 100 },   // same both modes
}

/**
 * Convert any CSS color (including oklch, var() references) to RGB.
 * Uses a DOM element to resolve, then parses the computed style.
 * Handles rgb(), color(srgb), and falls back to canvas pixel reading.
 */
function cssColorToRgb(cssColor: string, fallback: RGB): RGB {
  try {
    const el = document.createElement("div")
    el.style.color = cssColor
    el.style.position = "absolute"
    el.style.visibility = "hidden"
    document.body.appendChild(el)
    const computed = getComputedStyle(el).color
    document.body.removeChild(el)

    // rgb(r, g, b) or rgba(r, g, b, a) — values are 0-255
    const rgbMatch = computed.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/)
    if (rgbMatch) {
      return { r: Math.round(+rgbMatch[1]), g: Math.round(+rgbMatch[2]), b: Math.round(+rgbMatch[3]) }
    }

    // color(srgb r g b) — Chrome returns this for oklch/lab inputs, values are 0-1
    const srgbMatch = computed.match(/color\(srgb\s+([\d.e+-]+)\s+([\d.e+-]+)\s+([\d.e+-]+)/)
    if (srgbMatch) {
      return {
        r: Math.round(clamp(+srgbMatch[1], 0, 1) * 255),
        g: Math.round(clamp(+srgbMatch[2], 0, 1) * 255),
        b: Math.round(clamp(+srgbMatch[3], 0, 1) * 255),
      }
    }

    // Last resort: render a pixel to canvas and read it back
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = computed
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return { r, g, b }
  } catch {
    return fallback
  }
}

/** Cache to avoid re-reading computed styles every frame */
let _cachedColors: AnimColors | null = null
let _cacheIsDark: boolean | null = null

/**
 * Resolve animation colors from CSS custom properties.
 * Call this in your animation's `init` callback (runs on mount + resize).
 * Results are cached per theme mode — cheap to call repeatedly.
 */
export function resolveThemeColors(): AnimColors {
  if (typeof document === "undefined") return FALLBACK_LIGHT

  const isDark = document.documentElement.classList.contains("dark")
  if (_cachedColors && _cacheIsDark === isDark) return _cachedColors

  const fallback = isDark ? FALLBACK_DARK : FALLBACK_LIGHT

  // Use var() references so the DOM resolves CSS custom properties for us
  _cachedColors = {
    accent:  cssColorToRgb("var(--primary)", fallback.accent),
    base:    cssColorToRgb("oklch(0.68 0 0)", fallback.base),
    dim:     cssColorToRgb("oklch(0.80 0 0)", fallback.dim),
    success: cssColorToRgb("var(--success)", fallback.success),
  }
  _cacheIsDark = isDark

  return _cachedColors
}

/** Invalidate the color cache (call on theme toggle) */
export function invalidateColorCache(): void {
  _cachedColors = null
  _cacheIsDark = null
}

// Auto-invalidate when system theme changes
if (typeof window !== "undefined" && typeof matchMedia === "function") {
  const mql = matchMedia("(prefers-color-scheme: dark)")
  mql.addEventListener("change", () => invalidateColorCache())
}

/**
 * Get the canvas-compatible font family string.
 * Reads the computed font from the document so it matches next/font loaded faces.
 */
export function getCanvasFont(weight: number = 500, sizePx: number = 11): string {
  if (typeof document === "undefined") {
    return `${weight} ${sizePx}px "JetBrains Mono", monospace`
  }
  const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono").trim()
  const family = mono || '"JetBrains Mono", monospace'
  return `${weight} ${sizePx}px ${family}`
}

export function rgba(c: RGB, a: number): string {
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
