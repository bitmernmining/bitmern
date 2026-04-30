"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Linkedin, Facebook, Instagram, Mail, ChevronDown } from "lucide-react"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

import Image from "next/image"
import { Tag } from "@/components/ui/tag"
import { SectionCTA } from "@/components/ui/section-cta"
import { InfrastructureGrid } from "@/components/animations/infrastructure-grid"
import { useSection, reducedStagger } from "@/lib/motion"
import { CONTACT } from "@/lib/contact"

// Faster stagger for large grids (unique to team page)
const gridStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface TeamMember {
  name: string
  title: string
  photo: string | null
  bio: string
  linkedin?: string
  socials?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  email?: string
  secondaryEmail?: { label: string; address: string }
}

const SOCIAL_ICONS = {
  linkedin: { Icon: Linkedin, label: "LinkedIn" },
  twitter: { Icon: XIcon, label: "X (Twitter)" },
  facebook: { Icon: Facebook, label: "Facebook" },
  instagram: { Icon: Instagram, label: "Instagram" },
} as const

const coreTeam: TeamMember[] = [
  {
    name: "Giannis Andreou",
    title: "Founder & CEO",
    photo: "/team/Giannis-CEO.jpeg",
    bio: "Founded Bitmern Mining in Greece in 2021 and leads the company as CEO. Best-selling author and crypto entrepreneur with 79K+ followers. Built Bitmern from zero into a $10M+ infrastructure business in under two years, with facilities spanning Ethiopia and an expansion pipeline into the Nordics. Owns long-term vision, investor relations, and facility development.",
    socials: {
      linkedin: "https://www.linkedin.com/in/giannisandreou/",
      twitter: "https://x.com/gandreou007",
      facebook: "https://www.facebook.com/Gi.Andreou/",
      instagram: "https://www.instagram.com/gianisandreou",
    },
    email: "GiannisAndreou@bitmern.com",
  },
  {
    name: "Paschalis Pietris",
    title: "Vice President",
    photo: "/team/Pashalis-VP.jpeg",
    bio: "Vice President of Bitmern Mining, owning operational execution across all facilities and partnerships. Brings deep operational experience from hardware procurement through deployment and performance optimization.",
    socials: {
      linkedin: "https://www.linkedin.com/in/pashalis-pietris-4b8767b7/",
      twitter: "https://x.com/PashalisPietris",
      facebook: "https://www.facebook.com/pasxalis.pietris",
      instagram: "https://www.instagram.com/the__businessman/",
    },
    email: "P.pashalis@bitmernmining.com",
  },
  {
    name: "Andreas Stirmpou",
    title: "Chief Technology Officer",
    photo: "/team/Andreas-CTO.jpeg",
    bio: "Leads technology strategy, infrastructure architecture, and engineering across Bitmern Mining. Owns the technical roadmap from facility automation and monitoring to customer-facing platforms.",
    socials: {
      linkedin: "https://www.linkedin.com/in/andreas-strb/",
      twitter: "https://x.com/AntreasStirbu",
      facebook: "https://www.facebook.com/antreas.strb",
      instagram: "https://www.instagram.com/andreas_strb/",
    },
    email: "Andreas.s@bitmernmining.com",
  },
  {
    name: "Michelle Chikomboya",
    title: "Chief Operating Officer",
    photo: "/team/Michele-COO.jpeg",
    bio: "Manages operations, financial reporting, and compliance across all Bitmern entities. Ensures transparent accounting and operational excellence for investor and client payouts.",
    email: "michelle.c@bitmernmining.com",
    secondaryEmail: { label: "Finance inquiries", address: "finances@bitmernmining.com" },
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

/** Bio length above which the Read more toggle appears */
const BIO_TRUNCATE_THRESHOLD = 180

/** Leadership card — editorial layout: photo, name + title-tag, bio, footer strip */
function LeadershipCard({ member }: { member: TeamMember }) {
  const prefersReduced = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const isLongBio = member.bio.length > BIO_TRUNCATE_THRESHOLD

  // Build social list (legacy `linkedin` field merges with `socials` map)
  const socials: { platform: keyof typeof SOCIAL_ICONS; href: string }[] = []
  if (member.linkedin) socials.push({ platform: "linkedin", href: member.linkedin })
  if (member.socials) {
    for (const [platform, href] of Object.entries(member.socials) as [
      keyof typeof SOCIAL_ICONS,
      string | undefined,
    ][]) {
      if (href && !socials.some((s) => s.platform === platform)) {
        socials.push({ platform, href })
      }
    }
  }
  const hasContact = socials.length > 0 || member.email

  return (
    <div
      className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-border hover:shadow-lg motion-safe:hover:-translate-y-1"
    >
      {/* Photo area — square 1:1 */}
      <div className="relative aspect-square w-full overflow-hidden bg-foreground/5">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            fill
            className={
              prefersReduced
                ? "object-cover object-top"
                : "object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            }
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            quality={90}
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="font-heading text-4xl font-medium text-foreground/20">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Header: name + role tag */}
      <div className="px-6 pt-5">
        <h3 className="font-heading text-[1.0625rem] font-semibold leading-tight text-foreground">
          {member.name}
        </h3>
        <div className="mt-2">
          <Tag variant="muted" size="sm">
            {member.title}
          </Tag>
        </div>
      </div>

      {/* Bio */}
      <div className="flex flex-1 flex-col px-6 py-4">
        <p
          className={
            isLongBio && !expanded
              ? "text-[0.875rem] leading-relaxed text-foreground/75 line-clamp-3"
              : "text-[0.875rem] leading-relaxed text-foreground/75"
          }
        >
          {member.bio}
        </p>
        {isLongBio && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 inline-flex w-fit cursor-pointer items-center gap-1 text-xs font-medium uppercase tracking-wide text-foreground/60 transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:rounded"
          >
            {expanded ? "Read less" : "Read more"}
            <ChevronDown
              className={
                expanded
                  ? "size-3.5 rotate-180 transition-transform duration-200"
                  : "size-3.5 transition-transform duration-200"
              }
              strokeWidth={2}
            />
          </button>
        )}
      </div>

      {/* Footer strip: socials + email */}
      {hasContact && (
        <div className="border-t border-border/40 bg-foreground/[0.02] px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {socials.map(({ platform, href }) => {
                const { Icon, label } = SOCIAL_ICONS[platform]
                return (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-9 items-center justify-center rounded-md text-foreground/45 transition-colors duration-200 hover:bg-foreground/[0.06] hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label={`${member.name} on ${label}`}
                  >
                    <Icon className="size-[1.05rem]" />
                  </a>
                )
              })}
            </div>
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[0.75rem] font-medium uppercase tracking-wide text-foreground/55 transition-colors duration-200 hover:bg-foreground/[0.06] hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label={`Email ${member.name} at ${member.email}`}
              >
                <Mail className="size-4" strokeWidth={1.75} />
                Email
              </a>
            )}
          </div>
          {member.secondaryEmail && (
            <div className="mt-2 flex items-center justify-end gap-2 border-t border-border/30 pt-2 font-mono text-[0.6875rem] uppercase tracking-wider">
              <span className="text-foreground/40">{member.secondaryEmail.label}</span>
              <a
                href={`mailto:${member.secondaryEmail.address}`}
                className="text-foreground/55 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
              >
                {member.secondaryEmail.address}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function HeroSection() {
  const { ref, inView, cVariants, chVariants } = useSection(0.3)

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Subtle canvas background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <InfrastructureGrid />
      </div>

      <div className="padding-global relative">
        <div className="container-large">
          <div className="padding-section-large is-hero">
            <div className="max-width-large">
              <motion.div
                variants={cVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <motion.div variants={chVariants}>
                  <Tag>Leadership</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h1 variants={chVariants}>
                  The Team Behind Bitmern Mining
                </motion.h1>
                <div className="spacer-small" />
                <motion.p
                  variants={chVariants}
                  className="text-lg leading-relaxed text-foreground/70"
                >
                  From designing resilient global infrastructure to delivering
                  best-in-class customer support across three continents &mdash;
                  every team member brings specialized knowledge and deep
                  Bitcoin expertise.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CoreTeamSection() {
  const { ref, inView, chVariants } = useSection(0.1)
  const prefersReduced = useReducedMotion()
  const cVariants = prefersReduced ? reducedStagger : gridStagger

  return (
    <section ref={ref} className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div variants={chVariants}>
                <Tag variant="muted">Executives</Tag>
              </motion.div>
              <div className="spacer-xsmall" />
              <motion.h2 variants={chVariants}>Our People</motion.h2>

              <div className="spacer-large" />

              {/* Leadership cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {coreTeam.map((member) => (
                  <motion.div key={member.name} variants={chVariants} className="flex">
                    <LeadershipCard member={member} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function TeamPage() {
  return (
    <>
      <HeroSection />
      <CoreTeamSection />
      <SectionCTA
        tag="Careers"
        heading="Join the Bitmern Team"
        description="We're growing fast and hiring across DevOps, Engineering, Product Management, Data Analytics, and Customer Success. We also welcome strategic partners and investors."
        primaryCTA={{ label: "Email Careers", href: `mailto:${CONTACT.careersEmail}` }}
        secondaryCTA={{ label: "Contact Us", href: `mailto:${CONTACT.email}` }}
        variant="elevated"
      />
    </>
  )
}
