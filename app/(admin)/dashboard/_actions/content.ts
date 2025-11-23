"use server";

import { PrismaClient } from "@prisma/client";
import type { SiteContent } from "@/lib/content";
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

const prisma = new PrismaClient();

type SectionKey = keyof SiteContent;

const FALLBACKS: Partial<Record<SectionKey, unknown>> = {
  hero: HERO_FALLBACK_CONTENT,
  heroCards: HERO_CARDS_CONTENT,
  capabilities: CAPABILITIES_CONTENT,
  benefits: BENEFITS_CONTENT,
  products: PRODUCTS_SECTION_CONTENT,
  productOverview: PRODUCT_OVERVIEW_CONTENT,
  markets: MARKETS_CONTENT,
  customers: CUSTOMERS_CONTENT,
  contact: CONTACT_CONTENT,
  faq: FAQ_CONTENT,
  footer: FOOTER_CONTENT,
  siteMetadata: SITE_METADATA_CONTENT,
  productsHeader: PRODUCTS_SECTION_CONTENT.header,
  productOverviewHeader: PRODUCT_OVERVIEW_CONTENT.header,
  marketsHeader: MARKETS_CONTENT.header,
  customersHeader: CUSTOMERS_CONTENT.header,
};

export async function getSection<K extends SectionKey>(key: K) {
  try {
    const client: any = (prisma as any).contentSection;
    if (client) {
      const row = await client.findUnique({ where: { key } });
      if (row?.data) return row.data as SiteContent[K];
    }
  } catch (_) {
    // swallow during build/static generation if DB not reachable
  }
  if (key in FALLBACKS) return FALLBACKS[key] as SiteContent[K];
  return {} as SiteContent[K];
}

export async function setSection<K extends SectionKey>(
  key: K,
  data: SiteContent[K]
) {
  try {
    const client: any = (prisma as any).contentSection;
    if (!client) return; // DB model unavailable (edge/build) skip
    await client.upsert({
      where: { key },
      update: { data: data as unknown as Record<string, unknown> },
      create: { key, data: data as unknown as Record<string, unknown> },
    });
  } catch (_) {
    // ignore write failure gracefully for now
  }
}

// Legacy direct write removed (duplicate)

export async function getAllSections() {
  type Row = { key: string; data: Record<string, unknown> };
  const map: Partial<SiteContent> = {};
  try {
    const client: any = (prisma as any).contentSection;
    if (client) {
      const rows: Row[] = await client.findMany();
      for (const row of rows) {
        map[row.key as SectionKey] = row.data as any;
      }
    }
  } catch (_) {
    // ignore; will fallback below
  }
  // merge fallbacks for missing keys
  for (const [k, v] of Object.entries(FALLBACKS)) {
    const key = k as SectionKey;
    if (map[key] == null) {
      map[key] = v as any;
    }
  }
  return map as SiteContent;
}
