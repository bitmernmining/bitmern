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
        // Primary — fuel-yellow, single subtle inset for dimension
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.15)]",
          "[a&]:hover:brightness-105",
        ].join(" "),

        // Secondary — frosted glass, translucent
        secondary: [
          "bg-foreground/[0.06] text-foreground/80 backdrop-blur-sm",
          "[a&]:hover:bg-foreground/[0.10]",
        ].join(" "),

        // Success — muted green, single inset
        success: [
          "bg-success text-success-foreground",
          "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.12)]",
          "[a&]:hover:brightness-105",
        ].join(" "),

        // Destructive — muted red, single inset
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.10)]",
          "[a&]:hover:brightness-105",
        ].join(" "),

        // Outline — border only, no fill, no shadow
        outline: [
          "border-border text-foreground/80 bg-transparent",
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
