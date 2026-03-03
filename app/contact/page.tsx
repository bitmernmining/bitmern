import type { Metadata } from "next"
import { ContactPage } from "@/components/pages/contact"

export const metadata: Metadata = {
  title: "Contact Us — Bitmern Mining",
  description:
    "Book a strategy call, request a hosting quote, or reach out directly. Whether you're deploying your first miner or scaling an institutional portfolio, our team is ready.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us — Bitmern Mining",
    description:
      "Book a strategy call, request a hosting quote, or reach out directly to the Bitmern Mining team.",
    url: "https://bitmernmining.com/contact",
  },
}

export default function Contact() {
  return <ContactPage />
}
