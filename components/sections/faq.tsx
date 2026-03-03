"use client"

import { motion } from "framer-motion"
import { useSection } from "@/lib/motion"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"

// ---------------------------------------------------------------------------
// FAQ data — split into two columns matching Webflow layout
// ---------------------------------------------------------------------------

const LEFT_FAQS = [
  {
    q: "What is the minimum order for purchasing miners?",
    a: "We accommodate orders from 10 units to 1,000+. Volume pricing kicks in at 50+ units, with significant discounts at 100+ and 500+ tiers.",
  },
  {
    q: "Which manufacturers do you source from?",
    a: "We have direct relationships with Bitmain, MicroBT, and Canaan. This means priority allocation on new releases and volume pricing without middleman markups.",
  },
  {
    q: "Where are your mining facilities located?",
    a: "Our facilities are strategically located in regions with low-cost, stable power infrastructure. Contact us for specific site details and tour availability.",
  },
  {
    q: "How is my equipment monitored and maintained?",
    a: "24/7 real-time monitoring with automated alerts. Our technicians handle firmware updates, repairs, and optimization. You get full dashboard access to hashrate, temperature, and performance metrics.",
  },
  {
    q: "How and when are mining payouts processed?",
    a: "Payouts are processed daily to your designated wallet. We support direct pool payouts or consolidated payments\u2014your choice.",
  },
]

const RIGHT_FAQS = [
  {
    q: "How long does it take from order to deployment?",
    a: "Typical timeline is 4\u20136 weeks for in-stock models. This can vary based on customs timelines. Pre-orders for new generation ASICs vary by manufacturer allocation. Colocation setup takes 48 hours on average once equipment arrives.",
  },
  {
    q: "Do you offer warranties on equipment?",
    a: "All equipment comes with the manufacturer\u2019s standard warranty (typically 6\u201312 months).",
  },
  {
    q: "What is your uptime guarantee?",
    a: "We maintain 97% uptime backed by redundant power systems, 24/7 monitoring, and on-site technicians.",
  },
  {
    q: "What are the hosting fees?",
    a: "Hosting is charged per kWh consumed, with rates varying by contract term and total capacity. Long-term contracts (12+ months) receive preferential rates. Contact us for a custom quote.",
  },
  {
    q: "Who owns the equipment?",
    a: "You do. Equipment purchased through us is 100% yours. For hosted miners, you retain full ownership and can request shipment at any time with 30 days notice.",
  },
]

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function FAQ() {
  const { ref: sectionRef, inView: isInView, cVariants, chVariants } = useSection(0.15)

  return (
    <section ref={sectionRef} className="section-elevated">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <motion.div
              variants={cVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Heading — centered */}
              <div className="mb-20 text-align-center">
                <motion.div variants={chVariants}>
                  <Tag>FAQ</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.div variants={chVariants}>
                  <h2>General FAQs</h2>
                </motion.div>
              </div>

              {/* 2-column accordion grid */}
              <motion.div
                variants={chVariants}
                className="grid gap-x-8 gap-y-4 lg:grid-cols-2"
              >
                {/* Left column */}
                <Accordion type="multiple" className="flex flex-col gap-4">
                  {LEFT_FAQS.map((faq, i) => (
                    <AccordionItem key={i} value={`left-${i}`}>
                      <AccordionTrigger className="px-6 py-5 text-[1rem] font-bold">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5">
                        <p className="text-[1.125rem] leading-relaxed text-foreground/70">
                          {faq.a}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Right column */}
                <Accordion type="multiple" className="flex flex-col gap-4">
                  {RIGHT_FAQS.map((faq, i) => (
                    <AccordionItem key={i} value={`right-${i}`}>
                      <AccordionTrigger className="px-6 py-5 text-[1rem] font-bold">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5">
                        <p className="text-[1.125rem] leading-relaxed text-foreground/70">
                          {faq.a}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>

              {/* Still have questions CTA */}
              <motion.div variants={chVariants} className="mt-20 text-align-center">
                <h3 className="font-heading text-[1.728rem] font-normal uppercase leading-none tracking-tight">
                  Still Have Questions?
                </h3>
                <p className="mt-3 text-foreground/60">
                  Reach out to our team to get answers:
                </p>
                <div className="mt-6">
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
