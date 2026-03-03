"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { motion } from "framer-motion"
import { useSection } from "@/lib/motion"

interface SectionCTAProps {
  tag?: string
  heading: string
  description?: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  variant?: "dark" | "elevated" | "primary"
}

export function SectionCTA({ tag, heading, description, primaryCTA, secondaryCTA, variant = "dark" }: SectionCTAProps) {
  const { ref, cVariants, chVariants, inView } = useSection()

  const sectionClass = variant === "dark"
    ? "section-elevated"
    : variant === "primary"
    ? "bg-primary text-primary-foreground"
    : "section-elevated"

  return (
    <section className={`${sectionClass} padding-global`}>
      <div className="container-large">
        <motion.div
          ref={ref}
          variants={cVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="py-16 lg:py-20 text-center max-w-[42rem] mx-auto"
        >
          {tag && (
            <motion.div variants={chVariants}>
              <Tag>{tag}</Tag>
            </motion.div>
          )}
          <motion.h2 variants={chVariants} className="text-3xl lg:text-4xl font-bold font-heading mt-4 mb-4">
            {heading}
          </motion.h2>
          {description && (
            <motion.p variants={chVariants} className="text-lg opacity-70 mb-8 leading-relaxed">
              {description}
            </motion.p>
          )}
          <motion.div variants={chVariants} className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
            </Button>
            {secondaryCTA && (
              <Button variant="outline" size="lg" asChild>
                <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
