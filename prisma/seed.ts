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

  // Seed typed tables if empty
  const heroExists = await prisma.hero.findFirst();
  if (!heroExists) {
    await prisma.hero.create({ data: HERO_FALLBACK_CONTENT as any });
  }

  const productsHeaderExists = await prisma.sectionHeader.findUnique({
    where: { section: "productsHeader" },
  });
  if (!productsHeaderExists) {
    await prisma.sectionHeader.create({
      data: {
        section: "productsHeader",
        ...(PRODUCTS_SECTION_CONTENT.header as any),
      },
    });
  }
  const productLinesCount = await prisma.productLineItem.count({
    where: { section: "products" },
  });
  if (productLinesCount === 0) {
    await prisma.productLineItem.createMany({
      data: (PRODUCTS_SECTION_CONTENT.items ?? []).map((i) => ({
        section: "products",
        title: i.title,
        description: i.description,
        pro: Boolean(i.pro),
      })),
    });
  }

  const productOverviewHeaderExists = await prisma.sectionHeader.findUnique({
    where: { section: "productOverviewHeader" },
  });
  if (!productOverviewHeaderExists) {
    await prisma.sectionHeader.create({
      data: {
        section: "productOverviewHeader",
        ...(PRODUCT_OVERVIEW_CONTENT.header as any),
      },
    });
  }
  const poCount = await prisma.productOverviewItem.count();
  if (poCount === 0) {
    for (const it of PRODUCT_OVERVIEW_CONTENT.items ?? []) {
      const created = await prisma.productOverviewItem.create({
        data: {
          src: it.src,
          title: it.title,
          code: it.code,
          category: it.category,
          description: it.description,
          pileHeight: it.specs?.pileHeight,
          weight: it.specs?.weight,
          composition: it.specs?.composition,
          finish: it.specs?.finish,
          color: it.specs?.color,
        },
      });
      for (const t of it.tags ?? []) {
        await prisma.productOverviewTag.create({
          data: { itemId: created.id, name: t },
        });
      }
    }
  }

  const marketsHeaderExists = await prisma.sectionHeader.findUnique({
    where: { section: "marketsHeader" },
  });
  if (!marketsHeaderExists) {
    await prisma.sectionHeader.create({
      data: { section: "marketsHeader", ...(MARKETS_CONTENT.header as any) },
    });
  }
  const originExists = await prisma.marketPoint.findFirst({
    where: { section: "markets", isOrigin: true },
  });
  if (!originExists) {
    await prisma.marketPoint.create({
      data: {
        section: "markets",
        isOrigin: true,
        lat: MARKETS_CONTENT.origin?.lat,
        lng: MARKETS_CONTENT.origin?.lng,
        label: MARKETS_CONTENT.origin?.label,
      },
    });
  }
  const marketsCount = await prisma.marketPoint.count({
    where: { section: "markets", isOrigin: false },
  });
  if (marketsCount === 0) {
    await prisma.marketPoint.createMany({
      data: (MARKETS_CONTENT.markets ?? []).map((m) => ({
        section: "markets",
        isOrigin: false,
        lat: m.lat,
        lng: m.lng,
        label: m.label,
      })),
    });
  }

  const customersHeaderExists = await prisma.sectionHeader.findUnique({
    where: { section: "customersHeader" },
  });
  if (!customersHeaderExists) {
    await prisma.sectionHeader.create({
      data: {
        section: "customersHeader",
        ...(CUSTOMERS_CONTENT.header as any),
      },
    });
  }
  const logosCount = await prisma.customerLogo.count({
    where: { section: "customers" },
  });
  if (logosCount === 0) {
    await prisma.customerLogo.createMany({
      data: (CUSTOMERS_CONTENT.logos ?? []).map((l) => ({
        section: "customers",
        src: l.src,
        alt: l.alt,
      })),
    });
  }

  const contactExists = await prisma.contact.findFirst();
  if (!contactExists) {
    await prisma.contact.create({
      data: {
        kicker: CONTACT_CONTENT.kicker,
        title: CONTACT_CONTENT.title,
        description: CONTACT_CONTENT.description,
        address: CONTACT_CONTENT.address,
        phone: CONTACT_CONTENT.phone,
        phoneHref: CONTACT_CONTENT.phoneHref,
        email: CONTACT_CONTENT.email,
        emailHref: CONTACT_CONTENT.emailHref,
        businessDays: CONTACT_CONTENT.businessHours?.days,
        businessHours: CONTACT_CONTENT.businessHours?.hours,
        subjectOptions: (CONTACT_CONTENT.subjectOptions ?? []).join(","),
        firstNamePh: CONTACT_CONTENT.formPlaceholders?.firstName,
        lastNamePh: CONTACT_CONTENT.formPlaceholders?.lastName,
        emailPh: CONTACT_CONTENT.formPlaceholders?.email,
        messagePh: CONTACT_CONTENT.formPlaceholders?.message,
      },
    });
  }

  const faqHeaderExists = await prisma.sectionHeader.findUnique({
    where: { section: "faqHeader" },
  });
  if (!faqHeaderExists) {
    await prisma.sectionHeader.create({
      data: {
        section: "faqHeader",
        kicker: FAQ_CONTENT.kicker,
        title: FAQ_CONTENT.title,
      },
    });
  }
  const faqCount = await prisma.faqItem.count({ where: { section: "faq" } });
  if (faqCount === 0) {
    await prisma.faqItem.createMany({
      data: (FAQ_CONTENT.items ?? []).map((i) => ({
        section: "faq",
        value: i.value,
        question: i.question,
        answer: i.answer,
      })),
    });
  }

  const footerExists = await prisma.footer.findFirst();
  if (!footerExists) {
    await prisma.footer.create({ data: FOOTER_CONTENT as any });
  }

  const siteMetaExists = await prisma.siteMetadata.findFirst();
  if (!siteMetaExists) {
    await prisma.siteMetadata.create({
      data: {
        title: SITE_METADATA_CONTENT.title,
        description: SITE_METADATA_CONTENT.description,
        url: SITE_METADATA_CONTENT.url,
        ogImageSrc: SITE_METADATA_CONTENT.ogImage?.src,
        ogImageWidth: SITE_METADATA_CONTENT.ogImage?.width,
        ogImageHeight: SITE_METADATA_CONTENT.ogImage?.height,
        ogImageAlt: SITE_METADATA_CONTENT.ogImage?.alt,
        twitterCard: SITE_METADATA_CONTENT.twitterCard,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
