"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ImageSectionProps {
  src: string
  alt: string
  overlay?: "dark" | "gradient" | "none"
  parallax?: boolean
  className?: string
  children?: React.ReactNode
}

export function ImageSection({ src, alt, overlay = "dark", parallax = true, className = "", children }: ImageSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Photo background */}
      <motion.div
        className="absolute inset-0 -inset-y-[10%]"
        style={parallax ? { y } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </motion.div>

      {/* Overlay */}
      {overlay === "dark" && (
        <div className="absolute inset-0 bg-black/60" />
      )}
      {overlay === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 padding-global">
          <div className="container-large">
            {children}
          </div>
        </div>
      )}
    </section>
  )
}
