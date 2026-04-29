"use client"

import Image from "next/image"
import { useState } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

type VideoCardBase = {
  thumbnail: string
  title: string
  duration?: string
  className?: string
}

type VideoCardProps = VideoCardBase &
  (
    | { youtubeId: string; href?: never }
    | { href: string; youtubeId?: never }
  )

export function VideoCard({ thumbnail, title, youtubeId, href, duration, className }: VideoCardProps) {
  const [playing, setPlaying] = useState(false)

  if (playing && youtubeId) {
    return (
      <div className={cn("card-surface rounded-lg overflow-hidden", className)}>
        <div className="relative aspect-video">
          <iframe
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold font-heading line-clamp-2">{title}</h3>
        </div>
      </div>
    )
  }

  const Wrapper = href ? "a" : "button"
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: () => youtubeId && setPlaying(true) }

  return (
    <Wrapper {...(wrapperProps as Record<string, unknown>)} className={cn("card-surface rounded-lg overflow-hidden group text-left block", className)}>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <Play className="size-6 text-primary-foreground fill-primary-foreground ml-0.5" />
          </div>
        </div>
        {duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-mono bg-black/80 text-white rounded">
            {duration}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold font-heading line-clamp-2">{title}</h3>
      </div>
    </Wrapper>
  )
}
