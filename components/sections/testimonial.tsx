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
// Section — "The Quiet Room"
// Deep warm charcoal, oversized decorative quote mark, pristine typography.
// Readability-first — no canvas animation, no visual noise.
// ---------------------------------------------------------------------------

export function Testimonial() {
  const { ref: sectionRef, inView: isInView, cVariants, chVariants } = useSection(0.3)

  return (
    <section
      ref={sectionRef}
      className="section-dark relative overflow-hidden"
    >
      {/* Decorative oversized quotation mark — subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
      >
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] font-heading text-[28rem] leading-none text-white/[0.025] md:text-[40rem]"
        >
          &ldquo;
        </span>
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
            <div className="mx-auto max-w-[52rem]">
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
                  Client Testimonial
                </motion.h2>

                <div className="spacer-large" />

                {/* Quote — Webflow: 2rem, weight 400, line-height 1.125 */}
                <motion.blockquote
                  variants={chVariants}
                  className="text-lg leading-[1.5] tracking-tight text-white/85 sm:text-xl sm:leading-[1.45] md:text-2xl md:leading-[1.35] lg:text-[2rem] lg:leading-[1.25]"
                >
                  <p>
                    &ldquo;Very <Hl>reliable</Hl> mining company with a{" "}
                    <Hl>professional service</Hl>. My{" "}
                    <Hl>miners run stably</Hl> and the performance meets
                    expectations. The platform is <Hl>user-friendly</Hl> and{" "}
                    <Hl>easy to monitor</Hl>. Payouts are{" "}
                    <Hl>processed reliably</Hl> and <Hl>transparently</Hl>.
                    Highly recommended for anyone looking for serious
                    mining.&rdquo;
                  </p>
                </motion.blockquote>

                <div className="spacer-large" />

                {/* Divider */}
                <motion.div
                  variants={chVariants}
                  className="mx-auto h-px w-16 bg-white/10"
                />

                <div className="spacer-large" />

                {/* Attribution row — stars + name + Trustpilot */}
                <motion.div
                  variants={chVariants}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Star rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Name + role */}
                  <div className="text-center">
                    <cite className="not-italic text-lg font-semibold text-white">
                      CJ Brown
                    </cite>
                    <div className="mt-1 font-mono text-xs uppercase tracking-widest text-white/40">
                      30+ Miners Hosted
                    </div>
                  </div>

                  {/* Trustpilot badge */}
                  <a
                    href="https://www.trustpilot.com/review/bitmernmining.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Bitmern Mining reviews on Trustpilot"
                    className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 transition-colors duration-200 hover:bg-white/[0.08]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/trustpilot-logo.svg"
                      alt="Trustpilot"
                      className="h-auto w-28 brightness-0 invert opacity-60"
                    />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
