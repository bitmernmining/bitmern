"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Server,
  Calculator,
  Cpu,
  Factory,
  Settings,
  Globe,
  ClipboardList,
  BookOpen,
  Users,
  Handshake,
  CalendarDays,
  Menu,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useScrolled } from "@/hooks/use-scrolled"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIconWrapper,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

// ---------------------------------------------------------------------------
// Dropdown item data
// ---------------------------------------------------------------------------

const servicesItems = [
  {
    icon: Building2,
    title: "Institutional",
    description: "Structured mining exposure for Family Offices & HNWIs.",
    link: "Explore Blocks Fund",
    href: "/institutional",
  },
  {
    icon: Server,
    title: "Hosting",
    description: "Managed ASIC colocation at our global facilities.",
    link: "View Hosting Plans",
    href: "/hosting",
  },
  {
    icon: Calculator,
    title: "Solo Pool",
    description: "Solo mine BTC, LTC, DOGE, BCH & DGB. 1% fee.",
    link: "Start Solo Mining",
    href: "/solo-pool",
  },
  {
    icon: Cpu,
    title: "Hardware",
    description: "Browse ASICs and mining equipment, compare, and buy.",
    link: "Shop Equipment",
    href: "/hardware",
  },
]

const infrastructureItems = [
  {
    icon: Factory,
    title: "Our Facilities",
    description: "Global mining infrastructure.",
    link: "Tour Our Sites",
    href: "/facilities",
  },
  {
    icon: Settings,
    title: "Technology",
    description: "SuperApp monitoring and enterprise security.",
    link: "See Our Stack",
    href: "/technology",
  },
  {
    icon: Globe,
    title: "Expansion",
    description: "Finland and 500 MW OriginSpark pipeline.",
    link: "View Pipeline",
    href: "/expansion",
  },
  {
    icon: ClipboardList,
    title: "MARA Firmware",
    description: "Up to 35% overclocking with auto-tuning.",
    link: "Learn More",
    href: "/mara-firmware",
  },
]

const companyItems = [
  {
    icon: BookOpen,
    title: "Our Story",
    description: "How Bitmern grew from Greece to global enterprise.",
    link: "Learn Our History",
    href: "/about",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Meet the team behind Bitmern Mining.",
    link: "Meet the Team",
    href: "/team",
  },
  {
    icon: Handshake,
    title: "Partners",
    description: "OriginSpark, MARA, Bitmain and more.",
    link: "See Our Partners",
    href: "/partners",
  },
  {
    icon: CalendarDays,
    title: "Events",
    description: "Blockchain Summits and conferences.",
    link: "View Upcoming",
    href: "/events",
  },
]

// ---------------------------------------------------------------------------
// DropdownItem — single item inside a NavigationMenuContent grid
// ---------------------------------------------------------------------------

