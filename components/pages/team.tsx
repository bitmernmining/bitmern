"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Linkedin, ArrowRight, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { SectionCTA } from "@/components/ui/section-cta"
import { InfrastructureGrid } from "@/components/animations/infrastructure-grid"
import { useSection, reducedStagger, fadeUp, reducedFade } from "@/lib/motion"

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
  email?: string
}

const coreTeam: TeamMember[] = [
  {
    name: "Giannis Andreou",
    title: "Founder & CEO",
    photo: "/team/giannis-new.avif",
    bio: "Best-selling author and crypto entrepreneur with 79K+ followers. Built Bitmern Mining into a $10M+ business in under two years, with facilities spanning Ethiopia, the United States, and an expansion pipeline into the Nordics. Leads company strategy, investor relations, and facility development.",
    linkedin: "https://linkedin.com/in/giannisandreou",
    email: "GiannisAndreou@bitmern.com",
  },
  {
    name: "Paschalis Pietris",
    title: "Vice President",
    photo: "/team/paschalis-new.avif",
    bio: "Oversees day-to-day operations across all facilities and manages strategic partnerships. Ensures operational excellence from hardware procurement through deployment and ongoing performance optimization.",
    linkedin: "https://linkedin.com/in/paschalispietris",
    email: "P.pashalis@bitmernmining.com",
  },
  {
    name: "Georgia Manuel",
    title: "Chief Marketing Officer",
    photo: "/team/georgia.avif",
    bio: "Drives Bitmern\u2019s brand strategy, content marketing, and demand generation across all channels. Responsible for building the company\u2019s presence at major industry events including Blockchain Life.",
    linkedin: "https://linkedin.com/in/georgiamanuel",
    email: "Georgia.m@bitmern.com",
  },
  {
    name: "Andreas Stirmpou",
    title: "CTO",
    photo: "/team/andreas-new.avif",
    bio: "Leads all technology development including the SuperApp monitoring platform, Bitmern Solo pool infrastructure, and shop.bitmernmining.com. Manages firmware optimization, API development, and the technical architecture powering 176+ PH/s of hashrate.",
    linkedin: "https://linkedin.com/in/andreasstirmpou",
    email: "Andreas.S@bitmern.com",
  },
  {
    name: "Michelle",
    title: "Senior Accountant",
    photo: null,
    bio: "Manages financial operations, reporting, and compliance across all Bitmern entities. Ensures transparent accounting for investor and client payouts.",
    email: "finances@bitmernmining.com",
  },
  {
    name: "Anna Saroglou",
    title: "Social Media Manager",
    photo: null,
    bio: "Manages Bitmern\u2019s social media presence across LinkedIn, Instagram, YouTube, TikTok, and X. Creates content that educates and engages the mining community.",
    email: "anna@bitmernmining.com",
  },
  {
    name: "Chrysostomos Dormousoglou",
    title: "Quality Control & Customer Support Manager",
    photo: null,
    bio: "Leads customer success and quality assurance. Ensures every miner deployment meets performance standards and every client gets responsive, knowledgeable support.",
    email: "chrysostomos.D@bitmernmining.com",
  },
  {
    name: "Andromachi Pappa",
    title: "Accountant",
    photo: null,
    bio: "Supports financial operations and reporting across the organization.",
  },
  {
    name: "Effie Kavoura",
    title: "Events Planning",
    photo: null,
    bio: "Coordinates Bitmern\u2019s presence at industry events, conferences, and the Blockchain Summits series.",
  },
  {
    name: "Panos Andreou",
    title: "Legal Counsel",
    photo: null,
    bio: "Handles legal matters, compliance, and corporate governance for Bitmern Technologies, LLC.",
  },
  {
    name: "Fivos Radis",
    title: "AI & Tech Advisor",
    photo: null,
    bio: "Advises on AI-driven hashrate optimization and the machine learning models behind Bitmern\u2019s 25-35% AI boosting technology.",
  },
  {
    name: "Avi Vatsa",
    title: "AI & Tech Advisor",
    photo: null,
    bio: "Contributes AI and technology strategy, supporting the development of automated mining optimization and predictive analytics.",
  },
  {
    name: "Ioannis Sintoris",
    title: "Marketing",
    photo: null,
    bio: "Supports marketing strategy, campaigns, and growth initiatives.",
    linkedin: "https://linkedin.com/in/ioannissintoris",
  },
]

interface Ambassador {
  name: string
  role: string
  linkedin?: string
}

