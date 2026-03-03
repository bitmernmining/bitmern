import Image from "next/image"
import { cn } from "@/lib/utils"

interface PhotoCardProps {
  src: string
  alt: string
  aspectRatio?: string
  title: string
  description?: string
  badge?: string
  children?: React.ReactNode
  className?: string
}

export function PhotoCard({ src, alt, aspectRatio = "aspect-[16/10]", title, description, badge, children, className }: PhotoCardProps) {
  return (
    <div className={cn("card-surface rounded-lg overflow-hidden", className)}>
      <div className={cn("relative overflow-hidden", aspectRatio)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider bg-primary text-primary-foreground">
              {badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 lg:p-6">
        <h3 className="text-lg font-semibold font-heading mb-1.5">{title}</h3>
        {description && <p className="text-sm text-foreground/60 leading-relaxed">{description}</p>}
        {children}
      </div>
    </div>
  )
}
