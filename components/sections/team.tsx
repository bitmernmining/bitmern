"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  EASE,
  staggerContainer,
  fadeUp,
  reducedStagger,
  reducedFade,
} from "@/lib/motion"
import Image from "next/image"
import { Linkedin, Twitter } from "lucide-react"
import { Tag } from "@/components/ui/tag"

// ---------------------------------------------------------------------------
// File-specific animation variants — card timing differs from shared
// ---------------------------------------------------------------------------

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const cardFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// ---------------------------------------------------------------------------
// Team data
// ---------------------------------------------------------------------------

const TEAM = [
  {
    name: "Giannis Andreou",
    title: "Founder & CEO",
    image: "/team/giannis-new.avif",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Paschalis Pietris",
    title: "Vice President",
    image: "/team/paschalis-new.avif",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Michelle Chikomboya",
    title: "Chief Financial Officer",
    image: "/team/michelle.webp",
    linkedin: "#",
    twitter: "#",
  },
]

// ---------------------------------------------------------------------------
// Initials placeholder for missing photos
// ---------------------------------------------------------------------------

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-foreground/[0.04]">
      <span className="font-heading text-[3rem] font-normal uppercase text-foreground/20">
        {initials}
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })

  const cVariants = prefersReduced ? reducedStagger : staggerContainer
  const chVariants = prefersReduced ? reducedFade : fadeUp
  const crdStagger = prefersReduced ? reducedStagger : cardStagger
  const crdFade = prefersReduced ? reducedFade : cardFade

  return (
    <section ref={sectionRef}>
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {/* Header — centered */}
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-20 text-align-center mx-auto max-w-[48rem]"
            >
              <motion.div variants={chVariants}>
                <Tag>Leadership</Tag>
              </motion.div>
              <div className="spacer-xsmall" />
              <motion.h2 variants={chVariants}>Our Team</motion.h2>
              <div className="spacer-small" />
              <motion.p
                variants={chVariants}
                className="text-[1.125rem] leading-relaxed text-foreground/70"
              >
                The team behind Bitmern Mining — operators, builders, and
                Bitcoin-native leadership with deep industry expertise.
              </motion.p>
            </motion.div>

            {/* 3-column team grid */}
            <motion.div
              ref={gridRef}
              variants={crdStagger}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              className="grid gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16"
            >
              {TEAM.map((member) => (
                <motion.div key={member.name} variants={crdFade}>
                  {/* Photo */}
                  <div className="mb-6 overflow-hidden rounded-lg">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      />
                    ) : (
                      <Initials name={member.name} />
                    )}
                  </div>

                  {/* Name */}
                  <div className="text-[1.375rem] font-semibold">
                    {member.name}
                  </div>

                  {/* Title */}
                  <div className="mt-1 text-[1.125rem] text-foreground/60">
                    {member.title}
                  </div>

                  {/* Socials — only render if real URLs exist */}
                  {(member.linkedin !== "#" || member.twitter !== "#") && (
                    <div className="mt-4 flex items-center gap-3">
                      {member.linkedin !== "#" && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="text-foreground/40 transition-colors duration-200 hover:text-foreground"
                        >
                          <Linkedin className="size-5" />
                        </a>
                      )}
                      {member.twitter !== "#" && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Twitter`}
                          className="text-foreground/40 transition-colors duration-200 hover:text-foreground"
                        >
                          <Twitter className="size-5" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
