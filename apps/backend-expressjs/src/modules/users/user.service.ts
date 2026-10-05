import { AppError } from "../../common/errors/app-error.js";
import { hashPassword } from "../../lib/password.js";
import { toUserDto, type UserDto } from "./user.dto.js";
import type { UserRepository } from "./user.repository.js";
import type { CreateUserInput, ListUsersQuery, UpdateUserInput } from "./user.schema.js";

export type UserService = {
	create(input: CreateUserInput): Promise<UserDto>;
	delete(id: number): Promise<void>;
	get(id: number): Promise<UserDto>;
	list(query: ListUsersQuery): Promise<{ items: UserDto[]; total: number }>;
	updateRole(id: number, role: "USER" | "ADMIN"): Promise<UserDto>;
	update(id: number, input: UpdateUserInput): Promise<UserDto>;
};

export const createUserService = (repository: UserRepository): UserService => ({
	create: async ({ password, ...input }) => toUserDto(await repository.create({ ...input, password: await hashPassword(password) })),

	delete: (id) => repository.delete(id),

	get: async (id) => {
		const user = await repository.findById(id);

		if (!user) {
			throw AppError.notFound("User not found");
		}

		return toUserDto(user);
	},

	list: async (query) => {
		const { items, total } = await repository.list(query);

		return { items: items.map(toUserDto), total };
	},

	updateRole: async (id, role) => toUserDto(await repository.updateRole(id, role)),

	update: async (id, input) => toUserDto(await repository.update(id, input)),
});
