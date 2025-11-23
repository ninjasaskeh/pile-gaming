import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { Roles } from "@/lib/roles";
import fs from "fs";
import path from "path";
import {
  HERO_FALLBACK_CONTENT,
  HERO_CARDS_CONTENT,
  CAPABILITIES_CONTENT,
  BENEFITS_CONTENT,
  PRODUCTS_SECTION_CONTENT,
  PRODUCT_OVERVIEW_CONTENT,
  MARKETS_CONTENT,
  CUSTOMERS_CONTENT,
  CONTACT_CONTENT,
  FAQ_CONTENT,
  FOOTER_CONTENT,
  SITE_METADATA_CONTENT,
} from "@/constants";

function ensureDatabaseUrl() {
  if (process.env.DATABASE_URL) return;
  const candidates = [
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), ".env"),
  ];
  for (const file of candidates) {
    try {
      if (!fs.existsSync(file)) continue;
      const content = fs.readFileSync(file, "utf8");
      const line = content
        .split(/\r?\n/)
        .map((l) => l.trim())
        .find((l) => l.startsWith("DATABASE_URL="));
      if (line) {
        const raw = line.substring("DATABASE_URL=".length);
        // strip optional surrounding quotes
        const value = raw.replace(/^['"]|['"]$/g, "");
        if (value) {
          process.env.DATABASE_URL = value;
          return;
        }
      }
    } catch {
      // ignore and try next
    }
  }
}

ensureDatabaseUrl();

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@putrapile.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: "Administrator",
      role: Roles.ADMIN,
      passwordHash,
    },
    update: {
      role: Roles.ADMIN,
      passwordHash,
    },
  });

  console.log("Seeded admin:", { email: user.email });

  // Seed content sections if not present
  const content = [
    { key: "hero", data: HERO_FALLBACK_CONTENT },
    { key: "heroCards", data: HERO_CARDS_CONTENT },
    { key: "capabilities", data: CAPABILITIES_CONTENT },
    { key: "benefits", data: BENEFITS_CONTENT },
    { key: "products", data: PRODUCTS_SECTION_CONTENT },
    { key: "productOverview", data: PRODUCT_OVERVIEW_CONTENT },
    { key: "markets", data: MARKETS_CONTENT },
    { key: "customers", data: CUSTOMERS_CONTENT },
    { key: "contact", data: CONTACT_CONTENT },
    { key: "faq", data: FAQ_CONTENT },
    { key: "footer", data: FOOTER_CONTENT },
    { key: "siteMetadata", data: SITE_METADATA_CONTENT },
    { key: "productsHeader", data: PRODUCTS_SECTION_CONTENT.header },
    { key: "productOverviewHeader", data: PRODUCT_OVERVIEW_CONTENT.header },
    { key: "marketsHeader", data: MARKETS_CONTENT.header },
    { key: "customersHeader", data: CUSTOMERS_CONTENT.header },
  ] as const;

  for (const entry of content) {
    await (prisma as any).contentSection.upsert({
      where: { key: entry.key },
      update: {},
      create: { key: entry.key, data: entry.data as any },
    });
  }
  console.log("Seeded content sections (if missing)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
