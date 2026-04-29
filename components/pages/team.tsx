"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Linkedin } from "lucide-react"
import Image from "next/image"
import { Tag } from "@/components/ui/tag"
import { SectionCTA } from "@/components/ui/section-cta"
import { InfrastructureGrid } from "@/components/animations/infrastructure-grid"
import { useSection, reducedStagger } from "@/lib/motion"

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
    photo: "/team/Giannis-CEO.jpeg",
    bio: "Best-selling author and crypto entrepreneur with 79K+ followers. Built Bitmern Mining into a $10M+ business in under two years, with facilities spanning Ethiopia, the United States, and an expansion pipeline into the Nordics. Leads company strategy, investor relations, and facility development.",
    linkedin: "https://linkedin.com/in/giannisandreou",
    email: "GiannisAndreou@bitmern.com",
  },
  {
    name: "Paschalis Pietris",
    title: "Vice President",
    photo: "/team/Pashalis-CEO.jpeg",
    bio: "Oversees day-to-day operations across all facilities and manages strategic partnerships. Ensures operational excellence from hardware procurement through deployment and ongoing performance optimization.",
    linkedin: "https://linkedin.com/in/paschalispietris",
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
    email: "finances@bitmernmining.com",
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
        primaryCTA={{ label: "Email Careers", href: "mailto:careers@bitmernmining.com" }}
        secondaryCTA={{ label: "Contact Us", href: "mailto:info@bitmernmining.com" }}
        variant="elevated"
      />
    </>
  )
}
