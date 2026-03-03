import Image from "next/image"
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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark relative">
        {/* Background — cinematic facility photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/facilities/indiana.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Gradient overlay — darkens photo for text readability, fades into page bg */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-background" />

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
