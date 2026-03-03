import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Input, Textarea, FormLabel } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Zap, Shield, Server, ChevronRight, Globe, Cpu } from "lucide-react";
import { AccordionDemo } from "./accordion-demo";
import { SelectDemo } from "./select-demo";
import { NavigationMenuDemo } from "./navigation-menu-demo";
import {
  InfrastructureGrid,
  MiningProfitsAnimation,
  SupplyChainFlow,
  DirectAccessBypass,
  VolumePricingChart,
  LogisticsTimeline,
  DeployShipPaths,
  MinersDeployedGrid,
  MWChannelFlow,
  UptimeChart,
  FacilityGlobe,
} from "@/components/animations";

export const metadata: Metadata = {
  title: "Component Library — Bitmern Mining",
  robots: {
    index: false,
    follow: false,
  },
};

const colorTokens = [
  { name: "background", var: "var(--background)" },
  { name: "foreground", var: "var(--foreground)" },
  { name: "card", var: "var(--card)" },
  { name: "primary", var: "var(--primary)" },
  { name: "secondary", var: "var(--secondary)" },
  { name: "muted", var: "var(--muted)" },
  { name: "accent", var: "var(--accent)" },
  { name: "destructive", var: "var(--destructive)" },
  { name: "success", var: "var(--success)" },
  { name: "border", var: "var(--border)" },
  { name: "ring", var: "var(--ring)" },
];

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
] as const;

const buttonSizes = ["xs", "sm", "default", "lg"] as const;

const badgeVariantList = [
  "default",
  "secondary",
  "success",
  "destructive",
  "outline",
] as const;

const tagVariantList = [
  "default",
  "muted",
  "primary",
  "success",
  "destructive",
] as const;

