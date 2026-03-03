"use client"

import { cn } from "@/lib/utils"

interface LogoMarqueeProps {
  children: React.ReactNode
  speed?: number // seconds for one full cycle
  className?: string
  pauseOnHover?: boolean
  /** CSS color for the fade-edge gradients. Defaults to --color-background. */
  fadeColor?: string
}

export function LogoMarquee({ children, speed = 30, className, pauseOnHover = true, fadeColor }: LogoMarqueeProps) {
  const fadeStyle = fadeColor ? { '--marquee-fade': fadeColor } as React.CSSProperties : undefined
  const fadeFrom = fadeColor ? 'from-[var(--marquee-fade)]' : 'from-background'

  return (
    <div className={cn("overflow-hidden relative", pauseOnHover && "group", className)} style={fadeStyle}>
      {/* Fade edges */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r to-transparent z-10 pointer-events-none", fadeFrom)} />
      <div className={cn("absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l to-transparent z-10 pointer-events-none", fadeFrom)} />

      <div
        className={cn(
          "flex items-center gap-16 w-max animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
    </div>
  )
}
