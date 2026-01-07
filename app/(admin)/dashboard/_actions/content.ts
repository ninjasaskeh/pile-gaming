"use server";

import { PrismaClient } from "@prisma/client";
import type { SiteContent } from "@/lib/content";

const prisma = new PrismaClient();

type SectionKey = keyof SiteContent;

export async function getSection<K extends SectionKey>(key: K) {
  // Prefer typed tables; fallback to legacy ContentSection and static constants.
  try {
    switch (key) {
      case "hero": {
        const row = await (prisma as any).hero.findFirst();
        if (row) {
          return {
            title: row.title,
            subtitle: row.subtitle,
            description: row.description ?? undefined,
            primaryCtaText: row.primaryCtaText ?? undefined,
            primaryCtaHref: row.primaryCtaHref ?? undefined,
            secondaryCtaText: row.secondaryCtaText ?? undefined,
            secondaryCtaHref: row.secondaryCtaHref ?? undefined,
            imageUrl: row.imageUrl ?? undefined,
          } as SiteContent[K];
        }
        break;
      }
      case "products": {
        const header = await (prisma as any).sectionHeader.findUnique({
          where: { section: "productsHeader" },
        });
        const items = await (prisma as any).productLineItem.findMany({
          where: { section: "products" },
          orderBy: { createdAt: "asc" },
        });
        return {
          header: header
            ? {
                kicker: header.kicker ?? undefined,
                title: header.title ?? undefined,
                subtitle: header.subtitle ?? undefined,
                imageUrl: header.imageUrl ?? undefined,
              }
            : undefined,
          items: items.map((i: any) => ({
            title: i.title ?? undefined,
            description: i.description ?? undefined,
            pro: i.pro,
          })),
        } as SiteContent[K];
      }
      case "productOverview": {
        const header = await (prisma as any).sectionHeader.findUnique({
          where: { section: "productOverviewHeader" },
        });
        const items = await (prisma as any).productOverviewItem.findMany({
          include: { tags: true },
          orderBy: { createdAt: "asc" },
        });
        return {
          header: header
            ? {
                kicker: header.kicker ?? undefined,
                title: header.title ?? undefined,
                subtitle: header.subtitle ?? undefined,
                imageUrl: header.imageUrl ?? undefined,
              }
            : undefined,
          items: items.map((it: any) => ({
            src: it.src ?? undefined,
            title: it.title ?? undefined,
            code: it.code ?? undefined,
            category: it.category ?? undefined,
            description: it.description ?? undefined,
            specs: {
              pileHeight: it.pileHeight ?? undefined,
              weight: it.weight ?? undefined,
              composition: it.composition ?? undefined,
              finish: it.finish ?? undefined,
              color: it.color ?? undefined,
            },
            tags: (it.tags ?? []).map((t: any) => t.name),
          })),
        } as SiteContent[K];
      }
      case "markets": {
        const header = await (prisma as any).sectionHeader.findUnique({
          where: { section: "marketsHeader" },
        });
        const origin = await (prisma as any).marketPoint.findFirst({
          where: { section: "markets", isOrigin: true },
        });
        const markets = await (prisma as any).marketPoint.findMany({
          where: { section: "markets", isOrigin: false },
        });
        return {
          header: header
            ? {
                kicker: header.kicker ?? undefined,
                title: header.title ?? undefined,
                subtitle: header.subtitle ?? undefined,
                imageUrl: header.imageUrl ?? undefined,
              }
            : undefined,
          origin: origin
            ? {
                lat: origin.lat ?? undefined,
                lng: origin.lng ?? undefined,
                label: origin.label ?? undefined,
              }
            : undefined,
          markets: markets.map((m: any) => ({
            lat: m.lat ?? undefined,
            lng: m.lng ?? undefined,
            label: m.label ?? undefined,
          })),
        } as SiteContent[K];
      }
      case "customers": {
        const header = await (prisma as any).sectionHeader.findUnique({
          where: { section: "customersHeader" },
        });
        const logos = await (prisma as any).customerLogo.findMany({
          where: { section: "customers" },
          orderBy: { createdAt: "asc" },
        });
        return {
          header: header
            ? {
                kicker: header.kicker ?? undefined,
                title: header.title ?? undefined,
                subtitle: header.subtitle ?? undefined,
                imageUrl: header.imageUrl ?? undefined,
              }
            : undefined,
          logos: logos.map((l: any) => ({
            src: l.src ?? undefined,
            alt: l.alt ?? undefined,
          })),
        } as SiteContent[K];
      }
      case "contact": {
        const c = await (prisma as any).contact.findFirst();
        if (c) {
          return {
            kicker: c.kicker ?? undefined,
            title: c.title ?? undefined,
            description: c.description ?? undefined,
            address: c.address ?? undefined,
            phone: c.phone ?? undefined,
            phoneHref: c.phoneHref ?? undefined,
            email: c.email ?? undefined,
            emailHref: c.emailHref ?? undefined,
            businessHours: {
              days: c.businessDays ?? undefined,
              hours: c.businessHours ?? undefined,
            },
            subjectOptions: c.subjectOptions
              ? c.subjectOptions
                  .split(",")
                  .map((s: any) => String(s).trim())
                  .filter(Boolean)
              : undefined,
            formPlaceholders: {
              firstName: c.firstNamePh ?? undefined,
              lastName: c.lastNamePh ?? undefined,
              email: c.emailPh ?? undefined,
              message: c.messagePh ?? undefined,
            },
          } as SiteContent[K];
        }
        break;
      }
      case "faq": {
        const header = await (prisma as any).sectionHeader.findUnique({
          where: { section: "faqHeader" },
        });
        const items = await (prisma as any).faqItem.findMany({
          where: { section: "faq" },
          orderBy: { createdAt: "asc" },
        });
        return {
          kicker: header?.kicker ?? undefined,
          title: header?.title ?? undefined,
          items: items.map((i: any) => ({
            value: i.value ?? undefined,
            question: i.question ?? undefined,
            answer: i.answer ?? undefined,
          })),
        } as SiteContent[K];
      }
      case "footer": {
        const f = await (prisma as any).footer.findFirst();
        if (f) {
          return {
            brandName: f.brandName ?? undefined,
            address: f.address ?? undefined,
            email: f.email ?? undefined,
            phone: f.phone ?? undefined,
            emailHref: f.emailHref ?? undefined,
            phoneHref: f.phoneHref ?? undefined,
            mapEmbedUrl: f.mapEmbedUrl ?? undefined,
          } as SiteContent[K];
        }
        break;
      }
      case "siteMetadata": {
        const s = await (prisma as any).siteMetadata.findFirst();
        if (s) {
          return {
            title: s.title ?? undefined,
            description: s.description ?? undefined,
            url: s.url ?? undefined,
            ogImage: s.ogImageSrc
              ? {
                  src: s.ogImageSrc,
                  width: s.ogImageWidth ?? undefined,
                  height: s.ogImageHeight ?? undefined,
                  alt: s.ogImageAlt ?? undefined,
                }
              : undefined,
            twitterCard: (s.twitterCard as any) ?? undefined,
          } as SiteContent[K];
        }
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("[getSection] typed read error", { key, error });
    // swallow during build/static generation if DB not reachable
  }
  // Legacy fallback: JSON-based content stored in ContentSection
  try {
    const row = await (prisma as any).contentSection.findUnique({
      where: { key } as any,
    });
    if ((row as any)?.data) return (row as any).data as SiteContent[K];
  } catch (error) {
    console.error("[getSection] contentSection read error", { key, error });
  }
  // If nothing is found in typed tables or ContentSection, return empty.
  return {} as SiteContent[K];
}

export async function setSection<K extends SectionKey>(
  key: K,
  data: SiteContent[K]
) {
  // Typed writes per section; fallback to legacy JSON for unsupported keys.
  console.log("[setSection] called", { key, data });
  try {
    switch (key) {
      case "hero": {
        const payload = data as any;
        const exists = await (prisma as any).hero.findFirst();
        if (exists) {
          await (prisma as any).hero.update({
            where: { id: exists.id },
            data: {
              title: payload.title ?? exists.title,
              subtitle: payload.subtitle ?? exists.subtitle,
              description: payload.description ?? exists.description,
              primaryCtaText: payload.primaryCtaText ?? exists.primaryCtaText,
              primaryCtaHref: payload.primaryCtaHref ?? exists.primaryCtaHref,
              secondaryCtaText:
                payload.secondaryCtaText ?? exists.secondaryCtaText,
              secondaryCtaHref:
                payload.secondaryCtaHref ?? exists.secondaryCtaHref,
              imageUrl: payload.imageUrl ?? exists.imageUrl,
            },
          });
        } else {
          await (prisma as any).hero.create({ data: payload as any });
        }
        return;
      }
      case "products": {
        const payload = data as any;
        if (payload.header) {
          await (prisma as any).sectionHeader.upsert({
            where: { section: "productsHeader" },
            update: {
              kicker: payload.header.kicker ?? null,
              title: payload.header.title ?? null,
              subtitle: payload.header.subtitle ?? null,
              imageUrl: payload.header.imageUrl ?? null,
            },
            create: {
              section: "productsHeader",
              kicker: payload.header.kicker ?? null,
              title: payload.header.title ?? null,
              subtitle: payload.header.subtitle ?? null,
              imageUrl: payload.header.imageUrl ?? null,
            },
          });
        }
        if (Array.isArray(payload.items)) {
          await (prisma as any).productLineItem.deleteMany({
            where: { section: "products" },
          });
          if (payload.items.length) {
            await (prisma as any).productLineItem.createMany({
              data: payload.items.map((i: any) => ({
                section: "products",
                title: i.title ?? null,
                description: i.description ?? null,
                pro: Boolean(i.pro),
              })),
            });
          }
        }
        return;
      }
      case "productOverview": {
        const payload = data as any;
        if (payload.header) {
          await (prisma as any).sectionHeader.upsert({
            where: { section: "productOverviewHeader" },
            update: {
              kicker: payload.header.kicker ?? null,
              title: payload.header.title ?? null,
              subtitle: payload.header.subtitle ?? null,
              imageUrl: payload.header.imageUrl ?? null,
            },
            create: {
              section: "productOverviewHeader",
              kicker: payload.header.kicker ?? null,
              title: payload.header.title ?? null,
              subtitle: payload.header.subtitle ?? null,
              imageUrl: payload.header.imageUrl ?? null,
            },
          });
        }
        if (Array.isArray(payload.items)) {
          const all = await (prisma as any).productOverviewItem.findMany({
            select: { id: true },
          });
          if (all.length) {
            await (prisma as any).productOverviewTag.deleteMany({
              where: { itemId: { in: all.map((r: any) => r.id) } },
            });
          }
          await (prisma as any).productOverviewItem.deleteMany();
          for (const it of payload.items) {
            const created = await (prisma as any).productOverviewItem.create({
              data: {
                src: it.src ?? null,
                title: it.title ?? null,
                code: it.code ?? null,
                category: it.category ?? null,
                description: it.description ?? null,
                pileHeight: it.specs?.pileHeight ?? null,
                weight: it.specs?.weight ?? null,
                composition: it.specs?.composition ?? null,
                finish: it.specs?.finish ?? null,
                color: it.specs?.color ?? null,
              },
            });
            const tags = Array.isArray(it.tags) ? it.tags : [];
            for (const name of tags) {
              await (prisma as any).productOverviewTag.create({
                data: { itemId: created.id, name },
              });
            }
          }
        }
        return;
      }
      case "markets": {
        const payload = data as any;
        if (payload.header) {
          await (prisma as any).sectionHeader.upsert({
            where: { section: "marketsHeader" },
            update: {
              kicker: payload.header.kicker ?? null,
              title: payload.header.title ?? null,
              subtitle: payload.header.subtitle ?? null,
              imageUrl: payload.header.imageUrl ?? null,
            },
            create: {
              section: "marketsHeader",
              kicker: payload.header.kicker ?? null,
              title: payload.header.title ?? null,
              subtitle: payload.header.subtitle ?? null,
              imageUrl: payload.header.imageUrl ?? null,
            },
          });
        }
        if (payload.origin) {
          // replace origin
          await (prisma as any).marketPoint.deleteMany({
            where: { section: "markets", isOrigin: true },
          });
          await (prisma as any).marketPoint.create({
            data: {
              section: "markets",
              isOrigin: true,
              lat: payload.origin.lat ?? null,
              lng: payload.origin.lng ?? null,
              label: payload.origin.label ?? null,
            },
          });
        }
        if (Array.isArray(payload.markets)) {
          await (prisma as any).marketPoint.deleteMany({
            where: { section: "markets", isOrigin: false },
          });
          await (prisma as any).marketPoint.createMany({
            data: payload.markets.map((m: any) => ({
              section: "markets",
              isOrigin: false,
              lat: m.lat ?? null,
              lng: m.lng ?? null,
              label: m.label ?? null,
            })),
          });
        }
        return;
      }
      case "customers": {
        const payload = data as any;
        if (payload.header) {
          await (prisma as any).sectionHeader.upsert({
            where: { section: "customersHeader" },
            update: {
              kicker: payload.header.kicker ?? null,
              title: payload.header.title ?? null,
              subtitle: payload.header.subtitle ?? null,
              imageUrl: payload.header.imageUrl ?? null,
            },
            create: {
              section: "customersHeader",
              kicker: payload.header.kicker ?? null,
              title: payload.header.title ?? null,
              subtitle: payload.header.subtitle ?? null,
              imageUrl: payload.header.imageUrl ?? null,
            },
          });
        }
        if (Array.isArray(payload.logos)) {
          await (prisma as any).customerLogo.deleteMany({
            where: { section: "customers" },
          });
          await (prisma as any).customerLogo.createMany({
            data: payload.logos.map((l: any) => ({
              section: "customers",
              src: l.src ?? null,
              alt: l.alt ?? null,
            })),
          });
        }
        return;
      }
      case "contact": {
        const payload = data as any;
        const exists = await (prisma as any).contact.findFirst();
        const row = {
          kicker: payload.kicker ?? null,
          title: payload.title ?? null,
          description: payload.description ?? null,
          address: payload.address ?? null,
          phone: payload.phone ?? null,
          phoneHref: payload.phoneHref ?? null,
          email: payload.email ?? null,
          emailHref: payload.emailHref ?? null,
          businessDays: payload.businessHours?.days ?? null,
          businessHours: payload.businessHours?.hours ?? null,
          subjectOptions: Array.isArray(payload.subjectOptions)
            ? (payload.subjectOptions as string[]).join(",")
            : payload.subjectOptions ?? null,
          firstNamePh: payload.formPlaceholders?.firstName ?? null,
          lastNamePh: payload.formPlaceholders?.lastName ?? null,
          emailPh: payload.formPlaceholders?.email ?? null,
          messagePh: payload.formPlaceholders?.message ?? null,
        };
        if (exists)
          await (prisma as any).contact.update({
            where: { id: exists.id },
            data: row,
          });
        else await (prisma as any).contact.create({ data: row });
        return;
      }
      case "faq": {
        const payload = data as any;
        if (payload.kicker || payload.title) {
          await (prisma as any).sectionHeader.upsert({
            where: { section: "faqHeader" },
            update: {
              kicker: payload.kicker ?? null,
              title: payload.title ?? null,
            },
            create: {
              section: "faqHeader",
              kicker: payload.kicker ?? null,
              title: payload.title ?? null,
            },
          });
        }
        if (Array.isArray(payload.items)) {
          await (prisma as any).faqItem.deleteMany({
            where: { section: "faq" },
          });
          await (prisma as any).faqItem.createMany({
            data: payload.items.map((i: any) => ({
              section: "faq",
              value: i.value ?? null,
              question: i.question ?? null,
              answer: i.answer ?? null,
            })),
          });
        }
        return;
      }
      case "footer": {
        const payload = data as any;
        const exists = await (prisma as any).footer.findFirst();
        const row = {
          brandName: payload.brandName ?? null,
          address: payload.address ?? null,
          email: payload.email ?? null,
          phone: payload.phone ?? null,
          emailHref: payload.emailHref ?? null,
          phoneHref: payload.phoneHref ?? null,
          mapEmbedUrl: payload.mapEmbedUrl ?? null,
        };
        if (exists)
          await (prisma as any).footer.update({
            where: { id: exists.id },
            data: row,
          });
        else await (prisma as any).footer.create({ data: row });
        return;
      }
      case "siteMetadata": {
        const payload = data as any;
        const exists = await (prisma as any).siteMetadata.findFirst();
        const row = {
          title: payload.title ?? null,
          description: payload.description ?? null,
          url: payload.url ?? null,
          ogImageSrc: payload.ogImage?.src ?? null,
          ogImageWidth: payload.ogImage?.width ?? null,
          ogImageHeight: payload.ogImage?.height ?? null,
          ogImageAlt: payload.ogImage?.alt ?? null,
          twitterCard: payload.twitterCard ?? null,
        };
        if (exists)
          await (prisma as any).siteMetadata.update({
            where: { id: exists.id },
            data: row,
          });
        else await (prisma as any).siteMetadata.create({ data: row });
        return;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("[setSection] typed write error", { key, error });
    // For typed sections, surface the error so client can see it.
    throw error;
  }
  // Legacy fallback write to ContentSection for unsupported keys
  try {
    await (prisma as any).contentSection.upsert({
      where: { key } as any,
      update: { data: data as unknown as Record<string, unknown> },
      create: {
        key: key as string,
        data: data as unknown as Record<string, unknown>,
      },
    });
    console.log("[setSection] wrote to ContentSection", { key });
  } catch (error) {
    console.error("[setSection] contentSection write error", { key, error });
    // Also surface fallback errors so they aren't silently ignored.
    throw error;
  }
}

// Legacy direct write removed (duplicate)

export async function getAllSections() {
  type Row = { key: string; data: Record<string, unknown> };
  const map: Partial<SiteContent> = {};
  // Prefer typed tables
  try {
    map.hero = (await getSection("hero")) as any;
    map.products = (await getSection("products")) as any;
    map.productOverview = (await getSection("productOverview")) as any;
    map.markets = (await getSection("markets")) as any;
    map.customers = (await getSection("customers")) as any;
    map.contact = (await getSection("contact")) as any;
    map.faq = (await getSection("faq")) as any;
    map.footer = (await getSection("footer")) as any;
    map.siteMetadata = (await getSection("siteMetadata")) as any;
    map.productsHeader = (await (prisma as any).sectionHeader.findUnique({
      where: { section: "productsHeader" },
    }))
      ? (await getSection("products"))?.header
      : undefined;
    map.productOverviewHeader = (await (prisma as any).sectionHeader.findUnique(
      {
        where: { section: "productOverviewHeader" },
      }
    ))
      ? (await getSection("productOverview"))?.header
      : undefined;
    map.marketsHeader = (await (prisma as any).sectionHeader.findUnique({
      where: { section: "marketsHeader" },
    }))
      ? (await getSection("markets"))?.header
      : undefined;
    map.customersHeader = (await (prisma as any).sectionHeader.findUnique({
      where: { section: "customersHeader" },
    }))
      ? (await getSection("customers"))?.header
      : undefined;
  } catch (_) {
    // ignore typed fetch errors
  }
  return map as SiteContent;
}
