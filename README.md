# PT. Putra Pile Indah — Company Profile

Built with Next.js (App Router), Tailwind CSS, and shadcn/ui.

![Preview](./public/demo-img.jpg)

## Sections

- Navbar (glass/liquid effect)
- Hero (GSAP reveal + custom HeroCards)
- Capabilities
- Benefits
- Products (lines: Hi Pile, Boa, Polyester, Customization)
- Product Overview (carousel with shadcn Cards)
- Current Export Markets (animated world map)
- Our Customers (marquee, grayscale → color on hover)
- Contact
- FAQ
- Footer

## Features

- Fully responsive design
- Smooth theme toggle (no perceptible delay)
- SEO metadata with `metadataBase` for correct OG/Twitter images

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open http://localhost:3000

## Notes

- The root layout (`app/layout.tsx`) provides ThemeProvider and Navbar. The group layout `app/(root)/layout.tsx` defers to the root layout.
- Deprecated section files (features, services, sponsors, pricing, team, testimonial) are stubbed out to avoid accidental use.
