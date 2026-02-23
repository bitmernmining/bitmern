import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Zap, Shield, Server, ChevronRight } from "lucide-react";
import { AccordionDemo } from "./accordion-demo";
import { SelectDemo } from "./select-demo";

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

const badgeVariants = [
  "default",
  "secondary",
  "outline",
  "destructive",
  "ghost",
] as const;

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
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
      <Section title="Typography" description="Space Grotesk headings, Manrope body, JetBrains Mono code">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">H1 — The quick brown fox</h1>
          <h2 className="text-4xl font-bold tracking-tight">H2 — The quick brown fox</h2>
          <h3 className="text-3xl font-semibold tracking-tight">H3 — The quick brown fox</h3>
          <h4 className="text-2xl font-semibold tracking-tight">H4 — The quick brown fox</h4>
          <h5 className="text-xl font-semibold">H5 — The quick brown fox</h5>
          <h6 className="text-lg font-semibold">H6 — The quick brown fox</h6>
          <Separator />
          <p className="text-base">
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
      <Section title="Cards" description="Composable card components">
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Mining Infrastructure</CardTitle>
              <CardDescription>
                Enterprise-grade hosting with 99.9% uptime SLA.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <Server className="size-4 text-primary" />
                <span>5,000+ ASIC slots available</span>
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
              <CardTitle>Solo Mining Pool</CardTitle>
              <CardDescription>
                Zero pool fees. Keep 100% of the block reward.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="size-4 text-primary" />
                <span>BTC, LTC, DOGE, BCH, DGB supported</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View pools <ChevronRight className="size-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges" description="All badge variants">
        <div className="flex flex-wrap gap-3">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </Section>

      {/* Accordion */}
      <Section title="Accordion" description="Radix accordion with chevron animation">
        <AccordionDemo />
      </Section>

      {/* Inputs */}
      <Section title="Inputs" description="Text inputs with various states">
        <div className="grid gap-4 max-w-md">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Default</label>
            <Input placeholder="Enter your wallet address..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="miner@bitmern.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Disabled</label>
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
    </div>
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
