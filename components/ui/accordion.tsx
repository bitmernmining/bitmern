"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

// Accordion — Webflow FAQ pattern: card-like container with border,
// radius, and background. Items separated by borders internally.
// Source: .faq11_accordion in bitmern-webflow CSS.

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        // Webflow: border, radius--medium (0.5rem), foreground bg, overflow hidden
        "rounded-lg border border-border/60 overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0 transition-colors duration-350 data-[state=open]:bg-foreground/[0.015]", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // Webflow: padding 1.25rem 1.5rem, flex, space-between, pointer
          "flex flex-1 items-center justify-between gap-4 px-6 py-5",
          "text-left text-sm font-medium cursor-pointer",
          "transition-colors duration-350 outline-none",
          "hover:text-primary",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-350" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const node = contentRef.current
    if (!node) return
    const sync = () => setOpen(node.getAttribute("data-state") === "open")
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(node, { attributes: true, attributeFilter: ["data-state"] })
    return () => observer.disconnect()
  }, [])

  return (
    <AccordionPrimitive.Content
      ref={contentRef}
      data-slot="accordion-content"
      forceMount
      className="!block text-sm"
      {...props}
    >
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: 0.25, ease: "easeInOut" },
        }}
        className="overflow-hidden"
      >
        <div className={cn("px-6 pt-0 pb-5", className)}>{children}</div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
