import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import type { SiteContent } from "@/lib/content";

const FALLBACK_PATH = path.join(process.cwd(), "content", "sections.json");

async function readFallbackContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(FALLBACK_PATH, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch (error) {
    return {};
  }
}

async function writeFallbackContent(content: SiteContent) {
  const payload = `${JSON.stringify(content, null, 2)}\n`;
  await fs.writeFile(FALLBACK_PATH, payload, "utf-8");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const section = url.searchParams.get("section");
  const model = (prisma as any)?.contentSection;

  if (model) {
    try {
      if (section) {
        const row = await model.findUnique({ where: { key: section } });
        if (row) {
          return NextResponse.json(row.data ?? null, {
            headers: { "x-cms-source": "database" },
          });
        }
      } else {
        const rows: Array<{ key: string; data: unknown }> =
          await model.findMany();
        if (rows.length) {
          const mapped = Object.fromEntries(
            rows.map((row) => [row.key, row.data])
          );
          return NextResponse.json(mapped, {
            headers: { "x-cms-source": "database" },
          });
        }
      }
    } catch (error) {
      console.error("[cms] Failed to query database", error);
    }
  }

  const fallback = await readFallbackContent();
  if (section) {
    const value = (fallback as Record<string, unknown>)[section] ?? null;
    return NextResponse.json(value, {
      headers: { "x-cms-source": "file" },
    });
  }
  return NextResponse.json(fallback, {
    headers: { "x-cms-source": "file" },
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (typeof body !== "object" || body === null) {
      return new NextResponse("Invalid JSON", { status: 400 });
    }
    // Upsert each provided section key
    const model = (prisma as any)?.contentSection;
    const entries = Object.entries(body as SiteContent);

    if (model) {
      try {
        for (const [key, value] of entries) {
          await model.upsert({
            where: { key },
            create: { key, data: value as any },
            update: { data: value as any },
          });
        }
        return NextResponse.json({
          ok: true,
          upserted: entries.map(([key]) => key),
          storage: "database",
        });
      } catch (error) {
        console.error("[cms] Failed to persist to database", error);
      }
    }

    const fallback = await readFallbackContent();
    const updated = { ...fallback, ...body } as SiteContent;
    await writeFallbackContent(updated);
    return NextResponse.json({
      ok: true,
      upserted: entries.map(([key]) => key),
      storage: "file",
    });
  } catch (e: any) {
    return new NextResponse(e?.message || "Failed to update content", {
      status: 500,
    });
  }
}
