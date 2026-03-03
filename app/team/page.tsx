import type { Metadata } from "next"
import { TeamPage } from "@/components/pages/team"

export const metadata: Metadata = {
  title: "Leadership — Bitmern Mining",
  description:
    "Meet the team behind Bitmern Mining. From designing resilient global infrastructure to delivering best-in-class customer support across three continents.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Leadership — Bitmern Mining",
    description:
      "Meet the team behind Bitmern Mining. Specialized knowledge and deep Bitcoin expertise across three continents.",
    url: "https://bitmernmining.com/team",
  },
}

export default function Team() {
  return <TeamPage />
}
