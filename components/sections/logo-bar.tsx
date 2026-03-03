"use client"

import { motion } from "framer-motion"
import { useSection } from "@/lib/motion"

const LOGOS = [
  "Bitmain",
  "MicroBT",
  "Canaan",
  "Auradine",
  "Marathon Digital",
  "OriginSpark",
]

export function LogoBar() {
  const { ref, inView, cVariants, chVariants } = useSection(0.5)

  return (
    <section ref={ref} className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="py-10">
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col items-center gap-6"
            >
              <motion.p variants={chVariants} className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                Trusted by industry leaders
              </motion.p>
              <motion.div variants={chVariants} className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                {LOGOS.map((name) => (
                  <span
                    key={name}
                    className="font-heading text-lg font-medium uppercase tracking-tight text-foreground/50 transition-colors duration-200 hover:text-foreground/70"
                  >
                    {name}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
