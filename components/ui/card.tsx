"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

// Card — clean surface with understated depth.
// Webflow source: border-radius 0.5rem, border 1px solid neutral-lightest,
// overflow hidden. Shadows are minimal — just enough to lift off the page.

const springTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 35,
  mass: 0.8,
}

const cardVariants = cva(
  [
    "flex flex-col rounded-lg overflow-hidden",
    // CSS handles shadow/color/border transitions; Framer handles transform
    "transition-[box-shadow,background-color,border-color] duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default — clean surface, whisper-light shadow
        default: [
          "bg-card text-card-foreground",
          "border border-[oklch(0_0_0/0.06)]",
          "shadow-[0_1px_2px_0_oklch(0_0_0/0.03),0_2px_8px_0_oklch(0_0_0/0.02)]",
          "dark:border-[oklch(1_0_0/0.08)]",
          "dark:shadow-[0_1px_2px_0_oklch(0_0_0/0.15),0_2px_8px_0_oklch(0_0_0/0.1)]",
        ].join(" "),

        // Interactive — lifts on hover via Framer Motion, shadow expands via CSS
        interactive: [
          "bg-card text-card-foreground cursor-pointer",
          "border border-[oklch(0_0_0/0.06)]",
          "shadow-[0_1px_2px_0_oklch(0_0_0/0.03),0_2px_8px_0_oklch(0_0_0/0.02)]",
          "hover:border-[oklch(0_0_0/0.09)]",
          "hover:shadow-[0_2px_6px_0_oklch(0_0_0/0.05),0_6px_20px_0_oklch(0_0_0/0.03)]",
          "active:shadow-[0_1px_2px_0_oklch(0_0_0/0.04)]",
          // Dark
          "dark:border-[oklch(1_0_0/0.08)]",
          "dark:shadow-[0_1px_2px_0_oklch(0_0_0/0.15),0_2px_8px_0_oklch(0_0_0/0.1)]",
          "dark:hover:border-[oklch(1_0_0/0.12)]",
          "dark:hover:shadow-[0_2px_6px_0_oklch(0_0_0/0.25),0_6px_20px_0_oklch(0_0_0/0.15)]",
        ].join(" "),

        // Glass — translucent surface with backdrop blur, minimal edge definition
        glass: [
          "bg-foreground/[0.03] text-foreground backdrop-blur-xl",
          "border border-[oklch(0_0_0/0.05)]",
          "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.08)]",
          "dark:bg-foreground/[0.05]",
          "dark:border-[oklch(1_0_0/0.07)]",
          "dark:shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)]",
        ].join(" "),
      },
      padding: {
        default: "gap-6 py-6",
        compact: "gap-4 py-4",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

function Card({
  className,
  variant,
  padding,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  const classes = cn(cardVariants({ variant, padding, className }))
  const isInteractive = variant === "interactive"

  if (isInteractive) {
    return (
      <motion.div
        data-slot="card"
        data-variant={variant}
        className={classes}
        whileHover={{ y: -3 }}
        whileTap={{ y: 0, scale: 0.995 }}
        transition={springTransition}
        {...(props as React.ComponentProps<typeof motion.div>)}
      />
    )
  }

  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={classes}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
