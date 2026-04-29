"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  CalendarDays,
  Mail,
  MessageCircle,
  Server,
  ShoppingCart,
  Landmark,
  Pickaxe,
  Cpu,
  Building2,
} from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { useSection } from "@/lib/motion"
import { SectionCTA } from "@/components/ui/section-cta"
import { CONTACT } from "@/lib/contact"
import { STATS } from "@/lib/stats"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CONTACT_METHODS = [
  {
    icon: CalendarDays,
    title: "Book a Strategy Call",
    description:
      "Free 30-minute consultation with our mining experts. We’ll assess your goals, recommend a deployment strategy, and walk you through pricing.",
    cta: "Book a Call",
    href: CONTACT.calendly,
  },
  {
    icon: Mail,
    title: "Email Us",
    email: CONTACT.email,
    description:
      "For general inquiries, hosting quotes, bulk hardware orders, and partnership proposals. Response within 24 hours.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp / Telegram",
    whatsapp: CONTACT.whatsapp,
    telegram: CONTACT.telegram,
    description:
      "Quick questions and real-time support. Available during business hours.",
  },
]

type ServiceLink = {
  icon: typeof Server
  title: string
  description: string
  href: string
  external?: boolean
}

const SERVICE_LINKS: ServiceLink[] = [
  {
    icon: Server,
    title: "Hosting Quote",
    description: "Get pricing for your fleet at any of our facilities",
    href: "/hosting",
  },
  {
    icon: ShoppingCart,
    title: "Hardware Purchase",
    description: "Browse 150+ miners from 17 brands",
    href: CONTACT.shop,
    external: true,
  },
  {
    icon: Landmark,
    title: "Institutional Investment",
    description: "Blocks Fund materials and private consultation",
    href: "/institutional",
  },
  {
    icon: Pickaxe,
    title: "Solo Mining",
    description: "Get started with Bitmern Solo pool",
    href: CONTACT.solo,
    external: true,
  },
  {
    icon: Cpu,
    title: "MARA Firmware",
    description: "Upgrade your fleet with MARAFW",
    href: "/mara-firmware",
  },
  {
    icon: Building2,
    title: "Facility Tour",
    description: "Visit any of our active facilities",
    href: "/facilities",
  },
]

const CONTACT_INFO = [
  { label: "Email", value: CONTACT.email },
  { label: "Phone", value: CONTACT.phone },
  { label: "WhatsApp", value: CONTACT.whatsapp },
  { label: "Telegram", value: CONTACT.telegram },
  { label: "Solo Pool Support", value: CONTACT.soloSupport },
]

// ---------------------------------------------------------------------------
// Trust stats for facility photo overlay
// ---------------------------------------------------------------------------

