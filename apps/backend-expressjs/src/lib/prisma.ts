import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@web-monorepo/db";

export const createPrismaClient = (connectionString: string): PrismaClient => new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
