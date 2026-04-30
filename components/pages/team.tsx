"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Linkedin, Facebook, Instagram } from "lucide-react"

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
    photo: "/team/Pashalis-CEO.jpeg",
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
    email: "andreas@bitmernmining.com",
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

/** Leadership card — large photo with gradient overlay, used for top members */
function LeadershipCard({ member }: { member: TeamMember }) {
  return (
    <div className="card-surface group flex flex-col overflow-hidden rounded-lg border border-border/60">
      {/* Photo area — square 1:1 */}
      <div className="relative aspect-square w-full overflow-hidden bg-foreground/5">
        {member.photo ? (
          <>
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={90}
            />
            {/* Gradient overlay for text readability */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            {/* Name overlay at bottom of photo */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-lg font-medium text-white">{member.name}</h3>
              <p className="font-mono text-xs uppercase tracking-wide text-white/70">
                {member.title}
              </p>
            </div>
          </>
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="font-heading text-4xl font-medium text-foreground/20">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Bio + links */}
      <div className="flex flex-1 flex-col p-6">
        {/* Show name/title below if no photo (fallback) */}
        {!member.photo && (
          <div className="mb-3">
            <h3 className="text-base">{member.name}</h3>
            <p className="font-mono text-xs uppercase tracking-wide text-foreground/50">
              {member.title}
            </p>
          </div>
        )}
        <p className="flex-1 text-sm leading-relaxed text-foreground/60">
          {member.bio}
        </p>

        {(() => {
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

          if (!hasContact) return null

          return (
            <div className="mt-4 flex flex-col gap-2 border-t border-border/30 pt-4">
              <div className="flex items-center gap-1">
                {socials.map(({ platform, href }) => {
                  const { Icon, label } = SOCIAL_ICONS[platform]
                  return (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-8 items-center justify-center rounded-md text-foreground/40 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground/70"
                      aria-label={`${member.name} on ${label}`}
                    >
                      <Icon className="size-4" />
                    </a>
                  )
                })}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="ml-auto truncate font-mono text-xs text-foreground/40 transition-colors duration-200 hover:text-foreground/70"
                  >
                    {member.email}
                  </a>
                )}
              </div>
              {member.secondaryEmail && (
                <div className="flex items-center justify-end gap-2 font-mono text-xs">
                  <span className="text-foreground/30">
                    {member.secondaryEmail.label}:
                  </span>
                  <a
                    href={`mailto:${member.secondaryEmail.address}`}
                    className="truncate text-foreground/40 transition-colors duration-200 hover:text-foreground/70"
                  >
                    {member.secondaryEmail.address}
                  </a>
                </div>
              )}
            </div>
          )
        })()}
      </div>
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
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {coreTeam.map((member) => (
                  <motion.div key={member.name} variants={chVariants}>
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