const TRUST_STATS = [
  { value: STATS.facilitiesActive, label: "Facilities" },
  { value: STATS.uptime, label: "Uptime" },
  { value: STATS.minersDeployed, label: "Miners Deployed" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContactPage() {
  const hero = useSection()
  const methods = useSection()
  const reach = useSection()
  const services = useSection()
  const direct = useSection()

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
                  <Tag>Contact</Tag>
                </motion.div>
                <div className="spacer-xsmall" />
                <motion.h1 variants={hero.chVariants}>
                  Let&rsquo;s Talk Mining
                </motion.h1>
                <div className="spacer-small" />
                <motion.p
                  variants={hero.chVariants}
                  className="text-[1.125rem] leading-relaxed text-foreground/60"
                >
                  Whether you&rsquo;re deploying your first miner or scaling an
                  institutional portfolio, our team is ready to help. Book a
                  strategy call or reach out directly.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Contact Methods */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={methods.ref}>
              <motion.div
                variants={methods.crdStagger}
                initial="hidden"
                animate={methods.inView ? "visible" : "hidden"}
                className="grid gap-6 md:grid-cols-3"
              >
                {CONTACT_METHODS.map((method) => {
                  const Icon = method.icon
                  return (
                    <motion.div
                      key={method.title}
                      variants={methods.crdFade}
                      className="card-surface flex flex-col gap-4 rounded-lg border border-border/60 p-8"
                    >
                      <div className="inline-flex w-fit items-center justify-center rounded bg-primary p-2 text-primary-foreground">
                        <Icon className="size-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-heading text-[1.2rem] font-normal uppercase leading-none tracking-tight">
                        {method.title}
                      </h3>
                      {"email" in method && method.email && (
                        <a
                          href={`mailto:${method.email}`}
                          className="font-mono text-sm text-primary hover:underline"
                        >
                          {method.email}
                        </a>
                      )}
                      {"whatsapp" in method && method.whatsapp && (
                        <div className="flex flex-col gap-1 font-mono text-sm text-foreground/60">
                          <span>WhatsApp: {method.whatsapp}</span>
                          <span>Telegram: {method.telegram}</span>
                        </div>
                      )}
                      <p className="text-base leading-relaxed text-foreground/70">
                        {method.description}
                      </p>
                      {"cta" in method && method.cta && (
                        <div className="mt-auto pt-2">
                          <Button variant="secondary" size="sm" asChild>
                            <a href={method.href} target="_blank" rel="noopener noreferrer">{method.cta}</a>
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Reach Us — Split Layout: Facility Photo | Direct CTAs */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={reach.ref}>
              <motion.div
                variants={reach.cVariants}
                initial="hidden"
                animate={reach.inView ? "visible" : "hidden"}
                className="grid items-stretch gap-12 lg:grid-cols-[1fr_1fr]"
              >
                {/* Left — Facility photo with trust overlay */}
                <motion.div
                  variants={reach.chVariants}
                  className="hidden lg:block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src="/facilities/addis-ababa.webp"
                      alt="Bitmern Mining facility"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 42vw, 0px"
                      quality={85}
                    />
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Trust stats */}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                      {TRUST_STATS.map((stat) => (
                        <div key={stat.label} className="text-white">
                          <div className="font-heading text-2xl font-bold leading-none">
                            {stat.value}
                          </div>
                          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-white/60">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right — Direct CTA panel */}
                <motion.div
                  variants={reach.chVariants}
                  className="flex flex-col justify-center"
                >
                  <h2 className="mb-4">Reach Us Directly</h2>
                  <p className="mb-10 text-[1.0625rem] leading-relaxed text-foreground/60">
                    The fastest way to get answers: book a 30-minute strategy
                    call, email our team, or message us on WhatsApp. We respond
                    within 24 hours.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button size="lg" asChild>
                      <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer">
                        <CalendarDays className="size-4" strokeWidth={1.75} />
                        Book a Call
                      </a>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                      <a href={`mailto:${CONTACT.email}`}>
                        <Mail className="size-4" strokeWidth={1.75} />
                        Email Us
                      </a>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                      <a
                        href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4" strokeWidth={1.75} />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Services Quick Links */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={services.ref}>
              <motion.div
                variants={services.cVariants}
                initial="hidden"
                animate={services.inView ? "visible" : "hidden"}
                className="mb-12"
              >
                <motion.h2 variants={services.chVariants}>
                  What Can We Help With?
                </motion.h2>
              </motion.div>

              <motion.div
                variants={services.crdStagger}
                initial="hidden"
                animate={services.inView ? "visible" : "hidden"}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {SERVICE_LINKS.map((service) => {
                  const Icon = service.icon
                  const cardClass =
                    "card-surface group flex items-start gap-4 rounded-lg border border-border/60 p-6 transition-colors duration-200 hover:border-border"

                  const content = (
                    <>
                      <div className="flex size-10 shrink-0 items-center justify-center rounded bg-foreground/5">
                        <Icon
                          className="size-5 text-foreground/50"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h4 className="mb-1 font-heading text-base font-medium uppercase tracking-tight">
                          {service.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-foreground/60">
                          {service.description}
                        </p>
                      </div>
                    </>
                  )

                  return (
                    <motion.div
                      key={service.title}
                      variants={services.crdFade}
                    >
                      {service.external ? (
                        <a
                          href={service.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cardClass}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link href={service.href} className={cardClass}>
                          {content}
                        </Link>
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Direct Contact Info */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={direct.ref}>
              <motion.div
                variants={direct.cVariants}
                initial="hidden"
                animate={direct.inView ? "visible" : "hidden"}
              >
                <motion.h2 variants={direct.chVariants} className="mb-10">
                  All Contact Details
                </motion.h2>
                <motion.div
                  variants={direct.chVariants}
                  className="card-surface overflow-hidden rounded-lg border border-border/60"
                >
                  <table className="w-full">
                    <tbody>
                      {CONTACT_INFO.map((info, i) => (
                        <tr
                          key={info.label}
                          className={
                            i < CONTACT_INFO.length - 1
                              ? "border-b border-border/40"
                              : ""
                          }
                        >
                          <td className="px-6 py-4 font-mono text-sm font-medium text-foreground/50">
                            {info.label}
                          </td>
                          <td className="px-6 py-4 text-sm">{info.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
        tag="Get Started"
        heading="Ready to Scale Your Mining Operation?"
        description="Book a free strategy call and let our team build a deployment plan tailored to your goals."
        primaryCTA={{ label: "Book a Call", href: CONTACT.calendly }}
        secondaryCTA={{ label: "View Facilities", href: "/facilities" }}
      />
    </>
  )
}
