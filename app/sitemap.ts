import type { MetadataRoute } from "next"

const BASE_URL = "https://bitmernmining.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const routes: {
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/hosting", changeFrequency: "weekly", priority: 0.9 },
    { path: "/hardware", changeFrequency: "weekly", priority: 0.9 },
    { path: "/facilities", changeFrequency: "monthly", priority: 0.8 },
    { path: "/institutional", changeFrequency: "monthly", priority: 0.8 },
    { path: "/solo-pool", changeFrequency: "weekly", priority: 0.9 },
    { path: "/technology", changeFrequency: "monthly", priority: 0.7 },
    { path: "/mara-firmware", changeFrequency: "monthly", priority: 0.7 },
    { path: "/team", changeFrequency: "monthly", priority: 0.6 },
    { path: "/partners", changeFrequency: "monthly", priority: 0.6 },
    { path: "/insights", changeFrequency: "weekly", priority: 0.7 },
    { path: "/events", changeFrequency: "weekly", priority: 0.7 },
    { path: "/expansion", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
