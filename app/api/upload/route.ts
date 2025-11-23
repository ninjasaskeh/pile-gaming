import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return new NextResponse("No file", { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const target = path.join(uploadsDir, `${Date.now()}-${safeName}`);
  await fs.writeFile(target, bytes);
  const publicUrl = `/uploads/${path.basename(target)}`;
  return NextResponse.json({ url: publicUrl });
}
