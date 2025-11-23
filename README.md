# PT. Putra Pile Indah — Company Profile

Built with Next.js (App Router), Tailwind CSS, and shadcn/ui.

![Preview](./public/demo-img.jpg)

## Sections

- Navbar (glass/liquid effect)
- Hero (GSAP reveal + custom HeroCards) — now CMS-driven (title, subtitle, description, CTAs)
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
- Lightweight CMS for per-section content (Prisma + JSON)

## CMS Overview

- Storage model: `ContentSection` (Prisma) keyed by section (e.g., `hero`, `productsHeader`, `productOverviewHeader`, `marketsHeader`, `customersHeader`).
- API routes:
  - `GET /api/content?section=hero` → returns a single section JSON (or null)
  - `GET /api/content` → returns a map of all sections
  - `PUT /api/content` with JSON body `{ "<key>": <data> }` → upsert content per key
- Optional admin token: set `ADMIN_TOKEN` env and send `X-Admin-Token` header on PUT/Upload.
- Uploads: `POST /api/upload` (multipart/form-data) writes to `public/uploads` and returns `{ url }`.

### Admin Dashboard

- Location: `app/(admin)/dashboard` (aliased at route `/cms`)
- Features: sidebar navigation, inputs, and drag & drop uploads
- Components: small, reusable pieces under `app/(admin)/dashboard/_components`

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Configure your database

Set `DATABASE_URL` in `.env`. Then generate the Prisma Client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev -n init
```

3. (Optional) Protect admin writes

Add `ADMIN_TOKEN=your-secret` to `.env`. Use the same token in the dashboard when saving or uploading images.

4. Run the dev server

```bash
npm run dev
```

5. Open http://localhost:3000

## Notes

- The root layout (`app/layout.tsx`) provides ThemeProvider and Navbar. The group layout `app/(root)/layout.tsx` defers to the root layout.
- Hero, Products Overview, Markets, and Customers headers can be edited in the Admin Dashboard. Public pages gracefully fall back to defaults if CMS is empty.
