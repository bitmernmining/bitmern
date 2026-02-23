import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Ported from Webflow .tag component (bitmern-mining-e6bc63.webflow.css)
// JetBrains Mono, uppercase, 4px radius, tight tracking
// fuel-yellow-lightest (#fdf6ea) bg, fuel-yellow-darkest (#48340d) text

const tagVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "rounded-sm font-mono text-xs font-normal uppercase tracking-tight",
    "backdrop-blur-[10px]",
    "select-none shrink-0",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default — warm cream bg, deep brown text (from Webflow fuel-yellow tints)
        default: [
          "bg-[oklch(0.97_0.02_85)] text-[oklch(0.30_0.06_70)]",
          "dark:bg-[oklch(0.25_0.04_78/0.6)] dark:text-[oklch(0.85_0.10_78)]",
        ].join(" "),

        // Muted — neutral surface, subtle
        muted: [
          "bg-foreground/[0.06] text-foreground/70",
          "dark:bg-foreground/[0.08] dark:text-foreground/60",
        ].join(" "),

        // Alternate — for dark backgrounds, translucent white
        alternate: "bg-white/10 text-white",

        // Primary — fuel-yellow bg with contrast text
        primary: [
          "bg-primary/15 text-[oklch(0.35_0.08_78)]",
          "dark:bg-primary/20 dark:text-primary",
        ].join(" "),

        // Success — green tinted
        success: [
          "bg-success/12 text-[oklch(0.38_0.10_150)]",
          "dark:bg-success/20 dark:text-success",
        ].join(" "),

        // Destructive — red tinted
        destructive: [
          "bg-destructive/10 text-destructive",
          "dark:bg-destructive/20 dark:text-destructive",
        ].join(" "),
      },
      size: {
        default: "px-2.5 py-1 text-xs",
        sm: "px-2 py-0.5 text-[0.6875rem]",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Tag({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="tag"
      data-variant={variant}
      className={cn(tagVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Tag, tagVariants }
