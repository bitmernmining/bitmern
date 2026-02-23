import * as React from "react"

import { cn } from "@/lib/utils"

// Input — Webflow glass treatment: translucent bg, backdrop blur,
// fuel-yellow focus ring. Source: .form_input in bitmern-webflow CSS.
// border-radius: 6px, min-height: 2.75rem, backdrop-filter: blur(10px),
// bg: neutral-darkest-5, focus: fuel-yellow border + outline

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base — glass surface matching secondary button treatment
        "flex h-11 w-full min-w-0 rounded-md px-3 py-2 text-sm",
        "bg-foreground/5 backdrop-blur-[10px]",
        "border border-transparent",
        "placeholder:text-foreground/40",
        "selection:bg-primary selection:text-primary-foreground",
        // Transitions
        "transition-[background-color,border-color,outline-color] duration-200",
        // Hover — warm cream tint (Webflow: fuel-yellow-lightest)
        "hover:bg-[oklch(0.98_0.015_78)]",
        "dark:hover:bg-foreground/[0.08]",
        // Focus — fuel-yellow border + outline ring
        "focus:border-primary focus:outline-[1.5px] focus:outline-primary/30 focus:outline-offset-1",
        "focus:bg-background",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:outline-destructive/20",
        "dark:aria-invalid:outline-destructive/40",
        // File input
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Dark
        "dark:bg-foreground/[0.06]",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Same glass surface as Input
        "flex min-h-[11.25rem] w-full min-w-0 rounded-md px-3 py-3 text-sm",
        "bg-foreground/5 backdrop-blur-[10px]",
        "border border-transparent",
        "placeholder:text-foreground/40",
        "selection:bg-primary selection:text-primary-foreground",
        "transition-[background-color,border-color,outline-color] duration-200",
        "hover:bg-[oklch(0.98_0.015_78)]",
        "dark:hover:bg-foreground/[0.08]",
        "focus:border-primary focus:outline-[1.5px] focus:outline-primary/30 focus:outline-offset-1",
        "focus:bg-background",
        "aria-invalid:border-destructive aria-invalid:outline-destructive/20",
        "dark:aria-invalid:outline-destructive/40",
        "dark:bg-foreground/[0.06]",
        "disabled:pointer-events-none disabled:opacity-50",
        "resize-y",
        className
      )}
      {...props}
    />
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="form-label"
      className={cn(
        // Webflow: JetBrains Mono, weight 400, mb 0.5rem
        "block font-mono text-sm font-normal mb-2",
        className
      )}
      {...props}
    />
  )
}

export { Input, Textarea, FormLabel }
