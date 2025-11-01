import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { Roles } from "@/lib/roles";

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
