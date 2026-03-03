"use client"

import { motion } from "framer-motion"
import { CalendarDays, MapPin, Globe, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { SectionCTA } from "@/components/ui/section-cta"
import { useSection } from "@/lib/motion"

// ---------------------------------------------------------------------------
// Past events data
// ---------------------------------------------------------------------------

const PAST_EVENTS = [
  {
    title: "Blockchain Life Forum 2025, Dubai",
    description:
      "Keynote participation, networking with industry leaders, and showcasing Bitmern\u2019s hosting infrastructure to 15,000+ attendees.",
    image: "/content/yt-blockchain-life.jpg",
  },
  {
    title: "Facility Tours \u2014 US & Ethiopia",
    description:
      "On-site walkthroughs for institutional clients and partners across our Indiana, North Dakota, Missouri, and Ethiopia facilities.",
    image: "/content/yt-facility-tour.jpg",
  },
  {
    title: "Industry Conferences & Mining Expos",
    description:
      "Active participation in blockchain conferences and mining expos across Europe and the Middle East.",
    image: "/content/btc-mining-at-scale.png",
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EventsPage() {
  const hero = useSection()
  const upcoming = useSection()
  const summits = useSection()
  const past = useSection()
  const tours = useSection()

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section ref={hero.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <motion.div
                variants={hero.cVariants}
                initial="hidden"
                animate={hero.inView ? "visible" : "hidden"}
                className="max-w-3xl"
              >
                <motion.div variants={hero.chVariants}>
                  <Tag>Events</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h1 variants={hero.chVariants}>
                  Meet Bitmern at Industry Events
                </motion.h1>
                <div className="spacer-small" />
                <motion.p
                  variants={hero.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/70"
                >
                  We don&rsquo;t just build mining infrastructure &mdash;
                  we&rsquo;re active participants in the global Bitcoin and
                  blockchain community. Find us at conferences, summits, and
                  facility tours throughout the year.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Upcoming Events */}
      {/* ----------------------------------------------------------------- */}
      <section ref={upcoming.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={upcoming.cVariants}
                initial="hidden"
                animate={upcoming.inView ? "visible" : "hidden"}
                className="mb-12"
              >
                <motion.h2 variants={upcoming.chVariants}>Upcoming</motion.h2>
              </motion.div>

              <motion.div
                variants={upcoming.crdStagger}
                initial="hidden"
                animate={upcoming.inView ? "visible" : "hidden"}
              >
                <motion.div
                  variants={upcoming.crdFade}
                  className="card-surface rounded-lg border border-border/60 p-8 lg:p-12"
                >
                  <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                    <div className="flex flex-col gap-5">
                      <Tag variant="primary" size="sm">
                        Featured Event
                      </Tag>
                      <h3 className="font-heading text-[1.728rem] font-normal uppercase leading-none tracking-tight">
                        Blockchain Life 2026
                      </h3>
                      <div className="flex flex-wrap items-center gap-6 text-foreground/60">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="size-4" strokeWidth={1.5} />
                          <span className="font-mono text-sm">
                            October 28&ndash;29, 2026
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="size-4" strokeWidth={1.5} />
                          <span className="font-mono text-sm">Dubai, UAE</span>
                        </span>
                      </div>
                      <p className="max-w-2xl text-base leading-relaxed text-foreground/70">
                        The 16th Blockchain Life Forum &mdash; the largest
                        blockchain conference in the MENA region, gathering
                        15,000+ attendees. Bitmern&rsquo;s leadership team will
                        be on-site for meetings, panels, and networking.
                      </p>
                    </div>
                    <div className="flex items-end">
                      <Button size="lg" asChild>
                        <Link href="/contact">
                          Book a Meeting With Us at Blockchain Life
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Blockchain Summits */}
      {/* ----------------------------------------------------------------- */}
      <section ref={summits.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={summits.cVariants}
                initial="hidden"
                animate={summits.inView ? "visible" : "hidden"}
                className="grid items-center gap-10 lg:grid-cols-2"
              >
                <div>
                  <motion.div variants={summits.chVariants} className="mb-4">
                    <Globe
                      className="size-10 text-primary"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <motion.h2 variants={summits.chVariants}>
                    Blockchain Summits Series
                  </motion.h2>
                  <div className="spacer-small" />
                  <motion.p
                    variants={summits.chVariants}
                    className="text-[1.125rem] leading-relaxed text-foreground/70"
                  >
                    Bitmern is a partner of the Blockchain Summits conference
                    series &mdash; connecting miners, investors, developers, and
                    infrastructure providers across the global Bitcoin ecosystem.
                  </motion.p>
                  <div className="spacer-medium" />
                  <motion.div variants={summits.chVariants}>
                    <Button variant="secondary" size="lg" asChild>
                      <a
                        href="https://blockchainsummits.io"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn More at blockchainsummits.io &rarr;
                      </a>
                    </Button>
                  </motion.div>
                </div>

                {/* Right column — event image */}
                <motion.div
                  variants={summits.chVariants}
                  className="relative aspect-[16/9] overflow-hidden rounded-lg"
                >
                  <Image
                    src="/content/yt-blockchain-life.jpg"
                    alt="Bitmern team at Blockchain Life conference"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Past Events */}
      {/* ----------------------------------------------------------------- */}
      <section ref={past.ref} className="section-elevated">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={past.cVariants}
                initial="hidden"
                animate={past.inView ? "visible" : "hidden"}
                className="mb-12"
              >
                <motion.h2 variants={past.chVariants}>
                  Where We&rsquo;ve Been
                </motion.h2>
              </motion.div>

              <motion.div
                variants={past.crdStagger}
                initial="hidden"
                animate={past.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {PAST_EVENTS.map((event) => (
                  <motion.div
                    key={event.title}
                    variants={past.crdFade}
                    className="card-surface flex flex-col overflow-hidden rounded-lg border border-border/60"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col gap-2 p-6">
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          className="size-4 text-foreground/50"
                          strokeWidth={1.5}
                        />
                        <span className="font-mono text-xs text-foreground/50">
                          Past Event
                        </span>
                      </div>
                      <h4 className="font-heading text-[1.1rem] font-normal uppercase leading-tight tracking-tight">
                        {event.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-foreground/60">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Facility Tours */}
      {/* ----------------------------------------------------------------- */}
      <section ref={tours.ref}>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <motion.div
                variants={tours.cVariants}
                initial="hidden"
                animate={tours.inView ? "visible" : "hidden"}
                className="grid items-center gap-10 lg:grid-cols-2"
              >
                <div>
                  <motion.div variants={tours.chVariants} className="mb-4">
                    <Building2
                      className="size-10 text-primary"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <motion.h2 variants={tours.chVariants}>
                    Tour Our Facilities
                  </motion.h2>
                  <div className="spacer-small" />
                  <motion.p
                    variants={tours.chVariants}
                    className="text-[1.125rem] leading-relaxed text-foreground/70"
                  >
                    Want to see our infrastructure firsthand? We offer facility
                    tours at our Indiana, North Dakota, Missouri, and Ethiopia
                    locations. Tours are available for prospective clients,
                    institutional investors, and partners.
                  </motion.p>
                  <div className="spacer-medium" />
                  <motion.div variants={tours.chVariants}>
                    <Button size="lg" asChild>
                      <Link href="/contact">Schedule a Tour</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Right column — facility tour image */}
                <motion.div
                  variants={tours.chVariants}
                  className="relative aspect-[16/9] overflow-hidden rounded-lg"
                >
                  <Image
                    src="/content/yt-facility-tour.jpg"
                    alt="Bitmern mining facility tour"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* ----------------------------------------------------------------- */}
      <SectionCTA
        variant="dark"
        heading="Let's Meet"
        description="Whether it's at a conference, a facility tour, or a private consultation — we'd love to connect."
        primaryCTA={{ label: "Book a Meeting", href: "/contact" }}
        secondaryCTA={{ label: "Learn About Us", href: "/about" }}
      />
    </>
  )
}
