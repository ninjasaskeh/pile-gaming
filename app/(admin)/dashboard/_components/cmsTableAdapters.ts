import type {
  CustomersContent,
  HeroContent,
  SectionHeader,
  SiteContent,
} from "@/lib/content";
import type { CmsTableRow } from "./CmsDataTable";

type SectionKey = keyof SiteContent;

const mk = (id: string, label: string, value: unknown): CmsTableRow => ({
  id,
  label,
  value: value == null ? "" : String(value),
});

export function sectionToRows(key: SectionKey, value: any): CmsTableRow[] {
  if (key === "hero") {
    const v = (value || {}) as HeroContent;
    return [
      mk("title", "title", v.title),
      mk("subtitle", "subtitle", v.subtitle),
      mk("description", "description", v.description),
      mk("primaryCtaText", "primaryCtaText", v.primaryCtaText),
      mk("primaryCtaHref", "primaryCtaHref", v.primaryCtaHref),
      mk("secondaryCtaText", "secondaryCtaText", v.secondaryCtaText),
      mk("secondaryCtaHref", "secondaryCtaHref", v.secondaryCtaHref),
      mk("imageUrl", "imageUrl", v.imageUrl),
    ];
  }

  if (
    key === "productsHeader" ||
    key === "productOverviewHeader" ||
    key === "marketsHeader" ||
    key === "customersHeader"
  ) {
    const v = (value || {}) as SectionHeader;
    return [
      mk("kicker", "kicker", v.kicker),
      mk("title", "title", v.title),
      mk("subtitle", "subtitle", v.subtitle),
      mk("imageUrl", "imageUrl", (v as any).imageUrl),
    ];
  }

  if (key === "customers") {
    const v = (value || {}) as CustomersContent;
    const header = v.header || {};
    const headerRows: CmsTableRow[] = [
      mk("header.kicker", "header.kicker", header.kicker),
      mk("header.title", "header.title", header.title),
      mk("header.subtitle", "header.subtitle", header.subtitle),
    ];
    const logoRows: CmsTableRow[] = (v.logos || []).map((lg, idx) =>
      mk(`logo.${idx}`, `logo[${idx}] (src | alt)`, `${lg?.src ?? ""} | ${lg?.alt ?? ""}`)
    );
    return [...headerRows, ...logoRows];
  }

  // Fallback: try to flatten shallow primitives
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value).map(([k, v]) => mk(k, k, v as any));
  }

  return [mk("value", "value", value)];
}

export function rowsToSection<K extends SectionKey>(
  key: K,
  rows: CmsTableRow[],
  prev: any
): SiteContent[K] {
  const byLabel = new Map(rows.map((r) => [r.label, r.value] as const));

  if (key === "hero") {
    const base = (prev || {}) as HeroContent;
    return {
      ...base,
      title: byLabel.get("title") ?? base.title,
      subtitle: byLabel.get("subtitle") ?? base.subtitle,
      description: byLabel.get("description") ?? base.description,
      primaryCtaText: byLabel.get("primaryCtaText") ?? base.primaryCtaText,
      primaryCtaHref: byLabel.get("primaryCtaHref") ?? base.primaryCtaHref,
      secondaryCtaText: byLabel.get("secondaryCtaText") ?? base.secondaryCtaText,
      secondaryCtaHref: byLabel.get("secondaryCtaHref") ?? base.secondaryCtaHref,
      imageUrl: byLabel.get("imageUrl") ?? base.imageUrl,
    } as SiteContent[K];
  }

  if (
    key === "productsHeader" ||
    key === "productOverviewHeader" ||
    key === "marketsHeader" ||
    key === "customersHeader"
  ) {
    const base = (prev || {}) as any;
    return {
      ...base,
      kicker: byLabel.get("kicker") ?? base.kicker,
      title: byLabel.get("title") ?? base.title,
      subtitle: byLabel.get("subtitle") ?? base.subtitle,
      imageUrl: byLabel.get("imageUrl") ?? base.imageUrl,
    } as SiteContent[K];
  }

  if (key === "customers") {
    const base = (prev || {}) as CustomersContent;
    const next: CustomersContent = {
      ...base,
      header: {
        ...(base.header || {}),
        kicker: byLabel.get("header.kicker") ?? base.header?.kicker,
        title: byLabel.get("header.title") ?? base.header?.title,
        subtitle: byLabel.get("header.subtitle") ?? base.header?.subtitle,
      },
      logos: [],
    };

    // Parse logo rows: `logo[n] (src | alt)` value: "src | alt"
    const logoRows = rows
      .filter((r) => r.label.startsWith("logo["))
      .map((r) => r.value);

    next.logos = logoRows.map((s) => {
      const [srcPart, altPart] = String(s || "").split("|").map((x) => x.trim());
      return { src: srcPart || "", alt: altPart || "" };
    });

    return next as SiteContent[K];
  }

  // Fallback: shallow object
  const out: any = Array.isArray(prev) ? [...prev] : { ...(prev || {}) };
  for (const r of rows) {
    out[r.label] = r.value;
  }
  return out as SiteContent[K];
}

