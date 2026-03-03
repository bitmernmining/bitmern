import { HeroSlider } from "@/components/hero-slider"
import { LogoBar } from "@/components/sections/logo-bar"
import { DeployCapital } from "@/components/sections/deploy-capital"
import { GlobalInfrastructure } from "@/components/sections/global-infrastructure"
import { Comparison } from "@/components/sections/comparison"
import { Hosting } from "@/components/sections/hosting"
import { Calculator } from "@/components/sections/calculator"
import { Hardware } from "@/components/sections/hardware"
import { ProvenAtScale } from "@/components/sections/proven-at-scale"
import { Testimonial } from "@/components/sections/testimonial"
import { FAQ } from "@/components/sections/faq"
import { SectionCTA } from "@/components/ui/section-cta"
import { InfrastructureGrid } from "@/components/animations/infrastructure-grid"

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        {/* Background — abstract canvas animation */}
        <div className="absolute inset-0 z-0">
          <InfrastructureGrid />
        </div>

        {/* Gradient overlay — let more canvas show through */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: [
              "linear-gradient(180deg, color-mix(in oklch, var(--color-background) 50%, transparent) 0%, color-mix(in oklch, var(--color-background) 30%, transparent) 50%, color-mix(in oklch, var(--color-background) 60%, transparent) 100%)",
              "radial-gradient(circle farthest-corner at 50% 50%, transparent 40%, color-mix(in oklch, var(--color-background) 80%, transparent))",
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

      {/* Closing CTA */}
      <SectionCTA
        tag="Get Started"
        heading="Ready to Deploy Capital into Bitcoin Mining?"
        description="Whether you're an institutional investor, a solo miner, or looking to host your hardware — we have the infrastructure, expertise, and track record to power your success."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Explore Institutional Access", href: "/institutional" }}
        variant="dark"
      />
    </>
  )
}
