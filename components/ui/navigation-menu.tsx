"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
import { motion } from "framer-motion"
import Link from "next/link"

import { cn } from "@/lib/utils"

// Navigation Menu — pixel-matched to Webflow navbar-dropdown7 pattern.
// Framer Motion on chevron + staggered items. CSS for viewport entrance.

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      delayDuration={100}
      className={cn(
        "group/navigation-menu flex w-full items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex items-center justify-center gap-2",
    "px-4 py-6 text-base font-medium",
    "transition-colors duration-350",
    "outline-none cursor-pointer select-none",
    "hover:text-[var(--nav-hover)]",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=open]:text-[var(--nav-hover)]",
  ].join(" ")
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const node = triggerRef.current
    if (!node) return
    const sync = () => setOpen(node.getAttribute("data-state") === "open")
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(node, { attributes: true, attributeFilter: ["data-state"] })
    return () => observer.disconnect()
  }, [])

  return (
    <NavigationMenuPrimitive.Trigger
      ref={triggerRef}
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      <motion.span
        className="flex"
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ChevronDownIcon
          className="text-muted-foreground size-4 shrink-0"
          aria-hidden="true"
        />
      </motion.span>
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
        "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
        "top-0 left-0 w-full lg:absolute lg:w-auto",
        className
      )}
      {...props}
    />
  )
}

// Viewport — CSS animation for open/close (reliable with Radix),
// positioned flush with navbar edges.
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute top-full left-0 right-0 isolate z-50 pt-2">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top bg-background/95 text-foreground backdrop-blur-xl",
          "relative w-full overflow-hidden",
          "rounded-xl border border-border/40",
          "h-[var(--radix-navigation-menu-viewport-height)]",
          "transition-[height] duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          // Open: fade + scale in. Close: fade + scale out.
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-[0.98] data-[state=closed]:zoom-out-[0.98]",
          "duration-350",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  href,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  const linkClasses = cn(
    "group/link flex flex-col items-start py-2 no-underline outline-none rounded-md px-3 -mx-3",
    "transition-all duration-350",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:rounded-md",
    className
  )

  // Internal routes use Next.js Link for client-side navigation
  if (href && href.startsWith("/")) {
    // Destructure Radix-specific props that conflict with Next.js Link
    const { active, onSelect, ...htmlProps } = props
    return (
      <NavigationMenuPrimitive.Link active={active} onSelect={onSelect} asChild>
        <Link
          href={href}
          data-slot="navigation-menu-link"
          className={linkClasses}
          {...htmlProps}
        >
          {children}
        </Link>
      </NavigationMenuPrimitive.Link>
    )
  }

  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      href={href}
      className={linkClasses}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Link>
  )
}

function NavigationMenuIconWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navigation-menu-icon-wrapper"
      className={cn(
        "flex items-center justify-center rounded-sm p-2",
        "bg-primary text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
        "data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavigationMenuIconWrapper,
  navigationMenuTriggerStyle,
}
