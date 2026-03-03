import type { Metadata } from "next"
import { EventsPage } from "@/components/pages/events"

export const metadata: Metadata = {
  title: "Events — Bitmern Mining",
  description:
    "Meet the Bitmern team at blockchain conferences, mining summits, and facility tours. Find us at Blockchain Life 2026 in Dubai and events throughout the year.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events — Bitmern Mining",
    description:
      "Meet the Bitmern team at blockchain conferences, mining summits, and facility tours worldwide.",
    url: "https://bitmernmining.com/events",
  },
}

export default function Events() {
  return <EventsPage />
}
