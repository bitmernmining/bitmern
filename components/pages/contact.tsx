"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { useSection } from "@/lib/motion"
import { ImageSection } from "@/components/ui/image-section"
import { SectionCTA } from "@/components/ui/section-cta"

type FormState = "idle" | "submitting" | "success" | "error"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CONTACT_METHODS = [
  {
    icon: CalendarDays,
    title: "Book a Strategy Call",
    description:
      "Free 30-minute consultation with our mining experts. We\u2019ll assess your goals, recommend a deployment strategy, and walk you through pricing.",
    cta: "Book a Call",
    href: "https://calendly.com/bitmernmining",
  },
  {
    icon: Mail,
    title: "Email Us",
    email: "info@bitmernmining.com",
    description:
      "For general inquiries, hosting quotes, bulk hardware orders, and partnership proposals. Response within 24 hours.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp / Telegram",
    whatsapp: "+971 58 538 2409",
    telegram: "@BitmernMining",
    description:
      "Quick questions and real-time support. Available during business hours.",
  },
]

const SERVICE_LINKS = [
  {
    icon: Server,
    title: "Hosting Quote",
    description: "Get pricing for your fleet at any of our 7 facilities",
    href: "/hosting",
  },
  {
    icon: ShoppingCart,
    title: "Hardware Purchase",
    description: "Browse 150+ miners from 17 brands",
    href: "https://shop.bitmernmining.com",
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
    href: "https://bitmernsolo.com",
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
  { label: "Email", value: "info@bitmernmining.com" },
  { label: "Phone", value: "+1 (307) 284-2990" },
  { label: "WhatsApp", value: "+971 58 538 2409" },
  { label: "Telegram", value: "@BitmernMining" },
  { label: "Solo Pool Support", value: "support@bitmernsolo.com" },
]

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Hosting Quote",
  "Hardware Purchase",
  "Institutional / Blocks Fund",
  "MARA Firmware",
  "Partnership",
  "Solo Pool Support",
  "Other",
]

const BUDGET_OPTIONS = [
  "<$10K",
  "$10K\u2013$50K",
  "$50K\u2013$100K",
  "$100K\u2013$500K",
  "$500K\u2013$1M",
  "$1M\u2013$5M",
  "$5M+",
]

// ---------------------------------------------------------------------------
// Shared input styles
// ---------------------------------------------------------------------------

const inputClass =
  "h-11 w-full rounded-md border border-border/60 bg-transparent px-4 py-2 text-sm placeholder:text-foreground/40 outline-none transition-colors duration-200 hover:border-border focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"

const textareaClass =
  "min-h-[120px] w-full rounded-md border border-border/60 bg-transparent px-4 py-3 text-sm placeholder:text-foreground/40 outline-none transition-colors duration-200 hover:border-border focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y"

const selectClass =
  "h-11 w-full rounded-md border border-border/60 bg-background px-4 py-2 text-sm text-foreground/70 outline-none transition-colors duration-200 hover:border-border focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none"

// ---------------------------------------------------------------------------
// Trust stats for facility photo overlay
// ---------------------------------------------------------------------------

