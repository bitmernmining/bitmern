"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
  {
    quote: (
      <>
        &ldquo;MARA firmware has been a <Hl>game changer</Hl> for our
        operation. The efficiency gains are real — we&rsquo;ve seen{" "}
        <Hl>measurable improvements</Hl> across our entire fleet.&rdquo;
      </>
    ),
    name: "Abdulrahman Hamdy",
    title: "Zero Two Mining",
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
    <div className="relative flex flex-col rounded-lg border border-white/10 bg-white/[0.03] p-6 lg:p-8">
      {/* Decorative small quote mark */}
      <span
        className="pointer-events-none select-none font-heading text-[6rem] leading-none text-white/[0.15] absolute -top-2 left-4"
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
      <blockquote className="flex-1 text-base leading-[1.6] tracking-tight text-white/80 sm:text-lg sm:leading-[1.55]">
        <p>{testimonial.quote}</p>
      </blockquote>

      {/* Divider */}
      <div className="my-6 h-px w-12 bg-white/10" />

      {/* Attribution */}
      <div>
        <cite className="not-italic text-base font-semibold text-white">
          {testimonial.name}
        </cite>
        <div className="mt-1 font-mono text-xs uppercase tracking-widest text-white/40">
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
      className="section-dark relative overflow-hidden"
    >
      {/* Facility photo background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/facilities/addis-ababa.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
          priority={false}
        />
        {/* Heavy overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Warm radial glow — barely-there fuel-yellow undertone */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.18 0.015 78 / 0.5) 0%, transparent 70%)",
        }}
      />

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
                <Tag variant="alternate">Trusted by Miners</Tag>
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
              className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto"
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
                className="inline-flex items-center gap-3 rounded-md border border-white/[0.08] bg-white/[0.04] px-6 py-3 transition-colors duration-200 hover:bg-white/[0.08]"
              >
                <span className="text-sm font-medium text-white/70">
                  Rated Excellent on
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/trustpilot-logo.svg"
                  alt="Trustpilot"
                  className="h-auto w-32 brightness-0 invert"
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
