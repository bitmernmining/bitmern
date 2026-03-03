"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Linkedin, Instagram, Youtube, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type NewsletterState = "idle" | "submitting" | "success" | "error"

// ---------------------------------------------------------------------------
// Footer link columns
// ---------------------------------------------------------------------------

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Institutional", href: "/institutional" },
      { label: "Hosting", href: "/hosting" },
      { label: "Solo Pool", href: "/solo-pool" },
      { label: "Hardware", href: "/hardware" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { label: "Our Facilities", href: "/facilities" },
      { label: "Technology", href: "/technology" },
      { label: "Expansion", href: "/expansion" },
      { label: "MARA Firmware", href: "/mara-firmware" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership", href: "/team" },
      { label: "Partners", href: "/partners" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "All Articles", href: "/insights" },
      { label: "Mining Trends", href: "/insights#mining" },
      { label: "Hardware Reviews", href: "/insights#hardware" },
      { label: "Strategy Guides", href: "/insights#strategy" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Get Started", href: "/contact" },
      { label: "Contact Sales", href: "mailto:info@bitmernmining.com" },
      { label: "Book a Call", href: "/contact#book" },
      { label: "Solo Pool Support", href: "https://bitmernsolo.com/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookies Policy", href: "/cookies" },
      { label: "About Bitmern", href: "/about" },
    ],
  },
]

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export function Footer() {
  const [nlState, setNlState] = useState<NewsletterState>("idle")

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setNlState("submitting")

    const fd = new FormData(e.currentTarget)
    const email = fd.get("email") as string

    try {
      // TODO: Replace with real newsletter API (e.g. Mailchimp, ConvertKit, Loops)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[footer newsletter] subscribed:", email)
      setNlState("success")
    } catch {
      setNlState("error")
    }
  }

  return (
    <footer className="section-dark" aria-label="Site footer">
      <div className="padding-global">
        <div className="container-large">
          {/* Newsletter row */}
          <div className="flex flex-col gap-6 py-16 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-tight text-current">
                Join our newsletter
              </h3>
              <p className="mt-1 opacity-60">
                Stay updated on mining infrastructure, market insights, and
                Bitmern news.
              </p>
            </div>

            <div className="shrink-0">
              {nlState === "success" ? (
                <div className="flex items-center gap-2 py-2">
                  <CheckCircle2 className="size-5 text-primary" strokeWidth={1.5} />
                  <span className="text-sm font-medium">You&rsquo;re subscribed!</span>
                </div>
              ) : (
                <>
                  <form
                    className="flex items-center gap-3"
                    onSubmit={handleNewsletterSubmit}
                  >
                    <input
                      type="email"
                      name="email"
                      required
                      aria-label="Email address"
                      autoComplete="email"
                      placeholder="Enter your email"
                      disabled={nlState === "submitting"}
                      className="h-11 min-w-[16rem] rounded-md border border-white/15 bg-white/[0.08] px-4 text-sm text-[var(--foreground)] outline-none placeholder:text-white/30 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 disabled:opacity-50"
                    />
                    <Button
                      type="submit"
                      isLoading={nlState === "submitting"}
                      disabled={nlState === "submitting"}
                    >
                      {nlState === "submitting" ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </form>
                  {nlState === "error" && (
                    <p className="mt-2 text-sm text-destructive">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <p className="mt-3 font-mono text-xs opacity-40">
                    By subscribing you agree to with our{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2 opacity-60 transition-opacity duration-200 hover:opacity-100"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Trusted by — manufacturer badges */}
          <div className="flex flex-wrap items-center gap-6 py-6">
            <span className="font-mono text-xs uppercase tracking-widest opacity-50">Trusted by</span>
            {["Bitmain", "MicroBT", "Canaan", "Marathon Digital", "OriginSpark"].map((name) => (
              <span key={name} className="font-mono text-sm opacity-50 transition-opacity duration-200 hover:opacity-80">{name}</span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-current/10" />

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 sm:grid-cols-3 lg:grid-cols-6">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="mb-4 font-heading font-semibold uppercase tracking-tight text-current">{col.title}</div>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm opacity-60 transition-opacity duration-200 hover:opacity-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2 py-6 text-sm opacity-50">
            <p>Address available upon request</p>
            {/* TODO: Add real phone number */}
            <p>Phone available upon request</p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@bitmernmining.com"
                className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-80"
              >
                info@bitmernmining.com
              </a>
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 py-6">
            <a href="https://www.linkedin.com/company/bitmern" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center size-9 rounded-md opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-white/[0.08]">
              <Linkedin className="size-5" />
            </a>
            <a href="https://www.instagram.com/bitmernmining" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center size-9 rounded-md opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-white/[0.08]">
              <Instagram className="size-5" />
            </a>
            <a href="https://www.youtube.com/@bitmern" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center justify-center size-9 rounded-md opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-white/[0.08]">
              <Youtube className="size-5" />
            </a>
          </div>

          {/* Divider */}
          <div className="h-px bg-current/10" />

          {/* Bottom bar — logo + copyright */}
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.svg"
                alt="Bitmern Mining"
                width={136}
                height={40}
                className="max-w-[8.5rem] brightness-0 invert"
              />
            </Link>
            <p className="text-sm opacity-40">
              &copy; {new Date().getFullYear()} Bitmern Technologies, LLC. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
