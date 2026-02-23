"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Badge — status indicators with inner-shadow depth treatment
// Matching the dimensional style of our button system

const badgeVariants = cva(
  [
    "relative inline-flex items-center justify-center rounded-full border border-transparent",
    "px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0",
    "[&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none",
    "transition-[background-color,box-shadow,color] duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — fuel-yellow with beveled depth
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[inset_0_-1px_0_0_oklch(0_0_0/0.15),inset_0_1px_0_0_oklch(1_0_0/0.2),0_0_0_1px_oklch(0_0_0/0.1)]",
          "[a&]:hover:shadow-[inset_0_-1px_0_0_oklch(0_0_0/0.15),inset_0_1px_0_0_oklch(1_0_0/0.2),0_1px_4px_0_oklch(0.795_0.153_78/0.25)]",
        ].join(" "),

        // Secondary — frosted glass, translucent
        secondary: [
          "bg-foreground/[0.06] text-foreground/80 backdrop-blur-sm",
          "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.1),0_0_0_1px_oklch(0_0_0/0.04)]",
          "[a&]:hover:bg-foreground/[0.10]",
        ].join(" "),

        // Success — muted green with depth
        success: [
          "bg-success text-success-foreground",
          "shadow-[inset_0_-1px_0_0_oklch(0_0_0/0.15),inset_0_1px_0_0_oklch(1_0_0/0.15),0_0_0_1px_oklch(0_0_0/0.1)]",
          "[a&]:hover:shadow-[inset_0_-1px_0_0_oklch(0_0_0/0.15),inset_0_1px_0_0_oklch(1_0_0/0.15),0_1px_4px_0_oklch(0.60_0.14_150/0.2)]",
        ].join(" "),

        // Destructive — muted red with depth
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[inset_0_-1px_0_0_oklch(0_0_0/0.15),inset_0_1px_0_0_oklch(1_0_0/0.12),0_0_0_1px_oklch(0_0_0/0.1)]",
          "[a&]:hover:shadow-[inset_0_-1px_0_0_oklch(0_0_0/0.15),inset_0_1px_0_0_oklch(1_0_0/0.12),0_1px_4px_0_oklch(0.55_0.16_25/0.2)]",
        ].join(" "),

        // Outline — border only, no fill
        outline: [
          "border-border text-foreground/80 bg-transparent",
          "shadow-[0_1px_2px_0_oklch(0_0_0/0.03)]",
          "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  pulse = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    pulse?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        badgeVariants({ variant }),
        pulse && "badge-pulse",
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
