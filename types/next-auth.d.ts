import type { DefaultSession } from "next-auth"
import type { Role } from "@/lib/roles"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      role?: Role
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role
  }
}
