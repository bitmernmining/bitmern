"use client"

import { motion } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIconWrapper,
} from "@/components/ui/navigation-menu"
import {
  Server,
  Cpu,
  Building2,
  BarChart3,
  BookOpen,
  Users,
  Phone,
  Calculator,
} from "lucide-react"

const servicesItems = [
  {
    icon: Building2,
    title: "Institutional",
    description: "Structured mining exposure for Family Offices & HNWIs.",
    link: "Explore Blocks Fund",
  },
  {
    icon: Server,
    title: "Hosting",
    description: "Enterprise colocation across 4 global facilities.",
    link: "View Facilities",
  },
  {
    icon: Calculator,
    title: "Profit Calculator",
    description: "Estimate returns based on hashrate and power cost.",
    link: "Calculate Now",
  },
  {
    icon: Cpu,
    title: "Hardware",
    description: "New & used ASICs at institutional pricing.",
    link: "Browse Hardware",
  },
]

const companyItems = [
  {
    icon: BookOpen,
    title: "About",
    description: "Our story, mission, and the team behind Bitmern.",
    link: "Learn More",
  },
  {
    icon: BarChart3,
    title: "Performance",
    description: "Real-time pool stats and network analytics.",
    link: "View Dashboard",
  },
  {
    icon: Users,
    title: "Careers",
    description: "Join the team building the future of mining.",
    link: "Open Positions",
  },
  {
    icon: Phone,
    title: "Contact",
    description: "Speak with our team about your mining needs.",
    link: "Get in Touch",
  },
]

function DropdownItem({
  icon: Icon,
  title,
  description,
  link,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  link: string
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
      <NavigationMenuLink href="#">
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

function DropdownGrid({
  items,
}: {
  items: typeof servicesItems
}) {
  return (
    <div className="grid grid-cols-4 gap-x-12 gap-y-2 px-8 pt-4 pb-6">
      {items.map((item, i) => (
        <DropdownItem key={item.title} {...item} index={i} />
      ))}
    </div>
  )
}

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className="max-w-none w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DropdownGrid items={servicesItems} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DropdownGrid items={companyItems} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
