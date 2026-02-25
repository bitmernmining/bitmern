"use client"

import { useState, useEffect } from "react"
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
  MessageCircle,
  Mail,
  Phone,
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
    href: "#",
  },
  {
    icon: Server,
    title: "Hosting",
    description: "Managed ASIC colocation at our global facilities.",
    link: "View Hosting Plans",
    href: "#",
  },
  {
    icon: Calculator,
    title: "Profit Calculator",
    description: "AI-powered BTC mining profit calculations in seconds.",
    link: "Calculate Your Profits",
    href: "https://calculator.bitmernmining.com",
  },
  {
    icon: Cpu,
    title: "Hardware",
    description: "Browse ASICs and mining equipment, compare, and buy.",
    link: "Shop Equipment",
    href: "#",
  },
]

const infrastructureItems = [
  {
    icon: Factory,
    title: "Our Facilities",
    description: "20+ MW across our US locations.",
    link: "Tour Our Sites",
    href: "#",
  },
  {
    icon: Settings,
    title: "Technology",
    description: "SuperApp monitoring and enterprise security.",
    link: "See Our Stack",
    href: "#",
  },
  {
    icon: Globe,
    title: "Expansion",
    description: "Finland and 500 MW OriginSpark pipeline.",
    link: "View Pipeline",
    href: "#",
  },
  {
    icon: ClipboardList,
    title: "Colocation Specs",
    description: "Uptime, power rates and facility details.",
    link: "Review Specs",
    href: "#",
  },
]

const companyItems = [
  {
    icon: BookOpen,
    title: "Our Story",
    description: "How Bitmern grew from Greece to global enterprise.",
    link: "Learn Our History",
    href: "#",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Meet the team behind Bitmern Mining.",
    link: "Meet the Team",
    href: "#",
  },
  {
    icon: Handshake,
    title: "Partners",
    description: "OriginSpark, MARA, Bitmain and more.",
    link: "See Our Partners",
    href: "#",
  },
  {
    icon: CalendarDays,
    title: "Events",
    description: "Blockchain Summits and conferences.",
    link: "View Upcoming",
    href: "https://blockchainsummits.io/",
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
      <NavigationMenuLink href={href}>
        <div className="mb-3">
          <NavigationMenuIconWrapper>
            <Icon className="size-5" />
          </NavigationMenuIconWrapper>
        </div>
        <div className="flex flex-col">
          <div className="mb-1 font-heading text-[1.1rem] font-normal uppercase leading-tight tracking-tight">
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

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 px-[5%] pt-6 pb-0">
      <div
        className={cn(
          "mx-auto w-full max-w-[64rem] relative flex min-h-[4.5rem] items-center justify-between rounded-lg border px-8",
          "transition-all duration-300",
          scrolled
            ? "border-border/40 bg-card/80 shadow-[0_1px_3px_0_oklch(0_0_0/0.04)] backdrop-blur-lg"
            : "border-border bg-card"
        )}
      >
            {/* ---- Left: Logo ---- */}
            <Link href="/" className="shrink-0">
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
            <NavigationMenu className="hidden min-w-0 max-w-none md:flex">
              <NavigationMenuList>
                {/* Services */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-4 gap-x-12 gap-y-2 px-8 pt-4 pb-6">
                      {servicesItems.map((item, i) => (
                        <DropdownItem key={item.title} {...item} index={i} />
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Infrastructure */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Infrastructure</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-4 gap-x-12 gap-y-2 px-8 pt-4 pb-6">
                      {infrastructureItems.map((item, i) => (
                        <DropdownItem key={item.title} {...item} index={i} />
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-4 gap-x-12 gap-y-2 px-8 pt-4 pb-6">
                      {companyItems.map((item, i) => (
                        <DropdownItem key={item.title} {...item} index={i} />
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Insights — plain link styled as trigger */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/insights"
                    className={navigationMenuTriggerStyle()}
                  >
                    Insights
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

        {/* ---- Right: Contact icons + CTA + mobile hamburger ---- */}
        <div className="flex items-center gap-1.5">
          <a
            href="#"
            aria-label="Message us on WhatsApp"
            className="hidden items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:inline-flex"
          >
            <MessageCircle className="size-4" />
          </a>
          <a
            href="#"
            aria-label="Email us"
            className="hidden items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:inline-flex"
          >
            <Mail className="size-4" />
          </a>
          <a
            href="#"
            aria-label="Call us"
            className="hidden items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:inline-flex"
          >
            <Phone className="size-4" />
          </a>
          <Button size="sm" className="hidden md:inline-flex ml-1.5">
            Get Started
          </Button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-accent md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="z-40 md:hidden"
          >
            <div className="mt-2 rounded-lg border bg-card p-6">
              <nav className="space-y-1">
                <Accordion type="multiple" className="border-0 bg-transparent">
                  {/* Services accordion */}
                  <AccordionItem value="services">
                    <AccordionTrigger className="px-3 py-3 text-sm font-semibold">
                      Services
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-2">
                      <div className="space-y-1">
                        {servicesItems.map((item) => (
                          <a
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
                          </a>
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
                          <a
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
                          </a>
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
                          <a
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
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Insights — plain link */}
                <Link
                  href="/insights"
                  className="flex items-center px-3 py-3 text-sm font-semibold transition-colors hover:text-primary"
                >
                  Insights
                </Link>
              </nav>

              <div className="mt-4 flex items-center gap-2">
                <a href="#" aria-label="WhatsApp" className="inline-flex items-center justify-center rounded-md border p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <MessageCircle className="size-4" />
                </a>
                <a href="#" aria-label="Email" className="inline-flex items-center justify-center rounded-md border p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Mail className="size-4" />
                </a>
                <a href="#" aria-label="Phone" className="inline-flex items-center justify-center rounded-md border p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Phone className="size-4" />
                </a>
                <Button className="ml-auto flex-1" size="sm">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
