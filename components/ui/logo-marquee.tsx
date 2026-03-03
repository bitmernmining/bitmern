"use client"

import { cn } from "@/lib/utils"

interface LogoMarqueeProps {
  children: React.ReactNode
  speed?: number // seconds for one full cycle
  className?: string
  pauseOnHover?: boolean
}

export function LogoMarquee({ children, speed = 30, className, pauseOnHover = true }: LogoMarqueeProps) {
  return (
    <div className={cn("overflow-hidden relative", pauseOnHover && "group", className)}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

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