export default function ComponentsPage() {
  return (
    <div className="px-[5%]">
      <div className="mx-auto w-full max-w-[80rem] py-20">
      {/* Header */}
      <div className="mb-16">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">
          Component Library
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bitmern Mining design system — light mode first, OKLCH color tokens.
        </p>
      </div>

      {/* Color Swatches */}
      <Section title="Colors" description="Semantic OKLCH color tokens">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {colorTokens.map((token) => (
            <div key={token.name} className="space-y-1.5">
              <div
                className="h-16 rounded-lg border"
                style={{ backgroundColor: token.var }}
              />
              <p className="text-xs font-medium">{token.name}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography" description="Space Grotesk headings (uppercase, tight tracking), Manrope body, JetBrains Mono code">
        <div className="space-y-4">
          {/* Headings use base styles from globals.css — no Tailwind overrides */}
          <h1>H1 — The quick brown fox</h1>
          <h2>H2 — The quick brown fox</h2>
          <h3>H3 — The quick brown fox</h3>
          <h4>H4 — The quick brown fox</h4>
          <h5>H5 — The quick brown fox</h5>
          <h6>H6 — The quick brown fox</h6>
          <Separator />
          <p>
            Body — Enterprise-grade Bitcoin mining infrastructure, ASIC hosting,
            and solo mining pools. Built for serious miners who demand
            reliability and performance.
          </p>
          <p className="text-sm text-muted-foreground">
            Small / Muted — Secondary text for descriptions and captions.
          </p>
          <code className="inline-block rounded bg-muted px-2 py-1 font-mono text-sm">
            Mono — stratum+tcp://pool.bitmern.com:3333
          </code>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons" description="All variant x size combinations">
        <div className="space-y-6">
          {buttonVariants.map((variant) => (
            <div key={variant} className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {variant}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {buttonSizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size === "xs" ? "XS" : size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
                  </Button>
                ))}
                <Button variant={variant} size="icon">
                  <Zap />
                </Button>
              </div>
            </div>
          ))}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              disabled
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section title="Cards" description="Dimensional surfaces — default, interactive (hover lift), glass (translucent)">
        <div className="space-y-8">
          {/* Default */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">default</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mining Infrastructure</CardTitle>
                  <CardDescription>
                    Enterprise-grade hosting with 99.9% uptime SLA across 4 global facilities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Server className="size-4 text-primary" />
                      <span>5,000+ ASIC slots available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="size-4 text-primary" />
                      <span>Indiana, North Dakota, Ethiopia, Finland</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm">
                    Learn more <ChevronRight className="size-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div>
                    <Tag className="mb-3">Institutional</Tag>
                    <CardTitle>Dedicated Infrastructure</CardTitle>
                    <CardDescription className="mt-2">
                      Private mining operations for funds and high-net-worth clients.
                    </CardDescription>
                  </div>
                  <CardAction>
                    <Badge variant="outline">From $0.065/kWh</Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter>
                  <Button size="sm">
                    Contact sales <ChevronRight className="size-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Interactive */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">interactive (hover to lift)</p>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: Server, title: "Hosting", desc: "Global colocation with 24/7 monitoring", tag: "4 Facilities" },
                { icon: Cpu, title: "Hardware", desc: "New & used ASICs at institutional pricing", tag: "In Stock" },
                { icon: Shield, title: "Solo Pool", desc: "Zero fees, keep 100% of the block reward", tag: "Live" },
              ].map((item) => (
                <Card key={item.title} variant="interactive">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary/10 p-2.5">
                      <item.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <Tag variant="muted" size="sm">{item.tag}</Tag>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Glass */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">glass (translucent)</p>
            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Total Hashrate", value: "142 PH/s", tag: "SHA-256" },
                  { label: "Active Miners", value: "3,847", tag: "Online" },
                  { label: "Uptime", value: "99.97%", tag: "30d avg" },
                ].map((stat) => (
                  <Card key={stat.label} variant="glass" padding="compact">
                    <CardContent className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                      </div>
                      <Tag variant="muted" size="sm">{stat.tag}</Tag>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Tags */}
      <Section title="Tags" description="Webflow-ported category labels — JetBrains Mono, uppercase, 4px radius">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">variants</p>
            <div className="flex flex-wrap items-center gap-2">
              {tagVariantList.map((variant) => (
                <Tag key={variant} variant={variant}>
                  {variant === "default" ? "Infrastructure" : variant === "muted" ? "Colocation" : variant === "primary" ? "Solo Mining" : variant === "success" ? "Online" : "Maintenance"}
                </Tag>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">sizes</p>
            <div className="flex flex-wrap items-center gap-2">
              <Tag size="sm">Small Tag</Tag>
              <Tag size="default">Default Tag</Tag>
              <Tag size="lg">Large Tag</Tag>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">in context</p>
            <div className="flex flex-wrap items-center gap-2">
              <Tag>Institutional Mining</Tag>
              <Tag variant="muted">Global Colocation</Tag>
              <Tag variant="primary">Full-Service Ops</Tag>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">alternate (dark bg)</p>
            <div className="flex items-center gap-2 rounded-lg bg-[oklch(0.18_0_0)] px-4 py-3">
              <Tag variant="alternate">SHA-256</Tag>
              <Tag variant="alternate">Scrypt</Tag>
              <Tag variant="alternate">99.9% Uptime</Tag>
            </div>
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges" description="Status indicators with inner-shadow depth">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">variants</p>
            <div className="flex flex-wrap items-center gap-2">
              {badgeVariantList.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {variant === "default" ? "Featured" : variant === "secondary" ? "v2.4.1" : variant === "success" ? "Live" : variant === "destructive" ? "Offline" : "Beta"}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">with pulse (live indicator)</p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="success" pulse>Pool Online</Badge>
              <Badge variant="default" pulse>Mining Active</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">in context</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>New</Badge>
              <Badge variant="success">3 Pools Live</Badge>
              <Badge variant="secondary">SHA-256</Badge>
              <Badge variant="outline">Stratum V2</Badge>
              <Badge variant="destructive">High Temp</Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* Navigation Menu */}
      <section className="relative z-10 mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Navigation Menu</h2>
          <p className="text-sm text-muted-foreground">Webflow navbar dropdown — full-width panel, 4-col grid, fuel-yellow icon wrappers</p>
        </div>
        <div className="relative rounded-lg border bg-card overflow-visible">
          <NavigationMenuDemo />
        </div>
      </section>

      {/* Accordion */}
      <Section title="Accordion" description="Radix accordion with chevron animation">
        <AccordionDemo />
      </Section>

      {/* Inputs */}
      <Section title="Inputs" description="Webflow glass treatment — translucent bg, backdrop blur, fuel-yellow focus">
        <div className="grid gap-5 max-w-md">
          <div>
            <FormLabel>Wallet Address</FormLabel>
            <Input placeholder="Enter your wallet address..." />
          </div>
          <div>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="miner@bitmern.com" />
          </div>
          <div>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Tell us about your mining operation..." />
          </div>
          <div>
            <FormLabel>Disabled</FormLabel>
            <Input disabled placeholder="Not available" />
          </div>
        </div>
      </Section>

      {/* Select */}
      <Section title="Select" description="Radix select dropdown">
        <div className="max-w-md">
          <SelectDemo />
        </div>
      </Section>

      {/* Separators */}
      <Section title="Separators" description="Horizontal and vertical separators">
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm text-muted-foreground">Horizontal</p>
            <Separator />
          </div>
          <div>
            <p className="mb-3 text-sm text-muted-foreground">Vertical (inline)</p>
            <div className="flex h-8 items-center gap-4">
              <span className="text-sm">BTC</span>
              <Separator orientation="vertical" />
              <span className="text-sm">LTC</span>
              <Separator orientation="vertical" />
              <span className="text-sm">DOGE</span>
              <Separator orientation="vertical" />
              <span className="text-sm">BCH</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Spacing Scale */}
      <Section title="Spacing Scale" description="Visual spacing reference (4px base)">
        <div className="space-y-2">
          {[1, 2, 3, 4, 6, 8, 10, 12, 16].map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                {n}
              </span>
              <div
                className="h-4 rounded bg-primary/80"
                style={{ width: `${n * 4}px` }}
              />
              <span className="font-mono text-xs text-muted-foreground">
                {n * 4}px
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Canvas Animations */}
      <Section title="Animations" description="Webflow canvas animations — 1:1 port with IntersectionObserver + reduced-motion optimization">
        <div className="space-y-8">
          {/* Facility Globe */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">3D globe — mining facilities</p>
            <div className="relative rounded-lg border bg-card overflow-hidden">
              <FacilityGlobe />
            </div>
          </div>

          {/* Hero */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">hero — infrastructure grid</p>
            <div className="relative h-80 rounded-lg border bg-card overflow-hidden">
              <InfrastructureGrid />
            </div>
          </div>

          {/* Mining Profits */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">calculator — mining profits</p>
            <div className="relative h-80 rounded-lg border bg-card overflow-hidden">
              <MiningProfitsAnimation />
            </div>
          </div>

          {/* Hardware Cards — 2-col grid for the 5 card animations */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">hardware — card backgrounds</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">Supply Chain Convergence</p>
                <div className="relative h-56 rounded-lg border bg-card overflow-hidden">
                  <SupplyChainFlow />
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">Direct Manufacturer Access</p>
                <div className="relative h-56 rounded-lg border bg-card overflow-hidden">
                  <DirectAccessBypass />
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">Volume Pricing</p>
                <div className="relative h-56 rounded-lg border bg-card overflow-hidden">
                  <VolumePricingChart />
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">End-to-End Logistics</p>
                <div className="relative h-56 rounded-lg border bg-card overflow-hidden">
                  <LogisticsTimeline />
                </div>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <p className="text-xs text-muted-foreground">Deploy or Ship</p>
                <div className="relative h-56 rounded-lg border bg-card overflow-hidden">
                  <DeployShipPaths />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">stats — data visualizations</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">Miners Deployed</p>
                <div className="relative h-48 rounded-lg border bg-card overflow-hidden">
                  <MinersDeployedGrid />
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">MW Under Management</p>
                <div className="relative h-48 rounded-lg border bg-card overflow-hidden">
                  <MWChannelFlow />
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">Uptime Rate</p>
                <div className="relative h-48 rounded-lg border bg-card overflow-hidden">
                  <UptimeChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Effects */}
      <Section title="Effects" description="Animations and special treatments">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">shimmer</p>
            <p className="text-shimmer text-2xl font-bold">Bitmern Mining</p>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">text gradient</p>
            <p className="text-gradient text-2xl font-bold">Block Reward</p>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">glow</p>
            <div className="glow mx-auto h-16 w-32 rounded-lg bg-primary" />
          </div>
        </div>
      </Section>
    </div></div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}
