# Bitmern Mining — Marketing Website

The primary marketing website for [Bitmern Mining](https://bitmernmining.com), a Bitcoin mining infrastructure company offering ASIC hardware sales, global hosting facilities, and institutional mining programs.

Built as a modern, component-based Next.js application — replacing the existing Webflow site with a scalable, maintainable codebase while preserving the design language and extending it with CMS and e-commerce capabilities.

## What Bitmern Mining Does

Bitmern Mining provides end-to-end Bitcoin mining services:

- **ASIC Hardware Sales** — New and used miners at institutional pricing (Antminer S21, etc.)
- **Hosting & Management** — 100% hands-off mining across global facilities (Indiana, North Dakota, Ethiopia, Finland)
- **Institutional Programs** — Dedicated infrastructure for high-net-worth clients and funds
- **Solo Mining Pool** — [Bitmern Solo](https://bitmernsolo.com) for independent miners (separate product, separate codebase)
- **AI Profit Calculator** — Real-time mining profitability modeling at [calculator.bitmernmining.com](https://calculator.bitmernmining.com)

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 16 (App Router) | SSR/ISR for SEO, React Server Components |
| **Runtime** | Bun | Package manager, test runner, scripts |
| **Language** | TypeScript 5 (strict) | Full type safety |
| **Styling** | Tailwind CSS v4 | CSS-first config (no tailwind.config), OKLCH color system |
| **UI Primitives** | Radix UI | Accessible, unstyled component foundations |
| **Component Variants** | CVA (class-variance-authority) | Type-safe variant system for buttons, cards, badges |
| **Fonts** | Space Grotesk / Manrope / JetBrains Mono | Brand standard across all Bitmern properties |
| **Animation** | Framer Motion | Section reveals, page transitions, micro-interactions |
| **Icons** | Lucide React | Consistent icon set across all Bitmern properties |
| **Testing** | Bun test + Testing Library | Unit tests for components and utilities |
| **CMS** | TBD (Sanity or MDX) | Blog, team bios, product catalog |

## Design System

### Light Mode First

Unlike Bitmern Solo (dark-only dashboard), the marketing site is **light mode by default** — optimized for readability, trust, and conversion in a B2B context. Dark mode is supported as a secondary theme.

The color system uses OKLCH for perceptually uniform color manipulation across both modes:

```
Light mode:  White/neutral backgrounds, ebony text, fuel-yellow accents
Dark mode:   Ebony backgrounds, white/neutral text, fuel-yellow accents
```

### Component Design Philosophy — "Industrial Luxury"

Every UI component follows a dimensional treatment inspired by the original Webflow site — **not** generic shadcn defaults:

- **Multi-layer inset shadows** create physical depth (top bevel highlight, bottom darkening, 1px ring border, outer drop shadow)
- **Flat OKLCH colors** — all dimensionality comes from shadows, not gradients
- **Webflow-sourced radii**: `4px` (tags, xs buttons), `6px` (buttons, inputs), `8px` (cards)
- **CSS transitions at 350ms** with a custom cubic-bezier matching Framer Motion spring timing
- **Framer Motion micro-interactions**: buttons lift on hover (`y: -2`), compress on tap (`scale: 0.98`). Ghost/link variants exempt.
- **Badge pulse**: `::after` pseudo-element glow ring for live status indicators, color adapts per variant via CSS custom property
- **Tags**: Ported from Webflow `.tag` class — JetBrains Mono, uppercase, tight tracking, warm cream/brown palette, `backdrop-filter: blur`
- **Secondary surfaces**: Translucent `bg-foreground/5` with `backdrop-blur` for glassmorphic depth

### Color Palette

| Token | Light Mode | Dark Mode | Hex Reference |
|-------|-----------|-----------|---------------|
| **Background** | White | Ebony darkest | `#fff` / `#05060c` |
| **Foreground** | Ebony darkest | White | `#010102` / `#fff` |
| **Surface** | Neutral lightest | Ebony | `#f2f2f2` / `#121529` |
| **Muted** | Neutral lighter | Ebony light | `#d8d8d9` / `#595b69` |
| **Primary (Fuel Yellow)** | `#f2ae2e` | `#f2ae2e` | Same in both modes |
| **Primary Light** | `#fdf6ea` | `#48340d` | Inverted for contrast |
| **Primary Dark** | `#604512` | `#fceed5` | Inverted for contrast |
| **Accent Blue** | `#459bf3` | `#7cb9f6` | Picton Blue |
| **Accent Green** | `#10b981` | `#57cea6` | Mountain Meadow |
| **Border** | `rgba(1,1,2,0.15)` | `rgba(255,255,255,0.15)` | Neutral opacity |

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Headings** | Space Grotesk | 400–700 | All headings, uppercase, tight letter-spacing |
| **Body** | Manrope | 200–800 | Paragraphs, UI text, navigation |
| **Mono/Tags** | JetBrains Mono | 400, 600, 800 | Technical specs, code, labels |

Heading scale: H1 (2.986rem) → H2 (2.488rem) → H3 (2.074rem) → H4 (1.728rem) → H5 (1.44rem) → H6 (1.2rem). All uppercase with negative letter-spacing.

### Spacing

8-point grid system: `0.25rem` (tiny) → `0.5rem` → `1rem` → `1.5rem` → `2rem` → `3rem` → `4rem` → `5rem` → `6rem` → `7rem` → `10rem` (xxhuge).

### Border Radius

Small: `0.25rem` · Medium: `0.5rem` · Large: `1rem`

## Project Structure

```
app/
  layout.tsx                    → Root layout, fonts, theme provider, metadata
  page.tsx                      → Homepage (composes section components)
  about/page.tsx                → Company info, team
  services/
    institutional/page.tsx      → Institutional mining programs
    hosting/page.tsx            → Hosting locations & pricing
  miners/page.tsx               → ASIC hardware catalog
  contact/page.tsx              → Contact form
  blog/
    page.tsx                    → Blog index
    [slug]/page.tsx             → Individual posts
  calculator/page.tsx           → Profit calculator (or redirect)
  style-guide/page.tsx          → Design system reference
  privacy/page.tsx              → Privacy policy
  terms/page.tsx                → Terms of service

components/
  ui/                           → Radix + CVA primitives
    button.tsx                    Button — 5-layer shadow, Framer Motion lift/tap, 6 variants × 8 sizes
    card.tsx                      Card — dimensional surface with inner-shadow bevel, 8px radius
    badge.tsx                     Badge — status indicators with depth + optional pulse glow
    tag.tsx                       Tag — Webflow-ported category labels, JetBrains Mono uppercase
    accordion.tsx                 Collapsible FAQ items
    separator.tsx                 Dividers
    dialog.tsx                    Modals
    input.tsx                     Form inputs
    select.tsx                    Dropdowns
  layout/                       → Structural components
    navbar.tsx                    Sticky header, mega-dropdown, mobile menu
    footer.tsx                    Multi-column footer, newsletter, socials
    page-wrapper.tsx              Consistent page container
    section-wrapper.tsx           Section padding/width constraints
  sections/                     → Homepage sections (one component per section)
    hero.tsx                      Hero with canvas animation, CTAs
    globe.tsx                     Global facilities map
    comparison.tsx                BTC exposure comparison table
    hosting.tsx                   Facility highlights
    calculator.tsx                Profit calculator CTA
    hardware.tsx                  Miner sourcing / hardware cards
    stats.tsx                     Infrastructure statistics
    testimonials.tsx              Customer reviews
    three-ways.tsx                Service tiers
    team.tsx                      Team showcase
    faq.tsx                       Frequently asked questions
  shared/                       → Reusable across pages
    section-header.tsx            Tag + heading + description pattern
    stat-card.tsx                 Metric display
    trust-bar.tsx                 Partner/event logos
    testimonial-card.tsx          Review card

lib/
  utils.ts                      → cn() helper (clsx + tailwind-merge)
  fonts.ts                      → next/font configuration
  constants.ts                  → Facility data, pricing, stratum info
  format.ts                     → Number/currency formatters

public/
  images/                       → All static assets (logos, product photos, icons)
```

## Pages & Routes

| Route | Description | Source |
|-------|-------------|--------|
| `/` | Homepage — 11 composable sections | Webflow index.html |
| `/about` | Company info, team bios, mission | New (content from Webflow) |
| `/services/institutional` | Institutional mining programs | Webflow services/institutional.html |
| `/services/hosting` | Hosting facilities, pricing, locations | Webflow + live site |
| `/miners` | ASIC hardware catalog with specs & pricing | Live site ASIC Miners section |
| `/contact` | Contact form, WhatsApp, Telegram, email | Live site |
| `/blog` | Blog index | Live site (currently under About) |
| `/blog/[slug]` | Individual blog posts | CMS-driven |
| `/calculator` | Mining profit calculator | Redirect to calculator.bitmernmining.com |
| `/style-guide` | Design system reference | Webflow style guide page |
| `/privacy` | Privacy policy | Standard legal |
| `/terms` | Terms of service | Standard legal |

## Key Architectural Decisions

### What We're Porting from Webflow

- **Design tokens** — Full color palette, typography scale, spacing system
- **Section structure** — All 11 homepage sections, institutional services page
- **Content & copy** — Headlines, descriptions, feature lists, testimonials, FAQ
- **Assets** — Logos, product photos, background patterns, icons
- **Canvas animations** — Infrastructure grid, hardware card visualizations (hand-ported to React)

### What We're Replacing

| Webflow Pattern | Next.js Replacement |
|----------------|-------------------|
| Numbered class names (`navbar13_`, `header103_`) | Semantic component names |
| `w--open`, `w--current` state classes | React state + conditional classes |
| Webflow interaction system | Framer Motion |
| Webflow grid/flex utilities | Tailwind CSS |
| Flat HTML with 1000+ classes | Composable React components |
| Webflow CMS | Sanity or MDX (TBD) |
| Webflow forms | React Hook Form + server actions |

### Relationship to Other Bitmern Properties

| Property | Repo | Purpose | Theme |
|----------|------|---------|-------|
| **Bitmern Mining** (this repo) | `bitmern` | Primary marketing website | Light mode first |
| **Bitmern Solo App** | `bitmernsolo` | Solo mining pool dashboard | Dark mode only |
| **Bitmern Solo Site** | `bitmernsolo-site` | Solo pool marketing site | Dark mode first |

All three share: Space Grotesk + Manrope + JetBrains Mono, fuel-yellow brand accent, Tailwind v4, Next.js App Router, Bun, Radix UI, Lucide icons.

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Run tests
bun test

# Build for production
bun run build

# Lint
bun run lint
```

## Milestones

1. **Project scaffold** — Next.js + Tailwind v4 + fonts + design tokens + light/dark theme
2. **Style guide** — `/style-guide` route with all tokens, typography, component variants
3. **Layout shell** — Navbar + Footer + page wrapper
4. **Homepage** — All 11 sections composed from `components/sections/`
5. **Inner pages** — About, Services, Miners, Contact
6. **CMS integration** — Blog, team, product catalog
7. **E-commerce foundations** — Product pages, cart (future)
