"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useSection } from "@/lib/motion"
import { Tag } from "@/components/ui/tag"

// ---------------------------------------------------------------------------
// Quote highlight — fuel-yellow on dark, high contrast
// ---------------------------------------------------------------------------

function Hl({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-primary">{children}</span>
}

// ---------------------------------------------------------------------------
// Testimonial data
// ---------------------------------------------------------------------------

interface TestimonialData {
  quote: React.ReactNode
  name: string
  title: string
  stars: number
}

const testimonials: TestimonialData[] = [
  {
    quote: (
      <>
        &ldquo;Very reliable mining company with a professional service. My{" "}
        <Hl>miners run stably</Hl> and the performance meets expectations. The
        platform is user-friendly and easy to monitor. Payouts are{" "}
        <Hl>processed reliably and transparently</Hl>. Highly recommended for
        anyone looking for serious mining.&rdquo;
      </>
    ),
    name: "CJ Brown",
    title: "30+ Miners Hosted",
    stars: 5,
  },
]

// ---------------------------------------------------------------------------
// Single testimonial card
// ---------------------------------------------------------------------------

function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialData
}) {
  return (
    <div className="card-surface relative flex flex-col rounded-lg border border-border/60 p-6 lg:p-8">
      {/* Decorative small quote mark */}
      <span
        className="pointer-events-none select-none font-heading text-[6rem] leading-none text-foreground/[0.06] absolute -top-2 left-4"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Star rating */}
      <div className="mb-5 flex items-center gap-1">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} className="size-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-base leading-[1.6] tracking-tight text-foreground/70 sm:text-lg sm:leading-[1.55]">
        <p>{testimonial.quote}</p>
      </blockquote>

      {/* Divider */}
      <div className="my-6 h-px w-12 bg-border" />

      {/* Attribution */}
      <div>
        <cite className="not-italic text-base font-semibold text-foreground">
          {testimonial.name}
        </cite>
        <div className="mt-1 font-mono text-xs uppercase tracking-widest text-foreground/40">
          {testimonial.title}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section — "Social Proof Wall"
// Facility photo background, 3-column testimonial grid, Trustpilot badge.
// ---------------------------------------------------------------------------

export function Testimonial() {
  const { ref: sectionRef, inView: isInView, cVariants, chVariants, crdStagger, crdFade } = useSection(0.15)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >

      {/* Content */}
      <div className="padding-global relative z-[2]">
        <div className="container-large">
          <div className="padding-section-large">
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-align-center"
            >
              {/* Tag */}
              <motion.div variants={chVariants}>
                <Tag>Trusted by Miners</Tag>
              </motion.div>

              <div className="spacer-xsmall" />

              {/* Heading */}
              <motion.h2 variants={chVariants}>
                What Our Clients Say
              </motion.h2>

              <div className="spacer-large" />
            </motion.div>

            {/* Testimonial grid — staggered entrance */}
            <motion.div
              variants={crdStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mx-auto max-w-xl"
            >
              {testimonials.map((t) => (
                <motion.div key={t.name} variants={crdFade}>
                  <TestimonialCard testimonial={t} />
                </motion.div>
              ))}
            </motion.div>

            <div className="spacer-large" />

            {/* Trustpilot badge — centered below grid */}
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex justify-center"
            >
              <motion.a
                variants={chVariants}
                href="https://www.trustpilot.com/review/bitmernmining.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Bitmern Mining reviews on Trustpilot"
                className="inline-flex items-center gap-3 rounded-md border border-border/60 bg-background/60 px-6 py-3 transition-colors duration-200 hover:bg-background"
              >
                <span className="text-sm font-medium text-foreground/60">
                  Rated Excellent on
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/trustpilot-logo.svg"
                  alt="Trustpilot"
                  className="h-auto w-32"
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
