import dynamic from "next/dynamic"
import { HeroSlider } from "@/components/hero-slider"
import { LogoBar } from "@/components/sections/logo-bar"
import { DeployCapital } from "@/components/sections/deploy-capital"
import { Comparison } from "@/components/sections/comparison"
import { Hosting } from "@/components/sections/hosting"
import { Testimonial } from "@/components/sections/testimonial"
import { FAQ } from "@/components/sections/faq"

// Dynamic imports — canvas-heavy sections split into separate chunks, no SSR
const InfrastructureGrid = dynamic(
  () => import("@/components/animations/infrastructure-grid").then((m) => m.InfrastructureGrid),
  { ssr: false }
)
const GlobalInfrastructure = dynamic(
  () => import("@/components/sections/global-infrastructure").then((m) => m.GlobalInfrastructure),
  { ssr: false }
)
const Calculator = dynamic(
  () => import("@/components/sections/calculator").then((m) => m.Calculator),
  { ssr: false }
)
const Hardware = dynamic(
  () => import("@/components/sections/hardware").then((m) => m.Hardware),
  { ssr: false }
)
const ProvenAtScale = dynamic(
  () => import("@/components/sections/proven-at-scale").then((m) => m.ProvenAtScale),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        {/* Background layer — canvas animation */}
        <div className="absolute inset-0 z-0">
          <InfrastructureGrid />
        </div>

        {/* Gradient overlay — fades canvas into page background */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: [
              "linear-gradient(180deg, color-mix(in oklch, var(--color-background) 70%, transparent) 0%, color-mix(in oklch, var(--color-background) 55%, transparent) 50%, color-mix(in oklch, var(--color-background) 70%, transparent) 100%)",
              "radial-gradient(circle farthest-corner at 50% 50%, transparent 50%, color-mix(in oklch, var(--color-background) 85%, transparent))",
            ].join(", "),
          }}
        />

        {/* Content */}
        <div className="padding-global relative z-[10]">
          <div className="container-large">
            <HeroSlider />
          </div>
        </div>
      </section>

      {/* Logo Bar — partner/manufacturer logos */}
      <LogoBar />

      {/* Deploy Capital — Three Ways */}
      <DeployCapital />

      {/* Global Infrastructure */}
      <GlobalInfrastructure />

      {/* Comparison — Beyond ETFs */}
      <Comparison />

      {/* Hosting — Your Hardware, Our Facilities */}
      <Hosting />

      {/* Calculator — AI Mining Profit Calculator */}
      <Calculator />

      {/* Hardware — Source Miners at Institutional Pricing */}
      <Hardware />

      {/* Proven at Scale — Infrastructure You Can Count On */}
      <ProvenAtScale />

      {/* Testimonial — CJ Brown */}
      <Testimonial />

      {/* FAQ — General FAQs */}
      <FAQ />
    </>
  )
}
