import { Prisma, type PrismaClient, type User } from "@web-monorepo/db";
import { AppError } from "../../common/errors/app-error.js";
import type { ListUsersQuery, UpdateUserInput } from "./user.schema.js";

type CreateUserData = Omit<Prisma.UserCreateInput, "posts">;

export type UserRepository = {
	create(data: CreateUserData): Promise<User>;
	delete(id: number): Promise<void>;
	findById(id: number): Promise<User | null>;
	list(query: ListUsersQuery): Promise<{ items: User[]; total: number }>;
	update(id: number, data: UpdateUserInput): Promise<User>;
};

export const createUserRepository = (prisma: PrismaClient): UserRepository => ({
	create: (data) => mapPrismaError(() => prisma.user.create({ data })),

	delete: async (id) => {
		await mapPrismaError(() => prisma.user.delete({ where: { id } }));
	},

	findById: (id) => prisma.user.findUnique({ where: { id } }),

	list: async ({ limit, offset }) => {
		const [items, total] = await prisma.$transaction([
			prisma.user.findMany({ orderBy: { id: "asc" }, skip: offset, take: limit }),
			prisma.user.count(),
		]);

		return { items, total };
	},

	update: (id, data) => mapPrismaError(() => prisma.user.update({ data, where: { id } })),
});

const mapPrismaError = async <T>(operation: () => Promise<T>): Promise<T> => {
	try {
		return await operation();
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				throw AppError.conflict("User with this username or email already exists");
			}

			if (error.code === "P2025") {
				throw AppError.notFound("User not found");
			}
		}

		throw error;
	}
};
