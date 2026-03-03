"use client"

import { useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { resolveThemeColors, rgba } from "@/lib/animation-utils"

// ---------------------------------------------------------------------------
// Facility data
// ---------------------------------------------------------------------------

interface Facility {
  name: string
  lat: number
  lng: number
  mw: number
  kwh: number | null
  status: string
  color: string
  active: boolean
  region: "ethiopia" | "us" | "europe"
}

const facilities: Facility[] = [
  { name: "Addis Ababa, Ethiopia", lat: 9.032, lng: 38.7469, mw: 3, kwh: 0.055, status: "Available", color: "#10b981", active: true, region: "ethiopia" },
  { name: "Indiana, USA", lat: 39.7684, lng: -86.1581, mw: 20, kwh: 0.058, status: "Full Capacity", color: "#f2ae2e", active: true, region: "us" },
  { name: "North Dakota, USA", lat: 47.5515, lng: -101.002, mw: 3, kwh: 0.058, status: "Available", color: "#10b981", active: true, region: "us" },
  { name: "Missouri, USA", lat: 38.5767, lng: -92.1735, mw: 5.5, kwh: 0.0675, status: "Available", color: "#10b981", active: true, region: "us" },
  { name: "Finland", lat: 60.472, lng: 8.4689, mw: 4.4, kwh: null, status: "Coming Soon", color: "#459bf3", active: false, region: "europe" },
]

const maxMW = Math.max(...facilities.map((f) => f.mw))

// Bar height scaling
function getBarHeight(mw: number): number {
  const min = 0.04
  const max = 0.18
  return min + (mw / maxMW) * (max - min)
}

// Active facilities for arcs
const activeFacilities = facilities.filter((f) => f.active)

// Bidirectional arcs
const arcs: { startLat: number; startLng: number; endLat: number; endLng: number; animateTime: number }[] = []
for (let i = 0; i < activeFacilities.length; i++) {
  for (let j = i + 1; j < activeFacilities.length; j++) {
    arcs.push({
      startLat: activeFacilities[i].lat, startLng: activeFacilities[i].lng,
      endLat: activeFacilities[j].lat, endLng: activeFacilities[j].lng,
      animateTime: 2500 + Math.random() * 1000,
    })
    arcs.push({
      startLat: activeFacilities[j].lat, startLng: activeFacilities[j].lng,
      endLat: activeFacilities[i].lat, endLng: activeFacilities[i].lng,
      animateTime: 2500 + Math.random() * 1000,
    })
  }
}

// Pulsing rings for active only
const rings = activeFacilities.map((f) => ({ lat: f.lat, lng: f.lng, color: f.color }))

// Region-grouped labels for progressive reveal
const ethiopiaLabels = facilities.filter((f) => f.region === "ethiopia").map((f) => ({
  lat: f.lat, lng: f.lng, text: f.name.split(",")[0], color: f.color, mw: f.mw,
}))
const usLabels = facilities.filter((f) => f.region === "us").map((f) => ({
  lat: f.lat, lng: f.lng, text: f.name.split(",")[0], color: f.color, mw: f.mw,
}))
const europeLabels = facilities.filter((f) => f.region === "europe").map((f) => ({
  lat: f.lat, lng: f.lng, text: f.name.split(",")[0], color: f.color, mw: f.mw,
}))

// Region-grouped points for progressive bar reveal
const ethiopiaPoints = facilities.filter((f) => f.region === "ethiopia")
const usPoints = facilities.filter((f) => f.region === "us")
const europePoints = facilities.filter((f) => f.region === "europe")

// Tooltip icons
const circuitIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`
const boltIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`

const bgColors: Record<string, string> = {
  "#f2ae2e": "#FDF6EA",
  "#10b981": "#E7F8F2",
  "#459bf3": "#ECF5FD",
}

// ---------------------------------------------------------------------------
// Camera tour waypoints
// ---------------------------------------------------------------------------

interface Waypoint {
  lat: number
  lng: number
  altitude: number
  duration: number
  pause: number
  reveal: "ethiopia" | "us" | "europe" | null
}

const TOUR: Waypoint[] = [
  // Start: wide view of Africa/Europe
  { lat: 15, lng: 30, altitude: 2.5, duration: 0, pause: 400, reveal: null },
  // Fly to Ethiopia cluster — reveal Ethiopia facilities
  { lat: 8, lng: 38, altitude: 1.4, duration: 2000, pause: 2200, reveal: "ethiopia" },
  // Sweep to US Midwest — reveal US facilities
  { lat: 40, lng: -90, altitude: 1.2, duration: 2500, pause: 2200, reveal: "us" },
  // Pull back to global view — reveal Norway + arcs
  { lat: 50, lng: -10, altitude: 1.8, duration: 2000, pause: 800, reveal: "europe" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FacilityGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null)
  const animatedRef = useRef(false)
  const revealedLabelsRef = useRef<typeof ethiopiaLabels>([])
  const revealedPointsRef = useRef<Facility[]>([])
  // Track all tour timeouts + rAF IDs for cleanup
  const tourTimers = useRef<number[]>([])
  const tourRafs = useRef<number[]>([])

  // Managed setTimeout/rAF that auto-track for cleanup
  const tour = useCallback(
    (fn: () => void, delay: number) => {
      tourTimers.current.push(window.setTimeout(fn, delay))
    },
    []
  )
  const tourRaf = useCallback(
    (fn: FrameRequestCallback) => {
      tourRafs.current.push(requestAnimationFrame(fn))
    },
    []
  )

  function clearTour() {
    tourTimers.current.forEach((id) => clearTimeout(id))
    tourRafs.current.forEach((id) => cancelAnimationFrame(id))
    tourTimers.current = []
    tourRafs.current = []
  }

  // Bar rise animation helper — tracks its own rAF for cleanup
  const animateBarRise = useCallback(
    (regionPoints: Facility[]) => {
      const globe = globeRef.current
      if (!globe) return
      const duration = 1000
      const startTime = Date.now()
      const tick = () => {
        const t = Math.min((Date.now() - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        globe.pointAltitude((d: Facility) => {
          if (regionPoints.includes(d)) return getBarHeight(d.mw) * eased
          return getBarHeight(d.mw)
        })
        if (t < 1) tourRaf(tick)
      }
      tourRaf(tick)
    },
    [tourRaf]
  )

  const startEntranceAnimation = useCallback(() => {
    const globe = globeRef.current
    const container = containerRef.current
    if (!globe || !container) return

    // Clear any stale timers from a previous run (HMR, re-mount)
    clearTour()

    // Fade in
    container.style.opacity = "1"

    let elapsed = 300

    TOUR.forEach((wp) => {
      const wpStart = elapsed

      // Camera move
      tour(() => {
        globe.pointOfView({ lat: wp.lat, lng: wp.lng, altitude: wp.altitude }, wp.duration)
      }, wpStart)

      // After camera arrives, reveal this region's data
      const revealTime = wpStart + wp.duration + 200

      if (wp.reveal === "ethiopia") {
        tour(() => {
          revealedPointsRef.current = [...revealedPointsRef.current, ...ethiopiaPoints]
          globe.pointsData(revealedPointsRef.current)
          animateBarRise(ethiopiaPoints)

          tour(() => {
            revealedLabelsRef.current = [...revealedLabelsRef.current, ...ethiopiaLabels]
            globe.labelsData(revealedLabelsRef.current)
          }, 400)

          tour(() => {
            globe.ringsData(rings.filter((r) =>
              ethiopiaPoints.some((f) => f.lat === r.lat && f.lng === r.lng)
            ))
          }, 600)
        }, revealTime)
      }

      if (wp.reveal === "us") {
        tour(() => {
          revealedPointsRef.current = [...revealedPointsRef.current, ...usPoints]
          globe.pointsData(revealedPointsRef.current)
          animateBarRise(usPoints)

          tour(() => {
            revealedLabelsRef.current = [...revealedLabelsRef.current, ...usLabels]
            globe.labelsData(revealedLabelsRef.current)
          }, 400)

          tour(() => {
            const activeUS = usPoints.filter((f) => f.active)
            const currentRings = rings.filter((r) =>
              [...ethiopiaPoints, ...activeUS].some((f) => f.lat === r.lat && f.lng === r.lng)
            )
            globe.ringsData(currentRings)
          }, 600)

          tour(() => globe.arcsData(arcs), 800)
        }, revealTime)
      }

      if (wp.reveal === "europe") {
        tour(() => {
          revealedPointsRef.current = [...revealedPointsRef.current, ...europePoints]
          globe.pointsData(revealedPointsRef.current)
          animateBarRise(europePoints)

          tour(() => {
            revealedLabelsRef.current = [...revealedLabelsRef.current, ...europeLabels]
            globe.labelsData(revealedLabelsRef.current)
          }, 400)

          tour(() => globe.ringsData(rings), 600)
        }, revealTime)
      }

      elapsed += wp.duration + wp.pause
    })

    // After full tour: start slow rotate
    tour(() => {
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.3
    }, elapsed + 400)
  }, [tour, animateBarRise])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let destroyed = false

    Promise.all([
      import("globe.gl"),
      import("topojson-client"),
      fetch("/data/countries-110m.json").then((r) => r.json()),
    ]).then(([GlobeModule, topojsonLib, countries]) => {
      if (destroyed) return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Globe = (GlobeModule as any).default || GlobeModule

      // Resolve theme colors for globe surfaces
      const themeColors = resolveThemeColors()
      const capHex = rgba(themeColors.dim, 0.15)     // polygon cap — very subtle
      const sideHex = rgba(themeColors.base, 0.25)    // polygon side (extrusion)
      const strokeHex = rgba(themeColors.base, 0.18)  // polygon border
      const atmosphereHex = rgba(themeColors.dim, 0.5)

      // Read background color from CSS for ocean/globe surface
      const bgCss = getComputedStyle(document.documentElement).getPropertyValue("--background").trim()
      const surfaceColor = bgCss || "#ffffff"

      // Ocean texture
      const waterCanvas = document.createElement("canvas")
      waterCanvas.width = 4
      waterCanvas.height = 4
      const wCtx = waterCanvas.getContext("2d")!
      wCtx.fillStyle = surfaceColor
      wCtx.fillRect(0, 0, 4, 4)
      const waterTexture = waterCanvas.toDataURL()

      const globe = Globe()
        .width(container.offsetWidth)
        .height(container.offsetHeight)
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(true)
        .atmosphereColor(atmosphereHex)
        .atmosphereAltitude(0.05)
        .showGlobe(true)
        .globeImageUrl(waterTexture)

        // Countries
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .polygonsData((topojsonLib as any).feature(countries, countries.objects.countries).features)
        .polygonCapColor(() => capHex)
        .polygonSideColor(() => sideHex)
        .polygonStrokeColor(() => strokeHex)
        .polygonAltitude(0.012)

        // Arcs — start empty
        .arcsData([])
        .arcColor(() => ["#f2ae2e66", "#f2ae2eaa"])
        .arcAltitudeAutoScale(0.3)
        .arcStroke(0.4)
        .arcDashLength(0.4)
        .arcDashGap(0.3)
        .arcDashAnimateTime("animateTime")

        // Pulsing rings — start empty
        .ringsData([])
        .ringLat("lat")
        .ringLng("lng")
        .ringAltitude(0.013)
        .ringColor((d: { color: string }) => (t: number) => {
          const opacity = Math.round((1 - t) * 200)
          return d.color + opacity.toString(16).padStart(2, "0")
        })
        .ringMaxRadius(4)
        .ringPropagationSpeed(1)
        .ringRepeatPeriod(2000)

        // 3D bars via native points layer — start empty
        .pointsData([])
        .pointLat("lat")
        .pointLng("lng")
        .pointAltitude((d: Facility) => getBarHeight(d.mw))
        .pointRadius(0.25)
        .pointColor("color")
        .pointLabel((d: Facility) => {
          const kwhRow =
            d.active && d.kwh
              ? `<div style="font-family:'Manrope',sans-serif;color:#4D4D4D;font-size:14px;display:flex;align-items:center;">${boltIcon}$${d.kwh.toFixed(3)}/kWh</div>`
              : ""
          return `
            <div style="background:${bgColors[d.color]};padding:12px 16px;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.08);border:1px solid ${d.color}22">
              <div style="font-family:'Space Grotesk',sans-serif;font-weight:600;color:#05060C;margin-bottom:8px;font-size:15px">${d.name}</div>
              <div style="font-family:'Manrope',sans-serif;color:#4D4D4D;font-size:14px;display:flex;align-items:center;margin-bottom:${d.active && d.kwh ? "4px" : "0"}">${circuitIcon}${d.mw} MW</div>
              ${kwhRow}
              <div style="font-family:'JetBrains Mono',monospace;color:${d.color};font-size:13px;margin-top:8px;font-weight:500">${d.status}</div>
            </div>
          `
        })
        .onPointHover((obj: Facility | null) => {
          globe.controls().autoRotate = !obj
          container.style.cursor = obj ? "pointer" : "grab"
        })

        // Floating labels — start empty
        .labelsData([])
        .labelLat("lat")
        .labelLng("lng")
        .labelText("text")
        .labelSize(0.6)
        .labelDotRadius(0)
        .labelColor("color")
        .labelAltitude((d: { mw: number }) => getBarHeight(d.mw) + 0.015)
        .labelResolution(2)(container)

      // Make globe surface flat — no 3D shading, use theme background
      const globeMat = globe.globeMaterial()
      globeMat.color.set(surfaceColor)
      globeMat.emissive.set(surfaceColor)
      globeMat.emissiveIntensity = 1
      globeMat.shininess = 0

      // Initial camera
      globe.controls().autoRotate = false
      globe.controls().enableZoom = false
      globe.pointOfView({ lat: TOUR[0].lat, lng: TOUR[0].lng, altitude: TOUR[0].altitude })

      globeRef.current = globe

      // Reduced motion — show static globe with all data visible, no tour
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) {
        container.style.opacity = "1"
        globe.pointsData(facilities)
        globe.labelsData([...ethiopiaLabels, ...usLabels, ...europeLabels])
        globe.ringsData(rings)
        globe.arcsData(arcs)
        globe.pointOfView({ lat: 30, lng: -20, altitude: 2.2 })
        // No tour, no rotation — static view
        return
      }

      // Intersection observer — trigger tour on scroll-in
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true
            startEntranceAnimation()
            io.unobserve(container)
          }
        },
        { threshold: 0.3 }
      )
      io.observe(container)

      // Resize — throttled to avoid layout thrashing
      let resizeRaf = 0
      const ro = new ResizeObserver(() => {
        if (resizeRaf) return
        resizeRaf = requestAnimationFrame(() => {
          resizeRaf = 0
          if (globeRef.current) {
            globeRef.current.width(container.offsetWidth)
            globeRef.current.height(container.offsetHeight)
          }
        })
      })
      ro.observe(container)

      ;(container as HTMLDivElement & { _globeCleanup?: () => void })._globeCleanup = () => {
        io.disconnect()
        ro.disconnect()
      }
    })

    return () => {
      destroyed = true
      clearTour()
      const c = container as HTMLDivElement & { _globeCleanup?: () => void }
      c._globeCleanup?.()
      if (globeRef.current) {
        globeRef.current._destructor?.()
        globeRef.current = null
      }
    }
  }, [startEntranceAnimation])

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height: 600, opacity: 0, transition: "opacity 0.8s ease" }}
    />
  )
}
