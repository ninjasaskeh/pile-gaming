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

## Getting Started (Local)

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

- Navbar now renders directly in `app/(root)/page.tsx` (home). Group layout `app/(root)/layout.tsx` is intentionally minimal.
- Hero, Products Overview, Markets, and Customers headers can be edited in the Admin Dashboard. Public pages gracefully fall back to defaults if CMS is empty.

## Docker

Run the app in a container with a multi-stage build.

### Build Image

```bash
docker build -t pile-app .
```

### Run Container

Set environment variables (at least `DATABASE_URL`). Optional: `ADMIN_TOKEN`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.

```bash
docker run -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e ADMIN_TOKEN="your-secret" \
  -e NEXTAUTH_SECRET="replace-with-secret" \
  -p 3000:3000 pile-app
```

Visit http://localhost:3000

### Persist Uploads

Mount `public/uploads` for persistence:

```bash
docker run -e DATABASE_URL=... -p 3000:3000 \
  -v $(pwd)/public/uploads:/app/public/uploads pile-app
```

### Common Env Vars

| Variable          | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `DATABASE_URL`    | Prisma database connection string         |
| `ADMIN_TOKEN`     | Token for protected CMS writes            |
| `NEXTAUTH_SECRET` | NextAuth secret key (production required) |
| `NEXTAUTH_URL`    | Base URL for NextAuth callbacks           |

### Migrations on Start

Container runs `npx prisma migrate deploy && npm run start` so ensure migrations are committed and DB reachable.

### Rebuild After Dependency Changes

```bash
docker build --no-cache -t pile-app .
```

### Development vs Docker

Use local `npm run dev` for rapid iteration; Docker is best for production parity.

## Docker Compose (App + Postgres)

For a local stack with Postgres:

1. Copy `.env.example` to `.env` (optional override values).
2. Start services:

```bash
docker compose up -d --build
```

3. Apply initial migrations (first run only):

```bash
docker compose exec app npx prisma migrate dev --name init
```

4. (Optional) Seed data:

```bash
docker compose exec app npm run db:seed
```

5. Stop services:

```bash
docker compose down
```

Volumes:

- `db-data`: Postgres data persistence
- `uploads`: Persistent `public/uploads` directory

Rebuild after changes to dependencies or Dockerfile:

```bash
docker compose build --no-cache app
```