const TRUST_STATS = [
  { value: "7", label: "Facilities" },
  { value: "97%", label: "Uptime" },
  { value: "1,400+", label: "Miners Deployed" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContactPage() {
  const hero = useSection()
  const methods = useSection()
  const form = useSection()
  const services = useSection()
  const direct = useSection()

  const [formState, setFormState] = useState<FormState>("idle")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("submitting")

    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())

    try {
      // TODO: Replace with real API call (e.g. POST /api/contact)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[contact] form submission:", data)
      setFormState("success")
    } catch {
      setFormState("error")
    }
  }

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero — Dark with facility photo background */}
      {/* ----------------------------------------------------------------- */}
      <ImageSection
        src="/facilities/indiana.webp"
        alt="Bitmern Mining facility in Indiana"
        overlay="dark"
      >
        <div className="padding-section-large" ref={hero.ref}>
          <motion.div
            variants={hero.cVariants}
            initial="hidden"
            animate={hero.inView ? "visible" : "hidden"}
            className="max-w-3xl text-white"
          >
            <motion.div variants={hero.chVariants}>
              <Tag>Contact</Tag>
            </motion.div>
            <div className="spacer-xsmall" />
            <motion.h1 variants={hero.chVariants} className="text-white">
              Let&rsquo;s Talk Mining
            </motion.h1>
            <div className="spacer-small" />
            <motion.p
              variants={hero.chVariants}
              className="text-[1.125rem] leading-relaxed text-white/70"
            >
              Whether you&rsquo;re deploying your first miner or scaling an
              institutional portfolio, our team is ready to help. Book a
              strategy call, request a quote, or reach out directly.
            </motion.p>
          </motion.div>
        </div>
      </ImageSection>

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
                            <a href={method.href}>{method.cta}</a>
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
      {/* Contact Form — Split Layout: Facility Photo | Form */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium" ref={form.ref}>
              <motion.div
                variants={form.cVariants}
                initial="hidden"
                animate={form.inView ? "visible" : "hidden"}
                className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]"
              >
                {/* Left — Facility photo with trust overlay */}
                <motion.div
                  variants={form.chVariants}
                  className="hidden lg:block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src="/facilities/indiana.webp"
                      alt="Inside Bitmern Mining's Indiana facility"
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

                {/* Right — Contact form */}
                <div>
                  <motion.h2 variants={form.chVariants} className="mb-10">
                    Send Us a Message
                  </motion.h2>

                  <AnimatePresence mode="wait">
                    {formState === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center gap-4 rounded-lg border border-primary/30 bg-primary/[0.04] p-10 text-center"
                      >
                        <CheckCircle2 className="size-10 text-primary" strokeWidth={1.5} />
                        <h3 className="font-heading text-[1.2rem] font-normal uppercase tracking-tight">
                          Message Sent
                        </h3>
                        <p className="text-base leading-relaxed text-foreground/70">
                          Thanks! We&rsquo;ll be in touch within 24 hours.
                        </p>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setFormState("idle")
                            formRef.current?.reset()
                          }}
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        ref={formRef}
                        variants={form.chVariants}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                      >
                        {/* Error banner */}
                        {formState === "error" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/[0.06] p-4"
                          >
                            <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" strokeWidth={1.5} />
                            <p className="text-sm text-foreground/80">
                              Something went wrong. Please try again or email us
                              directly at{" "}
                              <a
                                href="mailto:info@bitmernmining.com"
                                className="font-medium text-primary hover:underline"
                              >
                                info@bitmernmining.com
                              </a>
                            </p>
                          </motion.div>
                        )}

                        {/* Name + Email row */}
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="contact-name"
                              className="mb-2 block text-sm font-medium"
                            >
                              Name <span className="text-destructive">*</span>
                            </label>
                            <input
                              id="contact-name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              placeholder="Your full name"
                              required
                              disabled={formState === "submitting"}
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="contact-email"
                              className="mb-2 block text-sm font-medium"
                            >
                              Email <span className="text-destructive">*</span>
                            </label>
                            <input
                              id="contact-email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              placeholder="you@company.com"
                              required
                              disabled={formState === "submitting"}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* Phone + Company row */}
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="contact-phone"
                              className="mb-2 block text-sm font-medium"
                            >
                              Phone{" "}
                              <span className="text-foreground/40">(optional)</span>
                            </label>
                            <input
                              id="contact-phone"
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="+1 (555) 000-0000"
                              disabled={formState === "submitting"}
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="contact-company"
                              className="mb-2 block text-sm font-medium"
                            >
                              Company{" "}
                              <span className="text-foreground/40">(optional)</span>
                            </label>
                            <input
                              id="contact-company"
                              name="company"
                              type="text"
                              autoComplete="organization"
                              placeholder="Your company name"
                              disabled={formState === "submitting"}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* Subject */}
                        <div>
                          <label
                            htmlFor="contact-subject"
                            className="mb-2 block text-sm font-medium"
                          >
                            Subject
                          </label>
                          <select
                            id="contact-subject"
                            name="subject"
                            className={selectClass}
                            defaultValue=""
                            disabled={formState === "submitting"}
                          >
                            <option value="" disabled>
                              Select a topic
                            </option>
                            {SUBJECT_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            htmlFor="contact-message"
                            className="mb-2 block text-sm font-medium"
                          >
                            Message <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            id="contact-message"
                            name="message"
                            placeholder="Tell us about your project..."
                            required
                            disabled={formState === "submitting"}
                            className={textareaClass}
                          />
                        </div>

                        {/* Budget */}
                        <div>
                          <label
                            htmlFor="contact-budget"
                            className="mb-2 block text-sm font-medium"
                          >
                            Budget Range{" "}
                            <span className="text-foreground/40">(optional)</span>
                          </label>
                          <select
                            id="contact-budget"
                            name="budget"
                            className={selectClass}
                            defaultValue=""
                            disabled={formState === "submitting"}
                          >
                            <option value="" disabled>
                              Select a range
                            </option>
                            {BUDGET_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                          <Button
                            type="submit"
                            size="lg"
                            isLoading={formState === "submitting"}
                            disabled={formState === "submitting"}
                          >
                            {formState === "submitting" ? "Sending..." : "Send Message"}
                          </Button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
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
                  return (
                    <motion.a
                      key={service.title}
                      href={service.href}
                      variants={services.crdFade}
                      className="card-surface group flex items-start gap-4 rounded-lg border border-border/60 p-6 transition-colors duration-200 hover:border-border"
                    >
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
                    </motion.a>
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
                  Reach Us Directly
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
        primaryCTA={{ label: "Book a Call", href: "https://calendly.com/bitmernmining" }}
        secondaryCTA={{ label: "View Facilities", href: "/facilities" }}
      />
    </>
  )
}
