import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isAdminRoute) {
    if (!session?.user) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    // @ts-ignore - augmented in next-auth.d.ts
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
