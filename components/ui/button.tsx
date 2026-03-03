"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { springTransition } from "@/lib/motion"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md",
    "text-sm font-medium",
    // Shadow/color transitions stay CSS (Framer Motion handles transform)
    "transition-[background-color,box-shadow,color,opacity] duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "cursor-pointer select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — flat fuel-yellow, depth from 5-layer inset shadow system
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[inset_0_-2px_1px_0_oklch(0_0_0/0.2),inset_0_32px_24px_0_oklch(1_0_0/0.05),inset_0_1px_1px_1px_oklch(1_0_0/0.25),inset_0_0_0_1px_oklch(0_0_0/0.15),0_1px_2px_0_oklch(0_0_0/0.05)]",
          "hover:shadow-[inset_0_-2px_1px_0_oklch(0_0_0/0.2),inset_0_32px_24px_0_oklch(1_0_0/0.05),inset_0_1px_1px_1px_oklch(1_0_0/0.25),inset_0_0_0_1px_oklch(0_0_0/0.15),0_2px_4px_0_oklch(0_0_0/0.05)]",
          "active:shadow-[inset_0_2px_3px_0_oklch(0_0_0/0.25),inset_0_0_0_1px_oklch(0_0_0/0.15),0_0_0_0_transparent]",
        ].join(" "),

        // Secondary — translucent surface, backdrop blur, clean depth
        secondary: [
          "bg-foreground/5 text-foreground backdrop-blur-[10px]",
          "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.08),0_1px_2px_0_oklch(0_0_0/0.04)]",
          "hover:bg-foreground/[0.10]",
          "hover:shadow-[inset_0_1px_0_0_oklch(1_0_0/0.15),0_1px_3px_0_oklch(0_0_0/0.06)]",
          "active:bg-foreground/[0.14]",
          "active:shadow-[inset_0_1px_2px_0_oklch(0_0_0/0.08)]",
        ].join(" "),

        // Outline — crisp border, subtle inset shadow for depth parity
        outline: [
          "border border-border bg-background",
          "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.06),0_1px_2px_0_oklch(0_0_0/0.03)]",
          "hover:bg-accent hover:border-foreground/10",
          "active:bg-accent/80",
          "dark:bg-card dark:border-input",
          "dark:hover:bg-input/50 dark:hover:border-foreground/8",
        ].join(" "),

        // Ghost — invisible until interacted
        ghost: [
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/70",
          "dark:hover:bg-accent/50",
        ].join(" "),

        // Link — text only
        link: "text-primary underline-offset-4 hover:underline active:text-primary/80",

        // Destructive — same shadow system as primary, muted red base
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[inset_0_-2px_1px_0_oklch(0_0_0/0.2),inset_0_32px_24px_0_oklch(1_0_0/0.04),inset_0_1px_1px_1px_oklch(1_0_0/0.2),inset_0_0_0_1px_oklch(0_0_0/0.15),0_1px_2px_0_oklch(0_0_0/0.05)]",
          "hover:shadow-[inset_0_-2px_1px_0_oklch(0_0_0/0.2),inset_0_32px_24px_0_oklch(1_0_0/0.04),inset_0_1px_1px_1px_oklch(1_0_0/0.2),inset_0_0_0_1px_oklch(0_0_0/0.15),0_2px_4px_0_oklch(0_0_0/0.05)]",
          "active:shadow-[inset_0_2px_3px_0_oklch(0_0_0/0.25),inset_0_0_0_1px_oklch(0_0_0/0.15),0_0_0_0_transparent]",
        ].join(" "),
      },
      size: {
        default: "h-9 px-5 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-sm px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3.5 has-[>svg]:px-2.5",
        lg: "h-11 px-7 text-[0.938rem] has-[>svg]:px-5",
        xl: "h-12 px-8 text-base gap-2.5 has-[>svg]:px-6",
        icon: "size-9",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Variants that get physical hover/tap motion
const liftedVariants = new Set(["default", "secondary", "outline", "destructive"])

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  isLoading = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }) {
  const classes = cn(buttonVariants({ variant, size, className }))

  const loadingContent = isLoading ? (
    <>
      <Loader2 className="size-4 animate-spin" />
      {children}
    </>
  ) : children

  // asChild uses Slot — can't wrap with motion.
  // CSS-only hover lift + tap press for lifted variants.
  if (asChild) {
    const liftClass = liftedVariants.has(variant ?? "default")
      ? "transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98]"
      : ""
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(classes, liftClass)}
        {...props}
      >
        {children}
      </Slot.Root>
    )
  }

  const hasMotion = liftedVariants.has(variant ?? "default")

  if (!hasMotion) {
    return (
      <button
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={classes}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {loadingContent}
      </button>
    )
  }

  return (
    <motion.button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={classes}
      disabled={isLoading || props.disabled}
      aria-busy={isLoading || undefined}
      whileHover={{ y: -2 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={springTransition}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {loadingContent}
    </motion.button>
  )
}

export { Button, buttonVariants }
