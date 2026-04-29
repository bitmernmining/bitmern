import Link from "next/link"
import Image from "next/image"
import { Linkedin, Instagram, Youtube, Mail, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT, SOCIAL } from "@/lib/contact"

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
    title: "Contact",
    links: [
      { label: "Get Started", href: "/contact" },
      { label: "Contact Sales", href: `mailto:${CONTACT.email}` },
      { label: "Book a Call", href: CONTACT.calendly },
      { label: "Solo Pool Support", href: CONTACT.soloContact },
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
  return (
    <footer className="section-elevated" aria-label="Site footer">
      <div className="padding-global">
        <div className="container-large">
          {/* Top CTA row */}
          <div className="flex flex-col gap-6 py-16 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-tight text-current">
                Talk to our team
              </h3>
              <p className="mt-1 opacity-60">
                Hosting quotes, institutional consultation, hardware orders, and
                Solo Pool support — we respond within 24 hours.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild>
                <a href={`mailto:${CONTACT.email}`}>
                  <Mail className="size-4" strokeWidth={1.75} />
                  Contact Sales
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="size-4" strokeWidth={1.75} />
                  Book a Call
                </a>
              </Button>
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
            <p>Phone available upon request</p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-80"
              >
                {CONTACT.email}
              </a>
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 py-6">
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center size-9 rounded-md opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-foreground/[0.08]">
              <Linkedin className="size-5" />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center size-9 rounded-md opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-foreground/[0.08]">
              <Instagram className="size-5" />
            </a>
            <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center justify-center size-9 rounded-md opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-foreground/[0.08]">
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
                className="max-w-[8.5rem]"
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
