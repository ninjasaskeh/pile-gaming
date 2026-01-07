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

### 1. Prerequisites

- Node.js 18+ (disarankan LTS)
- npm (atau pnpm/yarn, contoh di bawah pakai npm)
- PostgreSQL yang bisa diakses secara lokal **atau** via layanan seperti Neon

> Tip: Untuk development paling mudah pakai Postgres dari `docker-compose` (lihat bagian "Docker Compose" di bawah).

### 2. Install dependencies

```bash
npm install
```

### 3. Konfigurasi environment

Buat file `.env` (atau `.env.local`) di root project dan isi minimal nilai berikut:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pile?schema=public"
NEXTAUTH_SECRET="your-strong-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_TOKEN="your-admin-token"

# (Opsional, untuk override credential admin default saat seeding)
ADMIN_EMAIL="admin@putrapile.com"
ADMIN_PASSWORD="admin123"
```

- `DATABASE_URL` → ganti sesuai koneksi Postgres kamu (lokal atau Neon).
- `NEXTAUTH_SECRET` → gunakan string acak yang kuat di production.
- `NEXTAUTH_URL` → URL base aplikasi (untuk callback NextAuth).
- `ADMIN_TOKEN` → dipakai untuk proteksi beberapa operasi CMS/Upload.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` → kalau tidak di-set, seed akan membuat admin `admin@putrapile.com` / `admin123`.

### 4. Siapkan database

**Opsi A – Postgres lokal via Docker Compose (disarankan untuk dev)**

```bash
docker compose up -d db
```

Pastikan `DATABASE_URL` mengarah ke `localhost:5432` seperti contoh di atas.

**Opsi B – Postgres eksternal (Neon, Railway, dsb.)**

- Ambil connection string dari provider.
- Set ke `DATABASE_URL` di `.env`.

### 5. Prisma: generate & migrate & seed

Generate Prisma Client dan jalankan migrasi schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Lalu seed data awal (admin user + konten demo):

```bash
npm run db:seed
```

Setelah seed sukses, kamu punya akun admin dan konten default untuk semua section.

### 6. Jalankan development server

```bash
npm run dev
```

Buka: http://localhost:3000

### 7. Login & akses dashboard / CMS

- Halaman login admin: `http://localhost:3000/auth/login`
- Default credential (kalau tidak di-override di `.env`):
  - Email: `admin@putrapile.com`
  - Password: `admin123`

Setelah login:

- Dashboard section-based: `http://localhost:3000/dashboard` (redirect ke `/dashboard/hero`).
- Halaman CMS ringkas (semua section dalam satu layar): `http://localhost:3000/cms`.

Semua perubahan konten disimpan ke database via Prisma; upload gambar akan tersimpan di `public/uploads`.

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