const ambassadors: Ambassador[] = [
  {
    name: "Evagelos Tsingounis",
    role: "USA Ambassador",
    linkedin: "https://linkedin.com/in/evagelosTsingounis",
  },
  {
    name: "Christina Papadaki",
    role: "Greece Ambassador",
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

/** First N members are "leadership" and get the larger card treatment */
const LEADERSHIP_COUNT = 3

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

/** Leadership card — large photo with gradient overlay, used for top members */
function LeadershipCard({ member }: { member: TeamMember }) {
  return (
    <div className="card-surface group flex flex-col overflow-hidden rounded-lg border border-border/60">
      {/* Photo area — tall aspect ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-foreground/5">
        {member.photo ? (
          <>
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

        {(member.linkedin || member.email) && (
          <div className="mt-4 flex items-center gap-2 border-t border-border/30 pt-4">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-8 items-center justify-center rounded-md text-foreground/40 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground/70"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin className="size-4" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="ml-auto font-mono text-xs text-foreground/40 transition-colors duration-200 hover:text-foreground/70"
              >
                {member.email}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/** Standard card for non-leadership team members */
function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="card-surface flex flex-col rounded-lg border border-border/60">
      {/* Photo / Initials */}
      <div className="flex items-center gap-4 border-b border-border/50 p-6 pb-4">
        {member.photo ? (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ) : (
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-medium text-primary">
            {getInitials(member.name)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-base">{member.name}</h3>
          <p className="font-mono text-xs uppercase tracking-wide text-foreground/50">
            {member.title}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="flex flex-1 flex-col p-6 pt-4">
        <p className="flex-1 text-sm leading-relaxed text-foreground/60">
          {member.bio}
        </p>

        {/* Social / Email */}
        {(member.linkedin || member.email) && (
          <div className="mt-4 flex items-center gap-2 border-t border-border/30 pt-4">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-8 items-center justify-center rounded-md text-foreground/40 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground/70"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin className="size-4" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="ml-auto font-mono text-xs text-foreground/40 transition-colors duration-200 hover:text-foreground/70"
              >
                {member.email}
              </a>
            )}
          </div>
        )}
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

  const leadership = coreTeam.slice(0, LEADERSHIP_COUNT)
  const rest = coreTeam.slice(LEADERSHIP_COUNT)

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
                <Tag variant="muted">Core Team</Tag>
              </motion.div>
              <div className="spacer-xsmall" />
              <motion.h2 variants={chVariants}>Our People</motion.h2>

              <div className="spacer-large" />

              {/* Leadership — top members get tall photo cards */}
              <div className="grid gap-6 md:grid-cols-3">
                {leadership.map((member) => (
                  <motion.div key={member.name} variants={chVariants}>
                    <LeadershipCard member={member} />
                  </motion.div>
                ))}
              </div>

              <div className="spacer-medium" />

              {/* Rest of the team */}
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((member) => (
                  <motion.div key={member.name} variants={chVariants}>
                    <MemberCard member={member} />
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

function AmbassadorsSection() {
  const { ref, inView, cVariants, chVariants } = useSection(0.3)

  return (
    <section ref={ref}>
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div variants={chVariants}>
                <Tag>Ambassadors</Tag>
              </motion.div>
              <div className="spacer-xsmall" />
              <motion.h2 variants={chVariants}>
                Global Ambassadors
              </motion.h2>

              <div className="spacer-large" />

              <div className="grid max-w-2xl gap-6 md:grid-cols-2">
                {ambassadors.map((amb) => (
                  <motion.div
                    key={amb.name}
                    variants={chVariants}
                    className="card-surface flex items-center gap-4 rounded-lg border border-border/60 p-6"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Globe className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base">{amb.name}</h3>
                      <p className="font-mono text-xs uppercase tracking-wide text-foreground/50">
                        {amb.role}
                      </p>
                    </div>
                    {amb.linkedin && (
                      <a
                        href={amb.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex size-8 items-center justify-center rounded-md text-foreground/40 transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground/70"
                        aria-label={`${amb.name} on LinkedIn`}
                      >
                        <Linkedin className="size-4" />
                      </a>
                    )}
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
      <AmbassadorsSection />
      <SectionCTA
        tag="Careers"
        heading="Join the Bitmern Team"
        description="We're growing fast and hiring across DevOps, Engineering, Product Management, Data Analytics, and Customer Success. We also welcome strategic partners and investors."
        primaryCTA={{ label: "Email Careers", href: "mailto:careers@bitmernmining.com" }}
        secondaryCTA={{ label: "Contact Us", href: "mailto:info@bitmernmining.com" }}
        variant="dark"
      />
    </>
  )
}