function DropdownItem({
  icon: Icon,
  title,
  description,
  link,
  href,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  link: string
  href: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.15,
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <NavigationMenuLink href={href} className="hover:bg-accent/50">
        <div className="mb-3">
          <NavigationMenuIconWrapper>
            <Icon className="size-5" />
          </NavigationMenuIconWrapper>
        </div>
        <div className="flex flex-col">
          <div className="mb-1 font-heading text-[1.2rem] font-normal uppercase leading-tight tracking-[-0.01375rem]">
            {title}
          </div>
          <p className="text-sm leading-snug">{description}</p>
          <div className="mt-2 text-sm underline underline-offset-2 transition-colors duration-200 group-hover/link:text-primary">
            {link}
          </div>
        </div>
      </NavigationMenuLink>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export function Navbar() {
  const scrolled = useScrolled(20)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Body scroll lock + Escape key handler
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden")
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false)
      }
      document.addEventListener("keydown", onKey)
      return () => {
        document.body.classList.remove("overflow-hidden")
        document.removeEventListener("keydown", onKey)
      }
    }
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [mobileOpen])

  // Focus trap — keep focus inside mobile overlay
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return
    const menu = mobileMenuRef.current
    const focusableSelector = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const focusable = menu.querySelectorAll<HTMLElement>(focusableSelector)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", handleTab)
    return () => document.removeEventListener("keydown", handleTab)
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 px-[5%] pt-6 pb-0">
      <div
        className={cn(
          "mx-auto w-full max-w-[64rem] relative flex min-h-[4.5rem] items-center justify-between rounded-xl border px-8",
          "transition-all duration-300",
          scrolled
            ? "border-border/60 bg-background/90 backdrop-blur-xl shadow-[0_1px_0_0_oklch(0_0_0/0.04),0_2px_8px_0_oklch(0_0_0/0.08),0_8px_24px_0_oklch(0_0_0/0.04)]"
            : "border-border/20 bg-background/50 backdrop-blur-sm"
        )}
      >
            {/* ---- Left: Logo ---- */}
            <Link href="/" className="shrink-0 transition-opacity duration-200 hover:opacity-80">
              <Image
                src="/logo.svg"
                alt="Bitmern Mining"
                width={136}
                height={40}
                className="max-w-[8.5rem]"
                priority
              />
            </Link>

            {/* ---- Center: Desktop nav ---- */}
            <NavigationMenu aria-label="Main navigation" className="hidden min-w-0 max-w-none lg:flex">
              <NavigationMenuList>
                {/* Services */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    data-active={servicesItems.some((item) => pathname.startsWith(item.href)) ? "true" : undefined}
                    className="relative data-[active=true]:text-foreground data-[active=true]:after:content-[''] data-[active=true]:after:absolute data-[active=true]:after:bottom-0 data-[active=true]:after:left-3 data-[active=true]:after:right-3 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-primary data-[active=true]:after:rounded-full"
                  >Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-8 xl:gap-x-12 gap-y-4 xl:gap-y-2 px-6 xl:px-8 pt-4 pb-6">
                      {servicesItems.map((item, i) => (
                        <DropdownItem key={item.title} {...item} index={i} />
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Infrastructure */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    data-active={infrastructureItems.some((item) => pathname.startsWith(item.href)) ? "true" : undefined}
                    className="relative data-[active=true]:text-foreground data-[active=true]:after:content-[''] data-[active=true]:after:absolute data-[active=true]:after:bottom-0 data-[active=true]:after:left-3 data-[active=true]:after:right-3 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-primary data-[active=true]:after:rounded-full"
                  >Infrastructure</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-8 xl:gap-x-12 gap-y-4 xl:gap-y-2 px-6 xl:px-8 pt-4 pb-6">
                      {infrastructureItems.map((item, i) => (
                        <DropdownItem key={item.title} {...item} index={i} />
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    data-active={companyItems.some((item) => pathname.startsWith(item.href)) ? "true" : undefined}
                    className="relative data-[active=true]:text-foreground data-[active=true]:after:content-[''] data-[active=true]:after:absolute data-[active=true]:after:bottom-0 data-[active=true]:after:left-3 data-[active=true]:after:right-3 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-primary data-[active=true]:after:rounded-full"
                  >Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-8 xl:gap-x-12 gap-y-4 xl:gap-y-2 px-6 xl:px-8 pt-4 pb-6">
                      {companyItems.map((item, i) => (
                        <DropdownItem key={item.title} {...item} index={i} />
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Contact — plain link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    data-active={pathname.startsWith("/contact") ? "true" : undefined}
                    className={cn(navigationMenuTriggerStyle(), "relative data-[active=true]:text-foreground data-[active=true]:after:content-[''] data-[active=true]:after:absolute data-[active=true]:after:bottom-0 data-[active=true]:after:left-3 data-[active=true]:after:right-3 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-primary data-[active=true]:after:rounded-full")}
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

        {/* ---- Right: CTA + mobile hamburger ---- */}
        <div className="flex items-center gap-4">
          <Button asChild size="lg" className="hidden lg:inline-flex">
            <Link href="/contact">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="default" className="inline-flex lg:hidden">
            <Link href="/contact">Get Started</Link>
          </Button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md size-10 p-2.5 text-foreground transition-colors hover:bg-accent lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* ---- Mobile overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="z-40 lg:hidden"
          >
            <div className="mt-2 rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl p-6" style={{ paddingBottom: `max(1.5rem, env(safe-area-inset-bottom))` }}>
              <nav aria-label="Mobile navigation" className="space-y-1">
                <Accordion type="multiple" className="border-0 bg-transparent">
                  {/* Services accordion */}
                  <AccordionItem value="services">
                    <AccordionTrigger className="px-3 py-3 text-sm font-semibold">
                      Services
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-2">
                      <div className="space-y-1">
                        {servicesItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent/60"
                          >
                            <NavigationMenuIconWrapper>
                              <item.icon className="size-4" />
                            </NavigationMenuIconWrapper>
                            <div>
                              <div className="text-sm font-semibold">{item.title}</div>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Infrastructure accordion */}
                  <AccordionItem value="infrastructure">
                    <AccordionTrigger className="px-3 py-3 text-sm font-semibold">
                      Infrastructure
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-2">
                      <div className="space-y-1">
                        {infrastructureItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent/60"
                          >
                            <NavigationMenuIconWrapper>
                              <item.icon className="size-4" />
                            </NavigationMenuIconWrapper>
                            <div>
                              <div className="text-sm font-semibold">{item.title}</div>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  {/* Company accordion */}
                  <AccordionItem value="company">
                    <AccordionTrigger className="px-3 py-3 text-sm font-semibold">
                      Company
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-2">
                      <div className="space-y-1">
                        {companyItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent/60"
                          >
                            <NavigationMenuIconWrapper>
                              <item.icon className="size-4" />
                            </NavigationMenuIconWrapper>
                            <div>
                              <div className="text-sm font-semibold">{item.title}</div>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Contact — plain link */}
                <Link
                  href="/contact"
                  className="flex items-center px-3 py-3 text-sm font-semibold transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </nav>

              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
