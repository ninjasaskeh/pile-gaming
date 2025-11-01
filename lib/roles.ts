// Centralized Role type and values to avoid using Prisma.$Enums directly at call sites.
export const Roles = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type Role = typeof Roles[keyof typeof Roles];

