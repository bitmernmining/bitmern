import Image from "next/image"
import Link from "next/link"
import { HeroSlider } from "@/components/hero-slider"
import { ImageSection } from "@/components/ui/image-section"
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

      {/* Full-bleed facility photo break */}
      <ImageSection
        src="/facilities/north-dakota.webp"
        alt="Bitmern Mining facility in North Dakota"
        overlay="gradient"
        parallax
        className="py-24 lg:py-32"
      >
        <div className="text-center text-white">
          <p className="text-sm font-mono uppercase tracking-widest text-white/60 mb-4">Global Mining Infrastructure</p>
          <p className="text-4xl lg:text-5xl xl:text-6xl font-bold font-heading mb-6">
            7 Facilities. 3 Continents. 31.5+ MW.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Purpose-built mining infrastructure delivering institutional-grade performance across North America, Africa, and Europe.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/facilities" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Explore Facilities
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors backdrop-blur-sm">
              Get in Touch
            </Link>
          </div>
        </div>
      </ImageSection>

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
